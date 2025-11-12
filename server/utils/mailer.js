const nodemailer = require('nodemailer');

// Create reusable transporter with better reliability on hosted platforms
const resolvedPort = Number(process.env.SMTP_PORT || 587);
const resolvedHost = process.env.SMTP_HOST || 'smtp.gmail.com';
const isSecure = resolvedPort === 465; // 465 = SSL/TLS, 587 = STARTTLS

const RESEND_API_KEY = process.env.RESEND_API_KEY;

const transporter = nodemailer.createTransport({
  host: resolvedHost,
  port: resolvedPort,
  secure: isSecure,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  // Connection tuning to mitigate ETIMEDOUT on free instances / cold starts
  pool: true,
  maxConnections: 2,
  maxMessages: 20,
  connectionTimeout: 30000, // 30s
  socketTimeout: 30000,      // 30s
  greetingTimeout: 15000,    // 15s
  // TLS options
  tls: {
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2'
  }
});

async function sendViaResend({ to, subject, html, replyTo }) {
  if (!RESEND_API_KEY) {
    throw new Error('Resend API key is not configured.');
  }

  const fromAddress = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  const payload = {
    from: fromAddress,
    to: Array.isArray(to) ? to : [to],
    subject,
    html
  };

  if (replyTo) {
    payload.reply_to = replyTo;
  }

  console.log('📨 Sending email via Resend API...');
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Resend API error (${response.status}): ${text}`);
  }

  const data = await response.json();
  console.log('✅ Email sent via Resend. Id:', data.id || 'N/A');
  return { provider: 'resend', id: data.id || null };
}

/**
 * Send email with proper reply-to configuration
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - HTML email content
 * @param {string} replyTo - Optional reply-to address (defaults to EMAIL_REPLY_TO)
 * @returns {Promise} - Email sending result
 */
async function sendEmail(to, subject, html, replyTo = null) {
  console.log('=== EMAIL CONFIGURATION CHECK ===');
  console.log('EMAIL_USER:', process.env.EMAIL_USER ? `${process.env.EMAIL_USER.substring(0, 3)}***` : 'MISSING');
  console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'SET' : 'MISSING');
  console.log('EMAIL_FROM:', process.env.EMAIL_FROM || 'NOT SET');
  console.log('EMAIL_REPLY_TO:', process.env.EMAIL_REPLY_TO || 'NOT SET');
  console.log('SMTP_HOST:', process.env.SMTP_HOST || 'DEFAULT (smtp.gmail.com)');
  console.log('SMTP_PORT:', process.env.SMTP_PORT || 'DEFAULT (465)');
  console.log('RESEND_API_KEY:', RESEND_API_KEY ? 'SET' : 'NOT SET');
  console.log('NODE_ENV:', process.env.NODE_ENV || 'development');

  const hasSmtpCredentials = !!(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD);

  // Determine sender address
  const fromAddress = process.env.EMAIL_FROM || 
    (hasSmtpCredentials ? `SYNNECTIFY Careers <${process.env.EMAIL_USER}>` : 'onboarding@resend.dev');
  // Determine reply-to address
  const replyToAddress = replyTo || 
    process.env.EMAIL_REPLY_TO || 
    process.env.EMAIL_USER || 
    'careers.synnectify@gmail.com';

  // If SMTP credentials are missing, fall back to Resend immediately
  if (!hasSmtpCredentials) {
    console.warn('⚠️ SMTP credentials missing. Falling back to Resend API.');
    if (!RESEND_API_KEY) {
      throw new Error('Email configuration incomplete: Missing EMAIL_USER/EMAIL_PASSWORD. Please set these variables or provide RESEND_API_KEY.');
    }
    return sendViaResend({ to, subject, html, replyTo: replyToAddress });
  }

  // Validate email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(Array.isArray(to) ? to[0] : to)) {
    console.error(`❌ Invalid recipient email address: ${to}`);
    throw new Error(`Invalid email address: ${to}`);
  }

  try {
    const mailOptions = {
      from: fromAddress,
      replyTo: replyToAddress,
      to,
      subject,
      html,
      // Add headers for better deliverability
      headers: {
        'X-Mailer': 'SYNNECTIFY Career Portal',
        'X-Priority': '3',
      }
    };

    console.log('📧 Attempting to send email via SMTP...', {
      from: mailOptions.from,
      to: mailOptions.to,
      replyTo: mailOptions.replyTo
    });

    // Implement retry logic for transient failures
    let lastError;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`📧 Sending email attempt ${attempt}/3`);
        const info = await transporter.sendMail(mailOptions);

        console.log(`✅ Email sent successfully to ${to}`);
        console.log(`📧 Message ID: ${info.messageId}`);
        console.log(`📧 Reply-To: ${replyToAddress}`);

        return info;
      } catch (error) {
        lastError = error;
        console.error(`📧 Email sending attempt ${attempt} failed:`, error.message);

        // Don't retry on authentication errors or bad requests
        if (error.code === 'EAUTH' || error.code === 'EENVELOPE' || error.code === 'EMESSAGE') {
          console.error('📧 Non-retryable SMTP error encountered, aborting retries');
          if (RESEND_API_KEY) {
            console.warn('➡️ Falling back to Resend API due to non-retryable SMTP error.');
            return sendViaResend({ to, subject, html, replyTo: replyToAddress });
          }
          throw error;
        }

        // Wait before retrying (exponential backoff)
        if (attempt < 3) {
          const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
          console.log(`📧 Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    // If all SMTP retries failed, try HTTP provider fallback (Resend) if configured
    if (RESEND_API_KEY) {
      try {
        console.warn('📨 SMTP failed after retries. Falling back to Resend API...');
        return await sendViaResend({ to, subject, html, replyTo: replyToAddress });
      } catch (fallbackErr) {
        console.error('❌ Resend fallback failed:', fallbackErr.message);
        throw lastError || fallbackErr;
      }
    }

    // Fallback not configured; rethrow SMTP error
    throw lastError;
  } catch (error) {
    console.error('❌ Email sending failed after all methods:', error.message);
    console.error('📧 Recipient:', to);
    console.error('📧 Subject:', subject);
    console.error('📧 Error code:', error.code);
    console.error('📧 Error stack:', error.stack);

    // Provide helpful error messages
    if (error.code === 'EAUTH') {
      console.error('\n⚠️ AUTHENTICATION ERROR:');
      console.error('Please check:');
      console.error('1. EMAIL_USER and EMAIL_PASSWORD are set correctly in environment variables');
      console.error('2. If using Gmail, enable "App Passwords" with 2FA');
      console.error('3. Visit: https://myaccount.google.com/apppasswords\n');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n⚠️ CONNECTION ERROR:');
      console.error('Please check:');
      console.error('1. SMTP_HOST and SMTP_PORT are correct');
      console.error('2. Network connectivity to the email server');
      console.error('3. Firewall settings allowing outbound connections\n');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('\n⚠️ TIMEOUT ERROR:');
      console.error('Please check:');
      console.error('1. Network connectivity to the email server');
      console.error('2. DNS resolution for the SMTP server');
      console.error('3. Server response time\n');
    }

    throw error;
  }
}

module.exports = { sendEmail };
const nodemailer = require('nodemailer');

// Create reusable transporter with better reliability on hosted platforms
const resolvedPort = Number(process.env.SMTP_PORT || 587);
const resolvedHost = process.env.SMTP_HOST || 'smtp.gmail.com';
const isSecure = resolvedPort === 465; // 465 = SSL/TLS, 587 = STARTTLS

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
  console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
  
  // Validate email configuration
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    const missingVars = [];
    if (!process.env.EMAIL_USER) missingVars.push('EMAIL_USER');
    if (!process.env.EMAIL_PASSWORD) missingVars.push('EMAIL_PASSWORD');
    
    console.error(`❌ Missing required environment variables: ${missingVars.join(', ')}`);
    console.error('⚠️ EMAIL_USER or EMAIL_PASSWORD not configured. Skipping email send.');
    console.error('📧 Would have sent email to:', to);
    console.error('📧 Subject:', subject);
    
    // In production, throw error to ensure it's noticed
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Email configuration incomplete: Missing ${missingVars.join(', ')}. Please set these environment variables in Render.`);
    }
    
    return { skipped: true, error: `Missing environment variables: ${missingVars.join(', ')}` };
  }
  
  // Validate email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    console.error(`❌ Invalid recipient email address: ${to}`);
    throw new Error(`Invalid email address: ${to}`);
  }
  
  try {
    // Determine sender address
    const fromAddress = process.env.EMAIL_FROM || 
      `SYNNECTIFY Careers <${process.env.EMAIL_USER}>`;
    
    // Determine reply-to address
    const replyToAddress = replyTo || 
      process.env.EMAIL_REPLY_TO || 
      process.env.EMAIL_USER || 
      'careers.synnectify@gmail.com';
    
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
    
    console.log('📧 Attempting to send email with options:', {
      from: fromAddress,
      to,
      subject,
      hasHtml: !!html,
      replyTo: replyToAddress
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
          console.error('📧 Non-retryable error encountered, aborting retries');
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
    if (process.env.RESEND_API_KEY) {
      try {
        console.warn('📨 SMTP failed after retries. Falling back to Resend API...');
        const fromAddress = process.env.EMAIL_FROM || 'onboarding@resend.dev';
        const resp = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: fromAddress,
            to: [to],
            subject,
            html
          })
        });
        if (!resp.ok) {
          const text = await resp.text();
          console.error('❌ Resend API failed:', resp.status, text);
          throw lastError;
        }
        const data = await resp.json();
        console.log('✅ Email sent via Resend API. Id:', data.id);
        return { provider: 'resend', id: data.id };
      } catch (fallbackErr) {
        console.error('❌ Resend fallback failed:', fallbackErr.message);
        // Rethrow the original SMTP error to preserve error context
        throw lastError;
      }
    }

    // Fallback not configured; rethrow SMTP error
    throw lastError;
  } catch (error) {
    console.error('❌ Email sending failed after all retries:', error.message);
    console.error('📧 Recipient:', to);
    console.error('📧 Subject:', subject);
    console.error('📧 Error code:', error.code);
    console.error('📧 Error stack:', error.stack);
    
    // Provide helpful error messages
    if (error.code === 'EAUTH') {
      console.error('\n⚠️ AUTHENTICATION ERROR:');
      console.error('Please check:');
      console.error('1. EMAIL_USER and EMAIL_PASSWORD are set correctly in .env');
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
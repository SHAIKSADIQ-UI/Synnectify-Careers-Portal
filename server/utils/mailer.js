const nodemailer = require('nodemailer');

// Create reusable transporter with error handling
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  // Additional security options for Gmail
  tls: {
    rejectUnauthorized: false, // Set to false for Gmail App Passwords
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
  console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'SET' : 'MISSING');
  console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'SET' : 'MISSING');
  console.log('EMAIL_FROM:', process.env.EMAIL_FROM || 'NOT SET');
  console.log('EMAIL_REPLY_TO:', process.env.EMAIL_REPLY_TO || 'NOT SET');
  console.log('SMTP_HOST:', process.env.SMTP_HOST || 'DEFAULT');
  console.log('SMTP_PORT:', process.env.SMTP_PORT || 'DEFAULT');
  
  // Validate email configuration
  if (!process.env.EMAIL_USER) {
    console.error('❌ EMAIL_USER is not set in environment variables');
    return { skipped: true };
  }
  
  if (!process.env.EMAIL_PASSWORD) {
    console.error('❌ EMAIL_PASSWORD is not set in environment variables');
    return { skipped: true };
  }
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('⚠️ EMAIL_USER or EMAIL_PASSWORD not configured. Skipping email send.');
    console.warn('📧 Would have sent email to:', to);
    console.warn('📧 Subject:', subject);
    return { skipped: true };
  }
  
  try {
    // Determine sender address
    const fromAddress = process.env.EMAIL_FROM || 
      `SYNNECTIFY Careers <${process.env.EMAIL_USER}>`;
    
    // Determine reply-to address
    const replyToAddress = replyTo || 
      process.env.EMAIL_REPLY_TO || 
      'careers.synnectify@gmail.com'; // OTP IMPLEMENTATION START - Use correct email
    
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
    
    // If all retries failed, throw the last error
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
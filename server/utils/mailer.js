const nodemailer = require('nodemailer');

// Create reusable transporter with error handling
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Additional security options
  tls: {
    rejectUnauthorized: true,
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
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'MISSING');
  console.log('EMAIL_FROM:', process.env.EMAIL_FROM || 'NOT SET');
  console.log('EMAIL_REPLY_TO:', process.env.EMAIL_REPLY_TO || 'NOT SET');
  console.log('SMTP_HOST:', process.env.SMTP_HOST || 'DEFAULT');
  console.log('SMTP_PORT:', process.env.SMTP_PORT || 'DEFAULT');
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️ EMAIL_USER or EMAIL_PASS not configured. Skipping email send.');
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
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Email sent successfully to ${to}`);
    console.log(`📧 Message ID: ${info.messageId}`);
    console.log(`📧 Reply-To: ${replyToAddress}`);
    
    return info;
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    console.error('📧 Recipient:', to);
    console.error('📧 Subject:', subject);
    console.error('📧 Error code:', error.code);
    console.error('📧 Error stack:', error.stack);
    
    // Provide helpful error messages
    if (error.code === 'EAUTH') {
      console.error('\n⚠️ AUTHENTICATION ERROR:');
      console.error('Please check:');
      console.error('1. EMAIL_USER and EMAIL_PASS are set correctly in .env');
      console.error('2. If using Gmail, enable "App Passwords" with 2FA');
      console.error('3. Visit: https://myaccount.google.com/apppasswords\n');
    }
    
    throw error;
  }
}

module.exports = { sendEmail };
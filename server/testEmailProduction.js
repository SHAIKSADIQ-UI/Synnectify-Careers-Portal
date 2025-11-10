const dotenv = require('dotenv');
dotenv.config();

const { sendEmail } = require('./utils/mailer');

async function testEmail() {
  try {
    console.log('Testing email configuration...');
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'SET' : 'MISSING');
    console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'SET' : 'MISSING');
    console.log('SMTP_HOST:', process.env.SMTP_HOST || 'DEFAULT');
    console.log('SMTP_PORT:', process.env.SMTP_PORT || 'DEFAULT');
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('❌ EMAIL_USER or EMAIL_PASSWORD not configured');
      return;
    }
    
    const result = await sendEmail(
      process.env.EMAIL_USER,
      'Test Email from SYNNECTIFY - Production Check',
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">SYNNECTIFY Email Test - Production</h2>
        <p>This is a test email to verify that the email configuration is working correctly in production.</p>
        <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p>If you received this email, the email system is functioning properly.</p>
        <br>
        <p>Best regards,<br>SYNNECTIFY Team</p>
      </div>
      `
    );
    
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', result.messageId);
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    console.error('Error code:', error.code);
    console.error('Stack trace:', error.stack);
  }
}

testEmail();
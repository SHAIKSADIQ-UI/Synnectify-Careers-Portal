const { sendEmail } = require('./server/utils/mailer');

async function testEmail() {
  try {
    console.log('Testing email configuration...');
    
    // Check environment variables
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'SET' : 'MISSING');
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'MISSING');
    console.log('SMTP_HOST:', process.env.SMTP_HOST || 'smtp.gmail.com');
    console.log('SMTP_PORT:', process.env.SMTP_PORT || '465');
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('❌ Email configuration incomplete');
      return;
    }
    
    const result = await sendEmail(
      process.env.EMAIL_USER, // Send to admin email
      'Test Email from SYNNECTIFY',
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">SYNNECTIFY Email Test</h2>
        <p>This is a test email to verify that the email configuration is working correctly.</p>
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
  }
}

// Load environment variables
require('dotenv').config({ path: './server/.env' });

testEmail();
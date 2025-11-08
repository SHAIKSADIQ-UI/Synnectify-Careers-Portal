/**
 * Test Email Script
 * 
 * This script tests the email configuration with the provided Google App Password
 * Run with: node testEmail.js
 */

require('dotenv').config();
const { sendEmail } = require('./utils/mailer');

async function testEmail() {
  try {
    console.log('📧 Testing email configuration...');
    console.log(`📧 EMAIL_USER: ${process.env.EMAIL_USER}`);
    console.log(`📧 EMAIL_PASS: ${process.env.EMAIL_PASS ? 'SET' : 'NOT SET'}`);
    console.log(`📧 EMAIL_FROM: ${process.env.EMAIL_FROM}`);
    console.log(`📧 EMAIL_REPLY_TO: ${process.env.EMAIL_REPLY_TO}`);
    console.log(`📧 SMTP_HOST: ${process.env.SMTP_HOST}`);
    console.log(`📧 SMTP_PORT: ${process.env.SMTP_PORT}`);
    
    // Test sending email to the admin email
    const result = await sendEmail(
      process.env.EMAIL_USER, // Send to the admin email
      'Test Email Configuration',
      `
        <h2>Email Configuration Test</h2>
        <p>This is a test email to verify that your Google App Password is working correctly.</p>
        <p><strong>Configuration Details:</strong></p>
        <ul>
          <li>User: ${process.env.EMAIL_USER}</li>
          <li>From: ${process.env.EMAIL_FROM}</li>
          <li>Reply-To: ${process.env.EMAIL_REPLY_TO}</li>
          <li>SMTP Host: ${process.env.SMTP_HOST}</li>
          <li>SMTP Port: ${process.env.SMTP_PORT}</li>
        </ul>
        <p>If you received this email, your email configuration is working correctly!</p>
      `
    );
    
    if (result.skipped) {
      console.log('⚠️ Email sending was skipped (likely due to missing configuration)');
    } else {
      console.log('✅ Test email sent successfully!');
      console.log(`📧 Message ID: ${result.messageId}`);
    }
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    if (error.code === 'EAUTH') {
      console.error('\n🔐 AUTHENTICATION ERROR:');
      console.error('Please verify:');
      console.error('1. EMAIL_USER is set correctly in .env file');
      console.error('2. EMAIL_PASS contains your valid Google App Password');
      console.error('3. Gmail App Password is correctly generated with 2FA enabled');
      console.error('4. Visit: https://myaccount.google.com/apppasswords to generate/recreate app password');
      console.error('5. Ensure .env file exists with proper credentials');
    }
  }
}

testEmail();
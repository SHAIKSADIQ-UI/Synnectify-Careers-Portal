const dotenv = require('dotenv');
dotenv.config();

const { sendEmail } = require('./utils/mailer');
const {
  sendApplicationReceived,
  sendShortlisted,
  sendRejected,
  sendInterviewScheduled,
  sendCompleted,
  notifyAdminOnNewApplication
} = require('./utils/emailService');

async function testAllEmails() {
  try {
    console.log('🧪 Starting comprehensive email service test...\n');
    
    // Test 1: Basic email functionality
    console.log('1. Testing basic email functionality...');
    const basicResult = await sendEmail(
      process.env.EMAIL_USER,
      'Test Email - Basic Functionality',
      '<h1>Basic Email Test</h1><p>This is a test of the basic email functionality.</p>'
    );
    console.log('✅ Basic email sent successfully!\n');
    
    // Test 2: Application received email
    console.log('2. Testing application received email...');
    await sendApplicationReceived({
      to: process.env.EMAIL_USER,
      applicantName: 'John Doe',
      jobTitle: 'Software Engineer',
      applicationId: 'APP-001'
    });
    console.log('✅ Application received email sent successfully!\n');
    
    // Test 3: Shortlisted email
    console.log('3. Testing shortlisted email...');
    await sendShortlisted({
      to: process.env.EMAIL_USER,
      applicantName: 'John Doe',
      jobTitle: 'Software Engineer'
    });
    console.log('✅ Shortlisted email sent successfully!\n');
    
    // Test 4: Rejected email
    console.log('4. Testing rejected email...');
    await sendRejected({
      to: process.env.EMAIL_USER,
      applicantName: 'John Doe',
      jobTitle: 'Software Engineer'
    });
    console.log('✅ Rejected email sent successfully!\n');
    
    // Test 5: Interview scheduled email
    console.log('5. Testing interview scheduled email...');
    await sendInterviewScheduled({
      to: process.env.EMAIL_USER,
      applicantName: 'John Doe',
      jobTitle: 'Software Engineer',
      dateTime: '2023-12-01 10:00 AM',
      meetingLink: 'https://meet.google.com/abc-defg-hij'
    });
    console.log('✅ Interview scheduled email sent successfully!\n');
    
    // Test 6: Completed email
    console.log('6. Testing completed email...');
    await sendCompleted({
      to: process.env.EMAIL_USER,
      applicantName: 'John Doe',
      jobTitle: 'Software Engineer'
    });
    console.log('✅ Completed email sent successfully!\n');
    
    // Test 7: Admin notification email
    console.log('7. Testing admin notification email...');
    await notifyAdminOnNewApplication({
      toAdmin: process.env.EMAIL_USER,
      jobTitle: 'Software Engineer',
      applicantName: 'John Doe',
      applicationId: 'APP-001'
    });
    console.log('✅ Admin notification email sent successfully!\n');
    
    console.log('🎉 All email tests completed successfully!');
    console.log('\n📋 Summary:');
    console.log('   - Basic email: ✅ Working');
    console.log('   - Application received: ✅ Working');
    console.log('   - Shortlisted notification: ✅ Working');
    console.log('   - Rejected notification: ✅ Working');
    console.log('   - Interview scheduled: ✅ Working');
    console.log('   - Completed notification: ✅ Working');
    console.log('   - Admin notification: ✅ Working');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Error stack:', error.stack);
  }
}

// Run the tests
testAllEmails();
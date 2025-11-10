const dotenv = require('dotenv');
dotenv.config();

// Import our email service
const {
  sendApplicationReceived,
  notifyAdminOnNewApplication
} = require('./utils/emailService');

async function testApplicationFlow() {
  try {
    console.log('=== TESTING APPLICATION FLOW ===\n');
    
    // Test data
    const testData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'careers.synnectify@gmail.com',
      position: 'Software Engineer',
      jobId: null,
      applicationId: 'TEST-APP-001'
    };
    
    console.log('📋 Test data:', testData);
    
    // Test 1: Send application received email to applicant
    console.log('\n1. Sending application received email...');
    await sendApplicationReceived({
      to: testData.email,
      applicantName: `${testData.firstName} ${testData.lastName}`,
      jobTitle: testData.position,
      applicationId: testData.applicationId
    });
    console.log('✅ Application received email sent successfully!');
    
    // Test 2: Send admin notification
    console.log('\n2. Sending admin notification...');
    await notifyAdminOnNewApplication({
      toAdmin: testData.email,
      jobTitle: testData.position,
      applicantName: `${testData.firstName} ${testData.lastName}`,
      applicationId: testData.applicationId
    });
    console.log('✅ Admin notification sent successfully!');
    
    console.log('\n🎉 All application flow tests completed successfully!');
    console.log('\n📋 Summary:');
    console.log('   - Application received email: ✅ Working');
    console.log('   - Admin notification: ✅ Working');
    console.log('   - Application flow: ✅ Working');
    
  } catch (error) {
    console.error('❌ Application flow test failed:', error.message);
    console.error('Error stack:', error.stack);
  }
}

// Run the test
testApplicationFlow();
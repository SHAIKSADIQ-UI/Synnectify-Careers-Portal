const axios = require('axios');

async function testAdminLogin() {
  try {
    console.log('Testing admin login...');
    
    // Step 1: Admin login (credentials validation and OTP sending)
    const loginResponse = await axios.post('http://localhost:5000/api/auth/admin-login', {
      email: 'careers.synnectify@gmail.com',
      password: 'Synnectify-Careers_2906'
    });
    
    console.log('Login response:', loginResponse.data);
    
    // Note: In a real test, we would need to check the email for the OTP
    // and then call the OTP verification endpoint
    
  } catch (error) {
    console.error('Error testing admin login:', error.response?.data || error.message);
  }
}

testAdminLogin();
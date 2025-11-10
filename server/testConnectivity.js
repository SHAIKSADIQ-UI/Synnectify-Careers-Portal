const https = require('https');

// Test connectivity to the backend
console.log('Testing connectivity to synnectify-backend.onrender.com...');

const options = {
  hostname: 'synnectify-backend.onrender.com',
  port: 443,
  path: '/api/ping',
  method: 'GET',
  timeout: 10000
};

const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  res.on('data', (chunk) => {
    console.log(`Body: ${chunk}`);
  });
  
  res.on('end', () => {
    console.log('Request completed');
  });
});

req.on('error', (error) => {
  console.error('Request failed:', error.message);
});

req.on('timeout', () => {
  console.error('Request timeout');
  req.destroy();
});

req.end();
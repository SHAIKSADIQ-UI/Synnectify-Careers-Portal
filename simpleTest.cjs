const https = require('https');

console.log('Testing backend connectivity...');

https.get('https://synnectify-backend.onrender.com/api/ping', (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response Body:', data);
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
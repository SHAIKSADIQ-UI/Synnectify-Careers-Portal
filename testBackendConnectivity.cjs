const https = require('https');
const http = require('http');
const dns = require('dns');

console.log('=== Backend Connectivity Test ===\n');

// Test 1: Direct HTTPS connection
console.log('Test 1: Direct HTTPS connection to synnectify-backend.onrender.com');
const options = {
  hostname: 'synnectify-backend.onrender.com',
  port: 443,
  path: '/api/ping',
  method: 'GET',
  timeout: 15000
};

const req = https.request(options, (res) => {
  console.log(`  Status Code: ${res.statusCode}`);
  console.log(`  Headers: ${JSON.stringify(res.headers, null, 2)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`  Response Body: ${data}\n`);
    runNextTest();
  });
});

req.on('error', (error) => {
  console.error(`  Request failed: ${error.message}\n`);
  runNextTest();
});

req.on('timeout', () => {
  console.error('  Request timeout\n');
  req.destroy();
  runNextTest();
});

req.end();

function runNextTest() {
  // Test 2: HTTP connection (in case HTTPS is blocked)
  console.log('Test 2: HTTP connection to synnectify-backend.onrender.com');
  const httpOptions = {
    hostname: 'synnectify-backend.onrender.com',
    port: 80,
    path: '/api/ping',
    method: 'GET',
    timeout: 15000
  };

  const httpReq = http.request(httpOptions, (res) => {
    console.log(`  Status Code: ${res.statusCode}`);
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(`  Response Body: ${data}\n`);
      runDNSLookup();
    });
  });

  httpReq.on('error', (error) => {
    console.error(`  HTTP Request failed: ${error.message}\n`);
    runDNSLookup();
  });

  httpReq.on('timeout', () => {
    console.error('  HTTP Request timeout\n');
    httpReq.destroy();
    runDNSLookup();
  });

  httpReq.end();
}

function runDNSLookup() {
  // Test 3: DNS lookup
  console.log('Test 3: DNS lookup for synnectify-backend.onrender.com');
  dns.lookup('synnectify-backend.onrender.com', (err, address, family) => {
    if (err) {
      console.error(`  DNS lookup failed: ${err.message}\n`);
    } else {
      console.log(`  IP Address: ${address} (IPv${family})\n`);
    }
    
    console.log('=== Test Complete ===');
    console.log('\nIf all tests failed, possible issues:');
    console.log('1. Render service may be down');
    console.log('2. Network connectivity issues');
    console.log('3. Firewall blocking connections');
    console.log('4. DNS resolution problems');
  });
}
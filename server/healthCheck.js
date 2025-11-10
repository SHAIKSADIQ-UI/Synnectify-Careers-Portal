// Simple health check script for the backend
const express = require('express');
const app = express();

// Simple ping endpoint
app.get('/api/ping', (req, res) => {
  res.json({
    status: 'active',
    message: 'Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test endpoint to verify email configuration
app.get('/api/test-config', (req, res) => {
  res.json({
    emailConfig: {
      user: process.env.EMAIL_USER ? 'SET' : 'MISSING',
      password: process.env.EMAIL_PASSWORD ? 'SET' : 'MISSING',
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 465
    },
    environment: process.env.NODE_ENV || 'development',
    clientUrl: process.env.CLIENT_URL || 'Not set'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Health check server running on port ${PORT}`);
});
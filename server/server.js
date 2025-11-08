const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const { connectDB } = require('./config/db');
const { checkEmailServiceHealth } = require('./utils/mailer');

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const applicationRoutes = require('./routes/applications');

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));

// CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'https://synnectify-careers-portal.vercel.app' // Add Vercel frontend URL explicitly
].filter(Boolean);

// In production, only allow specific domains
if (process.env.NODE_ENV === 'production') {
  console.log('🔒 Production mode: CORS restricted to:', allowedOrigins.filter(Boolean));
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // Check if origin is in allowed list
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      
      // In development, be more permissive
      if (process.env.NODE_ENV === 'development') {
        console.log('⚠️  Development mode: Allowing origin', origin);
        return callback(null, true);
      }
      
      const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
      return callback(new Error(msg), false);
    },
    credentials: true,
  })
);

// Static serving of uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root route - API Information
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'SYNNECTIFY Careers Portal API',
    version: '1.0.0',
    status: 'active',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    documentation: '/api/docs (not yet implemented)',
    endpoints: {
      auth: '/api/auth',
      jobs: '/api/jobs',
      applications: '/api/applications'
    }
  });
});

// Health check
app.get('/api/ping', async (req, res) => {
  try {
    const { checkEmailServiceHealth } = require('./utils/mailer');

    // Basic health info
    const healthInfo = {
      status: 'active',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      services: {
        database: 'connected',
        email: 'checking...'
      }
    };

    // Check email service health
    try {
      const emailHealth = await checkEmailServiceHealth();
      healthInfo.services.email = emailHealth.authenticated ? 'healthy' : 'unhealthy';
      healthInfo.emailDetails = {
        configured: emailHealth.configured,
        authenticated: emailHealth.authenticated,
        reachable: emailHealth.reachable,
        error: emailHealth.error || null
      };
    } catch (emailError) {
      healthInfo.services.email = 'error';
      healthInfo.emailDetails = {
        error: emailError.message
      };
    }

    res.status(200).json(healthInfo);
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// Email test endpoint
app.get('/api/test-email', async (req, res) => {
  try {
    const { sendEmail } = require('./utils/mailer');
    
    console.log('Email test requested');
    console.log('Email configuration:', {
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASS ? 'SET' : 'MISSING',
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT
    });
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(400).json({ 
        error: 'Email configuration incomplete',
        details: 'EMAIL_USER and EMAIL_PASS must be set in environment variables',
        envCheck: {
          EMAIL_USER: process.env.EMAIL_USER ? 'SET' : 'MISSING',
          EMAIL_PASS: process.env.EMAIL_PASS ? 'SET' : 'MISSING',
          SMTP_HOST: process.env.SMTP_HOST || 'DEFAULT',
          SMTP_PORT: process.env.SMTP_PORT || 'DEFAULT'
        }
      });
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
    
    console.log('Email sent successfully:', result.messageId);
    res.json({ 
      message: 'Email sent successfully!',
      messageId: result.messageId 
    });
  } catch (error) {
    console.error('Email test failed:', error);
    res.status(500).json({ 
      error: 'Email test failed',
      details: error.message,
      code: error.code
    });
  }
});

// Environment variables check endpoint
app.get('/api/env-check', (req, res) => {
  const envVars = {
    EMAIL_USER: process.env.EMAIL_USER ? 'SET' : 'MISSING',
    EMAIL_PASS: process.env.EMAIL_PASS ? 'SET' : 'MISSING',
    EMAIL_FROM: process.env.EMAIL_FROM || 'NOT SET',
    EMAIL_REPLY_TO: process.env.EMAIL_REPLY_TO || 'NOT SET',
    SMTP_HOST: process.env.SMTP_HOST || 'DEFAULT',
    SMTP_PORT: process.env.SMTP_PORT || 'DEFAULT',
    NODE_ENV: process.env.NODE_ENV || 'development'
  };
  
  console.log('Environment variables check:', envVars);
  
  res.json({
    message: 'Environment variables status',
    envVars
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// Simple 404 handler - no wildcards
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableEndpoints: [
      'GET /',
      'GET /api/ping',
      'POST /api/auth/*',
      'GET /api/jobs/*',
      'POST /api/applications/*'
    ]
  });
});

// DB and server start
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

connectDB()
  .then(async () => {
    // Verify email service health at startup
    console.log('🔍 Checking email service health...');
    try {
      const emailHealth = await checkEmailServiceHealth();
      if (emailHealth.authenticated) {
        console.log('✅ Email service: Healthy and authenticated');
      } else {
        console.log('⚠️  Email service: Configuration issue detected');
        console.log(`   Error: ${emailHealth.error || 'Unknown error'}`);
        console.log('   Emails will be skipped until configuration is fixed');
      }
    } catch (error) {
      console.log('❌ Email service: Failed to initialize');
      console.log(`   Error: ${error.message}`);
    }

    app.listen(PORT, () => {
      console.log('='.repeat(50));
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Environment: ${NODE_ENV}`);
      console.log(`🗄️  Database: Connected`);
      console.log(`📧 Email: ${process.env.EMAIL_USER ? 'Configured' : '⚠️  Not configured'}`);
      console.log(`🔐 CORS: ${allowedOrigins.length} origins allowed`);
      console.log('='.repeat(50));
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to DB:', err);
    console.error('🔧 Troubleshooting steps:');
    console.error('1. Check if MONGO_URI is correctly set in your .env file');
    console.error('2. Ensure your IP is whitelisted in MongoDB Atlas');
    console.error('3. Verify MongoDB Atlas cluster is active and accessible');
    console.error('4. Check network connectivity');
    console.error('Refer to MongoDB Atlas documentation for IP whitelist configuration.');
    process.exit(1);
  });
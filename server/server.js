const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const { connectDB } = require('./config/db');

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
  'https://synnectify-careers-portal.vercel.app',
  // Add wildcard for Vercel preview deployments
  /\.vercel\.app$/,
  // Add wildcard for Render deployments
  /\.onrender\.com$/
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
      if (allowedOrigins.some(allowedOrigin => {
        if (typeof allowedOrigin === 'string') {
          return origin === allowedOrigin;
        } else if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        }
        return false;
      })) {
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
app.get('/api/ping', (req, res) => {
  res.status(200).json({ 
    status: 'active',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
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
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'SET' : 'MISSING',
    EMAIL_FROM: process.env.EMAIL_FROM || 'NOT SET',
    EMAIL_REPLY_TO: process.env.EMAIL_REPLY_TO || 'NOT SET',
    SMTP_HOST: process.env.SMTP_HOST || 'DEFAULT',
    SMTP_PORT: process.env.SMTP_PORT || 'DEFAULT',
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_URL: process.env.CLIENT_URL || 'NOT SET',
    PORT: process.env.PORT || '5000'
  };
  
  console.log('Environment variables check:', envVars);
  
  // Check if critical variables are set
  const criticalVars = ['EMAIL_USER', 'EMAIL_PASSWORD'];
  const missingVars = criticalVars.filter(varName => !process.env[varName]);
  
  res.json({
    message: 'Environment variables status',
    envVars,
    criticalCheck: {
      status: missingVars.length === 0 ? 'OK' : 'WARNING',
      missing: missingVars,
      message: missingVars.length === 0 
        ? 'All critical environment variables are set' 
        : `Missing critical variables: ${missingVars.join(', ')}`
    },
    deploymentInfo: {
      environment: process.env.NODE_ENV || 'development',
      port: process.env.PORT || 5000,
      clientUrl: process.env.CLIENT_URL || 'Not set'
    }
  });
});

// Email health check endpoint
app.get('/api/health/email', async (req, res) => {
  // Allow this endpoint in production only with an authorization header for security
  if (process.env.NODE_ENV === 'production') {
    const authHeader = req.headers.authorization;
    const expectedToken = process.env.HEALTH_CHECK_TOKEN || 'dev-token';
    
    // If no auth header or invalid token, return forbidden
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json({ 
        error: 'Forbidden', 
        message: 'Authorization header required for email health check in production' 
      });
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    if (token !== expectedToken) {
      return res.status(403).json({ 
        error: 'Forbidden', 
        message: 'Invalid authorization token' 
      });
    }
  }
  
  try {
    const { sendEmail } = require('./utils/mailer');
    
    console.log('Email health check requested');
    
    // Validate email configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(400).json({ 
        error: 'Email configuration incomplete',
        details: 'EMAIL_USER and EMAIL_PASS must be set in environment variables'
      });
    }
    
    // Send a test email
    const result = await sendEmail(
      process.env.EMAIL_USER, // Send to admin email
      'Email Health Check - SYNNECTIFY',
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">SYNNECTIFY Email Health Check</h2>
        <p>This is a test email to verify that the email system is working correctly.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>Server:</strong> ${req.get('host')}</p>
        <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
        <p>If you received this email, the email system is functioning properly.</p>
        <br>
        <p>Best regards,<br>SYNNECTIFY Team</p>
      </div>
      `
    );
    
    console.log('Email health check sent successfully:', result.messageId);
    
    res.json({ 
      message: 'Email health check sent successfully!',
      messageId: result.messageId,
      accepted: result.accepted || [],
      rejected: result.rejected || [],
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    console.error('Email health check failed:', error);
    res.status(500).json({ 
      error: 'Email health check failed',
      details: error.message,
      code: error.code
    });
  }
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
  .then(() => {
    app.listen(PORT, () => {
      console.log('='.repeat(50));
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Environment: ${NODE_ENV}`);
      console.log(`🗄️  Database: Connected`);
      console.log(`📧 Email: ${process.env.EMAIL_USER && process.env.EMAIL_PASSWORD ? 'Configured' : '⚠️  Not configured'}`);
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
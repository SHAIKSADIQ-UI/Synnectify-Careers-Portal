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
app.get('/api/ping', (req, res) => {
  res.status(200).json({ 
    status: 'active',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
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
  .then(() => {
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
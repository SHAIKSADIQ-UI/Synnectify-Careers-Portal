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
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175'
].filter(Boolean);

// In production, only allow specific domains
if (process.env.NODE_ENV === 'production') {
  console.log('🔒 Production mode: CORS restricted to:', process.env.CLIENT_URL);
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Static serving of uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
    process.exit(1);
  });
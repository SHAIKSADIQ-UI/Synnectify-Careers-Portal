const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn('MONGO_URI is not set');
    return;
  }
  try {
    await mongoose.connect(uri);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
}

module.exports = { connectDB };
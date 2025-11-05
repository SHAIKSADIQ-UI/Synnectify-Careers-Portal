const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn('MONGO_URI is not set');
    return;
  }
  
  // Add connection options for better reliability
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  };

  try {
    await mongoose.connect(uri, options);
    console.log('MongoDB Connected Successfully');
    
    // Log connection details for debugging (without exposing credentials)
    const dbName = mongoose.connection.name;
    console.log(`Connected to database: ${dbName}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.error('Common causes:');
    console.error('1. Incorrect MongoDB URI');
    console.error('2. Network connectivity issues');
    console.error('3. IP not whitelisted in MongoDB Atlas');
    console.error('4. Invalid credentials');
    console.error('Please check your MONGO_URI and ensure your IP is whitelisted in MongoDB Atlas.');
    throw err;
  }
}

module.exports = { connectDB };
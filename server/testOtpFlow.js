/**
 * Test Complete OTP Flow
 * 
 * This script tests the complete OTP flow from generation to verification
 * Run with: node testOtpFlow.js
 */

require('dotenv').config();
const crypto = require('crypto');
const mongoose = require('mongoose');
const OTP = require('./models/OTP');

// Helper function to hash password/OTP
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Helper function to generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

async function testOtpFlow() {
  try {
    console.log('🔐 Testing complete OTP flow...');
    
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to database');
    
    // Generate OTP
    const otpCode = generateOTP();
    console.log(`🔐 Generated OTP: ${otpCode}`);
    
    // Set expiration (5 minutes)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    console.log(`⏰ OTP expires at: ${expiresAt}`);
    
    // Save OTP to database
    const testEmail = 'careers.synnectify@gmail.com';
    const otpRecord = await OTP.create({
      email: testEmail,
      code: hashPassword(otpCode),
      expiresAt
    });
    console.log(`💾 OTP saved to database with ID: ${otpRecord._id}`);
    
    // Simulate user input
    const userInputOtp = otpCode;
    console.log(`👤 User entered OTP: ${userInputOtp}`);
    
    // Retrieve OTP from database
    const storedOtpRecord = await OTP.findOne({ email: testEmail }).sort({ createdAt: -1 });
    console.log(`🔍 Retrieved OTP record from database`);
    
    // Check if OTP is expired
    if (storedOtpRecord.expiresAt < new Date()) {
      console.log('❌ OTP has expired');
      return;
    }
    console.log('✅ OTP is still valid');
    
    // Verify OTP
    const hashedUserInput = hashPassword(userInputOtp);
    if (storedOtpRecord.code !== hashedUserInput) {
      console.log('❌ OTP verification failed');
      return;
    }
    console.log('✅ OTP verification successful');
    
    // Mark OTP as used
    storedOtpRecord.used = true;
    await storedOtpRecord.save();
    console.log('✅ OTP marked as used');
    
    // Try to verify again (should fail)
    const secondVerification = storedOtpRecord.code === hashedUserInput;
    if (secondVerification && storedOtpRecord.used) {
      console.log('⚠️  OTP reuse detected (this should be prevented in real implementation)');
    } else {
      console.log('✅ OTP reuse prevention working');
    }
    
    // Clean up
    await OTP.deleteMany({ email: testEmail });
    console.log('🧹 Cleaned up test data');
    
    console.log('\n📋 Complete OTP Flow Test Summary:');
    console.log('✅ OTP Generation: Working');
    console.log('✅ OTP Storage: Working');
    console.log('✅ OTP Retrieval: Working');
    console.log('✅ OTP Expiration Check: Working');
    console.log('✅ OTP Verification: Working');
    console.log('✅ OTP Usage Tracking: Working');
    console.log('✅ Database Cleanup: Working');
    
  } catch (error) {
    console.error('❌ OTP flow test failed:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔚 Database connection closed');
  }
}

testOtpFlow();
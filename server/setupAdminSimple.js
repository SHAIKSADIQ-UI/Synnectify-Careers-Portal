/**
 * Simple Admin Setup Script
 * 
 * This script sets up the admin user with predefined values
 * Run with: node setupAdminSimple.js
 */

const crypto = require('crypto');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');

// Helper function to hash password
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Main function
async function setupCareersAdmin() {
  try {
    console.log('\n🔐 SYNNECTIFY Careers Admin Setup (Simple Version)\n');
    console.log('='.repeat(50));
    
    // Connect to MongoDB
    console.log('\n📊 Connecting to database...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/it_website_db');
    console.log('✅ Connected to database\n');
    
    // Use the specific email for careers admin
    const adminEmail = 'careers.synnectify@gmail.com';
    const name = 'Synnectify Admin';
    const password = 'SecurePass123!'; // You should change this to a secure password
    
    console.log(`Setting up admin user with email: ${adminEmail}\n`);
    
    // Hash password
    const hashedPassword = hashPassword(password);
    
    console.log('📝 Creating/Updating careers admin user...');
    
    // Check if user exists
    let user = await User.findOne({ email: adminEmail });
    
    if (user) {
      // Update existing user
      console.log(`⚠️  User with email ${adminEmail} already exists. Updating...`);
      
      user.name = name;
      user.password = hashedPassword;
      user.role = 'admin';
      await user.save();
      
      console.log('✅ Careers admin user updated successfully!\n');
    } else {
      // Create new admin user
      user = await User.create({
        name,
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        photo: null
      });
      
      console.log('✅ New careers admin user created successfully!\n');
    }
    
    // Display summary
    console.log('='.repeat(50));
    console.log('\n📋 Careers Admin User Details:');
    console.log(`   Name: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Password: ${password} (save this securely!)`);
    console.log(`   Password Hash: ${hashedPassword.substring(0, 20)}...`);
    console.log('\n⚠️  IMPORTANT: Save your password securely!');
    console.log('   The password is hashed in the database and cannot be retrieved.\n');
    console.log('='.repeat(50));
    
    // Close connections
    await mongoose.connection.close();
    
    console.log('\n✅ Done! You can now login at /admin-login using careers.synnectify@gmail.com\n');
    console.log('🔐 Your admin password is: SecurePass123! (change this to something more secure)\n');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the script
setupCareersAdmin();
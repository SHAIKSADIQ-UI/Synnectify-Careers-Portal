/**
 * Admin User Management Script
 * 
 * This script helps create or update admin user credentials securely.
 * Run with: node create-admin.js
 */

const crypto = require('crypto');
const readline = require('readline');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to hash password
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Prompt for input
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Main function
async function createOrUpdateAdmin() {
  try {
    console.log('\n🔐 SYNNECTIFY Admin User Management\n');
    console.log('='.repeat(50));
    
    // Connect to MongoDB
    console.log('\n📊 Connecting to database...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/it_website_db');
    console.log('✅ Connected to database\n');
    
    // Get admin details
    console.log('Please provide admin user details:\n');
    
    const name = await prompt('Full Name (default: Admin): ') || 'Admin';
    const email = await prompt('Email (default: admin@synnectify.com): ') || 'admin@synnectify.com';
    
    // Password with validation
    let password = '';
    let confirmPassword = '';
    
    while (true) {
      password = await prompt('Password (min 8 characters): ');
      
      if (password.length < 8) {
        console.log('❌ Password must be at least 8 characters long. Try again.\n');
        continue;
      }
      
      confirmPassword = await prompt('Confirm Password: ');
      
      if (password !== confirmPassword) {
        console.log('❌ Passwords do not match. Try again.\n');
        continue;
      }
      
      break;
    }
    
    // Hash password
    const hashedPassword = hashPassword(password);
    
    console.log('\n📝 Creating/Updating admin user...');
    
    // Check if user exists
    let user = await User.findOne({ email });
    
    if (user) {
      // Update existing user
      console.log(`⚠️  User with email ${email} already exists. Updating...`);
      
      user.name = name;
      user.password = hashedPassword;
      user.role = 'admin';
      await user.save();
      
      console.log('✅ Admin user updated successfully!\n');
    } else {
      // Create new admin user
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'admin',
        photo: null
      });
      
      console.log('✅ New admin user created successfully!\n');
    }
    
    // Display summary
    console.log('='.repeat(50));
    console.log('\n📋 Admin User Details:');
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
    rl.close();
    
    console.log('\n✅ Done! You can now login at /admin-login\n');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await mongoose.connection.close();
    rl.close();
    process.exit(1);
  }
}

// Run the script
createOrUpdateAdmin();

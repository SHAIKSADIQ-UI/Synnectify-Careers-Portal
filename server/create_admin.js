const mongoose = require('mongoose');
const crypto = require('crypto');

// Simple hash function (for demo - in production use bcrypt)
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// User Schema (create if doesn't exist)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  photoURL: { type: String },
  firebaseUid: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/it_website_db');
    console.log('✅ Connected to MongoDB\n');

    const adminEmail = 'admin@synnectify.com';
    const adminPassword = 'admin123456'; // You can change this

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Role: ${existingAdmin.role}`);
      console.log('\nTo update password, delete the existing admin first.\n');
      
      // Update to admin role if not already
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('✅ Updated user role to admin\n');
      }
    } else {
      // Hash password
      const hashedPassword = hashPassword(adminPassword);
      
      // Create admin user
      const admin = await User.create({
        email: adminEmail,
        password: hashedPassword,
        name: 'Synnectify Admin',
        role: 'admin',
      });

      console.log('✅ Admin user created successfully!\n');
      console.log('┌─────────────────────────────────────────────┐');
      console.log('│         ADMIN LOGIN CREDENTIALS             │');
      console.log('└─────────────────────────────────────────────┘');
      console.log(`Email:    ${adminEmail}`);
      console.log(`Password: ${adminPassword}`);
      console.log('\n⚠️  IMPORTANT: Change this password after first login!\n');
    }

    await mongoose.connection.close();
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

createAdmin();

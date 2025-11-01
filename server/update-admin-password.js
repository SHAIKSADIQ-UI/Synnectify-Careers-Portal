const mongoose = require('mongoose');
const crypto = require('crypto');
require('dotenv').config();
const User = require('./models/User');

async function updateAdminPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const hash = crypto.createHash('sha256').update('admin123456').digest('hex');
    console.log('Password hash:', hash);

    const result = await User.updateOne(
      { email: 'admin@synnectify.com' },
      { $set: { password: hash } }
    );

    console.log('✅ Update result:', result);

    const user = await User.findOne({ email: 'admin@synnectify.com' });
    console.log('✅ Admin user:');
    console.log('  Email:', user.email);
    console.log('  Name:', user.name);
    console.log('  Role:', user.role);
    console.log('  Password hash:', user.password ? user.password.substring(0, 30) + '...' : 'NOT SET');

    await mongoose.connection.close();
    console.log('\n✅ Admin password updated successfully!');
    console.log('You can now login with:');
    console.log('  Email: admin@synnectify.com');
    console.log('  Password: Synnectify-Careers_2906');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateAdminPassword();

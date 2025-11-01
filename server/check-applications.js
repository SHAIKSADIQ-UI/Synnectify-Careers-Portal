const mongoose = require('mongoose');
require('dotenv').config();
const Application = require('./models/Application');
const Job = require('./models/Job'); // Need to register Job model

async function checkApplications() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const apps = await Application.find().populate('jobId');
    
    console.log(`Total Applications: ${apps.length}\n`);
    
    apps.forEach((app, index) => {
      console.log(`${index + 1}. ${app.name}`);
      console.log(`   Email: ${app.email}`);
      console.log(`   Status: ${app.status}`);
      console.log(`   Job Title: ${app.jobId?.title || 'N/A'}`);
      console.log(`   Job ID: ${app.jobId?._id || 'Not linked'}`);
      console.log(`   Applied: ${app.appliedAt}`);
      console.log('');
    });

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkApplications();

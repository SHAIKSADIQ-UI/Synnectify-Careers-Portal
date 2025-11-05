const mongoose = require('mongoose');
const Job = require('./models/Job');

// Use the same MongoDB URI as the main application
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/it_website_db';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Fetch all jobs
    const jobs = await Job.find({});
    console.log(`Found ${jobs.length} jobs in the database:`);
    
    jobs.forEach(job => {
      console.log(`- ${job.title} (${job.location})`);
    });
    
    mongoose.connection.close();
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
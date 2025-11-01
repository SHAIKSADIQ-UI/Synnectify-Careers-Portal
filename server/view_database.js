const { MongoClient } = require('mongodb');

async function viewDatabase() {
  const client = new MongoClient('mongodb://127.0.0.1:27017');
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB\n');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('              DATABASE: it_website_db');
    console.log('═══════════════════════════════════════════════════════════\n');
    
    const db = client.db('it_website_db');
    
    // Get all collections
    const collections = await db.listCollections().toArray();
    console.log(`📂 Collections found: ${collections.length}\n`);
    
    // ========== USERS COLLECTION ==========
    console.log('┌─────────────────────────────────────────────────────────┐');
    console.log('│                   👥 USERS COLLECTION                   │');
    console.log('└─────────────────────────────────────────────────────────┘\n');
    
    const users = await db.collection('users').find({}).toArray();
    console.log(`Total users: ${users.length}\n`);
    
    if (users.length > 0) {
      users.forEach((user, index) => {
        console.log(`User #${index + 1}:`);
        console.log(`  ID: ${user._id}`);
        console.log(`  Email: ${user.email || 'N/A'}`);
        console.log(`  Name: ${user.name || 'N/A'}`);
        console.log(`  Role: ${user.role || 'user'}`);
        console.log(`  Photo: ${user.photoURL ? 'Yes' : 'No'}`);
        console.log(`  Created: ${user.createdAt || 'N/A'}`);
        console.log('');
      });
    } else {
      console.log('  ⚠️  No users found in database\n');
    }
    
    // ========== JOBS COLLECTION ==========
    console.log('┌─────────────────────────────────────────────────────────┐');
    console.log('│                   💼 JOBS COLLECTION                    │');
    console.log('└─────────────────────────────────────────────────────────┘\n');
    
    const jobs = await db.collection('jobs').find({}).toArray();
    console.log(`Total jobs: ${jobs.length}\n`);
    
    if (jobs.length > 0) {
      jobs.forEach((job, index) => {
        console.log(`Job #${index + 1}:`);
        console.log(`  ID: ${job._id}`);
        console.log(`  Title: ${job.title}`);
        console.log(`  Location: ${job.location}`);
        console.log(`  Type: ${job.type}`);
        console.log(`  Department: ${job.department || 'N/A'}`);
        console.log(`  Salary: ${job.salary || 'N/A'}`);
        console.log(`  Requirements: ${job.requirements ? job.requirements.length : 0} items`);
        console.log(`  Responsibilities: ${job.responsibilities ? job.responsibilities.length : 0} items`);
        console.log(`  Created: ${job.createdAt}`);
        console.log('');
      });
    } else {
      console.log('  ⚠️  No jobs found in database\n');
    }
    
    // ========== APPLICATIONS COLLECTION ==========
    console.log('┌─────────────────────────────────────────────────────────┐');
    console.log('│                📋 APPLICATIONS COLLECTION               │');
    console.log('└─────────────────────────────────────────────────────────┘\n');
    
    const applications = await db.collection('applications').find({}).toArray();
    console.log(`Total applications: ${applications.length}\n`);
    
    if (applications.length > 0) {
      applications.forEach((app, index) => {
        console.log(`Application #${index + 1}:`);
        console.log(`  ID: ${app._id}`);
        console.log(`  Name: ${app.name}`);
        console.log(`  Email: ${app.email}`);
        console.log(`  Job ID: ${app.jobId || 'N/A'}`);
        console.log(`  Status: ${app.status || 'Pending'}`);
        console.log(`  Resume: ${app.resume || 'N/A'}`);
        console.log(`  Applied: ${app.appliedAt}`);
        console.log('');
      });
    } else {
      console.log('  ⚠️  No applications found in database\n');
    }
    
    // ========== SUMMARY ==========
    console.log('┌─────────────────────────────────────────────────────────┐');
    console.log('│                      📊 SUMMARY                         │');
    console.log('└─────────────────────────────────────────────────────────┘\n');
    console.log(`  Users:        ${users.length}`);
    console.log(`  Jobs:         ${jobs.length}`);
    console.log(`  Applications: ${applications.length}`);
    console.log('\n═══════════════════════════════════════════════════════════\n');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('✅ Database connection closed\n');
  }
}

viewDatabase();

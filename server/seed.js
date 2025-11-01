// Seed script to populate database with sample jobs
// Run with: node server/seed.js

require('dotenv').config({ path: './server/.env' });
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  department: String,
  experience: String,
  salary: String,
  createdAt: { type: Date, default: Date.now },
}, { versionKey: false });

const Job = mongoose.model('Job', jobSchema);

const sampleJobs = [
  {
    title: 'Senior React Developer',
    description: 'We are looking for a skilled React Developer to join our frontend team and build amazing user experiences.',
    location: 'Vijayawada, AP',
    type: 'Full-time',
    department: 'Engineering',
    experience: '3-5 years',
    salary: '₹8-15 LPA',
  },
  {
    title: 'UI/UX Designer',
    description: 'Join our design team to create beautiful and intuitive user interfaces that delight our clients.',
    location: 'Vijayawada, AP',
    type: 'Full-time',
    department: 'Design',
    experience: '2-4 years',
    salary: '₹6-12 LPA',
  },
  {
    title: 'Node.js Backend Developer',
    description: 'Build scalable backend systems and APIs that power our applications and serve millions of users.',
    location: 'Vijayawada, AP',
    type: 'Full-time',
    department: 'Engineering',
    experience: '2-5 years',
    salary: '₹7-14 LPA',
  },
  {
    title: 'Digital Marketing Specialist',
    description: 'Drive our digital marketing efforts and help clients achieve their marketing goals through innovative strategies.',
    location: 'Vijayawada, AP',
    type: 'Full-time',
    department: 'Marketing',
    experience: '1-3 years',
    salary: '₹4-8 LPA',
  },
  {
    title: 'Project Manager',
    description: 'Lead project teams and ensure successful delivery of client projects on time and within budget.',
    location: 'Vijayawada, AP',
    type: 'Full-time',
    department: 'Operations',
    experience: '3-6 years',
    salary: '₹10-18 LPA',
  },
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/itwebsite');
    console.log('Connected to MongoDB');

    // Clear existing jobs
    await Job.deleteMany({});
    console.log('Cleared existing jobs');

    // Insert sample jobs
    const result = await Job.insertMany(sampleJobs);
    console.log(`✅ Inserted ${result.length} sample jobs`);

    console.log('\nSample Jobs:');
    result.forEach((job, index) => {
      console.log(`${index + 1}. ${job.title} - ${job.department}`);
    });

    console.log('\n✨ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

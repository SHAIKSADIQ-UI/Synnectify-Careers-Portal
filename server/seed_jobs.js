const mongoose = require('mongoose');
const Job = require('./models/Job');

const sampleJobs = [
  {
    title: 'Full Stack Developer',
    description: 'We are looking for a talented Full Stack Developer to join our team. You will be responsible for developing and maintaining web applications using modern technologies.',
    location: 'Remote',
    type: 'Full-time',
    department: 'Engineering',
    experience: '2-4 years',
    salary: '$80,000 - $120,000',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      'Strong proficiency in JavaScript, React, and Node.js',
      'Experience with MongoDB and REST API design',
      'Familiarity with Git and version control',
      'Excellent problem-solving and debugging skills'
    ],
    responsibilities: [
      'Design and develop responsive web applications',
      'Write clean, maintainable, and efficient code',
      'Collaborate with cross-functional teams',
      'Participate in code reviews and technical discussions',
      'Optimize applications for maximum speed and scalability'
    ]
  },
  {
    title: 'UI/UX Designer',
    description: 'Join our creative team as a UI/UX Designer. Create intuitive and visually appealing designs that enhance user experience across our digital products.',
    location: 'Hybrid - New York',
    type: 'Full-time',
    department: 'Design',
    experience: '3-5 years',
    salary: '$70,000 - $100,000',
    requirements: [
      'Portfolio demonstrating UI/UX design expertise',
      'Proficiency in Figma, Adobe XD, or Sketch',
      'Strong understanding of user-centered design principles',
      'Experience with responsive and mobile-first design',
      'Knowledge of HTML/CSS is a plus'
    ],
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity mockups',
      'Conduct user research and usability testing',
      'Collaborate with developers to implement designs',
      'Maintain and evolve design systems',
      'Present design concepts to stakeholders'
    ]
  },
  {
    title: 'DevOps Engineer',
    description: 'We need an experienced DevOps Engineer to build and maintain our cloud infrastructure, ensuring high availability and performance of our systems.',
    location: 'Remote',
    type: 'Full-time',
    department: 'Operations',
    experience: '4-6 years',
    salary: '$100,000 - $140,000',
    requirements: [
      'Strong experience with AWS, Azure, or Google Cloud Platform',
      'Proficiency in Docker, Kubernetes, and containerization',
      'Experience with CI/CD pipelines (Jenkins, GitLab CI, GitHub Actions)',
      'Scripting skills in Python, Bash, or similar',
      'Knowledge of infrastructure as code (Terraform, CloudFormation)'
    ],
    responsibilities: [
      'Design and implement scalable cloud infrastructure',
      'Automate deployment and monitoring processes',
      'Ensure system security and compliance',
      'Troubleshoot production issues and optimize performance',
      'Collaborate with development teams on infrastructure needs'
    ]
  },
  {
    title: 'Data Scientist',
    description: 'Seeking a Data Scientist to analyze complex data sets and build machine learning models that drive business insights and decision-making.',
    location: 'On-site - San Francisco',
    type: 'Full-time',
    department: 'Analytics',
    experience: '3-5 years',
    salary: '$90,000 - $130,000',
    requirements: [
      'Master\'s or Ph.D. in Data Science, Statistics, or related field',
      'Strong programming skills in Python and R',
      'Experience with machine learning frameworks (TensorFlow, PyTorch)',
      'Proficiency in SQL and data visualization tools',
      'Excellent analytical and communication skills'
    ],
    responsibilities: [
      'Develop and deploy machine learning models',
      'Analyze large datasets to identify trends and patterns',
      'Create data visualizations and dashboards',
      'Collaborate with stakeholders to understand business needs',
      'Present findings and recommendations to leadership'
    ]
  },
  {
    title: 'Product Manager',
    description: 'Lead product development initiatives as a Product Manager. Define product vision, strategy, and roadmap while working closely with engineering and design teams.',
    location: 'Hybrid - Seattle',
    type: 'Full-time',
    department: 'Product',
    experience: '5-7 years',
    salary: '$110,000 - $150,000',
    requirements: [
      'Bachelor\'s degree in Business, Computer Science, or related field',
      'Proven track record of managing successful products',
      'Strong understanding of agile methodologies',
      'Excellent stakeholder management skills',
      'Data-driven approach to decision-making'
    ],
    responsibilities: [
      'Define product vision and strategy',
      'Create and prioritize product roadmap',
      'Work with engineering to deliver features',
      'Conduct market research and competitive analysis',
      'Gather and analyze user feedback for product improvements'
    ]
  }
];

mongoose.connect('mongodb://127.0.0.1:27017/it_website_db')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Clear existing jobs
    await Job.deleteMany({});
    console.log('Cleared existing jobs');
    
    // Insert sample jobs
    const result = await Job.insertMany(sampleJobs);
    console.log(`✅ Successfully seeded ${result.length} jobs`);
    
    // Display inserted jobs
    console.log('\n=== INSERTED JOBS ===');
    result.forEach(job => {
      console.log(`\n📌 ${job.title}`);
      console.log(`   Location: ${job.location}`);
      console.log(`   Type: ${job.type}`);
      console.log(`   Requirements: ${job.requirements.length} items`);
      console.log(`   Responsibilities: ${job.responsibilities.length} items`);
    });
    
    mongoose.connection.close();
    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });

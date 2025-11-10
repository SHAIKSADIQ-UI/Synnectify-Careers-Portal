const dotenv = require('dotenv');
dotenv.config();

// Mock express app to test the application flow
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.memoryStorage(); // Use memory storage for testing
const upload = multer({ storage });

// Import our application logic
const {
  sendApplicationReceived,
  notifyAdminOnNewApplication
} = require('./utils/emailService');

const app = express();
app.use(express.json());

// Mock Application model
const MockApplication = {
  create: async (data) => {
    console.log('📝 Creating mock application with data:', data);
    return {
      _id: 'mock-app-id-123',
      ...data,
      appliedAt: new Date()
    };
  }
};

// Mock Job model
const MockJob = {
  findById: async (id) => {
    console.log('🔍 Looking up job by ID:', id);
    if (id === 'job-123') {
      return { _id: 'job-123', title: 'Software Engineer' };
    }
    return null;
  },
  findOne: async (query) => {
    console.log('🔍 Looking up job by query:', query);
    if (query.title === 'Software Engineer') {
      return { _id: 'job-123', title: 'Software Engineer' };
    }
    return null;
  }
};

// Test the application submission flow
app.post('/api/applications/apply', upload.single('resume'), async (req, res) => {
  try {
    console.log('\n=== TESTING APPLICATION SUBMISSION FLOW ===');
    
    // Extract form data
    const {
      jobId,
      name,
      email,
      firstName,
      lastName,
      position
    } = req.body;
    
    console.log('📋 Form data received:', { jobId, name, email, firstName, lastName, position });
    
    // Process job information
    let job = null;
    let jobTitle = position || 'General Position';
    let finalJobId = null;
    
    if (jobId && jobId !== 'undefined' && jobId !== 'null') {
      console.log('🔍 Looking up job by ID:', jobId);
      job = await MockJob.findById(jobId);
      if (job) {
        jobTitle = job.title;
        finalJobId = job._id;
        console.log('✅ Found job by ID:', jobTitle);
      }
    } else if (position) {
      console.log('🔍 Looking up job by title:', position);
      job = await MockJob.findOne({ title: position });
      if (job) {
        finalJobId = job._id;
        jobTitle = job.title;
        console.log('✅ Found job by title:', jobTitle);
      }
    }
    
    const fullName = firstName && lastName ? `${firstName} ${lastName}` : name;
    const applicantEmail = email;
    
    console.log('👤 Applicant:', fullName, '(', applicantEmail, ')');
    console.log('💼 Position:', jobTitle);
    
    // Validate required fields
    if (!fullName || !applicantEmail) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    // Create application record
    console.log('💾 Creating application record...');
    const appDoc = await MockApplication.create({ 
      jobId: finalJobId,
      position: jobTitle,
      name: fullName, 
      email: applicantEmail
    });
    
    console.log('✅ Application created with ID:', appDoc._id);
    
    // Send notification emails
    console.log('📧 Sending notification emails...');
    
    try {
      console.log('📧 Sending admin notification...');
      await notifyAdminOnNewApplication({
        toAdmin: 'careers.synnectify@gmail.com',
        jobTitle: jobTitle,
        applicantName: fullName,
        applicationId: appDoc._id
      });
      console.log('✅ Admin notification sent');
    } catch (emailError) {
      console.log('⚠️ Admin notification failed (but application saved):', emailError.message);
    }
    
    try {
      console.log('📧 Sending applicant confirmation...');
      await sendApplicationReceived({
        to: applicantEmail,
        applicantName: fullName,
        jobTitle: jobTitle,
        applicationId: appDoc._id
      });
      console.log('✅ Applicant confirmation sent');
    } catch (emailError) {
      console.log('⚠️ Applicant confirmation failed (but application saved):', emailError.message);
    }
    
    console.log('🎉 Application submission flow completed successfully!\n');
    
    res.status(201).json({ 
      message: 'Application submitted successfully', 
      application: appDoc 
    });
    
  } catch (err) {
    console.error('❌ Application submission failed:', err.message);
    res.status(500).json({ 
      error: 'Server error', 
      details: err.message 
    });
  }
});

const PORT = process.env.TEST_PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Test server running on http://localhost:${PORT}`);
  console.log('🧪 You can test the application flow by sending a POST request to /api/applications/apply');
  console.log('📋 Example curl command:');
  console.log(`   curl -X POST http://localhost:${PORT}/api/applications/apply \\`);
  console.log('        -H "Content-Type: application/json" \\');
  console.log('        -d \'{"firstName":"John","lastName":"Doe","email":"john.doe@example.com","position":"Software Engineer"}\'');
});

module.exports = app;
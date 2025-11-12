const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const Application = require('../models/Application');
const Job = require('../models/Job');
const { sendEmail } = require('../utils/mailer');
const {
  sendApplicationReceived,
  sendShortlisted,
  sendRejected,
  sendInterviewScheduled,
  sendCompleted,
  notifyAdminOnNewApplication
} = require('../utils/emailService');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '');
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

function verifyToken(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}

// Submit application
router.post('/apply', upload.single('resume'), async (req, res) => {
  try {
    console.log('=== APPLICATION SUBMISSION START ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    console.log('File upload:', req.file);
    
    // Extract all form fields
    const {
      jobId,
      name,
      email,
      message,
      firstName,
      lastName,
      phone,
      dob,
      gender,
      address,
      country,
      state,
      city,
      zipCode,
      currentPosition,
      currentCompany,
      totalExperience,
      skills,
      expertise,
      education,
      experience,
      portfolio,
      github,
      linkedin,
      coverLetter,
      position
    } = req.body;
    
    console.log('Extracted data:', { jobId, name, email, firstName, lastName, phone, position });
    
    // Support both jobId (from dashboard) and position (from careers page direct apply)
    let job = null;
    let jobTitle = position || 'General Position';
    let finalJobId = null;
    
    if (jobId && jobId !== 'undefined' && jobId !== 'null') {
      console.log('Looking up job by ID:', jobId);
      job = await Job.findById(jobId);
      if (!job) {
        console.log(`⚠️ Job with ID ${jobId} not found`);
      } else {
        jobTitle = job.title;
        finalJobId = job._id;
        console.log('✅ Found job by ID:', jobTitle);
      }
    } else if (position) {
      // Try to find job by title
      console.log('Looking up job by title:', position);
      job = await Job.findOne({ title: position });
      if (job) {
        finalJobId = job._id;
        jobTitle = job.title;
        console.log('✅ Found job by title:', jobTitle);
      } else {
        console.log(`⚠️ No job found with title: ${position}`);
      }
    }

    const fullName = firstName && lastName ? `${firstName} ${lastName}` : name;
    const applicantEmail = email;
    
    console.log('Full name:', fullName);
    console.log('Applicant email:', applicantEmail);
    
    if (!fullName || !applicantEmail) {
      console.log('❌ Missing required fields: name or email');
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const resumePath = req.file ? `/uploads/${req.file.filename}` : undefined;
    console.log('Resume path:', resumePath);
    
    // Create application record with all fields
    console.log('Creating application record...');
    const appDoc = await Application.create({ 
      jobId: finalJobId,
      position: jobTitle, // ✅ Store the position name
      name: fullName, 
      email: applicantEmail, 
      message: message || coverLetter || '', 
      resume: resumePath,
      phone: phone || '',
      dob: dob || '',
      gender: gender || '',
      address: address || '',
      country: country || '',
      state: state || '',
      city: city || '',
      zipCode: zipCode || '',
      currentPosition: currentPosition || '',
      currentCompany: currentCompany || '',
      totalExperience: totalExperience || '',
      skills: skills || '',
      expertise: expertise || '',
      education: education || '',
      experience: experience || '',
      portfolio: portfolio || '',
      github: github || '',
      linkedin: linkedin || ''
    });
    
    console.log(`✅ Application created successfully: ${appDoc._id} for ${jobTitle}`);

    // Respond immediately after saving the application
    console.log('=== APPLICATION SUBMISSION COMPLETE (responding immediately) ===');
    res.status(201).json({ message: 'Application submitted successfully', application: appDoc });

    // Fire-and-forget email sending to avoid delaying the response
    // This keeps the original behavior (notify admin + applicant) without blocking the client
    try {
      console.log('📧 Queueing emails (non-blocking) ...');
      const tasks = [
        notifyAdminOnNewApplication({
          toAdmin: 'careers.synnectify@gmail.com',
          jobTitle: jobTitle,
          applicantName: fullName,
          applicationId: appDoc._id
        }),
        sendApplicationReceived({
          to: applicantEmail,
          applicantName: fullName,
          jobTitle: jobTitle,
          applicationId: appDoc._id
        })
      ];

      Promise.allSettled(tasks).then((results) => {
        const [adminRes, applicantRes] = results;
        if (adminRes.status === 'fulfilled') {
          console.log('✅ Company notification email sent successfully');
        } else {
          const e = adminRes.reason || {};
          console.error('⚠️ Failed to send company email:', e.message || e);
        }
        if (applicantRes.status === 'fulfilled') {
          console.log('✅ Applicant confirmation email sent successfully');
        } else {
          const e = applicantRes.reason || {};
          console.error('⚠️ Failed to send applicant email:', e.message || e);
        }
      }).catch((e) => {
        console.error('⚠️ Email dispatch encountered an unexpected error:', e.message || e);
      });
    } catch (dispatchErr) {
      console.error('⚠️ Failed to queue emails:', dispatchErr.message || dispatchErr);
    }
  } catch (err) {
    console.error('❌ Application submission error:', err);
    console.error('Error details:', err.message);
    console.error('Stack trace:', err.stack);
    
    // Provide more specific error messages
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: Object.values(err.errors).map(e => e.message) 
      });
    }
    
    if (err.name === 'MongoError' && err.code === 11000) {
      return res.status(400).json({ 
        error: 'Duplicate application', 
        details: 'An application with this email already exists for this position' 
      });
    }
    
    res.status(500).json({ 
      error: 'Server error. Please try again later.', 
      details: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});

// Get applications for a user by email
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'email query required' });
    const apps = await Application.find({ email }).sort({ appliedAt: -1 }).populate('jobId');
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: get all applications
router.get('/all', verifyToken, requireAdmin, async (_req, res) => {
  try {
    const apps = await Application.find().sort({ appliedAt: -1 }).populate('jobId');
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update status and notify
router.patch('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;
    if (!['Pending', 'Shortlisted', 'Rejected', 'Ignored', 'Interview', 'Completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    // Prepare update object
    const updateData = { status };
    if (note !== undefined) {
      updateData.note = note;
    }
    
    const application = await Application.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('jobId');
    if (!application) return res.status(404).json({ error: 'Application not found' });

    // Send status email ONLY if not ignored
    // When status is "Ignored", no email is sent (for spam/incomplete applications)
    if (status !== 'Ignored') {
      try {
        if (status === 'Shortlisted') {
          await sendShortlisted({
            to: application.email,
            applicantName: application.name,
            jobTitle: application.jobId?.title || 'the applied position'
          });
          console.log(`✅ Shortlisted email sent to ${application.email}`);
        } else if (status === 'Rejected') {
          await sendRejected({
            to: application.email,
            applicantName: application.name,
            jobTitle: application.jobId?.title || 'the applied position'
          });
          console.log(`✅ Rejected email sent to ${application.email}`);
        } else if (status === 'Interview') {
          // For interview status, we'll use the existing logic in the schedule-interview route
          // This is for manual status updates to Interview without scheduling details
          await sendInterviewScheduled({
            to: application.email,
            applicantName: application.name,
            jobTitle: application.jobId?.title || 'the applied position',
            dateTime: application.interviewDetails?.date ? 
              `${application.interviewDetails?.date} ${application.interviewDetails?.time || ''}` : 
              'To be confirmed',
            meetingLink: application.interviewDetails?.meetingLink || 'To be confirmed'
          });
          console.log(`✅ Interview scheduled email sent to ${application.email}`);
        } else if (status === 'Completed') {
          await sendCompleted({
            to: application.email,
            applicantName: application.name,
            jobTitle: application.jobId?.title || 'the applied position'
          });
          console.log(`✅ Completed email sent to ${application.email}`);
        } else {
          // For other statuses (Pending, etc.) - generic email
          const subject = `Application Status Update - ${application.jobId?.title || 'Position'} at SYNNECTIFY`;
          const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
              <div style="background: linear-gradient(135deg, #f97316 0%, #3b82f6 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">SYNNECTIFY</h1>
                <p style="color: white; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Career Portal</p>
              </div>
              
              <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
                <h2 style="color: #1f2937; margin-top: 0;">Application Status Update</h2>
                
                <p style="color: #4b5563; line-height: 1.6;">Dear <strong>${application.name}</strong>,</p>
                
                <p style="color: #4b5563; line-height: 1.6;">
                  Your application status for <strong>${application.jobId?.title || 'the position'}</strong> has been updated to: <strong>${status}</strong>.
                </p>
                
                <p style="color: #6b7280; font-size: 13px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                  <strong>Note:</strong> This is an automated no-reply email. For inquiries, contact <a href="mailto:careers.synnectify@gmail.com" style="color: #f97316;">careers.synnectify@gmail.com</a>
                </p>
                
                <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 20px;">
                  &copy; ${new Date().getFullYear()} SYNNECTIFY. All rights reserved.
                </p>
              </div>
            </div>
          `;
          
          await sendEmail(application.email, subject, html);
          console.log(`✅ Generic status email sent to ${application.email}`);
        }
      } catch (emailError) {
        console.error(`⚠️ Failed to send email for ${status} status:`, emailError.message);
      }
    } else {
      console.log(`⚠️ Status set to Ignored - NO EMAIL sent to ${application.email}`);
    }

    res.json({ message: 'Status updated', application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Schedule interview
router.patch('/:id/schedule-interview', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, interviewDetails, note } = req.body;
    
    if (status !== 'Interview') {
      return res.status(400).json({ error: 'Invalid status for interview scheduling' });
    }
    
    // Validate and sanitize interview details
    const sanitizedInterviewDetails = {
      date: interviewDetails?.date ? interviewDetails.date.trim() : '',
      time: interviewDetails?.time ? interviewDetails.time.trim() : '',
      meetingLink: interviewDetails?.meetingLink ? interviewDetails.meetingLink.trim() : '',
      comments: interviewDetails?.comments ? interviewDetails.comments.trim() : ''
    };
    
    // Basic validation for required fields
    if (!sanitizedInterviewDetails.date) {
      return res.status(400).json({ error: 'Interview date is required' });
    }
    
    if (!sanitizedInterviewDetails.time) {
      return res.status(400).json({ error: 'Interview time is required' });
    }
    
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(sanitizedInterviewDetails.date)) {
      return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD format.' });
    }
    
    // Validate time format (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(sanitizedInterviewDetails.time)) {
      return res.status(400).json({ error: 'Invalid time format. Please use HH:MM format.' });
    }
    
    // Prepare update object
    const updateData = { 
      status: 'Interview',
      interviewDetails: sanitizedInterviewDetails
    };
    
    if (note !== undefined) {
      updateData.note = note;
    }
    
    const application = await Application.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('jobId');
    if (!application) return res.status(404).json({ error: 'Application not found' });

    // Send interview confirmation email using the new email service
    try {
      await sendInterviewScheduled({
        to: application.email,
        applicantName: application.name,
        jobTitle: application.jobId?.title || 'the applied position',
        dateTime: `${sanitizedInterviewDetails.date} ${sanitizedInterviewDetails.time}`,
        meetingLink: sanitizedInterviewDetails.meetingLink
      });
      console.log(`✅ Interview confirmation email sent to ${application.email}`);
    } catch (emailError) {
      console.error(`⚠️ Failed to send interview email:`, emailError.message);
    }

    res.json({ message: 'Interview scheduled', application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE application by id (admin only)
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findByIdAndDelete(id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json({ message: 'Application deleted successfully' });
  } catch (err) {
    console.error('Error deleting application:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const Application = require('../models/Application');
const Job = require('../models/Job');
const { sendEmail } = require('../utils/mailer');

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
    
    // Support both jobId (from dashboard) and position (from careers page direct apply)
    let job = null;
    let jobTitle = position || 'General Position';
    let finalJobId = null;
    
    if (jobId && jobId !== 'undefined' && jobId !== 'null') {
      job = await Job.findById(jobId);
      if (!job) {
        console.log(`Job with ID ${jobId} not found`);
      } else {
        jobTitle = job.title;
        finalJobId = job._id;
      }
    } else if (position) {
      // Try to find job by title
      job = await Job.findOne({ title: position });
      if (job) {
        finalJobId = job._id;
        jobTitle = job.title;
        console.log(`Found job by title: ${jobTitle}`);
      } else {
        console.log(`No job found with title: ${position}`);
      }
    }

    const fullName = firstName && lastName ? `${firstName} ${lastName}` : name;
    const applicantEmail = email;
    
    if (!fullName || !applicantEmail) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const resumePath = req.file ? `/uploads/${req.file.filename}` : undefined;
    
    // Create application record with all fields
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
    
    console.log(`Application created: ${appDoc._id} for ${jobTitle}`);

    // === EMAIL 1: Send to careers.synnectify@gmail.com (Company Notification) ===
    const companyEmail = 'careers.synnectify@gmail.com';
    const companySubject = `New Job Application Received - ${jobTitle}`;
    const companyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #f97316 0%, #3b82f6 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">SYNNECTIFY</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">New Application Alert</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1f2937; margin-top: 0;">📋 New Application Received</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0; font-size: 16px;">Applicant Details:</h3>
            <ul style="color: #4b5563; margin: 10px 0; padding-left: 20px; line-height: 1.8;">
              <li><strong>Name:</strong> ${fullName}</li>
              <li><strong>Email:</strong> ${applicantEmail}</li>
              <li><strong>Phone:</strong> ${phone || 'N/A'}</li>
              <li><strong>DOB:</strong> ${dob || 'N/A'}</li>
              <li><strong>Gender:</strong> ${gender || 'N/A'}</li>
              <li><strong>LinkedIn:</strong> ${linkedin || 'N/A'}</li>
              <li><strong>Position:</strong> ${jobTitle}</li>
              <li><strong>Application Date:</strong> ${new Date().toLocaleDateString()}</li>
              ${message || coverLetter ? `<li><strong>Message:</strong> ${message || coverLetter}</li>` : ''}
            </ul>
          </div>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0; font-size: 16px;">Contact Details:</h3>
            <ul style="color: #4b5563; margin: 10px 0; padding-left: 20px; line-height: 1.8;">
              <li><strong>Address:</strong> ${address || 'N/A'}</li>
              <li><strong>City:</strong> ${city || 'N/A'}</li>
              <li><strong>State:</strong> ${state || 'N/A'}</li>
              <li><strong>Country:</strong> ${country || 'N/A'}</li>
              <li><strong>Zip Code:</strong> ${zipCode || 'N/A'}</li>
            </ul>
          </div>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0; font-size: 16px;">Professional Information:</h3>
            <ul style="color: #4b5563; margin: 10px 0; padding-left: 20px; line-height: 1.8;">
              <li><strong>Current Position:</strong> ${currentPosition || 'N/A'}</li>
              <li><strong>Current Company:</strong> ${currentCompany || 'N/A'}</li>
              <li><strong>Total Experience:</strong> ${totalExperience || 'N/A'}</li>
            </ul>
          </div>
          
          ${skills ? `<div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0; font-size: 16px;">Skills:</h3>
            <p style="color: #4b5563; margin: 10px 0;">${skills}</p>
          </div>` : ''}
          
          ${expertise ? `<div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0; font-size: 16px;">Expertise:</h3>
            <p style="color: #4b5563; margin: 10px 0;">${expertise}</p>
          </div>` : ''}
          
          ${education ? `<div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0; font-size: 16px;">Education:</h3>
            <p style="color: #4b5563; margin: 10px 0;">${education}</p>
          </div>` : ''}
          
          ${experience ? `<div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0; font-size: 16px;">Experience:</h3>
            <p style="color: #4b5563; margin: 10px 0;">${experience}</p>
          </div>` : ''}
          
          ${portfolio || github || linkedin ? `<div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0; font-size: 16px;">Additional Links:</h3>
            <ul style="color: #4b5563; margin: 10px 0; padding-left: 20px; line-height: 1.8;">
              ${portfolio ? `<li><strong>Portfolio:</strong> ${portfolio}</li>` : ''}
              ${github ? `<li><strong>GitHub:</strong> ${github}</li>` : ''}
              ${linkedin ? `<li><strong>LinkedIn:</strong> ${linkedin}</li>` : ''}
            </ul>
          </div>` : ''}
          
          ${resumePath ? `<p style="color: #4b5563;">📎 <strong>Resume attached:</strong> Check server uploads folder</p>` : ''}
          
          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 20px;">
            &copy; ${new Date().getFullYear()} SYNNECTIFY. All rights reserved.
          </p>
        </div>
      </div>
    `;
    
    // Try to send emails, but don't fail the application if emails fail
    try {
      await sendEmail(companyEmail, companySubject, companyHtml);
      console.log('✅ Company notification email sent');
    } catch (emailError) {
      console.error('⚠️ Failed to send company email, but application saved:', emailError.message);
    }

    // === EMAIL 2: Send confirmation to applicant ===
    const applicantSubject = `Application Received - ${jobTitle} at SYNNECTIFY`;
    const applicantHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #f97316 0%, #3b82f6 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">SYNNECTIFY</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Career Portal</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1f2937; margin-top: 0;">✅ Application Received!</h2>
          
          <p style="color: #4b5563; line-height: 1.6;">Dear <strong>${fullName}</strong>,</p>
          
          <p style="color: #4b5563; line-height: 1.6;">
            Thank you for applying for the position of <strong>${jobTitle}</strong> at SYNNECTIFY. 
            We have successfully received your application.
          </p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0; font-size: 16px;">Application Details:</h3>
            <ul style="color: #4b5563; margin: 10px 0; padding-left: 20px;">
              <li><strong>Position:</strong> ${jobTitle}</li>
              <li><strong>Status:</strong> <span style="color: #f59e0b;">Pending Review</span></li>
              <li><strong>Applied On:</strong> ${new Date().toLocaleDateString()}</li>
            </ul>
          </div>
          
          <p style="color: #4b5563; line-height: 1.6;">
            Our recruitment team will review your application and get back to you within 5-7 business days.
          </p>
          
          <p style="color: #6b7280; font-size: 13px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <strong>Note:</strong> This is an automated no-reply email. Please do not respond to this message.
            If you have any questions, please contact us at <a href="mailto:careers.synnectify@gmail.com" style="color: #f97316;">careers.synnectify@gmail.com</a>
          </p>
          
          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 20px;">
            &copy; ${new Date().getFullYear()} SYNNECTIFY. All rights reserved.
          </p>
        </div>
      </div>
    `;
    
    try {
      await sendEmail(applicantEmail, applicantSubject, applicantHtml);
      console.log('✅ Applicant confirmation email sent');
    } catch (emailError) {
      console.error('⚠️ Failed to send applicant email, but application saved:', emailError.message);
    }

    res.status(201).json({ message: 'Application submitted successfully', application: appDoc });
  } catch (err) {
    console.error('Application submission error:', err);
    console.error('Error details:', err.message);
    res.status(500).json({ error: 'Server error. Please try again later.', details: err.message });
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
      const subject = `Application Status Update - ${application.jobId?.title || 'Position'} at SYNNECTIFY`;
      let html;
      
      if (status === 'Shortlisted') {
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">SYNNECTIFY</h1>
              <p style="color: white; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Career Portal</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #059669; margin-top: 0;">🎉 Congratulations!</h2>
              
              <p style="color: #4b5563; line-height: 1.6;">Dear <strong>${application.name}</strong>,</p>
              
              <p style="color: #4b5563; line-height: 1.6;">
                We are pleased to inform you that you have been <strong style="color: #059669;">shortlisted</strong> for the position of <strong>${application.jobId?.title || 'the applied position'}</strong> at SYNNECTIFY.
              </p>
              
              <div style="background: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                <p style="color: #065f46; margin: 0; line-height: 1.6;">
                  <strong>✅ Next Steps:</strong><br/>
                  Our HR team will contact you shortly via email or phone with details about the next round of the recruitment process.
                </p>
              </div>
              
              <p style="color: #4b5563; line-height: 1.6;">
                Please keep an eye on your email and phone for further communication from us.
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
      } else if (status === 'Rejected') {
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
            <div style="background: linear-gradient(135deg, #6b7280 0%, #374151 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">SYNNECTIFY</h1>
              <p style="color: white; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Career Portal</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #1f2937; margin-top: 0;">Application Update</h2>
              
              <p style="color: #4b5563; line-height: 1.6;">Dear <strong>${application.name}</strong>,</p>
              
              <p style="color: #4b5563; line-height: 1.6;">
                Thank you for your interest in the <strong>${application.jobId?.title || 'position'}</strong> at SYNNECTIFY and for taking the time to apply.
              </p>
              
              <p style="color: #4b5563; line-height: 1.6;">
                After careful consideration, we regret to inform you that we will not be moving forward with your application at this time. 
                We received many qualified candidates and the selection was highly competitive.
              </p>
              
              <p style="color: #4b5563; line-height: 1.6;">
                We encourage you to apply for future openings that match your skills and experience. We wish you the best in your job search and future endeavors.
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
      } else if (status === 'Interview') {
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
            <div style="background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">SYNNECTIFY</h1>
              <p style="color: white; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Career Portal</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #7e22ce; margin-top: 0;">📅 Interview Scheduled!</h2>
              
              <p style="color: #4b5563; line-height: 1.6;">Dear <strong>${application.name}</strong>,</p>
              
              <p style="color: #4b5563; line-height: 1.6;">
                Great news! You have been selected for the next round of interviews for the position of <strong>${application.jobId?.title || 'the applied position'}</strong> at SYNNECTIFY.
              </p>
              
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1f2937; margin-top: 0; font-size: 16px;">Interview Details:</h3>
                <ul style="color: #4b5563; margin: 10px 0; padding-left: 20px;">
                  <li><strong>Date:</strong> ${application.interviewDetails?.date || 'To be confirmed'}</li>
                  <li><strong>Time:</strong> ${application.interviewDetails?.time || 'To be confirmed'}</li>
                  <li><strong>Location/Link:</strong> ${application.interviewDetails?.meetingLink || 'To be confirmed'}</li>
                </ul>
              </div>
              
              <p style="color: #4b5563; line-height: 1.6;">
                Please confirm your availability for the scheduled interview. If you need to reschedule, please contact us at least 24 hours in advance.
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
      } else if (status === 'Completed') {
        // Extract first name from full name
        const firstName = application.name.split(' ')[0] || application.name;
        const positionTitle = application.jobId?.title || 'the applied position';
        
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">SYNNECTIFY</h1>
              <p style="color: white; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Career Portal</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #059669; margin-top: 0;">🎉 Congratulations!</h2>
              
              <p style="color: #4b5563; line-height: 1.6;">Hi <strong>${firstName}</strong>,</p>
              
              <p style="color: #4b5563; line-height: 1.6;">
                We're excited to inform you that you've been <strong>selected for the ${positionTitle}</strong> role at <strong>Synnectify Technologies</strong>! 🎉
              </p>
              
              <p style="color: #4b5563; line-height: 1.6;">
                Your application journey has successfully reached the <strong>final stage</strong>, and we're thrilled to have you move forward.
              </p>
              
              <div style="background: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                <p style="color: #065f46; margin: 0; line-height: 1.6;">
                  <strong>✅ Next Steps:</strong><br/>
                  Our HR team will be in touch with you shortly to discuss <strong>the next steps and onboarding details</strong>.
                </p>
              </div>
              
              <p style="color: #4b5563; line-height: 1.6;">
                If you have any questions in the meantime, feel free to reply to this email.
              </p>
              
              <p style="color: #4b5563; line-height: 1.6;">
                Thank you for your time and effort throughout the process — we're looking forward to working with you!
              </p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="color: #1f2937; font-weight: bold; margin: 0;">Best Regards,</p>
                <p style="color: #4b5563; margin: 5px 0 0 0;">Synnectify Technologies Team</p>
                <p style="color: #f97316; margin: 5px 0 0 0;">
                  <a href="mailto:careers.synnectify@gmail.com" style="color: #f97316; text-decoration: none;">careers@synnectify.com</a>
                </p>
                <p style="color: #3b82f6; margin: 5px 0 0 0;">
                  <a href="https://technologies.synnectify.com" style="color: #3b82f6; text-decoration: none;">https://technologies.synnectify.com</a>
                </p>
              </div>
              
              <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 20px;">
                &copy; ${new Date().getFullYear()} SYNNECTIFY. All rights reserved.
              </p>
            </div>
          </div>
        `;
      } else {
        // For other statuses (Pending, etc.) - generic email
        html = `
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
      }
      
      try {
        await sendEmail(application.email, subject, html);
        console.log(`✅ Email sent for ${status} status to ${application.email}`);
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

    // Send interview confirmation email
    const subject = `Interview Scheduled - ${application.jobId?.title || 'Position'} at SYNNECTIFY`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">SYNNECTIFY</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Career Portal</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #7e22ce; margin-top: 0;">📅 Interview Scheduled!</h2>
          
          <p style="color: #4b5563; line-height: 1.6;">Dear <strong>${application.name}</strong>,</p>
          
          <p style="color: #4b5563; line-height: 1.6;">
            Great news! You have been selected for the next round of interviews for the position of <strong>${application.jobId?.title || 'the applied position'}</strong> at SYNNECTIFY.
          </p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0; font-size: 16px;">Interview Details:</h3>
            <ul style="color: #4b5563; margin: 10px 0; padding-left: 20px;">
              <li><strong>Date:</strong> ${sanitizedInterviewDetails.date || 'To be confirmed'}</li>
              <li><strong>Time:</strong> ${sanitizedInterviewDetails.time || 'To be confirmed'}</li>
              <li><strong>Location/Link:</strong> ${sanitizedInterviewDetails.meetingLink || 'To be confirmed'}</li>
            </ul>
          </div>
          
          <p style="color: #4b5563; line-height: 1.6;">
            Please confirm your availability for the scheduled interview. If you need to reschedule, please contact us at least 24 hours in advance.
          </p>
          
          ${sanitizedInterviewDetails.comments ? `<div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0; font-size: 16px;">Additional Notes:</h3>
            <p style="color: #4b5563; margin: 10px 0;">${sanitizedInterviewDetails.comments}</p>
          </div>` : ''}
          
          <p style="color: #6b7280; font-size: 13px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <strong>Note:</strong> This is an automated no-reply email. For inquiries, contact <a href="mailto:careers.synnectify@gmail.com" style="color: #f97316;">careers.synnectify@gmail.com</a>
          </p>
          
          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 20px;">
            &copy; ${new Date().getFullYear()} SYNNECTIFY. All rights reserved.
          </p>
        </div>
      </div>
    `;
    
    try {
      await sendEmail(application.email, subject, html);
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
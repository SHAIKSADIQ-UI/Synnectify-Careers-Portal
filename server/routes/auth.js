const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const OTP = require('../models/OTP');
const { sendEmail } = require('../utils/mailer');

const router = express.Router();

// Helper function to hash password
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Helper function to generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

router.post('/google', async (req, res) => {
  try {
    const { name, email, photo } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, photo });
    }

    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', {
      expiresIn: '7d',
    });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin login step 1: Verify credentials and send OTP
router.post('/admin-login', async (req, res) => {
  try {
    console.log('=== ADMIN LOGIN ATTEMPT ===');
    console.log('Request headers:', req.headers);
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    console.log('Content type:', req.headers['content-type']);
    
    // Check if body exists and is parsed correctly
    if (!req.body) {
      console.log('❌ No request body received');
      return res.status(400).json({ error: 'No request body received' });
    }
    
    const { email, password } = req.body;
    
    console.log('Extracted email:', email);
    console.log('Extracted password:', password ? 'PROVIDED' : 'MISSING');
    
    if (!email || !password) {
      console.log('❌ Email or password missing');
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if email is the allowed admin email
    // OTP IMPLEMENTATION START
    if (email !== 'careers.synnectify@gmail.com') {
      console.log('❌ Unauthorized email:', email);
      return res.status(403).json({ error: 'Access denied. Only careers.synnectify@gmail.com can access admin panel.' });
    }

    // Check if password matches the fixed admin password
    if (password !== 'Synnectify-Careers_2906') {
      console.log('❌ Invalid password');
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Since we're not checking against database for this specific case,
    // we'll create a temporary user object
    const user = {
      _id: 'admin-user-id',
      name: 'Admin User',
      email: 'careers.synnectify@gmail.com',
      role: 'admin'
    };
    // OTP IMPLEMENTATION END

    // Generate and send OTP
    const otpCode = generateOTP();
    // OTP IMPLEMENTATION START - Set expiration to 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration
    // OTP IMPLEMENTATION END

    console.log('Generated OTP:', otpCode);
    console.log('Expires at:', expiresAt);

    // Save OTP to database
    const otpRecord = await OTP.create({
      email,
      code: hashPassword(otpCode), // Hash OTP before storing
      expiresAt
    });
    
    console.log('OTP saved to database with ID:', otpRecord._id);

    // Send OTP via email with retry logic
    try {
      console.log('Attempting to send OTP email to:', email);
      console.log('Email configuration check:', {
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'SET' : 'MISSING',
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT
      });
      
      // Attempt to send email with retries
      let emailResult;
      let lastError;
      
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          console.log(`📧 Sending OTP email attempt ${attempt}/3`);
          emailResult = await sendEmail(
            email,
            'Admin Panel Login - OTP Verification',
            `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #333;">SYNNECTIFY Admin Login</h2>
              <p>Hello Admin,</p>
              <p>You are receiving this email because a login attempt was made to the SYNNECTIFY admin panel.</p>
              <p>Your one-time password (OTP) is:</p>
              <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; border-radius: 5px;">
                ${otpCode}
              </div>
              <p>This OTP is valid for 5 minutes and can only be used once.</p>
              <p>If you did not attempt to log in, please ignore this email.</p>
              <br>
              <p>Best regards,<br>SYNNECTIFY Team</p>
            </div>
            `
          );
          
          console.log('OTP email sent successfully to:', email);
          console.log('Email result:', JSON.stringify(emailResult, null, 2));
          break; // Success, exit retry loop
        } catch (error) {
          lastError = error;
          console.error(`📧 OTP email attempt ${attempt} failed:`, error.message);
          
          // Don't retry on authentication errors or bad requests
          if (error.code === 'EAUTH' || error.code === 'EENVELOPE' || error.code === 'EMESSAGE') {
            console.error('📧 Non-retryable error encountered, aborting retries');
            throw error;
          }
          
          // Wait before retrying (exponential backoff)
          if (attempt < 3) {
            const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
            console.log(`📧 Waiting ${delay}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      }
      
      // If all retries failed, throw the last error
      if (!emailResult) {
        throw lastError;
      }
    } catch (emailError) {
      console.error('Failed to send OTP email after all retries:', emailError);
      console.error('Email error details:');
      console.error('Message:', emailError.message);
      console.error('Code:', emailError.code);
      console.error('Stack:', emailError.stack);
      
      // Log environment variables for debugging (without exposing passwords)
      console.log('Environment variables for debugging:');
      console.log('EMAIL_USER:', process.env.EMAIL_USER);
      console.log('EMAIL_PASSWORD set:', !!process.env.EMAIL_PASSWORD);
      console.log('SMTP_HOST:', process.env.SMTP_HOST);
      console.log('SMTP_PORT:', process.env.SMTP_PORT);
      console.log('NODE_ENV:', process.env.NODE_ENV);
      
      // Delete the OTP record since we couldn't send the email
      try {
        await OTP.findByIdAndDelete(otpRecord._id);
        console.log('Cleaned up OTP record due to email failure');
      } catch (cleanupError) {
        console.error('Failed to cleanup OTP record:', cleanupError);
      }
      
      return res.status(500).json({ 
        error: 'Failed to send OTP. Please try again.',
        details: process.env.NODE_ENV === 'development' ? emailError.message : undefined,
        // Provide user-friendly retry suggestions
        suggestions: [
          'Check your internet connection',
          'Verify email service is working',
          'Try again in a few minutes',
          'Contact system administrator if issue persists'
        ]
      });
    }

    // Respond with success but indicate OTP verification is needed
    res.json({ 
      message: 'OTP sent to your email. Please verify to complete login.',
      email: email,
      otpRequired: true
    });
  } catch (err) {
    console.error('Admin login error:', err);
    console.error('Error details:');
    console.error('Message:', err.message);
    console.error('Stack:', err.stack);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin login step 2: Verify OTP
router.post('/admin-verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    // Check if email is the allowed admin email
    // OTP IMPLEMENTATION START
    if (email !== 'careers.synnectify@gmail.com') {
      return res.status(403).json({ error: 'Access denied.' });
    }
    // OTP IMPLEMENTATION END

    // Find the OTP record
    const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });
    
    if (!otpRecord) {
      return res.status(400).json({ error: 'No OTP found for this email. Please request a new OTP.' });
    }

    // Check if OTP is already used
    if (otpRecord.used) {
      return res.status(400).json({ error: 'This OTP has already been used. Please request a new OTP.' });
    }

    // Check if OTP is expired
    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ error: 'OTP has expired. Please request a new OTP.' });
    }

    // Verify OTP
    const hashedInputOTP = hashPassword(otp);
    
    if (otpRecord.code !== hashedInputOTP) {
      return res.status(400).json({ error: 'Invalid OTP.' });
    }

    // Mark OTP as used
    otpRecord.used = true;
    await otpRecord.save();

    // Create user object for admin
    // OTP IMPLEMENTATION START
    const user = {
      _id: 'admin-user-id',
      id: 'admin-user-id',
      name: 'Admin User',
      email: 'careers.synnectify@gmail.com',
      role: 'admin'
    };
    // OTP IMPLEMENTATION END

    // Generate JWT token
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', {
      expiresIn: '7d',
    });

    res.json({
      user: {
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
      message: 'Login successful'
    });
  } catch (err) {
    console.error('OTP verification error:', err);
    console.error('Error details:');
    console.error('Message:', err.message);
    console.error('Stack:', err.stack);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
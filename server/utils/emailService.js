const { sendEmail } = require('./mailer');

/**
 * Send application received email to applicant
 * @param {Object} params - Email parameters
 * @param {string} params.to - Recipient email address
 * @param {string} params.applicantName - Applicant's name
 * @param {string} params.jobTitle - Job title
 * @param {string} params.applicationId - Application ID
 * @returns {Promise} - Email sending result
 */
async function sendApplicationReceived({ to, applicantName, jobTitle, applicationId }) {
  const subject = `Application Received - ${jobTitle} at SYNNECTIFY`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
      <div style="background: linear-gradient(135deg, #f97316 0%, #3b82f6 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">SYNNECTIFY</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Career Portal</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #1f2937; margin-top: 0;">✅ Application Received!</h2>
        
        <p style="color: #4b5563; line-height: 1.6;">Dear <strong>${applicantName}</strong>,</p>
        
        <p style="color: #4b5563; line-height: 1.6;">
          Thank you for applying for the position of <strong>${jobTitle}</strong> at SYNNECTIFY. 
          We have successfully received your application.
        </p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0; font-size: 16px;">Application Details:</h3>
          <ul style="color: #4b5563; margin: 10px 0; padding-left: 20px;">
            <li><strong>Position:</strong> ${jobTitle}</li>
            <li><strong>Status:</strong> <span style="color: #f59e0b;">Pending Review</span></li>
            <li><strong>Application ID:</strong> ${applicationId}</li>
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
    return await sendEmail(to, subject, html);
  } catch (error) {
    console.error(`❌ Failed to send application received email to ${to}:`, error.message);
    throw error;
  }
}

/**
 * Send shortlisted email to applicant
 * @param {Object} params - Email parameters
 * @param {string} params.to - Recipient email address
 * @param {string} params.applicantName - Applicant's name
 * @param {string} params.jobTitle - Job title
 * @returns {Promise} - Email sending result
 */
async function sendShortlisted({ to, applicantName, jobTitle }) {
  const subject = `Application Status Update - ${jobTitle} at SYNNECTIFY`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
      <div style="background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">SYNNECTIFY</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Career Portal</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #059669; margin-top: 0;">🎉 Congratulations!</h2>
        
        <p style="color: #4b5563; line-height: 1.6;">Dear <strong>${applicantName}</strong>,</p>
        
        <p style="color: #4b5563; line-height: 1.6;">
          We are pleased to inform you that you have been <strong style="color: #059669;">shortlisted</strong> for the position of <strong>${jobTitle || 'the applied position'}</strong> at SYNNECTIFY.
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
  
  try {
    return await sendEmail(to, subject, html);
  } catch (error) {
    console.error(`❌ Failed to send shortlisted email to ${to}:`, error.message);
    throw error;
  }
}

/**
 * Send rejected email to applicant
 * @param {Object} params - Email parameters
 * @param {string} params.to - Recipient email address
 * @param {string} params.applicantName - Applicant's name
 * @param {string} params.jobTitle - Job title
 * @returns {Promise} - Email sending result
 */
async function sendRejected({ to, applicantName, jobTitle }) {
  const subject = `Application Status Update - ${jobTitle} at SYNNECTIFY`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
      <div style="background: linear-gradient(135deg, #6b7280 0%, #374151 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">SYNNECTIFY</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Career Portal</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #1f2937; margin-top: 0;">Application Update</h2>
        
        <p style="color: #4b5563; line-height: 1.6;">Dear <strong>${applicantName}</strong>,</p>
        
        <p style="color: #4b5563; line-height: 1.6;">
          Thank you for your interest in the <strong>${jobTitle || 'position'}</strong> at SYNNECTIFY and for taking the time to apply.
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
  
  try {
    return await sendEmail(to, subject, html);
  } catch (error) {
    console.error(`❌ Failed to send rejected email to ${to}:`, error.message);
    throw error;
  }
}

/**
 * Send interview scheduled email to applicant
 * @param {Object} params - Email parameters
 * @param {string} params.to - Recipient email address
 * @param {string} params.applicantName - Applicant's name
 * @param {string} params.jobTitle - Job title
 * @param {string} params.dateTime - Interview date and time
 * @param {string} params.meetingLink - Meeting link
 * @returns {Promise} - Email sending result
 */
async function sendInterviewScheduled({ to, applicantName, jobTitle, dateTime, meetingLink }) {
  const subject = `Interview Scheduled - ${jobTitle} at SYNNECTIFY`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
      <div style="background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">SYNNECTIFY</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Career Portal</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #7e22ce; margin-top: 0;">📅 Interview Scheduled!</h2>
        
        <p style="color: #4b5563; line-height: 1.6;">Dear <strong>${applicantName}</strong>,</p>
        
        <p style="color: #4b5563; line-height: 1.6;">
          Great news! You have been selected for the next round of interviews for the position of <strong>${jobTitle || 'the applied position'}</strong> at SYNNECTIFY.
        </p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0; font-size: 16px;">Interview Details:</h3>
          <ul style="color: #4b5563; margin: 10px 0; padding-left: 20px;">
            <li><strong>Date & Time:</strong> ${dateTime || 'To be confirmed'}</li>
            <li><strong>Location/Link:</strong> ${meetingLink || 'To be confirmed'}</li>
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
  
  try {
    return await sendEmail(to, subject, html);
  } catch (error) {
    console.error(`❌ Failed to send interview scheduled email to ${to}:`, error.message);
    throw error;
  }
}

/**
 * Send completed email to applicant
 * @param {Object} params - Email parameters
 * @param {string} params.to - Recipient email address
 * @param {string} params.applicantName - Applicant's name
 * @param {string} params.jobTitle - Job title
 * @returns {Promise} - Email sending result
 */
async function sendCompleted({ to, applicantName, jobTitle }) {
  // Extract first name from full name
  const firstName = applicantName.split(' ')[0] || applicantName;
  const subject = `🎉 Congratulations! Application Selected - ${jobTitle} at SYNNECTIFY`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
      <div style="background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">SYNNECTIFY</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Career Portal</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #059669; margin-top: 0;">🎉 Congratulations!</h2>
        
        <p style="color: #4b5563; line-height: 1.6;">Hi <strong>${firstName}</strong>,</p>
        
        <p style="color: #4b5563; line-height: 1.6;">
          We're excited to inform you that you've been <strong>selected for the ${jobTitle}</strong> role at <strong>Synnectify Technologies</strong>! 🎉
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
  
  try {
    return await sendEmail(to, subject, html);
  } catch (error) {
    console.error(`❌ Failed to send completed email to ${to}:`, error.message);
    throw error;
  }
}

/**
 * Notify admin on new application
 * @param {Object} params - Email parameters
 * @param {string} params.toAdmin - Admin email address
 * @param {string} params.jobTitle - Job title
 * @param {string} params.applicantName - Applicant's name
 * @param {string} params.applicationId - Application ID
 * @returns {Promise} - Email sending result
 */
async function notifyAdminOnNewApplication({ toAdmin, jobTitle, applicantName, applicationId }) {
  const subject = `New Job Application Received - ${jobTitle}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
      <div style="background: linear-gradient(135deg, #f97316 0%, #3b82f6 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">SYNNECTIFY</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">New Application Alert</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #1f2937; margin-top: 0;">📋 New Application Received</h2>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0; font-size: 16px;">Application Details:</h3>
          <ul style="color: #4b5563; margin: 10px 0; padding-left: 20px; line-height: 1.8;">
            <li><strong>Applicant Name:</strong> ${applicantName}</li>
            <li><strong>Position:</strong> ${jobTitle}</li>
            <li><strong>Application ID:</strong> ${applicationId}</li>
            <li><strong>Application Date:</strong> ${new Date().toLocaleDateString()}</li>
          </ul>
        </div>
        
        <p style="color: #4b5563; line-height: 1.6;">
          Please review this application in the admin dashboard.
        </p>
        
        <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 20px;">
          &copy; ${new Date().getFullYear()} SYNNECTIFY. All rights reserved.
        </p>
      </div>
    </div>
  `;
  
  try {
    return await sendEmail(toAdmin, subject, html);
  } catch (error) {
    console.error(`❌ Failed to send admin notification email to ${toAdmin}:`, error.message);
    throw error;
  }
}

module.exports = {
  sendApplicationReceived,
  sendShortlisted,
  sendRejected,
  sendInterviewScheduled,
  sendCompleted,
  notifyAdminOnNewApplication
};
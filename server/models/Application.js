const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: false },
    position: { type: String }, // Job title/position name
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String },
    dob: { type: String },
    gender: { type: String },
    address: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    zipCode: { type: String },
    currentPosition: { type: String },
    currentCompany: { type: String },
    totalExperience: { type: String },
    skills: { type: String },
    expertise: { type: String },
    education: { type: String },
    experience: { type: String },
    portfolio: { type: String },
    github: { type: String },
    linkedin: { type: String },
    message: { type: String },
    resume: { type: String }, // file path
    status: { 
      type: String, 
      enum: ['Pending', 'Shortlisted', 'Rejected', 'Ignored', 'Interview', 'Completed'], 
      default: 'Pending' 
    },
    note: { type: String, default: '' }, // Admin notes
    interviewDetails: {
      date: { type: String },
      time: { type: String },
      meetingLink: { type: String },
      comments: { type: String }
    },
    appliedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Application', applicationSchema);
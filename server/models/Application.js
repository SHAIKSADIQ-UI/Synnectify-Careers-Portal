const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: false },
    position: { type: String }, // Job title/position name
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    resume: { type: String }, // file path
    message: { type: String },
    status: { type: String, enum: ['Pending', 'Shortlisted', 'Rejected', 'Ignored'], default: 'Pending' },
    appliedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Application', applicationSchema);
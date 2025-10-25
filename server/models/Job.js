const mongoose = require('mongoose');

// Clear any cached version of this model
if (mongoose.models.Job) {
  delete mongoose.models.Job;
}

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Intern'], required: true },
    department: { type: String },
    experience: { type: String },
    salary: { type: String },
    requirements: { type: [String], default: [] },
    responsibilities: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false, strict: false }
);

module.exports = mongoose.model('Job', jobSchema);
const express = require('express');
const jwt = require('jsonwebtoken');
const Job = require('../models/Job');
const mongoose = require('mongoose');

const router = express.Router();

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

// GET all jobs
router.get('/', async (_req, res) => {
  try {
    // Use native MongoDB driver to bypass Mongoose issues
    const db = mongoose.connection.db;
    const jobsCollection = db.collection('jobs');
    const jobsData = await jobsCollection.find({}).sort({ createdAt: -1 }).toArray();
    
    console.log(`📊 Fetched ${jobsData.length} jobs via native driver`);
    if (jobsData.length > 0) {
      console.log(`First job requirements:`, jobsData[0].requirements ? jobsData[0].requirements.length : 0);
      console.log(`First job responsibilities:`, jobsData[0].responsibilities ? jobsData[0].responsibilities.length : 0);
    }
    
    res.json(jobsData);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new job (admin only)
router.post('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { 
      title, 
      description, 
      location, 
      type, 
      department, 
      experience, 
      salary, 
      requirements, 
      responsibilities 
    } = req.body;
    
    const jobData = {
      title,
      description,
      location,
      type,
      ...(department && { department }),
      ...(experience && { experience }),
      ...(salary && { salary }),
      ...(requirements && requirements.length > 0 && { requirements }),
      ...(responsibilities && responsibilities.length > 0 && { responsibilities }),
    };
    
    const job = await Job.create(jobData);
    res.status(201).json(job);
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(400).json({ error: 'Invalid payload', details: err.message });
  }
});

// GET job by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching job with ID:', id);
    // Use Mongoose to find job by ID
    const job = await Job.findById(id);
    
    if (!job) {
      console.log('Job not found with ID:', id);
      return res.status(404).json({ error: 'Job not found' });
    }
    
    console.log('Job found:', job.title);
    res.json(job);
  } catch (err) {
    console.error('Error fetching job:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE job by id (admin only)
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting job with ID:', id);
    await Job.findByIdAndDelete(id);
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(404).json({ error: 'Job not found' });
  }
});

module.exports = router;
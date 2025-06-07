const express = require('express');
const Job = require('../models/Job');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected GET route
router.get('/jobs', authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id }); // only fetch jobs for logged-in user
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// POST new job
router.post('/jobs', authMiddleware, async (req, res) => {
  try {
    const newJob = new Job({ ...req.body, user: req.user.id });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// PUT update job
router.put('/jobs/:id', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;

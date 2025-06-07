const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get user info including jobs
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json({ id: user._id, email: user.email, jobs: user.jobs });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Add a job to user
router.post('/:id/jobs', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const newJob = req.body; // Expect job info in req.body
    user.jobs.push(newJob);
    await user.save();

    res.status(201).json(user.jobs);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;

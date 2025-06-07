const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company: String,
  role: String,
  appliedDate: Date,
  status: String,
  notes: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Job', jobSchema);

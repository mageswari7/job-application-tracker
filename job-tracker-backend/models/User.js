const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String },
  description: { type: String },
  fromDate: { type: Date },
  toDate: { type: Date },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jobs: [jobSchema], // Array of jobs
});

module.exports = mongoose.model('User', userSchema);

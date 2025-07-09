// server/models/TestRun.js
const mongoose = require('mongoose');

const testRunSchema = new mongoose.Schema({
  url: { type: String, required: true },
  script: { type: String },
  logs: { type: String },
  screenshots: [String],
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TestRun', testRunSchema);

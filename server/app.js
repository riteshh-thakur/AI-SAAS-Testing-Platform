// server/app.js
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const testRoutes = require('./routes/testRoutes');

const app = express();

// serve static screenshots/videos
const path = require('path');
app.use('/test-artifacts', express.static(path.join(__dirname, 'public/test-artifacts')));


// Middlewares
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});
app.use(limiter);

// Routes
app.use('/', testRoutes);

module.exports = app;

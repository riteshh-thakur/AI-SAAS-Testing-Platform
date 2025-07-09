// server/routes/testRoutes.js
const express = require('express');
const router = express.Router();
const {
  generateTests,
  runTestById,
  getTestResultById,
  getAllResults
} = require('../controllers/testController');

router.post('/generate-tests', generateTests);
router.post('/run-tests/:id', runTestById);
router.get('/results/:id', getTestResultById);
router.get('/results', getAllResults);

module.exports = router;

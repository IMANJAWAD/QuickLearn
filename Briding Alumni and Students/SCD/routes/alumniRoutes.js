// routes/alumniRoutes.js
const express = require('express');
const router = express.Router();

// Import controller functions
const { getAlumniProfile, updateAlumniProfile, getRequests, updateRequestStatus } = require('../controllers/alumniController');

// Get alumni profile
router.get('/profile/:id', getAlumniProfile);

// Update alumni profile
router.put('/profile/:id', updateAlumniProfile);

// Get all student requests for alumni
router.get('/requests/:id', getRequests);

// Accept or reject a request
router.put('/requests/:requestID', updateRequestStatus);

module.exports = router;

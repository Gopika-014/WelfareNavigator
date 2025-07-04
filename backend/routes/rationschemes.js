const express = require('express');
const router = express.Router();
const { fetchSchemesByCardType,  fetchSchemesByState} = require('../controllers/schemeController');

// @route   POST /api/schemes/fetch
// @desc    Fetch schemes by card type
// @access  Public
router.post('/fetch', fetchSchemesByCardType);
router.post('/state', fetchSchemesByState);
module.exports = router;

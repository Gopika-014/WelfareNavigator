// backend/routes/predict.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/predict', async (req, res) => {
  try {
    console.log("reached prediction");
    const response = await axios.post('http://localhost:5000/predict', req.body);
    console.log(response.data)
    res.json(response.data);
  } catch (error) {
    console.error("Error calling Flask API:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

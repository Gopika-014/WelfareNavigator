
/*const express = require('express');
const router = express.Router();
const fetchNotices = require('../controllers/noticeScraper'); // adjust path accordingly

router.get('/notices', async (req, res) => {
  const notices = await fetchNotices();
  res.json({ success: true, data: notices });
});

module.exports = router;
*/

const express = require("express");
const router = express.Router();
const { getAllNotices } = require("../controllers/noticeController");

router.get("/", getAllNotices);

module.exports = router;


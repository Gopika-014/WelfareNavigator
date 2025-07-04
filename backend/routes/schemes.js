const express = require("express");
const router = express.Router();

const categories = [
  { id: 1, name: "Health & Welfare" },
  { id: 5, name: "Education & Scholarships" },
  { id: 3, name: "Employment & Skill Development" },
  { id: 4, name: "Women & Child Development" },
  { id: 2, name: "Agriculture & Rural" },
  { id: 6, name: "Housing & Urban Development" },
  { id: 7, name: "Transport" },
  { id: 8, name: "Senior Citizen & Disabled" },
];

router.get("/categories", (req, res) => {
  res.json(categories);
});

module.exports = router;

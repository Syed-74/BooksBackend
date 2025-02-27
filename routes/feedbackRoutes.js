const express = require("express");
const { sendFeedback } = require("../controllers/feedbackController");

const router = express.Router();

// Route to handle feedback submission
router.post("/send-feedback", sendFeedback);

module.exports = router;

const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

// Configure Nodemailer with SMTP settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'mx.mxmsin@gmail.com', // Secure email from .env
    pass: 'ethgpqmktizzwzle', // Secure password from .env
  },
});

exports.sendFeedback = async (req, res) => {
  const { name, email, feedback, bookSuggestion } = req.body;

  console.log("Received Data:", req.body); // Debugging log

  // 🔹 Validate that at least feedback or bookSuggestion is provided
  if (!name?.trim() || !email?.trim()) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  if (!feedback?.trim() && !bookSuggestion?.trim()) {
    return res.status(400).json({ error: "Please provide feedback or a book suggestion." });
  }

  // 🔹 Email Content
  const mailOptions = {
    from: process.env.EMAIL_USER, // Ensure email is taken from .env
    to: "syednusrath380@gmail.com", // Recipient email
    subject: "📢 New Feedback from Read Books",
    text: `👤 Name: ${name}\n📧 Email: ${email}\n\n📝 Feedback: ${feedback || "N/A"}\n📖 Book Suggestion: ${bookSuggestion || "N/A"}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email Sent Successfully!");
    res.status(200).json({ message: "Feedback sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ error: "Failed to send feedback." });
  }
};

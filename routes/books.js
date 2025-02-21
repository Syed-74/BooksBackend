


const express = require("express");
const multer = require("multer");
const path = require("path");
const Book = require("../models/Book");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Ensure files are uploaded to 'uploads/'

// Route to add a new book
router.post("/", upload.fields([{ name: "image" }, { name: "pdf" }]), async (req, res) => {
  try {
    const { bookName, authorName, category } = req.body;
    
    // Correct file paths for accessing later
    const image = req.files?.image[0]?.filename; 
    const pdf = req.files?.pdf[0]?.filename;

    const newBook = new Book({ bookName, authorName, category, image, pdf });
    await newBook.save();

    res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add book" });
  }
});

// Route to get books by category
router.get("/:category", async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.category });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// ✅ **New Route to Serve PDFs in Browser Instead of Downloading**
router.get("/pdf/:fileName", (req, res) => {
  const pdfPath = path.join(__dirname, "../uploads", req.params.fileName);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline"); // 👈 This prevents downloading

  res.sendFile(pdfPath);
});

module.exports = router;

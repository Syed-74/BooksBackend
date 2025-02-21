const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Image = require('../models/Image'); // Import Image model

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// 🔹 Upload an image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const image = new Image({
      filename: req.file.filename,
      path: req.file.path
    });

    await image.save();
    res.status(201).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error });
  }
});

// 🔹 Get all images
router.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    const imageUrls = images.map(img => ({
      id: img._id,
      url: `${req.protocol}://${req.get('host')}/${img.path}`
    }));

    res.json(imageUrls);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images', error });
  }
});

module.exports = router;


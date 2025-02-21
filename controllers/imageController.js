const Image = require('../models/Image');

exports.uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');

  const base64Image = req.file.buffer.toString('base64');
  const newImage = new Image({ data: `data:image/png;base64,${base64Image}` });
  await newImage.save();

  res.json({ message: 'Image uploaded successfully', image: newImage });
};

exports.getImages = async (req, res) => {
  const images = await Image.find();
  res.json(images);
};

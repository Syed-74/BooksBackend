const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const imageRoutes = require('./routes/imageRoutes');
// const bookRoutes = require("./routes/bookRoutes");

// Initialize Express app
const app = express(); 
// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Ensure uploaded files are accessible

// Import Routes
const booksRoutes = require("./routes/books");
app.use("/books", booksRoutes);
const authRoutes = require('./routes/authRoutes');
// app.use("/api/books", bookRoutes);
// app.use("/books", bookRoutes);

// MongoDB Connection
mongoose.connect('mongodb+srv://syednusrath380:asklm12345@syed.pmibs.mongodb.net/?retryWrites=true&w=majority&appName=Syed', {
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => console.log(err));

// Use authentication routes
app.use('/api/auth', authRoutes);

// Upload images
app.use('/uploads', express.static('uploads'));
app.use('/', imageRoutes);


// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Connecting to MongoDB using Mongoose
// mongoose
//   .connect("mongodb+srv://syednusrath380:asklm12345@syed.pmibs.mongodb.net/?retryWrites=true&w=majority&appName=Syed", {})
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.log('Error connecting to MongoDB', err);
//   });
  
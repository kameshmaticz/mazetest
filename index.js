const express = require('express');
const cors = require('cors');
const levelRouter = require("./level/level.router")
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();
const app = express();

// Import the main router you showed

// Use router
app.use(cors);
app.use(levelRouter);


// Connect to MongoDB
connectDB();



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});



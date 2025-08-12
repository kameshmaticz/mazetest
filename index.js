const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const levelRouter = require('./level/level.router');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // parse JSON body

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// API routes
app.use('/api/levels', levelRouter);

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    const PORT =  5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  });




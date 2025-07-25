// Load environment variables from .env
const dotenv = require('dotenv');
dotenv.config();

// Dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON body
app.use(bodyParser.json()); // Also parses JSON (can be kept for compatibility)

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes);

const recommendationRoutes = require('./routes/recommendation');
app.use('/api/recommendation', recommendationRoutes);

const chatbotRoute = require('./routes/chatbot');
app.use('/api/chatbot', chatbotRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

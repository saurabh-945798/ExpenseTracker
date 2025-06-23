const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // ✅ Added
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Existing Routes
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const cigaretteRoutes = require('./routes/cigaretteRoutes');
const userRoutes = require('./routes/userRoutes'); // ✅ Added

// Middleware
app.use(cors());
app.use(express.json());

// Static file serving for profile images
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // ✅ Added

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/cigarettes', cigaretteRoutes);
app.use('/api/user', userRoutes); // ✅ Added

// Test Route
app.get('/', (req, res) => {
  res.send('API is working! ✅');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected ✅');
  app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
})
.catch(err => console.error('MongoDB connection error:', err));

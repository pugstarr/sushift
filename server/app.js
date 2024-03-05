const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// If you're still using environment variables for other settings like DB connection
require('dotenv').config();

const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// MongoDB connection using Mongoose
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
.then(() => console.log("Successfully connected to MongoDB using Mongoose"))
.catch(err => console.error("Failed to connect to MongoDB", err));

// Middleware
app.use(express.json()); // For parsing application/json

// Routes
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);
const organizationRoutes = require('./routes/orgs');
app.use('/orgs', organizationRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT}`);
});

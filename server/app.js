const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const https = require('https');
const fs = require('fs'); 

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 8000;



app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

const privateKeyPath = process.env.PRIVATE_KEY_PATH;
const certificatePath = process.env.CERTIFICATE_PATH;

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');

const credentials = { key: privateKey, cert: certificate };

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

// Start server
https.createServer(credentials, app).listen(PORT, () => {
    console.log(`HTTPS Server running on port ${PORT}`);
});
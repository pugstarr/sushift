// userController.js
const User = require('../models/User');
const logger = require('../logger'); 
const { OAuth2Client } = require('google-auth-library');

exports.addUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check for existing user
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            logger.info('Attempt to create a user with an existing username: %s', username);
            return res.status(409).json({ message: "Username already exists" });
        }

        // Create a new user instance and save
        const newUser = new User({ username, password });
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        await newUser.save();

        logger.info('New user created: %s', username);
        res.status(201).json({
            message: "User added successfully",
            user: { id: newUser._id, username: newUser.username }
        });
    } catch (error) {
        logger.error('Error adding user: %s', error.message);
        res.status(500).json({ message: "Error adding user", error: error.message });
    }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { name, email, picture } = ticket.getPayload();

        // Check if user already exists
        let user = await User.findOne({ email });
        if (!user) {
            // If user does not exist, create a new user
            user = new User({ username: name, email, picture });
            await user.save();
        }

        // Return user info (omit sensitive data)
        res.status(200).json({
            message: "User authenticated successfully",
            user: { id: user._id, username: user.username, email: user.email, picture: user.picture }
        });
    } catch (error) {
        logger.error('Error in Google Authentication: %s', error.message);
        res.status(500).json({ message: "Error in Google Authentication", error: error.message });
    }
};
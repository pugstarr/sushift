const express = require('express');
const router = express.Router();
const User = require('../models/User');
const userController = require('../controllers/userController');

// route to create a new user
router.post('/google-login', userController.googleLogin);

module.exports = router;

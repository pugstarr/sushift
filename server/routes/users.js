const express = require('express');
const router = express.Router();
const User = require('../models/User');
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
//router.post('/hi',userController.);

module.exports = router;

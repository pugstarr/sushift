// userController.js
const User = require('../models/User');
const logger = require('../logger'); 
const bcrypt = require('bcrypt');
const User = require('./User'); 

// User Registration
const registerUser = async (req, res) => {
  const { email, password, Fname, Lname, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ email, password: hashedPassword, Fname, Lname, role });
    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    res.json({ msg: 'User logged in successfully' }); // Implement JWT or session management here
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };

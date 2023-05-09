const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/user');
const jwt = require('jsonwebtoken');


// Register route
router.post('/register', async (req, res) => {

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username: req.body.userName });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user
    const user = new User({
      username: req.body.userName,
      password: hashedPassword
    });

    // Save user to database
    const savedUser = await user.save();

    // Return JWT token
    const token = jwt.sign({ userId: savedUser._id }, 'jwt_secret_key');
    res.status(201).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

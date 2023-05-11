const express = require('express');
const router = express.Router();
const User = require('../model/user');
const verifyToken = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ActivityTaken = require('../model/activityTaken');



// Get all users
router.get('/users', verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    const usersWithCounts = await Promise.all(users.map(async (user) => {
      const count = await ActivityTaken.countDocuments({ activityTakenBy: user._id });
      return {
        ...user._doc,
        activityCount: count
      }
    }));
    res.json(usersWithCounts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Add user
router.post('/users', verifyToken, isAdmin, async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role,
      points: req.body.points
    });

    // Save user to database
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit user
router.put('/users/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      user.username = req.body.username || user.username;
      user.role = req.body.role || user.role;
      user.points = req.body.points || user.points;

      const updatedUser = await user.save();
      res.send(updatedUser);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete user
router.delete('/users/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    // Check if data already exists in the collection
    const existingData = await User.findOne({ _id: req.params.id });
    if (!existingData) {
      // If data exists, return it
      res.status(404).json("not found");
    } else {
      User.findByIdAndRemove(req.params.id)
        .then(user => res.json("deleted"))
    }
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
});

// Add points to user
router.put('/users/:id/add-points', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      user.points += req.body.points;
      const updatedUser = await user.save();
      res.send(updatedUser);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;

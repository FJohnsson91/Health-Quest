const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/auth');
const User = require('../../model/user');

// @route GET api/auth/me
// @desc Get the currently logged-in user's profile
// @access Private
router.get('/me', verifyToken, async (req, res) => {
  try {
    // Find the user in the database by ID
    const user = await User.findById(req.user.userId).select('-password');

    // Return the user's profile
    // console.error(user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
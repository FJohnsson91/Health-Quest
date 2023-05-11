const express = require('express');
const router = express.Router();
const User = require('../model/user');
const Activity = require("../model/activity");
const verifyToken = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const ActivityTaken = require("../model/activityTaken");


router.get('/adminDashboard',verifyToken,isAdmin, async (req, res) => {

    try {
        const activityTakenData = await ActivityTaken.find({})
        .populate('activityTakenBy', '-password -timestamp')
        .populate('activity', '-timestamp').sort({timestamp:-1});
        const userCount = await User.countDocuments();
        const activityCount = await Activity.countDocuments();
        res.status(200).json({ userCount, activityCount, activityTakenData });
      } catch (error) {
        res.status(500).json({ message: 'Server Error' });
      }
  });
  

router.get('/stats', verifyToken, async (req, res) => {
    const userId = req.user.userId;
    try {
        const activityTaken = await ActivityTaken.find({ activityTakenBy: userId }).populate('activity').sort({timestamp:-1});
        const activitiesTaken = await ActivityTaken.countDocuments({ activityTakenBy: userId });
        const totalPoints = await User.find({_id:userId})
        // console.log(totalPoints);
        const response = {
          activitiesTaken,
          activityTaken,
          totalPoints: totalPoints[0]?.points?totalPoints[0]?.points:0
        };
    
        res.status(200).json(response);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
      }
    
});

module.exports = router;
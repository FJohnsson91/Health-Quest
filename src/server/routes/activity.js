const express = require('express');
const router = express.Router();
const Activity = require('../model/activity');
const isAdmin = require('../middleware/isAdmin');
const verifyToken = require('../middleware/auth');
const activity = require('../model/activity');
const User = require('../model/user');
const ActivityTaken = require('../model/activityTaken');


// Add a new activity
router.post('/activity', verifyToken, isAdmin, async (req, res) => {
    try {
        const newActivity = await Activity.create(req.body);
        res.status(201).json(newActivity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Get all activities
router.get('/activity', async (req, res) => {
    try {
        const activities = await Activity.find({});
        res.json(activities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single activity
router.get('/activity/:id', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) throw new Error('Activity not found');
        res.json(activity);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});


// Update an existing activity
router.put('/activity/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) throw new Error('Activity not found');

        // Update activity fields
        activity.activity = req.body.activity;
        activity.points = req.body.points;
        activity.duration = req.body.duration;

        const updatedActivity = await activity.save();
        res.json(updatedActivity);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// Delete an activity

router.delete('/activity/:id', verifyToken, isAdmin, async (req, res) => {

    try {
        // Check if data already exists in the collection
        const existingData = await activity.findOne({ _id: req.params.id });
        if (!existingData) {
            // If data exists, return it
            res.status(404).json("not found");
        } else {
            activity.findByIdAndRemove(req.params.id)
                .then(activity => res.json("deleted"))
        }
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: error.message });
    }
});

// Finish activity Update User Points and history

router.post('/finish-activity', verifyToken, async (req, res) => {
    const { userId, activityId, activityPoints } = req.body;

    try {
        const user = await User.findOneAndUpdate({ _id: userId }, { $inc: { points: activityPoints } }, { new: true });
        const activity = await Activity.findById(activityId);

        if (!user || !activity) {
            return res.status(400).json({ message: 'User or activity not found' });
        }

        const activityTaken = new ActivityTaken({
            activity: activityId,
            activityTakenBy: userId,
            timestamp: new Date()
        });

        await activityTaken.save();

        res.status(200).json({ message: 'Activity finished and user points updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    activity: { type: String, required: true },
    points: { type: Number, required: true },
    duration: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Activity', activitySchema);

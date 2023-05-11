const mongoose = require('mongoose');

const activityTakenSchema = new mongoose.Schema({
  activity: {type: mongoose.Schema.Types.ObjectId, ref: 'Activity'},
  activityTakenBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ActivityTaken', activityTakenSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    points: {
        type: Number,
    },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },

    timestamp: {
        type: Date,
        default: Date.now
    }
});

// userSchema.pre('save', function (next) {
//     const user = this;
//     if (!user.isModified('password')) {
//         return next();
//     }
//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) {
//             return next(err);
//         }
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if (err) {
//                 return next(err);
//             }
//             user.password = hash;
//             next();
//         });
//     });
// });

// userSchema.methods.comparePassword = function (candidatePassword) {
//     const user = this;
//     return new Promise((resolve, reject) => {
//         bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
//             if (err) {
//                 return reject(err);
//             }
//             if (!isMatch) {
//                 return reject(false);
//             }
//             resolve(true);
//         });
//     });
// };
module.exports = mongoose.model('User', userSchema);

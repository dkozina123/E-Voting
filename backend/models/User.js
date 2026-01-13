const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    votedElections: [{
        type: String // Stores election types e.g. "Presidential"
    }]
});

module.exports = mongoose.model('User', UserSchema);

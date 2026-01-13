const mongoose = require('mongoose');

const ElectionSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['Presidential', 'Parliamentary', 'Local', 'EU'],
        required: true,
        unique: true
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    }
});

module.exports = mongoose.model('Election', ElectionSchema);


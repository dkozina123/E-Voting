const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    },
    electionType: {
        type: String,
        enum: ['Presidential', 'Parliamentary', 'Local', 'EU'],
        default: 'Presidential',
        required: true
    }
});

module.exports = mongoose.model('Candidate', CandidateSchema);

const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// GET /api/candidates
router.get('/', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST /api/candidates
router.post('/', async (req, res) => {
    const { name, electionType } = req.body;
    try {
        const newCandidate = new Candidate({
            name,
            electionType: electionType || 'Presidential'
        });
        const candidate = await newCandidate.save();
        res.json(candidate);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE /api/candidates/:id
router.delete('/:id', async (req, res) => {
    try {
        await Candidate.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Candidate removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST /api/candidates/:id/vote
router.post('/:id/vote', async (req, res) => {
    const { username } = req.body; // Expect username in body
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) {
            return res.status(404).json({ msg: 'Candidate not found' });
        }

        const user = await require('../models/User').findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if already voted
        if (user.votedElections.includes(candidate.electionType)) {
            return res.status(400).json({ msg: 'Već ste glasali za ovu vrstu izbora!' });
        }

        // Record vote
        candidate.votes += 1;
        await candidate.save();

        // Update user record
        user.votedElections.push(candidate.electionType);
        await user.save();

        res.json(candidate);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST /api/candidates/reset
router.post('/reset_votes', async (req, res) => {
    try {
        await Candidate.updateMany({}, { votes: 0 });
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

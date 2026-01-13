const express = require('express');
const router = express.Router();
const Election = require('../models/Election');

// GET /api/elections
router.get('/', async (req, res) => {
    try {
        const elections = await Election.find();
        res.json(elections);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST /api/elections/update
router.post('/update', async (req, res) => {
    const { name, startTime, endTime } = req.body;
    try {
        const election = await Election.findOne({ name });
        if (!election) {
            return res.status(404).json({ msg: 'Election not found' });
        }

        if (startTime !== undefined) election.startTime = startTime;
        if (endTime !== undefined) election.endTime = endTime;

        // Auto-calculate isOpen based on time if times are provided
        // Actually, let's keep it simple: frontend or background job checks time.
        // For now, let's just save the times.

        await election.save();
        res.json(election);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

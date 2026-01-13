const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        if (user.password !== password) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // For now returning the role user info is enough as per the simple req.
        res.json({
            username: user.username,
            role: user.role,
            votedElections: user.votedElections || []
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

const seedDB = async () => {
    await connectDB();

    try {
        await User.deleteMany();

        // Create admin
        const admin = new User({
            username: 'admin',
            password: 'adminpass',
            role: 'admin'
        });

        // Create user
        const user = new User({
            username: 'user',
            password: 'userpass',
            role: 'user'
        });

        await admin.save();
        await user.save();

        const Candidate = require('./models/Candidate');
        await Candidate.deleteMany();

        const candidates = [
            { name: 'Zoran Milanović', electionType: 'Presidential' },
            { name: 'Dragan Primorac', electionType: 'Presidential' },
            { name: 'HDZ', electionType: 'Parliamentary' },
            { name: 'SDP', electionType: 'Parliamentary' },
            { name: 'Možemo!', electionType: 'Parliamentary' },
            { name: 'Tomislav Tomašević', electionType: 'Local' },
            { name: 'Davor Filipović', electionType: 'Local' },
            { name: 'Biljana Borzan', electionType: 'EU' },
            { name: 'Tomislav Sokol', electionType: 'EU' },
        ];

        await Candidate.insertMany(candidates);

        const Election = require('./models/Election');
        await Election.deleteMany();

        const elections = [
            { name: 'Presidential', isOpen: true },
            { name: 'Parliamentary', isOpen: true },
            { name: 'Local', isOpen: true },
            { name: 'EU', isOpen: true },
        ];

        await Election.insertMany(elections);

        console.log('Database seeded with admin/adminpass, user/userpass, candidates and elections');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();

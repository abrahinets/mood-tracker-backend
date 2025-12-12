// checkDB.js
import mongoose from 'mongoose';
import 'dotenv/config';

import Mood from './src/models/mood.js';
import User from './src/models/user.js';

// Перевіряємо наявність URI
if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is missing in .env");
    process.exit(1);
}

const MONGO_URI = process.env.MONGO_URI;

const run = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Перевірка Mood
        const moodCount = await Mood.countDocuments();
        console.log(`🟣 Mood documents: ${moodCount}`);

        const moods = await Mood.find().limit(5);
        console.log('📘 Sample moods:', moods);

        // Перевірка User
        const userCount = await User.countDocuments();
        console.log(`🟡 User documents: ${userCount}`);

        const users = await User.find().limit(5);
        console.log('📙 Sample users:', users);

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected');
    }
};

run();

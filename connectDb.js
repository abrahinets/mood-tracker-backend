import mongoose from 'mongoose';
import 'dotenv/config';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'moodTracker',
        });
        console.log('MongoDB connected 🟢');
    } catch (err) {
        console.error('MongoDB connection failed 🔴', err);
        process.exit(1);
    }
};

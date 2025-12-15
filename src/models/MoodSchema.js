import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const moodSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4(),
        },
        mood: {
            type: String,
            required: true,
            enum: [
                'happy',
                'sad',
                'neutral',
                'angry',
                'excited',
                'tired',
                'stressed',
                'calm',
            ],
        },
        note: {
            type: String,
            default: '',
        },
        user: {
            type: String,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
        _id: false,
    }
);

moodSchema.index({ user: 1, createdAt: -1 });

const Mood = mongoose.model('Mood', moodSchema);

export default Mood;

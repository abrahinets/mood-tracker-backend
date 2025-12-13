// src/models/mood.js
import mongoose from 'mongoose';

const MoodSchema = new mongoose.Schema(
    {
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
                'calm'
            ]
        },
        note: {
            type: String,
            default: ''
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

MoodSchema.index({ user: 1, createdAt: -1 });

const Mood = mongoose.model('Mood', MoodSchema);

export default Mood;

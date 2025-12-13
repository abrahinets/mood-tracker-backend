import Mood from '../models/MoodSchema.js';

const ALLOWED_MOODS = [
    'happy',
    'sad',
    'neutral',
    'angry',
    'excited',
    'tired',
    'stressed',
    'calm',
];

export const createMood = async ({ mood, note = '', user }) => {
    if (!mood) {
        throw new Error('Mood is required');
    }

    if (!ALLOWED_MOODS.includes(mood)) {
        throw new Error('Invalid mood value');
    }

    return Mood.create({ mood, note, user });
};

export const getMoods = async (userId) => {
    return Mood.find({ user: userId })
        .sort({ createdAt: -1 });
};

export const getMoodById = async (id, userId) => {
    const mood = await Mood.findOne({ _id: id, user: userId });
    if (!mood) {
        throw new Error('Mood not found');
    }
    return mood;
};

export const updateMood = async (id, userId, data) => {
    if (data.mood && !ALLOWED_MOODS.includes(data.mood)) {
        throw new Error('Invalid mood value');
    }

    const mood = await Mood.findOneAndUpdate(
        { _id: id, user: userId },
        { mood: data.mood, note: data.note },
        { new: true }
    );

    if (!mood) {
        throw new Error('Mood not found');
    }

    return mood;
};

export const deleteMood = async (id, userId) => {
    const mood = await Mood.findOneAndDelete({ _id: id, user: userId });
    if (!mood) {
        throw new Error('Mood not found');
    }
    return mood;
};
0
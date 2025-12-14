import Mood from '../models/MoodSchema.js';
import { ALLOWED_MOODS } from '../constants/moods.js';
import { RequestError } from '../errors/RequestError.js';
import { NotFoundError } from '../errors/NotFoundError.js';

export const createMood = async ({ mood, note = '', user }) => {
    if (!mood) {
        throw new RequestError('Mood is required');
    }

    if (!ALLOWED_MOODS.includes(mood)) {
        throw new RequestError('Invalid mood value');
    }

    return Mood.create({ mood, note, user });
};

export const getMoods = async ({ offset = 0, limit = 20 } = {}) => {
    const [moods, count] = await Promise.all([
        Mood.find()
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .lean(),
        Mood.countDocuments(),
    ]);

    return { moods, count };
};

export const getMoodById = async (id) => {
    const mood = await Mood.findOne({ _id: id }).lean();

    if (!mood) {
        throw new NotFoundError('Mood not found');
    }

    return mood;
};

export const updateMood = async (id, data) => {
    if (data.mood && !ALLOWED_MOODS.includes(data.mood)) {
        throw new RequestError('Invalid mood value');
    }

    const mood = await Mood.findOneAndUpdate(
        { _id: id },
        {
            ...(data.mood && { mood: data.mood }),
            ...(data.note !== undefined && { note: data.note }),
        },
        { new: true }
    ).lean();

    if (!mood) {
        throw new NotFoundError('Mood not found');
    }

    return mood;
};

export const deleteMood = async (id) => {
    const mood = await Mood.findOneAndDelete({ _id: id }).lean();

    if (!mood) {
        throw new NotFoundError('Mood not found');
    }

    return mood;
};

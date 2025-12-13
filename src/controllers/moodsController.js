import * as moodsService from '../services/moodsService.js';

export const createMood = async (req, res) => {
    try {
        const mood = await moodsService.createMood({
            ...req.body,
            user: req.user.id,
        });

        res.status(201).json(mood);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

export const getMoods = async (req, res) => {
    try {
        const moods = await moodsService.getMoods(req.user.id);
        res.json(moods);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const getMoodById = async (req, res) => {
    try {
        const mood = await moodsService.getMoodById(
            req.params.id,
            req.user.id
        );

        res.json(mood);
    } catch (e) {
        res.status(404).json({ error: e.message });
    }
};

export const updateMood = async (req, res) => {
    try {
        const mood = await moodsService.updateMood(
            req.params.id,
            req.user.id,
            req.body
        );

        res.json(mood);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

export const deleteMood = async (req, res) => {
    try {
        await moodsService.deleteMood(req.params.id, req.user.id);
        res.json({ message: 'Mood deleted successfully' });
    } catch (e) {
        res.status(404).json({ error: e.message });
    }
};

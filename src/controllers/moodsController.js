import * as moodsService from '../services/moodsService.js';

export const createMood = async (req, res) => {
    const mood = await moodsService.create({
        userId: req.user.id,
        ...req.body,
    });
    res.status(201).json(mood);
};

export const getMyMoods = async (req, res) => {
    const moods = await moodsService.getByUserId(req.user.id);
    res.json(moods);
};

export const getAllMoods = async (req, res) => {
    const moods = await moodsService.getAll();
    res.json(moods);
};

export const getMoodById = async (req, res) => {
    const mood = await moodsService.getById(req.params.id, req.user);
    res.json(mood);
};

export const updateMood = async (req, res) => {
    const mood = await moodsService.update(req.params.id, req.user, req.body);
    res.json(mood);
};

export const deleteMood = async (req, res) => {
    await moodsService.remove(req.params.id);
    res.status(204).send();
};

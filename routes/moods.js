// routes/moods.js
import { Router } from 'express';
import mongoose from 'mongoose';
import Mood from '../src/models/mood.js';
import { auth } from '../middleware/auth.js';

const router = Router();

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const ALLOWED_MOODS = [
    'happy',
    'sad',
    'neutral',
    'angry',
    'excited',
    'tired',
    'stressed',
    'calm'
];

router.use(auth);

// CREATE
router.post('/', async (req, res) => {
    try {
        const { mood, note } = req.body;
        const user = req.user.id;

        if (!mood) {
            return res.status(400).json({ error: 'Mood is required' });
        }

        if (!ALLOWED_MOODS.includes(mood)) {
            return res.status(400).json({ error: 'Invalid mood value' });
        }

        const newMood = await Mood.create({ mood, note, user });
        res.status(201).json(newMood);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET ALL (only own)
router.get('/', async (req, res) => {
    try {
        const moods = await Mood.find({ user: req.user.id })
            .populate('user', 'username email')
            .sort({ createdAt: -1 });

        res.json(moods);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET ONE (only own)
router.get('/:id', async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        const mood = await Mood.findOne({
            _id: req.params.id,
            user: req.user.id
        }).populate('user', 'username email');

        if (!mood) {
            return res.status(404).json({ error: 'Mood not found' });
        }

        res.json(mood);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE (only owner)
router.put('/:id', async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        delete req.body.user;

        if (req.body.mood && !ALLOWED_MOODS.includes(req.body.mood)) {
            return res.status(400).json({ error: 'Invalid mood value' });
        }

        const mood = await Mood.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!mood) {
            return res.status(404).json({ error: 'Mood not found' });
        }

        mood.mood = req.body.mood ?? mood.mood;
        mood.note = req.body.note ?? mood.note;

        await mood.save();
        res.json(mood);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE (only owner)
router.delete('/:id', async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        const mood = await Mood.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!mood) {
            return res.status(404).json({ error: 'Mood not found' });
        }

        res.json({ message: 'Mood deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;

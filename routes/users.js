// routes/users.js
import { Router } from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../src/models/user.js';
import { auth } from '../middleware/auth.js';

const router = Router();

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const generateToken = (userId) =>
    jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        const token = generateToken(user._id);

        res.status(201).json({
            userId: user._id,
            token
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = generateToken(user._id);

        res.json({
            userId: user._id,
            token
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ME
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
});

// GET ALL (protected)
router.get('/', auth, async (req, res) => {
    const users = await User.find()
        .select('-password')
        .sort({ createdAt: -1 });
    res.json(users);
});

// GET BY ID (protected)
router.get('/:id', auth, async (req, res) => {
    if (!isValidId(req.params.id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
});

// UPDATE (only self)
router.put('/:id', auth, async (req, res) => {
    if (!isValidId(req.params.id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    if (req.params.id !== req.user.id) {
        return res.status(403).json({ error: 'Access denied' });
    }

    const updateData = { ...req.body };
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
});

// DELETE (only self)
router.delete('/:id', auth, async (req, res) => {
    if (!isValidId(req.params.id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    if (req.params.id !== req.user.id) {
        return res.status(403).json({ error: 'Access denied' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
});

export default router;

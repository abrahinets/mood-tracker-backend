import User from '../models/UserSchema.js';
import jwt from 'jsonwebtoken';
import { RequestError } from '../errors/RequestError.js';
import { NotFoundError } from '../errors/NotFoundError.js';

const generateToken = (id, role) =>
    jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async ({ username, email, password }) => {
    if (!username || !email || !password) {
        throw new RequestError('All fields are required');
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (existingUser) {
        throw new RequestError('User already exists');
    }

    const user = await User.create({
        username,
        email,
        password,
        role: 'customer',
    });

    return {
        userId: user._id,
        role: user.role,
        token: generateToken(user._id, user.role),
    };
};

export const login = async ({ email, password }) => {
    if (!email || !password) {
        throw new RequestError('Email and password are required');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new RequestError('Invalid credentials');
    }

    const match = await user.comparePassword(password);
    if (!match) {
        throw new RequestError('Invalid credentials');
    }

    return {
        userId: user._id,
        role: user.role,
        token: generateToken(user._id, user.role),
    };
};

export const getById = async (id) => {
    const user = await User.findById(id).select('-password').lean();
    if (!user) {
        throw new NotFoundError('User not found');
    }
    return user;
};

export const getAll = async ({ offset = 0, limit = 20 } = {}) => {
    const [users, count] = await Promise.all([
        User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .lean(),
        User.countDocuments(),
    ]);

    return { users, count };
};

export const update = async (id, data) => {
    if (data.role && !['customer', 'admin'].includes(data.role)) {
        throw new RequestError('Invalid role');
    }

    const user = await User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    })
        .select('-password')
        .lean();

    if (!user) {
        throw new NotFoundError('User not found');
    }

    return user;
};

export const remove = async (id) => {
    const user = await User.findByIdAndDelete(id).lean();
    if (!user) {
        throw new NotFoundError('User not found');
    }
    return user;
};


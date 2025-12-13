import User from '../models/UserSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async ({ username, email, password }) => {
    if (!username || !email || !password) {
        throw new Error('All fields are required');
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    return {
        userId: user._id,
        token: generateToken(user._id),
    };
};

export const login = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('Invalid credentials');
    }

    return {
        userId: user._id,
        token: generateToken(user._id),
    };
};

export const getById = async (id) => {
    return User.findById(id).select('-password');
};

export const getAll = async () => {
    return User.find().select('-password').sort({ createdAt: -1 });
};

export const update = async (id, data) => {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    return User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    }).select('-password');
};

export const remove = async (id) => {
    return User.findByIdAndDelete(id);
};

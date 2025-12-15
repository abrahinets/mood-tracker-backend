import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import Mood from './MoodSchema.js';

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4(),
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
    },
    {
        timestamps: true,
        _id: false,
    }
);

userSchema.pre('findOneAndDelete', async function (next) {
    const userId = this.getQuery()._id;
    await Mood.deleteMany({ user: userId });
    next();
});

const User = mongoose.model('User', userSchema);

export default User;

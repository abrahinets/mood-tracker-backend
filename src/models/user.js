// src/models/user.js
import mongoose from 'mongoose';
import Mood from './mood.js';

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        }
    },
    {
        timestamps: true
    }
);

// 🔥 КАСКАДНЕ ВИДАЛЕННЯ MOODS ПРИ ВИДАЛЕННІ USER
UserSchema.pre('findOneAndDelete', async function (next) {
    const userId = this.getQuery()._id;
    await Mood.deleteMany({ user: userId });
    next();
});

const User = mongoose.model('User', UserSchema);

export default User;

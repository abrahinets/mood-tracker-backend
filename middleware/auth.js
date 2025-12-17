import jwt from 'jsonwebtoken';
import User from '../src/models/UserSchema.js';
import { RequestError } from '../src/errors/RequestError.js';

export const auth = async (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
        throw new RequestError('Unauthorized');
    }

    const token = header.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).lean();

        if (!user) {
            throw new RequestError('Unauthorized');
        }

        req.user = {
            id: user._id,
            role: user.role,
        };

        next();
    } catch {
        throw new RequestError('Unauthorized');
    }
};

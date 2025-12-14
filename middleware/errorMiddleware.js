import { BaseError } from '../src/errors/BaseError.js';

export const errorMiddleware = (err, req, res, next) => {
    if (err instanceof BaseError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
};

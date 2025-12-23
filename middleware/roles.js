import { RequestError } from '../src/errors/RequestError.js';

export const authorizeRoles = (...allowed) => (req, res, next) => {
    if (!req.user) {
        throw new RequestError('Unauthorized');
    }

    if (!allowed.includes(req.user.role)) {
        throw new RequestError('Forbidden');
    }

    next();
};

export const allowSelfOrAdmin = (param = 'id') => (req, res, next) => {
    if (!req.user) {
        throw new RequestError('Unauthorized');
    }

    const isAdmin = req.user.role === 'admin';
    const isSelf = String(req.user.id) === String(req.params[param]);

    if (!isAdmin && !isSelf) {
        throw new RequestError('Forbidden');
    }

    next();
};

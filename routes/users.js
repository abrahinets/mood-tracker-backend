import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { authorizeRoles, allowSelfOrAdmin } from '../middleware/roles.js';
import {
    register,
    login,
    getMe,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} from '../src/controllers/usersController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', auth, getMe);

router.get('/', auth, authorizeRoles('admin'), getUsers);

router.get('/:id', auth, allowSelfOrAdmin('id'), getUserById);

router.put('/:id', auth, allowSelfOrAdmin('id'), updateUser);

router.delete('/:id', auth, authorizeRoles('admin'), deleteUser);

export default router;

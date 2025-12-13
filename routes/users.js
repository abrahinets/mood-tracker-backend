import { Router } from 'express';
import { auth } from '../middleware/auth.js';
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
router.get('/', auth, getUsers);
router.get('/:id', auth, getUserById);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

export default router;

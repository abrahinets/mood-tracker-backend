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

/**
 * @openapi
 * /users/register:
 *   post:
 *     summary: Register new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *     responses:
 *       201:
 *         description: User registered
 */
router.post('/register', register);

/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: Login user
 */
router.post('/login', login);

router.get('/me', auth, getMe);
router.get('/', auth, getUsers);
router.get('/:id', auth, getUserById);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

export default router;

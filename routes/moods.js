import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/roles.js';
import {
    createMood,
    getMyMoods,
    getAllMoods,
    getMoodById,
    updateMood,
    deleteMood,
} from '../src/controllers/moodsController.js';

const router = Router();

router.post('/', auth, authorizeRoles('user', 'customer', 'admin'), createMood);

router.get('/me', auth, getMyMoods);

router.get('/', auth, authorizeRoles('admin'), getAllMoods);

router.get('/:id', auth, getMoodById);

router.put('/:id', auth, updateMood);

router.delete('/:id', auth, authorizeRoles('admin'), deleteMood);

export default router;

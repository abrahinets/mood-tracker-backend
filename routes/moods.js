import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import {
    createMood,
    getMoods,
    getMoodById,
    updateMood,
    deleteMood,
} from '../src/controllers/moodsController.js';

const router = Router();

router.use(auth);

router.post('/', createMood);
router.get('/', getMoods);
router.get('/:id', getMoodById);
router.put('/:id', updateMood);
router.delete('/:id', deleteMood);

export default router;

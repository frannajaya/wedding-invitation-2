import { Router } from 'express';
import { createWishHandler, listWishHandler } from '../controllers/wishController';

const router = Router();

router.post('/', createWishHandler);
router.get('/', listWishHandler);

export default router;
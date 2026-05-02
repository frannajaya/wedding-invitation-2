import { Router } from 'express';
import { createRSVP, listRSVPs } from '../controllers/rsvpController';

const router = Router();

/** POST /api/rsvp – submit a new RSVP */
router.post('/', createRSVP);

/** GET /api/rsvp – list all RSVPs (admin use) */
router.get('/', listRSVPs);

export default router;

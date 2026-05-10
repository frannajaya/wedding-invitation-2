import { Router } from 'express';
import { createRSVP, listRSVPs, updateRSVPHandler } from '../controllers/rsvpController';

const router = Router();

/** POST /api/rsvp – submit a new RSVP */
router.post('/', createRSVP);

/** PUT /api/rsvp – update an existing RSVP */
router.put('/', updateRSVPHandler);

/** GET /api/rsvp – list all RSVPs (admin use) */
router.get('/', listRSVPs);

export default router;

import { Request, Response, NextFunction } from 'express';
import { RSVP } from '../models/rsvp';

// In-memory store – replace with a real database in production.
const rsvps: RSVP[] = [];

/**
 * POST /api/rsvp
 * Accepts a guest RSVP and stores it.
 */
export function createRSVP(req: Request, res: Response, next: NextFunction): void {
  try {
    const { name, attending, message } = req.body as Partial<RSVP>;

    if (!name || attending === undefined) {
      res.status(400).json({ error: 'Fields "name" and "attending" are required.' });
      return;
    }

    const rsvp: RSVP = {
      id: Date.now().toString(),
      name,
      attending,
      message: message ?? '',
      createdAt: new Date().toISOString(),
    };

    rsvps.push(rsvp);

    res.status(201).json({ message: 'RSVP recorded.', rsvp });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/rsvp
 * Returns the list of all submitted RSVPs.
 */
export function listRSVPs(_req: Request, res: Response, next: NextFunction): void {
  try {
    res.json({ rsvps });
  } catch (err) {
    next(err);
  }
}

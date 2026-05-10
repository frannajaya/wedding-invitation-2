import { NextFunction, Request, Response } from 'express';
import {
  createRsvp,
  findRsvpByEditToken,
  getGuestCountLimits,
  listRsvps,
  makeId,
  updateRsvp,
} from '../db/database';
import type { RSVP, RSVPInput } from '../models/rsvp';

function validateRsvpInput(input: Partial<RSVPInput>): { name: string; attending: boolean; guestCount: number } {
  const { minGuests, maxGuests } = getGuestCountLimits();
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const attending = typeof input.attending === 'boolean' ? input.attending : undefined;
  const guestCount = typeof input.guestCount === 'number' ? input.guestCount : Number.NaN;

  if (!name || attending === undefined) {
    throw new Error('Fields "name" and "attending" are required.');
  }

  if (attending) {
    if (!Number.isInteger(guestCount)) {
      throw new Error('Field "guestCount" is required when attending is true.');
    }

    if (guestCount < minGuests || guestCount > maxGuests) {
      throw new Error(`Field "guestCount" must be between ${minGuests} and ${maxGuests}.`);
    }
  }

  if (!attending && guestCount !== 0 && !Number.isNaN(guestCount)) {
    throw new Error('Field "guestCount" must be 0 when attending is false.');
  }

  return {
    name,
    attending,
    guestCount: attending ? guestCount : 0,
  };
}

export function createRSVP(req: Request, res: Response, next: NextFunction): void {
  try {
    const { name, attending, guestCount } = validateRsvpInput(req.body as Partial<RSVPInput>);
    const now = new Date().toISOString();
    const rsvp: RSVP = {
      id: makeId(),
      name,
      attending,
      guestCount,
      editToken: makeId(),
      createdAt: now,
      updatedAt: now,
    };

    createRsvp(rsvp);

    res.status(201).json({ message: 'RSVP recorded.', rsvp, editToken: rsvp.editToken });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
      return;
    }

    next(error);
  }
}

export function updateRSVPHandler(req: Request, res: Response, next: NextFunction): void {
  try {
    const editToken = typeof req.body.editToken === 'string' ? req.body.editToken.trim() : '';

    if (!editToken) {
      res.status(400).json({ error: 'Field "editToken" is required.' });
      return;
    }

    const existing = findRsvpByEditToken(editToken);

    if (!existing) {
      res.status(404).json({ error: 'RSVP not found.' });
      return;
    }

    const { name, attending, guestCount } = validateRsvpInput(req.body as Partial<RSVPInput>);
    const updatedAt = new Date().toISOString();
    const updatedRsvp: RSVP = {
      ...existing,
      name,
      attending,
      guestCount,
      updatedAt,
    };

    updateRsvp(updatedRsvp);

    res.json({ message: 'RSVP updated.', rsvp: updatedRsvp, editToken: updatedRsvp.editToken });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
      return;
    }

    next(error);
  }
}

export function listRSVPs(_req: Request, res: Response, next: NextFunction): void {
  try {
    res.json({ rsvps: listRsvps() });
  } catch (error) {
    next(error);
  }
}

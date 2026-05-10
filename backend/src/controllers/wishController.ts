import { NextFunction, Request, Response } from 'express';
import { createWish, listWishes, makeId } from '../db/database';
import type { Wish } from '../models/rsvp';

export function createWishHandler(req: Request, res: Response, next: NextFunction): void {
  try {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const message = typeof req.body.message === 'string' ? req.body.message.trim() : '';

    if (!name || !message) {
      res.status(400).json({ error: 'Fields "name" and "message" are required.' });
      return;
    }

    const wish: Wish = {
      id: makeId(),
      name,
      message,
      createdAt: new Date().toISOString(),
    };

    createWish(wish);

    res.status(201).json({ message: 'Wish recorded.', wish });
  } catch (error) {
    next(error);
  }
}

export function listWishHandler(_req: Request, res: Response, next: NextFunction): void {
  try {
    res.json({ wishes: listWishes() });
  } catch (error) {
    next(error);
  }
}
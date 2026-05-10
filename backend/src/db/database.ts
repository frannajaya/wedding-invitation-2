import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import Database from 'better-sqlite3';
import type { RSVP, Wish } from '../models/rsvp';

const databasePath = process.env.WEDDING_DB_PATH || path.join(process.cwd(), 'data', 'wedding-invitation.sqlite');
const databaseDirectory = path.dirname(databasePath);

fs.mkdirSync(databaseDirectory, { recursive: true });

const database = new Database(databasePath);
database.pragma('journal_mode = WAL');
database.pragma('foreign_keys = ON');

database.exec(`
  CREATE TABLE IF NOT EXISTS rsvps (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    attending INTEGER NOT NULL,
    guestCount INTEGER NOT NULL,
    editToken TEXT NOT NULL UNIQUE,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS wishes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    createdAt TEXT NOT NULL
  );
`);

const insertRsvpStatement = database.prepare(
  'INSERT INTO rsvps (id, name, attending, guestCount, editToken, createdAt, updatedAt) VALUES (@id, @name, @attending, @guestCount, @editToken, @createdAt, @updatedAt)',
);
const updateRsvpStatement = database.prepare(
  'UPDATE rsvps SET name = @name, attending = @attending, guestCount = @guestCount, updatedAt = @updatedAt WHERE editToken = @editToken',
);
const findRsvpByEditTokenStatement = database.prepare('SELECT * FROM rsvps WHERE editToken = ?');
const listRsvpsStatement = database.prepare('SELECT * FROM rsvps ORDER BY createdAt DESC');

const insertWishStatement = database.prepare(
  'INSERT INTO wishes (id, name, message, createdAt) VALUES (@id, @name, @message, @createdAt)',
);
const listWishesStatement = database.prepare('SELECT * FROM wishes ORDER BY createdAt DESC');

export interface GuestCountLimits {
  minGuests: number;
  maxGuests: number;
}

function parsePositiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function getGuestCountLimits(): GuestCountLimits {
  const minGuests = parsePositiveInteger(process.env.RSVP_MIN_GUESTS, 1);
  const maxGuests = parsePositiveInteger(process.env.RSVP_MAX_GUESTS, 6);

  return {
    minGuests,
    maxGuests: Math.max(minGuests, maxGuests),
  };
}

export function createRsvp(rsvp: RSVP): RSVP {
  insertRsvpStatement.run({
    ...rsvp,
    attending: rsvp.attending ? 1 : 0,
  });

  return rsvp;
}

export function updateRsvp(rsvp: RSVP): RSVP {
  updateRsvpStatement.run({
    ...rsvp,
    attending: rsvp.attending ? 1 : 0,
  });

  return rsvp;
}

export function findRsvpByEditToken(editToken: string): RSVP | undefined {
  const row = findRsvpByEditTokenStatement.get(editToken) as
    | (Omit<RSVP, 'attending'> & { attending: number })
    | undefined;

  if (!row) {
    return undefined;
  }

  return {
    ...row,
    attending: row.attending === 1,
  };
}

export function listRsvps(): RSVP[] {
  return (listRsvpsStatement.all() as Array<Omit<RSVP, 'attending'> & { attending: number }>).map((row) => ({
    ...row,
    attending: row.attending === 1,
  }));
}

export function createWish(wish: Wish): Wish {
  insertWishStatement.run(wish);
  return wish;
}

export function listWishes(): Wish[] {
  return listWishesStatement.all() as Wish[];
}

export function makeId(): string {
  return crypto.randomUUID();
}

export default database;
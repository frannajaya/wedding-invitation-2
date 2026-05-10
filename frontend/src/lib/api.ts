const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface RSVPPayload {
  name: string;
  attending: boolean;
  guestCount: number;
  editToken?: string;
}

export interface RSVPRecord {
  id: string;
  name: string;
  attending: boolean;
  guestCount: number;
  createdAt: string;
  updatedAt: string;
  editToken?: string;
}

export interface RSVPResponse {
  message: string;
  rsvp: RSVPRecord;
  editToken: string;
}

export interface WishPayload {
  name: string;
  message: string;
}

export interface WishRecord {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export interface WishResponse {
  message: string;
  wish: WishRecord;
}

/**
 * Submit a guest RSVP to the backend API.
 */
export async function submitRSVP(payload: RSVPPayload): Promise<RSVPResponse> {
  const response = await fetch(`${API_URL}/api/rsvp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`RSVP submission failed: ${response.statusText}`);
  }

  return (await response.json()) as RSVPResponse;
}

export async function updateRSVP(payload: RSVPPayload): Promise<RSVPResponse> {
  const response = await fetch(`${API_URL}/api/rsvp`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`RSVP update failed: ${response.statusText}`);
  }

  return (await response.json()) as RSVPResponse;
}

export async function submitWish(payload: WishPayload): Promise<WishRecord> {
  const response = await fetch(`${API_URL}/api/wishes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Wish submission failed: ${response.statusText}`);
  }

  const result = (await response.json()) as WishResponse;
  return result.wish;
}

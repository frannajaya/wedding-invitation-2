const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface RSVPPayload {
  name: string;
  attending: boolean;
  message?: string;
}

/**
 * Submit a guest RSVP to the backend API.
 */
export async function submitRSVP(payload: RSVPPayload): Promise<void> {
  const response = await fetch(`${API_URL}/api/rsvp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`RSVP submission failed: ${response.statusText}`);
  }
}

/**
 * RSVP model – represents a guest's RSVP response.
 */
export interface RSVP {
  id: string;
  name: string;
  attending: boolean;
  message: string;
  createdAt: string;
}

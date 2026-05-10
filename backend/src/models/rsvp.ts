export interface RSVP {
  id: string;
  name: string;
  attending: boolean;
  guestCount: number;
  editToken: string;
  createdAt: string;
  updatedAt: string;
}

export interface RSVPInput {
  name: string;
  attending: boolean;
  guestCount: number;
  editToken?: string;
}

export interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

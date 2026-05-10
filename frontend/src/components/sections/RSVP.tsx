'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PhotoFrame from '@/components/ui/PhotoFrame';
import { submitRSVP, updateRSVP } from '@/lib/api';
import { weddingContent } from '@/lib/content';

export default function RSVP() {
  const { rsvp } = weddingContent;
  const [name, setName] = useState('');
  const [attending, setAttending] = useState(true);
  const [guestCount, setGuestCount] = useState(1);
  const [editToken, setEditToken] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = window.localStorage.getItem('wedding-invitation-rsvp');

    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as {
        name?: string;
        attending?: boolean;
        guestCount?: number;
        editToken?: string;
      };

      if (parsed.name) {
        setName(parsed.name);
      }

      if (typeof parsed.attending === 'boolean') {
        setAttending(parsed.attending);
      }

      if (typeof parsed.guestCount === 'number') {
        setGuestCount(parsed.guestCount);
      }

      if (parsed.editToken) {
        setEditToken(parsed.editToken);
        setStatus('Saved RSVP loaded. You can update it again below.');
      }
    } catch {
      window.localStorage.removeItem('wedding-invitation-rsvp');
    }
  }, []);

  function saveState(nextEditToken: string) {
    window.localStorage.setItem(
      'wedding-invitation-rsvp',
      JSON.stringify({
        name,
        attending,
        guestCount,
        editToken: nextEditToken,
      }),
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    try {
      const payload = {
        name,
        attending,
        guestCount: attending ? Math.max(guestCount, 1) : 0,
        editToken,
      };

      const response = editToken ? await updateRSVP(payload) : await submitRSVP(payload);
      setEditToken(response.editToken);
      setStatus(editToken ? 'RSVP updated.' : 'RSVP recorded.');
      saveState(response.editToken);
    } catch {
      setError('Something went wrong. Please try again.');
    }
  }

  function handleAttendingChange(nextAttending: boolean) {
    setAttending(nextAttending);

    if (!nextAttending) {
      setGuestCount(0);
      return;
    }

    if (guestCount < 1) {
      setGuestCount(1);
    }
  }

  return (
    <section className="invitation-section rsvp-section">
      <div className="section-grid rsvp-grid">
        <div className="media-stack">
          <PhotoFrame
            ratio="1:1"
            tone="gold"
            label="1:1 guest card"
            caption="RSVP portrait placeholder"
            detail="Keep the contact panel beside the form."
          />

          <Card eyebrow="Contact" title="Keep us in the loop" pinned>
            <ul className="paper-card__list">
              {rsvp.contacts.map((contact) => (
                <li key={contact.label}>
                  <strong>{contact.label}</strong>
                  <span>{contact.value}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="section-copy">
          <p className="eyebrow">RSVP</p>
          <h2 className="serif-heading section-title">{rsvp.title}</h2>
          <p className="section-text">{rsvp.description}</p>
          <p className="helper-copy">{rsvp.guestCountNote}</p>
          {status ? <p className="status-copy">{status}</p> : null}

          <form onSubmit={handleSubmit} className="form-shell">
            <div className="form-field">
              <label htmlFor="rsvp-name">Name</label>
              <input
                id="rsvp-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                placeholder="Your full name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="rsvp-attending">Attendance</label>
              <select
                id="rsvp-attending"
                value={attending ? 'yes' : 'no'}
                onChange={(event) => handleAttendingChange(event.target.value === 'yes')}
              >
                <option value="yes">Yes, I will attend</option>
                <option value="no">No, I cannot attend</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="rsvp-guest-count">Guest count</label>
              <input
                id="rsvp-guest-count"
                type="number"
                min={attending ? 1 : 0}
                max={rsvp.maxGuests}
                value={guestCount}
                onChange={(event) => setGuestCount(Number(event.target.value) || 0)}
                disabled={!attending}
              />
            </div>

            {error && <p className="status-copy">{error}</p>}

            <Button type="submit">{editToken ? 'Update RSVP' : 'Send RSVP'}</Button>
          </form>
        </div>
      </div>
    </section>
  );
}

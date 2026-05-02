'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { submitRSVP } from '@/lib/api';

/**
 * RSVP section – form for guests to confirm their attendance.
 */
export default function RSVP() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState(true);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await submitRSVP({ name, attending, message });
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    }
  }

  if (submitted) {
    return (
      <section className="rsvp">
        <h2>RSVP</h2>
        <p>Thank you, {name}! Your response has been recorded.</p>
      </section>
    );
  }

  return (
    <section className="rsvp">
      <h2>RSVP</h2>

      <form onSubmit={handleSubmit} className="rsvp-form">
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your full name"
          />
        </label>

        <label>
          Will you attend?
          <select
            value={attending ? 'yes' : 'no'}
            onChange={(e) => setAttending(e.target.value === 'yes')}
          >
            <option value="yes">Yes, I will attend</option>
            <option value="no">No, I cannot attend</option>
          </select>
        </label>

        <label>
          Message (optional)
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a message for the couple"
            rows={3}
          />
        </label>

        {error && <p className="error">{error}</p>}

        <Button type="submit">Send RSVP</Button>
      </form>
    </section>
  );
}

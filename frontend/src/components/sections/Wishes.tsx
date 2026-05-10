'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PhotoFrame from '@/components/ui/PhotoFrame';
import { submitWish } from '@/lib/api';
import { weddingContent } from '@/lib/content';

export default function Wishes() {
  const { wishes } = weddingContent;
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');

    try {
      await submitWish({ name, message });
      setSubmitted(true);
      setName('');
      setMessage('');
    } catch {
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <section className="invitation-section wishes-section">
      <div className="section-grid wishes-grid">
        <div className="media-stack">
          <PhotoFrame
            ratio="1:1"
            tone="sage"
            label="1:1 wishes frame"
            caption="Message portrait placeholder"
            detail="Use this for a photo or illustrated note card."
          />

          <Card eyebrow="Wishes" title={wishes.title} pinned>
            <p className="paper-card__text">{wishes.description}</p>
          </Card>
        </div>

        <div className="section-copy">
          <p className="eyebrow">Wishes</p>
          <h2 className="serif-heading section-title">{wishes.title}</h2>
          <p className="section-text">{wishes.prompt}</p>

          {submitted ? <p className="status-copy">Thank you for your message. It has been added to the wishes board.</p> : null}

          <form onSubmit={handleSubmit} className="form-shell">
            <div className="form-field">
              <label htmlFor="wish-name">Name</label>
              <input
                id="wish-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="wish-message">Message</label>
              <textarea
                id="wish-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
                placeholder="Write a short wish, blessing, or note for the couple"
                rows={5}
              />
            </div>

            {error && <p className="status-copy">{error}</p>}

            <Button type="submit">Send wish</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
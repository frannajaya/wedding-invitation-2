import Card from '@/components/ui/Card';
import PhotoFrame from '@/components/ui/PhotoFrame';
import { weddingContent } from '@/lib/content';

export default function Celebration() {
  const { celebration } = weddingContent;

  return (
    <section className="invitation-section celebration-section">
      <div className="section-grid celebration-grid">
        <div className="section-copy">
          <p className="eyebrow">Celebration</p>
          <h2 className="serif-heading section-title">{celebration.title}</h2>
          {celebration.paragraphs.map((paragraph) => (
            <p key={paragraph} className="section-text">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="media-stack">
          <PhotoFrame
            ratio="1:1"
            tone="gold"
            label="1:1 inline photo"
            caption="Small portrait placeholder"
            detail="Use this square frame for the first supporting image."
          />
          <PhotoFrame
            ratio="4:3"
            tone="sage"
            label="4:3 feature photo"
            caption="Large scene placeholder"
            detail="This frame can hold a reception or ceremony landscape."
          />
          <Card eyebrow="Pinned note" title="Story card" pinned>
            <p className="paper-card__text">{celebration.pinnedNote}</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
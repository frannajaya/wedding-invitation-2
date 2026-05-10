import PhotoFrame from '@/components/ui/PhotoFrame';
import { weddingContent } from '@/lib/content';

export default function Hero() {
  const { couple, hero } = weddingContent;

  return (
    <section className="invitation-section hero-section">
      <div className="section-grid hero-grid">
        <div className="section-copy">
          <p className="eyebrow">Wedding invitation</p>
          <h1 className="script-heading serif-heading">
            {couple.partnerOne} &amp; {couple.partnerTwo}
          </h1>
          <p className="body-copy">{couple.scriptLine}</p>
          <p className="section-text">{hero.intro}</p>
          <div className="pill-row">
            <span className="pill">{couple.dateLabel}</span>
            <span className="pill">{couple.venueLabel}</span>
            <span className="pill">{couple.locationLabel}</span>
          </div>
          <p className="micro-copy">{hero.supportLine}</p>
        </div>

        <PhotoFrame
          ratio="1:1"
          tone="blush"
          label="1:1 polaroid"
          caption="Opening portrait placeholder"
          detail="Keep this square frame for the first featured image."
        />
      </div>
    </section>
  );
}

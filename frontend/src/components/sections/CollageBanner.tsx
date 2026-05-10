import Card from '@/components/ui/Card';
import PhotoFrame from '@/components/ui/PhotoFrame';
import { weddingContent } from '@/lib/content';

export default function CollageBanner() {
  const { collageBanner } = weddingContent;

  return (
    <section className="invitation-section collage-section">
      <div className="section-copy">
        <p className="eyebrow">{collageBanner.eyebrow}</p>
        <h2 className="serif-heading section-title">{collageBanner.title}</h2>
        <p className="section-text">{collageBanner.description}</p>
      </div>

      <div className="banner-stack">
        <PhotoFrame
          ratio="21:9"
          tone="sage"
          label="21:9 backdrop"
          caption="Wide banner placeholder"
          detail="Use this span for the long panoramic image."
        />

        <div className="banner-floating">
          <div className="stacked-grid">
            <PhotoFrame
              ratio="3:2"
              tone="blush"
              label="3:2 polaroid"
              caption="Secondary photo placeholder"
              detail="Nest this frame over the panoramic image."
            />
            <Card eyebrow={collageBanner.eyebrow} title="Handwritten note" pinned>
              <p className="paper-card__text">{collageBanner.accent}</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
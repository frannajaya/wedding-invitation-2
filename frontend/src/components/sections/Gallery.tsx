import PhotoFrame from '@/components/ui/PhotoFrame';
import { weddingContent } from '@/lib/content';

export default function Gallery() {
  const { gallery } = weddingContent;

  return (
    <section className="invitation-section gallery-section">
      <div className="section-copy">
        <p className="eyebrow">Gallery</p>
        <h2 className="serif-heading section-title">{gallery.title}</h2>
        <p className="section-text">{gallery.description}</p>
      </div>

      <div className="banner-stack">
        <PhotoFrame
          ratio="21:9"
          tone="sage"
          label="21:9 banner"
          caption="Wide gallery backdrop placeholder"
          detail="Use this span for the long panoramic image."
        />
        <div className="gallery-strip">
          <PhotoFrame
            ratio="3:2"
            tone="blush"
            label="3:2 polaroid"
            caption="Detail shot placeholder"
            detail="Reserve for candid detail photography."
          />
          <PhotoFrame
            ratio="3:2"
            tone="gold"
            label="3:2 polaroid"
            caption="Second detail shot placeholder"
            detail="Keep the pair balanced in tone and scale."
          />
        </div>
      </div>
    </section>
  );
}

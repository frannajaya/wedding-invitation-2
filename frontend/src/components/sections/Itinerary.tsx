import Card from '@/components/ui/Card';
import PhotoFrame from '@/components/ui/PhotoFrame';
import { weddingContent } from '@/lib/content';

export default function Itinerary() {
  const { itinerary } = weddingContent;

  return (
    <section className="invitation-section itinerary-section">
      <div className="section-grid itinerary-grid">
        <div className="section-copy">
          <p className="eyebrow">Itinerary</p>
          <h2 className="serif-heading section-title">{itinerary.title}</h2>
          <p className="section-text">{itinerary.description}</p>

          <div className="timeline">
            {itinerary.events.map((event) => (
              <div key={event.time + event.title} className="timeline-item">
                <strong>
                  {event.time} · {event.title}
                </strong>
                <span>{event.description}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="media-stack">
          <PhotoFrame
            ratio="1:1"
            tone="blush"
            label="1:1 detail photo"
            caption="Venue detail placeholder"
            detail="Keep this as a supporting square image."
          />

          <Card eyebrow="Registry" title={itinerary.registry} pinned>
            <p className="paper-card__text">{itinerary.registryLink}</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
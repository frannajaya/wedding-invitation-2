import { weddingContent } from '@/lib/content';

export default function FAQ() {
  const { faq } = weddingContent;

  return (
    <section className="invitation-section faq-section">
      <div className="section-copy">
        <p className="eyebrow">FAQ</p>
        <h2 className="serif-heading section-title">Frequently asked questions</h2>
      </div>

      <div className="faq-grid">
        {faq.map((item) => (
          <article key={item.question} className="faq-item">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
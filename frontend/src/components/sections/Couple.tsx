/**
 * Couple section – introduces the bride and groom with a short bio.
 */
export default function Couple() {
  return (
    <section className="couple">
      <h2>The Couple</h2>

      <div className="couple-grid">
        <div className="person">
          <h3>Bride</h3>
          <p>A short bio about the bride.</p>
        </div>

        <div className="person">
          <h3>Groom</h3>
          <p>A short bio about the groom.</p>
        </div>
      </div>
    </section>
  );
}

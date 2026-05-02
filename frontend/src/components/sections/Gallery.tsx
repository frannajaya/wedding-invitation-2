/**
 * Gallery section – placeholder for wedding photo gallery.
 */
export default function Gallery() {
  // Replace the placeholder items with actual image paths / URLs.
  const photos: string[] = [];

  return (
    <section className="gallery">
      <h2>Gallery</h2>

      {photos.length === 0 ? (
        <p className="placeholder">Photos coming soon.</p>
      ) : (
        <div className="gallery-grid">
          {photos.map((src, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={index} src={src} alt={`Wedding photo ${index + 1}`} />
          ))}
        </div>
      )}
    </section>
  );
}

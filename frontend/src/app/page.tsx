import Hero from '@/components/sections/Hero';
import Couple from '@/components/sections/Couple';
import Gallery from '@/components/sections/Gallery';
import RSVP from '@/components/sections/RSVP';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Couple />
      <Gallery />
      <RSVP />
    </main>
  );
}

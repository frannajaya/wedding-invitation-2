import Hero from '@/components/sections/Hero';
import CollageBanner from '@/components/sections/CollageBanner';
import Celebration from '@/components/sections/Celebration';
import Itinerary from '@/components/sections/Itinerary';
import FAQ from '@/components/sections/FAQ';
import Gallery from '@/components/sections/Gallery';
import RSVP from '@/components/sections/RSVP';
import Wishes from '@/components/sections/Wishes';

export default function HomePage() {
  return (
    <main className="invitation-page">
      <Hero />
      <CollageBanner />
      <Celebration />
      <Itinerary />
      <FAQ />
      <Gallery />
      <RSVP />
      <Wishes />
    </main>
  );
}

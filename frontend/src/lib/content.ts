export type PhotoRatio = '1:1' | '3:2' | '4:3' | '3:4' | '21:9';

export interface WeddingContent {
  couple: {
    partnerOne: string;
    partnerTwo: string;
    dateLabel: string;
    venueLabel: string;
    locationLabel: string;
    scriptLine: string;
  };
  hero: {
    intro: string;
    supportLine: string;
  };
  collageBanner: {
    eyebrow: string;
    title: string;
    description: string;
    accent: string;
  };
  celebration: {
    title: string;
    paragraphs: string[];
    pinnedNote: string;
  };
  itinerary: {
    title: string;
    description: string;
    events: Array<{ time: string; title: string; description: string }>;
    registry: string;
    registryLink: string;
  };
  faq: Array<{ question: string; answer: string }>;
  gallery: {
    title: string;
    description: string;
    accents: string[];
  };
  rsvp: {
    title: string;
    description: string;
    guestCountNote: string;
    contacts: Array<{ label: string; value: string }>;
    maxGuests: number;
  };
  wishes: {
    title: string;
    description: string;
    prompt: string;
  };
}

export const weddingContent: WeddingContent = {
  couple: {
    partnerOne: 'Partner One',
    partnerTwo: 'Partner Two',
    dateLabel: 'Wedding date to be confirmed',
    venueLabel: 'Ceremony and reception venue placeholder',
    locationLabel: 'Location details to be finalized',
    scriptLine: 'Two lives, one story, and a day set aside for the people we love most.',
  },
  hero: {
    intro: 'A warm afternoon ceremony, a candlelit reception, and a paper-soft invitation to celebrate with us.',
    supportLine: 'Scroll for the details, placeholder moments, and RSVP form.',
  },
  collageBanner: {
    eyebrow: 'Invitation spread',
    title: 'A layered preview of the day',
    description:
      'The template keeps the opening image wide and atmospheric, with space for a polaroid and a handwritten note beside it.',
    accent: 'Paper, ribbon, and a little movement between each block.',
  },
  celebration: {
    title: 'The celebration',
    paragraphs: [
      'This block is intentionally arranged like a photographed page: one intimate image, one larger frame, and a pinned note for the part of the story that needs a little more emphasis.',
      'Use it for your favorite portrait, a small timeline summary, or a short paragraph about how the ceremony will unfold.',
    ],
    pinnedNote: 'Pinned card placeholder for a short story, blessing, or reminder.',
  },
  itinerary: {
    title: 'Itinerary and details',
    description:
      'The schedule stays readable with a text-led column, one supporting photo, and a registry note that feels like a clipped envelope.',
    events: [
      { time: '3:00 PM', title: 'Guest arrival', description: 'Welcome drinks, soft music, and time to settle in.' },
      { time: '4:00 PM', title: 'Ceremony', description: 'The vows, the applause, and the first quiet breath together.' },
      { time: '6:30 PM', title: 'Reception', description: 'Dinner, speeches, and the dance floor opening after sunset.' },
    ],
    registry: 'Registry details placeholder',
    registryLink: 'Add a registry link, a bank account note, or a gifting preference here.',
  },
  faq: [
    {
      question: 'What should I wear?',
      answer: 'Keep it semi-formal and comfortable for an outdoor-to-evening celebration.',
    },
    {
      question: 'Can I bring a plus one?',
      answer: 'The invitation will confirm the allowed guest count for each household.',
    },
    {
      question: 'Will there be parking?',
      answer: 'Add the venue parking note here, along with any shuttle or ride-share details.',
    },
    {
      question: 'What time should I RSVP by?',
      answer: 'Set the deadline here so guests know when the attendance window closes.',
    },
  ],
  gallery: {
    title: 'Gallery banner',
    description:
      'This area keeps the final stretch of the page visually open with a panoramic banner and two smaller polaroids for detail shots.',
    accents: ['One wide background frame', 'Two 3:2 image cards', 'Keep the spacing airy and intentional'],
  },
  rsvp: {
    title: 'RSVP and contact',
    description:
      'Use the form for attendance and guest count only. Wishes and messages live in their own section so the response stays simple.',
    guestCountNote: 'Guest count is capped by the backend setting for this invitation.',
    contacts: [
      { label: 'Email', value: 'hello@example.com' },
      { label: 'Phone', value: '+1 (555) 123-4567' },
      { label: 'Venue', value: 'Ceremony venue placeholder' },
    ],
    maxGuests: 6,
  },
  wishes: {
    title: 'Wishes',
    description: 'Leave a note, a blessing, or a short message after you RSVP.',
    prompt: 'Messages are stored separately from attendance so the RSVP stays lightweight.',
  },
};
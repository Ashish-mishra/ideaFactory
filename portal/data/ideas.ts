/**
 * Gift concepts we are evaluating to make and sell.
 * These are NOT on sale yet. Each idea passed two filters:
 *  - makeable in-house (audio/RFID electronics, acrylic and laser work, printing)
 *  - not already sold as a close equivalent, as far as we could find (web check, Nov 2026)
 * Visitors can vote "I'd buy this" to tell us what to build first.
 */
export interface Idea {
  slug: string; // also used as the vote key: `gift-${slug}`
  name: string;
  tagline: string;
  description: string;
  forWho: string;
  howItWorks: string;
  whyDifferent: string;
  occasions: string[]; // occasion page slugs
}

export const ideas: Idea[] = [
  {
    slug: 'voice-bouquet-frame',
    name: 'The Voice Bouquet Frame',
    tagline: 'A frame that holds many voices, each one a tap away.',
    description:
      'A photo frame with a handful of touch points. Relatives, classmates or wedding guests each record a short message, and touching a spot on the frame plays that person\'s voice. It becomes a keepsake of who showed up for someone.',
    forWho: 'Weddings, teachers\' farewells, parents\' anniversaries, milestone birthdays.',
    howItWorks: 'We collect the recordings through a simple link, load them onto the frame, and ship it ready to play. No app, no Wi-Fi.',
    whyDifferent: 'Audio guestbooks exist as phone-based or hired-equipment services. We found no physical keepsake frame that plays many people\'s voices on touch.',
    occasions: ['unique-wedding-gifts', 'unique-gifts-for-teacher', 'unique-anniversary-gifts', 'unique-gifts-for-parents', 'unique-gifts-for-birthday', 'personalized-gifts', 'unique-gifts-for-grandparents'],
  },
  {
    slug: 'one-tap-bhajan-box',
    name: 'The One-Tap Bhajan Box',
    tagline: 'A bhajan player for parents who find phones tiring.',
    description:
      'A simple wooden box with picture cards. Place the card of Hanuman Chalisa, a morning aarti or a favourite old song on top and it plays. No menu, no screen, no remote, and no fiddling with a smartphone.',
    forWho: 'Parents and grandparents who prefer simple devices, and the children who worry about them.',
    howItWorks: 'You choose the bhajans and recordings, we load them onto printed cards and set up the box. Adding more cards later is simple.',
    whyDifferent: 'Devotional speakers exist, but they use buttons, remotes and menus. We found no card-based, one-tap player built for elders.',
    occasions: ['unique-gifts-for-parents', 'unique-gifts-for-grandparents', 'unique-diwali-gifts'],
  },
  {
    slug: 'family-voice-story-cards',
    name: 'Family Voice Story Cards',
    tagline: 'Dadi\'s stories, in Dadi\'s voice, for the grandchildren.',
    description:
      'A set of illustrated cards, each carrying a story or memory recorded by a grandparent. A child places a card on the player and hears the story in the voice they know. The cards stay with the family long after the recording session.',
    forWho: 'Grandparents, parents and children, and any family who wants to keep an elder\'s stories.',
    howItWorks: 'We guide the family through recording, clean up the audio and print the cards. The player is screen-free and works without Wi-Fi.',
    whyDifferent: 'Story players use pre-made content. We found none built around recording your own family\'s elders.',
    occasions: ['unique-gifts-for-grandparents', 'unique-gifts-for-kids', 'unique-gifts-for-newborn-baby', 'unique-gifts-for-parents'],
  },
  {
    slug: 'birthday-time-capsule',
    name: 'The Birthday Time Capsule',
    tagline: 'One voice note for every birthday, sealed until the day.',
    description:
      'A keepsake box with numbered, sealed cards for future birthdays. Each card holds a voice note from a parent, a friend or a grandparent, and plays only when it\'s opened on the right birthday. A child can end up with eighteen birthdays\' worth of messages.',
    forWho: 'A child\'s birthday, a first birthday, a newborn\'s gift from relatives, or an 18th as a gift to open over years.',
    howItWorks: 'You record the messages once. We load and number the cards and ship the box with a guide on when to open each.',
    whyDifferent: 'Recordable cards and boxes exist, but they play on demand. We found none that are sealed to unlock year by year.',
    occasions: ['unique-gifts-for-birthday', 'unique-gifts-for-kids', 'unique-gifts-for-newborn-baby', 'unique-gifts-for-him', 'unique-gifts-for-her', 'personalized-gifts'],
  },
  {
    slug: 'open-when-voice-letters',
    name: 'Open-When Voice Letters',
    tagline: '"Open when you miss me", but you can hear it.',
    description:
      'A box of beautifully printed letters, each labelled for a moment: open when you miss me, open when you\'ve had a bad day, open when you need a laugh. Each plays a voice note you recorded for that moment.',
    forWho: 'Couples in long-distance relationships, partners travelling for work, a friend moving cities.',
    howItWorks: 'You record the notes and choose the labels. We handle the printing and loading and deliver a sealed set.',
    whyDifferent: 'Paper open-when letters are common. We found no set where each letter carries your actual voice.',
    occasions: ['unique-gifts-for-girlfriend', 'unique-gifts-for-wife', 'unique-anniversary-gifts', 'unique-gifts-for-him', 'unique-gifts-for-her', 'personalized-gifts'],
  },
  {
    slug: 'tap-to-play-rakhi',
    name: 'The Tap-to-Play Rakhi',
    tagline: 'A rakhi that carries a message you can play back every year.',
    description:
      'A rakhi with a small embedded tag. Tap a phone to it and it plays the sibling\'s recorded message. The voice stays with the rakhi, so the message is there years later, even after the thread is changed.',
    forWho: 'Brothers and sisters who live in different cities or countries.',
    howItWorks: 'You send the voice message and choose the design. The tag is programmed before shipping, and the playback needs no app.',
    whyDifferent: 'Connected rakhis exist, but they pair with a phone for alerts. We found none that simply plays a message when tapped.',
    occasions: ['unique-rakhi-gifts', 'unique-gifts-for-him', 'unique-gifts-for-her'],
  },
  {
    slug: 'heartbeat-keepsake-plaque',
    name: 'The Heartbeat Keepsake Plaque',
    tagline: 'A newborn\'s heartbeat, kept where you can hear it.',
    description:
      'A laser-etched acrylic plaque showing the baby\'s heartbeat or first-cry waveform, along with the name and date. A touch plays the real recording. It sits on a shelf, not in a phone.',
    forWho: 'New parents, grandparents and close family giving a gift for a birth.',
    howItWorks: 'The family sends the recording from a scan or phone. We make the plaque and load the audio.',
    whyDifferent: 'Sound-wave plaques exist, mostly sold abroad, and the audio sits behind a QR code. We found none that plays on the plaque itself.',
    occasions: ['unique-gifts-for-newborn-baby'],
  },
];

export function ideasForOccasion(slug: string): Idea[] {
  return ideas.filter((i) => i.occasions.includes(slug));
}

/**
 * Gift concepts we are evaluating to make and sell.
 * These are NOT on sale yet. Each idea passed two filters:
 *  - makeable in-house (audio/RFID electronics, acrylic and laser work, printing)
 *  - either not sold as a close equivalent (checked Nov 2026) or sold, but we have a clear angle to do better
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
  {
    slug: "vinyl-photo-magnet-speaker",
    name: "The Spinning Vinyl Fridge Speaker",
    tagline: "A tiny record player for the fridge, with discs that each hold a song.",
    description: "A fridge-magnet speaker styled as a spinning vinyl record. Each swappable disc carries a song or a voice message, and placing one on the player starts it. Your own photo and message go on the discs.",
    forWho: "Couples, siblings, parents and friends who want a gift that sits on the fridge and plays.",
    howItWorks: "We load the songs or voice notes onto discs, print the artwork and ship a rechargeable player with a starter set.",
    whyDifferent: "Disc-based fridge speakers exist in India. Ours would put your own photos, songs and voice notes on the discs instead of generic ones.",
    occasions: ["unique-gifts-for-girlfriend", "unique-gifts-for-wife", "unique-anniversary-gifts", "unique-gifts-for-him", "unique-gifts-for-her", "unique-gifts-for-birthday", "personalized-gifts", "unique-gifts-for-parents"],
  },
  {
    slug: "anime-style-light-frame",
    name: "The Illuminated Art Light Frame",
    tagline: "A glowing wall or desk frame with adjustable warm-to-cool light.",
    description: "A wooden frame with an acrylic panel and a built-in LED. The artwork lights up and the brightness and colour can be adjusted. We would draw original anime-style and pop-culture-inspired art, not licensed characters.",
    forWho: "Teenagers and young adults who love anime, gaming and illustration, and anyone who wants a glowing desk piece.",
    howItWorks: "We produce the artwork in-house or from a customer's own drawing or photo, print it on the acrylic and ship it USB-powered.",
    whyDifferent: "Light frames with licensed characters are sold widely. Ours would use original art or the buyer's own picture, which also avoids licensing problems.",
    occasions: ["unique-gifts-for-birthday", "unique-gifts-for-him", "unique-gifts-for-her", "personalized-gifts", "unique-gifts-for-kids"],
  },
  {
    slug: "dual-name-illusion-plate",
    name: "The Dual-Name Illusion Plate",
    tagline: "Two names, one plate. Each shows from a different angle.",
    description: "A small 3D-printed plate that reads one name from the left and another from the right. For couples it spells both names, or names and a date, and it sits on a desk or shelf.",
    forWho: "Couples, newlyweds, best friends and siblings, and a low-cost option when budget matters.",
    howItWorks: "You send the two names or words. We make the plate and ship it in a small gift box.",
    whyDifferent: "Dual-name plates are sold at low prices in India. We would compete on clean finishes, gift packaging and optional extras such as a message card or a voice-note tag.",
    occasions: ["unique-gifts-for-girlfriend", "unique-gifts-for-wife", "unique-anniversary-gifts", "unique-wedding-gifts", "unique-gifts-under-500", "personalized-gifts", "unique-gifts-for-birthday"],
  },
  {
    slug: "levitating-display-piece",
    name: "The Levitating Display Piece",
    tagline: "A small model that floats above its base.",
    description: "A desk piece in which a model, such as a car, a spaceship or a custom figure, floats above a base using magnets. It works as a conversation piece and a gift for people who like gadgets.",
    forWho: "Car and gadget fans, teenagers and anyone who likes unusual desk objects.",
    howItWorks: "We make the base and model, calibrate the magnets and ship it with simple set-up instructions. A custom name or small engraved plate could be added.",
    whyDifferent: "Levitating models are sold internationally. A made-in-India version with customisation, such as the buyer's own car or a named base plate, would be the difference.",
    occasions: ["unique-gifts-for-him", "unique-gifts-for-birthday", "unique-gifts-for-kids", "personalized-gifts"],
  },
  {
    slug: "lithophane-photo-lamp",
    name: "The Lithophane Photo Lamp",
    tagline: "A photo that appears when the light comes on.",
    description: "A photo is turned into a thin 3D-printed panel whose thickness varies, so the picture only becomes clear when the light shines through. Switched off, it looks like a plain white panel in a frame.",
    forWho: "Couples, new parents, families and anyone with a photo that matters to them.",
    howItWorks: "You upload a photo. We convert and print the panel, fit it into a frame with a light and ship it ready to switch on.",
    whyDifferent: "Lithophane frames already sell in India. Ours would focus on finishing quality, good photo conversion and packaging that suits gifting.",
    occasions: ["personalized-gifts", "unique-anniversary-gifts", "unique-gifts-for-wife", "unique-gifts-for-parents", "unique-gifts-for-grandparents", "unique-gifts-for-newborn-baby", "unique-gifts-for-birthday", "unique-wedding-gifts"],
  },
  {
    slug: "mini-retro-tv",
    name: "The Mini Retro TV",
    tagline: "A tiny TV for your desk where every channel is yours.",
    description: "A miniature retro television with a small screen and a rotary knob. Turn the knob to change channels: a family-photo slideshow, a looping clip, a clock, a message from the giver or a pixel animation. It runs on a small microcontroller board and USB power.",
    forWho: "Gadget and retro fans, teenagers, parents who like desk objects, and anyone who would enjoy a conversation piece.",
    howItWorks: "We load your channels, such as photos, clips and a custom message, before shipping. It plugs into any USB charger and needs no app or Wi-Fi to watch.",
    whyDifferent: "Hobby-built mini TVs exist as DIY kits and small-seller items. Ours would arrive finished, with channels made from your own photos and messages, in gift packaging.",
    occasions: ["unique-gifts-for-him", "unique-gifts-for-birthday", "unique-gifts-for-kids", "personalized-gifts", "unique-gifts-for-her"],
  },
];

export function ideasForOccasion(slug: string): Idea[] {
  return ideas.filter((i) => i.occasions.includes(slug));
}

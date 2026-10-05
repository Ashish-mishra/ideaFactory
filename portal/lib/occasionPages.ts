import { Product, products } from '@/data/products';

export interface OccasionPage {
  slug: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  products: Product[];
  faq: { q: string; a: string }[];
}

const allProducts = products;

export const occasionPages: OccasionPage[] = [
  {
    slug: 'unique-gifts-for-birthday',
    title: 'Unique Birthday Gift Ideas — Gifts They\'ll Never Forget | UniqueIdeas.in',
    h1: 'Unique Birthday Gift Ideas',
    description: 'Looking for a unique birthday gift in India? Discover handpicked birthday gift ideas — personalized, meaningful, and unlike anything from a mall. Starting ₹899.',
    intro: 'Birthdays deserve something special — not another mug or scarf. Here are curated unique birthday gift ideas that actually surprise people.',
    products: allProducts,
    faq: [
      { q: 'What is a truly unique birthday gift?', a: 'A truly unique birthday gift is personalized, unexpected, and tells a story. Think a musical fridge magnet with a photo and song, or a screen-free story box for kids — gifts that create a memory, not just a moment.' },
      { q: 'What are good unique birthday gifts under ₹1000?', a: 'The Musical Photo Fridge Magnet at ₹899 is our top pick — it combines a photo, a song, and a heartfelt message into one keepsake. It ships across India and arrives ready to gift.' },
      { q: 'What is the best unique gift for a child\'s birthday?', a: 'The BoxTales Kids Kahaani Box is perfect for children aged 3–8. It\'s a screen-free audio storytelling cube that plays Panchatantra tales and folklore when a 3D figurine is placed on it. Memorable, educational, and unlike any toy they\'ve received before.' },
    ],
  },
  {
    slug: 'unique-gifts-for-kids',
    title: 'Unique Gifts for Kids in India — Screen-Free & Educational | UniqueIdeas.in',
    h1: 'Unique Gifts for Kids',
    description: 'Discover unique gifts for kids in India — screen-free, educational, and actually fun. The BoxTales Kahaani Box brings Panchatantra stories to life without any screen. Ages 3–8.',
    intro: 'The best gifts for kids aren\'t toys they forget by Tuesday — they\'re experiences that spark imagination. Here are unique gift ideas your child will actually love.',
    products: allProducts.filter(p => p.categories.includes('for-kids')),
    faq: [
      { q: 'What are unique educational gifts for kids in India?', a: 'Screen-free audio story devices like the BoxTales Kids Kahaani Box are among the best unique educational gifts for Indian children. They combine Indian folklore (Panchatantra, Amar Chitra Katha) with hands-on play — no screen, no Wi-Fi needed.' },
      { q: 'What is a good unique gift for a 3–8 year old?', a: 'The BoxTales Kahaani Box — a child places a 3D figurine on the cube and a story plays instantly. It builds cultural awareness, language skills, and imagination. Far more memorable than another soft toy.' },
      { q: 'Are screen-free gifts good for kids?', a: 'Yes — child development experts consistently recommend screen-free play, especially at bedtime. Audio storytelling devices let children engage their imagination without the stimulation of a screen, leading to better sleep and richer vocabulary.' },
    ],
  },
  {
    slug: 'personalized-gifts',
    title: 'Personalized Gift Ideas India — Unique & Meaningful | UniqueIdeas.in',
    h1: 'Personalized Gift Ideas',
    description: 'Explore unique personalized gift ideas in India — add a photo, name, or song to create something truly one-of-a-kind. Handcrafted and shipped across India. From ₹899.',
    intro: 'Personalized gifts say "I thought about you" in a way nothing else can. Here are our top picks that combine customization with quality.',
    products: allProducts.filter(p => p.categories.includes('personalized')),
    faq: [
      { q: 'What are the best personalized gifts in India?', a: 'The Musical Photo Fridge Magnet is one of the most unique personalized gifts in India — you add your own photo, a custom message, and a song, and it arrives as a ready-to-give keepsake with a built-in speaker.' },
      { q: 'How long does a personalized gift take to ship?', a: 'Personalized gifts from CreateMyGift typically ship within 2–3 business days and arrive within 5–7 business days across India. Check the product page for the latest estimated delivery timeline.' },
      { q: 'What is a unique personalized gift for a couple?', a: 'A Musical Photo Fridge Magnet with the couple\'s photo and their song is a timeless personalized gift. It sits on their fridge every day and plays the memory whenever they want.' },
    ],
  },
  {
    slug: 'unique-anniversary-gifts',
    title: 'Unique Anniversary Gift Ideas India — Gifts That Mean More | UniqueIdeas.in',
    h1: 'Unique Anniversary Gift Ideas',
    description: 'Find truly unique anniversary gift ideas in India — personalized, sentimental, and memorable. A musical keepsake with your photo and song makes anniversaries unforgettable.',
    intro: 'Anniversary gifts should feel like the relationship — personal, warm, and full of meaning. Skip the flowers. Here are unique anniversary gift ideas that last.',
    products: allProducts,
    faq: [
      { q: 'What is a unique anniversary gift for husband or wife?', a: 'A Musical Photo Fridge Magnet with your wedding photo and the song that played at your wedding is one of the most unique anniversary gifts you can give. It plays the memory every time they open the fridge.' },
      { q: 'What are unique 1st anniversary gift ideas?', a: 'For a first anniversary, personalized gifts work beautifully — something that commemorates the first year together. A musical fridge magnet with a meaningful photo and song is under ₹1,000 and deeply personal.' },
      { q: 'What anniversary gifts are actually unique in India?', a: 'Most anniversary gifts in India are jewellery, flowers, or dining vouchers. A truly unique option is a personalized audio keepsake — like the Musical Photo Fridge Magnet — that plays your couple\'s song and shows your photo every day.' },
    ],
  },
  {
    slug: 'unique-gifts-for-him',
    title: 'Unique Gifts for Him — Unusual Gift Ideas for Men India | UniqueIdeas.in',
    h1: 'Unique Gifts for Him',
    description: 'Struggling to find a unique gift for him? Explore unusual gift ideas for men in India — personalized, quirky, and actually useful. From ₹899, shipped pan-India.',
    intro: 'Men are notoriously hard to shop for. These unique gift ideas for him go beyond the usual wallet-and-watch routine.',
    products: allProducts,
    faq: [
      { q: 'What is a unique gift for a boyfriend or husband in India?', a: 'A Musical Photo Fridge Magnet with a photo of the two of you and his favourite song is a deeply personal and unusual gift for men. It\'s under ₹1,000 and will genuinely surprise him.' },
      { q: 'What are unique gifts for dad?', a: 'For fathers who value culture and family, the BoxTales Kahaani Box for his grandchildren is a meaningful gift — it lets him share Panchatantra stories he grew up with. A Musical Photo Fridge Magnet with a family photo also works beautifully.' },
      { q: 'What are the most unusual gifts for men in India?', a: 'Musical keepsakes, personalized tech-meets-craft gifts, and screen-free family experiences are among the most unusual gift ideas for men in India. They\'re unexpected precisely because most gifting is generic.' },
    ],
  },
  {
    slug: 'unique-gifts-for-her',
    title: 'Unique Gifts for Her — Thoughtful Gift Ideas for Women India | UniqueIdeas.in',
    h1: 'Unique Gifts for Her',
    description: 'Find a truly unique gift for her in India — personalized, heartfelt, and unlike anything from a mall. Musical keepsakes, story boxes, and more. From ₹899.',
    intro: 'The best gifts for her are the ones that feel like you really listened. Here are unique gift ideas for women that go beyond flowers and spa vouchers.',
    products: allProducts,
    faq: [
      { q: 'What is a unique gift for a girlfriend or wife in India?', a: 'A Musical Photo Fridge Magnet with your photo and a meaningful song is an unexpectedly beautiful gift for her. It\'s personalized, functional, and plays your memory every time she opens the fridge.' },
      { q: 'What are unique gifts for mom?', a: 'For mothers, a Musical Photo Fridge Magnet with a family photo and a song she loves is deeply meaningful. If she has young grandchildren, the BoxTales Kahaani Box lets her share bedtime stories in her own recorded voice.' },
      { q: 'What unique gifts for women are available under ₹1000 in India?', a: 'The Musical Photo Fridge Magnet at ₹899 is our top pick for a unique gift for women under ₹1,000. It\'s personalized with her photo and song, ships across India, and arrives beautifully packaged.' },
    ],
  },
];

export function getOccasionBySlug(slug: string): OccasionPage | undefined {
  return occasionPages.find((p) => p.slug === slug);
}

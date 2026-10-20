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
  {
    slug: 'unique-gifts-under-500',
    title: 'Unique Gifts Under ₹500 India — Thoughtful & Affordable | UniqueIdeas.in',
    h1: 'Unique Gifts Under ₹500',
    description: 'Find unique gifts under ₹500 in India — thoughtful, personalized, and budget-friendly. Handpicked ideas that feel special without breaking the bank.',
    intro: 'Budget doesn\'t have to mean boring. These unique gift ideas under ₹500 punch well above their price tag.',
    products: allProducts.filter(p => p.categories.includes('under-1000')),
    faq: [
      { q: 'What is a unique gift under ₹500 in India?', a: 'The Musical Photo Fridge Magnet starts at ₹899 — but even at that price it\'s far more personal than a ₹500 generic gift. For truly budget picks, look for personalized digital gifts or curated experiences.' },
      { q: 'Can a gift under ₹500 still feel thoughtful?', a: 'Absolutely. The thoughtfulness comes from personalization, not price. A heartfelt card with a specific memory, or a small personalized keepsake, means far more than an expensive generic item.' },
      { q: 'What are unique affordable gifts for friends in India?', a: 'Personalized magnets, custom photo prints, and handmade keepsakes are among the most unique affordable gift ideas in India. They\'re inexpensive to make but feel one-of-a-kind to receive.' },
    ],
  },
  {
    slug: 'unique-gifts-for-wife',
    title: 'Unique Gifts for Wife India — Surprise Her with Something Special | UniqueIdeas.in',
    h1: 'Unique Gifts for Wife',
    description: 'Find a truly unique gift for your wife in India — personalized, meaningful, and unlike anything from a mall. Musical keepsakes and sentimental surprises she\'ll love. From ₹899.',
    intro: 'The best gift for your wife isn\'t the most expensive one — it\'s the most personal. These unique gift ideas for wives are built around meaning, not price.',
    products: allProducts,
    faq: [
      { q: 'What is a unique gift for wife in India?', a: 'A Musical Photo Fridge Magnet with your wedding photo and your song is one of the most personal unique gifts for a wife. It plays your memory every time she opens the fridge. Under ₹1,000 and deeply sentimental.' },
      { q: 'What unique anniversary gift can I give my wife?', a: 'For anniversaries, something that captures a specific memory works best — your wedding song on a personalized magnet, or a BoxTales box for your kids that she can share bedtime stories with. Both are unexpected and emotional.' },
      { q: 'What unique gifts for wife are available online in India?', a: 'CreateMyGift offers personalized musical fridge magnets that ship across India in 5–7 days. You can add her photo, a custom message, and the song that means something to you both.' },
    ],
  },
  {
    slug: 'unique-gifts-for-girlfriend',
    title: 'Unique Gifts for Girlfriend India — Gifts She\'ll Actually Love | UniqueIdeas.in',
    h1: 'Unique Gifts for Girlfriend',
    description: 'Unique gift ideas for girlfriend in India — personalized, romantic, and genuinely surprising. Musical keepsakes and heartfelt gifts from ₹899, delivered across India.',
    intro: 'Generic gifts send a generic message. These unique gift ideas for your girlfriend say "I actually paid attention."',
    products: allProducts.filter(p => p.categories.includes('personalized')),
    faq: [
      { q: 'What is a unique romantic gift for girlfriend in India?', a: 'A Musical Photo Fridge Magnet with a photo of the two of you and your song is a uniquely romantic gift. It combines a visual memory and a musical one — she\'ll think of you every time she opens her fridge.' },
      { q: 'What unique gifts for girlfriend are under ₹1000 in India?', a: 'The Musical Photo Fridge Magnet at ₹899 is our top pick for a unique girlfriend gift under ₹1,000. It\'s fully personalized with her photo, a custom message, and the song you both love.' },
      { q: 'What unique gift should I give my girlfriend on her birthday?', a: 'Something personalized that commemorates a shared memory — like your song on a magnetic keepsake with her photo. It\'s thoughtful, affordable, and completely unlike anything she\'d receive from anyone else.' },
    ],
  },
  {
    slug: 'unique-gifts-for-parents',
    title: 'Unique Gifts for Parents India — Gifts They\'ll Treasure Forever | UniqueIdeas.in',
    h1: 'Unique Gifts for Parents',
    description: 'Find unique gifts for parents in India — sentimental, personal, and truly memorable. From musical family keepsakes to screen-free story boxes for grandchildren. From ₹899.',
    intro: 'Parents have everything they need. What they don\'t have is more time. These unique gift ideas for parents capture moments they\'ll treasure.',
    products: allProducts,
    faq: [
      { q: 'What is a unique gift for parents on their anniversary?', a: 'A Musical Photo Fridge Magnet with their wedding photo and the song from their wedding is an unexpectedly sentimental unique gift for parents. It\'s something they\'ll keep and play for years.' },
      { q: 'What unique gifts for parents are available in India under ₹1000?', a: 'The Musical Photo Fridge Magnet at ₹899 is perfect for parents — you can add a meaningful family photo and a song that matters to your family. Ships across India in 5–7 days.' },
      { q: 'What is a unique gift for parents who have everything?', a: 'For parents who have everything, the best unique gifts are experiential or sentimental — a personalized audio keepsake of a family memory, or a BoxTales device that lets them share Indian stories with their grandchildren in their own recorded voice.' },
    ],
  },
  {
    slug: 'unique-gifts-for-grandparents',
    title: 'Unique Gifts for Grandparents India — Meaningful & Easy to Use | UniqueIdeas.in',
    h1: 'Unique Gifts for Grandparents',
    description: 'Find unique gifts for grandparents in India — meaningful, easy to use, and built to bridge generations. Screen-free devices and personalized keepsakes from ₹899.',
    intro: 'The best gifts for grandparents connect them to family. These unique gift ideas for grandparents close the distance, even when they\'re far away.',
    products: allProducts,
    faq: [
      { q: 'What is a unique gift for Nana or Nani in India?', a: 'The BoxTales Roots device is designed specifically for seniors — a screen-free, zero-UI audio box for bhajans and devotional content. The Nana/Nani Mode also lets grandparents record their own bedtime stories that play on their grandchildren\'s devices.' },
      { q: 'What unique gifts for grandparents are easy to use?', a: 'Screen-free devices with simple one-tap mechanics are ideal for grandparents. The BoxTales Roots device has a single volume dial and no menus — place a card on top and it plays. No smartphone needed.' },
      { q: 'What unique gift connects grandparents and grandchildren?', a: 'The BoxTales ecosystem is unique precisely because it bridges generations — grandparents record stories in their own voice, grandchildren hear them on the Kahaani Box. It\'s a living archive of family memory.' },
    ],
  },
  {
    slug: 'unique-diwali-gifts',
    title: 'Unique Diwali Gift Ideas 2026 India — Beyond Dry Fruits & Sweets | UniqueIdeas.in',
    h1: 'Unique Diwali Gift Ideas 2026',
    description: 'Discover unique Diwali gift ideas for 2026 — beyond mithai boxes and diyas. Personalized musical keepsakes and cultural story boxes that will be remembered long after the festival.',
    intro: 'Diwali deserves more than another dry fruit box. These unique Diwali gift ideas for 2026 will actually be remembered.',
    products: allProducts,
    faq: [
      { q: 'What are unique Diwali gifts in 2026?', a: 'Unique Diwali gifts in 2026 go beyond the usual hampers — think personalized musical magnets with a family photo, or a BoxTales screen-free story box for children that brings Indian folklore to life. Both ship across India and arrive gift-ready.' },
      { q: 'What is a unique Diwali gift for a family?', a: 'The BoxTales Kids Kahaani Box is a perfect Diwali gift for a family — it connects children to Indian culture through screen-free storytelling, without any Wi-Fi or subscriptions. A keepsake that keeps giving.' },
      { q: 'What unique Diwali corporate gifts can I order online in India?', a: 'Personalized Musical Photo Fridge Magnets work exceptionally well as unique Diwali corporate gifts — each one is different (custom photo and song), they\'re under ₹1,000 per piece, and they feel genuinely thoughtful rather than generic.' },
    ],
  },
  {
    slug: 'unique-rakhi-gifts',
    title: 'Unique Rakhi Gift Ideas for Brother & Sister India 2026 | UniqueIdeas.in',
    h1: 'Unique Rakhi Gift Ideas',
    description: 'Find unique Rakhi gift ideas in India for 2026 — personalized, meaningful, and far more memorable than a chocolate hamper. For brother, sister, and the kids in your life.',
    intro: 'Rakhi is about the bond, not the box. These unique Rakhi gift ideas let that bond do the talking.',
    products: allProducts,
    faq: [
      { q: 'What is a unique Rakhi gift for brother in India?', a: 'A Musical Photo Fridge Magnet with a childhood photo of the two of you and a song from your growing-up years is a uniquely sentimental Rakhi gift for a brother. It\'s personal, affordable at ₹899, and completely unexpected.' },
      { q: 'What are unique Rakhi gifts for sister in India?', a: 'For a sister who has kids, the BoxTales Kahaani Box is a standout Rakhi gift — it brings Panchatantra stories to life without any screen, and she\'ll think of you every bedtime. For a personal touch, the Musical Photo Fridge Magnet works beautifully.' },
      { q: 'What unique Rakhi gifts can I order online with fast delivery?', a: 'Both CreateMyGift and BoxTales products ship across India. The Musical Photo Fridge Magnet ships in 2–3 business days from Greater Noida. Order at least a week before Raksha Bandhan for comfortable delivery.' },
    ],
  },
  {
    slug: 'unique-wedding-gifts',
    title: 'Unique Wedding Gift Ideas India — Gifts the Couple Will Keep | UniqueIdeas.in',
    h1: 'Unique Wedding Gift Ideas',
    description: 'Find unique wedding gift ideas in India — sentimental, personal, and unlike another kitchen appliance. Musical keepsakes and story boxes that the couple will treasure for years.',
    intro: 'The couple will return three toasters. Give them something they\'ll keep. These unique wedding gift ideas are built to last.',
    products: allProducts,
    faq: [
      { q: 'What is a unique wedding gift in India?', a: 'A Musical Photo Fridge Magnet with the couple\'s engagement photo and their song is one of the most personal unique wedding gifts you can give. It goes on their fridge on day one and plays a memory every time they open it.' },
      { q: 'What are unique wedding gifts under ₹1000 in India?', a: 'The Musical Photo Fridge Magnet at ₹899 is our top pick for a unique wedding gift under ₹1,000. It\'s fully personalized, arrives beautifully packaged, and is deeply sentimental without the high price.' },
      { q: 'What unique wedding gifts for Indian couples stand out?', a: 'Cultural and personalized gifts stand out at Indian weddings. A BoxTales story box for the couple\'s future children, or a Musical Photo Fridge Magnet of the wedding day, are both unexpected and deeply meaningful to an Indian family.' },
    ],
  },
  {
    slug: 'unique-gifts-for-newborn-baby',
    title: 'Unique Newborn Baby Gift Ideas India — Beyond Diapers & Onesies | UniqueIdeas.in',
    h1: 'Unique Gifts for Newborn Baby',
    description: 'Discover unique newborn baby gift ideas in India — beyond diapers and onesies. Screen-free story boxes and family keepsakes that grow with the child. From ₹899.',
    intro: 'Every new baby gets onesies and nappies. Give the family something that will matter when the child is old enough to remember it.',
    products: allProducts.filter(p => p.categories.includes('for-kids')),
    faq: [
      { q: 'What is a unique gift for a newborn baby in India?', a: 'The BoxTales Kids Kahaani Box is a perfect unique gift for a newborn — the parents can start the story library immediately, and when the child turns 3, they\'ll be ready to play. It\'s a gift that waits for the right time.' },
      { q: 'What unique baby shower gifts can I order online in India?', a: 'Screen-free storytelling devices like the BoxTales Kahaani Box are among the most unique and meaningful baby shower gifts in India. They support child development through audio storytelling without any screen time.' },
      { q: 'What unique gifts for newborn connect the family?', a: 'The BoxTales Nana/Nani Mode lets grandparents record lullabies and stories in their own voice, which play on the child\'s device. It\'s the most unique gifting experience for a newborn — a way to bottle the grandparent\'s voice forever.' },
    ],
  },
  {
    slug: 'unique-gifts-for-teacher',
    title: 'Unique Teacher Gift Ideas India — Gifts Teachers Actually Keep | UniqueIdeas.in',
    h1: 'Unique Gifts for Teacher',
    description: 'Find unique teacher gift ideas in India — thoughtful, personalized, and genuinely memorable. Go beyond mugs and pens with gifts teachers will actually keep and use.',
    intro: 'Teachers get enough pens and mugs. These unique gift ideas for teachers are the ones they\'ll actually talk about.',
    products: allProducts.filter(p => p.categories.includes('personalized')),
    faq: [
      { q: 'What is a unique gift for a teacher in India?', a: 'A Musical Photo Fridge Magnet with a class photo and a meaningful message is one of the most unique teacher gifts in India. It\'s personal, unexpected, and sits on their fridge as a reminder of their students every day.' },
      { q: 'What unique Teachers\' Day gifts can I order online in India?', a: 'Personalized keepsakes work brilliantly for Teachers\' Day — a Musical Photo Fridge Magnet with the class photo and a heartfelt custom message ships across India in 5–7 days and feels far more personal than generic gifts.' },
      { q: 'What are unique budget teacher gifts under ₹1000 in India?', a: 'The Musical Photo Fridge Magnet at ₹899 is an ideal budget teacher gift. It\'s fully personalized, affordable enough for a class to pool together, and meaningful enough that the teacher will actually keep it.' },
    ],
  },
];

export function getOccasionBySlug(slug: string): OccasionPage | undefined {
  return occasionPages.find((p) => p.slug === slug);
}

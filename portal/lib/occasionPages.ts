import { Product, products } from '@/data/products';

export interface OccasionPage {
  slug: string;
  /** ISO date (YYYY-MM-DD) of the last meaningful content change. Update when you edit the page; drives sitemap lastmod. */
  updated: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  products: Product[];
  faq: { q: string; a: string }[];
  /** Original editorial content: sections shown above the product list. */
  guide?: { heading: string; body: string[] }[];
  /** Brand-neutral gift ideas (experiences, handmade, etc.) with a reason each. */
  ideas?: { title: string; why: string }[];
  /** Slugs of related occasion pages for internal linking. */
  related?: string[];
  /** Further reading on sibling sites (editorial links). */
  reads?: { label: string; url: string }[];
}

const allProducts = products;

export const occasionPages: OccasionPage[] = [
  {
    slug: 'unique-gifts-for-birthday',
    updated: '2026-11-27',
    title: "Unique Birthday Gift Ideas India — Never Forgotten",
    h1: 'Unique Birthday Gift Ideas',
    description: "Unique birthday gift ideas in India: concepts for gifts that hold voices and memories, plus a practical guide to choosing well.",
    intro: 'Birthdays deserve something special — not another mug or scarf. Here are curated unique birthday gift ideas that actually surprise people.',
    products: allProducts,
    guide: [
      {
        heading: 'How to choose a birthday gift that lands',
        body: [
          'Start with the person, not the price tag. Ask what they complained about this year, what they bought for themselves recently, and what they keep postponing. A gift that solves a small annoyance or feeds a quiet interest almost always beats a generic "nice" present.',
          'Match effort to the relationship. For a close friend or partner, a gift with a visible story (a shared memory, an inside joke, a place you went together) matters more than cost. For a colleague or acquaintance, something useful and easy to enjoy is enough.',
          'Think in categories before products: something to do, something to keep, something to consume, or something to learn. Picking the category first stops you drifting back to the default mug or gift card.',
        ],
      },
      {
        heading: 'Birthday gifts by age and budget',
        body: [
          'Under ₹500: a handwritten letter with a small treat, a plant with a pot you painted, or a curated playlist printed on a card. Under ₹1,500: a personalised keepsake, a good book plus bookmark set, or a class voucher. Above ₹3,000: an experience such as a workshop, a staycation night or a hobby starter kit.',
          'For children, favour things that start an activity (art kits, story devices, building sets) over things that sit on a shelf. For teenagers, give choice: a voucher for something they already want beats a guess. For adults, consumables and experiences age better than objects.',
        ],
      },
    ],
    ideas: [
      { title: 'A memory-based keepsake', why: 'A photo, a song or a short message turns an ordinary object into something only the two of you understand.' },
      { title: 'A hands-on workshop', why: 'Pottery, baking, candle-making or a photography walk gives you a shared afternoon and a story afterwards.' },
      { title: 'A "year of" subscription', why: 'Books, coffee, plants or snacks arriving monthly make the birthday last twelve months.' },
      { title: 'A handwritten letter or recorded voice note', why: 'It costs nothing and is the thing people keep. Pair it with a small treat.' },
      { title: 'A surprise day plan', why: 'Plan their favourite food, a walk and a film, then hand it over as a printed itinerary.' },
      { title: 'A hobby starter kit', why: 'Watercolours, a mini terrarium or a beginner guitar book lowers the barrier to something they have wanted to try.' },
    ],
    related: ['unique-gifts-for-kids', 'personalized-gifts', 'unique-gifts-for-him', 'unique-gifts-for-her', 'unique-gifts-under-500'],
    reads: [
      { label: 'Birthday gifts online in India: unique ideas (CreateMyGift guide)', url: 'https://createmygift.in/blog/birthday-gifts-online-india-unique-ideas/' },
    ],
    faq: [
      { q: "What is a truly unique birthday gift?", a: "One that carries something only the giver could add: a voice, a shared memory, a promise for the future. Objects that hold a message tend to be remembered longer than objects bought off a shelf." },
      { q: "What can I give for a birthday besides a physical item?", a: "Time and attention: a planned day, a letter, a recorded message or a class they have wanted to try. Pairing a small object with a personal note is usually enough." },
      { q: "How early should I order a personalised birthday gift?", a: "Allow at least two weeks for anything made to order. Items that need recordings or photos from several people can take longer, so start the collection early." },
    ],
  },
  {
    slug: 'unique-gifts-for-kids',
    updated: '2026-11-27',
    title: "Unique Gifts for Kids in India — Screen-Free Ideas",
    h1: 'Unique Gifts for Kids',
    description: "Unique gifts for kids in India: screen-free, story-led ideas and a guide to picking by age, plus concepts we are building.",
    intro: 'The best gifts for kids aren\'t toys they forget by Tuesday — they\'re experiences that spark imagination. Here are unique gift ideas your child will actually love.',
    products: allProducts.filter(p => p.categories.includes('for-kids')),
    guide: [
      {
        heading: 'What makes a gift good for a child',
        body: [
          'The best kids gifts start an activity rather than fill a shelf. Look for something a child can do alone, with a friend, and with a parent. Open-ended play (building, drawing, pretend, stories) holds attention far longer than a toy with one trick.',
          'Match the gift to the stage, not just the age on the box. A three-year-old wants big, safe, sensory things. A six-year-old wants rules and small wins. An eight-year-old wants something they can show off or get good at.',
        ],
      },
      {
        heading: 'Gift ideas by age',
        body: [
          'Ages 2–4: chunky puzzles, picture books with sounds, stacking toys and role-play sets. Ages 5–7: story-based devices, craft kits, simple board games and building sets. Ages 8–10: science kits, strategy games, chapter books and anything that teaches a skill like drawing or coding basics.',
          'Always check small parts, battery safety and age labelling before buying, especially for children under three.',
        ],
      },
    ],
    ideas: [
      { title: 'Screen-free audio stories', why: 'Bedtime stories without a screen help children wind down and build listening and vocabulary skills.' },
      { title: 'A craft or science kit', why: 'Finished projects give a sense of achievement and something to show grandparents.' },
      { title: 'Board and card games for the whole family', why: 'Games teach turn-taking and give parents an easy way to join in.' },
      { title: 'A personalised storybook or name puzzle', why: 'Seeing their own name in the story makes reading feel special.' },
      { title: 'Outdoor play gear', why: 'Skipping ropes, kites and badminton sets get children moving without a lot of effort from adults.' },
      { title: 'A subscription to a children\'s magazine', why: 'Something arrives in their name every month, and it builds reading habits.' },
    ],
    related: ['unique-gifts-for-newborn-baby', 'unique-gifts-for-birthday', 'personalized-gifts', 'unique-gifts-for-teacher'],
    reads: [
      { label: 'Children\'s Day gifts in India (CreateMyGift guide)', url: 'https://createmygift.in/blog/childrens-day-gifts-2026-india/' },
    ],
    faq: [
      { q: "What are unique gifts for kids in India?", a: "Gifts that start an activity, such as story players, craft and science kits, and games, tend to be used longer than toys with one function. Look for open-ended play." },
      { q: "Are screen-free gifts better for children?", a: "Many parents prefer them, especially at bedtime. Audio stories, books and building toys let children use imagination without the stimulation of a screen." },
      { q: "How do I choose by age?", a: "Match the stage, not just the label: big, safe and sensory for toddlers; rules and small wins for ages five to seven; skills and collections from eight upward." },
    ],
  },
  {
    slug: 'personalized-gifts',
    updated: '2026-11-27',
    title: "Personalized Gift Ideas India — Unique & Meaningful",
    h1: 'Personalized Gift Ideas',
    description: "Personalised gift ideas in India: what makes a gift feel personal, practical ordering tips and new concepts we are developing.",
    intro: 'Personalized gifts say "I thought about you" in a way nothing else can. Here are ideas that combine customisation with quality.',
    products: allProducts.filter(p => p.categories.includes('personalized')),
    guide: [
      {
        heading: 'What actually makes a gift feel personal',
        body: [
          'Adding a name is the lowest level of personalisation. Gifts feel personal when they carry specific information only you would know: a date, a place, a nickname, a line from a conversation, a song from a particular summer.',
          'Choose one strong detail and let it carry the gift. A single well-chosen photo or line of text works better than several crowded elements.',
        ],
      },
      {
        heading: 'Practical tips before you order',
        body: [
          'Allow time: personalised items are made to order, so plan at least a week for production and delivery, and longer around festivals. Check the preview carefully for spelling, since most personalised products cannot be returned.',
          'Use a high-resolution photo, avoid heavy filters and check how the product crops the image. If a gift includes text, keep it short and easy to read at the size it will be displayed.',
        ],
      },
    ],
    ideas: [
      { title: 'Photo keepsakes', why: 'Photo frames, magnets and prints suit almost every relationship and fit any budget.' },
      { title: 'Engraved items', why: 'Pens, wallets or wooden boards with a short engraved line are durable and look premium.' },
      { title: 'Custom illustrations', why: 'A portrait or a map of a meaningful place is more original than anything off a shelf.' },
      { title: 'Personalised stationery', why: 'Notebooks and planners with a name or a message are practical and used daily.' },
      { title: 'A recorded message or song gift', why: 'Sound carries emotion that text cannot, which makes it good for distance and milestones.' },
      { title: 'Name-based art for kids\' rooms', why: 'It makes the room feel like theirs and often becomes a long-term keepsake.' },
    ],
    related: ['unique-gifts-for-birthday', 'unique-anniversary-gifts', 'unique-gifts-for-girlfriend', 'unique-wedding-gifts', 'unique-gifts-under-500'],
    reads: [
      { label: 'Personalised photo frame gift ideas (CreateMyGift guide)', url: 'https://createmygift.in/blog/personalized-photo-frame-gift-ideas/' },
      { label: 'Personalised couple gifts in India (CreateMyGift guide)', url: 'https://createmygift.in/blog/personalized-couple-gifts-india/' },
    ],
    faq: [
      { q: "What makes a gift feel personalised?", a: "Specific detail that only you would know: a date, a place, a nickname, a voice. A name alone is the lowest level of personalisation." },
      { q: "How long do personalised gifts usually take?", a: "Made-to-order items commonly take a week or more to produce and deliver, and longer around festivals. Order early and check proofs carefully." },
      { q: "Which personalised gifts last longest?", a: "Items that hold a voice or a photo and sit in a visible place, like a frame or a box, tend to stay in use. Throwaway items get put away." },
    ],
  },
  {
    slug: 'unique-anniversary-gifts',
    updated: '2026-11-27',
    title: "Unique Anniversary Gift Ideas India — Gifts That Mean More",
    h1: 'Unique Anniversary Gift Ideas',
    description: "Unique anniversary gift ideas in India: guides by relationship stage and new concepts like sealed voice letters. Ideas for every year together.",
    intro: 'Anniversary gifts should feel like the relationship — personal, warm, and full of meaning. Skip the flowers. Here are unique anniversary gift ideas that last.',
    products: allProducts,
    guide: [
      { heading: "How to pick an anniversary gift that means something", body: ["Anniversary gifts work best when they point backwards and forwards: a nod to something you have shared, and a hint of what you want to do next. A framed first-date ticket with a booking for a new place does both.", "Match the year to the gesture if you like traditions (paper for year one, cotton for year two), but do not feel bound by them. What the other person will remember is the thought behind the item, not the material."] },
      { heading: "Anniversary gifts by stage", body: ["Early years: playful and personal, such as a scrapbook of your first year, a photo calendar or a surprise dinner at the place you met. Middle years: shared experiences, such as a weekend away, a couples workshop or a restored old photograph. Long marriages: reflection, such as a letter about what you have learnt from each other or a family tree print."] },
    ],
    ideas: [
      { title: "A dated memory box", why: "Fill it with tickets, notes and small objects from the year. It gets better every anniversary you add to it." },
      { title: "A planned surprise day", why: "Give a printed itinerary for a day built around things only the two of you would pick." },
      { title: "A letter written to open in a year", why: "It becomes a gift for your future selves and is easy to repeat annually." },
      { title: "A couple's class or workshop", why: "Cooking, dance or pottery gives you a new shared skill and a story." },
      { title: "A framed star map or city map of a special date", why: "It captures a moment visually and looks good on a wall." },
      { title: "A restored or printed photo album", why: "Old photographs rarely get printed. A proper album makes them visible again." },
    ],
    related: ["unique-gifts-for-wife", "unique-gifts-for-girlfriend", "personalized-gifts", "unique-wedding-gifts", "unique-gifts-for-parents"],
    reads: [
      { label: "Personalised anniversary gifts for wife in India (CreateMyGift guide)", url: "https://createmygift.in/blog/personalized-anniversary-gifts-for-wife-india/" },
      { label: "Anniversary gifts for her in India (CreateMyGift guide)", url: "https://createmygift.in/blog/anniversary-gifts-for-her-india/" },
    ],
    faq: [
      { q: "What is a unique anniversary gift?", a: "Something that refers to your own story rather than a generic romantic theme: a dated memory, a recorded message or a planned day built around shared places." },
      { q: "What anniversary gifts suit a long marriage?", a: "Reflective ones: a letter on what you have learnt from each other, a restored family photograph or a trip to a place from earlier years." },
      { q: "Is it better to give an experience or an object?", a: "Both work. An experience gives a shared memory. An object gives something to see daily. Combining a small object with a planned outing often does both." },
    ],
  },
  {
    slug: 'unique-gifts-for-him',
    updated: '2026-11-27',
    title: "Unique Gifts for Him India — Unusual Ideas for Men",
    h1: 'Unique Gifts for Him',
    description: "Unique gifts for him in India: how to choose for different personalities, plus concepts for voice-based keepsakes. Picks for every budget.",
    intro: 'Men are notoriously hard to shop for. These unique gift ideas for him go beyond the usual wallet-and-watch routine.',
    products: allProducts,
    guide: [
      { heading: "Choosing a gift for him without defaulting to a wallet", body: ["Start with what he does when nobody is asking him to do anything: his hobbies, his weekend routine, what he reads or watches. A gift that supports that habit is almost always better than something generic.", "Many men say they want nothing. In practice that usually means they do not want clutter. Consumables, experiences and tools for an existing interest land better than decorative objects."] },
      { heading: "Gifts for him by personality", body: ["Practical: a quality bag, a good travel organiser or a tool he has been postponing buying. Sentimental: a photo keepsake, a handwritten letter or a framed memory. Adventurous: a trek booking, a camping setup or a class in something new. Homebody: a nice mug and coffee set, a book he mentioned or a board game for evenings."] },
    ],
    ideas: [
      { title: "A hobby upgrade", why: "Replace the worn-out basic version of something he already uses: headphones, a notebook, a bat or a chess set." },
      { title: "An experience for two", why: "A go-karting session, a food trail or a day trip is often remembered longer than an object." },
      { title: "A premium grooming or coffee kit", why: "Consumables he enjoys but would not buy himself are reliably appreciated." },
      { title: "A memory keepsake", why: "A photo with a short message, framed or built into an object, suits men who prefer understated sentiment." },
      { title: "A well-chosen book with a note inside", why: "Write why you picked it. The note is what makes it a gift." },
      { title: "A tech accessory he actually needs", why: "A power bank, a laptop stand or a good cable organiser: boring and useful wins." },
    ],
    related: ["unique-gifts-for-birthday", "unique-gifts-for-her", "unique-anniversary-gifts", "unique-gifts-for-parents", "unique-gifts-under-500"],
    reads: [
      { label: "Birthday gifts for men in India (CreateMyGift guide)", url: "https://createmygift.in/blog/birthday-gifts-for-men-india/" },
      { label: "Gifts for husband, boyfriend and brother (CreateMyGift guide)", url: "https://createmygift.in/blog/birthday-gifts-for-him-boyfriend-husband-india/" },
    ],
    faq: [
      { q: "What do you give a man who says he wants nothing?", a: "Usually he means he does not want clutter. Consumables, experiences and upgrades to something he already uses tend to land best." },
      { q: "What are good gifts for him besides a wallet or watch?", a: "A hobby upgrade, a shared experience, a quality grooming or coffee kit, or a keepsake with a personal message." },
      { q: "How can I make a simple gift feel personal?", a: "Add a note that names a specific memory or reason. A short handwritten line changes how the gift is received." },
    ],
  },
  {
    slug: 'unique-gifts-for-her',
    updated: '2026-11-27',
    title: "Unique Gifts for Her India — Thoughtful Ideas for Women",
    h1: 'Unique Gifts for Her',
    description: "Unique gifts for her in India: thoughtful ideas by relationship and budget, and concepts that carry your voice. Picks for every budget.",
    intro: 'The best gifts for her are the ones that feel like you really listened. Here are unique gift ideas for women that go beyond flowers and spa vouchers.',
    products: allProducts,
    guide: [
      { heading: "Choosing a gift for her that feels considered", body: ["Skip the assumption that she wants jewellery or flowers. Think about what she has mentioned in passing: a place she wants to visit, a hobby she has dropped, something she keeps meaning to buy for herself.", "Presentation counts. A simple gift that arrives wrapped well with a handwritten note feels more thoughtful than an expensive one handed over in a bag."] },
      { heading: "Ideas by relationship and budget", body: ["For a close friend: shared experiences such as a spa session, a book and tea set or a framed photo from a trip. For a partner: something personal such as a keepsake with a song or a dated photo. For a colleague: something small and useful like a good planner or a plant. Budget tip: most of the value comes from the specific detail, so a low-cost gift with one precise detail beats an expensive generic one."] },
    ],
    ideas: [
      { title: "A self-care kit built around her habits", why: "Her actual tea, skincare or candle brand, not a generic hamper." },
      { title: "A plant with a hand-painted pot", why: "Low cost, long-lived and easy to personalise." },
      { title: "A book plus a handwritten note", why: "Pick one that connects to a conversation you had." },
      { title: "A class she has talked about", why: "Pottery, dance, baking or calligraphy gives her time for herself." },
      { title: "A photo keepsake", why: "A framed picture or musical keepsake with a message about why the memory matters." },
      { title: "A planner or journal she will use", why: "Choose a format that matches how she works rather than a pretty one that stays in a drawer." },
    ],
    related: ["unique-gifts-for-him", "unique-gifts-for-girlfriend", "unique-gifts-for-wife", "unique-gifts-for-birthday", "personalized-gifts"],
    reads: [
      { label: "Birthday gifts for girls and women in India (CreateMyGift guide)", url: "https://createmygift.in/blog/birthday-gifts-for-girls-women-india/" },
    ],
    faq: [
      { q: "What is a thoughtful gift for her?", a: "One based on something she has mentioned: a place, a hobby, an item she keeps postponing. Attention matters more than price." },
      { q: "Are flowers and jewellery still good gifts?", a: "They can be, but they are expected. A gift tied to something specific about her usually feels more considered." },
      { q: "How do I choose by relationship?", a: "Close friend: shared experiences or keepsakes. Partner: something personal and dated. Colleague: small and useful, like a plant or planner." },
    ],
  },
  {
    slug: 'unique-gifts-under-500',
    updated: '2026-11-27',
    title: "Unique Gifts Under ₹500 India — Thoughtful Ideas",
    h1: 'Unique Gifts Under ₹500',
    description: "Unique gifts under ₹500 in India: ideas and tips for making a small gift feel special. Gift-wrapping, personal notes and where to shop.",
    intro: 'Budget doesn\'t have to mean boring. These unique gift ideas under ₹500 punch well above their price tag.',
    products: allProducts.filter(p => p.categories.includes('under-1000')),
    guide: [
      { heading: "How to make a ₹500 gift feel special", body: ["At this budget the detail does the work. Choose one thing that is clearly for them, such as their favourite snack, their favourite colour or a reference to a shared joke, and present it with care.", "Pair a small item with a handwritten note. The note costs nothing and is usually what people keep."] },
      { heading: "Where ₹500 goes furthest", body: ["Good value categories: books and stationery, plants and pots, handmade or locally made items, snack and tea boxes, small personalised cards and prints. Poor value: anything that looks premium but is thin, such as cheap electronics or unbranded gadgets that fail quickly."] },
    ],
    ideas: [
      { title: "A paperback plus a handwritten bookmark", why: "Choose a title you can explain in two lines inside the cover." },
      { title: "A small plant in a decorated pot", why: "Succulents and money plants are low maintenance and cheap." },
      { title: "A tea or snack sampler", why: "Pick regional specialities they cannot easily get where they live." },
      { title: "A personalised card or printed photo", why: "A good print in a simple frame is still under budget." },
      { title: "A DIY jar of notes", why: "Fill a jar with reasons you appreciate them, one per slip." },
      { title: "A set of quality stationery", why: "A good pen and a small notebook work for students and professionals alike." },
    ],
    related: ["unique-gifts-for-birthday", "personalized-gifts", "unique-gifts-for-teacher", "unique-gifts-for-kids", "unique-gifts-for-her"],
    reads: [
      { label: "Personalised gifts under ₹500 (CreateMyGift guide)", url: "https://createmygift.in/blog/gifts-under-500-rupees-affordable-personalized/" },
    ],
    faq: [
      { q: "What is a good gift under ₹500?", a: "A book with a handwritten note, a plant in a decorated pot, a tea or snack sampler or a personalised card. One specific detail does most of the work." },
      { q: "How can I make a cheap gift feel personal?", a: "Add something only you could write: a memory, an inside joke or a reason you appreciate them. Presentation also counts." },
      { q: "What should I avoid at this budget?", a: "Thin items that look premium, such as cheap electronics, tend to disappoint. Pick simple things done well." },
    ],
  },
  {
    slug: 'unique-gifts-for-wife',
    updated: '2026-11-27',
    title: "Unique Gifts for Wife India — Something Special",
    h1: 'Unique Gifts for Wife',
    description: "Unique gifts for wife in India: ideas that show attention, by occasion, plus voice-letter concepts. Includes budget and splurge picks.",
    intro: 'The best gift for your wife isn\'t the most expensive one — it\'s the most personal. These unique gift ideas for wives are built around meaning, not price.',
    products: allProducts,
    guide: [
      { heading: "What a wife usually values in a gift", body: ["Many people say they want effort, not expense. A gift that shows you noticed something specific, such as a book she mentioned or a place she wants to see, matters more than cost.", "Also think about time. A gift that gives her an evening off, a morning to herself or a planned outing often beats an object."] },
      { heading: "Gift ideas by occasion", body: ["Birthday: something about her, not the household. Anniversary: something about the two of you, such as a dated photo or a letter. Just-because: small, frequent gestures like her favourite sweet or a note in her bag. Milestone years: a larger shared experience, such as a trip or a restored family photograph."] },
    ],
    ideas: [
      { title: "A day with no responsibilities", why: "Take care of the household for a day and hand over a simple plan for her time." },
      { title: "A keepsake from your story", why: "A photo, a song or a date turned into an object she can see every day." },
      { title: "A trip she has mentioned", why: "Even a short weekend away counts if it is the place she picked." },
      { title: "A handwritten letter", why: "Write specific memories and what you appreciate. It will be re-read." },
      { title: "A hobby kit", why: "Something that supports her interest rather than your idea of one." },
      { title: "A fresh take on her usual things", why: "Her favourite perfume or skincare brand in a gift set, rather than a new brand you guess at." },
    ],
    related: ["unique-anniversary-gifts", "unique-gifts-for-her", "unique-gifts-for-girlfriend", "personalized-gifts", "unique-gifts-for-birthday"],
    reads: [
      { label: "Best birthday gift for wife in India (CreateMyGift guide)", url: "https://createmygift.in/blog/best-birthday-gift-for-wife-india/" },
      { label: "Personalised anniversary gifts for wife (CreateMyGift guide)", url: "https://createmygift.in/blog/personalized-anniversary-gifts-for-wife-india/" },
    ],
    faq: [
      { q: "What does a wife usually value in a gift?", a: "Attention and effort. A gift that shows you noticed something specific, or gives her time, usually matters more than the price." },
      { q: "What is a good gift besides jewellery?", a: "A day with no responsibilities, a trip she has mentioned, a hobby kit or a handwritten letter with specific memories." },
      { q: "How can I make an anniversary gift different from a birthday one?", a: "Birthday gifts should be about her. Anniversary gifts should be about the two of you, such as a dated memory or a letter." },
    ],
  },
  {
    slug: 'unique-gifts-for-girlfriend',
    updated: '2026-11-27',
    title: "Unique Gifts for Girlfriend India — She'll Love",
    h1: 'Unique Gifts for Girlfriend',
    description: "Unique gifts for girlfriend in India: ideas by relationship stage and concepts for long-distance couples. Includes budget and splurge picks.",
    intro: 'Generic gifts send a generic message. These unique gift ideas for your girlfriend say "I actually paid attention."',
    products: allProducts.filter(p => p.categories.includes('personalized')),
    guide: [
      { heading: "Choosing a gift for a girlfriend", body: ["Early in a relationship, choose gifts that are thoughtful but not heavy. Something that shows you listened is better than something expensive that creates pressure.", "As the relationship grows, gifts can become more personal: shared memories, inside jokes and plans for things you will do together."] },
      { heading: "Ideas by stage", body: ["First months: a book she mentioned, a playlist with a note, her favourite snack. One year: a dated photo, a small scrapbook or a trip to a place that matters to both of you. Long distance: a package of small items to open on set days, a recorded message or a shared playlist."] },
    ],
    ideas: [
      { title: "A playlist of your story", why: "Present it as a printed tracklist with a note on why each song is there." },
      { title: "A mini scrapbook", why: "Tickets, photographs and captions from your first months." },
      { title: "A surprise date", why: "Plan something around a place or food she likes and give her a card to announce it." },
      { title: "A handwritten letter", why: "Name specific moments. Specificity is what makes it feel real." },
      { title: "A small, useful gift", why: "A good notebook, a nice tote or a skincare item from a brand she already uses." },
      { title: "A long-distance care package", why: "Several small wrapped items to open on different days." },
    ],
    related: ["unique-gifts-for-her", "unique-anniversary-gifts", "personalized-gifts", "unique-gifts-for-birthday", "unique-gifts-under-500"],
    reads: [
      { label: "Best gifts for girlfriend in India (CreateMyGift guide)", url: "https://createmygift.in/blog/best-gifts-for-girlfriend-india/" },
    ],
    faq: [
      { q: "What is a unique gift for a girlfriend?", a: "One that shows you listened: a book she mentioned, a playlist with a note, or a planned date built around something she loves." },
      { q: "What should I give in a long-distance relationship?", a: "Small items she can open on set days, a recorded message or a shared playlist. Things that carry your voice are especially useful." },
      { q: "How expensive should the gift be?", a: "Early on, thoughtful beats expensive. A costly gift can create pressure, while a specific one shows attention." },
    ],
  },
  {
    slug: 'unique-gifts-for-parents',
    updated: '2026-11-27',
    title: "Unique Gifts for Parents India — Treasured Forever",
    h1: 'Unique Gifts for Parents',
    description: "Unique gifts for parents in India: ideas that show attention, plus concepts for simple, voice-based keepsakes. Easy to use and made to last.",
    intro: 'Parents have everything they need. What they don\'t have is more time. These unique gift ideas for parents capture moments they\'ll treasure.',
    products: allProducts,
    guide: [
      { heading: "What parents appreciate", body: ["Parents often say they need nothing, but they respond strongly to attention. Gifts that save them effort, bring family together or show they are remembered tend to land best.", "Consider comfort and health too: a good pillow, a massager or a health check-up package are practical ways to show care."] },
      { heading: "Gifts for mothers and fathers", body: ["For mothers: something for her, not the household, such as a spa voucher, a favourite saree box or a photo of her with the grandchildren. For fathers: something for his hobby, a comfortable pair of shoes or a framed family picture. For both: a family photo album, a trip they have wanted or a recorded video of the family wishing them."] },
    ],
    ideas: [
      { title: "A family video message", why: "Collect short clips from relatives and edit them into one video." },
      { title: "A printed family photo album", why: "Parents keep albums and show them to visitors for years." },
      { title: "A comfort upgrade", why: "Better bedding, a good chair or a quality pair of walking shoes." },
      { title: "A health check-up package", why: "Practical and caring, especially for parents past fifty." },
      { title: "A weekend trip together", why: "Time with you is often the gift they value most." },
      { title: "Their favourite food, delivered", why: "A thali from their favourite restaurant or a hamper of regional sweets." },
    ],
    related: ["unique-gifts-for-grandparents", "unique-anniversary-gifts", "personalized-gifts", "unique-gifts-for-birthday", "unique-gifts-for-him"],
    reads: [
      { label: "Anniversary gifts for parents in India (CreateMyGift guide)", url: "https://createmygift.in/blog/anniversary-gifts-for-parents-india/" },
      { label: "Personalised gifts for mom (CreateMyGift guide)", url: "https://createmygift.in/blog/personalized-gifts-for-mom-birthday-ideas/" },
      { label: "Birthday gifts for dad in India (CreateMyGift guide)", url: "https://createmygift.in/blog/birthday-gifts-for-dad-india/" },
    ],
    faq: [
      { q: "What do parents who say they need nothing really want?", a: "Usually attention and time. Gifts that save them effort, bring the family together or show they are remembered tend to land best." },
      { q: "What practical gifts suit parents?", a: "Comfort items, a health check-up package, better bedding or comfortable shoes show care in a useful way." },
      { q: "How can I make a gift feel personal for parents?", a: "Collect family messages, print an album, or record the family wishing them. Something that gathers people is often more valued than an object." },
    ],
  },
  {
    slug: 'unique-gifts-for-grandparents',
    updated: '2026-11-27',
    title: "Unique Gifts for Grandparents India — Easy to Use",
    h1: 'Unique Gifts for Grandparents',
    description: "Unique gifts for grandparents in India: easy-to-use ideas and concepts that preserve their stories. Written with comfort and simplicity in mind.",
    intro: 'The best gifts for grandparents connect them to family. These unique gift ideas for grandparents close the distance, even when they\'re far away.',
    products: allProducts,
    guide: [
      { heading: "Gifts that work for grandparents", body: ["Prioritise comfort, simplicity and connection. Many grandparents value photographs and time with grandchildren above objects.", "Avoid anything with complicated setup or tiny text. If it involves technology, include a short printed instruction card or offer to set it up in person."] },
      { heading: "Ideas that suit older relatives", body: ["Large-print books, a good reading lamp, a digital photo frame loaded with family pictures, comfortable slippers, a pill organiser or a framed family tree. Experiences matter too: a family lunch, a visit from the grandchildren or a recorded story session where they share memories on video."] },
    ],
    ideas: [
      { title: "A photo frame loaded with family pictures", why: "Set it up before giving it so it works immediately." },
      { title: "A recorded story session", why: "Ask them to tell stories about their childhood and keep the recordings." },
      { title: "A family tree print", why: "A framed tree with names and photographs becomes a talking point." },
      { title: "Comfort items", why: "Slippers, a soft shawl or a good cushion for the chair they use most." },
      { title: "A large-print or audio book", why: "Choose what suits their eyesight and interests." },
      { title: "A regular call or visit scheduled", why: "A recurring plan can be the most appreciated gift." },
    ],
    related: ["unique-gifts-for-parents", "unique-gifts-for-kids", "personalized-gifts", "unique-anniversary-gifts", "unique-diwali-gifts"],
    faq: [
      { q: "What should I avoid when buying for grandparents?", a: "Anything complicated to set up or with tiny text. If it involves technology, include simple instructions or set it up in person." },
      { q: "What do grandparents value most?", a: "Connection: photographs, calls and time with grandchildren. Gifts that keep those close tend to be used." },
      { q: "How can I preserve a grandparent's stories?", a: "Record them telling stories, ask short questions and keep the audio safe. Printing a few as cards or an album makes them easy to share." },
    ],
  },
  {
    slug: 'unique-diwali-gifts',
    updated: '2026-11-27',
    title: "Unique Diwali Gift Ideas India — Beyond Sweets",
    h1: 'Unique Diwali Gift Ideas 2026',
    description: "Unique Diwali gift ideas in India: ideas beyond sweets, and a planning guide for family, friends and colleagues. Budgets included.",
    intro: 'Diwali deserves more than another dry fruit box. These unique Diwali gift ideas for 2026 will actually be remembered.',
    products: allProducts,
    guide: [
      { heading: "Moving beyond the mithai box", body: ["Diwali gifting in India is crowded with sweets and dry fruit. To stand out, choose something that reflects the person, such as a handmade diya set, a photo keepsake or a book they will read through the holidays.", "For clients and colleagues, keep it tasteful and not too personal: quality dry fruits, a reusable item or a small plant. For family, add a handwritten note."] },
      { heading: "Planning your Diwali gifts", body: ["Order early. Delivery slots fill up in the weeks before the festival, and personalised items take longer. Set a budget per group (family, friends, colleagues, service staff) before you start so you do not overspend. Keep a list of what you gave last year so you do not repeat yourself. This guide is evergreen: bookmark it for next year if you are reading after the festival."] },
    ],
    ideas: [
      { title: "Handmade or locally made diyas", why: "They support small artisans and make good table decorations." },
      { title: "A dry fruit box in reusable packaging", why: "A step up from a standard mithai box and lasts longer." },
      { title: "A photo keepsake from a past Diwali", why: "A reminder of an earlier celebration with the family." },
      { title: "A potted plant for the home", why: "A tulsi or a money plant is a traditional and long-lasting gift." },
      { title: "A book or board game for the holidays", why: "Good for families who gather for several days." },
      { title: "A thank-you gift for service staff", why: "Cash or useful items acknowledge those who work through the festival." },
    ],
    related: ["unique-gifts-for-parents", "unique-gifts-under-500", "personalized-gifts", "unique-wedding-gifts", "unique-rakhi-gifts"],
    reads: [
      { label: "Best Diwali gifts: personalised ideas (CreateMyGift guide)", url: "https://createmygift.in/blog/best-diwali-gifts-2026-personalized-india/" },
    ],
    faq: [
      { q: "What is a good Diwali gift besides sweets or dry fruit?", a: "Handmade diyas, a plant, a book for the holidays or a keepsake with a personal note. Matching the gift to the person helps it stand out." },
      { q: "When should I order Diwali gifts?", a: "Several weeks ahead. Delivery slots fill up near the festival, and made-to-order items take longer." },
      { q: "How should I handle gifts for colleagues and clients?", a: "Keep them tasteful and not too personal: quality dry fruit, a reusable item or a small plant, with a short note." },
    ],
  },
  {
    slug: 'unique-rakhi-gifts',
    updated: '2026-11-27',
    title: "Unique Rakhi Gift Ideas India — Brother & Sister",
    h1: 'Unique Rakhi Gift Ideas',
    description: "Unique Rakhi gift ideas in India: gifts that reference your shared history, and a concept for a rakhi that plays a message.",
    intro: 'Rakhi is about the bond, not the box. These unique Rakhi gift ideas let that bond do the talking.',
    products: allProducts,
    guide: [
      { heading: "Rakhi gifts that go beyond sweets and a thali", body: ["Rakhi is about the sibling bond, so the best gifts reference shared history: a childhood photograph, an inside joke or a memory from growing up.", "Plan around delivery. If your brother or sister lives in another city or country, order early and track the shipment, and send a message the same day so it arrives with context."] },
      { heading: "Gifts from sisters and gifts from brothers", body: ["From sisters to brothers: a keepsake, a grooming kit or a book he will read. From brothers to sisters: something she would not buy herself, a day out she has been postponing or support for a hobby. For siblings abroad: a package of local sweets plus a video message."] },
    ],
    ideas: [
      { title: "A childhood photo, framed", why: "Choose one with both of you in it and write the year on the back." },
      { title: "A grooming or self-care kit", why: "Useful and easy to personalise by choosing their actual brands." },
      { title: "A shared experience", why: "Plan a meal or a trip once Rakhi is over." },
      { title: "A letter on what they mean to you", why: "Siblings rarely say this out loud, so writing it is a strong gift." },
      { title: "A hobby gift", why: "Support something they care about, such as a sketch set or a cricket accessory." },
      { title: "A video message for siblings abroad", why: "Gather relatives for a short clip and send it with the Rakhi." },
    ],
    related: ["unique-gifts-for-birthday", "unique-gifts-for-him", "unique-gifts-for-her", "personalized-gifts", "unique-diwali-gifts"],
    reads: [
      { label: "Raksha Bandhan gift ideas for sister and brother (CreateMyGift guide)", url: "https://createmygift.in/blog/raksha-bandhan-gift-ideas-for-sister-brother/" },
      { label: "Best gifts for brother in India (CreateMyGift guide)", url: "https://createmygift.in/blog/best-gifts-for-brother-india/" },
    ],
    faq: [
      { q: "What is a unique Rakhi gift for a brother?", a: "One tied to your shared history: a childhood photo, a letter or a hobby upgrade. Specific beats generic." },
      { q: "What can I send to a sibling abroad?", a: "A package of local sweets plus a video or voice message. Order early and track the shipment so it arrives in time." },
      { q: "What should I give my sister for Rakhi?", a: "Something she would not buy herself, such as a class she has been postponing, a keepsake or a day out." },
    ],
  },
  {
    slug: 'unique-wedding-gifts',
    updated: '2026-11-27',
    title: "Unique Wedding Gift Ideas India — Couples Keep",
    h1: 'Unique Wedding Gift Ideas',
    description: "Unique wedding gift ideas in India: gifts couples keep, by budget, plus a concept that holds every guest's blessing. Ideas for family, friends and colleagues.",
    intro: 'The couple will return three toasters. Give them something they\'ll keep. These unique wedding gift ideas are built to last.',
    products: allProducts,
    guide: [
      { heading: "Giving a wedding gift people keep", body: ["Most couples receive several of the same appliances. Think about what they will use in their first year or what will still mean something in ten.", "Consider your relationship with the family and the style of the wedding. A gift can be quiet and personal, or generous and practical, depending on how close you are."] },
      { heading: "Wedding gifts by budget", body: ["Up to ₹1,000: a framed picture, a handwritten letter in a nice card or a plant for the new home. ₹1,000–₹5,000: a good set of cookware, a photo book from the wedding or a hamper for the couple's first morning. Higher budgets: an experience such as a weekend away, or a contribution to something they are saving for. Cash gifts are normal in India, so a thoughtful card alongside is a good way to personalise it."] },
    ],
    ideas: [
      { title: "A wedding photo book", why: "Collect pictures from guests and print them as an album." },
      { title: "A dated map or star print", why: "Captures the date and place in a form that looks good on a wall." },
      { title: "A contribution to their honeymoon or home", why: "Practical and easy to personalise with a card." },
      { title: "A hamper for the first morning", why: "Tea, snacks and a note: small and thoughtful." },
      { title: "Good cookware or kitchen tools", why: "Choose a quality piece rather than a full set they may not need." },
      { title: "A handwritten letter of advice", why: "Relatives and mentors often write the gift that is remembered longest." },
    ],
    related: ["unique-anniversary-gifts", "personalized-gifts", "unique-gifts-for-parents", "unique-gifts-under-500", "unique-diwali-gifts"],
    reads: [
      { label: "Personalised wedding gifts in India (CreateMyGift guide)", url: "https://createmygift.in/blog/personalised-wedding-gifts-india-2026/" },
    ],
    faq: [
      { q: "What is a unique wedding gift in India?", a: "Something personal that the couple will keep: a photo book, a map or star print of the date, or a gift that collects blessings from guests." },
      { q: "How much should I spend on a wedding gift?", a: "It depends on your relationship and the wedding. A thoughtful card with a personal gift can matter as much as a larger budget." },
      { q: "Is cash an acceptable wedding gift?", a: "Yes, it is common in India. A handwritten card alongside makes it feel personal." },
    ],
  },
  {
    slug: 'unique-gifts-for-newborn-baby',
    updated: '2026-11-27',
    title: "Unique Newborn Baby Gift Ideas India — Beyond Onesies",
    h1: 'Unique Gifts for Newborn Baby',
    description: "Unique newborn baby gift ideas in India: gifts for the baby and the parents, plus keepsake concepts for the first year. Practical picks and sentimental ones.",
    intro: 'Every new baby gets onesies and nappies. Give the family something that will matter when the child is old enough to remember it.',
    products: allProducts.filter(p => p.categories.includes('for-kids')),
    guide: [
      { heading: "Gifts for a newborn and their parents", body: ["Newborns outgrow most things within weeks, so think about what helps the parents or marks the moment. A hand-knit blanket, a milestone card set or a framed first photograph all hold value.", "Safety first: avoid small parts, loose items in the crib and heavily scented products. Choose soft, washable and breathable fabrics."] },
      { heading: "What new parents actually appreciate", body: ["Practical help is often the best gift: a few cooked meals, a laundry service or a voucher for a house-help day. Items for the baby's first year work well too: size 3–6 month clothing so it fits later, a baby book to record milestones, or a soft toy that suits a newborn."] },
    ],
    ideas: [
      { title: "A milestone card set", why: "Parents photograph the baby each month and the cards make a lasting record." },
      { title: "Clothing a size or two ahead", why: "Newborn sizes are outgrown quickly, so buy for 3–6 months." },
      { title: "A cooked-meal delivery for the parents", why: "Thoughtful and useful in the first weeks." },
      { title: "A hand-knit or soft blanket", why: "Choose breathable cotton or wool depending on the climate." },
      { title: "A baby memory book", why: "A place to record the first year." },
      { title: "A framed first-week photograph", why: "A professional or home photo, printed well, is a lasting keepsake." },
    ],
    related: ["unique-gifts-for-kids", "unique-gifts-for-parents", "unique-gifts-for-grandparents", "personalized-gifts", "unique-gifts-for-birthday"],
    faq: [
      { q: "What is a good gift for a newborn?", a: "Something that marks the moment or helps the parents: a milestone card set, soft washable clothing a size ahead, or cooked meals for the first weeks." },
      { q: "What should I avoid for a newborn?", a: "Small parts, loose items in the crib and heavily scented products. Choose soft, breathable and washable fabrics." },
      { q: "What do new parents really need?", a: "Rest and help. Meals, laundry help or a voucher for a house-help day are often appreciated as much as items." },
    ],
  },
  {
    slug: 'unique-gifts-for-teacher',
    updated: '2026-11-27',
    title: "Unique Teacher Gift Ideas India — Ones They Keep",
    h1: 'Unique Gifts for Teacher',
    description: "Unique teacher gift ideas in India: gifts teachers keep and a concept that gathers every student's voice. Ideas for every budget and every school year.",
    intro: 'Teachers get enough pens and mugs. These unique gift ideas for teachers are the ones they\'ll actually talk about.',
    products: allProducts.filter(p => p.categories.includes('personalized')),
    guide: [
      { heading: "Choosing a gift for a teacher", body: ["Teachers often receive many mugs and pens. A gift that stands out is personal and small: a handwritten thank-you from the student, a plant for the classroom or a book they can use.", "Check school rules, since some institutions limit gift value or accept only group gifts. A note from the student is welcome everywhere."] },
      { heading: "Teachers' Day and end-of-year ideas", body: ["From students: a letter listing what you learnt, a hand-drawn card or a flower. From parents: a class-wide group gift, a gift card for a bookstore or a hamper of stationery. For retiring teachers: a photo album from past students or a framed collage of messages."] },
    ],
    ideas: [
      { title: "A handwritten thank-you from the student", why: "Often the gift teachers remember longest." },
      { title: "A class gift with messages from every student", why: "Pool contributions and add a page of notes." },
      { title: "A plant for the classroom or desk", why: "Low cost and long-lived." },
      { title: "A good-quality notebook or planner", why: "Practical for lesson planning." },
      { title: "A bookstore voucher", why: "Lets teachers choose books for themselves or their classroom." },
      { title: "A framed collage of student messages", why: "Particularly meaningful for retiring teachers." },
    ],
    related: ["unique-gifts-under-500", "personalized-gifts", "unique-gifts-for-kids", "unique-gifts-for-birthday", "unique-gifts-for-parents"],
    faq: [
      { q: "What is a good gift for a teacher?", a: "A handwritten thank-you from the student, a plant or a book. Teachers often remember personal notes longer than objects." },
      { q: "Are group gifts better than individual ones?", a: "Often yes. A class gift with a message from each student is memorable and avoids duplicates. Check school rules on gift value." },
      { q: "What should a retiring teacher receive?", a: "A photo album or collage of messages from former students usually means more than any object." },
    ],
  },
];

export function getOccasionBySlug(slug: string): OccasionPage | undefined {
  return occasionPages.find((p) => p.slug === slug);
}

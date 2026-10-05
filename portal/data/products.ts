export type Brand = 'createmygift' | 'boxtales';

export interface Product {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  price: string;
  originalPrice?: string;
  categories: string[];
  brand: Brand;
  url: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: 'musical-photo-fridge-magnet',
    title: 'Musical Photo Fridge Magnet',
    tagline: 'Your photo, your song — a keepsake that plays.',
    description:
      'A personalized magnetic keepsake with a built-in speaker that plays your chosen song. Add your photo, a heartfelt message, and a Spotify QR code so anyone can scan and stream the memory.',
    image: '/images/musical-fridge-magnet.png',
    price: '₹899',
    originalPrice: '₹1,199',
    categories: ['personalized', 'trending', 'under-1000'],
    brand: 'createmygift',
    url: 'https://createmygift.in/musical-photo-fridge-magnet/',
    badge: 'Bestseller',
  },
  {
    id: 'boxtales-kids',
    title: 'BoxTales Kids — The Kahaani Box',
    tagline: 'Screen-free stories that spark imagination and build cultural roots.',
    description:
      'Place a 3D figurine on the magical cube and watch Panchatantra tales come alive with rich audio and LED animations. No screens, no Wi-Fi — just pure storytelling magic for ages 3–8.',
    image: 'https://boxtales.in/images/products/kids-hero.webp',
    price: '₹3,499',
    originalPrice: '₹4,999',
    categories: ['for-kids', 'premium', 'pre-order'],
    brand: 'boxtales',
    url: 'https://boxtales.in/products/kids',
    badge: 'Pre-Order',
  },
];

export const categories = [
  { id: 'all', label: 'All Ideas' },
  { id: 'trending', label: 'Trending' },
  { id: 'for-kids', label: 'For Kids' },
  { id: 'personalized', label: 'Personalized' },
  { id: 'premium', label: 'Premium' },
  { id: 'under-1000', label: 'Under ₹1,000' },
];

export const brandConfig: Record<Brand, { label: string; color: string; bg: string; textColor: string; siteUrl: string }> = {
  createmygift: {
    label: 'CreateMyGift',
    color: '#f2b90d',
    bg: '#fffbeb',
    textColor: '#78520a',
    siteUrl: 'https://createmygift.in',
  },
  boxtales: {
    label: 'BoxTales',
    color: '#e8622a',
    bg: '#fff5f0',
    textColor: '#7a2e0e',
    siteUrl: 'https://boxtales.in',
  },
};

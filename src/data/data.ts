export interface Product {
  id: string;
  brand: string;
  name: string;
  imageSrc: string;
  rating: number;
  productName: string;
  price: number;
}

export const dummyProducts: Product[] = [
  {
    id: '1',
    brand: 'Generic',
    name: 'Cuff Bracelet',
    imageSrc: '/banner1.webp',
    rating: 4,
    productName: 'Silver Cuff Bracelet',
    price: 999.99,
  },
  {
    id: '2',
    brand: 'Luxe',
    name: 'Diamond Ring',
    imageSrc: '/banner1.webp',
    rating: 5,
    productName: 'Sparkling Diamond Ring',
    price: 2499.99,
  },
  {
    id: '3',
    brand: 'EcoChic',
    name: 'Wooden Necklace',
    imageSrc: '/banner2.webp',
    rating: 3,
    productName: 'Wooden Pendant',
    price: 599.99,
  },
  {
    id: '4',
    brand: 'TechWear',
    name: 'Smart Watch',
    imageSrc: '/banner2.webp',
    rating: 4,
    productName: 'Fitness Tracker Watch',
    price: 1299.99,
  },
  {
    id: '5',
    brand: 'Vintage',
    name: 'Antique Earrings',
    imageSrc: '/banner1.webp',
    rating: 5,
    productName: 'Victorian Style Earrings',
    price: 799.99,
  },
  {
    id: '6',
    brand: 'ModernMinimal',
    name: 'Sleek Bangle',
    imageSrc: '/banner2.webp',
    rating: 4,
    productName: 'Minimalist Gold Bangle',
    price: 699.99,
  },
  {
    id: '7',
    brand: 'Beachy',
    name: 'Shell Anklet',
    imageSrc: '/banner1.webp',
    rating: 3,
    productName: 'Boho Beach Anklet',
    price: 299.99,
  },
  {
    id: '8',
    brand: 'Glamour',
    name: 'Crystal Tiara',
    imageSrc: '/banner1.webp',
    rating: 5,
    productName: 'Wedding Crystal Tiara',
    price: 1599.99,
  },
];
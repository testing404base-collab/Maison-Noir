export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'mains' | 'desserts' | 'drinks';
  subCategory?: 'wine' | 'whisky' | 'cocktails' | 'food';
  priceGBP: number; // £ original from specification
  description: string;
  ingredients: string[];
  dietary?: ('GF' | 'DF' | 'V' | 'VG' | 'Chef Special')[];
  pairing?: string;
  image?: string;
  featured?: boolean;
  vintage?: string; // For wine/whisky
  origin?: string; // e.g. Bordeaux, Paris, Tokyo, Hokkaido
}

export interface TastingCourse {
  courseNumber: number;
  title: string;
  japaneseTitle?: string;
  description: string;
  winePairing: string;
}

export interface TastingMenu {
  id: string;
  name: string;
  tagline: string;
  coursesCount: number;
  priceGBP: number;
  pairingPriceGBP: number;
  courses: TastingCourse[];
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  quote: string;
  rating: number;
  date?: string;
  source?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'hall' | 'chef' | 'cellar' | 'private' | 'dessert' | 'steak' | 'cocktails' | 'terrace' | 'table';
  image: string;
  caption: string;
}

export interface ReservationDetails {
  date: string;
  time: string;
  guests: number;
  seatingArea: 'main_hall' | 'chefs_counter' | 'private_dining' | 'terrace';
  occasion?: string;
  dietaryNotes?: string;
  fullName: string;
  email: string;
  phone: string;
  confirmationCode?: string;
}

export interface PrivateDiningRoom {
  id: string;
  name: string;
  capacity: string;
  description: string;
  features: string[];
  minimumSpend: string;
  image: string;
}

export type Currency = 'GBP' | 'USD' | 'EUR';
export type Language = 'en' | 'fr' | 'ja' | 'es' | 'de';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'admin';
  phone?: string;
  membershipTier?: 'Silver Member' | 'Gold Patron' | 'VIP Diamond';
  createdAt: string;
}

export interface UserReservation extends ReservationDetails {
  id: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

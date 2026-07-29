import { MenuItem, TastingMenu, Testimonial, GalleryItem, PrivateDiningRoom } from '../types';

import heroDiningHallImg from '../assets/images/hero_dining_hall_1785160085649.jpg';
import chefAlexandreImg from '../assets/images/chef_alexandre_1785160101865.jpg';
import wagyuDishImg from '../assets/images/wagyu_dish_1785160116069.jpg';
import wineCellarImg from '../assets/images/wine_cellar_1785160130513.jpg';
import chocolateSphereImg from '../assets/images/dessert_chocolate_sphere_1785160146387.jpg';

export const RESTAURANT_INFO = {
  name: "Maison Noir",
  tagline: "Where Culinary Art Meets Timeless Elegance",
  established: 2016,
  location: "Manhattan, New York",
  address: {
    street: "125 Madison Avenue",
    city: "New York",
    state: "NY",
    zip: "10016",
    country: "USA"
  },
  contact: {
    phone: "+1 (212) 555-1846",
    email: "reservations@maisonnoir.com",
  },
  cuisine: "Modern French × Japanese Fusion",
  priceRange: "$$$$",
  capacity: 120,
  dressCode: "Smart Elegant",
  privateDining: "Available (Up to 32 guests)",
  hours: [
    { day: "Monday", hours: "5:00 PM – 10:00 PM" },
    { day: "Tuesday", hours: "5:00 PM – 10:00 PM" },
    { day: "Wednesday", hours: "5:00 PM – 10:00 PM" },
    { day: "Thursday", hours: "5:00 PM – 10:30 PM" },
    { day: "Friday", hours: "5:00 PM – 11:30 PM" },
    { day: "Saturday", hours: "4:30 PM – 11:30 PM" },
    { day: "Sunday", hours: "Closed" },
  ],
  socials: {
    instagram: "@maisonnoir",
    facebook: "Maison Noir",
    pinterest: "Maison Noir Dining",
    youtube: "Maison Noir"
  },
  brandStory: `Maison Noir is an award-winning luxury fine dining restaurant established in 2016 in Manhattan. Inspired by contemporary French gastronomy with refined Japanese culinary philosophy, Maison Noir offers an unforgettable culinary journey crafted with seasonal ingredients sourced from organic local farms and air-flown Tokyo fish markets. Every dish is designed as a work of art, combining exceptional flavours, elegant presentation, and golden-standard hospitality.`
};

export const CHEF_INFO = {
  name: "Chef Alexandre Laurent",
  role: "Executive Chef & Founder",
  image: chefAlexandreImg,
  bio: `Chef Alexandre Laurent trained at L'École Grégoire-Ferrandi in Paris before spending nearly a decade mastering Japanese culinary techniques at iconic multi-starred establishments in Tokyo. His culinary philosophy fuses French precision with Japanese restraint, resulting in harmonious tasting menus celebrated worldwide for artistic presentation and deep umami balance.`,
  quote: "Gastronomy is not merely sustenance; it is a fleeting ballet of temperature, texture, and memory crafted for those who appreciate life's finest nuances.",
  awards: [
    { title: "Michelin Star Distinction", year: "2021 – 2026", issuer: "The Michelin Guide" },
    { title: "Best Fine Dining Experience", year: "2024", issuer: "New York Culinary Guild" },
    { title: "International Culinary Excellence Award", year: "2023", issuer: "World Gourmet Summit" },
    { title: "Sommelier Cellar Grand Award", year: "2025", issuer: "Wine Spectator" }
  ]
};

export const MENU_ITEMS: MenuItem[] = [
  // Starters
  {
    id: "m1",
    name: "Truffle Burrata",
    category: "starters",
    priceGBP: 24,
    description: "Creamy artisanal burrata infused with Black Périgord truffle, heirloom Japanese tomato compote, aged balsamic glaze, and micro-basil.",
    ingredients: ["Périgord Truffle", "Artisanal Burrata", "Momotaro Tomatoes", "25-yr Balsamic", "Shiso Oil"],
    dietary: ["V", "GF"],
    pairing: "2021 Chablis Grand Cru, Domaine Laroche",
    featured: true,
    origin: "Dordogne & Kyoto"
  },
  {
    id: "m2",
    name: "Bluefin Tuna Tartare",
    category: "starters",
    priceGBP: 29,
    description: "Sustainably sourced Akami bluefin tuna, Oscietra caviar, dashi gelée, avocado mousse, served with crisp nori-tuile.",
    ingredients: ["Akami Bluefin Tuna", "Royal Oscietra Caviar", "Dashi Gelée", "Hokkaido Sea Salt"],
    dietary: ["DF"],
    pairing: "2022 Dassai 23 Junmai Daiginjo Sake",
    featured: true,
    origin: "Toyosu Market, Tokyo"
  },
  {
    id: "m3",
    name: "Lobster Bisque",
    category: "starters",
    priceGBP: 21,
    description: "Velvety Maine lobster reduction, cognac crème fraîche, yuzu foam, and poached sweet lobster tail medallion.",
    ingredients: ["Maine Lobster", "Courvoisier Cognac", "Yuzu Kosho", "Chervil"],
    dietary: ["GF"],
    pairing: "2020 Meursault-Genevrières, Domaine Bouchard",
    featured: false,
    origin: "Maine Coast & Kochi"
  },

  // Main Courses
  {
    id: "m4",
    name: "Wagyu Tenderloin",
    category: "mains",
    priceGBP: 78,
    description: "Seared A5 Miyazaki Wagyu beef filet, smoked bone marrow jus, matsutake mushroom duxelles, and pomme purée with gold leaf.",
    ingredients: ["A5 Miyazaki Wagyu", "Matsutake Mushroom", "Bone Marrow Jus", "Echire Butter", "24K Gold Leaf"],
    dietary: ["Chef Special"],
    pairing: "2018 Château Margaux Premier Grand Cru Classé",
    image: wagyuDishImg,
    featured: true,
    origin: "Miyazaki Prefecture, Japan"
  },
  {
    id: "m5",
    name: "Miso Black Cod",
    category: "mains",
    priceGBP: 58,
    description: "Wild Alaskan black cod marinated 72 hours in Saikyo sweet miso, baby bok choy, pickled ginger shoot, and champagne beurre blanc.",
    ingredients: ["Alaskan Black Cod", "Kyoto Saikyo Miso", "Champagne Beurre Blanc", "Hajikami Ginger"],
    dietary: ["GF", "DF"],
    pairing: "2019 Pouilly-Fuissé, Domaine Leflaive",
    featured: true,
    origin: "Kyoto & Pacific Waters"
  },
  {
    id: "m6",
    name: "Herb-Crusted Lamb Rack",
    category: "mains",
    priceGBP: 65,
    description: "Colorado raised rack of lamb, shiso-parsley crust, roasted baby artichokes, black garlic glaze, and lamb reduction.",
    ingredients: ["Colorado Prime Lamb", "Shiso Herb Crust", "Black Garlic", "Artichoke Barigoule"],
    dietary: ["DF"],
    pairing: "2017 Barolo Cannubi, Marchesi di Barolo",
    featured: false,
    origin: "Colorado Valleys"
  },

  // Desserts
  {
    id: "m7",
    name: "Dark Chocolate Sphere",
    category: "desserts",
    priceGBP: 22,
    description: "Valrhona 70% Guanaja chocolate sphere, molten hazelnut praline core, warm salted caramel pour, and gold dust.",
    ingredients: ["Valrhona Guanaja 70%", "Piedmont Hazelnut", "Fleur de Sel Caramel", "Tahitian Vanilla Gelato"],
    dietary: ["V"],
    pairing: "2015 Taylor Fladgate 20-Year Tawny Port",
    image: chocolateSphereImg,
    featured: true,
    origin: "Valrhona, France"
  },
  {
    id: "m8",
    name: "Vanilla Bean Crème Brûlée",
    category: "desserts",
    priceGBP: 18,
    description: "Classic Tahitian vanilla custard with a crisp caramelized sugar crust, accompanied by fresh Japanese white strawberries.",
    ingredients: ["Tahitian Vanilla Bean", "Organic Egg Yolk", "Japanese Awayuki Strawberry"],
    dietary: ["GF", "V"],
    pairing: "2016 Château d'Yquem Sauternes",
    featured: false,
    origin: "Tahiti & Nara"
  },
  {
    id: "m9",
    name: "Matcha Opera Cake",
    category: "desserts",
    priceGBP: 19,
    description: "Layers of Uji ceremonial matcha sponge, dark chocolate ganache, coffee buttercream, and sesame brittle.",
    ingredients: ["Uji Ceremonial Matcha", "Single-Origin Chocolate", "Roasted White Sesame"],
    dietary: ["V"],
    pairing: "Kyoto Uji Gyokuro Imperial Green Tea",
    featured: true,
    origin: "Uji, Kyoto"
  },

  // Drinks / Wine / Whisky
  {
    id: "w1",
    name: "Château Lafite Rothschild 2010",
    category: "drinks",
    subCategory: "wine",
    priceGBP: 180,
    description: "Pauillac Premier Grand Cru Classé. Complex blackcurrant, cedar wood, graphite, and velvet tannic structure.",
    ingredients: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc"],
    vintage: "2010",
    origin: "Bordeaux, France"
  },
  {
    id: "w2",
    name: "Yamazaki 18 Year Single Malt",
    category: "drinks",
    subCategory: "whisky",
    priceGBP: 65,
    description: "Pours deep amber. Rich notes of dark cherry, mizunara oak, dried fruit, and a silky long finish.",
    ingredients: ["Malted Barley", "Mizunara Cask Aged"],
    vintage: "18 Year",
    origin: "Osaka, Japan"
  },
  {
    id: "w3",
    name: "Noir Velvet Cocktail",
    category: "drinks",
    subCategory: "cocktails",
    priceGBP: 26,
    description: "Hibiki Harmony Japanese Whisky, black truffle syrup, Angostura bitters, smoked with cherrywood smoke, gold leaf ice cube.",
    ingredients: ["Hibiki Harmony", "Black Truffle Syrup", "Smoked Cherrywood", "Gold Leaf"],
    origin: "Maison Noir Signature"
  }
];

export const TASTING_MENUS: TastingMenu[] = [
  {
    id: "tm-7",
    name: "Omakase Étoile",
    tagline: "The Grand 7-Course Gastronomic Journey by Chef Alexandre Laurent",
    coursesCount: 7,
    priceGBP: 195,
    pairingPriceGBP: 125,
    courses: [
      { courseNumber: 1, title: "Amuse-Bouche", japaneseTitle: "口代わり", description: "Oscietra Caviar tartelette with yuzu dashi crème and gold dust.", winePairing: "Dom Pérignon Vintage 2013 Champagne" },
      { courseNumber: 2, title: "Bluefin Tuna & Dashi", japaneseTitle: "Maguro Dashi", description: "Akami bluefin tartare, avocado mousse, shiso leaf oil, dashi gelée.", winePairing: "Dassai 23 Junmai Daiginjo Sake" },
      { courseNumber: 3, title: "Truffle & Burrata", japaneseTitle: "Truffle Mozzarella", description: "Black Périgord truffle, artisanal burrata, heirloom Momotaro tomato compote.", winePairing: "Chablis Grand Cru Les Clos 2021" },
      { courseNumber: 4, title: "Saikyo Miso Cod", japaneseTitle: "Gindara Saikyoyaki", description: "Wild Alaskan black cod marinated in Kyoto Saikyo sweet miso, champagne beurre blanc.", winePairing: "Meursault-Genevrières Domaine Bouchard 2020" },
      { courseNumber: 5, title: "Miyazaki A5 Wagyu", japaneseTitle: "A5 Wagyu Tenderloin", description: "A5 Miyazaki Wagyu filet, matsutake duxelles, pomme purée, smoked bone marrow jus.", winePairing: "Château Margaux Premier Grand Cru 2018" },
      { courseNumber: 6, title: "Palate Cleanser", japaneseTitle: "Yuzu Granita", description: "Shiso & Japanese Yuzu sorbet with sparkling sake splash.", winePairing: "Uji Gyokuro Cold Brew Tea" },
      { courseNumber: 7, title: "Valrhona Noir & Matcha", japaneseTitle: "Chocolate & Matcha", description: "Dark Chocolate sphere with molten hazelnut praline and Matcha Opera cake delicate bite.", winePairing: "Taylor Fladgate 20-Year Tawny Port" }
    ]
  },
  {
    id: "tm-5",
    name: "Seasonal Symphony",
    tagline: "A 5-Course Celebration of Harvest & Ocean",
    coursesCount: 5,
    priceGBP: 145,
    pairingPriceGBP: 95,
    courses: [
      { courseNumber: 1, title: "Ocean Breeze", description: "Hokkaido scallop carpaccio with lime pearls and sea urchin foam.", winePairing: "Sancerre Les Baronnes 2022" },
      { courseNumber: 2, title: "Lobster & Cognac", description: "Velvety Maine lobster bisque with poached medallion and chervil.", winePairing: "Puligny-Montrachet 2021" },
      { courseNumber: 3, title: "Colorado Lamb", description: "Herb-crusted lamb rack with black garlic reduction and roasted artichoke.", winePairing: "Barolo Cannubi 2017" },
      { courseNumber: 4, title: "Pre-Dessert", description: "Shiso and white peach compote.", winePairing: "Sparkling Sake" },
      { courseNumber: 5, title: "Matcha Opera", description: "Uji ceremonial matcha layers, dark ganache, gold leaf finish.", winePairing: "Château d'Yquem 2016" }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sophia Carter",
    role: "Food & Wine Critic",
    quote: "The finest dining experience we've had in New York. Every course was perfection—the fusion of French finesse and Japanese umami is nothing short of transcendent.",
    rating: 5,
    date: "June 2026",
    source: "Michelin Guide Reviewer"
  },
  {
    id: "t2",
    name: "Daniel Morgan",
    role: "Luxury Traveler & Collector",
    quote: "Exceptional service, unforgettable flavours, and a truly luxurious atmosphere. The A5 Wagyu Tenderloin melted like butter and the wine pairings were flawless.",
    rating: 5,
    date: "May 2026",
    source: "Verified Guest"
  },
  {
    id: "t3",
    name: "Olivia Bennett",
    role: "Executive Director",
    quote: "Maison Noir deserves every bit of its stellar reputation. We hosted our 10th anniversary in the Private Cellar room and our guests were mesmerized.",
    rating: 5,
    date: "July 2026",
    source: "Private Dining Guest"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Luxury Dining Hall",
    category: "hall",
    image: heroDiningHallImg,
    caption: "Sophisticated interiors featuring handcrafted walnut tables, ambient amber lighting, and custom velvet seating."
  },
  {
    id: "g2",
    title: "Executive Chef at Work",
    category: "chef",
    image: chefAlexandreImg,
    caption: "Chef Alexandre Laurent meticulously placing micro-herbs on an A5 Wagyu creation."
  },
  {
    id: "g3",
    title: "A5 Miyazaki Wagyu Tenderloin",
    category: "steak",
    image: wagyuDishImg,
    caption: "Seared Miyazaki Wagyu with matsutake duxelles, 24K gold leaf, and smoked marrow jus."
  },
  {
    id: "g4",
    title: "Grand Walk-in Wine Cellar",
    category: "cellar",
    image: wineCellarImg,
    caption: "Housing over 1,500 rare vintages curated by Master Sommelier Jean-Luc Moreau."
  },
  {
    id: "g5",
    title: "Valrhona Dark Chocolate Sphere",
    category: "dessert",
    image: chocolateSphereImg,
    caption: "Gold-dusted Valrhona sphere with molten hazelnut core and Tahitian vanilla gelato."
  },
  {
    id: "g6",
    title: "The Noir Cocktail Lounge",
    category: "cocktails",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
    caption: "Mixology counter featuring rare Japanese whiskies and artisanal ice sculptures."
  },
  {
    id: "g7",
    title: "Private Dining Salon",
    category: "private",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
    caption: "Intimate private dining room accommodating up to 16 guests with dedicated sommelier service."
  },
  {
    id: "g8",
    title: "Sunset Terrace Dining",
    category: "terrace",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
    caption: "Enclosed heated outdoor terrace overlooking Manhattan's skyline."
  },
  {
    id: "g9",
    title: "Fine Table Settings",
    category: "table",
    image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80",
    caption: "Baccarat crystal glassware, Christofle silverware, and custom Bernardaud porcelain."
  }
];

export const PRIVATE_ROOMS: PrivateDiningRoom[] = [
  {
    id: "pr-1",
    name: "The Imperial Cellar Salon",
    capacity: "8 – 16 Guests",
    description: "Surrounded by floor-to-ceiling glass wine walls housing rare vintages, offering maximum privacy and an acoustic Steinway piano ambiance.",
    features: ["Dedicated Sommelier & Captain", "Customized Multi-Course Menu", "Private Anteroom & Cloakroom", "Personalized Table Floral Design"],
    minimumSpend: "$2,500 USD",
    image: wineCellarImg
  },
  {
    id: "pr-2",
    name: "The Sakura Garden Room",
    capacity: "16 – 32 Guests",
    description: "A spacious luxury dining suite featuring handcrafted shoji wooden panels, private bar setup, and direct terrace access.",
    features: ["Private Cocktail Bar", "AV System for Speeches/Presentations", "Chef Live Station Option", "Dedicated Service Staff"],
    minimumSpend: "$4,500 USD",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80"
  }
];

export const RESTAURANT_FEATURES = [
  { title: "Complimentary Valet Parking", desc: "Seamless white-glove valet service right on Madison Avenue." },
  { title: "Private Dining Rooms", desc: "Exclusive suites for corporate galas, anniversaries, and confidential dinners." },
  { title: "Chef's Tasting Menu", desc: "Multi-course Omakase Étoile experience crafted by Chef Alexandre Laurent." },
  { title: "Wine Pairing Experience", desc: "1,500+ curated vintages selected by Master Sommelier." },
  { title: "Live Piano Evenings", desc: "Subtle jazz & classical grand piano performances Thursday through Saturday." },
  { title: "Outdoor Terrace", desc: "Heated, glass-enclosed rooftop patio with skyline views." },
  { title: "Seasonal Menu", desc: "Quarterly menu evolution celebrating peak local & Tokyo seasonal harvests." },
  { title: "Luxury Event Hosting", desc: "Full restaurant buyout available for up to 120 guests." }
];

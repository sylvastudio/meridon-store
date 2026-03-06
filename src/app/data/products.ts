// Centralized dummy content for Meridon Store supplements

export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
}

export const dummyProducts: ProductData[] = [
  {
    id: 'prod-1',
    name: 'Vitamin C 1000mg',
    description: 'High-potency Vitamin C supplement to support immune system health. Each tablet provides 1000mg of pure ascorbic acid. Helps protect cells from oxidative stress and contributes to normal collagen formation.',
    price: 8500,
    category: 'Vitamins',
    stock: 150,
    imageUrl: 'https://images.unsplash.com/photo-1729701792989-f517b77e7f49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwYyUyMHN1cHBsZW1lbnQlMjBib3R0bGV8ZW58MXx8fHwxNzcyMjY2Njk0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'prod-2',
    name: 'Omega-3 Fish Oil',
    description: 'Premium quality fish oil capsules rich in EPA and DHA omega-3 fatty acids. Supports heart health, brain function, and joint mobility. Molecularly distilled for purity and freshness.',
    price: 12500,
    category: 'Omega & Fatty Acids',
    stock: 200,
    imageUrl: 'https://images.unsplash.com/photo-1576437293196-fc3080b75964?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbWVnYSUyMDMlMjBmaXNoJTIwb2lsJTIwY2Fwc3VsZXN8ZW58MXx8fHwxNzcyMjEwMDc1fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'prod-3',
    name: 'Daily Multivitamin',
    description: 'Complete multivitamin and mineral formula designed to fill nutritional gaps in your diet. Contains essential vitamins A, C, D, E, B-complex, plus key minerals for overall wellness.',
    price: 15000,
    category: 'Multivitamins',
    stock: 120,
    imageUrl: 'https://images.unsplash.com/photo-1763674520528-68bcd439906e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdWx0aXZpdGFtaW4lMjBzdXBwbGVtZW50JTIwamFyfGVufDF8fHx8MTc3MjI2NjY5NXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'prod-4',
    name: 'Whey Protein Powder',
    description: 'Premium whey protein isolate with 25g protein per serving. Supports muscle growth and recovery. Low in fat and carbs, perfect for post-workout nutrition. Available in chocolate flavor.',
    price: 28000,
    category: 'Protein & Fitness',
    stock: 80,
    imageUrl: 'https://images.unsplash.com/photo-1763757933292-d8290692edde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWluJTIwcG93ZGVyJTIwY29udGFpbmVyfGVufDF8fHx8MTc3MjE2ODA4N3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'prod-5',
    name: 'Vitamin D3 5000 IU',
    description: 'High-strength Vitamin D3 (cholecalciferol) supplement. Essential for bone health, immune function, and mood regulation. Especially important for those with limited sun exposure.',
    price: 9500,
    category: 'Vitamins',
    stock: 175,
    imageUrl: 'https://images.unsplash.com/photo-1743187248656-b53c203d808e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwZCUyMHN1cHBsZW1lbnQlMjB0YWJsZXRzfGVufDF8fHx8MTc3MjI2NjY5Nnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'prod-6',
    name: 'Probiotic Complex',
    description: 'Multi-strain probiotic formula with 10 billion CFU per capsule. Supports digestive health, gut microbiome balance, and immune function. Shelf-stable and clinically studied strains.',
    price: 11500,
    category: 'Digestive Health',
    stock: 95,
    imageUrl: 'https://images.unsplash.com/photo-1664786908068-e435ba6edb89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9iaW90aWNzJTIwc3VwcGxlbWVudCUyMGJvdHRsZXxlbnwxfHx8fDE3NzIyNjY2OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'prod-7',
    name: 'Calcium + Magnesium',
    description: 'Synergistic blend of calcium and magnesium for optimal bone health and muscle function. Includes Vitamin D for enhanced calcium absorption. Perfect balance of essential minerals.',
    price: 10500,
    category: 'Minerals',
    stock: 140,
    imageUrl: 'https://images.unsplash.com/photo-1609720597021-1498d6216a55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxjaXVtJTIwbWFnbmVzaXVtJTIwcGlsbHN8ZW58MXx8fHwxNzcyMjY2Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'prod-8',
    name: 'Collagen Peptides',
    description: 'Hydrolyzed collagen powder for skin, hair, nail, and joint health. Type I & III collagen from grass-fed sources. Easily dissolved in hot or cold beverages. Unflavored and versatile.',
    price: 18500,
    category: 'Beauty & Skin',
    stock: 65,
    imageUrl: 'https://images.unsplash.com/photo-1763757933292-d8290692edde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsYWdlbiUyMHBvd2RlciUyMHN1cHBsZW1lbnR8ZW58MXx8fHwxNzcyMjY2Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'prod-9',
    name: 'Iron 65mg',
    description: 'High-absorption iron supplement with Vitamin C for enhanced bioavailability. Supports healthy red blood cell production and helps combat fatigue. Gentle on the stomach formula.',
    price: 7500,
    category: 'Minerals',
    stock: 110,
    imageUrl: 'https://images.unsplash.com/photo-1596177583101-26b7dada4f5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcm9uJTIwc3VwcGxlbWVudCUyMHRhYmxldHN8ZW58MXx8fHwxNzcyMjY2Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'prod-10',
    name: 'Zinc 50mg',
    description: 'High-potency zinc supplement to support immune health, skin health, and wound healing. Chelated for superior absorption. Essential mineral for over 300 enzymatic reactions in the body.',
    price: 6500,
    category: 'Minerals',
    stock: 185,
    imageUrl: 'https://images.unsplash.com/photo-1740592754365-2117f5977528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6aW5jJTIwc3VwcGxlbWVudCUyMGNhcHN1bGVzfGVufDF8fHx8MTc3MjI2NjY5OHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'prod-11',
    name: 'Green Superfood Blend',
    description: 'Organic greens powder blend featuring spirulina, chlorella, wheatgrass, and barley grass. Packed with antioxidants, vitamins, and minerals. Easy way to boost daily vegetable intake.',
    price: 16500,
    category: 'Superfoods',
    stock: 70,
    imageUrl: 'https://images.unsplash.com/photo-1755685344391-a9a3a1784fb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHN1cGVyZm9vZCUyMHBvd2RlcnxlbnwxfHx8fDE3NzIyNjY2OTh8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'prod-12',
    name: 'BCAA Amino Acids',
    description: 'Branched-chain amino acids (leucine, isoleucine, valine) in optimal 2:1:1 ratio. Supports muscle protein synthesis, reduces exercise fatigue, and accelerates recovery. Great for athletes.',
    price: 13500,
    category: 'Protein & Fitness',
    stock: 90,
    imageUrl: 'https://images.unsplash.com/photo-1740592754365-2117f5977528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiY2FhJTIwYW1pbm8lMjBhY2lkcyUyMHN1cHBsZW1lbnR8ZW58MXx8fHwxNzcyMjY2Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export const productCategories = [
  'Vitamins',
  'Minerals',
  'Multivitamins',
  'Omega & Fatty Acids',
  'Protein & Fitness',
  'Digestive Health',
  'Beauty & Skin',
  'Superfoods'
];

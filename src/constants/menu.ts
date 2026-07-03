import type { MenuItem } from '../types'

export const featuredMenu: MenuItem[] = [
  {
    id: '1',
    name: 'Truffle Mushroom Pasta',
    description: 'Silky pasta, roasted mushrooms, parmesan cream sauce.',
    price: '$18',
    tag: 'Featured',
  },
  {
    id: '2',
    name: 'Charred Salmon Bowl',
    description: 'Fresh salmon, citrus glaze, quinoa and greens.',
    price: '$22',
    tag: 'Popular',
  },
  {
    id: '3',
    name: 'Dark Chocolate Lava Cake',
    description: 'Warm center, berry compote, almond crumble.',
    price: '$10',
    tag: 'Dessert',
  },
]

export const popularDishes: MenuItem[] = [
  {
    id: '4',
    name: 'Herb-Crusted Ribeye',
    description: 'Prime ribeye, garlic butter, roasted vegetables.',
    price: '$28',
    tag: 'Steak',
  },
  {
    id: '5',
    name: 'Seared Scallops',
    description: 'Lemon basil risotto, sea salt drizzle.',
    price: '$24',
    tag: 'Seafood',
  },
  {
    id: '6',
    name: 'Avocado Garden Salad',
    description: 'Mixed greens, citrus vinaigrette, toasted seeds.',
    price: '$12',
    tag: 'Salad',
  },
]

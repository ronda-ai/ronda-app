
export interface Theme {
  name: string;
  primary: string;
  background: string;
  accent: string;
}

export const themes: Theme[] = [
  {
    name: 'default',
    primary: '251 82% 65%', // MediumSlateBlue
    background: '208 100% 97%', // AliceBlue
    accent: '120 93% 77%', // PaleGreen (adjusted for better harmony)
  },
  {
    name: 'forest',
    primary: '140 35% 45%', // Dark Slate Green
    background: '120 20% 97%', // Honeydew
    accent: '90 40% 60%', // Light Green
  },
  {
    name: 'ocean',
    primary: '210 60% 50%', // Steel Blue
    background: '205 100% 96%', // Light Cyan
    accent: '190 70% 70%', // Medium Aquamarine
  },
  {
    name: 'sunset',
    primary: '25 95% 60%', // Dark Orange
    background: '45 100% 97%', // Light Yellow
    accent: '10 85% 70%', // Light Coral
  },
  {
    name: 'rose',
    primary: '340 70% 55%', // Deep Pink
    background: '345 100% 97%', // Lavender Blush
    accent: '330 80% 80%', // Light Pink
  },
  {
    name: 'nebula',
    primary: '270 60% 60%', // Medium Purple
    background: '260 40% 98%', // Thistle
    accent: '300 70% 80%', // Plum
  },
  {
    name: 'minty',
    primary: '160 50% 45%', // Medium Sea Green
    background: '150 100% 98%', // Mint Cream
    accent: '170 60% 75%', // Aquamarine
  },
  {
    name: 'sandstone',
    primary: '30 40% 50%', // Saddle Brown
    background: '35 50% 96%', // Bisque
    accent: '40 60% 70%', // Sandy Brown
  },
  {
    name: 'cyberpunk',
    primary: '315 100% 50%', // Magenta
    background: '240 10% 10%', // Dark blue-gray
    accent: '180 100% 50%', // Cyan
  },
  {
    name: 'vintage',
    primary: '35 30% 40%', // Sepia
    background: '45 30% 95%', // Parchment
    accent: '35 25% 70%', // Tan
  },
  {
    name: 'sakura',
    primary: '350 100% 85%', // Cherry Blossom Pink
    background: '300 20% 98%', // Pale Pink
    accent: '130 30% 80%', // Soft Green
  },
  {
    name: 'jungle',
    primary: '130 40% 40%', // Jungle Green
    background: '100 10% 95%', // Light Moss
    accent: '45 70% 60%', // Gold
  },
  {
    name: 'arctic',
    primary: '195 90% 50%', // Arctic Blue
    background: '200 100% 98%', // Snow White
    accent: '185 20% 80%', // Ice Blue
  },
  {
    name: 'volcano',
    primary: '10 90% 55%', // Lava Red
    background: '20 15% 15%', // Volcanic Rock
    accent: '40 100% 60%', // Molten Gold
  },
  {
    name: 'cotton_candy',
    primary: '330 100% 80%', // Cotton Candy Pink
    background: '210 100% 97%', // Light Sky Blue
    accent: '270 100% 85%', // Light Lavender
  },
  {
    name: 'golden_hour',
    primary: '45 100% 55%', // Golden Yellow
    background: '30 100% 97%', // Pale Orange
    accent: '20 100% 75%', // Soft Red
  },
  {
    name: 'royal',
    primary: '260 50% 50%', // Royal Purple
    background: '50 30% 95%', // Ivory
    accent: '50 100% 60%', // Gold
  },
  {
    name: 'emerald',
    primary: '150 50% 40%', // Emerald Green
    background: '160 15% 97%', // Off-white
    accent: '170 30% 70%', // Seafoam
  },
  {
    name: 'coffee_shop',
    primary: '25 35% 35%', // Coffee Brown
    background: '35 25% 94%', // Cream
    accent: '20 15% 60%', // Latte
  },
  {
    name: 'autumn',
    primary: '20 80% 50%', // Burnt Orange
    background: '40 40% 95%', // Beige
    accent: '0 50% 45%', // Maroon
  },
  {
    name: 'coral_reef',
    primary: '0 90% 65%', // Coral
    background: '190 100% 96%', // Light Turquoise
    accent: '200 80% 75%', // Aqua
  },
  {
    name: 'lavender_field',
    primary: '260 70% 70%', // Lavender
    background: '270 30% 98%', // Pale Lilac
    accent: '120 25% 85%', // Sage Green
  },
  {
    name: 'graphite',
    primary: '210 10% 40%', // Graphite Gray
    background: '0 0% 98%', // White
    accent: '210 10% 80%', // Light Gray
  },
  {
    name: 'strawberry',
    primary: '0 85% 60%', // Strawberry Red
    background: '350 100% 97%', // Pinkish White
    accent: '120 40% 80%', // Light Mint
  },
  {
    name: 'matcha',
    primary: '100 25% 40%', // Matcha Green
    background: '80 20% 96%', // Pale Green
    accent: '40 15% 70%', // Light Brown
  },
  {
    name: 'peacock',
    primary: '190 60% 45%', // Peacock Blue
    background: '240 10% 97%', // Light Periwinkle
    accent: '160 40% 55%', // Teal
  },
  {
    name: 'sunny_day',
    primary: '50 100% 50%', // Sunny Yellow
    background: '195 100% 95%', // Sky Blue
    accent: '0 0% 100%', // White
  },
  {
    name: '8bit',
    primary: '225 80% 55%', // 8-bit Blue
    background: '0 0% 10%', // Black
    accent: '60 100% 50%', // 8-bit Yellow
  },
];

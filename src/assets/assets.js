// Get base URL from Vite (will be '/' in dev, '/flip-and-match-app/' in production)
const BASE_URL = import.meta.env.BASE_URL || '/';

// Assets manifest for prize images
export const PRIZE_ASSETS = [
  {
    id: 'cambridge-shield',
    name: 'Cambridge Shield',
    filename: 'Cambridge Shield.png',
    path: `${BASE_URL}assets/images/prizes/Cambridge Shield.png`,
    description: 'Cambridge Shield logo'
  },
  {
    id: 'development-evp-shield',
    name: 'Development EVP Shield',
    filename: 'Development-EVP-shield.png',
    path: `${BASE_URL}assets/images/prizes/Development-EVP-shield.png`,
    description: 'Development EVP shield logo'
  },
  {
    id: 'inclusion-evp-shield',
    name: 'Inclusion EVP Shield',
    filename: 'Inclusion-EVP-shield.png',
    path: `${BASE_URL}assets/images/prizes/Inclusion-EVP-shield.png`,
    description: 'Inclusion EVP shield logo'
  },
  {
    id: 'innovation-evp-shield',
    name: 'Innovation EVP Shield',
    filename: 'Innovation-EVP-shield.png',
    path: `${BASE_URL}assets/images/prizes/Innovation-EVP-shield.png`,
    description: 'Innovation EVP shield logo'
  },
  {
    id: 'pursuing-potential-logo',
    name: 'Pursuing Potential Logo',
    filename: 'Pursuing Potential Logo.png',
    path: `${BASE_URL}assets/images/prizes/Pursuing Potential Logo.png`,
    description: 'Pursuing Potential brand logo'
  }
];

// Special app images (not prizes but used throughout the app)
export const APP_IMAGES = {
  sadCat: {
    id: 'sad-cat',
    name: 'Sad Cat',
    filename: 'Sad_cat.png',
    path: `${BASE_URL}assets/images/Sad_cat.png`,
    description: 'Default fallback image for failed loads'
  },
  winnerCat: {
    id: 'winner-cat',
    name: 'Winner Cat',
    filename: 'cat_win.png',
    path: `${BASE_URL}assets/images/cat_win.png`,
    description: 'Victory celebration image'
  },
  logo: {
    id: 'pursuing-potential-header',
    name: 'Pursuing Potential Header Logo',
    filename: 'Pursuing Potential Logo.png',
    path: `${BASE_URL}assets/images/Pursuing Potential Logo.png`,
    description: 'Main header logo'
  }
};

// Helper function to get asset URL for Vite
export const getAssetUrl = (filename) => {
  // URL encode the filename to handle spaces
  const encodedFilename = encodeURIComponent(filename);
  
  // Use BASE_URL from Vite - automatically '/' in dev, '/flip-and-match-app/' in production
  return `${BASE_URL}assets/images/prizes/${encodedFilename}`;
};

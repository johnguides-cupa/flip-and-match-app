// Get base URL from Vite (will be '/' in dev, '/flip-and-match-app/' in production)
const BASE_URL = import.meta.env.BASE_URL || '/';

// Assets manifest for prize images
export const PRIZE_ASSETS = [
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
  },
  catCrying: {
    id: 'cat-crying',
    name: 'Crying Cat',
    filename: 'cat-crying.gif',
    path: `${BASE_URL}assets/images/cat-crying.gif`,
    description: 'Crying cat gif'
  },
  dancingCat: {
    id: 'dancing-cat',
    name: 'Dancing Cat',
    filename: 'dancing-cat.gif',
    path: `${BASE_URL}assets/images/dancing-cat.gif`,
    description: 'Dancing cat gif'
  },
  happyCat: {
    id: 'happy-cat',
    name: 'Happy Cat',
    filename: 'Happy cat.gif',
    path: `${BASE_URL}assets/images/Happy cat.gif`,
    description: 'Happy cat gif'
  }
};

// Helper function to get asset URL for Vite
export const SOUND_ASSETS = [
  `${BASE_URL}assets/sounds/Congratulations.mp3`,
  `${BASE_URL}assets/sounds/miaw.mp3`,
  `${BASE_URL}assets/sounds/Happy Happy Happy.mp3`
];

export const getAssetUrl = (filename) => {
  // URL encode the filename to handle spaces
  const encodedFilename = encodeURIComponent(filename);
  return `${BASE_URL}assets/images/prizes/${encodedFilename}`;
};

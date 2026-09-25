/**
 * StreamFlix Bundled Catalog & Configuration
 * GLA University - Mini Project 1 (Batch 8, Section AE)
 * Guide: Satyam Kumar Jha
 */

const QUALITY_OPTIONS = [
  { id: 'auto', label: 'Auto (ABR Dynamic)', bitrateKbps: 0, resolution: 'Adaptive', tag: 'Smart' },
  { id: '1080p', label: 'Full HD (1080p)', bitrateKbps: 6500, resolution: '1920x1080', tag: 'FHD' },
  { id: '720p', label: 'High Definition (720p)', bitrateKbps: 3200, resolution: '1280x720', tag: 'HD' },
  { id: '480p', label: 'Standard Definition (480p)', bitrateKbps: 1400, resolution: '854x480', tag: 'SD' },
  { id: '360p', label: 'Data Saver (360p)', bitrateKbps: 650, resolution: '640x360', tag: 'Saver' }
];

const NETWORK_PROFILES = [
  {
    id: 'fiber',
    name: 'High-Speed Fiber (100 Mbps)',
    description: 'Blazing fast gigabit fiber. Zero packet drop, instant buffer, auto-selects 1080p.',
    speedMbps: 100,
    latencyMs: 12,
    recommendedQuality: '1080p',
    badge: '100 Mbps',
    icon: '⚡'
  },
  {
    id: '4g',
    name: '4G LTE / Wi-Fi (25 Mbps)',
    description: 'Stable high-speed connection. Optimal 1080p/720p playback.',
    speedMbps: 25,
    latencyMs: 45,
    recommendedQuality: '1080p',
    badge: '25 Mbps',
    icon: '📶'
  },
  {
    id: '3g',
    name: '3G Cellular Network (4 Mbps)',
    description: 'Constrained cellular signal. Automatically steps down to 720p or 480p.',
    speedMbps: 4,
    latencyMs: 140,
    recommendedQuality: '720p',
    badge: '4 Mbps',
    icon: '📻'
  },
  {
    id: 'edge',
    name: 'Throttled Edge / 2G (700 Kbps)',
    description: 'Heavy congestion or poor reception. Dynamic ABR drops to 360p Data Saver.',
    speedMbps: 0.7,
    latencyMs: 380,
    recommendedQuality: '360p',
    badge: '700 Kbps',
    icon: '⚠️'
  },
  {
    id: 'offline',
    name: 'Network Drop Simulator (0 Mbps)',
    description: 'Simulates complete signal loss and triggers buffer depletion stall.',
    speedMbps: 0,
    latencyMs: 999,
    recommendedQuality: '360p',
    badge: '0 Mbps',
    icon: '🚫'
  }
];

const BUNDLED_CATALOG = [
  {
    id: 'cyber-genesis',
    title: 'Cyber Genesis: 2099',
    tagline: 'When consciousness transcends synthetic borders.',
    synopsis: 'In a rain-drenched dystopian megacity governed by rogue neural algorithms, a disgraced cyber-detective uncovers a covert syndicate synthesizing artificial souls. With time running out, he must navigate treacherous neon back-alleys and cybernetic enforcers.',
    backdropUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    videoSources: {
      '1080p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      '720p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      '480p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      '360p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
    },
    releaseYear: 2026,
    rating: 'U/A 16+',
    duration: '2h 18m',
    matchScore: 99,
    resolution: '4K Ultra HD',
    audio: 'Dolby Atmos 5.1',
    categories: ['Trending', 'Originals', 'Sci-Fi'],
    genre: 'Sci-Fi',
    tags: ['Mind-Bending', 'Cyberpunk', 'High-Octane', 'Visual Feast'],
    cast: ['Elena Vance', 'Kaelen Thorne', 'Dr. Aris Thorne', 'Mira Chen'],
    director: 'Denis Villeneuve-Sim',
    isOriginal: true,
    topTenRank: 1
  },
  {
    id: 'shadow-velocity',
    title: 'Shadow Velocity',
    tagline: 'Speed is merely the illusion of control.',
    synopsis: 'An underground street syndicate and a high-stakes heist crew collide along neon coastal highways when an experimental electromagnetic drive goes missing during a midnight transport.',
    backdropUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    videoSources: {
      '1080p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
      '720p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
      '480p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
      '360p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4'
    },
    releaseYear: 2025,
    rating: 'U/A 16+',
    duration: '1h 52m',
    matchScore: 96,
    resolution: '4K Ultra HD',
    audio: '5.1 Surround',
    categories: ['Trending', 'Action'],
    genre: 'Action',
    tags: ['Adrenaline Rush', 'Heist', 'Motorsport', 'Explosive'],
    cast: ['Marcus Reid', 'Sonia Ortiz', 'Dominic Hawke'],
    director: 'Justin Lin-Sim',
    topTenRank: 2
  },
  {
    id: 'deep-cosmos-odyssey',
    title: 'Deep Cosmos: Beyond Horizons',
    tagline: 'The stars whisper secrets our instruments cannot fathom.',
    synopsis: 'A lone deep-space exploration vessel discovers an ancient geometric monolith drifting along the outer rings of Saturn that reshapes quantum relativity and threatens the boundary between time and reality.',
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    videoSources: {
      '1080p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      '720p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      '480p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      '360p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
    },
    releaseYear: 2025,
    rating: 'U/A 13+',
    duration: '2h 34m',
    matchScore: 98,
    resolution: '4K Ultra HD',
    audio: 'Dolby Atmos',
    categories: ['Sci-Fi', 'Trending', 'Originals'],
    genre: 'Sci-Fi',
    tags: ['Philosophical', 'Deep Space', 'Hypnotic', 'Cerebral'],
    cast: ['Dr. Julian Blake', 'Aria Sterling', 'HAL-Prime (Voice)'],
    director: 'Christopher Nolan-Sim',
    isOriginal: true,
    topTenRank: 3
  },
  {
    id: 'the-vault-protocol',
    title: 'The Vault Protocol (VIP Locked)',
    tagline: 'Only the authorized survive the audit.',
    synopsis: 'An ultra-secure quantum vault deep in the Swiss Alps enters lockdown with nine rogue operatives trapped inside as oxygen levels plummet and cryptographic firewalls activate.',
    backdropUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    videoSources: {
      '1080p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      '720p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      '480p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      '360p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    },
    releaseYear: 2026,
    rating: 'A 18+',
    duration: '1h 48m',
    matchScore: 94,
    resolution: '4K Ultra HD',
    audio: '5.1 Surround',
    categories: ['Action', 'Thrillers', 'Trending'],
    genre: 'Thrillers',
    tags: ['Parental Pin Required', 'DRM Protected', 'Psychological'],
    cast: ['Vikram Rathi', 'Claire Beaumont', 'Anton Weber'],
    director: 'David Fincher-Sim',
    isLocked: true,
    lockReason: 'Widevine DRM & Parental Control PIN Protected (Default PIN: 1234)',
    unlockPin: '1234',
    topTenRank: 4
  },
  {
    id: 'emerald-haven',
    title: 'Emerald Haven: Wild Earth',
    tagline: 'Life breathes where humanity forgot to look.',
    synopsis: 'Journey through untouched cloud forests, deep bioluminescent oceanic trenches, and volcanic arches in breathtaking cinematic detail, revealing the fragile beauty of biodiversity.',
    backdropUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
    videoSources: {
      '1080p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      '720p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      '480p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      '360p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    releaseYear: 2024,
    rating: 'U',
    duration: '1h 32m',
    matchScore: 97,
    resolution: '4K Ultra HD',
    audio: 'Dolby Atmos',
    categories: ['Documentaries', 'Trending'],
    genre: 'Documentaries',
    tags: ['Nature', 'Soothing', 'Stunning Visuals', 'Wildlife'],
    cast: ['Narrated by David Attenborough-Sim'],
    director: 'Alastair Fothergill-Sim',
    topTenRank: 5
  },
  {
    id: 'neon-drifter',
    title: 'Neon Drifter: Tokyo Midnight',
    tagline: 'The streets only listen to the exhaust note.',
    synopsis: 'A skilled mechanic by day transforms into the underground legend of the Shuto Expressway, dodging syndicate enforcers and rival racers across rain-soaked asphalt.',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    videoSources: {
      '1080p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      '720p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      '480p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      '360p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
    },
    releaseYear: 2025,
    rating: 'U/A 13+',
    duration: '1h 44m',
    matchScore: 93,
    resolution: 'Full HD',
    audio: '5.1 Surround',
    categories: ['Action', 'Trending'],
    genre: 'Action',
    tags: ['Drifting', 'Synthwave', 'Midnight Races', 'Tokyo'],
    cast: ['Kenji Sato', 'Ren Tanaka', 'Hana Mori'],
    director: 'Takeshi Kitano-Sim',
    topTenRank: 6
  },
  {
    id: 'the-alchemist-code',
    title: 'The Alchemist Code',
    tagline: 'Gold is worthless. The formula is priceless.',
    synopsis: 'Centuries of medieval occult texts secretly hide the mathematical architecture of modern quantum cryptography. A symbologist races against an ancient secret society.',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    videoSources: {
      '1080p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      '720p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      '480p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      '360p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
    },
    releaseYear: 2024,
    rating: 'U/A 16+',
    duration: '2h 05m',
    matchScore: 91,
    resolution: 'Full HD',
    audio: 'Stereo',
    categories: ['Sci-Fi', 'Thrillers'],
    genre: 'Thrillers',
    tags: ['Mystery', 'Cryptic', 'Conspiracy', 'Historical Fiction'],
    cast: ['Gabriel Rossi', 'Isabella Morales', 'Simon Croft'],
    director: 'Ron Howard-Sim',
    topTenRank: 7
  },
  {
    id: 'apex-predators',
    title: 'Apex Predators: Frozen Frontiers',
    tagline: 'Survival is not negotiated.',
    synopsis: 'Filmed over four relentless winters across the Arctic circle, witness polar bears, arctic wolves, and orca pods navigating an ever-shifting icy terrain.',
    backdropUrl: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=600&q=80',
    videoSources: {
      '1080p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      '720p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      '480p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      '360p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    },
    releaseYear: 2025,
    rating: 'U',
    duration: '1h 28m',
    matchScore: 95,
    resolution: '4K Ultra HD',
    audio: 'Dolby Atmos',
    categories: ['Documentaries', 'Originals'],
    genre: 'Documentaries',
    tags: ['Nature', 'Epic Scope', 'Arctic', 'Predators'],
    cast: ['BBC Earth Expeditions Team'],
    director: 'Mark Linfield-Sim',
    isOriginal: true,
    topTenRank: 8
  },
  {
    id: 'black-lotus-protocol',
    title: 'Black Lotus: Ghost Division (VIP Locked)',
    tagline: 'They don’t exist until you cross the red line.',
    synopsis: 'A phantom black-ops military unit is deployed when an autonomous nuclear submarine stops responding to command protocols off the Mariana Trench.',
    backdropUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    videoSources: {
      '1080p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      '720p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      '480p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      '360p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
    },
    releaseYear: 2026,
    rating: 'A 18+',
    duration: '2h 10m',
    matchScore: 92,
    resolution: '4K Ultra HD',
    audio: 'Dolby 5.1',
    categories: ['Action', 'Thrillers'],
    genre: 'Action',
    tags: ['Military', 'Black-Ops', 'Restricted Content', 'Tense'],
    cast: ['Jason Vance', 'Rhea Chakraborty', 'John Miller'],
    director: 'Paul Greengrass-Sim',
    isLocked: true,
    lockReason: 'Premium VIP Subscription or Parental PIN (1234) Required',
    unlockPin: '1234',
    topTenRank: 9
  },
  {
    id: 'retro-synth-memories',
    title: 'Retro Synth: 1984 Nostalgia',
    tagline: 'Cassettes, neon dreams, and summer nights.',
    synopsis: 'Four high school friends build an FM pirate transmitter in their basement and accidentally broadcast signals that tune into parallel timelines.',
    backdropUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80',
    videoSources: {
      '1080p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
      '720p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
      '480p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
      '360p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4'
    },
    releaseYear: 2024,
    rating: 'U/A 13+',
    duration: '1h 38m',
    matchScore: 89,
    resolution: 'HD',
    audio: 'Stereo',
    categories: ['Sci-Fi', 'Originals'],
    genre: 'Sci-Fi',
    tags: ['80s Vibe', 'Coming-of-Age', 'Synthwave', 'Fun'],
    cast: ['Leo Rivera', 'Maya Lin', 'Toby Watts'],
    director: 'Duffer Brothers-Sim',
    isOriginal: true,
    topTenRank: 10
  },
  {
    id: 'monsoon-whispers',
    title: 'Monsoon Whispers',
    tagline: 'When the rain cleanses old memories.',
    synopsis: 'A heartfelt romantic drama set against the torrential monsoon rains of Kerala and Mumbai, where two estranged photographers reunite after a decade to finish an exhibition.',
    backdropUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    videoSources: {
      '1080p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
      '720p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
      '480p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
      '360p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4'
    },
    releaseYear: 2025,
    rating: 'U/A 13+',
    duration: '2h 12m',
    matchScore: 94,
    resolution: '4K Ultra HD',
    audio: '5.1 Surround',
    categories: ['Trending', 'Originals'],
    genre: 'Drama',
    tags: ['Emotional', 'Poetic', 'Acoustic', 'Heartwarming'],
    cast: ['Kabir Mehta', 'Zara Farooqui', 'Pooja Bhatt'],
    director: 'Mira Nair-Sim',
    isOriginal: true
  },
  {
    id: 'algorithmic-empire',
    title: 'The Algorithmic Empire',
    tagline: 'Who trains the model that governs mankind?',
    synopsis: 'An investigative documentary peeling back the layers of autonomous military systems, predictive policing algorithms, and the global race for artificial super-intelligence.',
    backdropUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    videoSources: {
      '1080p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
      '720p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
      '480p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
      '360p': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
    },
    releaseYear: 2026,
    rating: 'U/A 16+',
    duration: '1h 40m',
    matchScore: 96,
    resolution: 'Full HD',
    audio: 'Stereo',
    categories: ['Documentaries', 'Sci-Fi'],
    genre: 'Documentaries',
    tags: ['Eye-Opening', 'Tech Investigative', 'Provocative'],
    cast: ['Prominent AI Researchers', 'Tech Whistleblowers'],
    director: 'Alex Gibney-Sim'
  }
];

const CATEGORIES_CONFIG = [
  { id: 'trending', title: '🔥 Trending Now', filter: item => item.categories.includes('Trending') },
  { id: 'top10', title: '🏆 Top 10 in India Today', filter: item => Boolean(item.topTenRank), sort: (a, b) => (a.topTenRank || 99) - (b.topTenRank || 99) },
  { id: 'originals', title: '⭐ StreamFlix Originals', filter: item => item.isOriginal },
  { id: 'scifi', title: '🚀 Sci-Fi & Cyberpunk Visions', filter: item => item.genre === 'Sci-Fi' || item.categories.includes('Sci-Fi') },
  { id: 'action', title: '💥 Action & High-Octane Thrillers', filter: item => item.genre === 'Action' || item.categories.includes('Action') },
  { id: 'documentaries', title: '🌍 Award-Winning Documentaries', filter: item => item.genre === 'Documentaries' || item.categories.includes('Documentaries') },
  { id: 'locked', title: '🔒 Premium VIP & Protected Content', filter: item => item.isLocked }
];

function getMediaById(id) {
  if (!id) return BUNDLED_CATALOG[0];
  return BUNDLED_CATALOG.find(item => item.id === id) || BUNDLED_CATALOG[0];
}

function getRelatedItems(currentId, limit = 6) {
  const current = getMediaById(currentId);
  return BUNDLED_CATALOG
    .filter(item => item.id !== currentId && (item.genre === current.genre || item.categories.some(c => current.categories.includes(c))))
    .slice(0, limit);
}

/**
 * StreamFlix LocalStorage & State Management
 */

const STORAGE_KEYS = {
  MY_LIST: 'streamflix_my_list',
  WATCH_HISTORY: 'streamflix_watch_history',
  USER_PROFILE: 'streamflix_user_profile',
  UNLOCKED_VIDEOS: 'streamflix_unlocked_videos',
  NETWORK_PROFILE: 'streamflix_network_profile',
  STREAMING_PREFS: 'streamflix_streaming_prefs'
};

const DEFAULT_PROFILE = {
  name: 'Nitish Kumar Rawat',
  rollNo: '2415001062',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  tier: 'Premium VIP Ultra 4K',
  defaultQuality: 'auto',
  autoplayNext: true,
  dataSaver: false
};

const DEFAULT_MY_LIST = ['cyber-genesis', 'deep-cosmos-odyssey', 'emerald-haven'];

function getMyList() {
  try {
    const list = localStorage.getItem(STORAGE_KEYS.MY_LIST);
    if (!list) {
      localStorage.setItem(STORAGE_KEYS.MY_LIST, JSON.stringify(DEFAULT_MY_LIST));
      return DEFAULT_MY_LIST;
    }
    return JSON.parse(list);
  } catch (e) {
    return DEFAULT_MY_LIST;
  }
}

function isInMyList(id) {
  return getMyList().includes(id);
}

function addToMyList(id) {
  const list = getMyList();
  if (!list.includes(id)) {
    list.unshift(id);
    localStorage.setItem(STORAGE_KEYS.MY_LIST, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('streamflix:listUpdated', { detail: { id, added: true } }));
    showToast('Added to My List', 'success');
  }
}

function removeFromMyList(id) {
  let list = getMyList();
  list = list.filter(item => item !== id);
  localStorage.setItem(STORAGE_KEYS.MY_LIST, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent('streamflix:listUpdated', { detail: { id, added: false } }));
  showToast('Removed from My List', 'info');
}

function toggleMyList(id) {
  if (isInMyList(id)) {
    removeFromMyList(id);
    return false;
  } else {
    addToMyList(id);
    return true;
  }
}

function getWatchHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WATCH_HISTORY);
    return data ? JSON.parse(data) : {
      'cyber-genesis': { currentTime: 1420, duration: 8280, percentage: 17, updatedAt: new Date().toISOString() },
      'deep-cosmos-odyssey': { currentTime: 4600, duration: 9240, percentage: 50, updatedAt: new Date().toISOString() }
    };
  } catch (e) {
    return {};
  }
}

function saveWatchProgress(id, currentTime, duration) {
  try {
    const history = getWatchHistory();
    history[id] = {
      currentTime: Math.floor(currentTime),
      duration: Math.floor(duration),
      percentage: Math.min(100, Math.round((currentTime / duration) * 100)),
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.WATCH_HISTORY, JSON.stringify(history));
  } catch (e) {
    console.error('Error saving progress', e);
  }
}

function isContentUnlocked(id) {
  const item = getMediaById(id);
  if (!item.isLocked) return true;
  try {
    const unlocked = JSON.parse(localStorage.getItem(STORAGE_KEYS.UNLOCKED_VIDEOS) || '[]');
    return unlocked.includes(id);
  } catch (e) {
    return false;
  }
}

function unlockVideoWithPin(id, pin) {
  const item = getMediaById(id);
  if (pin === (item.unlockPin || '1234')) {
    const unlocked = JSON.parse(localStorage.getItem(STORAGE_KEYS.UNLOCKED_VIDEOS) || '[]');
    if (!unlocked.includes(id)) {
      unlocked.push(id);
      localStorage.setItem(STORAGE_KEYS.UNLOCKED_VIDEOS, JSON.stringify(unlocked));
    }
    showToast('VIP Access Granted! Loading video...', 'success');
    return true;
  }
  return false;
}

function getUserProfile() {
  try {
    const profile = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return profile ? JSON.parse(profile) : DEFAULT_PROFILE;
  } catch (e) {
    return DEFAULT_PROFILE;
  }
}

function saveUserProfile(profile) {
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  showToast('Profile preferences updated!', 'success');
}

function getActiveNetworkProfile() {
  const saved = localStorage.getItem(STORAGE_KEYS.NETWORK_PROFILE);
  return NETWORK_PROFILES.find(p => p.id === saved) || NETWORK_PROFILES[0];
}

function setActiveNetworkProfile(profileId) {
  localStorage.setItem(STORAGE_KEYS.NETWORK_PROFILE, profileId);
  window.dispatchEvent(new CustomEvent('streamflix:networkChanged', { detail: { profileId } }));
}

function showToast(message, type = 'info') {
  let container = document.getElementById('streamflix-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'streamflix-toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'warning') icon = '⚠️';
  if (type === 'error') icon = '❌';

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('visible'), 20);

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

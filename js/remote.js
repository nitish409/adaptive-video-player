/**
 * StreamFlix Virtual TV Remote Controller & Spatial Arrow Navigation
 * Demonstrates TV remote-style interaction across the entire 10-page platform
 */

let tvRemoteVisible = false;
let currentFocusIndex = 0;

function toggleVirtualRemote() {
  tvRemoteVisible = !tvRemoteVisible;
  let remoteEl = document.getElementById('virtual-tv-remote');
  if (!remoteEl) {
    createVirtualRemoteElement();
    remoteEl = document.getElementById('virtual-tv-remote');
  }
  if (tvRemoteVisible) {
    remoteEl.classList.add('visible');
    showToast('TV Remote Controller Activated! Use D-Pad or Arrow Keys.', 'info');
  } else {
    remoteEl.classList.remove('visible');
  }
}

function createVirtualRemoteElement() {
  const remote = document.createElement('div');
  remote.id = 'virtual-tv-remote';
  remote.className = 'virtual-tv-remote';
  remote.innerHTML = `
    <div class="remote-chassis">
      <div class="remote-header">
        <span class="remote-brand">STREAMFLIX TV</span>
        <button class="remote-close-btn" onclick="toggleVirtualRemote()">&times;</button>
      </div>

      <!-- Power & Mode -->
      <div class="remote-top-bar">
        <button class="remote-btn btn-power" onclick="window.location.href='index.html'" title="Home">⌂</button>
        <button class="remote-btn btn-info" onclick="window.location.href='browse.html'" title="Browse Catalog">🔍</button>
        <button class="remote-btn btn-hud" onclick="triggerTVAction('stats')" title="Stats HUD">D</button>
      </div>

      <!-- D-Pad Directional Nav -->
      <div class="remote-dpad">
        <button class="dpad-btn dpad-up" onclick="navigateSpatial('up')">▲</button>
        <div class="dpad-mid">
          <button class="dpad-btn dpad-left" onclick="navigateSpatial('left')">◀</button>
          <button class="dpad-btn dpad-ok" onclick="navigateSpatial('ok')">OK</button>
          <button class="dpad-btn dpad-right" onclick="navigateSpatial('right')">▶</button>
        </div>
        <button class="dpad-btn dpad-down" onclick="navigateSpatial('down')">▼</button>
      </div>

      <!-- Nav Bar Controls -->
      <div class="remote-nav-actions">
        <button class="remote-action-btn" onclick="navigateSpatial('back')">↩ Back</button>
        <button class="remote-action-btn" onclick="window.location.href='index.html'">⌂ Home</button>
      </div>

      <!-- Media Controls -->
      <div class="remote-media-controls">
        <button class="remote-btn" onclick="triggerTVAction('rewind')">⏪ 10s</button>
        <button class="remote-btn btn-playpause" onclick="triggerTVAction('playpause')">⏯</button>
        <button class="remote-btn" onclick="triggerTVAction('forward')">⏩ 10s</button>
      </div>

      <!-- Volume & Quality Controls -->
      <div class="remote-rocker-row">
        <div class="rocker-col">
          <button class="rocker-btn" onclick="triggerTVAction('volup')">VOL +</button>
          <button class="rocker-btn" onclick="triggerTVAction('voldown')">VOL -</button>
        </div>
        <div class="rocker-col">
          <button class="rocker-btn" onclick="triggerTVAction('quality')">HD / ABR</button>
          <button class="rocker-btn" onclick="triggerTVAction('fullscreen')">⛶ FULL</button>
        </div>
      </div>

      <div class="remote-footer">
        <span>Spatial Arrow Key Navigation Active</span>
      </div>
    </div>
  `;
  document.body.appendChild(remote);
}

function getSpatialElements() {
  return Array.from(document.querySelectorAll('.media-card, .btn, .nav-item, .player-control-btn, .action-circle-btn, input, select, button'))
    .filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && !el.closest('#virtual-tv-remote');
    });
}

function navigateSpatial(direction) {
  const elements = getSpatialElements();
  if (!elements.length) return;

  let current = document.activeElement;
  let currentIndex = elements.indexOf(current);

  if (direction === 'ok') {
    if (current && typeof current.click === 'function') {
      current.click();
    }
    return;
  }

  if (direction === 'back') {
    window.history.back();
    return;
  }

  if (currentIndex === -1) {
    elements[0].focus();
    elements[0].classList.add('tv-focused');
    return;
  }

  elements.forEach(el => el.classList.remove('tv-focused'));

  if (direction === 'right' || direction === 'down') {
    currentIndex = (currentIndex + 1) % elements.length;
  } else if (direction === 'left' || direction === 'up') {
    currentIndex = (currentIndex - 1 + elements.length) % elements.length;
  }

  const nextEl = elements[currentIndex];
  nextEl.focus();
  nextEl.classList.add('tv-focused');
  nextEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
}

function triggerTVAction(action) {
  window.dispatchEvent(new CustomEvent('streamflix:tvAction', { detail: { action } }));
}

// Global TV Hotkeys
window.addEventListener('keydown', (e) => {
  // If typing in input, ignore
  if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

  switch (e.key) {
    case 'ArrowUp':
      e.preventDefault();
      navigateSpatial('up');
      break;
    case 'ArrowDown':
      e.preventDefault();
      navigateSpatial('down');
      break;
    case 'ArrowLeft':
      // If on video player, player.js handles seek, otherwise navigate spatial
      if (!document.getElementById('streamflix-html5-player')) {
        navigateSpatial('left');
      }
      break;
    case 'ArrowRight':
      if (!document.getElementById('streamflix-html5-player')) {
        navigateSpatial('right');
      }
      break;
    case 'Enter':
      navigateSpatial('ok');
      break;
  }
});

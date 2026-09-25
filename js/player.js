/**
 * StreamFlix Adaptive Video Player Engine
 * HTML5 Media API + Simulated ABR Quality Switcher + Diagnostic Stats HUD
 * GLA University - Mini Project 1 (Prabhanshu Thakur - 2415001118)
 */

class StreamFlixPlayer {
  constructor() {
    this.mediaId = new URLSearchParams(window.location.search).get('id') || 'cyber-genesis';
    this.mediaItem = getMediaById(this.mediaId);
    this.currentQuality = 'auto'; // 'auto', '1080p', '720p', '480p', '360p'
    this.activeSimulatedQuality = '1080p';
    this.activeNetworkProfile = getActiveNetworkProfile();
    this.isMuted = false;
    this.statsVisible = false;
    this.qualityMenuOpen = false;
    this.networkMenuOpen = false;
    this.controlsTimeout = null;
    this.isSeeking = false;
    this.droppedFrames = 0;
    this.abrInterval = null;

    this.initDOM();
    this.attachEvents();
    this.loadMedia();
    this.startAbrMonitoring();
  }

  initDOM() {
    this.container = document.getElementById('player-container');
    this.video = document.getElementById('main-video-element');
    this.loadingSpinner = document.getElementById('player-loading-spinner');
    this.bufferingBadge = document.getElementById('player-buffering-badge');
    this.pausedBadge = document.getElementById('player-paused-badge');
    this.qualityToast = document.getElementById('player-quality-toast');
    this.statsHud = document.getElementById('player-stats-hud');

    // Controls
    this.controlsOverlay = document.getElementById('player-controls-overlay');
    this.playPauseBtn = document.getElementById('btn-play-pause');
    this.playIcon = document.getElementById('icon-play');
    this.pauseIcon = document.getElementById('icon-pause');
    this.rewindBtn = document.getElementById('btn-rewind');
    this.forwardBtn = document.getElementById('btn-forward');
    this.volumeBtn = document.getElementById('btn-volume');
    this.volumeSlider = document.getElementById('slider-volume');
    this.progressBar = document.getElementById('player-progress-bar');
    this.progressPlayed = document.getElementById('progress-played');
    this.progressBuffered = document.getElementById('progress-buffered');
    this.timeCurrent = document.getElementById('time-current');
    this.timeDuration = document.getElementById('time-duration');
    this.qualitySelectBtn = document.getElementById('btn-quality-select');
    this.qualityMenu = document.getElementById('menu-quality');
    this.currentQualityLabel = document.getElementById('label-current-quality');
    this.networkSelectBtn = document.getElementById('btn-network-select');
    this.networkMenu = document.getElementById('menu-network');
    this.currentNetworkLabel = document.getElementById('label-current-network');
    this.speedSelect = document.getElementById('select-playback-speed');
    this.fullscreenBtn = document.getElementById('btn-fullscreen');
    this.statsBtn = document.getElementById('btn-toggle-stats');
    this.playerTitle = document.getElementById('player-video-title');
    this.playerTagline = document.getElementById('player-video-tagline');

    if (this.playerTitle) this.playerTitle.textContent = this.mediaItem.title;
    if (this.playerTagline) this.playerTagline.textContent = this.mediaItem.tagline || this.mediaItem.genre;
  }

  attachEvents() {
    if (!this.video) return;

    // HTML5 Video Media Events
    this.video.addEventListener('loadstart', () => this.showLoading(true));
    this.video.addEventListener('canplay', () => this.showLoading(false));
    this.video.addEventListener('waiting', () => this.showBuffering(true));
    this.video.addEventListener('playing', () => {
      this.showBuffering(false);
      this.updatePlayPauseUI(true);
    });
    this.video.addEventListener('pause', () => {
      this.updatePlayPauseUI(false);
    });
    this.video.addEventListener('timeupdate', () => this.onTimeUpdate());
    this.video.addEventListener('progress', () => this.onBufferProgress());
    this.video.addEventListener('ended', () => this.onVideoEnded());

    // Controls Interaction
    this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
    this.rewindBtn.addEventListener('click', () => this.seekDelta(-10));
    this.forwardBtn.addEventListener('click', () => this.seekDelta(10));
    
    // Volume
    this.volumeBtn.addEventListener('click', () => this.toggleMute());
    this.volumeSlider.addEventListener('input', (e) => {
      this.video.volume = parseFloat(e.target.value);
      this.video.muted = false;
      this.updateVolumeUI();
    });

    // Seek scrubber
    this.progressBar.addEventListener('click', (e) => this.seekToClick(e));

    // Quality Selector Dropdown
    this.qualitySelectBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleQualityMenu();
    });

    // Network Simulator Dropdown
    this.networkSelectBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleNetworkMenu();
    });

    // Speed Selector
    if (this.speedSelect) {
      this.speedSelect.addEventListener('change', (e) => {
        this.video.playbackRate = parseFloat(e.target.value);
        this.showToastNotification(`Playback Speed: ${e.target.value}x`);
      });
    }

    // Fullscreen
    this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

    // Stats HUD toggle
    this.statsBtn.addEventListener('click', () => this.toggleStatsHud());

    // Mouse movement hides controls after 3s of inactivity
    this.container.addEventListener('mousemove', () => this.keepControlsVisible());
    this.container.addEventListener('mouseleave', () => {
      if (!this.video.paused) {
        this.controlsOverlay.classList.remove('active');
      }
    });

    // Close menus on click outside
    document.addEventListener('click', () => {
      if (this.qualityMenu) this.qualityMenu.classList.remove('show');
      if (this.networkMenu) this.networkMenu.classList.remove('show');
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => this.handleKeyboard(e));

    // TV Remote Action Listener
    window.addEventListener('streamflix:tvAction', (e) => {
      const { action } = e.detail;
      switch (action) {
        case 'playpause': this.togglePlayPause(); break;
        case 'rewind': this.seekDelta(-10); break;
        case 'forward': this.seekDelta(10); break;
        case 'volup': this.adjustVolume(0.1); break;
        case 'voldown': this.adjustVolume(-0.1); break;
        case 'stats': this.toggleStatsHud(); break;
        case 'quality': this.cycleQuality(); break;
        case 'fullscreen': this.toggleFullscreen(); break;
      }
    });
  }

  loadMedia() {
    const isLocked = this.mediaItem.isLocked && !isContentUnlocked(this.mediaId);
    if (isLocked) {
      showToast('This video is locked. Enter PIN 1234 to unlock.', 'warning');
      setTimeout(() => {
        window.location.href = `locked.html?id=${this.mediaId}`;
      }, 1200);
      return;
    }

    // Resume saved watch progress
    const history = getWatchHistory();
    const saved = history[this.mediaId];

    this.selectSourceForQuality(this.currentQuality, saved ? saved.currentTime : 0);
    this.renderQualityMenu();
    this.renderNetworkMenu();
    this.updateNetworkUI();
  }

  selectSourceForQuality(qualityId, resumeTime = 0) {
    const wasPlaying = !this.video.paused && this.video.currentTime > 0;
    const currentTime = resumeTime || this.video.currentTime || 0;

    let targetResolution = '1080p';
    if (qualityId === 'auto') {
      targetResolution = this.activeNetworkProfile.recommendedQuality;
    } else {
      targetResolution = qualityId;
    }

    this.activeSimulatedQuality = targetResolution;
    const videoUrl = this.mediaItem.videoSources[targetResolution] || this.mediaItem.videoSources['1080p'];

    this.showLoading(true);
    this.video.src = videoUrl;
    this.video.currentTime = currentTime;

    this.video.addEventListener('loadeddata', () => {
      this.showLoading(false);
      this.video.currentTime = currentTime;
      if (wasPlaying || resumeTime > 0) {
        this.video.play().catch(e => console.log('Autoplay prevented', e));
      }
      this.updateQualityBadge();
      this.updateStatsHud();
    }, { once: true });

    const qInfo = QUALITY_OPTIONS.find(q => q.id === targetResolution) || QUALITY_OPTIONS[1];
    this.showToastNotification(`Quality: ${qInfo.label} (${qInfo.resolution}) • ${this.currentQuality === 'auto' ? 'Auto ABR' : 'Manual'}`);
  }

  startAbrMonitoring() {
    // Dynamic ABR simulation: every 6 seconds, checks network profile conditions
    this.abrInterval = setInterval(() => {
      if (this.currentQuality !== 'auto') return;

      const profile = this.activeNetworkProfile;
      if (profile.id === 'offline') {
        // Drop network simulator triggers stall
        this.video.pause();
        this.showBuffering(true);
        this.showToastNotification('Network Dropped (0 Mbps)! Buffering depleted...', 'error');
        return;
      }

      const rec = profile.recommendedQuality;
      if (rec !== this.activeSimulatedQuality) {
        this.activeSimulatedQuality = rec;
        const qInfo = QUALITY_OPTIONS.find(q => q.id === rec);
        this.showToastNotification(`Adaptive Switch: Network throughput (${profile.badge}) &rarr; ${qInfo.label}`, 'info');
        this.updateQualityBadge();
        this.updateStatsHud();
      }
    }, 6000);
  }

  togglePlayPause() {
    if (this.video.paused) {
      if (this.activeNetworkProfile.id === 'offline') {
        showToast('Cannot play: Simulated network is offline! Change network profile to resume.', 'error');
        return;
      }
      this.video.play();
    } else {
      this.video.pause();
    }
  }

  seekDelta(seconds) {
    this.video.currentTime = Math.max(0, Math.min(this.video.duration, this.video.currentTime + seconds));
    this.showToastNotification(`${seconds > 0 ? '+' : ''}${seconds}s (${this.formatTime(this.video.currentTime)})`);
  }

  seekToClick(e) {
    const rect = this.progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    this.video.currentTime = pos * this.video.duration;
  }

  toggleMute() {
    this.video.muted = !this.video.muted;
    this.updateVolumeUI();
  }

  adjustVolume(delta) {
    this.video.volume = Math.max(0, Math.min(1, this.video.volume + delta));
    this.video.muted = false;
    this.volumeSlider.value = this.video.volume;
    this.updateVolumeUI();
  }

  updateVolumeUI() {
    const v = this.video.muted ? 0 : this.video.volume;
    this.volumeSlider.value = v;
    if (v === 0) {
      this.volumeBtn.innerHTML = '🔇';
    } else if (v < 0.5) {
      this.volumeBtn.innerHTML = '🔉';
    } else {
      this.volumeBtn.innerHTML = '🔊';
    }
  }

  onTimeUpdate() {
    if (!this.video.duration) return;
    const progress = (this.video.currentTime / this.video.duration) * 100;
    this.progressPlayed.style.width = `${progress}%`;
    this.timeCurrent.textContent = this.formatTime(this.video.currentTime);
    this.timeDuration.textContent = this.formatTime(this.video.duration);

    // Save to localStorage watch history every few seconds
    if (Math.floor(this.video.currentTime) % 4 === 0) {
      saveWatchProgress(this.mediaId, this.video.currentTime, this.video.duration);
    }

    if (this.statsVisible) {
      this.updateStatsHud();
    }
  }

  onBufferProgress() {
    if (!this.video.duration || this.video.buffered.length === 0) return;
    const bufferedEnd = this.video.buffered.end(this.video.buffered.length - 1);
    const bufferedPercent = (bufferedEnd / this.video.duration) * 100;
    this.progressBuffered.style.width = `${bufferedPercent}%`;
  }

  onVideoEnded() {
    this.updatePlayPauseUI(false);
    this.showNextEpisodeModal();
  }

  updatePlayPauseUI(isPlaying) {
    if (isPlaying) {
      this.playIcon.style.display = 'none';
      this.pauseIcon.style.display = 'block';
      this.pausedBadge.classList.remove('show');
    } else {
      this.playIcon.style.display = 'block';
      this.pauseIcon.style.display = 'none';
      if (!this.video.seeking && this.activeNetworkProfile.id !== 'offline') {
        this.pausedBadge.classList.add('show');
      }
    }
  }

  showLoading(show) {
    if (show) {
      this.loadingSpinner.classList.add('show');
    } else {
      this.loadingSpinner.classList.remove('show');
    }
  }

  showBuffering(show) {
    if (show) {
      this.bufferingBadge.classList.add('show');
    } else {
      this.bufferingBadge.classList.remove('show');
    }
  }

  renderQualityMenu() {
    if (!this.qualityMenu) return;
    this.qualityMenu.innerHTML = '';
    QUALITY_OPTIONS.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = `menu-item ${this.currentQuality === opt.id ? 'active' : ''}`;
      btn.innerHTML = `
        <span class="opt-label">${opt.label}</span>
        <span class="opt-tag">${opt.tag}</span>
      `;
      btn.addEventListener('click', () => {
        this.setQuality(opt.id);
        this.qualityMenu.classList.remove('show');
      });
      this.qualityMenu.appendChild(btn);
    });
  }

  setQuality(qualityId) {
    this.currentQuality = qualityId;
    this.selectSourceForQuality(qualityId);
    this.renderQualityMenu();
  }

  cycleQuality() {
    const ids = QUALITY_OPTIONS.map(q => q.id);
    const idx = ids.indexOf(this.currentQuality);
    const nextId = ids[(idx + 1) % ids.length];
    this.setQuality(nextId);
  }

  updateQualityBadge() {
    if (this.currentQualityLabel) {
      const q = QUALITY_OPTIONS.find(opt => opt.id === this.activeSimulatedQuality);
      this.currentQualityLabel.textContent = this.currentQuality === 'auto' ? `Auto (${q.tag})` : q.tag;
    }
  }

  renderNetworkMenu() {
    if (!this.networkMenu) return;
    this.networkMenu.innerHTML = '';
    NETWORK_PROFILES.forEach(profile => {
      const btn = document.createElement('button');
      btn.className = `menu-item ${this.activeNetworkProfile.id === profile.id ? 'active' : ''}`;
      btn.innerHTML = `
        <span class="opt-icon">${profile.icon}</span>
        <div class="opt-col">
          <span class="opt-title">${profile.name}</span>
          <span class="opt-sub">${profile.badge} • ${profile.latencyMs}ms</span>
        </div>
      `;
      btn.addEventListener('click', () => {
        this.setNetworkProfile(profile.id);
        this.networkMenu.classList.remove('show');
      });
      this.networkMenu.appendChild(btn);
    });
  }

  setNetworkProfile(profileId) {
    const profile = NETWORK_PROFILES.find(p => p.id === profileId) || NETWORK_PROFILES[0];
    this.activeNetworkProfile = profile;
    setActiveNetworkProfile(profileId);
    this.updateNetworkUI();
    this.renderNetworkMenu();

    if (profile.id === 'offline') {
      this.video.pause();
      this.showBuffering(true);
      this.showToastNotification('Network Dropped (0 Mbps)! Video playback stalled.', 'error');
    } else {
      this.showBuffering(false);
      this.showToastNotification(`Network Switched: ${profile.name}`, 'info');
      if (this.currentQuality === 'auto') {
        this.selectSourceForQuality('auto');
      }
    }
    this.updateStatsHud();
  }

  updateNetworkUI() {
    if (this.currentNetworkLabel) {
      this.currentNetworkLabel.textContent = `${this.activeNetworkProfile.icon} ${this.activeNetworkProfile.badge}`;
    }
  }

  toggleQualityMenu() {
    this.qualityMenu.classList.toggle('show');
    if (this.networkMenu) this.networkMenu.classList.remove('show');
  }

  toggleNetworkMenu() {
    this.networkMenu.classList.toggle('show');
    if (this.qualityMenu) this.qualityMenu.classList.remove('show');
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.container.requestFullscreen().catch(err => {
        alert(`Fullscreen request failed: ${err.message}`);
      });
      this.fullscreenBtn.innerHTML = '⛶';
    } else {
      document.exitFullscreen();
      this.fullscreenBtn.innerHTML = '⛶';
    }
  }

  toggleStatsHud() {
    this.statsVisible = !this.statsVisible;
    if (this.statsVisible) {
      this.statsHud.classList.add('show');
      this.updateStatsHud();
    } else {
      this.statsHud.classList.remove('show');
    }
  }

  updateStatsHud() {
    if (!this.statsVisible || !this.statsHud) return;

    const q = QUALITY_OPTIONS.find(opt => opt.id === this.activeSimulatedQuality) || QUALITY_OPTIONS[1];
    let bufferSec = 0;
    if (this.video.buffered.length > 0) {
      const cur = this.video.currentTime;
      for (let i = 0; i < this.video.buffered.length; i++) {
        if (this.video.buffered.start(i) <= cur && cur <= this.video.buffered.end(i)) {
          bufferSec = Math.max(0, this.video.buffered.end(i) - cur);
          break;
        }
      }
    }

    this.statsHud.innerHTML = `
      <div class="stats-header">
        <span class="stats-title">📊 Stats for Nerds / Netflix Diagnostic HUD</span>
        <button class="stats-close" onclick="window.playerInstance.toggleStatsHud()">&times;</button>
      </div>
      <div class="stats-grid">
        <div class="stats-row"><span class="k">Video ID / Title:</span> <span class="v">${this.mediaId} (${this.mediaItem.title})</span></div>
        <div class="stats-row"><span class="k">Active Resolution:</span> <span class="v highlight">${q.resolution} @ 60fps</span></div>
        <div class="stats-row"><span class="k">Encoded Bitrate:</span> <span class="v">${q.bitrateKbps || 6500} kbps (HEVC / H.265)</span></div>
        <div class="stats-row"><span class="k">Audio Format:</span> <span class="v">${this.mediaItem.audio || 'Dolby Atmos 5.1'}</span></div>
        <div class="stats-row"><span class="k">Buffer Health:</span> <span class="v">${bufferSec.toFixed(1)}s [${Math.min(100, Math.round(bufferSec * 4))}%]</span></div>
        <div class="stats-row"><span class="k">Simulated Network:</span> <span class="v">${this.activeNetworkProfile.name} (${this.activeNetworkProfile.latencyMs}ms)</span></div>
        <div class="stats-row"><span class="k">ABR Quality Mode:</span> <span class="v">${this.currentQuality === 'auto' ? 'Auto Dynamic Stream ABR' : 'Manual Lock'}</span></div>
        <div class="stats-row"><span class="k">Current Timestamp:</span> <span class="v">${this.formatTime(this.video.currentTime)} / ${this.formatTime(this.video.duration || 0)}</span></div>
        <div class="stats-row"><span class="k">Viewport Dimensions:</span> <span class="v">${window.innerWidth} x ${window.innerHeight} (DPR: ${window.devicePixelRatio || 1})</span></div>
      </div>
    `;
  }

  showToastNotification(msg, type = 'info') {
    if (!this.qualityToast) return;
    this.qualityToast.textContent = msg;
    this.qualityToast.className = `player-toast-banner show ${type}`;
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.qualityToast.classList.remove('show');
    }, 2800);
  }

  showNextEpisodeModal() {
    const related = getRelatedItems(this.mediaId, 1)[0] || BUNDLED_CATALOG[0];
    let overlay = document.getElementById('player-upnext-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'player-upnext-overlay';
      overlay.className = 'player-upnext-overlay';
      this.container.appendChild(overlay);
    }

    let countdown = 10;
    overlay.innerHTML = `
      <div class="upnext-card">
        <span class="upnext-tag">UP NEXT IN <span id="countdown-val">${countdown}</span>s</span>
        <h3 class="upnext-title">${related.title}</h3>
        <p class="upnext-synopsis">${related.synopsis.slice(0, 100)}...</p>
        <div class="upnext-actions">
          <button class="btn btn-primary" onclick="window.location.href='player.html?id=${related.id}'">▶ Watch Now</button>
          <button class="btn btn-secondary" onclick="document.getElementById('player-upnext-overlay').remove()">Cancel</button>
        </div>
      </div>
    `;

    const timer = setInterval(() => {
      countdown--;
      const valEl = document.getElementById('countdown-val');
      if (valEl) valEl.textContent = countdown;
      if (countdown <= 0) {
        clearInterval(timer);
        window.location.href = `player.html?id=${related.id}`;
      }
    }, 1000);
  }

  keepControlsVisible() {
    this.controlsOverlay.classList.add('active');
    clearTimeout(this.controlsTimeout);
    this.controlsTimeout = setTimeout(() => {
      if (!this.video.paused && !this.statsVisible) {
        this.controlsOverlay.classList.remove('active');
      }
    }, 3500);
  }

  formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const s = Math.floor(seconds);
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;

    const pad = (n) => String(n).padStart(2, '0');
    if (hrs > 0) {
      return `${hrs}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
  }

  handleKeyboard(e) {
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;

    switch (e.key) {
      case ' ':
      case 'k':
      case 'K':
        e.preventDefault();
        this.togglePlayPause();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.seekDelta(-10);
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.seekDelta(10);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.adjustVolume(0.1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.adjustVolume(-0.1);
        break;
      case 'm':
      case 'M':
        e.preventDefault();
        this.toggleMute();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        this.toggleFullscreen();
        break;
      case 'd':
      case 'D':
        e.preventDefault();
        this.toggleStatsHud();
        break;
      case 'q':
      case 'Q':
        e.preventDefault();
        this.toggleQualityMenu();
        break;
      case 'Escape':
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          window.location.href = `details.html?id=${this.mediaId}`;
        }
        break;
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('player-container')) {
    window.playerInstance = new StreamFlixPlayer();
  }
});

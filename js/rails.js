/**
 * StreamFlix Horizontal Scrolling Rails & Card Components
 */

function createMediaCard(item, rank = null) {
  const inList = isInMyList(item.id);
  const unlocked = isContentUnlocked(item.id);

  const card = document.createElement('div');
  card.className = 'media-card';
  card.setAttribute('tabindex', '0');
  card.setAttribute('data-id', item.id);

  card.innerHTML = `
    <div class="card-inner">
      <div class="poster-container">
        <img src="${item.posterUrl}" alt="${item.title}" class="card-poster" loading="lazy" />
        ${rank ? `<span class="card-rank">${rank}</span>` : ''}
        ${item.isLocked && !unlocked ? `<span class="card-locked-badge">🔒 LOCKED VIP</span>` : ''}
        ${item.isOriginal ? `<span class="card-original-badge">N ORIGINAL</span>` : ''}
      </div>

      <!-- Hover expansion popover -->
      <div class="card-hover-info">
        <div class="hover-backdrop" style="background-image: url('${item.backdropUrl}')">
          <div class="hover-overlay"></div>
          <button class="hover-play-btn" onclick="handleCardPlay('${item.id}')" title="Play Video">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </button>
        </div>

        <div class="hover-content">
          <h4 class="hover-title">${item.title}</h4>
          
          <div class="hover-actions">
            <button class="action-circle-btn play-circle" onclick="handleCardPlay('${item.id}')" title="Play">
              ▶
            </button>
            <button class="action-circle-btn ${inList ? 'in-list' : ''}" onclick="handleToggleList('${item.id}', this)" title="${inList ? 'Remove from My List' : 'Add to My List'}">
              ${inList ? '✓' : '＋'}
            </button>
            <a href="details.html?id=${item.id}" class="action-circle-btn info-circle" title="View Full Details">
              ℹ
            </a>
          </div>

          <div class="hover-meta">
            <span class="match-score">${item.matchScore}% Match</span>
            <span class="cert-badge">${item.rating}</span>
            <span class="duration-badge">${item.duration}</span>
            <span class="hd-badge">4K</span>
          </div>

          <p class="hover-synopsis">${item.synopsis.slice(0, 110)}...</p>

          <div class="hover-tags">
            ${item.tags.slice(0, 3).map(tag => `<span class="hover-tag-pill">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  // Click card navigates to details or player
  card.addEventListener('click', (e) => {
    // If clicking action buttons, do not trigger card navigation
    if (e.target.closest('.action-circle-btn') || e.target.closest('.hover-play-btn')) return;
    window.location.href = `details.html?id=${item.id}`;
  });

  return card;
}

function handleCardPlay(id) {
  const item = getMediaById(id);
  if (item.isLocked && !isContentUnlocked(id)) {
    window.location.href = `locked.html?id=${id}`;
  } else {
    window.location.href = `player.html?id=${id}`;
  }
}

function handleToggleList(id, buttonElement) {
  const added = toggleMyList(id);
  if (buttonElement) {
    if (added) {
      buttonElement.textContent = '✓';
      buttonElement.classList.add('in-list');
      buttonElement.title = 'Remove from My List';
    } else {
      buttonElement.textContent = '＋';
      buttonElement.classList.remove('in-list');
      buttonElement.title = 'Add to My List';
    }
  }
}

function renderContentRail(containerId, config) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let items = BUNDLED_CATALOG.filter(config.filter);
  if (config.sort) {
    items = [...items].sort(config.sort);
  }

  const railSection = document.createElement('section');
  railSection.className = 'content-rail-section';
  railSection.innerHTML = `
    <div class="rail-header">
      <h3 class="rail-title">${config.title}</h3>
      <a href="category.html?cat=${config.id}" class="rail-explore-all">Explore All &rsaquo;</a>
    </div>
    <div class="rail-viewport">
      <button class="rail-nav-btn rail-prev" aria-label="Scroll left">&lsaquo;</button>
      <div class="rail-slider" id="slider-${config.id}"></div>
      <button class="rail-nav-btn rail-next" aria-label="Scroll right">&rsaquo;</button>
    </div>
  `;

  const slider = railSection.querySelector(`#slider-${config.id}`);
  items.forEach((item, index) => {
    const rank = config.id === 'top10' ? (index + 1) : null;
    slider.appendChild(createMediaCard(item, rank));
  });

  // Rail scroll logic
  const prevBtn = railSection.querySelector('.rail-prev');
  const nextBtn = railSection.querySelector('.rail-next');

  prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -slider.clientWidth * 0.75, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: slider.clientWidth * 0.75, behavior: 'smooth' });
  });

  container.appendChild(railSection);
}

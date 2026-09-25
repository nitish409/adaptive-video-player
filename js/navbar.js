/**
 * StreamFlix Site-Wide Unified Navbar & Synopsis Modal
 */

function renderNavbar(activePage = 'home') {
  const navContainer = document.getElementById('site-navbar');
  if (!navContainer) return;

  const profile = getUserProfile();

  navContainer.className = 'sf-navbar';
  navContainer.innerHTML = `
    <div class="navbar-content">
      <div class="navbar-left">
        <a href="index.html" class="navbar-brand">
          <span class="brand-text">STREAM<span class="brand-red">FLIX</span></span>
          <span class="brand-badge">ADAPTIVE</span>
        </a>
        <nav class="navbar-links">
          <a href="index.html" class="nav-item ${activePage === 'home' ? 'active' : ''}">Home</a>
          <a href="browse.html" class="nav-item ${activePage === 'browse' ? 'active' : ''}">Browse</a>
          <a href="category.html" class="nav-item ${activePage === 'category' ? 'active' : ''}">Categories</a>
          <a href="mylist.html" class="nav-item ${activePage === 'mylist' ? 'active' : ''}">My List</a>
          <a href="locked.html" class="nav-item ${activePage === 'locked' ? 'active' : ''}">Locked VIP 🔒</a>
        </nav>
      </div>

      <div class="navbar-right">
        <!-- Live Search Bar -->
        <div class="nav-search-box">
          <button class="search-btn" id="search-toggle-btn" title="Search">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <input type="text" id="navbar-search-input" class="search-input" placeholder="Titles, genres, cast..." />
        </div>

        <!-- Virtual TV Remote Toggle -->
        <button class="remote-toggle-btn" id="btn-toggle-tv-remote" onclick="toggleVirtualRemote()" title="Toggle Virtual TV Remote">
          📺 <span class="remote-label">TV Remote</span>
        </button>

        <!-- User Profile Dropdown -->
        <div class="nav-profile-menu">
          <button class="profile-pill-btn" id="profile-dropdown-btn">
            <img src="${profile.avatar}" alt="Avatar" class="nav-avatar" />
            <span class="nav-username">${profile.name.split(' ')[0]}</span>
            <svg class="chevron-down" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
          </button>
          <div class="profile-dropdown-dropdown" id="profile-menu-dropdown">
            <div class="dropdown-header">
              <p class="user-fullname">${profile.name}</p>
              <span class="user-tier-tag">${profile.tier}</span>
            </div>
            <hr class="dropdown-divider" />
            <a href="profile.html" class="dropdown-link">👤 My Profile & History</a>
            <a href="mylist.html" class="dropdown-link">📑 My Watchlist</a>
            <a href="locked.html" class="dropdown-link">🔐 VIP Pass & DRM Gate</a>
            <a href="login.html" class="dropdown-link">🔑 Switch Account / Login</a>
            <hr class="dropdown-divider" />
          </div>
        </div>

        <!-- Mobile Hamburger -->
        <button class="mobile-menu-toggle" id="mobile-hamburger-btn">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <div class="mobile-drawer" id="mobile-nav-drawer">
      <a href="index.html" class="drawer-link ${activePage === 'home' ? 'active' : ''}">Home</a>
      <a href="browse.html" class="drawer-link ${activePage === 'browse' ? 'active' : ''}">Browse</a>
      <a href="category.html" class="drawer-link ${activePage === 'category' ? 'active' : ''}">Categories</a>
      <a href="mylist.html" class="drawer-link ${activePage === 'mylist' ? 'active' : ''}">My List</a>
      <a href="locked.html" class="drawer-link ${activePage === 'locked' ? 'active' : ''}">Locked VIP 🔒</a>
      <a href="search.html" class="drawer-link ${activePage === 'search' ? 'active' : ''}">Search</a>
      <a href="profile.html" class="drawer-link ${activePage === 'profile' ? 'active' : ''}">Profile & Settings</a>
      <a href="login.html" class="drawer-link">Sign In / Switch</a>
    </div>
  `;

  // Attach search behavior
  const searchInput = document.getElementById('navbar-search-input');
  const searchBtn = document.getElementById('search-toggle-btn');
  if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', () => {
      searchInput.classList.toggle('expanded');
      if (searchInput.classList.contains('expanded')) {
        searchInput.focus();
      }
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && searchInput.value.trim()) {
        window.location.href = `search.html?q=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }

  // Profile dropdown toggle
  const profileBtn = document.getElementById('profile-dropdown-btn');
  const profileDropdown = document.getElementById('profile-menu-dropdown');
  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle('show');
    });
    document.addEventListener('click', () => {
      profileDropdown.classList.remove('show');
    });
  }

  // Mobile drawer toggle
  const mobileBtn = document.getElementById('mobile-hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });
  }

  // Navbar glassmorphism scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navContainer.classList.add('scrolled');
    } else {
      navContainer.classList.remove('scrolled');
    }
  });
}

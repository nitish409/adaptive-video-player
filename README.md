# StreamFlix - Adaptive Video Player & Content Browsing Experience
> **GLA University Mini Project - 1 (Batch 8, Section AE)**  
> **Faculty Guide:** Satyam Kumar Jha  
> **Built by:** Nitish Kumar Rawat, Pallavit Yadav, Prabhanshu Thakur, Piyush Kumar Yadav, and Prince.

---

## 🌟 Overview & Architecture
StreamFlix is a 10-page frontend-only streaming website built using pure **HTML5, CSS3, and JavaScript**. There are **no backend or database dependencies**—all states (Watchlist, Watch Progress, Unlocked PINs, Profiles) are maintained seamlessly via the browser's `localStorage`.

### 📄 The 10 Webpages
1. `index.html` - Home Page with featured Hero banner and horizontal content rails.
2. `browse.html` - Full catalog browsing with multi-parameter filtering (Genre, Year, Maturity, Sorting).
3. `category.html` - Dedicated category showcase with spotlights and deep dives.
4. `search.html` - Instant live keyword search with zero-delay results and recommendations.
5. `player.html` - Custom HTML5 Adaptive Video Player with ABR, Buffering indicator, and Stats HUD.
6. `details.html` - In-depth movie metadata, chapter selection, cast, and specs.
7. `login.html` - Netflix-style dark translucent authentication with demo switchers.
8. `signup.html` - Multi-tier plan selection (Mobile, Standard, VIP Premium).
9. `mylist.html` - Personal watchlist with instant removal and persistence.
10. `locked.html` - VIP Protected content gate with interactive PIN pad (`1234`).
11. `profile.html` - User profile, playback preferences, and continue-watching timeline.

---

## 🚀 How to Run the Website
Because StreamFlix is built purely in vanilla HTML5, CSS3, and JavaScript, you can run it in multiple ways:

### Option 1: Direct Browser Launch
Simply double-click `index.html` to open it in **Google Chrome**, **Microsoft Edge**, or **Mozilla Firefox**.

### Option 2: Lightweight Local Web Server
If you prefer running via HTTP:
```bash
# Using Python
python -m http.server 8080

# Using Node / npx
npx serve .
```
Then visit: `http://localhost:8080/`

---

## 🎮 Interactive Features to Test
- **HTML5 Adaptive Video Player (`player.html`)**:
  - Scrub progress bar, volume slider, playback speed (0.5x to 2x), fullscreen.
  - **Quality Switcher**: Toggle between Auto (ABR), 1080p, 720p, 480p, 360p.
  - **Network Simulator**: Switch between Fiber (100 Mbps), 4G (25 Mbps), 3G (4 Mbps), Edge (700 Kbps), or Offline Drop to see buffering stall!
  - **Stats for Nerds HUD**: Press `D` or click the 📊 icon to open the Netflix diagnostic overlay.
- **TV Remote Navigation**:
  - Click the **📺 TV Remote** button in the header or use arrow keys on your keyboard (`Up`, `Down`, `Left`, `Right`, `Enter`).
- **Protected Content & Parental Control**:
  - Navigate to `locked.html` or click any locked title.
  - Enter Default PIN `1234` on the keypad to unlock!
- **GLA Synopsis Modal**:
  - Click **🎓 GLA Synopsis** in the header to view the team members, university details, and objective checklist.

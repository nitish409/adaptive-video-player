# Adaptive Video Player & Content Browsing Experience

> **Live demo:** [https://nitish409.github.io/adaptive-video-player/](https://nitish409.github.io/adaptive-video-player/)

An end-to-end, high-performance media browsing and playback application built entirely with client-side logic against a bundled video and metadata catalog. StreamFlix emulates the seamless experience of modern streaming services with adaptive-quality indicators, buffering states, locked-content overlays, and 10-foot TV remote navigation.

## 📋 Project Overview

This project is a rich media-browsing and playback experience built with client-side logic against a bundled video and metadata catalog. It includes a Netflix-style catalog, simulated adaptive bitrate switching, buffering recovery states, content-protection flows, and keyboard/remote navigation.

## 🌟 Key Features

### Netflix-style browsing

- Cinematic hero banner with featured titles, previews, metadata, synopsis, and playback actions.
- Dynamic horizontal content rails for trending, recommended, premium, sci-fi, nature, and animated titles.
- Interactive media cards with hover/focus states, trailers, duration, age classification, and quick actions.
- Detailed metadata views with cast, chapters, technical stream specifications, audio, and subtitle tracks.

### 10-foot keyboard and remote navigation

- D-pad navigation with the arrow keys across heroes, rails, cards, and player controls.
- `Enter` / `Return` to select items and trigger playback.
- `Escape` / `Backspace` to go back or close dialogs.
- Visual focus rings and an on-screen virtual remote for keyboard, mouse, and touch testing.

### Simulated adaptive bitrate (ABR)

The player simulates network-aware quality selection across these profiles:

- **2160p (4K UHD):** 18.5 Mbps — HEVC / H.265, 60 fps
- **1080p (Full HD):** 6.2 Mbps — AVC / H.264, 60 fps
- **720p (HD):** 3.1 Mbps — AVC / H.264, 30 fps
- **480p (SD):** 1.4 Mbps — AVC / H.264, 30 fps
- **360p (Low):** 650 Kbps — AVC / H.264, 24 fps

Network throttling controls, quality badges, and toast notifications make quality changes visible during playback.

### Buffering and content protection

- Forward-buffer health tracking and stall recovery simulation.
- One-click buffer underrun simulation.
- Simulated DRM states for Widevine L1, PlayReady, and FairPlay Streaming.
- PIN/key-token authorization flow for locked content, including a simulated license handshake.

### Stream diagnostics

The “Stats for Nerds” overlay displays viewport resolution, current and optimal rendition, estimated bandwidth, latency, forward buffer health, dropped frames, codec details, and DRM security state.

## 📄 Application Pages

1. `index.html` — Home page with featured hero banner and content rails.
2. `browse.html` — Catalog browsing with genre, year, maturity, and sorting filters.
3. `category.html` — Category showcase with spotlights and deep dives.
4. `search.html` — Live keyword search and recommendations.
5. `player.html` — Custom HTML5 adaptive video player.
6. `details.html` — Movie metadata, chapters, cast, and specifications.
7. `login.html` — Demo authentication page.
8. `signup.html` — Mobile, Standard, and VIP Premium plan selection.
9. `mylist.html` — Persistent personal watchlist.
10. `locked.html` — Protected-content gate with PIN pad.
11. `profile.html` — Playback preferences and continue-watching timeline.

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Markup | HTML5 | Application structure and media elements |
| Styling | CSS3 | Responsive dark streaming interface and focus states |
| Logic | JavaScript | Catalog, navigation, player simulation, and persistence |

## 🚀 Getting Started

### Prerequisites

- Node.js v18.0.0 or later
- npm v9.0.0 or later

### Installation and local development

```bash
git clone https://github.com/nitish409/adaptive-video-player.git
cd adaptive-video-player
npm install
npm run dev
```

Open `http://localhost:5173` in your browser. To create a production build, run:

```bash
npm run build
```

For a static-only preview, the site can also be served with a lightweight web server:

```bash
python -m http.server 8080
```

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `↑` `↓` `←` `→` | Navigate active focus |
| `Enter` / `Return` | Select or play |
| `Space` | Toggle play/pause |
| `Escape` / `Backspace` | Back or close a modal |
| `F` | Toggle fullscreen |
| `M` | Toggle mute |
| `C` | Cycle subtitles |
| `Q` | Open quality menu |
| `S` | Toggle Stats for Nerds |
| `B` | Simulate a buffer stall |
| `R` | Toggle the virtual TV remote |
| `?` | Show shortcut reference |

## 🧪 Demonstration Checklist

1. Browse the horizontal rails and test focus movement with the arrow keys.
2. Open the virtual remote with the floating remote icon or by pressing `R`.
3. Open a video and switch from Fiber to throttled 3G in the network controls.
4. Use **Simulate Stall** or press `B` to observe buffer starvation and recovery.
5. Open a protected title and run the simulated license acquisition flow.

## 📄 License and Attribution

- Open-source test media and trailers are sourced from Blender Foundation open-movie projects, including *Tears of Steel*, *Big Buck Bunny*, *Sintel*, and *Elephants Dream*, under their respective Creative Commons licenses.
- Developed as a college project for media streaming systems and modern web architecture.

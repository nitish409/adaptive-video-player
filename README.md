# Adaptive Video Player & Content Browsing Experience

An end-to-end, high-performance media browsing and playback application built entirely with client-side logic against a bundled video and metadata catalog.

Designed to emulate the seamless user experience of modern streaming giants (such as Netflix, Apple TV, and Disney+) with a specialized 10-foot TV remote navigation model, an interactive simulated Adaptive Bitrate (ABR) engine, buffering state transitions, and a DRM content-protection locked overlay.

---

## 📋 Project Specifications & Requirements

This project addresses the college curriculum specification:

> **"A rich media-browsing and playback experience built entirely with client-side logic against a bundled video/metadata catalog. The player UI must simulate adaptive-quality switching indicators, buffering states, and a content-protection style 'locked' overlay purely as UI states, alongside a Netflix-style browsing rail with keyboard and remote-style navigation."**

---

## 🌟 Key Features & Architectural Highlights

### 1. 🎬 Netflix-Style Content Browsing Experience
* **Cinematic Hero Banner**: Features highlighted titles with auto-playing previews, high-resolution backdrops, metadata tags (4K UHD, HDR, Dolby Atmos, 98% Match), synopsis, and direct playback triggers.
* **Dynamic Horizontal Rails**: Horizontally scrolling content rails organized by genres and categories:
  * *🔥 Trending Now*
  * *⭐ Top 10 Picks for You*
  * *🔒 DRM Protected Vault & Premium Tiers*
  * *🚀 Sci-Fi & Cybernetic Frontiers*
  * *🌿 Earth & Nature Masterpieces*
  * *🎬 Award-Winning Animated Cinema*
* **Interactive Media Cards**: Rich hover and focus states displaying trailer previews, duration, age classification, and quick actions (Play, Add to My List, Like, Detailed Info).
* **Deep Metadata Modal**: Displays synopsis, full cast and crew, chapter marks, technical stream specifications, and available audio/subtitle tracks.

### 2. 🎮 10-Foot Keyboard & Remote-Style Navigation
* **True D-Pad Navigation**: Full keyboard navigation mimicking a Smart TV remote control:
  * `Arrow Keys` (`Up`, `Down`, `Left`, `Right`): Seamless focus movement across hero banners, rail cards, and player controls.
  * `Enter` / `Return`: Select, trigger playback, or confirm actions.
  * `Escape` / `Backspace`: Return to catalog or exit current modal.
* **Visual Focus Rings**: Custom glowing focus indicators (`tv-focused-card`) with smooth spring scaling to simulate lean-back television viewing.
* **On-Screen Virtual Remote Control**: Toggleable interactive software remote widget allowing evaluators on laptops or mobile devices to test D-pad and TV controls using touch or mouse clicks.

### 3. ⚡ Simulated Adaptive Bitrate (ABR) & Quality Switching
* **Client-Side ABR Engine**: Continuously assesses simulated network throughput and forward buffer health to dynamically switch between video quality profiles:
  * **2160p (4K UHD)**: 18.5 Mbps — HEVC / H.265 (60 fps)
  * **1080p (Full HD)**: 6.2 Mbps — AVC / H.264 (60 fps)
  * **720p (HD)**: 3.1 Mbps — AVC / H.264 (30 fps)
  * **480p (SD)**: 1.4 Mbps — AVC / H.264 (30 fps)
  * **360p (Low)**: 650 Kbps — AVC / H.264 (24 fps)
* **Adaptive Quality Switching Indicators**: Real-time non-intrusive toast banners and player HUD badges indicating dynamic stream upscaling and downscaling events (e.g., *"Downscaling to 720p 60fps due to bandwidth drop"*).
* **Interactive Network Throttling Console**: Evaluators can dynamically change network conditions (*Gigabit Fiber*, *Broadband 15 Mbps*, *4G 4 Mbps*, *Throttled 3G 1.2 Mbps*, *Congested 0.5 Mbps*, or *Offline*) to observe the ABR algorithm adapt in real time.

### 4. ⏳ Buffering States & Stall Simulation
* **Buffer Health Tracking**: Real-time visualization of buffered seconds ahead of the playhead.
* **Graceful Stall Recovery**: Animated branding spinner displaying buffer progress percentage and recovery threshold countdown.
* **One-Click Stall Simulation**: Interactive trigger to simulate sudden buffer underrun and evaluate playback recovery mechanics.

### 5. 🔒 Content-Protection 'Locked' Overlay (Simulated DRM)
* **Pure UI State DRM Model**: Gated items simulate hardware-backed digital rights management (Widevine L1, PlayReady, and FairPlay Streaming).
* **Encrypted Content UI**:
  * Warning states for encrypted payloads and HDCP 2.2 compliant display requirements.
  * Simulated cryptographic key acquisition challenge and response handshake animation.
  * Interactive PIN / Key Token authorization to unlock and resume playback seamlessly.

### 6. 📊 Stream Diagnostics ("Stats for Nerds")
* Transparent diagnostic overlay inspired by YouTube and Netflix displaying:
  * Viewport / Display Resolution
  * Current vs. Optimal Rendition
  * Estimated Bandwidth & Network Latency
  * Forward Buffer Health (seconds)
  * Dropped Frames & Codec Details
  * DRM Security State

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | [React 19](https://react.dev/) | Client-side reactive UI & state architecture |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe data contracts, stream profiles, & media types |
| **Bundler & Tooling** | [Vite](https://vite.dev/) | Ultra-fast HMR and optimized production bundling |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern utility-first styling with dark-mode defaults |
| **Icons** | [Lucide React](https://lucide.dev/) | High-clarity iconography for TV controls and media state |

---

## 🔄 System Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                 Bundled Media Catalog                       │
│    (Metadata, Open Video Streams, DRM Flags, Chapters)       │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌───────────────────────────┐         ┌───────────────────────────┐
│ Netflix-Style Browsing UI │         │ TV Remote Navigation      │
│  - Hero Auto-Preview      │         │  - D-Pad Arrow Navigation │
│  - Horizontal Rail Engine │◄───────►│  - Focus Management       │
│  - Media Modal Dialogs    │         │  - Virtual Remote Widget  │
└───────────┬───────────────┘         └───────────────────────────┘
            │ Launch Stream
            ▼
┌─────────────────────────────────────────────────────────────┐
│                 Adaptive Video Player Core                  │
│                                                             │
│   ┌───────────────────────┐     ┌───────────────────────┐   │
│   │   ABR Simulation      │     │ DRM Protection State  │   │
│   │  - Bandwidth Monitor  │     │  - License Handshake  │   │
│   │  - Dynamic Bitrate    │     │  - 'Locked' Overlay   │   │
│   │  - Quality Indicators │     │  - Security Level L1  │   │
│   └───────────────────────┘     └───────────────────────┘   │
│   ┌───────────────────────┐     ┌───────────────────────┐   │
│   │ Buffering Engine      │     │ Diagnostic Overlay    │   │
│   │  - Buffer Stall UI    │     │  - "Stats for Nerds"  │   │
│   │  - Rebuffer Recovery  │     │  - Live Latency Meter │   │
│   └───────────────────────┘     └───────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## ⌨️ Navigation & Keyboard Shortcuts

| Key | Context | Action |
|---|---|---|
| `↑` `↓` `←` `→` | Browsing / Player | Navigate active focus across cards, hero, and player controls |
| `Enter` / `Return` | Any | Select highlighted card / Play title / Confirm action |
| `Space` | Player | Toggle Play / Pause |
| `Escape` / `Backspace` | Any | Back / Close modal / Exit video player |
| `F` | Player | Toggle Fullscreen mode |
| `M` | Player / Hero | Toggle Audio Mute / Unmute |
| `C` | Player | Cycle Subtitles & Closed Captions |
| `Q` | Player | Open Adaptive Quality renditions menu |
| `S` | Player | Toggle "Stats for Nerds" technical overlay |
| `B` | Player | Simulate buffer stall and underrun state |
| `R` | Browsing | Toggle on-screen Virtual TV Remote control |
| `?` | Browsing | Show Keyboard Shortcuts reference cheat sheet |

---

## 🚀 Getting Started & Local Development

### Prerequisites
* **Node.js**: v18.0.0 or later (v24.x recommended)
* **npm**: v9.0.0 or later

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nitish409/adaptive-video-player.git
   cd adaptive-video-player
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🧪 College Demonstration & Evaluation Checklist

To verify all requirements during project grading:

1. **Netflix Browsing Rails**:
   * Scroll horizontally through the rails using either the mouse wheel, navigation arrows, or the keyboard arrow keys.
   * Observe smooth focus shifts with glowing border highlights on the active media card.
2. **Keyboard & Remote Navigation**:
   * Press `Arrow Down` to jump from the Hero banner into the browsing rails.
   * Click the floating remote icon (or press `R`) to open the on-screen TV Remote and use its D-Pad buttons.
3. **Adaptive Quality Switching**:
   * Open any video title and launch the Network Condition drawer from the top bar.
   * Switch the network from **Fiber (50 Mbps)** to **Throttled 3G (1.2 Mbps)**.
   * Observe the toast alert and quality indicator adapt down from **1080p/4K** to **480p/360p**.
4. **Buffering States**:
   * Click the **"Simulate Stall"** button (or press `B`) inside the player to observe the simulated buffer starvation and recovery sequence.
5. **DRM Content-Protection Locked Overlay**:
   * Navigate to the **"DRM Protected Vault & Premium Tiers"** rail.
   * Select a title (e.g., *Neon Horizon* or *The Obsidian Citadel*).
   * Notice the player immediately displays the hardware-protection locked UI state with license key acquisition prompts.
   * Click **"Simulate License Acquisition / Unlock"** to run the simulated cryptographic challenge and start playback.

---

## 📄 License & Attribution

* **Open-Source Test Media**: Video assets and trailers are sourced from the Blender Foundation open-movie projects (*Tears of Steel*, *Big Buck Bunny*, *Sintel*, *Elephants Dream*) under Creative Commons licensing.
* **Academic Submission**: Developed as a college project for media streaming systems and modern web architecture.

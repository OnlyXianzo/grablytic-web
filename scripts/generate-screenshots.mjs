import { writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

mkdirSync('public/shots', { recursive: true });

const W = 720;
const H = 1520;

function statusBar() {
  return `
    <g font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
      <text x="56" y="52" fill="#e6edf3" font-size="24" font-weight="600" letter-spacing="0.5">09:41</text>
      <!-- Dynamic island / pill camera -->
      <rect x="290" y="24" width="140" height="34" rx="17" fill="#000000"/>
      <circle cx="395" cy="41" r="5" fill="#161b22"/>
      <!-- Right status icons -->
      <path d="M570 38 L582 52 L594 38 Z" fill="#8b949e"/>
      <text x="610" y="52" fill="#8b949e" font-size="20" font-weight="700">5G</text>
      <rect x="650" y="34" width="30" height="18" rx="4" fill="none" stroke="#e6edf3" stroke-width="2"/>
      <rect x="652" y="36" width="22" height="14" rx="2" fill="#3fb950"/>
      <rect x="681" y="40" width="2.5" height="6" rx="1" fill="#e6edf3"/>
    </g>
  `;
}

function bottomNav(activeTab) {
  const tabs = [
    { name: 'Home', icon: 'M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z', id: 'home' },
    { name: 'Search', icon: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z', id: 'search' },
    { name: 'Queue', icon: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z', id: 'queue' },
    { name: 'Settings', icon: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z', id: 'settings' },
  ];

  let items = '';
  const step = W / 4;
  tabs.forEach((tab, i) => {
    const cx = step * i + step / 2;
    const isActive = tab.id === activeTab;
    const color = isActive ? '#58a6ff' : '#8b949e';
    const bg = isActive ? 'rgba(88, 166, 255, 0.12)' : 'transparent';
    items += `
      <g transform="translate(${cx - 36}, 1430)">
        <rect x="0" y="0" width="72" height="38" rx="19" fill="${bg}"/>
        <path d="${tab.icon}" fill="${color}" transform="translate(24, 7) scale(1)"/>
        <text x="36" y="54" fill="${color}" font-size="16" font-weight="${isActive ? '700' : '500'}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">${tab.name}</text>
      </g>
    `;
  });

  return `
    <!-- Bottom nav bar background -->
    <rect x="0" y="1410" width="${W}" height="110" fill="#161b22" opacity="0.98"/>
    <line x1="0" y1="1410" x2="${W}" y2="1410" stroke="#30363d" stroke-width="1.5"/>
    ${items}
  `;
}

// 1. HOME SCREEN
function makeHomeSvg() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#238636"/>
      <stop offset="100%" stop-color="#2ea043"/>
    </linearGradient>
    <linearGradient id="heroCard" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#161b22"/>
      <stop offset="100%" stop-color="#0d1117"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" rx="36" fill="#0d1117"/>
  ${statusBar()}

  <!-- Top App Bar -->
  <g transform="translate(36, 92)">
    <circle cx="28" cy="28" r="28" fill="#1f6feb"/>
    <!-- Play arrow icon in logo -->
    <polygon points="22,18 40,28 22,38" fill="#ffffff"/>
    <text x="70" y="36" fill="#ffffff" font-size="30" font-weight="800" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">TrueStream</text>
    <rect x="520" y="10" width="128" height="34" rx="17" fill="#21262d" stroke="#30363d" stroke-width="1"/>
    <circle cx="538" cy="27" r="5" fill="#3fb950"/>
    <text x="552" y="34" fill="#3fb950" font-size="15" font-weight="700" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">ENGINE OK</text>
  </g>

  <!-- URL Input Card -->
  <g transform="translate(36, 175)">
    <rect width="648" height="186" rx="20" fill="url(#heroCard)" stroke="#30363d" stroke-width="1.5"/>
    <text x="24" y="44" fill="#e6edf3" font-size="22" font-weight="700" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">Direct Media Extractor</text>
    <text x="24" y="70" fill="#8b949e" font-size="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">Paste YouTube, SoundCloud, Twitch, TikTok, or 1,000+ links</text>
    
    <!-- Input Box -->
    <rect x="24" y="96" width="460" height="66" rx="14" fill="#010409" stroke="#388bfd" stroke-width="1.5"/>
    <text x="44" y="138" fill="#58a6ff" font-size="24">🔗</text>
    <text x="82" y="137" fill="#c9d1d9" font-size="18" font-family="monospace">https://youtu.be/dQw4w9WgXcQ</text>
    
    <!-- Paste button -->
    <rect x="500" y="96" width="124" height="66" rx="14" fill="url(#btnGrad)"/>
    <text x="562" y="137" fill="#ffffff" font-size="19" font-weight="700" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">Extract</text>
  </g>

  <!-- Quick Filter Pills -->
  <g transform="translate(36, 386)">
    <rect x="0" y="0" width="88" height="42" rx="21" fill="rgba(88, 166, 255, 0.18)" stroke="#58a6ff" stroke-width="1.5"/>
    <text x="44" y="27" fill="#58a6ff" font-size="17" font-weight="700" text-anchor="middle" font-family="sans-serif">All</text>

    <rect x="104" y="0" width="112" height="42" rx="21" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
    <text x="160" y="27" fill="#8b949e" font-size="17" font-weight="600" text-anchor="middle" font-family="sans-serif">Video (4K)</text>

    <rect x="232" y="0" width="116" height="42" rx="21" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
    <text x="290" y="27" fill="#8b949e" font-size="17" font-weight="600" text-anchor="middle" font-family="sans-serif">Audio Only</text>

    <rect x="364" y="0" width="124" height="42" rx="21" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
    <text x="426" y="27" fill="#8b949e" font-size="17" font-weight="600" text-anchor="middle" font-family="sans-serif">Playlists (4)</text>

    <rect x="504" y="0" width="144" height="42" rx="21" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
    <text x="576" y="27" fill="#8b949e" font-size="17" font-weight="600" text-anchor="middle" font-family="sans-serif">Livestreams</text>
  </g>

  <!-- Section: Recent Extractions -->
  <g transform="translate(36, 460)">
    <text x="0" y="24" fill="#e6edf3" font-size="22" font-weight="700" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">Recent Extractions</text>
    <text x="590" y="24" fill="#58a6ff" font-size="16" font-weight="600" font-family="sans-serif">View all</text>

    <!-- Card 1 -->
    <g transform="translate(0, 44)">
      <rect width="648" height="142" rx="18" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
      <rect x="14" y="14" width="160" height="114" rx="12" fill="#010409"/>
      <!-- Thumbnail vector art -->
      <path d="M14 80 Q 54 40, 94 70 T 174 50 L 174 128 L 14 128 Z" fill="#1f6feb" opacity="0.4"/>
      <rect x="108" y="96" width="56" height="22" rx="6" fill="#000000" opacity="0.85"/>
      <text x="136" y="112" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle" font-family="sans-serif">14:28</text>
      
      <text x="194" y="44" fill="#ffffff" font-size="19" font-weight="700" font-family="sans-serif">Cyberpunk 2077 Night City 4K</text>
      <text x="194" y="74" fill="#8b949e" font-size="15" font-family="sans-serif">HDR10 • 60 FPS • AV1 / Opus</text>
      <rect x="194" y="90" width="80" height="26" rx="6" fill="rgba(88, 166, 255, 0.15)"/>
      <text x="234" y="108" fill="#58a6ff" font-size="13" font-weight="700" text-anchor="middle" font-family="sans-serif">1.42 GB</text>
      <rect x="284" y="90" width="94" height="26" rx="6" fill="rgba(63, 185, 80, 0.15)"/>
      <text x="331" y="108" fill="#3fb950" font-size="13" font-weight="700" text-anchor="middle" font-family="sans-serif">COMPLETED</text>
    </g>

    <!-- Card 2 -->
    <g transform="translate(0, 204)">
      <rect width="648" height="142" rx="18" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
      <rect x="14" y="14" width="160" height="114" rx="12" fill="#010409"/>
      <circle cx="94" cy="71" r="32" fill="#8957e5" opacity="0.3"/>
      <text x="94" y="80" fill="#bc8cff" font-size="34" text-anchor="middle">♪</text>
      <rect x="114" y="96" width="50" height="22" rx="6" fill="#000000" opacity="0.85"/>
      <text x="139" y="112" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle" font-family="sans-serif">03:45</text>
      
      <text x="194" y="44" fill="#ffffff" font-size="19" font-weight="700" font-family="sans-serif">Lofi Hip Hop Radio - Beats</text>
      <text x="194" y="74" fill="#8b949e" font-size="15" font-family="sans-serif">SoundCloud • 320kbps • Opus 160k</text>
      <rect x="194" y="90" width="70" height="26" rx="6" fill="rgba(188, 140, 255, 0.15)"/>
      <text x="229" y="108" fill="#bc8cff" font-size="13" font-weight="700" text-anchor="middle" font-family="sans-serif">4.8 MB</text>
      <rect x="274" y="90" width="94" height="26" rx="6" fill="rgba(63, 185, 80, 0.15)"/>
      <text x="321" y="108" fill="#3fb950" font-size="13" font-weight="700" text-anchor="middle" font-family="sans-serif">COMPLETED</text>
    </g>

    <!-- Card 3 -->
    <g transform="translate(0, 364)">
      <rect width="648" height="142" rx="18" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
      <rect x="14" y="14" width="160" height="114" rx="12" fill="#010409"/>
      <rect x="44" y="44" width="100" height="54" rx="8" fill="#3fb950" opacity="0.2"/>
      <text x="94" y="78" fill="#3fb950" font-size="20" font-weight="800" text-anchor="middle" font-family="sans-serif">FLAC</text>
      
      <text x="194" y="44" fill="#ffffff" font-size="19" font-weight="700" font-family="sans-serif">Hans Zimmer Live in Prague</text>
      <text x="194" y="74" fill="#8b949e" font-size="15" font-family="sans-serif">Lossless Audio • 48kHz • 24-bit</text>
      <rect x="194" y="90" width="80" height="26" rx="6" fill="rgba(63, 185, 80, 0.15)"/>
      <text x="234" y="108" fill="#3fb950" font-size="13" font-weight="700" text-anchor="middle" font-family="sans-serif">580 MB</text>
      <rect x="284" y="90" width="94" height="26" rx="6" fill="rgba(63, 185, 80, 0.15)"/>
      <text x="331" y="108" fill="#3fb950" font-size="13" font-weight="700" text-anchor="middle" font-family="sans-serif">COMPLETED</text>
    </g>

    <!-- Card 4 -->
    <g transform="translate(0, 524)">
      <rect width="648" height="142" rx="18" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
      <rect x="14" y="14" width="160" height="114" rx="12" fill="#010409"/>
      <polygon points="74,51 124,71 74,91" fill="#58a6ff" opacity="0.4"/>
      <text x="194" y="44" fill="#ffffff" font-size="19" font-weight="700" font-family="sans-serif">Dune Part Two - Sound Design</text>
      <text x="194" y="74" fill="#8b949e" font-size="15" font-family="sans-serif">WaterTower Music • 4K UHD 60fps</text>
      <rect x="194" y="90" width="80" height="26" rx="6" fill="rgba(88, 166, 255, 0.15)"/>
      <text x="234" y="108" fill="#58a6ff" font-size="13" font-weight="700" text-anchor="middle" font-family="sans-serif">890 MB</text>
      <rect x="284" y="90" width="94" height="26" rx="6" fill="rgba(63, 185, 80, 0.15)"/>
      <text x="331" y="108" fill="#3fb950" font-size="13" font-weight="700" text-anchor="middle" font-family="sans-serif">COMPLETED</text>
    </g>
  </g>

  <!-- Bottom Floating Action Bar -->
  <g transform="translate(180, 1310)">
    <rect width="360" height="66" rx="33" fill="#1f6feb" filter="drop-shadow(0 8px 24px rgba(31, 111, 235, 0.45))"/>
    <text x="180" y="41" fill="#ffffff" font-size="20" font-weight="700" text-anchor="middle" font-family="sans-serif">⚡ Paste &amp; Download</text>
  </g>

  ${bottomNav('home')}
</svg>
`;
}

// 2. SEARCH SCREEN
function makeSearchSvg() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" rx="36" fill="#0d1117"/>
  ${statusBar()}

  <!-- Top Search Bar -->
  <g transform="translate(36, 88)">
    <rect width="648" height="68" rx="20" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
    <text x="26" y="42" fill="#58a6ff" font-size="24">🔍</text>
    <text x="68" y="43" fill="#ffffff" font-size="20" font-weight="600" font-family="sans-serif">Hans Zimmer Live Tour</text>
    <circle cx="616" cy="34" r="14" fill="#21262d"/>
    <text x="616" y="41" fill="#8b949e" font-size="16" font-weight="700" text-anchor="middle" font-family="sans-serif">✕</text>
  </g>

  <!-- Search Providers Filter -->
  <g transform="translate(36, 178)">
    <rect x="0" y="0" width="112" height="40" rx="20" fill="rgba(88, 166, 255, 0.18)" stroke="#58a6ff" stroke-width="1.5"/>
    <text x="56" y="26" fill="#58a6ff" font-size="16" font-weight="700" text-anchor="middle" font-family="sans-serif">All Sites</text>

    <rect x="126" y="0" width="118" height="40" rx="20" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
    <text x="185" y="26" fill="#c9d1d9" font-size="16" font-weight="600" text-anchor="middle" font-family="sans-serif">YouTube</text>

    <rect x="258" y="0" width="138" height="40" rx="20" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
    <text x="327" y="26" fill="#c9d1d9" font-size="16" font-weight="600" text-anchor="middle" font-family="sans-serif">SoundCloud</text>

    <rect x="410" y="0" width="108" height="40" rx="20" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
    <text x="464" y="26" fill="#c9d1d9" font-size="16" font-weight="600" text-anchor="middle" font-family="sans-serif">Bilibili</text>

    <rect x="532" y="0" width="116" height="40" rx="20" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
    <text x="590" y="26" fill="#c9d1d9" font-size="16" font-weight="600" text-anchor="middle" font-family="sans-serif">Bandcamp</text>
  </g>

  <!-- Search Results Count -->
  <g transform="translate(36, 244)">
    <text x="0" y="18" fill="#8b949e" font-size="16" font-weight="600" font-family="sans-serif">FOUND 42 RESULTS ACROSS 4 PLATFORMS</text>
  </g>

  <!-- Results List -->
  <g transform="translate(36, 280)">
    <!-- Result 1 -->
    <g transform="translate(0, 0)">
      <rect width="648" height="240" rx="20" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
      <rect x="16" y="16" width="616" height="130" rx="12" fill="#010409"/>
      <path d="M16 110 Q 150 40, 320 80 T 632 60 L 632 146 L 16 146 Z" fill="#1f6feb" opacity="0.35"/>
      <rect x="28" y="28" width="66" height="26" rx="6" fill="#1f6feb"/>
      <text x="61" y="46" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle" font-family="sans-serif">4K HDR</text>
      <rect x="560" y="108" width="60" height="26" rx="6" fill="#000000" opacity="0.8"/>
      <text x="590" y="126" fill="#ffffff" font-size="14" font-weight="700" text-anchor="middle" font-family="sans-serif">04:38</text>

      <text x="20" y="180" fill="#ffffff" font-size="20" font-weight="700" font-family="sans-serif">Interstellar — Main Theme (Live in Prague)</text>
      <text x="20" y="208" fill="#8b949e" font-size="15" font-family="sans-serif">Hans Zimmer • 128M views • 4K AV1 60fps &amp; Opus 160k</text>
      <circle cx="608" cy="194" r="22" fill="rgba(88, 166, 255, 0.15)"/>
      <path d="M608 184 v14 M601 193 l7 7 7-7" fill="none" stroke="#58a6ff" stroke-width="2.5" stroke-linecap="round"/>
    </g>

    <!-- Result 2 -->
    <g transform="translate(0, 264)">
      <rect width="648" height="240" rx="20" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
      <rect x="16" y="16" width="616" height="130" rx="12" fill="#010409"/>
      <circle cx="324" cy="81" r="50" fill="#8957e5" opacity="0.25"/>
      <rect x="28" y="28" width="80" height="26" rx="6" fill="#8957e5"/>
      <text x="68" y="46" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle" font-family="sans-serif">PLAYLIST</text>
      <rect x="548" y="108" width="72" height="26" rx="6" fill="#000000" opacity="0.8"/>
      <text x="584" y="126" fill="#ffffff" font-size="14" font-weight="700" text-anchor="middle" font-family="sans-serif">18 TRACKS</text>

      <text x="20" y="180" fill="#ffffff" font-size="20" font-weight="700" font-family="sans-serif">Dune: Part Two (Original Motion Picture)</text>
      <text x="20" y="208" fill="#8b949e" font-size="15" font-family="sans-serif">WaterTower Music • Complete Suite • Lossless FLAC</text>
      <circle cx="608" cy="194" r="22" fill="rgba(88, 166, 255, 0.15)"/>
      <path d="M608 184 v14 M601 193 l7 7 7-7" fill="none" stroke="#58a6ff" stroke-width="2.5" stroke-linecap="round"/>
    </g>

    <!-- Result 3 -->
    <g transform="translate(0, 528)">
      <rect width="648" height="240" rx="20" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
      <rect x="16" y="16" width="616" height="130" rx="12" fill="#010409"/>
      <path d="M16 120 Q 200 60, 400 90 T 632 70 L 632 146 L 16 146 Z" fill="#238636" opacity="0.3"/>
      <rect x="28" y="28" width="66" height="26" rx="6" fill="#238636"/>
      <text x="61" y="46" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle" font-family="sans-serif">1080P</text>
      <rect x="550" y="108" width="70" height="26" rx="6" fill="#000000" opacity="0.8"/>
      <text x="585" y="126" fill="#ffffff" font-size="14" font-weight="700" text-anchor="middle" font-family="sans-serif">2:18:40</text>

      <text x="20" y="180" fill="#ffffff" font-size="20" font-weight="700" font-family="sans-serif">Hans Zimmer Live in Prague (Full Concert)</text>
      <text x="20" y="208" fill="#8b949e" font-size="15" font-family="sans-serif">Full Symphony Orchestra • 60 FPS • Multi-audio</text>
      <circle cx="608" cy="194" r="22" fill="rgba(88, 166, 255, 0.15)"/>
      <path d="M608 184 v14 M601 193 l7 7 7-7" fill="none" stroke="#58a6ff" stroke-width="2.5" stroke-linecap="round"/>
    </g>

    <!-- Result 4 -->
    <g transform="translate(0, 792)">
      <rect width="648" height="240" rx="20" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
      <rect x="16" y="16" width="616" height="130" rx="12" fill="#010409"/>
      <rect x="28" y="28" width="76" height="26" rx="6" fill="#388bfd"/>
      <text x="66" y="46" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle" font-family="sans-serif">AUDIO</text>
      <text x="20" y="180" fill="#ffffff" font-size="20" font-weight="700" font-family="sans-serif">Inception — Time (Orchestral Re-Score)</text>
      <text x="20" y="208" fill="#8b949e" font-size="15" font-family="sans-serif">SoundCloud 320kbps • Opus High-Fi 48kHz</text>
    </g>
  </g>

  ${bottomNav('search')}
</svg>
`;
}

// 3. FORMAT PICKER SCREEN (Download Hero)
function makeFormatPickerSvg() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="glowBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#58a6ff"/>
      <stop offset="100%" stop-color="#1f6feb"/>
    </linearGradient>
    <linearGradient id="dlBtn" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1f6feb"/>
      <stop offset="100%" stop-color="#388bfd"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" rx="36" fill="#0d1117"/>
  ${statusBar()}

  <!-- Top App Bar -->
  <g transform="translate(36, 92)">
    <circle cx="22" cy="22" r="22" fill="#21262d"/>
    <path d="M26 14 L18 22 L26 30" fill="none" stroke="#e6edf3" stroke-width="2.5" stroke-linecap="round"/>
    <text x="64" y="29" fill="#ffffff" font-size="24" font-weight="700" font-family="sans-serif">Select Stream &amp; Quality</text>
    <rect x="524" y="6" width="124" height="32" rx="8" fill="#238636"/>
    <text x="586" y="27" fill="#ffffff" font-size="14" font-weight="800" text-anchor="middle" font-family="sans-serif">BEST QUALITY</text>
  </g>

  <!-- Video Info Preview Card -->
  <g transform="translate(36, 168)">
    <rect width="648" height="236" rx="20" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
    <rect x="16" y="16" width="220" height="140" rx="12" fill="#010409"/>
    <path d="M16 110 Q 80 50, 160 80 T 236 70 L 236 156 L 16 156 Z" fill="#1f6feb" opacity="0.4"/>
    <rect x="164" y="122" width="60" height="24" rx="6" fill="#000000" opacity="0.85"/>
    <text x="194" y="139" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle" font-family="sans-serif">18:24</text>

    <text x="256" y="44" fill="#ffffff" font-size="20" font-weight="700" font-family="sans-serif">Cyberpunk 2077 Night City</text>
    <text x="256" y="70" fill="#ffffff" font-size="18" font-weight="700" font-family="sans-serif">Overdrive 4K HDR Raytracing</text>
    <text x="256" y="104" fill="#8b949e" font-size="15" font-family="sans-serif">CD PROJEKT RED • 4.2M views</text>
    <text x="256" y="130" fill="#58a6ff" font-size="14" font-weight="600" font-family="sans-serif">yt-dlp engine: 16 streams found</text>

    <!-- Tab Toggle -->
    <rect x="16" y="172" width="616" height="48" rx="12" fill="#010409" stroke="#30363d" stroke-width="1"/>
    <rect x="20" y="176" width="304" height="40" rx="9" fill="#21262d"/>
    <text x="172" y="202" fill="#ffffff" font-size="16" font-weight="700" text-anchor="middle" font-family="sans-serif">Video + Audio (Merged)</text>
    <text x="480" y="202" fill="#8b949e" font-size="16" font-weight="600" text-anchor="middle" font-family="sans-serif">Audio Only (Extracted)</text>
  </g>

  <!-- Format Option Cards -->
  <g transform="translate(36, 432)">
    <!-- Stream 1 (RECOMMENDED / SELECTED) -->
    <g transform="translate(0, 0)">
      <rect width="648" height="124" rx="18" fill="rgba(88, 166, 255, 0.08)" stroke="#58a6ff" stroke-width="2"/>
      <circle cx="42" cy="62" r="14" fill="#58a6ff"/>
      <circle cx="42" cy="62" r="6" fill="#ffffff"/>

      <text x="76" y="46" fill="#ffffff" font-size="20" font-weight="700" font-family="sans-serif">2160p 4K UHD 60fps HDR</text>
      <rect x="350" y="28" width="70" height="24" rx="6" fill="#238636"/>
      <text x="385" y="45" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle" font-family="sans-serif">AV1 PRO</text>
      
      <text x="76" y="80" fill="#8b949e" font-size="15" font-family="sans-serif">Codec: av01.0.12M.10 • Bitrate: 28.4 Mbps • HDR10</text>
      <text x="76" y="104" fill="#58a6ff" font-size="14" font-weight="600" font-family="sans-serif">+ Opus 160kbps (48kHz stereo) auto-muxed</text>

      <text x="590" y="68" fill="#58a6ff" font-size="22" font-weight="800" text-anchor="end" font-family="sans-serif">1.42 GB</text>
    </g>

    <!-- Stream 2 -->
    <g transform="translate(0, 144)">
      <rect width="648" height="114" rx="18" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
      <circle cx="42" cy="57" r="14" fill="none" stroke="#8b949e" stroke-width="2"/>

      <text x="76" y="44" fill="#ffffff" font-size="19" font-weight="700" font-family="sans-serif">1440p 2K QHD 60fps</text>
      <rect x="290" y="28" width="60" height="22" rx="6" fill="#21262d"/>
      <text x="320" y="44" fill="#8b949e" font-size="12" font-weight="700" text-anchor="middle" font-family="sans-serif">VP9</text>

      <text x="76" y="76" fill="#8b949e" font-size="15" font-family="sans-serif">Codec: vp09.00 • Bitrate: 16.2 Mbps • 2560x1440</text>
      <text x="76" y="98" fill="#8b949e" font-size="13" font-family="sans-serif">+ Opus 160kbps audio</text>

      <text x="590" y="64" fill="#c9d1d9" font-size="20" font-weight="700" text-anchor="end" font-family="sans-serif">840 MB</text>
    </g>

    <!-- Stream 3 -->
    <g transform="translate(0, 278)">
      <rect width="648" height="114" rx="18" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
      <circle cx="42" cy="57" r="14" fill="none" stroke="#8b949e" stroke-width="2"/>

      <text x="76" y="44" fill="#ffffff" font-size="19" font-weight="700" font-family="sans-serif">1080p Full HD 60fps</text>
      <rect x="274" y="28" width="70" height="22" rx="6" fill="#21262d"/>
      <text x="309" y="44" fill="#8b949e" font-size="12" font-weight="700" text-anchor="middle" font-family="sans-serif">H.264</text>

      <text x="76" y="76" fill="#8b949e" font-size="15" font-family="sans-serif">Codec: avc1.64002a • Bitrate: 8.4 Mbps • Compatible</text>
      <text x="76" y="98" fill="#8b949e" font-size="13" font-family="sans-serif">+ AAC 128kbps audio</text>

      <text x="590" y="64" fill="#c9d1d9" font-size="20" font-weight="700" text-anchor="end" font-family="sans-serif">420 MB</text>
    </g>

    <!-- Stream 4 (Audio Only) -->
    <g transform="translate(0, 412)">
      <rect width="648" height="114" rx="18" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
      <circle cx="42" cy="57" r="14" fill="none" stroke="#8b949e" stroke-width="2"/>

      <text x="76" y="44" fill="#ffffff" font-size="19" font-weight="700" font-family="sans-serif">Opus Audio 160 kbps (Lossy HQ)</text>
      <rect x="380" y="28" width="80" height="22" rx="6" fill="#8957e5"/>
      <text x="420" y="44" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle" font-family="sans-serif">ORIGINAL</text>

      <text x="76" y="76" fill="#8b949e" font-size="15" font-family="sans-serif">Pure Audio Stream • Container: .opus • 48 kHz</text>
      <text x="76" y="98" fill="#8b949e" font-size="13" font-family="sans-serif">Embedded album art &amp; chapter metadata</text>

      <text x="590" y="64" fill="#c9d1d9" font-size="20" font-weight="700" text-anchor="end" font-family="sans-serif">28 MB</text>
    </g>
  </g>

  <!-- Download CTA Button (Fixed at bottom above nav) -->
  <g transform="translate(36, 1290)">
    <rect width="648" height="84" rx="22" fill="url(#dlBtn)" filter="drop-shadow(0 12px 28px rgba(31, 111, 235, 0.5))"/>
    <text x="324" y="52" fill="#ffffff" font-size="23" font-weight="800" text-anchor="middle" font-family="sans-serif">Download Selected (1.42 GB)</text>
  </g>

  ${bottomNav('queue')}
</svg>
`;
}

// 4. QUEUE / DOWNLOADS SCREEN
function makeQueueSvg() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="progFill" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1f6feb"/>
      <stop offset="100%" stop-color="#58a6ff"/>
    </linearGradient>
    <linearGradient id="muxFill" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#238636"/>
      <stop offset="100%" stop-color="#3fb950"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" rx="36" fill="#0d1117"/>
  ${statusBar()}

  <!-- Top App Bar -->
  <g transform="translate(36, 92)">
    <text x="0" y="32" fill="#ffffff" font-size="30" font-weight="800" font-family="sans-serif">Downloads &amp; Queue</text>
    <rect x="490" y="6" width="158" height="34" rx="17" fill="rgba(88, 166, 255, 0.15)" stroke="#58a6ff" stroke-width="1.2"/>
    <circle cx="510" cy="23" r="5" fill="#58a6ff"/>
    <text x="524" y="30" fill="#58a6ff" font-size="15" font-weight="700" font-family="sans-serif">2 ACTIVE (18 MB/s)</text>
  </g>

  <!-- Queue Items -->
  <g transform="translate(36, 164)">
    <!-- ACTIVE ITEM 1: In Progress -->
    <g transform="translate(0, 0)">
      <rect width="648" height="210" rx="20" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
      <rect x="20" y="20" width="80" height="80" rx="14" fill="#010409"/>
      <text x="60" y="68" fill="#58a6ff" font-size="28" font-weight="800" text-anchor="middle" font-family="sans-serif">4K</text>
      
      <text x="116" y="48" fill="#ffffff" font-size="20" font-weight="700" font-family="sans-serif">Interstellar_Main_Theme_4K.mkv</text>
      <text x="116" y="74" fill="#8b949e" font-size="15" font-family="sans-serif">1.1 GB / 1.42 GB • 8 parallel connections</text>

      <text x="550" y="48" fill="#58a6ff" font-size="24" font-weight="800" text-anchor="end" font-family="sans-serif">78%</text>

      <!-- Progress Bar -->
      <rect x="20" y="116" width="608" height="12" rx="6" fill="#010409"/>
      <rect x="20" y="116" width="474" height="12" rx="6" fill="url(#progFill)"/>

      <!-- Progress Details -->
      <text x="20" y="158" fill="#3fb950" font-size="16" font-weight="700" font-family="sans-serif">⚡ 18.4 MB/s</text>
      <text x="160" y="158" fill="#8b949e" font-size="15" font-family="sans-serif">ETA: 14s</text>
      <text x="260" y="158" fill="#8b949e" font-size="15" font-family="sans-serif">Chunk: 6/8</text>

      <!-- Action Buttons -->
      <rect x="528" y="140" width="44" height="44" rx="10" fill="#21262d"/>
      <text x="550" y="167" fill="#c9d1d9" font-size="18" text-anchor="middle">⏸</text>
      <rect x="584" y="140" width="44" height="44" rx="10" fill="#21262d"/>
      <text x="606" y="167" fill="#f85149" font-size="18" text-anchor="middle">✕</text>
    </g>

    <!-- ACTIVE ITEM 2: Post-Processing / Muxing -->
    <g transform="translate(0, 234)">
      <rect width="648" height="180" rx="20" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
      <rect x="20" y="20" width="80" height="80" rx="14" fill="#010409"/>
      <text x="60" y="68" fill="#bc8cff" font-size="28" font-weight="800" text-anchor="middle" font-family="sans-serif">HQ</text>

      <text x="116" y="48" fill="#ffffff" font-size="20" font-weight="700" font-family="sans-serif">Hans_Zimmer_Prague_Live.opus</text>
      <text x="116" y="74" fill="#3fb950" font-size="15" font-weight="600" font-family="sans-serif">Muxing audio &amp; embedding ID3 tags...</text>

      <text x="550" y="48" fill="#3fb950" font-size="22" font-weight="800" text-anchor="end" font-family="sans-serif">99%</text>

      <!-- Progress Bar -->
      <rect x="20" y="116" width="608" height="12" rx="6" fill="#010409"/>
      <rect x="20" y="116" width="602" height="12" rx="6" fill="url(#muxFill)"/>

      <text x="20" y="156" fill="#8b949e" font-size="15" font-family="sans-serif">Native Bionic FFmpeg libopus encoder</text>
      <text x="550" y="156" fill="#8b949e" font-size="15" text-anchor="end" font-family="sans-serif">Finalizing container</text>
    </g>

    <!-- QUEUED ITEM 3 -->
    <g transform="translate(0, 438)">
      <rect width="648" height="150" rx="20" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
      <rect x="20" y="20" width="70" height="70" rx="14" fill="#010409"/>
      <text x="55" y="62" fill="#8b949e" font-size="24" font-weight="800" text-anchor="middle" font-family="sans-serif">HD</text>

      <text x="106" y="48" fill="#ffffff" font-size="19" font-weight="700" font-family="sans-serif">Cyberpunk_Night_City_Ambience.mp4</text>
      <text x="106" y="74" fill="#8b949e" font-size="15" font-family="sans-serif">1080p 60fps • 420 MB • Waiting for slot</text>

      <!-- Empty Progress Bar -->
      <rect x="20" y="106" width="608" height="10" rx="5" fill="#010409"/>

      <text x="20" y="136" fill="#8b949e" font-size="14" font-family="sans-serif">Queued behind Active items</text>
      <text x="610" y="136" fill="#8b949e" font-size="14" text-anchor="end" font-family="sans-serif">Standby</text>
    </g>

    <!-- COMPLETED HISTORY ITEMS -->
    <g transform="translate(0, 616)">
      <text x="0" y="24" fill="#e6edf3" font-size="22" font-weight="700" font-family="sans-serif">Completed Downloads</text>
      <text x="610" y="24" fill="#58a6ff" font-size="16" font-weight="600" text-anchor="end" font-family="sans-serif">Open Folder</text>

      <!-- Item 1 -->
      <g transform="translate(0, 44)">
        <rect width="648" height="114" rx="18" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
        <circle cx="50" cy="57" r="24" fill="rgba(63, 185, 80, 0.15)"/>
        <path d="M42 57 l6 6 12-12" fill="none" stroke="#3fb950" stroke-width="3" stroke-linecap="round"/>

        <text x="92" y="46" fill="#ffffff" font-size="19" font-weight="700" font-family="sans-serif">Dune_Part_Two_OST_Lossless.flac</text>
        <text x="92" y="74" fill="#8b949e" font-size="15" font-family="sans-serif">580 MB • Saved to /storage/Movies/TrueStream</text>

        <rect x="548" y="38" width="80" height="38" rx="10" fill="#21262d"/>
        <text x="588" y="62" fill="#58a6ff" font-size="15" font-weight="700" text-anchor="middle" font-family="sans-serif">PLAY</text>
      </g>

      <!-- Item 2 -->
      <g transform="translate(0, 178)">
        <rect width="648" height="114" rx="18" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
        <circle cx="50" cy="57" r="24" fill="rgba(63, 185, 80, 0.15)"/>
        <path d="M42 57 l6 6 12-12" fill="none" stroke="#3fb950" stroke-width="3" stroke-linecap="round"/>

        <text x="92" y="46" fill="#ffffff" font-size="19" font-weight="700" font-family="sans-serif">Lofi_Chill_Beats_Study_2026.m4a</text>
        <text x="92" y="74" fill="#8b949e" font-size="15" font-family="sans-serif">14.2 MB • Saved to /storage/Music/TrueStream</text>

        <rect x="548" y="38" width="80" height="38" rx="10" fill="#21262d"/>
        <text x="588" y="62" fill="#58a6ff" font-size="15" font-weight="700" text-anchor="middle" font-family="sans-serif">PLAY</text>
      </g>
    </g>
  </g>

  ${bottomNav('queue')}
</svg>
`;
}

// 5. SETTINGS SCREEN
function makeSettingsSvg() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" rx="36" fill="#0d1117"/>
  ${statusBar()}

  <!-- Top App Bar -->
  <g transform="translate(36, 92)">
    <text x="0" y="32" fill="#ffffff" font-size="30" font-weight="800" font-family="sans-serif">Settings &amp; Engine</text>
    <rect x="496" y="6" width="152" height="34" rx="17" fill="#21262d" stroke="#30363d" stroke-width="1"/>
    <text x="572" y="28" fill="#8b949e" font-size="15" font-weight="700" text-anchor="middle" font-family="sans-serif">TrueStream v0.0.1</text>
  </g>

  <g transform="translate(36, 168)">
    <!-- CATEGORY 1: JAVASCRIPT & PYTHON RUNTIMES -->
    <text x="0" y="20" fill="#58a6ff" font-size="16" font-weight="800" letter-spacing="1" font-family="sans-serif">ENGINE &amp; RUNTIME ARCHITECTURE</text>

    <!-- Card 1: Deno -->
    <g transform="translate(0, 36)">
      <rect width="648" height="120" rx="18" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
      <text x="24" y="44" fill="#ffffff" font-size="20" font-weight="700" font-family="sans-serif">Primary JS Engine: Deno</text>
      <text x="24" y="72" fill="#8b949e" font-size="15" font-family="sans-serif">Deno 2.7.7 Native Rust / ARM64 • Fast extractor execution</text>
      <text x="24" y="96" fill="#3fb950" font-size="14" font-weight="600" font-family="sans-serif">● Active &amp; Verified (zero V8 overhead)</text>

      <!-- Toggle switch ON -->
      <rect x="548" y="42" width="68" height="36" rx="18" fill="#238636"/>
      <circle cx="594" cy="60" r="14" fill="#ffffff"/>
    </g>

    <!-- Card 2: Chaquopy yt-dlp -->
    <g transform="translate(0, 174)">
      <rect width="648" height="120" rx="18" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
      <text x="24" y="44" fill="#ffffff" font-size="20" font-weight="700" font-family="sans-serif">yt-dlp Core (Chaquopy)</text>
      <text x="24" y="72" fill="#8b949e" font-size="15" font-family="sans-serif">Python 3.11 Embedded Runtime • 1,000+ platform extractors</text>
      <text x="24" y="96" fill="#58a6ff" font-size="14" font-weight="600" font-family="sans-serif">Auto-update extractors via PyPI release</text>

      <rect x="532" y="42" width="84" height="36" rx="10" fill="#21262d" stroke="#30363d" stroke-width="1"/>
      <text x="574" y="65" fill="#e6edf3" font-size="14" font-weight="700" text-anchor="middle" font-family="sans-serif">CHECK</text>
    </g>

    <!-- CATEGORY 2: STORAGE & DOWNLOADS -->
    <text x="0" y="336" fill="#58a6ff" font-size="16" font-weight="800" letter-spacing="1" font-family="sans-serif">DOWNLOAD STORAGE &amp; PATHS</text>

    <!-- Card 3: Storage path -->
    <g transform="translate(0, 352)">
      <rect width="648" height="114" rx="18" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
      <text x="24" y="44" fill="#ffffff" font-size="20" font-weight="700" font-family="sans-serif">Storage Location</text>
      <text x="24" y="72" fill="#c9d1d9" font-size="15" font-family="monospace">/storage/emulated/0/Movies/TrueStream</text>
      <text x="24" y="96" fill="#8b949e" font-size="14" font-family="sans-serif">Scoped Storage • No root required • SAF access</text>

      <rect x="532" y="38" width="84" height="36" rx="10" fill="#21262d" stroke="#30363d" stroke-width="1"/>
      <text x="574" y="61" fill="#e6edf3" font-size="14" font-weight="700" text-anchor="middle" font-family="sans-serif">CHANGE</text>
    </g>

    <!-- Card 4: Concurrency -->
    <g transform="translate(0, 484)">
      <rect width="648" height="114" rx="18" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
      <text x="24" y="44" fill="#ffffff" font-size="20" font-weight="700" font-family="sans-serif">Concurrent Chunks (aria2c)</text>
      <text x="24" y="72" fill="#8b949e" font-size="15" font-family="sans-serif">Maximum parallel connections per download</text>
      <text x="24" y="96" fill="#3fb950" font-size="14" font-weight="600" font-family="sans-serif">8 threads (Optimal for 5G &amp; Wi-Fi 6)</text>

      <rect x="548" y="38" width="68" height="36" rx="10" fill="rgba(88, 166, 255, 0.15)"/>
      <text x="582" y="62" fill="#58a6ff" font-size="17" font-weight="800" text-anchor="middle" font-family="sans-serif">8</text>
    </g>

    <!-- CATEGORY 3: PRIVACY & TELEMETRY -->
    <text x="0" y="640" fill="#58a6ff" font-size="16" font-weight="800" letter-spacing="1" font-family="sans-serif">PRIVACY, ADS &amp; TRACKING</text>

    <!-- Card 5: Zero telemetry -->
    <g transform="translate(0, 656)">
      <rect width="648" height="114" rx="18" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
      <text x="24" y="44" fill="#ffffff" font-size="20" font-weight="700" font-family="sans-serif">Zero Telemetry Policy</text>
      <text x="24" y="72" fill="#8b949e" font-size="15" font-family="sans-serif">No analytics, no telemetry, no third-party network pings</text>
      <text x="24" y="96" fill="#3fb950" font-size="14" font-weight="700" font-family="sans-serif">✓ 100% LOCAL &amp; OPEN SOURCE (GPL-3.0)</text>

      <circle cx="582" cy="57" r="18" fill="rgba(63, 185, 80, 0.15)"/>
      <path d="M574 57 l6 6 12-12" fill="none" stroke="#3fb950" stroke-width="3" stroke-linecap="round"/>
    </g>

    <!-- Card 6: Bionic FFmpeg -->
    <g transform="translate(0, 788)">
      <rect width="648" height="114" rx="18" fill="#161b22" stroke="#30363d" stroke-width="1.2"/>
      <text x="24" y="44" fill="#ffffff" font-size="20" font-weight="700" font-family="sans-serif">FFmpeg Bionic Linker</text>
      <text x="24" y="72" fill="#8b949e" font-size="15" font-family="sans-serif">libavcodec, libavformat, libswresample, libopus</text>
      <text x="24" y="96" fill="#8b949e" font-size="14" font-family="sans-serif">W^X compliant lib*.so binaries in nativeLibraryDir</text>

      <rect x="532" y="38" width="84" height="36" rx="10" fill="#21262d"/>
      <text x="574" y="61" fill="#3fb950" font-size="14" font-weight="700" text-anchor="middle" font-family="sans-serif">LOADED</text>
    </g>
  </g>

  ${bottomNav('settings')}
</svg>
`;
}

const list = [
  { file: 'home', svg: makeHomeSvg() },
  { file: 'search', svg: makeSearchSvg() },
  { file: 'format-picker', svg: makeFormatPickerSvg() },
  { file: 'downloads', svg: makeFormatPickerSvg() },
  { file: 'queue', svg: makeQueueSvg() },
  { file: 'library', svg: makeQueueSvg() },
  { file: 'settings', svg: makeSettingsSvg() },
];

for (const item of list) {
  const svgPath = join('public/shots', `${item.file}.svg`);
  const pngPath = join('public/shots', `${item.file}.png`);
  writeFileSync(svgPath, item.svg.trim());
  execFileSync('rsvg-convert', ['-w', String(W), '-h', String(H), '-f', 'png', '-o', pngPath, svgPath]);
  console.log(`[shots] rendered: ${pngPath} (${W}x${H})`);
}

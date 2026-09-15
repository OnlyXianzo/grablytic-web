export interface FeatureItem {
  title: string;
  body: string;
  guideAnchor: string;
}

export const features: FeatureItem[] = [
  {
    title: '1,000+ Platforms',
    body: 'YouTube 4K/8K/HDR, SoundCloud 320k, Twitch, TikTok, Instagram, Bandcamp, and hundreds more supported natively via yt-dlp.',
    guideAnchor: '/docs/features/',
  },
  {
    title: 'Dual JS Runtimes',
    body: 'Two built-in engines pick the right solver for your device — fast by default, compatible everywhere. Nothing extra to install.',
    guideAnchor: '/docs/install/',
  },
  {
    title: 'Zero Telemetry',
    body: 'No ads, no trackers, no analytics SDKs. 100% local processing strictly contained on your personal device.',
    guideAnchor: '/docs/#privacy',
  },
  {
    title: 'Highest Fidelity',
    body: 'Saves the original quality — crisp video up to 4K/8K/HDR, full-quality audio, subtitles and thumbnails. No re-encoding, no quality loss.',
    guideAnchor: '/docs/features/',
  },
  {
    title: 'Hardware-Optimized',
    body: 'Tuned builds for every chip — fast downloads and a smooth 120Hz interface on phones, foldables, tablets and desktops.',
    guideAnchor: '/docs/install/',
  },
  {
    title: '100% Open Source',
    body: 'Every line of code is published under the GPL-3.0 license. Inspect, audit, verify, and improve freely.',
    guideAnchor: '/docs/#license',
  },
  {
    title: 'Batch Playlists',
    body: 'Download a whole playlist in one tap — pick videos, grab audio-only, and let the queue with auto-skip handle the rest.',
    guideAnchor: '/docs/features/',
  },
  {
    title: 'Fluid Dark UI',
    body: 'A clean interface that stays smooth at 120Hz — readable on phones, foldables, tablets and desktop alike.',
    guideAnchor: '/docs/features/',
  },
];

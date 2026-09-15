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
    body: 'Deno 2.7.7 for blazingly fast startup, Node.js 25.3.0 for broad script compatibility — selected per device at install.',
    guideAnchor: '/docs/install/',
  },
  {
    title: 'Zero Telemetry',
    body: 'No ads, no trackers, no analytics SDKs. 100% local processing strictly contained on your personal device.',
    guideAnchor: '/docs/#privacy',
  },
  {
    title: 'Highest Fidelity',
    body: 'Direct stream demuxing with Opus/AAC audio preservation and clean MP4/MKV container muxing without re-encoding loss.',
    guideAnchor: '/docs/features/',
  },
  {
    title: 'Hardware-Optimized',
    body: 'Native Bionic C FFmpeg compilation targeting each ABI directly: arm64-v8a, armeabi-v7a, and x86_64.',
    guideAnchor: '/docs/install/',
  },
  {
    title: '100% Open Source',
    body: 'Every line of code is published under the GPL-3.0 license. Inspect, audit, verify, and improve freely.',
    guideAnchor: '/docs/#license',
  },
  {
    title: 'Batch Playlists',
    body: 'One-click full playlist downloading with selective filtering, audio-only toggles, and concurrent queue management.',
    guideAnchor: '/docs/features/',
  },
  {
    title: 'Fluid Dark UI',
    body: 'Engineered for responsive 120Hz frame rates across phones, foldables, tablets, and desktop workstations.',
    guideAnchor: '/docs/features/',
  },
];

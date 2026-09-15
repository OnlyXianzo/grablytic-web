export interface FaqGroupItem {
  q: string;
  a: string;
}

export type FaqItem = FaqGroupItem;

export interface FaqGroup {
  heading: string;
  items: FaqGroupItem[];
}

// Single source of truth for every FAQ surface.
// - docs/faq renders `faqGroups` directly (17 Q&As).
// - landing `faqs.ts` re-exports 6 curated entries by reference (no copy-paste drift).
// - index.astro + docs/faq.astro both derive FAQPage JSON-LD from these objects.
export const faqGroups: FaqGroup[] = [
  {
    heading: 'General',
    items: [
      {
        q: 'Is Grablytic really free?',
        a: 'Yes, completely. No paid tiers, no ads, no tracking, no subscriptions, no feature gates. Grablytic is 100% open source under the GNU General Public License v3.0 (GPL-3.0) — every line is published on GitHub for inspection and audit.',
      },
      {
        q: 'Where do I download it?',
        a: 'Right here — this site routes you directly to official GitHub Releases. Android users can also install via Obtainium for seamless automated updates. See the install guide for per-OS steps.',
      },
      {
        q: 'Does it require an account or login?',
        a: 'No accounts, no email sign-ups, no cloud registration. Install the binary and start downloading immediately. Optional logins (e.g. cookies for age-gated or private content) stay on your device and are strictly opt-in.',
      },
      {
        q: 'Where does the downloaded media come from?',
        a: 'Grablytic extracts publicly available streams directly from platforms via yt-dlp, on your own device. It hosts and stores no content itself. See the DMCA notice on GitHub for takedown inquiries.',
      },
      {
        q: 'Can I contribute to development or packaging?',
        a: 'Absolutely — issues, feature requests, and pull requests are welcome on GitHub. Packaging manifests live in the distribution/ and fastlane/ directories of the repository.',
      },
    ],
  },
  {
    heading: 'Install & platforms',
    items: [
      {
        q: 'Which platforms and architectures are supported?',
        a: 'Android 8+ (arm64, armv7, x86_64), Linux x64 and arm64 (standalone tarball, .deb, .rpm, Arch pkg.tar.zst), and Windows 10/11 x64 (portable zip). iOS and Web are not supported. See the install guide for per-OS steps.',
      },
      {
        q: 'Which Android APK should I choose?',
        a: 'Most modern phones: arm64 + Deno (recommended default — Deno is yt-dlp\'s preferred, sandboxed JS runtime). Want a smaller download? arm64 + Node.js solves the same challenges in ~40 MB less. 32-bit budget devices take the armv7 Node build; Chromebooks and emulators take x86_64. The universal APK bundles everything (458 MB) if you would rather not decide.',
      },
      {
        q: 'Do I need Deno or Node.js installed?',
        a: 'No. Desktop bootstraps Deno automatically on first launch; Android ships the runtime inside the APK. A system Deno/Node on PATH is only ever used as a fallback.',
      },
      {
        q: 'How do updates work?',
        a: 'Android users can install via Obtainium for seamless automated updates from GitHub Releases. On Android, engine binaries (FFmpeg, JS runtime) ride app updates because the OS forbids executing downloaded files. On desktop, yt-dlp and engine components update silently with integrity checks — switch channels (stable / nightly / master) in Settings → Updates.',
      },
      {
        q: 'I used TrueStream. How do I migrate?',
        a: 'Install Grablytic alongside TrueStream, verify it works, then uninstall the old app — Android treats it as a new application. Your existing Download/TrueStream folder keeps being used automatically; app-private settings and history do not carry over.',
      },
    ],
  },
  {
    heading: 'Privacy & security',
    items: [
      {
        q: 'What data leaves my device?',
        a: 'Nothing except the normal requests to the platforms you download from. There is no analytics SDK, no crash-reporting phone-home, no account server. Diagnostic logs stay on-device unless you explicitly export them — and tokens are redacted automatically before export.',
      },
      {
        q: 'How are my logins and cookies protected?',
        a: 'Session cookies are stored app-private with 0600 permissions, excluded from cloud backups, and never transmitted anywhere except to the platform you authenticated with. You can wipe all app data, logs, and cookies at any time from Settings.',
      },
      {
        q: 'How do I report a security vulnerability?',
        a: 'Privately, via GitHub Security Advisories on the Grablytic repository. Never file public issues for security problems.',
      },
    ],
  },
  {
    heading: 'Downloading & features',
    items: [
      {
        q: 'What quality can I download?',
        a: 'Up to whatever the platform serves — including YouTube 4K/8K/HDR where available. The quality ceiling cascades AV1 → VP9 → H264, and the Format Picker lets you override with an explicit format, download audio-only (Opus default, FLAC and compact presets), embed subtitles and thumbnails, and apply SponsorBlock cuts.',
      },
      {
        q: 'Can I download whole playlists or many links at once?',
        a: 'Yes. Paste multiple URLs for batch queues (up to 5 concurrent downloads), or open a playlist for a selection screen with multi-select, reverse/shuffle, ranges like 1-10, and unavailable-video marking. A download archive skips repeats automatically.',
      },
      {
        q: 'Why is my download stuck at 99%?',
        a: 'That is by design: streaming progress caps at 99% and only the terminal finished event reports 100%, because FFmpeg post-processing (merging, embedding, chapters) still runs after the last byte arrives. Check the live log for the post-processing stage.',
      },
      {
        q: 'Do downloads resume after reboot or failure?',
        a: 'Yes. Downloads snapshot progress continuously and recover automatically on startup, including after a reboot. Partial files younger than 24 hours in the cache directory qualify for resume.',
      },
    ],
  },
  {
    heading: 'Engine & runtimes',
    items: [
      {
        q: 'What is yt-dlp, exactly?',
        a: 'yt-dlp is the open-source download engine inside Grablytic — a battle-tested tool that understands 1,000+ sites and extracts the best available streams. Grablytic is the friendly app wrapped around it: the interface, queue, Format Picker, merging, tagging, and updates. When sites change their layouts, engine updates (silent on desktop, riding app updates on Android) keep downloads working without you doing anything.',
      },
      {
        q: 'Why does a downloader need JavaScript?',
        a: 'Because YouTube fights downloaders with JavaScript puzzles. Streams are protected by signature-scrambling and proof-of-origin challenges that change regularly — the only reliable way through is to run the site\'s own puzzle code, which is written in JavaScript. yt-dlp executes those solver scripts in a small JS runtime on your device. No working JS runtime means YouTube downloads fail with signature or challenge errors — which is why Settings → Diagnostics & Logs shows your runtime health front and center.',
      },
      {
        q: 'What are Deno, Node.js, and QuickJS doing in my app?',
        a: 'They are three JavaScript runners, any one of which can solve the video-site puzzles — and they do nothing else. Deno (currently v2.7.7) is the default: it is yt-dlp\'s recommended runtime, sandboxed, and the fastest at challenge solving. Node.js (currently v25.3.0) solves the same puzzles in a ~40 MB smaller download. QuickJS is a tiny built-in fallback that is always there. Only allowlisted puzzle scripts ever run; your browsing and files are never touched by them.',
      },
      {
        q: 'Why ship two runtimes (dual) instead of one?',
        a: 'Coverage and resilience. No single runtime fits every device: Deno ships no 32-bit ARM build, so budget 32-bit phones need Node.js, while modern phones get the faster Deno default. And runtimes form an automatic fallback chain — Deno, then Node.js, then QuickJS — so if one is missing or unhealthy, the next quietly takes over instead of your download failing. You pick the bundle that matches your phone at install time; the app handles the rest.',
      },
      {
        q: 'Why is the Android APK so big?',
        a: 'Because Android forces everything to ship inside the box. Three heavy things must be bundled: the FFmpeg video toolkit compiled separately for each phone chip (arm64, 32-bit ARM, x86_64), a full JavaScript runtime (Deno ≈ 91 MB, Node.js ≈ 50 MB), and the app itself — all verified by checksum at build time. Android forbids apps from executing anything downloaded later, so unlike desktop, nothing can be fetched on first launch. The fix is choice: the recommended arm64 + Deno APK downloads only your chip and one runtime, while the 458 MB universal APK (every chip + both runtimes) exists so nobody has to think at all.',
      },
      {
        q: 'Why is the Windows download so small then?',
        a: 'Because desktops are allowed to finish setup after install. The portable .zip stays lean (≈ 30 MB class): on first launch a bootstrapper fetches FFmpeg and the Deno runtime automatically, each SHA-256 verified before it is trusted. Same verified components as Android — just delivered on first run instead of inside the download, which is exactly what Android\'s security rules forbid.',
      },
      {
        q: 'How does Grablytic handle YouTube blocks and members-only videos?',
        a: 'In layers, from least to most invasive. First it tries anonymously — no login, no cookies — using multiple player clients so a single blocked route never kills the download. Proof-of-origin tokens are generated locally by the bundled runtime. Only if the video genuinely requires it (age-gated, private, member content) do you sign in through the in-app browser, and those cookies stay on your device, opt-in, never uploaded. If a region or IP block remains, the error card says so plainly and suggests the fix (VPN, proxy, or cookies) instead of dumping a stack trace.',
      },
    ],
  },
];

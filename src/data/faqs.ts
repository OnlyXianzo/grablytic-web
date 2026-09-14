export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: 'Is TrueStream really free?',
    a: 'Yes, completely. No paid tiers, no ads, no tracking, and no subscriptions. TrueStream is 100% open source under the GNU General Public License v3.0 (GPL-3.0).',
  },
  {
    q: 'Where do I download it?',
    a: 'Right here — this page routes you directly to official GitHub Releases. Android users can also install via Obtainium for seamless automated updates.',
  },
  {
    q: 'Does it require an account or login?',
    a: 'No accounts, no email sign-ups, and no cloud registration. Install the binary and start downloading immediately.',
  },
  {
    q: 'Which platforms and architectures are supported?',
    a: 'Android (arm64, armv7, x86_64), Linux (x64, arm64: standalone tarball, .deb, .rpm, Arch pkg.tar.zst), and Windows 10/11 (x64 portable zip). iOS is not supported.',
  },
  {
    q: 'Can I contribute to development or packaging?',
    a: 'Absolutely — issues, feature requests, and pull requests are welcomed on GitHub. Packaging manifests live in the distribution/ and fastlane/ directories of the repository.',
  },
  {
    q: 'Where does the downloaded media come from?',
    a: 'TrueStream extracts publicly available streams directly via yt-dlp. It does not host or store any content. See DMCA for takedown inquiries and contact information.',
  },
];

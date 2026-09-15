export const TAG = 'v0.0.2';
export const REL = `https://github.com/OnlyXianzo/Grablytic/releases/download/${TAG}`;
export const REPO = 'https://github.com/OnlyXianzo/Grablytic';

export interface DownloadItem {
  file: string;
  label: string;
  os: 'android' | 'linux' | 'windows';
  arch: string;
  sha256: string;
  size: number;
}

export const downloads: DownloadItem[] = [
  // Android
  {
    file: 'grablytic-v0.0.2-arm64-deno.apk',
    label: 'Android arm64 (Deno, recommended)',
    os: 'android',
    arch: 'arm64',
    sha256: '32c5678497de5b96baa62ee7aa4c8cb452d604ca9717e64b7ab4af2e64798ead',
    size: 154730022,
  },
  {
    file: 'grablytic-v0.0.2-arm64-node.apk',
    label: 'Android arm64 (Node.js)',
    os: 'android',
    arch: 'arm64',
    sha256: '6817b395476d3b5a085e18c5c588a2ad7b992e534d27d5deaff4e01a24238251',
    size: 113797350,
  },
  {
    file: 'grablytic-v0.0.2-armv7-node.apk',
    label: 'Android 32-bit (armeabi-v7a)',
    os: 'android',
    arch: 'armv7',
    sha256: '373840367d822ec87e19a9f18f511947cebf93952679f5d728ac208b75abb7e9',
    size: 105148198,
  },
  {
    file: 'grablytic-v0.0.2-x86_64-deno.apk',
    label: 'Android x86_64 (Chromebook/emulator)',
    os: 'android',
    arch: 'x86_64',
    sha256: '1580cf5e5b9e38f854553b6e0a584f24eb127efb8aef23ebc9a526f2b05cbc48',
    size: 161111934,
  },
  {
    file: 'grablytic-v0.0.2-x86_64-node.apk',
    label: 'Android x86_64 (Node.js)',
    os: 'android',
    arch: 'x86_64',
    sha256: '3272377fe7495359053ed75c9d7a10d6996092ebd8beaed0d267b3f25510ad16',
    size: 115553730,
  },
  {
    file: 'grablytic-v0.0.2-universal.apk',
    label: 'Android universal (all ABIs, 458 MB)',
    os: 'android',
    arch: 'universal',
    sha256: '760beb0a85d0b70c19179793127a12e9ec1f0ca1f93b6004eab342a7f9cb76d2',
    size: 458038070,
  },
  // Linux
  {
    file: 'grablytic-0.0.2-linux-x64.tar.gz',
    label: 'Linux x64 portable',
    os: 'linux',
    arch: 'x64',
    sha256: 'f7d2b31876574637ad7e9c21598c39a8db8811484f77cf1a1425b4e6f928b9f7',
    size: 28663689,
  },
  {
    file: 'grablytic-0.0.2-linux-arm64.tar.gz',
    label: 'Linux arm64 portable',
    os: 'linux',
    arch: 'arm64',
    sha256: 'eb81d8a69d485428f16e120a20ec7283e11e92d107035d62580843ac27cf299e',
    size: 28244449,
  },
  {
    file: 'grablytic_0.0.2_amd64.deb',
    label: 'Debian/Ubuntu x64 (.deb)',
    os: 'linux',
    arch: 'x64',
    sha256: '9ece3617533b7f96404735b0c460f24c6b52b0c082b9d2246ce6675d702e49c5',
    size: 18559784,
  },
  {
    file: 'grablytic_0.0.2_arm64.deb',
    label: 'Debian/Ubuntu arm64 (.deb)',
    os: 'linux',
    arch: 'arm64',
    sha256: '55b5923f0bb9774e39035808c3d1302008f006d947085969c5f98c953f48607a',
    size: 18255138,
  },
  {
    file: 'grablytic-0.0.2-1.x86_64.rpm',
    label: 'Fedora/RHEL x64 (.rpm)',
    os: 'linux',
    arch: 'x64',
    sha256: '9ae73ce4772d403582ca789e9617b75e073fc658261b715b191af3635b40f705',
    size: 28902869,
  },
  {
    file: 'grablytic-0.0.2-1.aarch64.rpm',
    label: 'Fedora/RHEL arm64 (.rpm)',
    os: 'linux',
    arch: 'arm64',
    sha256: 'b05016ec91c97ec48f0920ef717fd5bea06ea8e7f7b0b5499cf4ca8efab894da',
    size: 28526660,
  },
  {
    file: 'grablytic-0.0.2-1-x86_64.pkg.tar.zst',
    label: 'Arch x64 (pacman -U)',
    os: 'linux',
    arch: 'x64',
    sha256: 'e86a0bfdb54465d8b1d0f1f0b17d558740aa6a174a2f7c01c1cad13d7ff7621e',
    size: 23868041,
  },
  {
    file: 'grablytic-0.0.2-1-aarch64.pkg.tar.zst',
    label: 'Arch arm64 (pacman -U)',
    os: 'linux',
    arch: 'arm64',
    sha256: 'ea0cd0240f75a2f6511aa154e05c38f7aee4474023044f06b9ecfbde90f0f53e',
    size: 23853501,
  },
  // Windows
  {
    file: 'grablytic-windows-x64.zip',
    label: 'Windows 10/11 x64 portable',
    os: 'windows',
    arch: 'x64',
    sha256: 'a150d0cf1fa4ec152bca03418b2ca6bcc01ef06d505a2041cc9ebb56a85920a3',
    size: 31297123,
  },
];

export const androidDownloads = downloads.filter((d) => d.os === 'android');
export const linuxDownloads = downloads.filter((d) => d.os === 'linux');
export const windowsDownloads = downloads.filter((d) => d.os === 'windows');

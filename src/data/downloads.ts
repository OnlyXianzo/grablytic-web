export const TAG = 'v0.6.0';
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
    file: 'grablytic-v0.6.0-arm64-deno.apk',
    label: 'Android arm64 (Deno, recommended)',
    os: 'android',
    arch: 'arm64',
    sha256: '346d29c1d21d884ee8b73730865fc7cb2a7e18c48fdbf887050832d544ef3259',
    size: 156967209,
  },
  {
    file: 'grablytic-v0.6.0-arm64-node.apk',
    label: 'Android arm64 (Node.js)',
    os: 'android',
    arch: 'arm64',
    sha256: '4cbd15fe76f509c7e273983e755f527f406c139db78651f84fc10d4401609207',
    size: 116034121,
  },
  {
    file: 'grablytic-v0.6.0-armv7-node.apk',
    label: 'Android 32-bit (armeabi-v7a)',
    os: 'android',
    arch: 'armv7',
    sha256: 'ed10eaba24e229de413a0bbbc2092b4ee6e46ab8a51df3acf2594d96d1ea03ad',
    size: 107404053,
  },
  {
    file: 'grablytic-v0.6.0-x86_64-deno.apk',
    label: 'Android x86_64 (Chromebook/emulator)',
    os: 'android',
    arch: 'x86_64',
    sha256: 'c34fc49fe16c7fa11eabfa1b8d983df0ff02a9c78af2f973f046cfdf06d75011',
    size: 163357181,
  },
  {
    file: 'grablytic-v0.6.0-x86_64-node.apk',
    label: 'Android x86_64 (Node.js)',
    os: 'android',
    arch: 'x86_64',
    sha256: '9daeab540287f1b383d3aa0f8cefd7012082c2a644ac5d9de54929917fb0c487',
    size: 117798797,
  },
  {
    file: 'grablytic-v0.6.0-universal.apk',
    label: 'Android universal (all ABIs, 461 MB)',
    os: 'android',
    arch: 'universal',
    sha256: '9137e9653f246334fecfdc6a43049eb79d3178958b8f976a544e8ee6980616c5',
    size: 460796397,
  },
  // Linux
  {
    file: 'grablytic-0.6.0-linux-x64.tar.gz',
    label: 'Linux x64 portable',
    os: 'linux',
    arch: 'x64',
    sha256: 'f4792e08cc1fe2e352af08b6711f314ace30ad7c7a47a213f5b402a561dcfa18',
    size: 30167456,
  },
  {
    file: 'grablytic-0.6.0-linux-arm64.tar.gz',
    label: 'Linux arm64 portable',
    os: 'linux',
    arch: 'arm64',
    sha256: 'ed3c7227340770af893810322a4cbe36f8b9e975ec04e47d8ad87aa9cc99c8ac',
    size: 29746918,
  },
  {
    file: 'grablytic_0.6.0_amd64.deb',
    label: 'Debian/Ubuntu x64 (.deb)',
    os: 'linux',
    arch: 'x64',
    sha256: 'dc8e23a1901a5f456426845dd1830a0058e54cabdb8078d2a04d3ff6195a2140',
    size: 19928744,
  },
  {
    file: 'grablytic_0.6.0_arm64.deb',
    label: 'Debian/Ubuntu arm64 (.deb)',
    os: 'linux',
    arch: 'arm64',
    sha256: 'd3fa77c9dfbfd37e73eca0755095bf42aed00f9e4c787ff052f6013d7ba458d3',
    size: 19604706,
  },
  {
    file: 'grablytic-0.6.0-1.x86_64.rpm',
    label: 'Fedora/RHEL x64 (.rpm)',
    os: 'linux',
    arch: 'x64',
    sha256: '1b8fe35f3af23ac47469ce606ef90fa128d7815f1c8745513e343b4f184007d4',
    size: 30412340,
  },
  {
    file: 'grablytic-0.6.0-1.aarch64.rpm',
    label: 'Fedora/RHEL arm64 (.rpm)',
    os: 'linux',
    arch: 'arm64',
    sha256: '02c473e84d56fd3be58392321db0ca11ef504dcc10a227d999e287415f5fa838',
    size: 30029134,
  },
  {
    file: 'grablytic-0.6.0-1-x86_64.pkg.tar.zst',
    label: 'Arch x64 (pacman -U)',
    os: 'linux',
    arch: 'x64',
    sha256: '0ad5256b69e84057741e5747849a1c53c2a5380014769e5b3e7471e650d3a7b0',
    size: 25769923,
  },
  {
    file: 'grablytic-0.6.0-1-aarch64.pkg.tar.zst',
    label: 'Arch arm64 (pacman -U)',
    os: 'linux',
    arch: 'arm64',
    sha256: '066a87839f4e4a1c3f44f374528a8d2297f1bccbe9306613240c614e72e045e7',
    size: 25056866,
  },
  // Windows
  {
    file: 'grablytic-windows-x64.zip',
    label: 'Windows 10/11 x64 portable',
    os: 'windows',
    arch: 'x64',
    sha256: '5b98ca97da494000d20c0bbfd5cd065a6b55227e555ef01dc774c632950b7c8f',
    size: 32847737,
  },
];

export const androidDownloads = downloads.filter((d) => d.os === 'android');
export const linuxDownloads = downloads.filter((d) => d.os === 'linux');
export const windowsDownloads = downloads.filter((d) => d.os === 'windows');

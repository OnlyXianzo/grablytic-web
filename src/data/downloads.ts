export const TAG = 'v0.0.6';
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
    file: 'grablytic-v0.0.6-arm64-deno.apk',
    label: 'Android arm64 (Deno, recommended)',
    os: 'android',
    arch: 'arm64',
    sha256: '4e6fab05ef8d9a99c507f03e83fdea08d4196243122b40d0f1378930c81edf13',
    size: 156966949,
  },
  {
    file: 'grablytic-v0.0.6-arm64-node.apk',
    label: 'Android arm64 (Node.js)',
    os: 'android',
    arch: 'arm64',
    sha256: '7c153c2f0c445a3d0bd925e54896f0a4616f3c59759c711b10274d7e79d9ab98',
    size: 116034213,
  },
  {
    file: 'grablytic-v0.0.6-armv7-node.apk',
    label: 'Android 32-bit (armeabi-v7a)',
    os: 'android',
    arch: 'armv7',
    sha256: 'b2e6a93c8c18ada00e083a85bd65a5fbfa2499f6be9c85715299cedcdd5edfe8',
    size: 107403905,
  },
  {
    file: 'grablytic-v0.0.6-x86_64-deno.apk',
    label: 'Android x86_64 (Chromebook/emulator)',
    os: 'android',
    arch: 'x86_64',
    sha256: '29d8ac666cea6968fdb9efa31074b137e64dcc5240e6211a85b8f24dd9da8c6b',
    size: 163356841,
  },
  {
    file: 'grablytic-v0.0.6-x86_64-node.apk',
    label: 'Android x86_64 (Node.js)',
    os: 'android',
    arch: 'x86_64',
    sha256: '520355bdb9a72de608c01526a24593f645610d178f7b1dc83fabed7e0330676c',
    size: 117798033,
  },
  {
    file: 'grablytic-v0.0.6-universal.apk',
    label: 'Android universal (all ABIs, 461 MB)',
    os: 'android',
    arch: 'universal',
    sha256: '8ccbba5a51450c572ce8882a3dba6989f4f9b2b69babedf44f1c91c4e3ff049d',
    size: 460796369,
  },
  // Linux
  {
    file: 'grablytic-0.0.6-linux-x64.tar.gz',
    label: 'Linux x64 portable',
    os: 'linux',
    arch: 'x64',
    sha256: '5521338eb3c066bf2ec730f0ecd26f45afe596b4235acbf9bbe757d1c311a2bd',
    size: 30166460,
  },
  {
    file: 'grablytic-0.0.6-linux-arm64.tar.gz',
    label: 'Linux arm64 portable',
    os: 'linux',
    arch: 'arm64',
    sha256: '2ba6218120a61dd2a559f964a2b53814e3f9c9091cf4ef9dc3e1a9f92089ad44',
    size: 29742829,
  },
  {
    file: 'grablytic_0.0.6_amd64.deb',
    label: 'Debian/Ubuntu x64 (.deb)',
    os: 'linux',
    arch: 'x64',
    sha256: '40ca1b2a4d7753220e0dd262d19be964d5211ed4d7bb7d150fa4647c50ca6467',
    size: 19926286,
  },
  {
    file: 'grablytic_0.0.6_arm64.deb',
    label: 'Debian/Ubuntu arm64 (.deb)',
    os: 'linux',
    arch: 'arm64',
    sha256: '20e0d371af577fbd3c92f39746a0e889738cda960f4ee2f9f0299a9dace59799',
    size: 19601040,
  },
  {
    file: 'grablytic-0.0.6-1.x86_64.rpm',
    label: 'Fedora/RHEL x64 (.rpm)',
    os: 'linux',
    arch: 'x64',
    sha256: '62a679a1650fe6fc1dee31b9deff56e26d5d10c7e648a1da65849e3135c1acec',
    size: 30412280,
  },
  {
    file: 'grablytic-0.0.6-1.aarch64.rpm',
    label: 'Fedora/RHEL arm64 (.rpm)',
    os: 'linux',
    arch: 'arm64',
    sha256: 'a49960aad50d8c19a49936db815c48f1c11c90695c9724a90a519d902d0d4345',
    size: 30029108,
  },
  {
    file: 'grablytic-0.0.6-1-x86_64.pkg.tar.zst',
    label: 'Arch x64 (pacman -U)',
    os: 'linux',
    arch: 'x64',
    sha256: '8a68574bec69cb0efafd318d64d369ba401702d01f57d40ff6004968f39f5da0',
    size: 25769993,
  },
  {
    file: 'grablytic-0.0.6-1-aarch64.pkg.tar.zst',
    label: 'Arch arm64 (pacman -U)',
    os: 'linux',
    arch: 'arm64',
    sha256: 'e88f9973eb9e381e1f6c08fdd69132d2d31bc4cabae3c397ebe73c9519095bee',
    size: 25385470,
  },
  // Windows
  {
    file: 'grablytic-windows-x64.zip',
    label: 'Windows 10/11 x64 portable',
    os: 'windows',
    arch: 'x64',
    sha256: '68ae955e52abc643d0c825620d29e72edd35a0e4c4fdd65e234fb7349121ec5b',
    size: 32847829,
  },
];

export const androidDownloads = downloads.filter((d) => d.os === 'android');
export const linuxDownloads = downloads.filter((d) => d.os === 'linux');
export const windowsDownloads = downloads.filter((d) => d.os === 'windows');

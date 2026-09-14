export const TAG = 'v0.0.1';
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
    file: 'truestream-v0.0.1-arm64-deno.apk',
    label: 'Android arm64 (Deno, recommended)',
    os: 'android',
    arch: 'arm64',
    sha256: '11d1d7bfe4ccbb4b9ba07afa2f4177e4ae644b4f1ed42d4f02efc8c256e0e5ca',
    size: 154777748,
  },
  {
    file: 'truestream-v0.0.1-arm64-node.apk',
    label: 'Android arm64 (Node.js)',
    os: 'android',
    arch: 'arm64',
    sha256: '66b38bf5fff2253fc2e2b5c6d46a486a84cd39a6ac1d3d45c2204518f5cb809f',
    size: 113844828,
  },
  {
    file: 'truestream-v0.0.1-armv7-node.apk',
    label: 'Android 32-bit (armeabi-v7a)',
    os: 'android',
    arch: 'armv7',
    sha256: '5f9db397303814ec9c459328cba09ae386d4d313d92694f4890208258278a0ed',
    size: 105194020,
  },
  {
    file: 'truestream-v0.0.1-x86_64-deno.apk',
    label: 'Android x86_64 (Chromebook/emulator)',
    os: 'android',
    arch: 'x86_64',
    sha256: '482efe128b5dab3794cb65bafd8f7a80fa084194b0347a99561dbf637f830101',
    size: 161159476,
  },
  {
    file: 'truestream-v0.0.1-x86_64-node.apk',
    label: 'Android x86_64 (Node.js)',
    os: 'android',
    arch: 'x86_64',
    sha256: '5314c965600ba0d2b6ba4b1d272b82264125e39cc0d82bd13787a70601c6a67d',
    size: 115601144,
  },
  {
    file: 'truestream-v0.0.1-universal.apk',
    label: 'Android universal (all ABIs, 458 MB)',
    os: 'android',
    arch: 'universal',
    sha256: 'b7586c973b4ba929573333f15e418a28ef5c6f858ae6f807e903a2457dc0fa66',
    size: 458075988,
  },
  // Linux
  {
    file: 'truestream-0.0.1-linux-x64.tar.gz',
    label: 'Linux x64 portable',
    os: 'linux',
    arch: 'x64',
    sha256: 'ddba14063d1bb7d0d7c3e7d1f73fe2c4174cbec1f7528ef353b1f84a626f1450',
    size: 28760180,
  },
  {
    file: 'truestream-0.0.1-linux-arm64.tar.gz',
    label: 'Linux arm64 portable',
    os: 'linux',
    arch: 'arm64',
    sha256: '0f39d9eeef6b5ac851612c43b8dbbae20f748b4e6a17541e28033f66a4a0a6d0',
    size: 28342953,
  },
  {
    file: 'truestream_0.0.1_amd64.deb',
    label: 'Debian/Ubuntu x64 (.deb)',
    os: 'linux',
    arch: 'x64',
    sha256: '965d324a4d128f9e1205b9ffd363ed395eecb166c19066271c367bb00f09de8d',
    size: 18462750,
  },
  {
    file: 'truestream_0.0.1_arm64.deb',
    label: 'Debian/Ubuntu arm64 (.deb)',
    os: 'linux',
    arch: 'arm64',
    sha256: 'e1ca97a3afd24175bce65b17d55eabd70bdea2900893fed4092aa1ae94be1764',
    size: 18160324,
  },
  {
    file: 'truestream-0.0.1-1.x86_64.rpm',
    label: 'Fedora/RHEL x64 (.rpm)',
    os: 'linux',
    arch: 'x64',
    sha256: 'a7b73df62cfec38ef5ebeba9f7b248caa41bb6f1f8a444e17edb6fb9d0754016',
    size: 28864465,
  },
  {
    file: 'truestream-0.0.1-1.aarch64.rpm',
    label: 'Fedora/RHEL arm64 (.rpm)',
    os: 'linux',
    arch: 'arm64',
    sha256: 'b9427ec44c0339b38e6b128dbcdd02dd2032ab09ecd1a6915d18e26df939de70',
    size: 28487574,
  },
  {
    file: 'truestream-0.0.1-1-x86_64.pkg.tar.zst',
    label: 'Arch x64 (pacman -U)',
    os: 'linux',
    arch: 'x64',
    sha256: '0440e4237a30ddde666dbc382fd02a15f4516b89af9e0fd6514c4bd4e13aaa76',
    size: 23802899,
  },
  {
    file: 'truestream-0.0.1-1-aarch64.pkg.tar.zst',
    label: 'Arch arm64 (pacman -U)',
    os: 'linux',
    arch: 'arm64',
    sha256: '7bbfcf0ba152b18392dbc0305d705f63ab57c2300e7c000d28a6b0bc678f09ef',
    size: 23807991,
  },
  // Windows
  {
    file: 'truestream-windows-x64.zip',
    label: 'Windows 10/11 x64 portable',
    os: 'windows',
    arch: 'x64',
    sha256: '43c47468bf81c5e5a6a23722ff049ae4785a99bb709418fdbf0a13f8c6df8e8b',
    size: 31397917,
  },
];

export const androidDownloads = downloads.filter((d) => d.os === 'android');
export const linuxDownloads = downloads.filter((d) => d.os === 'linux');
export const windowsDownloads = downloads.filter((d) => d.os === 'windows');

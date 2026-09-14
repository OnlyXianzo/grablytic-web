export interface HomeData {
  hero: {
    badge: string;
    title: string;
    titleGradient: string;
    sub: string;
    primaryCta: {
      text: string;
      defaultFile: string;
    };
    sourceCta: {
      text: string;
      url: string;
    };
    obtainiumCta: {
      text: string;
      url: string;
    };
    supportCta: {
      text: string;
    };
    trustBadges: string[];
    staticStats: {
      platforms: string;
      platformsLabel: string;
      osCount: string;
      osLabel: string;
    };
  };
}

export const homeData: HomeData = {
  hero: {
    badge: 'v0.0.1 Beta',
    title: 'Media that moves you.',
    titleGradient: 'No ads. No tracking.',
    sub: 'TrueStream is a free, privacy-first media extractor for Android, Linux, and Windows — highest fidelity from 1,000+ platforms with 100% local device processing.',
    primaryCta: {
      text: 'Download',
      defaultFile: 'truestream-v0.0.1-arm64-deno.apk',
    },
    sourceCta: {
      text: 'View Source',
      url: 'https://github.com/OnlyXianzo/TrueStream',
    },
    obtainiumCta: {
      text: '✦ Add to Obtainium',
      url: 'obtainium://app/https://github.com/OnlyXianzo/TrueStream',
    },
    supportCta: {
      text: '♥ Support TrueStream',
    },
    trustBadges: [
      '100% Open Source (GPL-3.0)',
      'Zero Telemetry',
      'v0.0.1 Beta',
    ],
    staticStats: {
      platforms: '1,000+',
      platformsLabel: 'platforms supported',
      osCount: '3',
      osLabel: 'operating systems',
    },
  },
};

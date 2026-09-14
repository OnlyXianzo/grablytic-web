// Build-time GitHub stats fetch (run as `prebuild` + daily cron).
// Writes src/data/stats.json. NEVER ships zeros: on any fetch failure the
// previous committed snapshot is kept and the build proceeds with a warning.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const SNAP = new URL('../src/data/stats.json', import.meta.url);
const REPO = 'OnlyXianzo/Grablytic';
const HEADERS = { 'User-Agent': 'grablytic-web-stats', Accept: 'application/vnd.github+json' };
if (process.env.GH_TOKEN || process.env.GITHUB_TOKEN) {
  HEADERS.Authorization = `Bearer ${process.env.GH_TOKEN || process.env.GITHUB_TOKEN}`;
}

let prev = null;
try {
  prev = JSON.parse(readFileSync(SNAP, 'utf8'));
} catch { /* first run, no snapshot yet */ }

try {
  const [repo, rel] = await Promise.all([
    fetch(`https://api.github.com/repos/${REPO}`, { headers: HEADERS }).then((r) => {
      if (!r.ok) throw new Error(`repo API HTTP ${r.status}`);
      return r.json();
    }),
    fetch(`https://api.github.com/repos/${REPO}/releases/latest`, { headers: HEADERS }).then((r) => {
      if (!r.ok) throw new Error(`releases API HTTP ${r.status}`);
      return r.json();
    }),
  ]);
  const next = {
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    watchers: repo.subscribers_count,
    latest_tag: rel.tag_name,
    binaries: rel.assets.length,
    fetched_at: new Date().toISOString(),
  };
  if (![next.stars, next.forks, next.watchers, next.binaries].every((n) => Number.isInteger(n))) {
    throw new Error('non-integer payload, refusing to snapshot');
  }
  writeFileSync(SNAP, JSON.stringify(next, null, 2) + '\n');
  console.log(`[stats] live: ★${next.stars} forks:${next.forks} watching:${next.watchers} binaries:${next.binaries} (${next.latest_tag})`);
} catch (err) {
  if (prev) {
    console.warn(`[stats] fetch failed (${err.message}) — keeping snapshot from ${prev.fetched_at}`);
  } else {
    console.error(`[stats] fetch failed and no snapshot exists: ${err.message}`);
    process.exit(1);
  }
}

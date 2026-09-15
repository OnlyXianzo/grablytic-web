// Build-time GitHub nightly fetch (run as `prebuild` alongside fetch-stats).
// Writes src/data/nightly.json. NEVER ships zeros and NEVER fails the build:
// on any fetch failure the previous committed snapshot is kept and the build
// proceeds with a warning. When the API has no nightly/rolling release yet,
// a graceful empty-state snapshot ({ available: false, tag: null, ... }) is
// written so src/pages/nightly.astro renders "not published yet" copy.
import { readFileSync, writeFileSync } from 'node:fs';

const SNAP = new URL('../src/data/nightly.json', import.meta.url);
const REPO = 'OnlyXianzo/Grablytic';
const HEADERS = { 'User-Agent': 'grablytic-web-nightly', Accept: 'application/vnd.github+json' };
if (process.env.GH_TOKEN || process.env.GITHUB_TOKEN) {
  HEADERS.Authorization = `Bearer ${process.env.GH_TOKEN || process.env.GITHUB_TOKEN}`;
}

let prev = null;
try {
  prev = JSON.parse(readFileSync(SNAP, 'utf8'));
} catch { /* first run, no snapshot yet */ }

function pickNightly(releases) {
  const byTag = (r) => (r.tag_name || '').toLowerCase();
  // 1) rolling/nightly tag match
  let hit = releases.find((r) => byTag(r).includes('nightly') || byTag(r).includes('rolling'));
  // 2) fall back to latest prerelease
  if (!hit) hit = releases.find((r) => r.prerelease === true);
  return hit || null;
}

function extractSha(rel) {
  const body = rel.body || '';
  const m = body.match(/\b([0-9a-f]{7,40})\b/i);
  if (m) return m[1];
  if (typeof rel.target_commitish === 'string' && rel.target_commitish.length >= 7) {
    // target_commitish is usually a branch name ("main"); only use it when it looks like a SHA
    if (/^[0-9a-f]{7,40}$/i.test(rel.target_commitish)) return rel.target_commitish;
  }
  return null;
}

function extractHighlights(rel) {
  const body = (rel.body || '').split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  // Skip pure SHA / metadata lines, keep the first ~8 human-readable lines
  const cleaned = body.filter((l) => !/^[0-9a-f]{7,40}$/i.test(l)).slice(0, 8);
  return cleaned;
}

function emptySnapshot(reason) {
  return {
    available: false,
    tag: null,
    published_at: null,
    commit_sha: null,
    highlights: [],
    asset_count: 0,
    assets: [],
    html_url: `https://github.com/${REPO}/releases`,
    fetched_at: new Date().toISOString(),
    note: reason,
  };
}

try {
  const releases = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=30`, { headers: HEADERS }).then((r) => {
    if (!r.ok) throw new Error(`releases API HTTP ${r.status}`);
    return r.json();
  });
  if (!Array.isArray(releases)) throw new Error('unexpected releases payload');
  const hit = pickNightly(releases);
  if (!hit) {
    const next = emptySnapshot('nightly not published yet');
    writeFileSync(SNAP, JSON.stringify(next, null, 2) + '\n');
    console.log('[nightly] empty: no nightly/rolling tag or prerelease found — wrote empty-state snapshot');
  } else {
    const assets = (hit.assets || []).map((a) => ({
      name: a.name,
      download_url: a.browser_download_url,
      size: a.size,
    }));
    const next = {
      available: true,
      tag: hit.tag_name,
      published_at: hit.published_at,
      commit_sha: extractSha(hit),
      highlights: extractHighlights(hit),
      asset_count: (hit.assets || []).length,
      assets,
      html_url: hit.html_url,
      fetched_at: new Date().toISOString(),
    };
    if (typeof next.tag !== 'string' || !Number.isInteger(next.asset_count)) {
      throw new Error('non-integer/string payload, refusing to snapshot');
    }
    writeFileSync(SNAP, JSON.stringify(next, null, 2) + '\n');
    console.log(`[nightly] live: ${next.tag} assets:${next.asset_count} published:${next.published_at}`);
  }
} catch (err) {
  if (prev) {
    console.warn(`[nightly] fetch failed (${err.message}) — keeping snapshot from ${prev.fetched_at}`);
  } else {
    console.error(`[nightly] fetch failed and no snapshot exists: ${err.message}`);
    process.exit(1);
  }
}

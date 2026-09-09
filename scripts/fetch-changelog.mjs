import fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';

const execP = promisify(exec);

const OWNER = 'Fotetsa';
const REPO = 'hullbay';
const OUT_PATH = './docs/ads/changelog.mdx';

const RAW_MAIN_URL = `https://raw.githubusercontent.com/${OWNER}/${REPO}/main/CHANGELOG.md`;
const API_CONTENTS_URL = `https://api.github.com/repos/${OWNER}/${REPO}/contents/CHANGELOG.md`;
const API_RELEASES_URL = `https://api.github.com/repos/${OWNER}/${REPO}/releases`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWithRetries(url, attempts = 4, backoff = 500) {
  let lastErr = null;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return await res.text();
    } catch (err) {
      lastErr = err;
      const wait = backoff * Math.pow(2, i);
      console.warn(`Fetch attempt ${i + 1} failed: ${err.message}. Retrying in ${wait}ms...`);
      await sleep(wait);
    }
  }
  throw lastErr;
}

async function tryDownloadChangelog() {
  // 1) raw main
  try {
    return await fetchWithRetries(RAW_MAIN_URL, 4, 500);
  } catch (err) {
    console.warn('raw main fetch failed:', err.message);
  }

  // 2) contents API
  try {
    const jsonText = await fetchWithRetries(API_CONTENTS_URL, 3, 500);
    const meta = JSON.parse(jsonText);
    if (meta && meta.download_url) {
      try {
        return await fetchWithRetries(meta.download_url, 3, 500);
      } catch (err) {
        console.warn('download_url fetch failed:', err.message);
      }
    }
  } catch (err) {
    console.warn('contents API fetch failed:', err.message);
  }

  // 3) releases API
  try {
    const releasesText = await fetchWithRetries(API_RELEASES_URL + '?per_page=5', 2, 500);
    const releases = JSON.parse(releasesText);
    if (Array.isArray(releases) && releases.length > 0) {
      const rel = releases.find(r => !r.draft && r.body) || releases[0];
      if (rel && rel.body) return `# ${rel.name || rel.tag_name}\n\n${rel.body}`;
    }
  } catch (err) {
    console.warn('releases API fetch failed:', err.message);
  }

  throw new Error('All fetch attempts failed');
}

async function gitFallback() {
  // try common refs
  const refs = ['origin/main', 'main', 'HEAD'];
  for (const ref of refs) {
    try {
      const { stdout } = await execP(`git show ${ref}:CHANGELOG.md`, { cwd: process.cwd() });
      if (stdout && stdout.trim()) return stdout;
    } catch (e) {
      // ignore
    }
  }
  return null;
}

async function main() {
  try {
    const text = await tryDownloadChangelog();
    let out = text.trim();
    if (!out.startsWith('#')) out = `# Changelog\n\n${out}`;
    await fs.writeFile(OUT_PATH, out + '\n', 'utf8');
    console.log(`Wrote changelog to ${OUT_PATH}`);
    return;
  } catch (err) {
    console.warn('Failed to fetch remote changelog:', err.message);
  }

  // git fallback
  try {
    const gitContent = await gitFallback();
    if (gitContent) {
      let out = gitContent.trim();
      if (!out.startsWith('#')) out = `# Changelog\n\n${out}`;
      await fs.writeFile(OUT_PATH, out + '\n', 'utf8');
      console.log(`Wrote changelog to ${OUT_PATH} (from git)`);
      return;
    }
  } catch (e) {
    console.warn('Git fallback failed:', e.message);
  }

  // keep existing file if exists
  try {
    await fs.access(OUT_PATH);
    console.warn('Unable to update changelog; keeping existing file.');
    return;
  } catch (_) {}

  // final placeholder
  const msg = `# Changelog\n\n> Erreur lors de la récupération du changelog distant: Aucun contenu disponible pour le moment.\n\n<!-- GITHUB_CHANGELOG:${RAW_MAIN_URL} -->\n\n*Le contenu du changelog sera mis à jour automatiquement lorsqu'il sera disponible.*\n`;
  await fs.writeFile(OUT_PATH, msg, 'utf8');
  console.warn('Wrote placeholder changelog');
}

main();

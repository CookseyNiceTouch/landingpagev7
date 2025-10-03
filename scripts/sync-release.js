#!/usr/bin/env node

import { Octokit } from '@octokit/rest';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration - update these with your repository details
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'CookseyNiceTouch';
const GITHUB_REPO = process.env.GITHUB_REPO || 'nice-touch-app-releases';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Optional for public repos, helps avoid rate limits
const DEBUG_RELEASE_SYNC = (process.env.DEBUG_RELEASE_SYNC || '').toLowerCase() === 'true' || process.env.DEBUG_RELEASE_SYNC === '1';

// Initialize Octokit
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

async function syncLatestRelease() {
  try {
    console.log('▶️  Starting release sync');
    console.log(`   • Repo: ${GITHUB_OWNER}/${GITHUB_REPO}`);
    console.log(`   • Auth: ${GITHUB_TOKEN ? 'token set' : 'no token'}`);
    if (DEBUG_RELEASE_SYNC) {
      console.log(`   • CWD: ${process.cwd()}`);
      console.log(`   • Output dir: ${path.join(__dirname, '..', 'public', 'downloads')}`);
    }

    console.log(`🔄 Fetching releases from ${GITHUB_OWNER}/${GITHUB_REPO}...`);
    
    // Fetch releases (includes pre-releases and drafts)
    const { data: releases } = await octokit.rest.repos.listReleases({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      per_page: 10,
    });

    if (!releases || releases.length === 0) {
      throw new Error('No releases found in this repository');
    }

    if (DEBUG_RELEASE_SYNC) {
      console.log(`   • Received ${releases.length} release(s)`);
      releases.slice(0, 5).forEach((r, idx) => {
        console.log(`     - [${idx}] tag=${r.tag_name} name=${r.name || ''} draft=${r.draft} prerelease=${r.prerelease} assets=${r.assets?.length || 0}`);
      });
    }

    // Prefer latest stable (non-draft, non-prerelease); otherwise fallback to most recent non-draft
    const stableRelease = releases.find(r => !r.draft && !r.prerelease);
    const nonDraftRelease = releases.find(r => !r.draft);
    const release = stableRelease || nonDraftRelease || releases[0];

    console.log(`✅ Found release: ${release.name || release.tag_name}${release.prerelease ? ' (pre-release)' : ''}`);
    if (DEBUG_RELEASE_SYNC) {
      console.log(`   • published_at=${release.published_at} html_url=${release.html_url}`);
      console.log(`   • assets: ${release.assets?.length || 0}`);
      release.assets?.forEach((a, i) => console.log(`     - asset[${i}] ${a.name} ${a.browser_download_url} (${a.size} bytes)`));
    }

    // Find platform-specific assets
    const windowsAsset = release.assets.find(asset => 
      asset.name.toLowerCase().includes('windows') || 
      asset.name.toLowerCase().includes('win') ||
      asset.name.endsWith('.msi') ||
      asset.name.endsWith('.exe')
    );

    const macosAsset = release.assets.find(asset =>
      asset.name.toLowerCase().includes('macos') ||
      asset.name.toLowerCase().includes('mac') ||
      asset.name.toLowerCase().includes('darwin') ||
      asset.name.endsWith('.dmg')
    );

    const linuxAsset = release.assets.find(asset =>
      asset.name.toLowerCase().includes('linux') ||
      asset.name.endsWith('.appimage') ||
      asset.name.endsWith('.deb') ||
      asset.name.endsWith('.rpm')
    );

    // Build the release data structure
    if (DEBUG_RELEASE_SYNC) {
      console.log('🔎 Asset match summary:');
      console.log(`   • Windows: ${windowsAsset ? windowsAsset.name : 'none'}`);
      console.log(`   • macOS:   ${macosAsset ? macosAsset.name : 'none'}`);
      console.log(`   • Linux:   ${linuxAsset ? linuxAsset.name : 'none'}`);
    }

    const releaseData = {
      version: release.tag_name.replace(/^v/, ''), // Remove 'v' prefix if present
      tag_name: release.tag_name,
      release_name: release.name || `Nice Touch ${release.tag_name}`,
      description: release.body || 'Latest release of Nice Touch - the OS for creators',
      published_at: release.published_at,
      html_url: release.html_url,
      platforms: {
        windows: {
          available: !!windowsAsset,
          download_url: windowsAsset?.browser_download_url || null,
          filename: windowsAsset?.name || null,
          size: windowsAsset ? formatFileSize(windowsAsset.size) : null,
          requirements: "Windows 10+",
          ...(windowsAsset ? {} : { coming_soon: true })
        },
        macos: {
          available: !!macosAsset,
          download_url: macosAsset?.browser_download_url || null,
          filename: macosAsset?.name || null,
          size: macosAsset ? formatFileSize(macosAsset.size) : null,
          requirements: "macOS 11+",
          ...(macosAsset ? {} : { coming_soon: true })
        },
        linux: {
          available: !!linuxAsset,
          download_url: linuxAsset?.browser_download_url || null,
          filename: linuxAsset?.name || null,
          size: linuxAsset ? formatFileSize(linuxAsset.size) : null,
          requirements: "Ubuntu 20.04+",
          ...(linuxAsset ? {} : { coming_soon: true })
        }
      },
      github_release: {
        api_url: `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`,
        auto_update: true,
        last_synced: new Date().toISOString()
      }
    };

    // Write to latest-staging.json (pre-releases channel)
    const outputPath = path.join(__dirname, '..', 'public', 'downloads', 'latest-staging.json');
    if (DEBUG_RELEASE_SYNC) {
      console.log(`📝 Writing file to: ${outputPath}`);
    }
    
    // Ensure directory exists
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // Compare with existing contents (if any)
    let previous = null;
    try {
      previous = await fs.readFile(outputPath, 'utf8');
      if (DEBUG_RELEASE_SYNC) {
        console.log(`   • Existing file found (${previous.length} bytes)`);
      }
    } catch (_) {
      if (DEBUG_RELEASE_SYNC) console.log('   • No existing file (will create new)');
    }

    const nextJson = JSON.stringify(releaseData, null, 2);
    await fs.writeFile(outputPath, nextJson);
    
    // Verify write by reading back
    const readBack = await fs.readFile(outputPath, 'utf8');
    if (DEBUG_RELEASE_SYNC) {
      console.log(`   • Wrote ${readBack.length} bytes`);
      if (previous && previous === readBack) {
        console.log('   • Note: File contents are identical to previous (no diff)');
      } else if (previous) {
        console.log('   • File updated (contents changed)');
      } else {
        console.log('   • File created');
      }
    }
    
    console.log('✅ Release data synced successfully!');
    console.log(`📦 Version: ${releaseData.version}`);
    console.log(`🪟 Windows: ${windowsAsset ? '✅ Available' : '❌ Not available'}`);
    console.log(`🍎 macOS: ${macosAsset ? '✅ Available' : '❌ Not available'}`);
    console.log(`🐧 Linux: ${linuxAsset ? '✅ Available' : '❌ Not available'}`);
    console.log(`📁 Updated: ${outputPath}`);

    if (DEBUG_RELEASE_SYNC) console.log('▶️  Completed release sync.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error syncing release data');
    if (error.status) console.error(`   • Status: ${error.status}`);
    console.error(`   • Message: ${error.message}`);
    if (DEBUG_RELEASE_SYNC && error.stack) {
      console.error('   • Stack:');
      console.error(error.stack);
    }
    if (error.response && error.response.data) {
      try {
        console.error('   • Response data:', typeof error.response.data === 'object' ? JSON.stringify(error.response.data, null, 2) : error.response.data);
      } catch (_) {
        console.error('   • Response data: [unprintable]');
      }
    }
    if (error.status === 404) {
      console.error('   Hint: Repository not found. Ensure GITHUB_OWNER and GITHUB_REPO are correct.');
    } else if (error.status === 401) {
      console.error('   Hint: Authentication failed. Check GITHUB_TOKEN (should not be needed for public repos).');
    }
    process.exit(1);
  }
}

// Helper function to format file size
function formatFileSize(bytes) {
  if (!bytes) return null;
  
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);
  
  return `${size.toFixed(1)} ${sizes[i]}`;
}

// Run the sync if called directly (robust on Windows/Unix)
const isDirectRun = !!(process.argv[1] && (path.resolve(process.argv[1]) === __filename));
if (isDirectRun) {
  syncLatestRelease();
}

export default syncLatestRelease;

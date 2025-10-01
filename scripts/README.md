# Release Sync Script

This script automatically syncs your GitHub release data to `public/downloads/latest-staging.json` (pre-release channel) for the download modal.

## Setup

1. **Set Environment Variables** (choose one method):

   **Environment variables (required for private repos):**
   - `GITHUB_OWNER` — your GitHub username or org. Example: `CookseyNiceTouch`
   - `GITHUB_REPO` — your repository name. Example: `nice_touch_app`
   - `GITHUB_TOKEN` — Personal Access Token with `repo` scope (required for private repos)
   - `DEBUG_RELEASE_SYNC` — set to `1` to enable verbose logging (optional)

   Examples:
   - macOS/Linux (bash):
     ```bash
     export GITHUB_OWNER=CookseyNiceTouch
     export GITHUB_REPO=nice_touch_app
     export GITHUB_TOKEN=ghp_xxx            # required if repo is private
     export DEBUG_RELEASE_SYNC=1            # optional
     npm run sync-release
     ```
   - Windows (PowerShell):
     ```powershell
     $env:GITHUB_OWNER = "CookseyNiceTouch"
     $env:GITHUB_REPO = "nice_touch_app"
     $env:GITHUB_TOKEN = "ghp_xxx"   # required if repo is private
     $env:DEBUG_RELEASE_SYNC = "1"    # optional
     npm run sync-release
     ```

   **Method B: Command Line Arguments**
   ```bash
   GITHUB_OWNER=your-github-username GITHUB_REPO=your-repo-name npm run sync-release
   ```

2. **GitHub Token**
   - Create a token at https://github.com/settings/tokens (classic) with `repo` scope if your repo is private
   - For public repos, token is optional but recommended to avoid rate limits

## Usage

```bash
# Run the sync script (uses env vars above)
npm run sync-release

# Or run directly (same behavior)
node scripts/sync-release.js
```

## What it does

1. Fetches the most recent release (prefers stable; falls back to latest pre-release) from your GitHub repository
2. Automatically detects platform-specific download files:
   - **Windows**: Files containing 'windows', 'win', or ending in '.msi'/'.exe'
   - **macOS**: Files containing 'macos', 'mac', 'darwin', or ending in '.dmg'
   - **Linux**: Files containing 'linux' or ending in '.AppImage'/'.deb'/'.rpm'
3. Updates `public/downloads/latest-staging.json` with the release information
4. Formats file sizes and maintains the JSON structure expected by the download modal

## Example Output

```
🔄 Fetching releases from CookseyNiceTouch/nice_touch_app...
✅ Found release: NT-APP 0.0.1-alpha.1 (pre-release)
✅ Release data synced successfully!
📦 Version: 0.0.1-alpha.1
🪟 Windows: ✅ Available
🍎 macOS: ❌ Not available
🐧 Linux: ❌ Not available
📁 Updated: /path/to/public/downloads/latest-staging.json
```

## Automation

You can automate this process by:
- Running it in your CI/CD pipeline after creating releases
- Setting up a GitHub Action to run it automatically
- Running it as part of your deployment process

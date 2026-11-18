// Accessibility check
//
// Opens every page of the built site in Google Chrome and tests it against
// WCAG 2.1 level AA, the accessibility standard most organizations follow.
// It uses pa11y-ci with the axe engine, which catches problems such as
// low color contrast, images without alt text, unlabeled buttons, and
// skipped heading levels. Each problem is listed with the page, the rule,
// and the HTML element, so it's easy to find and fix.
//
// Run it locally from the project folder with:
//   npm run build
//   npm run test:a11y
//
// How it works:
//   1. Starts a local web server for the built site in the build/ folder.
//   2. Reads the site's sitemap (build/sitemap.xml) to get the list of pages,
//      swapping the live address for the local server's address.
//   3. Runs pa11y-ci on every page, using the settings in .pa11yci.json.
//   4. Stops the server and fails if any page has a problem.

import {spawn} from 'node:child_process';
import {existsSync} from 'node:fs';

const PORT = 3210;
const LOCAL_URL = `http://localhost:${PORT}`;
const LIVE_URL = 'https://barbaramorach.me';

if (!existsSync('build/sitemap.xml')) {
  console.error('No built site found. Run "npm run build" first, then try again.');
  process.exit(1);
}

// 1. Start the server.
const server = spawn(
  'node_modules/.bin/docusaurus',
  ['serve', '--port', String(PORT), '--no-open'],
  {stdio: 'ignore'},
);

const stopServer = () => server.kill();
process.on('exit', stopServer);

// Wait up to 30 seconds for the server to respond.
async function waitForServer() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch(`${LOCAL_URL}/sitemap.xml`);
      if (res.ok) return;
    } catch {
      // Not ready yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  console.error(`The local server didn't start on port ${PORT}.`);
  process.exit(1);
}

await waitForServer();

// 2 and 3. Check every page in the sitemap.
const pa11y = spawn(
  'node_modules/.bin/pa11y-ci',
  [
    '--config', '.pa11yci.json',
    '--sitemap', `${LOCAL_URL}/sitemap.xml`,
    '--sitemap-find', LIVE_URL,
    '--sitemap-replace', LOCAL_URL,
  ],
  {stdio: 'inherit'},
);

// 4. Stop the server and pass on pa11y-ci's result.
pa11y.on('exit', (code) => {
  stopServer();
  process.exit(code ?? 1);
});

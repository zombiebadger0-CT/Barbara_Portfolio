// Old URL check
//
// The site moved from https://zombiebadger0-ct.github.io/Barbara_Portfolio/
// to its custom domain, https://barbaramorach.me/. GitHub forwards the old
// address for now, but links that rely on a redirect are fragile and look
// unpolished. This check fails if any file in the repository still uses the
// old address, and lists each file and line so it's easy to fix.
//
// Run it locally from the project folder with: npm run lint:urls

import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';

const OLD_URL = /zombiebadger0-ct\.github\.io/i;
const NEW_URL = 'https://barbaramorach.me';

// This script has to mention the old address to search for it, so skip it.
const SKIP = new Set(['scripts/check-old-urls.mjs']);

// Only check files tracked by Git, so build output and node_modules are ignored.
const files = execFileSync('git', ['ls-files'], {encoding: 'utf8'})
  .split('\n')
  .filter((file) => file && !SKIP.has(file));

const problems = [];
for (const file of files) {
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch {
    continue; // Deleted but not yet committed, or unreadable.
  }
  if (text.includes('\0')) continue; // Binary file, such as an image or PDF.
  text.split('\n').forEach((line, index) => {
    if (OLD_URL.test(line)) problems.push(`  ${file}:${index + 1}: ${line.trim()}`);
  });
}

if (problems.length > 0) {
  console.error(`Found ${problems.length} use(s) of the old github.io address:\n`);
  console.error(problems.join('\n'));
  console.error(`\nReplace each one with ${NEW_URL} (keep the rest of the path).`);
  process.exit(1);
}

console.log(`No old github.io addresses found in ${files.length} files.`);

// Local branch cleanup
//
// GitHub deletes a branch after its pull request is merged, but the copy on
// your computer stays. This script removes every local branch that is already
// merged into main, so `git branch` only lists work in progress.
//
// It's safe to run at any time:
// - It never deletes main or the branch you're on.
// - It uses `git branch -d`, which refuses to delete a branch with unmerged work.
// - Branches that are gone from GitHub but NOT merged are listed, not deleted,
//   so you can decide what to do with them.
//
// Run it from the project folder with: npm run clean:branches

import {execFileSync} from 'node:child_process';

const MAIN = 'main';
const git = (...args) => execFileSync('git', args, {encoding: 'utf8'}).trim();
const lines = (text) => text.split('\n').map((line) => line.trim()).filter(Boolean);

// Get the latest main from GitHub and forget branches deleted there.
git('fetch', '--prune', '--quiet', 'origin');

const current = git('branch', '--show-current');
const merged = lines(git('branch', '--format=%(refname:short)', '--merged', `origin/${MAIN}`))
  .filter((branch) => branch !== MAIN && branch !== current);

for (const branch of merged) {
  git('branch', '-d', branch);
  console.log(`Deleted ${branch} (already merged into ${MAIN})`);
}

// Branches whose GitHub copy is gone but whose work isn't in main.
const gone = lines(git('branch', '--format=%(refname:short) %(upstream:track)'))
  .filter((line) => line.endsWith('[gone]'))
  .map((line) => line.split(' ')[0])
  .filter((branch) => !merged.includes(branch));

for (const branch of gone) {
  console.log(`Kept ${branch}: deleted on GitHub but not merged into ${MAIN}. Check it before deleting.`);
}

if (merged.length === 0 && gone.length === 0) {
  console.log('No merged branches to clean up.');
}

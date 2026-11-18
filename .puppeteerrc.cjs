/**
 * Puppeteer settings for the accessibility check (pa11y-ci).
 *
 * pa11y-ci uses Puppeteer to open each page in Google Chrome. By default,
 * Puppeteer downloads its own copy of Chrome (several hundred MB) every time
 * `npm install` or `npm ci` runs, including in CI jobs that never use it.
 * Instead, skip the download and use the Chrome that is already installed:
 * on GitHub's Ubuntu runners and on a Mac with Google Chrome installed.
 *
 * To use a different browser, set the PUPPETEER_EXECUTABLE_PATH environment
 * variable to its path.
 */
const executablePath =
  process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : '/usr/bin/google-chrome';

module.exports = {
  skipDownload: true,
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || executablePath,
};

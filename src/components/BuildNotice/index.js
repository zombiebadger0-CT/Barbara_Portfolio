/**
 * Temporary "still building" notice shown above the cards on the home page.
 *
 * To hide it: in docusaurus.config.js, set customFields.showBuildNotice to false.
 *
 * To remove it for good:
 *   1. Delete this folder (src/components/BuildNotice).
 *   2. In src/pages/index.js, delete the BuildNotice import line and the
 *      <BuildNotice /> line.
 *   3. In docusaurus.config.js, delete showBuildNotice, lastUpdated, and the
 *      lastUpdatedDate function.
 */
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

export default function BuildNotice() {
  const {siteConfig} = useDocusaurusContext();
  const {showBuildNotice, lastUpdated} = siteConfig.customFields;

  if (!showBuildNotice) {
    return null;
  }

  return (
    <aside className={styles.notice} aria-label="Site status">
      <p className={styles.text}>
        I am still building out this portfolio page. Some sections may be
        empty, but I am adding new content regularly.{' '}
        <span className={styles.date}>Last updated: {lastUpdated}</span>
      </p>
    </aside>
  );
}

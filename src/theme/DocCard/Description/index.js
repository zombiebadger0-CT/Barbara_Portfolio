import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';

import styles from './styles.module.css';

/**
 * Card description on section landing pages (Portfolio, CV and Recommendations).
 *
 * Replaces the Docusaurus default, which cut the text off after one line.
 * Shows up to 2 lines. If the text is longer, it ends with "..." and the
 * full text appears in a tooltip when you hover over the card or tab to it.
 */
export default function DocCardDescription({description}) {
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  // Check whether the text is cut off. Re-check when the card is resized,
  // because a narrower card fits less text.
  useEffect(() => {
    const el = textRef.current;
    if (!el) {
      return undefined;
    }
    const check = () => setIsTruncated(el.scrollHeight > el.clientHeight + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [description]);

  return (
    <div className={styles.wrapper}>
      <p
        ref={textRef}
        className={clsx(
          ThemeClassNames.docs.docCard.description,
          styles.cardDescription,
        )}>
        {description}
      </p>
      {isTruncated && (
        <span className={styles.tooltip} aria-hidden="true">
          {description}
        </span>
      )}
    </div>
  );
}

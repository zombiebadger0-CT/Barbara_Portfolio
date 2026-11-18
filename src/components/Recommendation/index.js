import React, {useEffect, useId, useRef, useState} from 'react';
import styles from './styles.module.css';

/**
 * One LinkedIn recommendation, shown as a card.
 *
 *   import Recommendation from '@site/src/components/Recommendation';
 *
 *   <Recommendation
 *     team="Marketing"
 *     headline="A short phrase quoted word for word from the text."
 *     name="Full Name"
 *     title="Their LinkedIn headline"
 *     meta="Date, how they worked with Barbara">
 *
 *   First paragraph of the recommendation.
 *
 *   Second paragraph.
 *
 *   </Recommendation>
 *
 * The team appears as a colored pill. The headline is a pull quote: it repeats
 * words from the recommendation, so screen readers skip it. Long text is
 * shortened to a few lines, with a button that shows the rest.
 */

// Tint for each team pill. Add a line here when you add a new team.
const TEAM_CLASS = {
  'Product Development': styles.teamProduct,
  'Professional Services': styles.teamServices,
  'UX Research': styles.teamUx,
  Marketing: styles.teamMarketing,
  'Customer Support': styles.teamSupport,
  'Quality Assurance': styles.teamQa,
};

export default function Recommendation({team, headline, name, title, meta, children}) {
  const bodyId = useId();
  const bodyRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [needsToggle, setNeedsToggle] = useState(true);

  // Hide the button when the text is short enough to show in full.
  useEffect(() => {
    const el = bodyRef.current;
    if (el && !expanded) {
      setNeedsToggle(el.scrollHeight > el.clientHeight + 1);
    }
  }, [expanded]);

  const collapsed = needsToggle && !expanded;

  return (
    <figure className={styles.card}>
      <span className={`${styles.team} ${TEAM_CLASS[team] ?? ''}`}>{team}</span>
      <p className={styles.headline} aria-hidden="true">
        “{headline}”
      </p>
      <blockquote
        id={bodyId}
        ref={bodyRef}
        className={`${styles.body} ${collapsed ? styles.collapsed : ''}`}>
        {children}
      </blockquote>
      {needsToggle && (
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={expanded}
          aria-controls={bodyId}
          onClick={() => setExpanded((open) => !open)}>
          {expanded ? 'Show less' : 'Read full recommendation'}
        </button>
      )}
      <figcaption className={styles.caption}>
        <span className={styles.name}>{name}</span>
        <span className={styles.title}>{title}</span>
        <span className={styles.meta}>{meta}</span>
      </figcaption>
    </figure>
  );
}

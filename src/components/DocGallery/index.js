import React, {useCallback, useEffect, useRef, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import styles from './styles.module.css';

/**
 * A grid of document thumbnails. Clicking one opens a full-screen viewer
 * that shows every page as an image (the original PDF is never served).
 *
 * Each doc: {id, title, description, pages, folder, width, height}
 * (width and height are the page image size, so pages reserve space before loading)
 * Images live in /static/printed-docs/<folder>/thumb.jpg and page-001.jpg ...
 */

const pad = (n) => String(n).padStart(3, '0');
const block = (e) => e.preventDefault();

function Viewer({doc, base, onClose}) {
  const [page, setPage] = useState(1);
  const scroller = useRef(null);
  const closeBtn = useRef(null);
  const pageRefs = useRef([]);

  // Focus the close button, lock page scroll, and restore on close.
  useEffect(() => {
    const opener = document.activeElement;
    closeBtn.current?.focus();
    const {overflow} = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      opener?.focus?.();
    };
  }, []);

  const goTo = useCallback(
    (n) => {
      const target = Math.min(Math.max(n, 1), doc.pages);
      pageRefs.current[target - 1]?.scrollIntoView({behavior: 'smooth', block: 'start'});
    },
    [doc.pages],
  );

  // Track which page is in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setPage(Number(entry.target.dataset.page));
        });
      },
      {root: scroller.current, threshold: 0.5},
    );
    pageRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [doc]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        goTo(page + 1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goTo(page - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goTo, onClose, page]);

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={doc.title}
      onContextMenu={block}>
      <div className={styles.toolbar}>
        <span className={styles.toolbarTitle}>{doc.title}</span>
        <div className={styles.toolbarControls}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => goTo(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page">
            ‹
          </button>
          <span className={styles.counter} aria-live="polite">
            {page} / {doc.pages}
          </span>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => goTo(page + 1)}
            disabled={page >= doc.pages}
            aria-label="Next page">
            ›
          </button>
          <button
            type="button"
            ref={closeBtn}
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close viewer">
            ✕
          </button>
        </div>
      </div>
      <div
        className={styles.pages}
        ref={scroller}
        onClick={(e) => e.target === e.currentTarget && onClose()}>
        {Array.from({length: doc.pages}, (_, i) => (
          <div
            key={i}
            className={styles.page}
            data-page={i + 1}
            ref={(el) => {
              pageRefs.current[i] = el;
            }}>
            <img
              src={`${base}/${doc.folder}/page-${pad(i + 1)}.jpg`}
              alt={`${doc.title}, page ${i + 1} of ${doc.pages}`}
              width={doc.width}
              height={doc.height}
              loading="lazy"
              draggable={false}
              onDragStart={block}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DocGallery({docs}) {
  const base = useBaseUrl('/printed-docs');
  const [open, setOpen] = useState(null);

  // Tell the build's broken-link check that #<doc id> links on this page are valid.
  const brokenLinks = useBrokenLinks();
  docs.forEach((doc) => brokenLinks.collectAnchor(doc.id));

  // Open a doc when the URL hash matches its id, so text links like
  // [First Draft](#first-draft) open that doc in the viewer.
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const match = docs.find((doc) => doc.id === id);
      if (match) setOpen(match);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [docs]);

  // Clear the hash on close, so the same link works again.
  const close = useCallback(() => {
    setOpen(null);
    if (docs.some((doc) => `#${doc.id}` === window.location.hash)) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, [docs]);

  return (
    <>
      <div className={styles.grid}>
        {docs.map((doc) => (
          <button
            key={doc.id}
            type="button"
            className={styles.card}
            onClick={() => setOpen(doc)}
            onContextMenu={block}>
            <span className={styles.thumbWrap}>
              <img
                src={`${base}/${doc.folder}/thumb.jpg`}
                alt=""
                className={styles.thumb}
                loading="lazy"
                draggable={false}
              />
            </span>
            <span className={styles.cardTitle}>{doc.title}</span>
            {doc.description && <span className={styles.cardText}>{doc.description}</span>}
            <span className={styles.cardMeta}>
              {doc.pages} {doc.pages === 1 ? 'page' : 'pages'} · View
            </span>
          </button>
        ))}
      </div>
      {open && <Viewer doc={open} base={base} onClose={close} />}
    </>
  );
}

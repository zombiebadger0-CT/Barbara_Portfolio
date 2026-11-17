import React from 'react';
import DocCardList from '@theme/DocCardList';
import {
  useCurrentSidebarSiblings,
  useDoc,
} from '@docusaurus/plugin-content-docs/client';

/**
 * Clickable cards for every page in the current section, except the page
 * the cards are on. Use it on a section's landing page:
 *
 *   import SectionCards from '@site/src/components/SectionCards';
 *   <SectionCards />
 *
 * Cards update automatically when pages are added, removed, or reordered.
 */
export default function SectionCards() {
  const currentId = useDoc().metadata.id;
  const items = useCurrentSidebarSiblings().filter(
    (item) => item.docId !== currentId,
  );
  return <DocCardList items={items} />;
}

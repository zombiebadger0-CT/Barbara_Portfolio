import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import BuildNotice from '@site/src/components/BuildNotice';
import styles from './index.module.css';

const sections = [
  {
    title: 'About',
    to: '/about',
    text: 'Who I am, how I work, and what I care about in documentation.',
  },
  {
    title: 'CV and recommendations',
    to: '/cv',
    text: 'My experience, skills, and tools, and coworker recommendations pulled from LinkedIn.',
  },
  {
    title: 'Portfolio',
    to: '/portfolio',
    text: 'Writing samples: guides, API references, tutorials, and more.',
  },
  {
    title: 'Blog',
    to: '/blog',
    text: 'Notes on technical writing, docs tooling, and content strategy.',
  },
];

function Banner() {
  return (
    <header className={styles.banner}>
      <div className={`container ${styles.bannerInner}`}>
        <div className={styles.bannerText}>
          <p className={styles.eyebrow}>
            Senior Technical Writer | Product Enablement Content | Knowledge
            Base Manager
          </p>
          <Heading as="h1" className={styles.title}>
            Hi, I&apos;m Barbara Morach.
          </Heading>
          <p className={styles.subtitle}>
            I build and manage AI-enabled, data-driven documentation workflows
            for regulated and SaaS products.
          </p>
          <div className={styles.buttons}>
            <Link className={styles.primaryButton} to="/portfolio">
              View my portfolio
            </Link>
            <Link className={styles.secondaryButton} to="/cv">
              Read my CV
            </Link>
          </div>
        </div>
        <img
          className={styles.headshot}
          src={useBaseUrl('/img/headshot.jpg')}
          alt="Barbara Morach"
          width="320"
          height="320"
        />
      </div>
    </header>
  );
}

function SectionCards() {
  return (
    <section className={styles.sections}>
      <div className="container">
        <BuildNotice />
        <div className={styles.grid}>
          {sections.map(({title, to, text}) => (
            <Link key={title} to={to} className={styles.card}>
              <Heading as="h2" className={styles.cardTitle}>
                {title}
              </Heading>
              <p className={styles.cardText}>{text}</p>
              <span className={styles.cardLink}>
                Go to {title} <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout description="Senior Technical Writer | Product Enablement Content | Knowledge Base Manager">
      <Banner />
      <main>
        <SectionCards />
      </main>
    </Layout>
  );
}

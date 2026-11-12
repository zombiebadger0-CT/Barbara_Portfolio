import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const sections = [
  {
    title: 'About',
    to: '/about',
    text: 'Who I am, how I work, and what I care about in documentation.',
  },
  {
    title: 'Resume',
    to: '/resume',
    text: 'My experience, skills, tools, and education.',
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
      <div className="container">
        <p className={styles.eyebrow}>Technical Writer</p>
        <Heading as="h1" className={styles.title}>
          Hi, I&apos;m Barbara.
        </Heading>
        <p className={styles.subtitle}>
          I turn complex technology into clear, useful documentation.
        </p>
        <div className={styles.buttons}>
          <Link className={styles.primaryButton} to="/portfolio">
            View my portfolio
          </Link>
          <Link className={styles.secondaryButton} to="/resume">
            Read my resume
          </Link>
        </div>
      </div>
    </header>
  );
}

function SectionCards() {
  return (
    <section className={styles.sections}>
      <div className="container">
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
    <Layout
      title="Technical Writer"
      description="Portfolio of Barbara, technical writer.">
      <Banner />
      <main>
        <SectionCards />
      </main>
    </Layout>
  );
}

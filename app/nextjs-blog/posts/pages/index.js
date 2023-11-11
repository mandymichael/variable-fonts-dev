import Head from 'next/head';
import HeaderStyles from '../styles/Header.module.css';
import HomeHeader from '../styles/HomeHeader.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';

export default function Home({ allPostsData }) {


  return (
    <div className={HeaderStyles.pageContainer}>
      <Head>
        <title>Variable Fonts for Developers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <header className={HeaderStyles.headerContainer}>
          <img src="images/Logo.svg" alt="Variable Fonts for Developers" className={HeaderStyles.logo} />

          <nav className={HeaderStyles.nav}>
            <ul className={HeaderStyles.navList}>
              <li className={HeaderStyles.navItem}><Link href="/getting-started" className={HeaderStyles.navLink}>Getting Started</Link></li>
              <li className={HeaderStyles.navItem}><Link href="/about" className={HeaderStyles.navLink}>About</Link></li>
            </ul>
          </nav>

          <a href="/contact">Contact</a>
        </header>

        <section className={HomeHeader.container}>
          <h1 className={HomeHeader.pageHeading}>
            Variable fonts
            <span className={HomeHeader.pageHeadingSubtitle}>for developers</span>
          </h1>
          <h2 className={HomeHeader.intro}>A collection of fun experiments, effects, examples and stuff I have learned as a developer about variable fonts.</h2>
          <p className={HomeHeader.creator}>Made by <a href="#">Mandy Michael</a> supported by <a href="#">Jello</a>.</p>
          <p className={HomeHeader.volume}><span className={HomeHeader.volumeText}>Vol</span><span className={HomeHeader.volumeNum}>2.0</span></p>
        </section>

        <section>

          
        </section>

         {/* Add this <section> tag below the existing <section> tag */}
      <section>
        <h2>Blog</h2>
        <ul>
        {allPostsData.map(({ id, date, title }) => (
                     <li  key={id}>
           <Link href={`/posts/${id}`}>{title}</Link>
           <br />
           <small>
             <Date dateString={date} />
           </small>
         </li>
          ))}
        </ul>
      </section>
      </main>
  

    </div>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
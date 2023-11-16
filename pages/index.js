import HomeHeader from '../styles/HomeHeader.module.css';
import HomeStyles from '../styles/Home.module.css';
import Generic from '../styles/Generic.module.css';

import { getSortedPostsData } from '../lib/posts';
import Header from '../components/header';
import Footer from '../components/footer';
import PostList from '../components/postList';
import FeaturedPost from '../components/featuredPost';
import HeadBlock from '../components/head.js';

export default function Home({ recentPosts, articles, fontLists, featuredPost }) {
  return (
    <div className={Generic.pageContainer}>

      <HeadBlock title="Variable Fonts for Developers" />

      <main className={HomeStyles.main} >
        <Header/>
        <section className={HomeHeader.container}>
          <h1 className={HomeHeader.pageHeading}>
            Variable fonts
            <span className={HomeHeader.pageHeadingSubtitle}>for developers</span>
          </h1>
          <h2 className={HomeHeader.intro}>A collection of fun experiments, effects, examples and stuff I have learned as a developer about variable fonts.</h2>
          <p className={HomeHeader.creator}>Made by <a href="#">Mandy Michael</a> supported by <a href="#">Jello</a>.</p>
          <p className={HomeHeader.volume}><span className={HomeHeader.volumeText}>Vol</span><span className={HomeHeader.volumeNum}>2.0</span></p>
        </section>

      <FeaturedPost featuredPost={featuredPost} />

      <PostList posts={recentPosts} title="Recent Posts" tagType="parent" />
      <PostList posts={articles} title="Articles" columns={4} postType="article" showMore="true" />
      <PostList posts={fontLists} title="Font Lists" columns={4} postType="list" showMore="true" />

      </main>

      <Footer />

    </div>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const recentPosts = getSortedPostsData().slice(0,3);

  const articles = getSortedPostsData().filter((post) => {
    const listOfArticles = post.tags && post.tags.includes('article');
      return listOfArticles;
    }
  ).slice(0,4);

  const fontLists = getSortedPostsData().filter((post) => {
    const lists = post.tags && post.tags.includes('list');
      return lists;
    }
  ).slice(0,4);
  

  const featuredPost = getSortedPostsData().filter((post) => {
    const lists = post.tags && post.tags.includes('featured');
      return lists;
    }
  ).slice(0,1);

  

  return {
    props: {
      allPostsData,
      recentPosts,
      articles,
      fontLists,
      featuredPost
    },
  };
}
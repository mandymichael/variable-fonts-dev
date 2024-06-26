import HomeHeader from "../styles/HomeHeader.module.css";
import HomeStyles from "../styles/Home.module.css";
import Generic from "../styles/Generic.module.css";

import { getSortedPostsData } from "../lib/posts";
import Header from "../components/header";
import Footer from "../components/footer";
import PostList from "../components/postList";
import FeaturedPost from "../components/featuredPost";
import HeadBlock from "../components/head.js";
import { GoogleAnalytics } from "@next/third-parties/google";

const description =
  "Variable fonts for developers, a collection of fun experiments, effects, demos, articles, font lists, and stuff I have learned as a developer about variable fonts";
const keywords = "Variable fonts, fonts, font lists, mandy michael";

export default function Home({
  recentPosts,
  articles,
  fontLists,
  featuredPost,
}) {
  return (
    <div className={Generic.pageContainer}>
      <HeadBlock
        title="Variable Fonts for Developers"
        description={description}
        url="https://variablefonts.dev"
        keywords={keywords}
        image="/images/metadata/main-og3.jpg"
      />
      <GoogleAnalytics gaId="G-RT7492NGQB" />

      <main className={HomeStyles.main}>
        <Header />
        <section className={HomeHeader.container}>
          <h1 className={HomeHeader.pageHeading}>
            Variable fonts
            <span className={HomeHeader.pageHeadingSubtitle}>
              for developers
            </span>
          </h1>
          <h2 className={HomeHeader.intro}>
            A collection of fun experiments, effects, examples and stuff I have
            learned as a developer about variable fonts.
          </h2>
          <p className={HomeHeader.creator}>
            Made by{" "}
            <a href="https://mandy.dev" target="_blank">
              Mandy Michael
            </a>{" "}
            supported by{" "}
            <a href="https://www.instagram.com/adognamedjello" target="_blank">
              Jello
            </a>
            .
          </p>
          <p className={HomeHeader.volume}>
            <span className={HomeHeader.volumeText}>Vol</span>
            <span className={HomeHeader.volumeNum}>2.0</span>
          </p>
        </section>

        <FeaturedPost featuredPost={featuredPost} />

        <PostList posts={recentPosts} title="Recent Posts" tagType="parent" />
        <PostList
          posts={articles}
          title="Articles"
          columns={4}
          postType="article"
          showMore="true"
        />
        <PostList
          posts={fontLists}
          title="Font Lists"
          columns={4}
          postType="list"
          showMore="true"
        />
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  const featuredPost = getSortedPostsData()
    .filter((post) => {
      const lists = post.tags && post.tags.includes("featured");
      return lists;
    })
    .slice(0, 1);

  const recentPosts = getSortedPostsData()
    .filter((post) => {
      const recent = post.id !== featuredPost[0].id;
      return recent;
    })
    .slice(0, 3);

  const articles = getSortedPostsData()
    .filter((post) => {
      const listOfArticles =
        post.tags &&
        post.tags.includes("article") &&
        post.id !== featuredPost[0].id;
      return listOfArticles;
    })
    .slice(0, 4);

  const fontLists = getSortedPostsData()
    .filter((post) => {
      const lists =
        post.tags &&
        post.tags.includes("list") &&
        post.id !== featuredPost[0].id;
      return lists;
    })
    .slice(0, 4);

  return {
    props: {
      allPostsData,
      recentPosts,
      articles,
      fontLists,
      featuredPost,
    },
  };
}

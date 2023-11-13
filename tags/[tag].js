import Head from 'next/head';
import TextStyles from '../../styles/Text.module.css';
import HomeStyles from '../../styles/Home.module.css';
import ContainerStyles from '../../styles/Container.module.css';
import Generic from '../../styles/Generic.module.css';

import { getSortedPostsData } from '../../lib/posts';
import Header from '../../components/header';
import Footer from '../../components/footer';
import FeaturedPost from '../../components/featuredPost';
import PostList from '../../components/postList';

export default function Home({ articles, tag }) {


  return (
    <div className={Generic.pageContainer}>
      <Head>
        <title>Variable Fonts for Developers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={HomeStyles.main} >
        <Header/>
       <section className={`${ContainerStyles.section} PageHeader`}>
            <div className={`${ContainerStyles.wrapper} ${ContainerStyles.stacked}`}>
                <p className={TextStyles.metaDataText}>{articles.length} Posts</p>
                <h1 className={TextStyles.heading}>{`Posts tagged '${tag}'`}</h1>
            </div>
        </section>

        <PostList posts={articles} title={`Tag: ${tag}`} tagType="all" postType="list" /> 
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const postTags = getSortedPostsData().map(({ tags }) => tags).flat();
  const tagList = [...new Set(postTags)].filter(Boolean);
  const paths = tagList.map(x => ({params: {tag: x}}));

   return {
    paths: [...paths],
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  
  const postData = getSortedPostsData();


  const articles = getSortedPostsData().filter((post) => {
    const listOfArticles = post.tags && post.tags.includes(params.tag);
      return listOfArticles;
    }
  )

  // const displayList = articles.filter((post) => {
  //   const lists = post.tags && !post.tags.includes('featured');
  //       return lists;
  //   }
  // );

  // const posts = await getAllPostsWithFrontMatter('blog', params.tag)

  


  // const featuredPost = getSortedPostsData().filter((post) => {
  //   const lists = post.tags && post.tags.includes('featured');
  //     return lists;
  //   }
  // ).slice(0,1);

  

  return {
    props: {
      postData,
      articles,
      tag: params.tag
      // displayList,
    },
  };
}
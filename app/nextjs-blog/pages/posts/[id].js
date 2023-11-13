import Layout from '../../components/layout';
import PostMeta from '../../components/postMeta';
import PostHeader from '../../components/postHeader';
import PostContent from '../../components/postContent';
import Footer from '../../components/footer';
import HeadBlock from '../../components/head';
import { Metadata, ResolvingMetadata } from 'next'

import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post({ postData, params  }) {
  console.log(postData)
  return (
    <Layout>
      <HeadBlock 
        title={postData.title} 
        description={postData.summary}
        url={`/posts/${postData.slug}`}  />
        
      <PostMeta dateTime={postData.date} tags={postData.tags} />
      <article>
        <PostHeader 
          title={postData.title}
          summary={postData.summary} 
          featureFont={postData.featureFont} 
          demo={postData.demo}
         />

        <PostContent postContent={postData} />

        <Footer />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

 
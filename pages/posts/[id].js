import Layout from '../../components/layout';
import PostMeta from '../../components/postMeta';
import PostHeader from '../../components/postHeader';
import Footer from '../../components/footer';
import HeadBlock from '../../components/head';
import dynamic from 'next/dynamic';
import { RoslindaleMouseControl, marqueeScroll } from '../../lib/variablefonts';
import generateRssFeed from '../../lib/generateRSSFeed';

const PostContent = dynamic(() => import('../../components/postContent'), {
  ssr: true,
});

import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post({ postData  }) {

  if(postData.slug === 'roslindale' ) {
    RoslindaleMouseControl();
    marqueeScroll();
  }
 
  return (
    <Layout>
      <HeadBlock 
        title={postData.title} 
        description={postData.summary}
        url={`/posts/${postData.slug}`} 
        keywords={postData.tags}
        image={postData.featureFont.image}
        customStyles={postData.slug === 'roslindale' && 'roslindale'}
      />
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
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
 
  await generateRssFeed();

  return {
    props: {
      postData,
    },
  };
}

 
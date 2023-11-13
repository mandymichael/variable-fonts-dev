import TextStyles from '../styles/Text.module.css';
import HomeStyles from '../styles/Home.module.css';
import TagList from '../components/tagList';
import ContainerStyles from '../styles/Container.module.css';
import Generic from '../styles/Generic.module.css';
import ListPageStyles from '../styles/ListPage.module.css';

import { getSortedPostsData } from '../lib/posts';
import Header from '../components/header';
import Footer from '../components/footer';
import FeaturedPost from '../components/featuredPost';
import PostList from '../components/postList';
import HeadBlock from '../components/head';
export default function Home({ fontLists, featuredList, displayList }) {

  const tags = [...new Set(fontLists.map(({ tags }) => tags).flat())];

  return (
    <div className={Generic.pageContainer}>
        <HeadBlock title="Font lists" />

        <main className={HomeStyles.main} >
        <Header/>

        <section className={`${ContainerStyles.section} PageHeader`}>
            <div className={`${ContainerStyles.wrapper} ${ContainerStyles.stacked}`}>
                <p className={TextStyles.metaDataText}>{fontLists.length} Posts</p>
                <h1 className={TextStyles.heading}>Font Lists</h1>
            </div>

            <div className={`${ContainerStyles.doubleBorderContainer} ${ListPageStyles.tagGroup}`}>
                    <details className={ListPageStyles.tagDetails}>
                    <summary className={`${ListPageStyles.tagDetailsSummary}`}>Tags</summary>
                    <TagList tags={tags} />
                </details>
            </div>
        </section>

        {featuredList.length > 0 &&  <FeaturedPost featuredPost={featuredList} />}
        <PostList posts={displayList} title="Font Lists" tagType="all" postType="list" />
        </main>
        <Footer />
    </div>
  );
}

export async function getStaticProps() {

    const fontLists = getSortedPostsData().filter((post) => {
        const lists = post.tags && post.tags.includes('list');
            return lists;
        }
    );

    const displayList = fontLists.filter((post) => {
        const lists = post.tags && !post.tags.includes('featured');
            return lists;
        }
    );

    const featuredList = fontLists.filter((post) => {
        const lists = post.tags && post.tags.includes('featured');
            return lists;
        }
    ).slice(0,1);

    return {
    props: {
        displayList,
        fontLists,
        featuredList
    },
    };
}
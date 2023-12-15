import HeadBlock from "../components/head";
import { getPageData } from '../lib/posts';
import Generic from '../styles/Generic.module.css';
import TextStyles from '../styles/Text.module.css';
import ContainerStyles from '../styles/Container.module.css';
import HomeStyles from '../styles/Home.module.css';
import PostStyles from '../styles/PostContent.module.css';
import Footer from '../components/footer';
import Header from '../components/header';
import PostContent from '../components/postContent';

export default function GettingStarted(gettingStarted) {
        return (
            <div className={Generic.pageContainer}>
                <HeadBlock 
                    title="Getting Started" 
                    description="How to use variable fonts in your websites and projects including CSS and JavaScript"
                    url="https://variablefonts.dev/getting-started"
                    image="/images/metadata/mainog-3.jpg"    
                />
                
                <main className={HomeStyles.main}>
                    <Header/>

                    <section className={`${ContainerStyles.section} PageHeader`}>
                        <div className={` ${ContainerStyles.stacked}`}>
                            <h1 className={TextStyles.heading}>Getting started with Variable Fonts</h1>
                    
                        </div>
                    </section>

                    <PostContent postContent={gettingStarted} />

                </main>
                <Footer />
            </div>
    );
}

export async function getStaticProps() {

    const gettingStarted = await getPageData('getting-started');
    return {
      props: {
        ...gettingStarted,
      },
    };
  }
  
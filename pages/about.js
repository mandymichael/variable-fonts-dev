import HeadBlock from "../components/head";
import Generic from "../styles/Generic.module.css"
import TextStyles from '../styles/Text.module.css';
import HomeStyles from '../styles/Home.module.css';
import ContainerStyles from '../styles/Container.module.css';
import PostStyles from '../styles/PostContent.module.css';

import Header from '../components/header';
import Footer from '../components/footer';

export default function About() { 
    return (
        <div className={Generic.pageContainer}>
            <HeadBlock title="About" description="About variable fonts for developers" />
            
            <main className={HomeStyles.main}>
            <Header/>

            <section className={`${ContainerStyles.section} PageHeader`}>
                <div className={` ${ContainerStyles.stacked}`}>
                    <h1 className={TextStyles.heading}>About</h1>
                </div>
            </section>

            <section className={`${PostStyles.container} PostContent`}>
                <p>This project was created by <a href="https://twitter.com/@mandy_kerr" target="_blank">Mandy Michael</a> to showcase the many possibilities and opportunities that variable fonts can offer developers and designers on the web. The aim is to provide developers with the resources and tools needed to use variable fonts in their own projects.</p>
                <p>Variable fonts give us more control over our Typography. We can now fine tune the font characteristics to maximise the legibility, readability and overall accessibility of our website text. This is a level of control over our fonts that is unprecedented.</p>
                <p>To be perfectly honest, I just really like variable fonts, I think they are one of the greatest developments for the web so I just wanted a place to share all the things I like doing with them, and maybe some stuff you might enjoy too!</p>
                <p>This is the second iteration of the website, I had to pause it's development for a while but now it's back with more cool variable fonts and things to do with them than ever.</p>
            </section>

            </main>
            <Footer />
        </div>
    );
}

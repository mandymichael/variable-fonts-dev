import PostListStyles from '../styles/PostList.module.css';
import Link from 'next/link'; 
import Image from 'next/image';
import Date from '../components/date';

export default function FeaturedPost({featuredPost}) {

    return (
        <section className={PostListStyles.section}>
          <h2 className={PostListStyles.sectionHeading}>Featured Article</h2>
    
          <article className={PostListStyles.featuredPost}>
              <div className={PostListStyles.featuredPostContent}>                         
                <p className={PostListStyles.cardMeta}>
                  <Link href="/tags/featured">Featured Post</Link> <span>&#8212;</span> {featuredPost[0].date && <Date dateString={featuredPost[0].date} /> }
                </p>

                <Link href={`/posts/${featuredPost[0].id}`} className={PostListStyles.cardImageMobile}><Image quality={90}  className={PostListStyles.image} loading="eager" width="904" height="495" src={featuredPost[0].card ? featuredPost[0].card.featured : '/images/post-assets/cards/default.jpg'} alt={featuredPost[0].card ? featuredPost[0].card.cardAlt : 'default post image'} /></Link>

                {
                  <h3 className={PostListStyles.featuredPostCardHeading}>
                    <Link href={`/posts/${featuredPost[0].id}`} className={PostListStyles.cardLink}>{featuredPost[0].title}</Link>
                  </h3> 
                }

              <p className={PostListStyles.featuredPostSummary}>{featuredPost[0].summary}</p>
              <p className={PostListStyles.featuredPostSummary}>{featuredPost[0].card.cardFeaturedSummary}</p>
            </div> 
                             
            <Link href={`/posts/${featuredPost[0].id}`} className={PostListStyles.cardImage}><Image className={`${PostListStyles.imageFeature} ${PostListStyles.image}`} width="904" height="495" src={featuredPost[0].card ? featuredPost[0].card.featured : '/images/post-assets/cards/default.jpg'} alt={featuredPost[0].card ? featuredPost[0].card.cardAlt : 'default post image'} /></Link>

          </article>
      </section>
    )
}

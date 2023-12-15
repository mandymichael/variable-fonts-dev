import PostListStyles from '../styles/PostList.module.css';
import Link from 'next/link'; 
import Image from 'next/image';
import Date from '../components/date';
import TagList from './tagList';

export default function PostList({posts, title, columns, tagType, postType, showMore}) {

    return (
        <section className={`${PostListStyles.section} ${PostListStyles.sectionBorder}`}>
            <header className={PostListStyles.sectionHeader}>
                <h2 className={PostListStyles.sectionHeading}>{title}</h2>
                {showMore && <Link href="/articles">View all {postType}s <span>&rarr;</span></Link>}
            </header>
            <ul className={`${PostListStyles.articleList} ${columns === 4 && PostListStyles.articleListSmall }`}>
            {posts.map(({ id, date, title, card, tags }) => {
                return(
                <li key={id} className={PostListStyles.articleListItem}>
                    <Link href={`/posts/${id}`}><Image className={PostListStyles.image} quality={90} width="440" height="442" src={card ? card.cardImage : '/images/post-assets/cards/default.jpg'} alt={card ? card.cardAlt : 'default post image'} /></Link>
                    <div className={PostListStyles.content}>

                        {tagType === 'parent' &&
                            <p className={PostListStyles.cardMeta}>
                                {tags && tags.includes('list') && <Link href="/all-font-lists">Font lists</Link>}
                                {tags && tags && tags.includes('article') && <Link href="/articles">Articles</Link>}
                                {tagType &&<span>&#8212;</span>} {date && <Date dateString={date} /> }
                            </p>
                        }

                        {tagType === 'all' && 
                            <TagList tags={tags} small={true} filter={postType} />
                        }   

                        <h3 className={PostListStyles.cardHeading}>
                            <span className={`${PostListStyles.cardMeta} ${PostListStyles.cardMetaMobile}`}>{date && <Date dateString={date} />}</span>
                            <Link href={`/posts/${id}`} className={PostListStyles.cardLink}>{title}</Link>
                        </h3>

                        {tagType === 'all' && 
                            <p className={PostListStyles.cardMeta}>{date && <Date dateString={date} />}</p>
                        }
                    </div>
                </li>
                )}
            )}
            </ul>
        </section>
    )
}

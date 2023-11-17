import PostMetaStyles from '../styles/PostMeta.module.css';
import TagListStyles from '../styles/TagList.module.css';
import TextStyles from '../styles/Text.module.css'
import Link from 'next/link';
import Date from '../components/date';

export default function PostMeta({dateTime, tags}) {
    return (
        <>
            <hr className={PostMetaStyles.divider} />

            <div className={PostMetaStyles.container}>
               
                <Link href="/all-font-lists" className={`${TextStyles.postMetaText} ${PostMetaStyles.postMetaList}`}><span>&larr;</span> All font lists</Link>
                
                <div className={TagListStyles.tagGroup}>
                    <h2 className={`${TagListStyles.tagTitle} ${TextStyles.postMetaText}`}>Tags:</h2>

                    <ul className={TagListStyles.tags}>
                        {tags.map((tag, index) => (
                            <li className={`${TagListStyles.tag} ${TextStyles.metaDataText}`} key={`${tag}${index}`}>
                                <Link href={`/tags/${tag}`}>{tag}</Link>
                            </li>
                        ))}
                
                    </ul>
                </div>
                <h2 className={TextStyles.postMetaText}><Link href="#">Font lists</Link> <span>&#8212;</span> <Date dateString={dateTime}/></h2>
            </div>  
        </>
    )
}
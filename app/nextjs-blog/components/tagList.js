import TagListStyles from '../styles/TagList.module.css';
import TextStyles from '../styles/Text.module.css';

import Link from 'next/link';

export default function TagList({tags, small, filter}) {

    const tagList = filter ? tags.filter(tags => tags !== filter) : tags;

    return (
        <ul className={`${TagListStyles.tags} ${small && TagListStyles.tagsSmall} `}>
            {tagList.map((tag, index) => (
                <li  className={`${TagListStyles.tag} ${TextStyles.postMetaText}`} key={`${tag}${index}`}>
                    <Link href={`/tags/${tag}`}>{tag}</Link>
                </li>
            ))}
        </ul>
    )
}
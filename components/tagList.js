import TagListStyles from '../styles/TagList.module.css';
import TextStyles from '../styles/Text.module.css';

import Link from 'next/link';

export default function TagList({tags, small, filter, noSlice}) {

    const slicedList = noSlice ? tags : tags.slice(0,3);

    const filteredList = filter ? slicedList.filter(tags => tags !== filter) : slicedList;
    


    return (
        <ul className={`${TagListStyles.tags} ${small && TagListStyles.tagsSmall} `}>
            {filteredList.map((tag, index) => (
                <li  className={`${TagListStyles.tag} ${TextStyles.postMetaText}`} key={`${tag}${index}`}>
                    <Link href={`/tags/${tag}`}>{tag}</Link>
                </li>
            ))}
        </ul>
    )
}
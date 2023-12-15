import PostHeaderStyles from '../styles/PostHeader.module.css';
import Image from 'next/image'
import Link from 'next/link'

export default function PostHeader({title, summary, featureFont, demo}) {
    return (
       <div className={PostHeaderStyles.container}>
        <h1 className={PostHeaderStyles.heading}>{title}</h1>
        <p className={PostHeaderStyles.summary}>{summary}</p>
        <figure className={PostHeaderStyles.figure}>
            {featureFont && featureFont.image && !featureFont.video &&
                <picture className={`${PostHeaderStyles.image}`}><Image loading="eager" src={featureFont.image} width="1088" height="599" alt={featureFont.featureAlt && featureFont.featureAlt}  /></picture>
            }

            {featureFont && featureFont.video && 
                <div className={`${PostHeaderStyles.videoPlayer} videoPlayer`}>
                    <iframe width="1088" height="599" src={featureFont.video}  frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>
                </div>
            }
            
            { featureFont && featureFont.author &&
                <figcaption className={PostHeaderStyles.figcaption}>
                    <p><Link href={featureFont.url}>{featureFont.font}</Link> by {featureFont.author} {featureFont.license && `is ${featureFont.license}` }</p>
                    {demo && <p>Code by <Link href={demo.authorUrl}>{demo.author}</Link> available on <Link href={demo.url}>Codepen</Link></p>}
                </figcaption>
            }

            { featureFont && featureFont.caption &&
                <figcaption className={PostHeaderStyles.figcaption}>
                    <p>{featureFont.caption}</p>
                </figcaption>
            }
        </figure>
       </div>
    )
}
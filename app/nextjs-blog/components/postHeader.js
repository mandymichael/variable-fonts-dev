import PostHeaderStyles from '../styles/PostHeader.module.css';
import Image from 'next/image'
import Link from 'next/link'

export default function PostHeader({title, summary, featureFont, demo}) {
    return (
       <div className={PostHeaderStyles.container}>
        <h1 className={PostHeaderStyles.heading}>{title}</h1>
        <p className={PostHeaderStyles.summary}>{summary}</p>
        <figure className={PostHeaderStyles.figure}>
            {featureFont.image &&
                <picture className={`${PostHeaderStyles.image}`}><Image src={featureFont.image} width="1088" height="599"  /></picture>
            }

            {featureFont.video && 
                <div className="videoPlayer">
                    <iframe width="1088" height="599" src={featureFont.video}  frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
                </div>
            }
            
            <figcaption className={PostHeaderStyles.figcaption}>
                <p><Link href={featureFont.url}>{featureFont.font}</Link> by {featureFont.author} is {featureFont.license}</p>
                {demo && <p>Code by <Link href={demo.authorUrl}>{demo.author}</Link> available on <Link href={demo.url}>Codepen</Link></p>}
            </figcaption>
        </figure>
       </div>
    )
}
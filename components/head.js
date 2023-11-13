import Head from 'next/head';

export default function HeadBlock({title, description, url, keywords}) {
    return (
        <Head>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="author" content="Mandy Michael" />

            <meta property="og:title" content={title} />
            <meta property="og:site_name" content='Variable Fonts for Developers' />
            <meta property="og:url" content={url} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="article" />
            <meta property="og:image" content="/images/metadata/Image.png" />

            <link rel="icon" href="/favicon.ico" />
        </Head> 
    )
}
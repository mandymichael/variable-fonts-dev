import RSS from 'rss';
import fs from 'fs';
import { getSortedPostsData } from '../lib/posts';

export default async function generateRssFeed() {
 const site_url = 'https://variablefonts.dev';

 const allPostsData = getSortedPostsData();

 const feedOptions = {
  title: 'Variable Fonts for Developers | RSS Feed',
  description: 'Variable fonts for developers, a collection of fun experiments, effects, demos, articles, font lists, and stuff I have learned as a developer about variable fonts',
  site_url: site_url,
  feed_url: `${site_url}/rss.xml`,
  image_url: `${site_url}/favicon-32x32.png`,
  pubDate: new Date(),
  copyright: `All rights reserved ${new Date().getFullYear()}, Mandy Michael`,
 };

 const feedOptionsAlt = {
    title: 'Variable Fonts for Developers | RSS Feed',
    description: 'Variable fonts for developers, a collection of fun experiments, effects, demos, articles, font lists, and stuff I have learned as a developer about variable fonts',
    site_url: site_url,
    feed_url: `${site_url}/feed.xml`,
    image_url: `${site_url}/favicon-32x32.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Mandy Michael`,
   };

 const feed = new RSS(feedOptions);
 const altFeed = new RSS(feedOptionsAlt);

 allPostsData.map((post) => {
  feed.item({
   title: post.title,
   description: post.description,
   url: `${site_url}/posts/${post.id}`,
   date: post.date,
  });
 });

 fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }));
 fs.writeFileSync('./public/feed.xml', altFeed.xml({ indent: true }));

}


// pages/sitemap.xml.js

import { getSortedPostsData } from "../lib/posts";

const URL = "https://variablefonts.dev";

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Add the static URLs manually -->
     <url>
       <loc>${URL}</loc>
     </url>
     <url>
       <loc>${URL}/about</loc>
     </url>
      <url>
       <loc>${URL}/getting-started</loc>
     </url>
     <url>
       <loc>${URL}/all-font-lists</loc>
     </url>
     <url>
      <loc>${URL}/articles</loc>
     </url>
     ${posts
       .map(({ id }) => {
         return `
           <url>
               <loc>${`${URL}/posts/${id}`}</loc>
           </url>
         `;
       })
       .join("")}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  const posts = getSortedPostsData();

  const sitemap = generateSiteMap(posts);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}

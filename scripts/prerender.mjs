import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import React from 'react';

const base='https://www.manawatuinsurance.co.nz';
const live=process.env.MANAWATU_LIVE_DOMAIN==='1';
if(live && process.env.MANAWATU_ENQUIRIES_VERIFIED!=='1'){
 throw new Error('Live build blocked: Microsoft 365 enquiry delivery has not been verified.');
}
const routes={
 home:{path:'/',title:'Manawatu Insurance | Insurance Advisers in Palmerston North',description:'Local insurance advice for homes, businesses, farms and families. Talk with Manawatu Insurance in Palmerston North.'},
 team:{path:'/about/',title:'About Manawatu Insurance | Palmerston North Advisers',description:'Meet the Manawatu Insurance advisers and client service team. Local relationships and insurance advice with roots dating to 1985.'},
 services:{path:'/services/',title:'Insurance Services and Claims | Manawatu Insurance',description:'Explore home, business, farm, life, trauma, health and travel insurance advice, plus claims support from Manawatu Insurance.'},
 contact:{path:'/contact/',title:'Contact Manawatu Insurance | Palmerston North',description:'Contact Manawatu Insurance at Level 2, 26 Broadway Avenue, Palmerston North. Call 06 350 6800 or email admin@manawatuinsurance.co.nz.'},
 disclosure:{path:'/disclosure/',title:'Disclosure and Complaints | Manawatu Insurance',description:'Read Manawatu Insurance financial advice disclosures, complaints information and privacy details, with links to adviser statements.'},
 sitemap:{path:'/sitemap/',title:'Site Map | Manawatu Insurance',description:'Find Manawatu Insurance pages for advice, services, claims, contact and disclosure.'}
};
const escape=(s)=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const server=await createServer({server:{middlewareMode:true,hmr:false},appType:'custom',logLevel:'error'});
try{
 const {App}=await server.ssrLoadModule('/src/new.jsx');
 const template=await readFile('dist/index.html','utf8');
 for(const [page,meta] of Object.entries(routes)){
  const body=renderToString(React.createElement(App,{initialPage:page}));
  let html=template.replace('<div id="root"></div>',`<div id="root">${body}</div>`);
  html=html.replace(/<title>[^<]*<\/title>/,`<title>${escape(meta.title)}</title>`);
  html=html.replace(/<meta name="description" content="[^"]*"\s*\/>/,`<meta name="description" content="${escape(meta.description)}"/>`);
  html=html.replace(/<meta name="robots" content="[^"]*"\s*\/>/,`<meta name="robots" content="${live?'index,follow':'noindex,nofollow'}"/>`);
  const structuredData={
   '@context':'https://schema.org',
   '@type':'WebPage',
   name:meta.title,
   description:meta.description,
   url:`${base}${meta.path}`,
   isPartOf:{'@type':'WebSite',name:'Manawatu Insurance',url:base},
   about:{'@type':'Organization',name:'Manawatu Insurance',url:base,telephone:'+64-6-350-6800',email:'admin@manawatuinsurance.co.nz'}
  };
  html=html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,`<link rel="canonical" href="${base}${meta.path}"/><script>window.__INITIAL_PAGE__=${JSON.stringify(page)}</script><script type="application/ld+json">${JSON.stringify(structuredData)}</script>`);
  if(live){
   html=html.replace('</head>',`<script async src="https://www.googletagmanager.com/gtag/js?id=G-QQMYHSY7L3"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-QQMYHSY7L3');</script></head>`);
  }
  const directory=join('dist',meta.path);
  await mkdir(directory,{recursive:true});
  await writeFile(join(directory,'index.html'),html);
 }
 const urls=Object.values(routes).filter(x=>x.path!=='/sitemap/').map(x=>`  <url><loc>${base}${x.path}</loc></url>`).join('\n');
 await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
 await writeFile('dist/robots.txt',live?`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n');
}finally{await server.close()}

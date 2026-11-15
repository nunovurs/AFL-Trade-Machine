// Best-effort headshots from the public AFL 2026 draft tracker.
const SOURCE='https://www.afl.com.au/draft/draft-tracker/2026';
function attr(tag,key){
  const m=tag.match(new RegExp('\\b'+key+'\\s*=\\s*"([^"]*)"','i'));
  return m?m[1].replace(/&amp;/g,'&').replace(/&quot;/g,'"'):'';
}
function candidate(raw){
  try{
    const u=new URL(String(raw||'').trim(),SOURCE);
    if(u.protocol!=='https:'||!u.hostname.endsWith('afl.com.au'))return '';
    return u.href;
  }catch{return '';}
}
module.exports=async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Cache-Control','public, s-maxage=21600, stale-while-revalidate=86400');
  if(req.method==='OPTIONS')return res.status(204).end();
  try{
    const response=await fetch(SOURCE,{headers:{accept:'text/html','user-agent':'Mozilla/5.0 (AFLTradeMachine/1.0)'},signal:AbortSignal.timeout(6000)});
    if(!response.ok)return res.status(200).json({source:SOURCE,count:0,players:[],error:'Source unavailable'});
    const html=await response.text();
    const found=new Map();
    for(const m of html.matchAll(/<img\b[^>]*>/gi)){
      const tag=m[0],match=attr(tag,'alt').match(/^Headshot photo of\s+(.+?)\s*$/i);
      if(!match)continue;
      const name=match[1].trim(),url=candidate(attr(tag,'src')||attr(tag,'data-src'));
      if(name&&url&&!found.has(name))found.set(name,url);
    }
    return res.status(200).json({source:SOURCE,count:found.size,players:[...found].map(([name,url])=>({name,photos:[url]}))});
  }catch(err){return res.status(200).json({source:SOURCE,count:0,players:[],error:'Headshots temporarily unavailable'});}
};

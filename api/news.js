const FEEDS=[
  {label:'AFL.com.au',query:'site:afl.com.au AFL when:2d'},
  {label:'Callum Twomey',query:'"Callum Twomey" AFL when:7d'},
  {label:'Tom Morris',query:'"Tom Morris" AFL when:7d'},
  {label:'Fox Sports AFL',query:'site:foxsports.com.au/afl AFL when:2d'},
  {label:'SEN',query:'site:sen.com.au AFL when:2d'}
];
const CLUBS=['Adelaide','Brisbane','Carlton','Collingwood','Essendon','Fremantle','Geelong','Gold Coast','GWS','Hawthorn','Melbourne','North Melbourne','Port Adelaide','Richmond','St Kilda','Sydney','West Coast','Western Bulldogs'];
function decode(s=''){const e={amp:'&',quot:'"',apos:"'",lt:'<',gt:'>',nbsp:' '};return String(s).replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&([a-z]+);/gi,(m,n)=>e[n]??m).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();}
function field(block,tag){const m=block.match(new RegExp('<'+tag+'(?:\\s[^>]*)?>([\\s\\S]*?)<\\/'+tag+'>','i'));return m?decode(m[1]):'';}
function attr(block,tag,attrName){const m=block.match(new RegExp('<'+tag+'[^>]*\\s'+attrName+'="([^"]+)"[^>]*>','i'));return m?decode(m[1]):'';}
function classify(title='',source=''){const t=(title+' '+source).toLowerCase();if(/official|confirmed|has signed|re-signed|re-sign|joins|traded|trade completed|retires|retired|delisted|appointed/.test(t))return 'CONFIRMED';if(/rumour|linked to|linked with|could move|could join|may move|watch on/.test(t))return 'RUMOUR';if(/analysis|ranking|power ranking|phantom|explainer|preview|review/.test(t))return 'ANALYSIS';return 'REPORTED';}
function clubs(title=''){const t=title.toLowerCase();return CLUBS.filter(c=>t.includes(c.toLowerCase()));}
function idFor(s=''){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return 'n'+(h>>>0).toString(36);}
function parse(xml,feed){const out=[];for(const m of xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)){const b=m[1],title=field(b,'title'),link=field(b,'link'),pubDate=field(b,'pubDate'),source=field(b,'source')||attr(b,'source','url')||feed.label;if(!title||!link)continue;out.push({id:idFor(title+'|'+link),title,link,source:source||feed.label,feed:feed.label,publishedAt:pubDate?new Date(pubDate).toISOString():null,tag:classify(title,source),clubs:clubs(title)});}return out;}
async function load(feed){const q=encodeURIComponent(feed.query);const url='https://news.google.com/rss/search?q='+q+'&hl=en-AU&gl=AU&ceid=AU:en';const r=await fetch(url,{headers:{'user-agent':'AFL-Trade-Machine/1.0','accept':'application/rss+xml,text/xml;q=0.9,*/*;q=0.8'}});if(!r.ok)throw new Error(feed.label+' '+r.status);return parse(await r.text(),feed);}
module.exports=async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Cache-Control','public, s-maxage=300, stale-while-revalidate=900');
  if(req.method==='OPTIONS')return res.status(204).end();
  const settled=await Promise.allSettled(FEEDS.map(load));
  const all=settled.flatMap(x=>x.status==='fulfilled'?x.value:[]);
  const by=new Map();
  all.forEach(n=>{const k=n.title.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();const prev=by.get(k);if(!prev||((n.publishedAt||'')>(prev.publishedAt||'')))by.set(k,n);});
  const items=[...by.values()].sort((a,b)=>String(b.publishedAt||'').localeCompare(String(a.publishedAt||''))).slice(0,60);
  return res.status(200).json({updatedAt:new Date().toISOString(),refreshSeconds:300,items,sourceStatus:settled.map((x,i)=>({source:FEEDS[i].label,ok:x.status==='fulfilled'}))});
};
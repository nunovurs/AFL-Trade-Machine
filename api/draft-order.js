const SOURCE='https://truefooty.com.au/';
const CLUBS={ADEL:'ade',ADE:'ade',BL:'bri',BRIS:'bri',CARL:'car',COLL:'col',ESS:'ess',FRE:'fre',GEEL:'gee',GC:'gcs',GCS:'gcs',GWS:'gws',HAW:'haw',MELB:'mel',NMFC:'nm',NM:'nm',PORT:'pa',PA:'pa',RICH:'ric',STK:'stk',SYD:'syd',WCE:'wce',WB:'wbd',WBD:'wbd'};
const FALLBACK={
  ade:[13,31,37,49],bri:[17,35,46,51,71],car:[11,16,23,24,53,65],col:[9,27,61,63,70],
  ess:[1,19,55],fre:[18,36,54,72],gee:[14,32,50,68],gcs:[60],gws:[7,28],
  haw:[15,25,26,33,64],mel:[6,10,43],nm:[5,41,59,67],pa:[4,22,29,40,42,58],
  ric:[2,20,38,56],stk:[8,44,62],syd:[34,45,47,69],wce:[3,21,39,52,57,66],wbd:[12,30,48]
};
function clean(s){return s.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;|&#160;/gi,' ').replace(/&amp;/gi,'&').replace(/&#x27;|&#39;/gi,"'").replace(/\s+/g,' ').trim();}
function fallbackPicks(){const out=[];Object.entries(FALLBACK).forEach(([owner,picks])=>picks.forEach(pick=>out.push({pick,owner})));return out.sort((a,b)=>a.pick-b.pick);}
function parse(html){
  const picks=[];
  for(const rowMatch of html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)){
    const cells=[...rowMatch[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(m=>clean(m[1]));
    if(!cells.length)continue;
    const pick=Number((cells[0].match(/\b(\d{1,2})\b/)||[])[1]);
    if(!pick||pick<1||pick>72)continue;
    let owner=null;
    for(const cell of cells.slice(1,4)){
      const tokens=cell.toUpperCase().split(/[^A-Z0-9]+/).filter(Boolean);
      for(const token of tokens){if(CLUBS[token]){owner=CLUBS[token];break;}}
      if(owner)break;
    }
    if(owner&&!picks.some(p=>p.pick===pick))picks.push({pick,owner});
  }
  return picks.sort((a,b)=>a.pick-b.pick);
}
module.exports=async function handler(req,res){
  try{
    const r=await fetch(SOURCE,{headers:{'user-agent':'Mozilla/5.0 AFL Trade Machine draft-order updater'}});
    if(!r.ok)throw new Error(`Source returned ${r.status}`);
    const html=await r.text();
    const parsed=parse(html);
    const picks=parsed.length>=60?parsed:fallbackPicks();
    res.setHeader('Cache-Control','s-maxage=300, stale-while-revalidate=900');
    res.status(200).json({source:'current public draft order',fetchedAt:new Date().toISOString(),picks});
  }catch(e){
    res.setHeader('Cache-Control','s-maxage=300, stale-while-revalidate=900');
    res.status(200).json({source:'embedded current draft order',fetchedAt:new Date().toISOString(),picks:fallbackPicks(),warning:e.message});
  }
};
const CLUBS = [
  'Adelaide','Brisbane','Brisbane Bears','Brisbane Lions','Carlton','Collingwood','Essendon','Fremantle','Geelong','Gold Coast','Gold Coast Suns',
  'Greater Western Sydney','GWS','Hawthorn','Melbourne','North Melbourne','Port Adelaide','Richmond','St Kilda','Sydney','Sydney Swans','West Coast','Western Bulldogs'
];

function decode(s=''){
  const named={amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' '};
  return String(s)
    .replace(/<sup\b[^>]*>[\s\S]*?<\/sup>/gi,'')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'')
    .replace(/<br\s*\/?\s*>/gi,' ')
    .replace(/<[^>]+>/g,' ')
    .replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16)))
    .replace(/&([a-z]+);/gi,(m,n)=>named[n.toLowerCase()]??m)
    .replace(/\[[^\]]*\]/g,' ')
    .replace(/\s+/g,' ').trim();
}
function norm(s=''){return decode(s).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
function findClub(cells){
  for(const cell of cells){
    const n=norm(cell);
    const exact=CLUBS.find(c=>n===norm(c));
    if(exact) return exact;
    const partial=CLUBS
      .filter(c=>n.includes(norm(c)))
      .sort((a,b)=>norm(b).length-norm(a).length)[0];
    if(partial) return partial;
  }
  return '';
}
function tableRows(html){
  const rows=[];
  const rowRe=/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi; let rm;
  while((rm=rowRe.exec(html))){
    const cells=[]; const cellRe=/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi; let cm;
    while((cm=cellRe.exec(rm[1]))) cells.push(decode(cm[1]));
    if(cells.length) rows.push(cells);
  }
  return rows;
}
function draftTableScore(table,kind){
  const text=norm(table);
  let score=0;
  if(/\bpick\b/.test(text)) score+=4;
  if(/\bplayer\b/.test(text)) score+=5;
  if(/\bclub\b/.test(text) || /\bdrafted to\b/.test(text)) score+=4;
  if(/\bround\b/.test(text)) score+=2;
  if(kind==='national' && /national draft selections/.test(text)) score+=5;
  if(kind==='rookie' && /rookie draft selections/.test(text)) score+=5;
  if(/denotes player|hall of fame|premiership player|all australian/.test(text)) score-=8;
  return score;
}
function sectionTable(html, kind, year){
  const headings=[]; const hRe=/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi; let m;
  while((m=hRe.exec(html))) headings.push({idx:m.index,end:hRe.lastIndex,text:norm(m[1])});
  const candidates=headings.filter(h=>{
    if(kind==='national') return h.text.includes('national draft');
    return h.text.includes('rookie draft') && !h.text.includes('mid season');
  });
  const target=(kind==='national'
    ? candidates.find(h=>h.text.includes(String(year)))
    : candidates.find(h=>h.text.includes(String(year+1))) || candidates.find(h=>h.text.includes(String(year)))
  ) || candidates[0];
  if(!target) return '';
  const next=headings.find(h=>h.idx>target.idx);
  const section=html.slice(target.end,next?.idx||html.length);
  const tables=[...section.matchAll(/<table\b[^>]*>[\s\S]*?<\/table>/gi)].map(x=>x[0]);
  if(!tables.length) return '';
  return tables
    .map(table=>({table,score:draftTableScore(table,kind)}))
    .sort((a,b)=>b.score-a.score)[0]?.table||'';
}
function parseSelections(table, draftType){
  const out=[];
  const oldDraftedTo=/Drafted\s+to/i.test(decode(table));
  for(const cells of tableRows(table)){
    let pickIdx=-1;
    if(/^\d+$/.test(cells[1]||'') && /^\d+$/.test(cells[0]||'')) pickIdx=1;
    else if(/^\d+$/.test(cells[0]||'')) pickIdx=0;
    if(pickIdx<0) continue;
    const pick=Number(cells[pickIdx]);
    const player=(cells[pickIdx+1]||'').replace(/[†‡*+#~^]+$/g,'').trim();
    if(!pick || !player || /^(pass|passed|—|-|player)$/i.test(player)) continue;
    const rowText=cells.join(' | ');
    if(draftType==='rookie' && (/redrafted player/i.test(rowText) || cells.some(c=>norm(c)==='afl'))) continue;
    out.push({
      key:`${draftType}-${pick}-${norm(player).replace(/ /g,'-')}`,
      name:player,
      draftType,
      originalPick:pick,
      originalClub:findClub(oldDraftedTo?[...cells.slice(pickIdx+2)].reverse():cells.slice(pickIdx+2)),
      detail:draftType==='rookie'?`Rookie Draft #${pick}`:`National Draft #${pick}`
    });
  }
  const seen=new Set();
  return out.filter(p=>{const k=`${norm(p.name)}|${draftType}`;if(seen.has(k))return false;seen.add(k);return true;});
}
async function fetchWiki(year){
  const page=`${year}_AFL_draft`;
  const url=`https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(page)}&prop=text&format=json&formatversion=2&origin=*`;
  const r=await fetch(url,{headers:{accept:'application/json','user-agent':'AFL-Trade-Machine/1.0 (historical redraft feature)'}});
  if(!r.ok) throw new Error(`Wikipedia ${r.status}`);
  const data=await r.json();
  if(data?.error) throw new Error(data.error.info||'Wikipedia page error');
  return {html:data?.parse?.text||'',source:`https://en.wikipedia.org/wiki/${page}`};
}

module.exports=async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Cache-Control','public, s-maxage=86400, stale-while-revalidate=604800');
  if(req.method==='OPTIONS') return res.status(204).end();
  const year=Number(req.query?.year);
  if(!Number.isInteger(year)||year<2011||year>2025) return res.status(400).json({error:'Year must be between 2011 and 2025'});
  try{
    const {html,source}=await fetchWiki(year);
    const national=parseSelections(sectionTable(html,'national',year),'national');
    const rookies=parseSelections(sectionTable(html,'rookie',year),'rookie');
    if(national.length<30) throw new Error(`Only ${national.length} national selections could be parsed`);
    const actualTop30=national.slice(0,30).map((p,i)=>({...p,actualRank:i+1}));
    const byName=new Map();
    [...national,...rookies].forEach(p=>{const k=norm(p.name);if(!byName.has(k))byName.set(k,p);});
    const pool=[...byName.values()];
    return res.status(200).json({year,source,actualTop30,national,rookies,pool,count:pool.length});
  }catch(err){
    return res.status(502).json({error:'Unable to load historical draft class',detail:String(err?.message||err),year});
  }
};

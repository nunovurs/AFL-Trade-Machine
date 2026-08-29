const SOURCES = [
  'https://fantasy.afl.com.au/json/fantasy/players.json',
  'https://fantasy.afl.com.au/data/afl/players.json'
];

function asArray(payload){
  if(Array.isArray(payload)) return payload;
  if(Array.isArray(payload?.players)) return payload.players;
  if(Array.isArray(payload?.data)) return payload.data;
  if(Array.isArray(payload?.result)) return payload.result;
  return [];
}

function text(v){ return typeof v === 'string' ? v.trim() : ''; }
function playerName(p){
  const direct = text(p?.name) || text(p?.playerName) || text(p?.fullName) || text(p?.displayName);
  if(direct && direct !== '[object Object]') return direct;
  const given = text(p?.first_name) || text(p?.firstName) || text(p?.firstname) || text(p?.givenName) || text(p?.playerName?.givenName);
  const family = text(p?.last_name) || text(p?.lastName) || text(p?.surname) || text(p?.familyName) || text(p?.playerName?.surname);
  return `${given} ${family}`.trim();
}
function playerId(p){
  return p?.player_id ?? p?.playerId ?? p?.id ?? p?.fantasy_player_id ?? p?.fantasyPlayerId ?? p?.providerId ?? null;
}
function addCandidate(out,url){
  const v=text(url); if(v && /^https?:\/\//i.test(v) && !out.includes(v)) out.push(v);
}
function photoCandidates(p){
  const out=[];
  [p?.photoURL,p?.photoUrl,p?.photo_url,p?.imageURL,p?.imageUrl,p?.image_url,p?.headshotURL,p?.headshotUrl,p?.headshot,p?.photo,p?.image].forEach(v=>addCandidate(out,v));
  const id=playerId(p);
  if(id!==null && id!==undefined && String(id).trim()){
    const clean=encodeURIComponent(String(id).trim());
    addCandidate(out,`https://fantasy.afl.com.au/assets/media/players/afl/${clean}_450.png`);
    addCandidate(out,`https://fantasy.afl.com.au/assets/media/players/afl/${clean}_300.png`);
  }
  return out;
}

module.exports = async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Cache-Control','public, s-maxage=21600, stale-while-revalidate=86400');
  if(req.method==='OPTIONS') return res.status(204).end();
  let lastError='';
  for(const url of SOURCES){
    try{
      const r=await fetch(url,{headers:{'accept':'application/json','user-agent':'AFL-Trade-Machine/1.0'}});
      if(!r.ok){lastError=`${url} -> ${r.status}`;continue;}
      const payload=await r.json();
      const rows=asArray(payload);
      if(!rows.length){lastError=`${url} returned no players`;continue;}
      const players=[];
      for(const p of rows){
        const name=playerName(p); const photos=photoCandidates(p);
        if(name && photos.length) players.push({name,photos,id:playerId(p)});
      }
      if(players.length) return res.status(200).json({source:url,count:players.length,players});
      lastError=`${url} returned no usable player photos`;
    }catch(err){lastError=String(err?.message||err);}
  }
  return res.status(502).json({error:'Unable to load AFL player photo feed',detail:lastError,players:[]});
};

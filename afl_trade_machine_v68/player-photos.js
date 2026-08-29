(() => {
  const placeholder='assets/player-placeholder.svg';
  const photoMap=new Map();
  let loadPromise=null;

  function norm(value){
    return String(value||'')
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/[’‘`]/g,"'")
      .toLowerCase()
      .replace(/\b(jr|junior)\b\.?/g,'')
      .replace(/\b[a-z]\.?\b/g,'')
      .replace(/[^a-z0-9]+/g,' ')
      .trim().replace(/\s+/g,' ');
  }
  function variants(name){
    const raw=String(name||'').trim();
    const out=new Set([norm(raw)]);
    out.add(norm(raw.replace(/\s+[A-Z]\.?\s+/g,' ')));
    out.add(norm(raw.replace(/\s+(Jr\.?|Junior)$/i,'')));
    return [...out].filter(Boolean);
  }
  function profilePhoto(name){
    const profiles=window.ATM_PLAYER_PROFILES||{};
    const direct=profiles[name]?.photo;
    if(direct) return direct;
    const key=Object.keys(profiles).find(k=>norm(k)===norm(name));
    return key?profiles[key]?.photo:null;
  }
  function setEntry(name,photos){
    const list=[...new Set((Array.isArray(photos)?photos:[photos]).filter(Boolean))];
    if(!list.length)return;
    variants(name).forEach(k=>photoMap.set(k,list));
  }
  function getCandidates(name){
    const p=profilePhoto(name);
    if(p) return [p];
    for(const k of variants(name)) if(photoMap.has(k)) return photoMap.get(k);
    return [];
  }
  function get(name){ return getCandidates(name)[0]||placeholder; }
  function applyImage(img){
    const name=img.dataset.playerPhoto;
    if(!name)return;
    const candidates=getCandidates(name);
    const stack=[...candidates,placeholder];
    let i=0;
    const next=()=>{
      const src=stack[i++]||placeholder;
      img.onerror=src===placeholder?null:next;
      if(img.getAttribute('src')!==src) img.src=src;
    };
    next();
  }
  function hydrate(root=document){
    const nodes=[];
    if(root?.matches?.('[data-player-photo]'))nodes.push(root);
    root?.querySelectorAll?.('[data-player-photo]').forEach(n=>nodes.push(n));
    nodes.forEach(applyImage);
  }
  async function load(){
    if(loadPromise)return loadPromise;
    loadPromise=(async()=>{
      try{
        const r=await fetch('/api/player-photos',{headers:{accept:'application/json'}});
        if(!r.ok)throw new Error(`photo feed ${r.status}`);
        const data=await r.json();
        (data.players||[]).forEach(p=>setEntry(p.name,p.photos));
      }catch(err){
        console.warn('AFL player photos unavailable; using fallbacks',err);
      }
      hydrate(document);
      document.dispatchEvent(new CustomEvent('atm:playerphotos'));
      return photoMap;
    })();
    return loadPromise;
  }

  window.ATMPlayerPhotos={placeholder,norm,get,getCandidates,hydrate,load};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});else load();
})();

(() => {
  const $=s=>document.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const placeholder='assets/player-placeholder.svg';
  const state={year:2025,data:null,slots:Array(30).fill(null),drag:null,loading:false};
  const cache=new Map();

  function toast(msg){
    const el=$('#toast'); if(!el)return; el.textContent=msg;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),2200);
  }
  function photo(name,cls='redraft-player-photo'){
    return `<img class="${cls}" data-player-photo="${esc(name)}" src="${placeholder}" alt="${esc(name)}">`;
  }
  function save(){
    try{localStorage.setItem(`atm-redraft-${state.year}`,JSON.stringify(state.slots.map(p=>p?{name:p.name,draftType:p.draftType,originalPick:p.originalPick,originalClub:p.originalClub,detail:p.detail}:null)));}catch{}
  }
  function restore(){
    state.slots=Array(30).fill(null);
    try{
      const saved=JSON.parse(localStorage.getItem(`atm-redraft-${state.year}`)||'null');
      if(!Array.isArray(saved)||!state.data)return;
      const map=new Map(state.data.pool.map(p=>[norm(p.name),p]));
      saved.slice(0,30).forEach((p,i)=>{if(p)state.slots[i]=map.get(norm(p.name))||p;});
    }catch{}
  }
  function usedNames(){return new Set(state.slots.filter(Boolean).map(p=>norm(p.name)));}
  function formatOrigin(p){return p.draftType==='rookie'?`Rookie #${p.originalPick}`:`National #${p.originalPick}`;}
  function deltaLabel(p,rank){
    if(p.draftType==='rookie') return {text:'ROOKIE → TOP 30',cls:'rise'};
    const d=Number(p.originalPick)-Number(rank);
    if(d>0)return{text:`↑ ${d}`,cls:'rise'};
    if(d<0)return{text:`↓ ${Math.abs(d)}`,cls:'fall'};
    return{text:'SAME',cls:'same'};
  }

  async function loadYear(year,{preserve=true}={}){
    state.year=Number(year);state.loading=true;state.data=null;state.slots=Array(30).fill(null);render();
    try{
      let data=cache.get(state.year);
      if(!data){
        const r=await fetch(`/api/redraft-class?year=${state.year}`,{headers:{accept:'application/json'}});
        data=await r.json();
        if(!r.ok)throw new Error(data.detail||data.error||`HTTP ${r.status}`);
        cache.set(state.year,data);
      }
      state.data=data;
      if(preserve)restore();
      render();
    }catch(err){
      state.data={error:String(err?.message||err),pool:[],actualTop30:[]};render();
    }finally{state.loading=false;render();}
  }
  function putPlayer(player,idx){
    if(!player||idx<0||idx>29)return;
    const existing=state.slots.findIndex(p=>p&&norm(p.name)===norm(player.name));
    if(existing===idx)return;
    if(existing>=0){
      const target=state.slots[idx];state.slots[idx]=player;state.slots[existing]=target||null;
    }else state.slots[idx]=player;
    save();render();
  }
  function swapSlots(a,b){
    if(a===b)return;[state.slots[a],state.slots[b]]=[state.slots[b],state.slots[a]];save();render();
  }
  function removeAt(idx){state.slots[idx]=null;save();render();}
  function addNext(player){const idx=state.slots.findIndex(x=>!x);if(idx<0)return toast('Your Top 30 is full');putPlayer(player,idx);}

  function renderBoard(){
    const el=$('#redraftBoard');if(!el)return;
    if(state.loading){el.innerHTML='<div class="redraft-loading">Loading historical draft class…</div>';return;}
    el.innerHTML=state.slots.map((p,i)=>`<div class="redraft-slot ${p?'filled':'empty'}" data-redraft-slot="${i}" draggable="${p?'true':'false'}">
      <span class="redraft-rank">${i+1}</span>
      ${p?`${photo(p.name,'redraft-slot-photo')}<div class="redraft-slot-copy"><strong>${esc(p.name)}</strong><small>${esc(formatOrigin(p))}${p.originalClub?` • ${esc(p.originalClub)}`:''}</small></div><span class="redraft-delta ${deltaLabel(p,i+1).cls}">${deltaLabel(p,i+1).text}</span><button class="redraft-remove" data-redraft-remove="${i}" aria-label="Remove ${esc(p.name)}">×</button>`:`<div class="redraft-slot-empty">DROP PLAYER HERE</div>`}
    </div>`).join('');
    el.querySelectorAll('[data-redraft-slot]').forEach(slot=>{
      const idx=Number(slot.dataset.redraftSlot);
      slot.ondragstart=e=>{if(!state.slots[idx])return;state.drag={type:'slot',idx,player:state.slots[idx]};e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',state.slots[idx].name);requestAnimationFrame(()=>slot.classList.add('dragging'));};
      slot.ondragend=()=>{state.drag=null;document.querySelectorAll('.dragging,.drag-over').forEach(x=>x.classList.remove('dragging','drag-over'));};
      slot.ondragover=e=>{if(!state.drag)return;e.preventDefault();slot.classList.add('drag-over');e.dataTransfer.dropEffect='move';};
      slot.ondragleave=e=>{if(!slot.contains(e.relatedTarget))slot.classList.remove('drag-over');};
      slot.ondrop=e=>{e.preventDefault();slot.classList.remove('drag-over');if(!state.drag)return;if(state.drag.type==='slot')swapSlots(state.drag.idx,idx);else putPlayer(state.drag.player,idx);state.drag=null;};
    });
    el.querySelectorAll('[data-redraft-remove]').forEach(b=>b.onclick=e=>{e.stopPropagation();removeAt(Number(b.dataset.redraftRemove));});
    window.ATMPlayerPhotos?.hydrate?.(el);
  }
  function renderPool(){
    const el=$('#redraftPool');if(!el)return;
    if(state.loading){el.innerHTML='<div class="redraft-loading">Loading full draft class…</div>';return;}
    if(state.data?.error){el.innerHTML=`<div class="redraft-error"><strong>Historical data could not load.</strong><span>${esc(state.data.error)}</span><button class="ghost-btn" id="retryRedraft">RETRY</button></div>`;$('#retryRedraft').onclick=()=>loadYear(state.year);return;}
    const q=norm($('#redraftSearch')?.value||'');const used=usedNames();
    const list=(state.data?.pool||[]).filter(p=>!used.has(norm(p.name))).filter(p=>!q||norm(`${p.name} ${p.originalClub} ${formatOrigin(p)}`).includes(q));
    el.innerHTML=list.map(p=>`<div class="redraft-pool-row" data-redraft-player="${esc(p.name)}" draggable="true">
      ${photo(p.name)}<div class="redraft-pool-copy"><strong>${esc(p.name)}</strong><small>${esc(formatOrigin(p))}${p.originalClub?` • ${esc(p.originalClub)}`:''}</small></div><span class="draft-type-badge ${p.draftType}">${p.draftType==='rookie'?'ROOKIE':'NATIONAL'}</span><button class="redraft-add" data-redraft-add="${esc(p.name)}">ADD</button>
    </div>`).join('')||'<div class="empty-log">No available players match that search.</div>';
    el.querySelectorAll('[data-redraft-player]').forEach(row=>{
      const p=state.data.pool.find(x=>norm(x.name)===norm(row.dataset.redraftPlayer));
      row.ondragstart=e=>{state.drag={type:'pool',player:p};e.dataTransfer.effectAllowed='copyMove';e.dataTransfer.setData('text/plain',p.name);requestAnimationFrame(()=>row.classList.add('dragging'));};
      row.ondragend=()=>{state.drag=null;document.querySelectorAll('.dragging,.drag-over').forEach(x=>x.classList.remove('dragging','drag-over'));};
    });
    el.querySelectorAll('[data-redraft-add]').forEach(b=>b.onclick=e=>{e.stopPropagation();const p=state.data.pool.find(x=>norm(x.name)===norm(b.dataset.redraftAdd));addNext(p);});
    el.ondragover=e=>{if(state.drag?.type==='slot'){e.preventDefault();el.classList.add('drag-over');}};
    el.ondragleave=e=>{if(!el.contains(e.relatedTarget))el.classList.remove('drag-over');};
    el.ondrop=e=>{e.preventDefault();el.classList.remove('drag-over');if(state.drag?.type==='slot')removeAt(state.drag.idx);state.drag=null;};
    window.ATMPlayerPhotos?.hydrate?.(el);
  }
  function renderMeta(){
    if($('#redraftCount'))$('#redraftCount').textContent=`${state.slots.filter(Boolean).length} / 30`;
    const src=$('#redraftSource');if(!src)return;
    if(state.loading){src.textContent=`Loading ${state.year} National + Rookie Draft class…`;return;}
    if(state.data?.error){src.textContent=`${state.year}: historical source unavailable — retry when connected.`;return;}
    if(state.data){src.innerHTML=`<strong>${state.year} draft class:</strong> ${state.data.national?.length||0} National Draft selections + ${state.data.rookies?.length||0} first-time Rookie Draft selections. <a href="${esc(state.data.source)}" target="_blank" rel="noopener">Historical source</a>`;}
  }
  function render(){renderMeta();renderBoard();renderPool();}

  function loadActual(){
    if(!state.data?.actualTop30?.length)return toast('Historical draft data is not loaded');
    state.slots=state.data.actualTop30.slice(0,30).map(p=>state.data.pool.find(x=>norm(x.name)===norm(p.name))||p);
    save();render();toast(`Loaded the actual ${state.year} top 30`);
  }
  function clear(){state.slots=Array(30).fill(null);save();render();$('#redraftComparePanel').hidden=true;}
  function compare(){
    if(!state.data?.actualTop30?.length)return toast('Historical draft data is not loaded');
    const selected=state.slots.filter(Boolean);if(!selected.length)return toast('Add players to your redraft first');
    const actual=state.data.actualTop30;const actualMap=new Map(actual.map((p,i)=>[norm(p.name),i+1]));
    const chosenMap=new Map(selected.map((p,i)=>[norm(p.name),i+1]));
    const exact=selected.filter((p,i)=>actualMap.get(norm(p.name))===i+1).length;
    const newEntries=selected.filter(p=>!actualMap.has(norm(p.name)));
    const dropped=actual.filter(p=>!chosenMap.has(norm(p.name)));
    const biggestRise=selected.map((p,i)=>({p,rank:i+1,delta:p.draftType==='rookie'?999:Number(p.originalPick)-(i+1)})).sort((a,b)=>b.delta-a.delta)[0];
    const rows=state.slots.map((p,i)=>{
      const actualAt=actual[i];const actualRank=p?actualMap.get(norm(p.name)):null;const d=p?deltaLabel(p,i+1):null;
      return `<div class="redraft-compare-row"><span class="compare-rank">${i+1}</span><div class="compare-your">${p?`${photo(p.name,'compare-player-photo')}<span><strong>${esc(p.name)}</strong><small>${esc(formatOrigin(p))}</small></span>`:'<span><strong>—</strong><small>Not filled</small></span>'}</div><div class="compare-move">${p?`<strong class="${d.cls}">${d.text}</strong><small>${actualRank?`Actual top-30 rank: ${actualRank}`:'Not in actual top 30'}</small>`:'—'}</div><div class="compare-actual"><span><strong>${esc(actualAt?.name||'—')}</strong><small>${actualAt?`Actual Pick ${actualAt.originalPick}${actualAt.originalClub?` • ${esc(actualAt.originalClub)}`:''}`:''}</small></span></div></div>`;
    }).join('');
    const el=$('#redraftCompare');
    el.innerHTML=`<div class="compare-summary-grid"><div><span>EXACT POSITION MATCHES</span><strong>${exact}</strong></div><div><span>NEW TOP-30 ENTRIES</span><strong>${newEntries.length}</strong></div><div><span>ACTUAL TOP-30 DROPPED</span><strong>${dropped.length}</strong></div><div><span>BIGGEST RISER</span><strong>${biggestRise?esc(biggestRise.p.name):'—'}</strong><small>${biggestRise?.p.draftType==='rookie'?'Rookie Draft → '+biggestRise.rank:`${biggestRise?.delta>0?'+':''}${biggestRise?.delta||0} places`}</small></div></div><div class="redraft-compare-head"><span>#</span><span>YOUR REDRAFT</span><span>MOVE</span><span>ACTUAL DRAFT</span></div>${rows}<div class="compare-lists"><div><strong>ENTERED YOUR TOP 30</strong><p>${newEntries.length?newEntries.map(p=>`${esc(p.name)} (${esc(formatOrigin(p))})`).join(' • '):'None'}</p></div><div><strong>DROPPED FROM ACTUAL TOP 30</strong><p>${dropped.length?dropped.map(p=>`${esc(p.name)} (#${p.originalPick})`).join(' • '):'None'}</p></div></div>`;
    $('#redraftComparePanel').hidden=false;window.ATMPlayerPhotos?.hydrate?.(el);$('#redraftComparePanel').scrollIntoView({behavior:'smooth',block:'start'});
  }
  function init(){
    const y=$('#redraftYear');if(!y)return;
    y.innerHTML=Array.from({length:15},(_,i)=>2025-i).map(v=>`<option value="${v}" ${v===state.year?'selected':''}>${v}</option>`).join('');
    y.onchange=()=>loadYear(y.value);
    $('#redraftSearch').oninput=renderPool;
    $('#redraftLoadActualBtn').onclick=loadActual;
    $('#redraftCompareBtn').onclick=compare;
    $('#redraftResetBtn').onclick=clear;
    $('#redraftCloseCompareBtn').onclick=()=>{$('#redraftComparePanel').hidden=true;};
    loadYear(state.year);
  }
  window.Redraft={render,loadYear,compare};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

(() => {
  const D=window.ATM_DATA,DD=window.ATM_DRAFT_DATA;
  if(!D?.clubs||!DD?.prospects)return;
  const $=s=>document.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const toast=msg=>window.ATMToast?window.ATMToast(msg):console.log(msg);
  const clubs=[...D.clubs].sort((a,b)=>a.name.localeCompare(b.name));
  const club=id=>clubs.find(c=>c.id===id);
  const KEY='atm-featured-mock-v1';
  const seeds=[
    {id:'seed-steed',pick:'',club:'ess',player:'Leo Steed',reason:''},
    {id:'seed-chapman',pick:'',club:'ric',player:'Harrison Chapman',reason:''},
    {id:'seed-harris',pick:'',club:'col',player:'Mitch Harris',reason:''}
  ];
  let rows;
  try{rows=JSON.parse(localStorage.getItem(KEY)||'null')||seeds.map(x=>({...x}));}catch{rows=seeds.map(x=>({...x}));}
  const prospect=name=>DD.prospects.find(p=>p.name===name);
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(rows));}catch{}};
  function render(){
    const el=$('#featuredMockList');if(!el)return;
    el.innerHTML=rows.length?rows.map((r,i)=>{
      const c=club(r.club),p=prospect(r.player);
      return `<article class="featured-pick-card" style="--club:${c?.color||'#506070'}">
        <div class="featured-pick-head">
          <div class="featured-pick-club"><img src="${esc(c?.logo||'')}" alt=""><span><small>${r.pick?`PICK ${esc(r.pick)}`:'PICK TBD'}</small><strong>${esc(c?.name||'Choose club')}</strong></span></div>
          <button class="featured-delete" data-featured-delete="${esc(r.id)}">×</button>
        </div>
        <div class="featured-player"><strong>${esc(r.player||'Choose prospect')}</strong><span>${p?`${esc(p.position)} • ${esc(p.pathway)}`:'Player details can be edited below'}</span></div>
        <div class="featured-edit-grid">
          <label>PICK<input class="featured-input" data-field="pick" data-index="${i}" value="${esc(r.pick)}" placeholder="e.g. 2"></label>
          <label>CLUB<select class="featured-input" data-field="club" data-index="${i}">${clubs.map(x=>`<option value="${x.id}" ${x.id===r.club?'selected':''}>${esc(x.name)}</option>`).join('')}</select></label>
          <label class="featured-player-select">PLAYER<select class="featured-input" data-field="player" data-index="${i}">${DD.prospects.map(x=>`<option value="${esc(x.name)}" ${x.name===r.player?'selected':''}>${esc(x.name)}</option>`).join('')}</select></label>
        </div>
        <label class="featured-reason-label">WHY THIS PICK?
          <textarea class="featured-reason" data-field="reason" data-index="${i}" placeholder="Add your explanation for why this player is the right pick for this club…">${esc(r.reason)}</textarea>
        </label>
      </article>`;
    }).join(''):'<div class="featured-empty">No picks yet. Add the first pick in your mock draft.</div>';
    document.querySelectorAll('[data-field]').forEach(elm=>{
      elm.onchange=()=>{const i=Number(elm.dataset.index);rows[i][elm.dataset.field]=elm.value;save();if(elm.dataset.field!=='reason')render();};
      if(elm.tagName==='TEXTAREA')elm.oninput=()=>{rows[Number(elm.dataset.index)].reason=elm.value;save();};
    });
    document.querySelectorAll('[data-featured-delete]').forEach(b=>b.onclick=()=>{rows=rows.filter(r=>r.id!==b.dataset.featuredDelete);save();render();});
  }
  function add(){rows.push({id:`pick-${Date.now()}`,pick:'',club:'ric',player:DD.prospects[0]?.name||'',reason:''});save();render();document.querySelector('#featuredMockList article:last-child')?.scrollIntoView({behavior:'smooth',block:'center'});}
  function reset(){rows=seeds.map(x=>({...x}));save();render();toast('Featured mock reset to imported starting notes');}
  $('#addFeaturedPickBtn')?.addEventListener('click',add);
  $('#resetFeaturedMockBtn')?.addEventListener('click',reset);
  window.FeaturedMock={render,add};
  render();
})();
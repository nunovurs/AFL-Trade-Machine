(() => {
  const D=window.ATM_DATA, DD=window.ATM_DRAFT_DATA;
  if(!D?.clubs) return;
  const $=s=>document.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const toast=msg=>window.ATMToast?window.ATMToast(msg):console.log(msg);
  const clubs=[...D.clubs].sort((a,b)=>a.name.localeCompare(b.name));
  const club=id=>clubs.find(c=>c.id===id);
  const groups=[
    {label:'BACKS',slots:[['BP','Back Pocket'],['FB','Full Back'],['BP2','Back Pocket']]},
    {label:'HALF BACKS',slots:[['HBF','Half Back Flank'],['CHB','Centre Half Back'],['HBF2','Half Back Flank']]},
    {label:'CENTRES',slots:[['W','Wing'],['C','Centre'],['W2','Wing']]},
    {label:'HALF FORWARDS',slots:[['HFF','Half Forward Flank'],['CHF','Centre Half Forward'],['HFF2','Half Forward Flank']]},
    {label:'FORWARDS',slots:[['FP','Forward Pocket'],['FF','Full Forward'],['FP2','Forward Pocket']]},
    {label:'FOLLOWERS',slots:[['RUC','Ruck'],['RR','Ruck Rover'],['ROV','Rover']]},
    {label:'INTERCHANGE',interchange:true,slots:[['INT1','Interchange 1'],['INT2','Interchange 2'],['INT3','Interchange 3'],['INT4','Interchange 4'],['INT5','Interchange 5']]}
  ];
  const slotKeys=groups.flatMap(g=>g.slots.map(s=>s[0]));
  const lineups={}, extras={};
  let clubId='ric';
  const blank=()=>Object.fromEntries(slotKeys.map(k=>[k,'']));
  const lineup=()=>lineups[clubId] ||= blank();
  const customList=(id=clubId)=>extras[id] ||= [];
  const selectedSet=(exceptKey=null)=>new Set(Object.entries(lineup()).filter(([k,v])=>v&&k!==exceptKey).map(([,v])=>v));
  const selectedCount=()=>Object.values(lineup()).filter(Boolean).length;
  function allPlayers(){
    const map=new Map(club(clubId).players.map(name=>[name,{name,position:'',source:'Club list'}]));
    customList().forEach(p=>map.set(p.name,p));
    return [...map.values()].sort((a,b)=>a.name.localeCompare(b.name));
  }
  const playerMeta=name=>allPlayers().find(p=>p.name===name)||{name,position:'',source:'Club list'};
  function renderClubOptions(){
    const sel=$('#best23Club'); if(!sel)return;
    sel.innerHTML=clubs.map(c=>`<option value="${c.id}" ${c.id===clubId?'selected':''}>${esc(c.name)}</option>`).join('');
    sel.onchange=()=>{clubId=sel.value;render();};
  }
  function renderIdentity(){
    const c=club(clubId),el=$('#best23ClubIdentity'); if(!el)return;
    el.innerHTML=`<span class="builder-logo-box"><img src="${esc(c.logo)}" alt="${esc(c.name)} independent mark"></span><span><strong>${esc(c.name)}</strong><small>${customList().length?`${customList().length} hypothetical player${customList().length!==1?'s':''} added`:'Current club list'}</small></span>`;
    $('#best23Count').textContent=`${selectedCount()} / 23`;
  }
  function slotOptions(key){
    const current=lineup()[key],used=selectedSet(key);
    return `<option value="">— SELECT PLAYER —</option>`+allPlayers().map(p=>`<option value="${esc(p.name)}" ${current===p.name?'selected':''} ${used.has(p.name)?'disabled':''}>${esc(p.name)}${p.source!=='Club list'?` • ${esc(p.source)}`:''}</option>`).join('');
  }
  function renderField(){
    const el=$('#best23Field'); if(!el)return;
    el.innerHTML=groups.map(g=>`<div class="field-line ${g.interchange?'interchange':''}">
      <div class="field-line-label">${esc(g.label)}</div>
      <div class="field-line-slots">${g.slots.map(([key,label])=>{
        const value=lineup()[key],meta=value?playerMeta(value):null;
        return `<div class="position-slot ${meta&&meta.source!=='Club list'?'hypothetical':''}">
          <div class="position-name">${esc(label)}</div>
          <select class="position-select" data-slot="${key}" aria-label="${esc(label)}">${slotOptions(key)}</select>
          ${meta&&meta.source!=='Club list'?`<span class="assumption-tag">${esc(meta.source)}</span>`:''}
        </div>`;
      }).join('')}</div></div>`).join('');
    document.querySelectorAll('[data-slot]').forEach(sel=>sel.onchange=()=>{
      const key=sel.dataset.slot,value=sel.value;
      if(value&&selectedSet(key).has(value)){toast(`${value} is already selected`);return renderField();}
      lineup()[key]=value;render();
    });
  }
  function addToNextEmpty(name){
    if(Object.values(lineup()).includes(name)) return toast(`${name} is already in your 23`);
    const key=slotKeys.find(k=>!lineup()[k]); if(!key)return toast('Your Best 23 is already full');
    lineup()[key]=name;render();
  }
  function renderPool(){
    const el=$('#best23Pool'); if(!el)return;
    const q=($('#best23Search')?.value||'').toLowerCase().trim(),chosen=new Set(Object.values(lineup()).filter(Boolean));
    const list=allPlayers().filter(p=>(`${p.name} ${p.position} ${p.source}`).toLowerCase().includes(q));
    el.innerHTML=list.map(p=>`<div class="squad-row ${chosen.has(p.name)?'selected':''} ${p.source!=='Club list'?'hypothetical-row':''}">
      <div><div class="squad-name">${esc(p.name)}</div><div class="squad-status">${p.position?`${esc(p.position)} • `:''}${chosen.has(p.name)?'Selected in Best 23':esc(p.source)}</div></div>
      <button class="squad-add" data-add-player="${esc(p.name)}" ${chosen.has(p.name)?'disabled':''}>ADD</button>
    </div>`).join('');
    document.querySelectorAll('[data-add-player]').forEach(b=>b.onclick=()=>addToNextEmpty(b.dataset.addPlayer));
  }
  function openModal(html){const m=$('#draftModal'),c=$('#draftModalCard');if(!m||!c)return;c.innerHTML=html;m.hidden=false;}
  function closeModal(){const m=$('#draftModal'),c=$('#draftModalCard');if(m)m.hidden=true;if(c)c.innerHTML='';}
  function addCustomPlayer(){
    openModal(`<div class="modal-kicker">BEST 23 ASSUMPTION</div><h3>Add a player to ${esc(club(clubId).name)}</h3>
      <p>Add someone who is not on the current list so you can model a trade, draft or other hypothetical.</p>
      <label class="modal-label">PLAYER NAME</label><input id="customPlayerName" class="modal-input" placeholder="Player name">
      <label class="modal-label">POSITION / ROLE</label><input id="customPlayerPosition" class="modal-input" placeholder="e.g. Key forward, midfielder">
      <label class="modal-label">ASSUMPTION SOURCE</label><select id="customPlayerSource" class="modal-select"><option>Trade assumption</option><option>Draft assumption</option><option>Custom assumption</option></select>
      <div class="modal-actions"><button id="cancelCustomPlayer" class="ghost-btn">CANCEL</button><button id="saveCustomPlayer" class="primary-btn">ADD PLAYER</button></div>`);
    $('#cancelCustomPlayer').onclick=closeModal;
    $('#saveCustomPlayer').onclick=()=>{
      const name=$('#customPlayerName').value.trim(),position=$('#customPlayerPosition').value.trim(),source=$('#customPlayerSource').value;
      if(!name)return toast('Enter a player name');
      if(allPlayers().some(p=>p.name.toLowerCase()===name.toLowerCase()))return toast(`${name} is already in the squad pool`);
      customList().push({name,position,source});closeModal();render();toast(`${name} added to ${club(clubId).name}`);
    };
  }
  function importTradePlayers(){
    const incoming=window.TradeMachine?.getIncomingPlayers?.(clubId)||[];
    if(!incoming.length)return toast(`No incoming traded players for ${club(clubId).name}`);
    let added=0;
    incoming.forEach(a=>{if(!allPlayers().some(p=>p.name===a.name)){customList().push({name:a.name,position:'',source:'Trade assumption'});added++;}});
    render();toast(added?`${added} traded player${added!==1?'s':''} added to squad pool`:'Those incoming players are already available');
  }
  function addDraftProspect(){
    const prospects=DD?.prospects||[];if(!prospects.length)return toast('Draft prospect data unavailable');
    openModal(`<div class="modal-kicker">DRAFT ASSUMPTION</div><h3>Add a 2026 draft prospect</h3>
      <p>Select a prospect to add to ${esc(club(clubId).name)} for a hypothetical Best 23.</p>
      <label class="modal-label">PROSPECT</label><select id="draftAssumptionPlayer" class="modal-select">${prospects.map(p=>`<option value="${esc(p.name)}">${esc(p.name)} • ${esc(p.position)}</option>`).join('')}</select>
      <div class="modal-actions"><button id="cancelDraftAssumption" class="ghost-btn">CANCEL</button><button id="saveDraftAssumption" class="primary-btn">ADD PROSPECT</button></div>`);
    $('#cancelDraftAssumption').onclick=closeModal;
    $('#saveDraftAssumption').onclick=()=>{
      const name=$('#draftAssumptionPlayer').value,p=prospects.find(x=>x.name===name);
      if(allPlayers().some(x=>x.name===name))return toast(`${name} is already available`);
      customList().push({name,position:p?.position||'',source:'Draft assumption'});closeModal();render();toast(`${name} added as a draft assumption`);
    };
  }
  function copyTeam(){
    const c=club(clubId),lines=[];
    groups.forEach(g=>lines.push(`${g.label}: ${g.slots.map(([k])=>lineup()[k]||'—').join(', ')}`));
    const assumptions=customList().filter(p=>Object.values(lineup()).includes(p.name));
    if(assumptions.length)lines.push(`ASSUMPTIONS: ${assumptions.map(p=>`${p.name} (${p.source})`).join(', ')}`);
    const text=`${c.name} Best 23\n${lines.join('\n')}`;
    if(navigator.clipboard?.writeText)navigator.clipboard.writeText(text).then(()=>toast('Best 23 copied')).catch(()=>toast('Copy unavailable'));else toast('Copy unavailable');
  }
  function clearTeam(){lineups[clubId]=blank();render();toast(`${club(clubId).name} team cleared`);}
  function render(){renderClubOptions();renderIdentity();renderField();renderPool();}
  function init(){
    $('#best23Search')&&($('#best23Search').oninput=renderPool);
    $('#copyBest23Btn')&&($('#copyBest23Btn').onclick=copyTeam);
    $('#resetBest23Btn')&&($('#resetBest23Btn').onclick=clearTeam);
    $('#addBest23PlayerBtn')&&($('#addBest23PlayerBtn').onclick=addCustomPlayer);
    $('#importTradePlayersBtn')&&($('#importTradePlayersBtn').onclick=importTradePlayers);
    $('#addDraftProspectBtn')&&($('#addDraftProspectBtn').onclick=addDraftProspect);
    render();
  }
  window.Best23={render,clear:clearTeam};
  init();
})();
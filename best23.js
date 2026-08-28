(() => {
  const D=window.ATM_DATA, DD=window.ATM_DRAFT_DATA;
  if(!D?.clubs) return;
  const $=s=>document.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const toast=msg=>window.ATMToast?window.ATMToast(msg):console.log(msg);
  const clubs=[...D.clubs].sort((a,b)=>a.name.localeCompare(b.name));
  const club=id=>clubs.find(c=>c.id===id);
  const CLUB_THEME={ade:{primary:'#f6c000',secondary:'#002b5c',text:'#111'},bri:{primary:'#f5c400',secondary:'#7b002c',text:'#111'},car:{primary:'#ffffff',secondary:'#071c3d',text:'#071c3d'},col:{primary:'#ffffff',secondary:'#111111',text:'#111'},ess:{primary:'#d71920',secondary:'#050505',text:'#fff'},fre:{primary:'#ffffff',secondary:'#5b2b82',text:'#5b2b82'},gee:{primary:'#ffffff',secondary:'#002b5c',text:'#002b5c'},gcs:{primary:'#ffd200',secondary:'#e7192d',text:'#111'},gws:{primary:'#f15a22',secondary:'#202020',text:'#111'},haw:{primary:'#f4c430',secondary:'#4d2004',text:'#111'},mel:{primary:'#d71920',secondary:'#061a33',text:'#fff'},nm:{primary:'#ffffff',secondary:'#00529b',text:'#00529b'},pa:{primary:'#00a2b8',secondary:'#111111',text:'#111'},ric:{primary:'#f2d318',secondary:'#050505',text:'#111'},stk:{primary:'#ed1b2f',secondary:'#111111',text:'#fff'},syd:{primary:'#e31b23',secondary:'#ffffff',text:'#fff'},wce:{primary:'#f4c430',secondary:'#003087',text:'#111'},wbd:{primary:'#e31b23',secondary:'#1b4f9c',text:'#fff'}};
  const themeFor=id=>CLUB_THEME[id]||{primary:'#d6dce1',secondary:'#172337',text:'#111'};

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
  let activeSlotKey=null;
  let dragState=null;
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
    sel.onchange=()=>{clubId=sel.value;activeSlotKey=null;render();};
  }
  function renderIdentity(){
    const c=club(clubId),el=$('#best23ClubIdentity'); if(!el)return;
    const t=themeFor(clubId),mode=$('#best23Mode');if(mode){mode.style.setProperty('--teamPrimary',t.primary);mode.style.setProperty('--teamSecondary',t.secondary);mode.style.setProperty('--teamText',t.text);}
    el.innerHTML=`<span class="builder-logo-box"><img src="${esc(c.logo)}" alt="${esc(c.name)} logo"></span><span><strong>${esc(c.name)}</strong><small>${customList().length?`${customList().length} hypothetical player${customList().length!==1?'s':''} added`:'Current club list'}</small></span>`;
    $('#best23Count').textContent=`${selectedCount()} / 23`;
  }
  function slotOptions(key){
    const current=lineup()[key],used=selectedSet(key);
    return `<option value="">— SELECT PLAYER —</option>`+allPlayers().map(p=>`<option value="${esc(p.name)}" ${current===p.name?'selected':''} ${used.has(p.name)?'disabled':''}>${esc(p.name)}${p.source!=='Club list'?` • ${esc(p.source)}`:''}</option>`).join('');
  }
  function setPlayerInSlot(key,name){
    if(!slotKeys.includes(key)) return;
    const current=lineup()[key];
    if(!name){lineup()[key]='';render();return;}
    const existingKey=Object.entries(lineup()).find(([k,v])=>k!==key&&v===name)?.[0];
    if(existingKey) lineup()[existingKey]='';
    lineup()[key]=name;
    activeSlotKey=key;
    render();
  }
  function moveOrSwapSlot(fromKey,toKey){
    if(!fromKey||!toKey||fromKey===toKey)return;
    const from=lineup()[fromKey],to=lineup()[toKey];
    lineup()[toKey]=from;
    lineup()[fromKey]=to;
    activeSlotKey=toKey;
    render();
  }
  function renderField(){
    const el=$('#best23Field'); if(!el)return;
    const t=themeFor(clubId);
    const patterns={
      ade:['#002b5c','#d71920','#f6c000'],bri:['#7b002c','#0055a4','#f5c400'],car:['#071c3d','#ffffff','#071c3d'],
      col:['#111111','#ffffff','#111111'],ess:['#050505','#d71920','#050505'],fre:['#5b2b82','#ffffff','#5b2b82'],
      gee:['#002b5c','#ffffff','#002b5c'],gcs:['#e7192d','#ffd200','#e7192d'],gws:['#202020','#f15a22','#202020'],
      haw:['#4d2004','#f4c430','#4d2004'],mel:['#061a33','#d71920','#061a33'],nm:['#00529b','#ffffff','#00529b'],
      pa:['#111111','#00a2b8','#111111'],ric:['#f2d318','#050505','#f2d318'],stk:['#ed1b2f','#ffffff','#111111'],
      syd:['#e31b23','#ffffff','#e31b23'],wce:['#003087','#f4c430','#003087'],wbd:['#1b4f9c','#e31b23','#1b4f9c']
    };
    const stripe=patterns[clubId]||[t.primary,t.secondary,t.primary];
    el.style.setProperty('--slotA',stripe[0]);
    el.style.setProperty('--slotB',stripe[1]);
    el.style.setProperty('--slotC',stripe[2]);
    el.innerHTML=groups.map(g=>`<div class="field-line ${g.interchange?'interchange':''}">
      <div class="field-line-label">${esc(g.label)}</div>
      <div class="field-line-slots">${g.slots.map(([key,label])=>{
        const value=lineup()[key],meta=value?playerMeta(value):null;
        return `<div class="position-slot ${meta&&meta.source!=='Club list'?'hypothetical':''} ${activeSlotKey===key?'active-slot':''}" data-slot-card="${key}" data-player-name="${esc(value)}" draggable="${value?'true':'false'}" tabindex="0" role="button" aria-label="${esc(label)}${value?`: ${esc(value)}`:': empty'}">
          <div class="position-name">${esc(label)}</div>
          <select class="position-select" data-slot="${key}" aria-label="${esc(label)}">${slotOptions(key)}</select>
          ${meta&&meta.source!=='Club list'?`<span class="assumption-tag">${esc(meta.source)}</span>`:''}
          <span class="drag-slot-hint">${value?'DRAG TO MOVE / SWAP':'DROP PLAYER HERE'}</span>
        </div>`;
      }).join('')}</div></div>`).join('');
    document.querySelectorAll('[data-slot]').forEach(sel=>sel.onchange=()=>{
      const key=sel.dataset.slot,value=sel.value;
      if(value&&selectedSet(key).has(value)){toast(`${value} is already selected`);return renderField();}
      lineup()[key]=value;activeSlotKey=key;render();
    });
    document.querySelectorAll('[data-slot-card]').forEach(card=>{
      const key=card.dataset.slotCard;
      card.onclick=e=>{if(e.target.closest('select'))return;activeSlotKey=key;renderField();};
      card.onkeydown=e=>{if((e.key==='Enter'||e.key===' ')&&!e.target.closest('select')){e.preventDefault();activeSlotKey=key;renderField();}};
      card.ondragstart=e=>{
        const name=lineup()[key]; if(!name){e.preventDefault();return;}
        dragState={type:'slot',slot:key,name};
        e.dataTransfer.effectAllowed='move';
        e.dataTransfer.setData('text/plain',name);
        requestAnimationFrame(()=>card.classList.add('dragging'));
      };
      card.ondragend=()=>{dragState=null;document.querySelectorAll('.dragging,.drag-over').forEach(x=>x.classList.remove('dragging','drag-over'));};
      card.ondragover=e=>{e.preventDefault();e.dataTransfer.dropEffect='move';card.classList.add('drag-over');};
      card.ondragleave=e=>{if(!card.contains(e.relatedTarget))card.classList.remove('drag-over');};
      card.ondrop=e=>{
        e.preventDefault();card.classList.remove('drag-over');
        if(!dragState)return;
        if(dragState.type==='slot') moveOrSwapSlot(dragState.slot,key);
        else if(dragState.type==='pool') setPlayerInSlot(key,dragState.name);
        dragState=null;
      };
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
    el.innerHTML=`<div class="pool-drop-hint">DRAG A PLAYER BACK HERE TO REMOVE FROM THE 23</div>`+list.map(p=>`<div class="squad-row ${chosen.has(p.name)?'selected':''} ${p.source!=='Club list'?'hypothetical-row':''}" data-pool-player="${esc(p.name)}" draggable="${chosen.has(p.name)?'false':'true'}">
      <div><div class="squad-name">${esc(p.name)}</div><div class="squad-status">${p.position?`${esc(p.position)} • `:''}${chosen.has(p.name)?'Selected in Best 23':esc(p.source)}</div></div>
      <button class="squad-add" data-add-player="${esc(p.name)}" ${chosen.has(p.name)?'disabled':''}>ADD</button>
    </div>`).join('');
    document.querySelectorAll('[data-add-player]').forEach(b=>b.onclick=e=>{e.stopPropagation();addToNextEmpty(b.dataset.addPlayer);});
    document.querySelectorAll('[data-pool-player]').forEach(row=>{
      const name=row.dataset.poolPlayer;
      row.onclick=e=>{
        if(e.target.closest('button')||chosen.has(name))return;
        if(activeSlotKey)setPlayerInSlot(activeSlotKey,name);else addToNextEmpty(name);
      };
      row.ondragstart=e=>{
        if(chosen.has(name)){e.preventDefault();return;}
        dragState={type:'pool',name};
        e.dataTransfer.effectAllowed='copyMove';e.dataTransfer.setData('text/plain',name);
        requestAnimationFrame(()=>row.classList.add('dragging'));
      };
      row.ondragend=()=>{dragState=null;document.querySelectorAll('.dragging,.drag-over').forEach(x=>x.classList.remove('dragging','drag-over'));};
    });
    el.ondragover=e=>{if(dragState?.type==='slot'){e.preventDefault();el.classList.add('drag-over');}};
    el.ondragleave=e=>{if(!el.contains(e.relatedTarget))el.classList.remove('drag-over');};
    el.ondrop=e=>{
      e.preventDefault();el.classList.remove('drag-over');
      if(dragState?.type==='slot'){
        lineup()[dragState.slot]='';activeSlotKey=null;dragState=null;render();
      }
    };
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
    const names=window.ATM_MY_MOCK?.pool||[], profiles=window.ATM_PLAYER_PROFILES||{}; const prospects=names.map(name=>({name,position:profiles[name]?.position||''}));if(!prospects.length)return toast('My draft prospect data unavailable');
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
  function clearTeam(){lineups[clubId]=blank();activeSlotKey=null;render();toast(`${club(clubId).name} team cleared`);}
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
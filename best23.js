(() => {
  const D=window.ATM_DATA, DD=window.ATM_DRAFT_DATA;
  if(!D?.clubs) return;
  const $=s=>document.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const toast=msg=>window.ATMToast?window.ATMToast(msg):console.log(msg);
  const clubs=[...D.clubs].sort((a,b)=>a.name.localeCompare(b.name));
  const club=id=>clubs.find(c=>c.id===id);
  const CLUB_THEME={
    ade:{primary:'#f2c500',secondary:'#002b5c',text:'#111',selectorBg:'#002b5c',selectorText:'#fff',bands:['#002b5c','#d71920','#f2c500']},
    bri:{primary:'#f5c400',secondary:'#7b002c',text:'#111',selectorBg:'#7b002c',selectorText:'#fff',bands:['#7b002c','#0055a4','#f5c400']},
    car:{primary:'#071c3d',secondary:'#071c3d',text:'#fff',selectorBg:'#071c3d',selectorText:'#fff',bands:['#071c3d','#071c3d','#071c3d']},
    col:{primary:'#ffffff',secondary:'#111111',text:'#111',selectorBg:'#ffffff',selectorText:'#111',bands:['#111111','#ffffff','#111111']},
    ess:{primary:'#d71920',secondary:'#050505',text:'#fff',selectorBg:'#050505',selectorText:'#fff',bands:['#050505','#d71920','#050505']},
    fre:{primary:'#5b2b82',secondary:'#ffffff',text:'#fff',selectorBg:'#5b2b82',selectorText:'#fff',bands:['#5b2b82','#ffffff','#5b2b82']},
    gee:{primary:'#002b5c',secondary:'#ffffff',text:'#fff',selectorBg:'#002b5c',selectorText:'#fff',bands:['#002b5c','#ffffff','#002b5c']},
    gcs:{primary:'#ffd200',secondary:'#e7192d',text:'#111',selectorBg:'#e7192d',selectorText:'#fff',bands:['#e7192d','#ffd200','#e7192d']},
    gws:{primary:'#f15a22',secondary:'#172b49',text:'#172b49',selectorBg:'#f15a22',selectorText:'#172b49',bands:['#f15a22','#172b49','#f15a22']},
    haw:{primary:'#f4c430',secondary:'#4d2004',text:'#111',selectorBg:'#f4c430',selectorText:'#4d2004',bands:['#4d2004','#f4c430','#4d2004']},
    mel:{primary:'#d71920',secondary:'#061a33',text:'#fff',selectorBg:'#061a33',selectorText:'#fff',bands:['#061a33','#d71920','#061a33']},
    nm:{primary:'#00529b',secondary:'#ffffff',text:'#fff',selectorBg:'#00529b',selectorText:'#fff',bands:['#00529b','#ffffff','#00529b']},
    pa:{primary:'#00a2b8',secondary:'#111111',text:'#111',selectorBg:'#111111',selectorText:'#fff',bands:['#111111','#00a2b8','#111111']},
    ric:{primary:'#f2d318',secondary:'#050505',text:'#111',selectorBg:'#f2d318',selectorText:'#050505',bands:['#050505','#f2d318','#050505']},
    stk:{primary:'#ed1b2f',secondary:'#111111',text:'#fff',selectorBg:'#ffffff',selectorText:'#111111',bands:['#ed1b2f','#ffffff','#111111']},
    syd:{primary:'#e31b23',secondary:'#ffffff',text:'#fff',selectorBg:'#e31b23',selectorText:'#fff',bands:['#e31b23','#ffffff','#e31b23']},
    wce:{primary:'#d5a900',secondary:'#003087',text:'#003087',selectorBg:'#d5a900',selectorText:'#003087',bands:['#d5a900','#003087','#d5a900']},
    wbd:{primary:'#e31b23',secondary:'#1b4f9c',text:'#fff',selectorBg:'#ffffff',selectorText:'#1b4f9c',bands:['#e31b23','#ffffff','#1b4f9c']}
  };
  const themeFor=id=>CLUB_THEME[id]||{primary:'#d6dce1',secondary:'#172337',text:'#111',selectorBg:'#172337',selectorText:'#fff',bands:['#172337','#d6dce1','#172337']};

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
  const lineups={}, extras={}, delisted={};
  let clubId='ric';
  let activeSlotKey=null;
  let dragState=null;
  const blank=()=>Object.fromEntries(slotKeys.map(k=>[k,'']));
  const lineup=()=>lineups[clubId] ||= blank();
  const customList=(id=clubId)=>extras[id] ||= [];
  const delistedSet=(id=clubId)=>delisted[id] ||= new Set();
  const selectedSet=(exceptKey=null)=>new Set(Object.entries(lineup()).filter(([k,v])=>v&&k!==exceptKey).map(([,v])=>v));
  const selectedCount=()=>Object.values(lineup()).filter(Boolean).length;
  function rawAllPlayers(){
    const map=new Map(club(clubId).players.map(name=>[name,{name,position:'',source:'Club list'}]));
    customList().forEach(p=>map.set(p.name,p));
    return [...map.values()].sort((a,b)=>a.name.localeCompare(b.name));
  }
  function allPlayers(){
    const gone=delistedSet();
    return rawAllPlayers().filter(p=>!gone.has(p.name));
  }
  const playerMeta=name=>allPlayers().find(p=>p.name===name)||{name,position:'',source:'Club list'};
  const photoImg=(name,cls='player-thumb')=>`<img class="${cls}" data-player-photo="${esc(name)}" src="assets/player-placeholder.svg" alt="${esc(name)}">`;
  const hydratePhotos=(root=document)=>window.ATMPlayerPhotos?.hydrate?.(root);
  function renderClubOptions(){
    const sel=$('#best23Club'); if(!sel)return;
    sel.innerHTML=clubs.map(c=>`<option value="${c.id}" ${c.id===clubId?'selected':''}>${esc(c.name)}</option>`).join('');
    sel.onchange=()=>{clubId=sel.value;activeSlotKey=null;render();};
  }
  function renderIdentity(){
    const c=club(clubId),el=$('#best23ClubIdentity'); if(!el)return;
    const t=themeFor(clubId),mode=$('#best23Mode');if(mode){mode.style.setProperty('--teamPrimary',t.primary);mode.style.setProperty('--teamSecondary',t.secondary);mode.style.setProperty('--teamText',t.text);mode.style.setProperty('--selectorBg',t.selectorBg);mode.style.setProperty('--selectorText',t.selectorText);mode.style.setProperty('--selectorA',t.bands[0]);mode.style.setProperty('--selectorB',t.bands[1]);mode.style.setProperty('--selectorC',t.bands[2]);}
    el.innerHTML=`<span class="builder-logo-box"><img src="${esc(c.logo)}" alt="${esc(c.name)} logo"></span><span><strong>${esc(c.name)}</strong><small>${customList().length?`${customList().length} hypothetical player${customList().length!==1?'s':''} added`:'Current club list'}${delistedSet().size?` • ${delistedSet().size} delisted`:''}</small></span>`;
    $('#best23Count').textContent=`${selectedCount()} / 23`;
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
    el.innerHTML=groups.map(g=>`<div class="field-line ${g.interchange?'interchange':''}">
      <div class="field-line-label">${esc(g.label)}</div>
      <div class="field-line-slots">${g.slots.map(([key,label])=>{
        const value=lineup()[key],meta=value?playerMeta(value):null;
        return `<div class="position-slot ${value?'occupied':'empty'} ${meta&&meta.source!=='Club list'?'hypothetical':''} ${activeSlotKey===key?'active-slot':''}" data-slot-card="${key}" data-player-name="${esc(value)}" draggable="${value?'true':'false'}" tabindex="0" role="button" aria-label="${esc(label)}${value?`: ${esc(value)}`:': empty'}">
          <div class="position-name">${esc(label)}</div>
          ${value?`<div class="position-player-tag">${photoImg(value,'position-player-photo')}<span><strong>${esc(value)}</strong>${meta&&meta.source!=='Club list'?`<small>${esc(meta.source)}</small>`:''}</span></div>`:`<div class="position-player-tag empty-tag"><span><strong>DROP PLAYER</strong></span></div>`}
        </div>`;
      }).join('')}</div></div>`).join('');
    document.querySelectorAll('[data-slot-card]').forEach(card=>{
      const key=card.dataset.slotCard;
      card.onclick=()=>{activeSlotKey=key;renderField();};
      card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activeSlotKey=key;renderField();}};
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
    hydratePhotos(el);
  }
  function addToNextEmpty(name){
    if(Object.values(lineup()).includes(name)) return toast(`${name} is already in your 23`);
    const key=slotKeys.find(k=>!lineup()[k]); if(!key)return toast('Your Best 23 is already full');
    lineup()[key]=name;render();
  }
  function delistPlayer(name){
    if(!name)return;
    Object.keys(lineup()).forEach(k=>{if(lineup()[k]===name)lineup()[k]='';});
    delistedSet().add(name);
    activeSlotKey=null;
    render();
    toast(`${name} delisted from ${club(clubId).name}`);
  }
  function restorePlayer(name){
    delistedSet().delete(name);
    render();
    toast(`${name} restored to ${club(clubId).name} squad`);
  }
  function renderPool(){
    const el=$('#best23Pool'); if(!el)return;
    const q=($('#best23Search')?.value||'').toLowerCase().trim(),chosen=new Set(Object.values(lineup()).filter(Boolean));
    const list=allPlayers().filter(p=>(`${p.name} ${p.position} ${p.source}`).toLowerCase().includes(q));
    const gone=[...delistedSet()].map(name=>rawAllPlayers().find(p=>p.name===name)||{name,position:'',source:'Club list'}).sort((a,b)=>a.name.localeCompare(b.name));
    el.innerHTML=`<div class="pool-drop-hint">DRAG PLAYERS TO THE OVAL • CLICK A POSITION THEN A PLAYER • DELIST REMOVES THEM FROM THE ACTIVE SQUAD</div>`+list.map(p=>`<div class="squad-row ${chosen.has(p.name)?'selected':''} ${p.source!=='Club list'?'hypothetical-row':''}" data-pool-player="${esc(p.name)}" draggable="${chosen.has(p.name)?'false':'true'}">
      <div class="squad-player-main">${photoImg(p.name,'squad-player-photo')}<div><div class="squad-name">${esc(p.name)}</div><div class="squad-status">${p.position?`${esc(p.position)} • `:''}${chosen.has(p.name)?'Selected in Best 23':esc(p.source)}</div></div></div>
      <div class="squad-actions"><button class="squad-delist" data-delist-player="${esc(p.name)}">DELIST</button></div>
    </div>`).join('')+(gone.length?`<div class="delisted-block"><div class="delisted-title">DELISTED PLAYERS <span>${gone.length}</span></div>${gone.map(p=>`<div class="squad-row delisted-row"><div class="squad-player-main">${photoImg(p.name,'squad-player-photo')}<div><div class="squad-name">${esc(p.name)}</div><div class="squad-status">Removed from active squad</div></div></div><button class="squad-restore" data-restore-player="${esc(p.name)}">RESTORE</button></div>`).join('')}</div>`:'');
    document.querySelectorAll('[data-delist-player]').forEach(b=>b.onclick=e=>{e.stopPropagation();delistPlayer(b.dataset.delistPlayer);});
    document.querySelectorAll('[data-restore-player]').forEach(b=>b.onclick=e=>{e.stopPropagation();restorePlayer(b.dataset.restorePlayer);});
    document.querySelectorAll('[data-pool-player]').forEach(row=>{
      const name=row.dataset.poolPlayer;
      row.onclick=e=>{
        if(e.target.closest('button')||chosen.has(name))return;
        if(activeSlotKey)setPlayerInSlot(activeSlotKey,name);else toast('Select a field position or drag the player onto the oval');
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
    hydratePhotos(el);
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
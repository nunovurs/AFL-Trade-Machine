(() => {
  const D=window.ATM_DATA;
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
  const teams={},extras={},delisted={};
  let clubId='ric';
  let activeTarget=null;
  let dragState=null;
  const blank=()=>Object.fromEntries(slotKeys.map(k=>[k,'']));
  const clubTeams=(id=clubId)=>teams[id] ||= {afl:blank(),vfl:blank()};
  const lineup=(team='afl')=>clubTeams()[team];
  const customList=(id=clubId)=>extras[id] ||= [];
  const delistedSet=(id=clubId)=>delisted[id] ||= new Set();
  const selectedNames=()=>new Set([...Object.values(lineup('afl')),...Object.values(lineup('vfl'))].filter(Boolean));
  const selectedCount=team=>Object.values(lineup(team)).filter(Boolean).length;

  function rawAllPlayers(){
    const c=club(clubId);
    const map=new Map((c?.players||[]).map(name=>[name,{name,position:'',source:'Club list'}]));
    customList().forEach(p=>map.set(p.name,p));
    return [...map.values()].sort((a,b)=>a.name.localeCompare(b.name));
  }
  function allPlayers(){
    const gone=delistedSet();
    return rawAllPlayers().filter(p=>!gone.has(p.name));
  }
  const playerMeta=name=>rawAllPlayers().find(p=>p.name===name)||{name,position:'',source:'Club list'};
  const photoImg=(name,cls='player-thumb')=>`<img class="${cls}" data-player-photo="${esc(name)}" src="assets/player-placeholder.svg" alt="${esc(name)}">`;
  const hydratePhotos=(root=document)=>window.ATMPlayerPhotos?.hydrate?.(root);

  function renderClubOptions(){
    const sel=$('#best23Club'); if(!sel)return;
    sel.innerHTML=clubs.map(c=>`<option value="${c.id}" ${c.id===clubId?'selected':''}>${esc(c.name)}</option>`).join('');
    sel.onchange=()=>{clubId=sel.value;activeTarget=null;render();};
  }
  function renderIdentity(){
    const c=club(clubId),el=$('#best23ClubIdentity'); if(!el)return;
    const t=themeFor(clubId),mode=$('#best23Mode');
    if(mode){
      mode.style.setProperty('--teamPrimary',t.primary);mode.style.setProperty('--teamSecondary',t.secondary);mode.style.setProperty('--teamText',t.text);
      mode.style.setProperty('--selectorBg',t.selectorBg);mode.style.setProperty('--selectorText',t.selectorText);mode.style.setProperty('--selectorA',t.bands[0]);mode.style.setProperty('--selectorB',t.bands[1]);mode.style.setProperty('--selectorC',t.bands[2]);
    }
    el.innerHTML=`<span class="builder-logo-box"><img src="${esc(c.logo)}" alt="${esc(c.name)} logo"></span><span><strong>${esc(c.name)}</strong><small>${customList().length?`${customList().length} hypothetical player${customList().length!==1?'s':''} added`:'Current club list'}${delistedSet().size?` • ${delistedSet().size} delisted`:''}</small></span>`;
    if($('#best23Count'))$('#best23Count').textContent=`AFL ${selectedCount('afl')} / 23`;
    if($('#vflBest23Count'))$('#vflBest23Count').textContent=`VFL ${selectedCount('vfl')} / 23`;
  }

  function removeNameEverywhere(name,exceptTeam=null,exceptKey=null){
    for(const team of ['afl','vfl']) for(const key of slotKeys){
      if(team===exceptTeam&&key===exceptKey)continue;
      if(lineup(team)[key]===name)lineup(team)[key]='';
    }
  }
  function setPlayerInSlot(team,key,name){
    if(!['afl','vfl'].includes(team)||!slotKeys.includes(key))return;
    if(!name){lineup(team)[key]='';render();return;}
    removeNameEverywhere(name,team,key);
    lineup(team)[key]=name;
    activeTarget={team,key};
    render();
  }
  function moveOrSwapSlot(fromTeam,fromKey,toTeam,toKey){
    if(!fromTeam||!toTeam||!fromKey||!toKey)return;
    if(fromTeam===toTeam&&fromKey===toKey)return;
    const from=lineup(fromTeam)[fromKey],to=lineup(toTeam)[toKey];
    lineup(toTeam)[toKey]=from;
    lineup(fromTeam)[fromKey]=to;
    activeTarget={team:toTeam,key:toKey};
    render();
  }
  function removeFromSlot(team,key){
    if(lineup(team)[key])lineup(team)[key]='';
    activeTarget=null;render();
  }

  function renderField(team,selector){
    const el=$(selector); if(!el)return;
    el.innerHTML=groups.map(g=>`<div class="field-line ${g.interchange?'interchange':''}">
      <div class="field-line-label">${esc(g.label)}</div>
      <div class="field-line-slots">${g.slots.map(([key,label])=>{
        const value=lineup(team)[key],meta=value?playerMeta(value):null;
        const active=activeTarget?.team===team&&activeTarget?.key===key;
        return `<div class="position-slot ${value?'occupied':'empty'} ${meta&&meta.source!=='Club list'?'hypothetical':''} ${active?'active-slot':''}" data-team-field="${team}" data-slot-card="${key}" draggable="${value?'true':'false'}" tabindex="0" role="button" aria-label="${esc(label)}${value?`: ${esc(value)}`:': empty'}">
          <div class="position-name">${esc(label)}</div>
          ${value?`<div class="position-player-tag">${photoImg(value,'position-player-photo')}<span><strong>${esc(value)}</strong>${meta&&meta.source!=='Club list'?`<small>${esc(meta.source)}</small>`:''}</span></div>`:`<div class="position-player-tag empty-tag"><span><strong>DROP PLAYER</strong></span></div>`}
        </div>`;
      }).join('')}</div></div>`).join('');
    el.querySelectorAll('[data-slot-card]').forEach(card=>{
      const key=card.dataset.slotCard,fieldTeam=card.dataset.teamField;
      card.onclick=()=>{activeTarget={team:fieldTeam,key};renderFieldsOnly();};
      card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activeTarget={team:fieldTeam,key};renderFieldsOnly();}};
      card.ondragstart=e=>{
        const name=lineup(fieldTeam)[key];if(!name){e.preventDefault();return;}
        dragState={type:'slot',team:fieldTeam,key,name};
        e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',name);requestAnimationFrame(()=>card.classList.add('dragging'));
      };
      card.ondragend=()=>{dragState=null;document.querySelectorAll('.dragging,.drag-over').forEach(x=>x.classList.remove('dragging','drag-over'));};
      card.ondragover=e=>{if(!dragState)return;e.preventDefault();card.classList.add('drag-over');e.dataTransfer.dropEffect='move';};
      card.ondragleave=e=>{if(!card.contains(e.relatedTarget))card.classList.remove('drag-over');};
      card.ondrop=e=>{
        e.preventDefault();card.classList.remove('drag-over');if(!dragState)return;
        if(dragState.type==='slot')moveOrSwapSlot(dragState.team,dragState.key,fieldTeam,key);
        else if(dragState.type==='pool')setPlayerInSlot(fieldTeam,key,dragState.name);
        dragState=null;
      };
    });
    hydratePhotos(el);
  }
  function renderFieldsOnly(){renderField('afl','#best23Field');renderField('vfl','#vflBest23Field');}

  function delistPlayer(name){
    if(!name)return;
    removeNameEverywhere(name);delistedSet().add(name);activeTarget=null;render();toast(`${name} delisted from ${club(clubId).name}`);
  }
  function restorePlayer(name){delistedSet().delete(name);render();toast(`${name} restored to ${club(clubId).name} squad`);}

  function renderPool(){
    const el=$('#best23Pool');if(!el)return;
    const q=($('#best23Search')?.value||'').toLowerCase().trim();
    const selected=selectedNames();
    const list=allPlayers().filter(p=>!selected.has(p.name)).filter(p=>(`${p.name} ${p.position} ${p.source}`).toLowerCase().includes(q));
    const gone=[...delistedSet()].map(name=>rawAllPlayers().find(p=>p.name===name)||{name,position:'',source:'Club list'}).sort((a,b)=>a.name.localeCompare(b.name));
    const targetText=activeTarget?`${activeTarget.team.toUpperCase()} ${groups.flatMap(g=>g.slots).find(([k])=>k===activeTarget.key)?.[1]||activeTarget.key}`:'a field position';
    el.innerHTML=`<div class="pool-drop-hint">ONLY UNSELECTED PLAYERS APPEAR HERE • ${selected.size} CURRENTLY PLACED • CLICK A PLAYER TO SEND THEM TO ${esc(targetText)}</div>`+
      list.map(p=>`<div class="squad-row ${p.source!=='Club list'?'hypothetical-row':''}" data-pool-player="${esc(p.name)}" draggable="true"><div class="squad-player-main">${photoImg(p.name,'squad-player-photo')}<div><div class="squad-name">${esc(p.name)}</div><div class="squad-status">${p.position?`${esc(p.position)} • `:''}${esc(p.source)}</div></div></div><div class="squad-actions"><button class="squad-delist" data-delist-player="${esc(p.name)}">DELIST</button></div></div>`).join('')+
      (!list.length?'<div class="empty-log">No unselected players match that search.</div>':'')+
      (gone.length?`<div class="delisted-block"><div class="delisted-title">DELISTED PLAYERS <span>${gone.length}</span></div>${gone.map(p=>`<div class="squad-row delisted-row"><div class="squad-player-main">${photoImg(p.name,'squad-player-photo')}<div><div class="squad-name">${esc(p.name)}</div><div class="squad-status">Removed from active squad</div></div></div><button class="squad-restore" data-restore-player="${esc(p.name)}">RESTORE</button></div>`).join('')}</div>`:'');
    el.querySelectorAll('[data-delist-player]').forEach(b=>b.onclick=e=>{e.stopPropagation();delistPlayer(b.dataset.delistPlayer);});
    el.querySelectorAll('[data-restore-player]').forEach(b=>b.onclick=e=>{e.stopPropagation();restorePlayer(b.dataset.restorePlayer);});
    el.querySelectorAll('[data-pool-player]').forEach(row=>{
      const name=row.dataset.poolPlayer;
      row.onclick=e=>{if(e.target.closest('button'))return;if(activeTarget)setPlayerInSlot(activeTarget.team,activeTarget.key,name);else toast('Select an AFL or VFL field position first, or drag the player onto a field');};
      row.ondragstart=e=>{dragState={type:'pool',name};e.dataTransfer.effectAllowed='copyMove';e.dataTransfer.setData('text/plain',name);requestAnimationFrame(()=>row.classList.add('dragging'));};
      row.ondragend=()=>{dragState=null;document.querySelectorAll('.dragging,.drag-over').forEach(x=>x.classList.remove('dragging','drag-over'));};
    });
    el.ondragover=e=>{if(dragState?.type==='slot'){e.preventDefault();el.classList.add('drag-over');}};
    el.ondragleave=e=>{if(!el.contains(e.relatedTarget))el.classList.remove('drag-over');};
    el.ondrop=e=>{e.preventDefault();el.classList.remove('drag-over');if(dragState?.type==='slot')removeFromSlot(dragState.team,dragState.key);dragState=null;};
    hydratePhotos(el);
  }

  function openModal(html){const m=$('#draftModal'),c=$('#draftModalCard');if(!m||!c)return;c.innerHTML=html;m.hidden=false;}
  function closeModal(){const m=$('#draftModal'),c=$('#draftModalCard');if(m)m.hidden=true;if(c)c.innerHTML='';}
  function addCustomPlayer(){
    openModal(`<div class="modal-kicker">TEAM BUILDER ASSUMPTION</div><h3>Add a player to ${esc(club(clubId).name)}</h3><p>Add someone who is not on the current list so you can model a trade, draft or other hypothetical.</p><label class="modal-label">PLAYER NAME</label><input id="customPlayerName" class="modal-input" placeholder="Player name"><label class="modal-label">POSITION / ROLE</label><input id="customPlayerPosition" class="modal-input" placeholder="e.g. Key forward, midfielder"><label class="modal-label">ASSUMPTION SOURCE</label><select id="customPlayerSource" class="modal-select"><option>Trade assumption</option><option>Draft assumption</option><option>Custom assumption</option></select><div class="modal-actions"><button id="cancelCustomPlayer" class="ghost-btn">CANCEL</button><button id="saveCustomPlayer" class="primary-btn">ADD PLAYER</button></div>`);
    $('#cancelCustomPlayer').onclick=closeModal;
    $('#saveCustomPlayer').onclick=()=>{const name=$('#customPlayerName').value.trim(),position=$('#customPlayerPosition').value.trim(),source=$('#customPlayerSource').value;if(!name)return toast('Enter a player name');if(rawAllPlayers().some(p=>p.name.toLowerCase()===name.toLowerCase()))return toast(`${name} is already in the squad`);customList().push({name,position,source});closeModal();render();toast(`${name} added to ${club(clubId).name}`);};
  }
  function importTradePlayers(){
    const incoming=window.TradeMachine?.getIncomingPlayers?.(clubId)||[];if(!incoming.length)return toast(`No incoming traded players for ${club(clubId).name}`);
    let added=0;incoming.forEach(a=>{if(!rawAllPlayers().some(p=>p.name===a.name)){customList().push({name:a.name,position:'',source:'Trade assumption'});added++;}});render();toast(added?`${added} traded player${added!==1?'s':''} added to squad pool`:'Those incoming players are already available');
  }
  function addDraftProspect(){
    const names=window.ATM_MY_MOCK?.pool||[],profiles=window.ATM_PLAYER_PROFILES||{};const prospects=names.map(name=>({name,position:profiles[name]?.position||''}));if(!prospects.length)return toast('My draft prospect data unavailable');
    openModal(`<div class="modal-kicker">DRAFT ASSUMPTION</div><h3>Add a 2026 draft prospect</h3><p>Select a prospect to add to ${esc(club(clubId).name)} for a hypothetical AFL or VFL 23.</p><label class="modal-label">PROSPECT</label><select id="draftAssumptionPlayer" class="modal-select">${prospects.map(p=>`<option value="${esc(p.name)}">${esc(p.name)} • ${esc(p.position)}</option>`).join('')}</select><div class="modal-actions"><button id="cancelDraftAssumption" class="ghost-btn">CANCEL</button><button id="saveDraftAssumption" class="primary-btn">ADD PROSPECT</button></div>`);
    $('#cancelDraftAssumption').onclick=closeModal;
    $('#saveDraftAssumption').onclick=()=>{const name=$('#draftAssumptionPlayer').value,p=prospects.find(x=>x.name===name);if(rawAllPlayers().some(x=>x.name===name))return toast(`${name} is already available`);customList().push({name,position:p?.position||'',source:'Draft assumption'});closeModal();render();toast(`${name} added as a draft assumption`);};
  }
  function copyTeam(){
    const c=club(clubId),lines=[];
    for(const team of ['afl','vfl']){lines.push(`${team==='afl'?'AFL BEST 23':'VFL / RESERVES BEST 23'}`);groups.forEach(g=>lines.push(`${g.label}: ${g.slots.map(([k])=>lineup(team)[k]||'—').join(', ')}`));lines.push('');}
    const selected=selectedNames(),assumptions=customList().filter(p=>selected.has(p.name));if(assumptions.length)lines.push(`ASSUMPTIONS: ${assumptions.map(p=>`${p.name} (${p.source})`).join(', ')}`);
    const text=`${c.name} Team Builder\n${lines.join('\n')}`;if(navigator.clipboard?.writeText)navigator.clipboard.writeText(text).then(()=>toast('AFL + VFL teams copied')).catch(()=>toast('Copy unavailable'));else toast('Copy unavailable');
  }
  function clearTeam(team){clubTeams()[team]=blank();activeTarget=null;render();toast(`${club(clubId).name} ${team==='afl'?'AFL':'VFL'} 23 cleared`);}
  function clearAll(){teams[clubId]={afl:blank(),vfl:blank()};activeTarget=null;render();toast(`${club(clubId).name} AFL and VFL teams cleared`);}
  function render(){renderClubOptions();renderIdentity();renderFieldsOnly();renderPool();}
  function init(){
    $('#best23Search')&&($('#best23Search').oninput=renderPool);
    $('#copyBest23Btn')&&($('#copyBest23Btn').onclick=copyTeam);
    $('#resetBest23Btn')&&($('#resetBest23Btn').onclick=()=>clearTeam('afl'));
    $('#resetVfl23Btn')&&($('#resetVfl23Btn').onclick=()=>clearTeam('vfl'));
    $('#resetAll23Btn')&&($('#resetAll23Btn').onclick=clearAll);
    $('#addBest23PlayerBtn')&&($('#addBest23PlayerBtn').onclick=addCustomPlayer);
    $('#importTradePlayersBtn')&&($('#importTradePlayersBtn').onclick=importTradePlayers);
    $('#addDraftProspectBtn')&&($('#addDraftProspectBtn').onclick=addDraftProspect);
    render();
  }
  window.Best23={render,clear:clearAll};
  init();
})();

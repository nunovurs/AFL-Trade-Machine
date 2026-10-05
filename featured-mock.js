(() => {
  const D=window.ATM_DATA,P=window.ATM_PLAYER_PROFILES||{}; if(!D?.clubs||!window.ATM_MY_MOCK)return;
  const M=window.ATM_MY_MOCK;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const DVI=[0,3000,2481,2178,1962,1795,1659,1543,1443,1355,1276,1205,1140,1080,1024,973,924,879,836,796,757,721,686,653,621,590,561,533,505,479,454,429,405,382,360,338,317,297,277,257,238];
  const dvi=n=>DVI[Number(n)]??0;
  const club=id=>D.clubs.find(c=>c.id===id);
  const toast=msg=>window.ATMToast?window.ATMToast(msg):alert(msg);
  let rowOverrides={},profileOverrides={},loaded=false,dragPick=null;

  const resolve=n=>M.resolve?.(n)||n;
  const eventsAfter=pick=>(M.events||[]).filter(e=>Number(e.afterPick)===Number(pick));
  const mergedRow=r=>{
    const o=rowOverrides[Number(r.pick)]||{},out={...r,...o};
    if(Object.prototype.hasOwnProperty.call(o,'player'))out.placeholder=!o.player;
    return out;
  };
  const mergedProfile=name=>({...P[resolve(name)],...(profileOverrides[resolve(name)]||profileOverrides[name]||{})});

  async function loadOverrides(){
    if(!window.ATMCloud?.loadMockOverrides){loaded=true;return;}
    const data=await window.ATMCloud.loadMockOverrides();
    rowOverrides=Object.fromEntries((data.rows||[]).map(r=>{
      const o={};
      if(r.club_id!=null)o.clubId=r.club_id;
      if(Object.prototype.hasOwnProperty.call(r,'player'))o.player=r.player;
      if(r.path!=null)o.path=r.path;
      if(r.mechanism!=null)o.mechanism=r.mechanism;
      return [Number(r.pick),o];
    }));
    const staleShift=
      rowOverrides[16]?.player==='Jake Eime' &&
      rowOverrides[17]?.player==null &&
      rowOverrides[18]?.player==null &&
      rowOverrides[19]?.player==null &&
      rowOverrides[20]?.player==='Harrison Chapman';
    if(staleShift){
      for(let pick=16;pick<=43;pick++)delete rowOverrides[pick];
      console.warn('Ignored stale mock reorder overrides from previous player-only drag implementation');
    }
    profileOverrides=Object.fromEntries((data.profiles||[]).map(p=>[p.player,{
      comparison:p.comparison??undefined,why:p.why??undefined,description:p.description??undefined,
      position:p.position??undefined,pathway:p.pathway??undefined
    }]));
    loaded=true;
  }

  function eventRow(e){
    const c=club(e.clubId);
    if(e.payment){
      const pay=e.payment;
      const assets=(pay.assets||[]).map(a=>{
        const cls=a.status==='ABSORBED'?'absorbed':a.status==='MOVED_TO_BID'?'moved':a.status==='RESIDUAL'?'residual':'provisional';
        return '<div class="bid-payment-asset '+cls+'"><div class="payment-status">'+esc(a.statusLabel||a.status||'PAYMENT')+'</div><div class="payment-asset-main"><strong>'+esc(a.label||'Draft pick')+'</strong><span>'+esc(a.origin||'')+'</span></div><div class="payment-live"><small>LIVE AT MATCH</small><strong>'+esc(a.liveAtMatch||'TBC')+'</strong></div><div class="payment-points"><small>DVI USED</small><strong>'+(a.points==null?'TBC':esc(a.points)+' pts')+'</strong></div></div>';
      }).join('');
      const required=pay.required==null?'TBC':esc(pay.required)+' pts',supplied=pay.total==null?'TBC':esc(pay.total)+' pts',surplus=pay.deficit==null?'TBC':esc(pay.deficit)+' pts';
      return '<article class="my-mock-row bid-payment-row" style="--club:'+(c?.color||'#8995a1')+';--clubText:'+(c?.clubText||'#fff')+'"><div class="mock-pick-no payment-marker">↳</div><div class="bid-payment-copy"><div class="bid-payment-head"><div><strong>'+esc(e.title||'BID PAYMENT')+'</strong><p>'+esc(e.detail||'')+'</p></div><span class="bid-paid-chip">PICK '+esc(pay.bidPick||'—')+' BID • '+esc(pay.bidValue||'—')+' DVI</span></div><div class="bid-payment-assets">'+assets+'</div><div class="bid-payment-totals"><span><small>REQUIRED</small><strong>'+required+'</strong></span><span><small>SUPPLIED</small><strong>'+supplied+'</strong></span><span><small>RESIDUAL VALUE</small><strong>'+surplus+'</strong></span><span class="payment-rule-note">'+esc(pay.rule||'')+'</span></div></div></article>';
    }
    return '<article class="my-mock-row mock-mechanics-row" style="--club:'+(c?.color||'#8995a1')+';--clubText:'+(c?.clubText||'#fff')+'"><div class="mock-pick-no mechanics-marker">↳</div><div class="mock-mechanics-copy"><strong>'+esc(e.title||'PICK MECHANICS')+'</strong><p>'+esc(e.detail||'')+'</p></div></article>';
  }

  function playerRow(base){
    const r=mergedRow(base);
    if(r.placeholder||!r.player){
      const admin=!!window.ATMCloud?.isAdmin;
      return '<article class="my-mock-row mock-tbd-row '+(admin?'mock-admin-drop':'')+'" data-mock-row="'+r.pick+'"><div class="mock-pick-no">'+r.pick+'</div><div class="mock-tbd-copy"><strong>PICK '+r.pick+' — '+(admin?'DROP A PLAYER HERE':'TO BE ADDED')+'</strong><span>'+esc(r.path||'Club / selection TBC')+'</span><p>'+esc(r.mechanism||'')+'</p></div></article>';
    }
    const p=mergedProfile(r.player)||{},c=club(r.clubId),clubLabel=r.path||c?.name||r.note||'Club TBC',clubColor=c?.color||'#657281',clubText=c?.clubText||'#fff';
    const admin=!!window.ATMCloud?.isAdmin;
    return '<article class="my-mock-row '+(admin?'mock-admin-drop':'')+'" data-mock-row="'+r.pick+'" '+(admin?'draggable="true" data-drag-mock="'+r.pick+'" title="Drag this entire club + player selection to another pick"':'')+' style="--club:'+clubColor+';--clubText:'+clubText+'">'+
      '<div class="mock-pick-no"><strong>'+r.pick+'</strong><small>'+dvi(r.pick)+' pts</small></div>'+
      '<div class="mock-club-band">'+(c?'<img src="'+esc(c.logo)+'" alt="">':'')+'<span>'+esc(clubLabel)+'</span></div>'+
      '<button class="mock-player-summary" data-profile="'+esc(r.player)+'" data-club="'+esc(r.clubId||'')+'" data-pick="'+r.pick+'"><img draggable="false" src="'+esc(p.photo||'assets/player-placeholder.svg')+'" onerror="this.src=\'assets/player-placeholder.svg\'" alt="'+esc(r.player)+'"><span><strong>'+esc(r.player)+'</strong><small>'+esc(p.position||'')+' • '+esc(p.pathway||r.note||'')+'</small></span></button>'+
      '<div class="mock-comparison"><span>PLAYER COMPARISON</span><strong>'+esc(p.comparison||'—')+'</strong></div>'+
      '<div class="mock-why"><span>WHY THIS PICK?</span><p>'+esc(p.why||r.note||'')+'</p></div>'+
      '<div class="mock-mechanism"><span>HOW THE PICK HAPPENS</span><p>'+esc(r.mechanism||r.note||'Direct selection')+'</p></div>'+
      '<div class="mock-row-actions"><button class="profile-link-btn" data-profile="'+esc(r.player)+'" data-club="'+esc(r.clubId||'')+'" data-pick="'+r.pick+'">VIEW FULL PROFILE</button>'+(admin?'<button class="ghost-btn mock-admin-edit" data-edit-mock="'+r.pick+'">EDIT PICK</button>':'')+'</div></article>';
  }


  function renderAssetLedger(){
    const ledger=M.assetLedger;if(!ledger?.rows?.length)return '';
    const assumptions=(ledger.assumptions||[]).map(x=>'<li>'+esc(x)+'</li>').join('');
    const rows=ledger.rows.map(r=>{
      const c=club(r.clubId),cls=String(r.status||'LIVE').toLowerCase().replace(/\s+/g,'-');
      return '<div class="mock-asset-row '+cls+'"><div class="mock-asset-pick">'+esc(r.pick)+'</div><div class="mock-asset-club">'+(c?'<img src="'+esc(c.logo)+'" alt="">':'')+'<strong>'+esc(c?.abbr||r.clubId||'—')+'</strong></div><div class="mock-asset-origin"><strong>'+esc(r.origin||'')+'</strong><span>'+esc(r.detail||'')+'</span></div><div class="mock-asset-status">'+esc(r.status||'LIVE')+'</div></div>';
    }).join('');
    return '<details class="mock-asset-ledger"><summary><span><strong>DRAFT ASSET LEDGER</strong><small>All starting selections and compensation assets are shown, including picks later consumed by bids.</small></span><b>1–40</b></summary><div class="mock-ledger-assumptions"><strong>CURRENT MOCK ASSUMPTIONS</strong><ul>'+assumptions+'</ul></div><div class="mock-asset-head"><span>PICK</span><span>CLUB</span><span>ASSET / WHAT HAPPENS</span><span>STATUS</span></div><div class="mock-asset-rows">'+rows+'</div></details>';
  }

  async function reorderSelections(fromPick,toPick){
    if(!window.ATMCloud?.isAdmin||Number(fromPick)===Number(toPick))return;
    const rows=M.board.map(mergedRow).sort((a,b)=>Number(a.pick)-Number(b.pick));
    const from=rows.findIndex(r=>Number(r.pick)===Number(fromPick)),to=rows.findIndex(r=>Number(r.pick)===Number(toPick));
    if(from<0||to<0)return;
    const selections=rows.map(r=>r.player?{
      club_id:r.clubId||null,
      player:r.player,
      path:r.path||null,
      mechanism:r.mechanism||null
    }:null);
    const moved=selections.splice(from,1)[0];
    if(!moved)return;
    selections.splice(to,0,moved);
    const payload=rows.map((slot,i)=>({
      pick:slot.pick,
      club_id:selections[i]?.club_id??null,
      player:selections[i]?.player??null,
      path:selections[i]?.path??null,
      mechanism:selections[i]?.mechanism??null
    }));
    const res=await window.ATMCloud.saveMockPlayerOrder(payload);
    if(res?.error)return toast(res.error.message||'Unable to reorder mock');
    loaded=false;await loadOverrides();await render();
    const movedClub=club(moved.club_id);
    toast((movedClub?.name?movedClub.name+' — ':'')+moved.player+' moved to Pick '+toPick+' • whole selection published globally');
  }

  function openEditor(pick){
    if(!window.ATMCloud?.isAdmin)return;
    const base=M.board.find(r=>Number(r.pick)===Number(pick));if(!base)return;
    const r=mergedRow(base),p=mergedProfile(r.player)||{};
    const modal=document.querySelector('#draftModal'),card=document.querySelector('#draftModalCard');if(!modal||!card)return;
    const clubOpts=D.clubs.slice().sort((a,b)=>a.name.localeCompare(b.name)).map(c=>'<option value="'+esc(c.id)+'" '+(c.id===r.clubId?'selected':'')+'>'+esc(c.name)+'</option>').join('');
    const players=[...new Set([...(M.pool||[]),...Object.keys(P),r.player])].sort((a,b)=>a.localeCompare(b)).map(n=>'<option value="'+esc(n)+'" '+(n===r.player?'selected':'')+'>'+esc(n)+'</option>').join('');
    card.innerHTML='<div class="modal-kicker">SITE ADMIN • PUBLISHED MOCK</div><h3>Edit Pick '+pick+'</h3>'+
      '<div class="mock-admin-form"><label><span>PLAYER</span><select id="mockEditPlayer" class="modal-select">'+players+'</select></label>'+
      '<label><span>CLUB</span><select id="mockEditClub" class="modal-select">'+clubOpts+'</select></label>'+
      '<label class="wide"><span>PICK / TRADE PATH</span><input id="mockEditPath" class="modal-input" value="'+esc(r.path||'')+'"></label>'+
      '<label class="wide"><span>HOW THE PICK HAPPENS</span><textarea id="mockEditMechanism" class="modal-input mock-admin-textarea">'+esc(r.mechanism||'')+'</textarea></label>'+
      '<label class="wide"><span>WHY THIS PICK?</span><textarea id="mockEditWhy" class="modal-input mock-admin-textarea">'+esc(p.why||'')+'</textarea></label>'+
      '<label><span>PLAYER COMPARISON</span><input id="mockEditComparison" class="modal-input" value="'+esc(p.comparison||'')+'"></label>'+
      '<label><span>POSITION</span><input id="mockEditPosition" class="modal-input" value="'+esc(p.position||'')+'"></label>'+
      '<label class="wide"><span>PATHWAY / CLUB</span><input id="mockEditPathway" class="modal-input" value="'+esc(p.pathway||'')+'"></label>'+
      '<label class="wide"><span>MY SCOUTING PROFILE</span><textarea id="mockEditDescription" class="modal-input mock-admin-textarea">'+esc(p.description||'')+'</textarea></label></div>'+
      '<div class="modal-actions"><button id="mockEditCancel" class="ghost-btn">CANCEL</button><button id="mockEditReset" class="ghost-btn danger">RESET OVERRIDE</button><button id="mockEditSave" class="primary-btn">PUBLISH CHANGES</button></div>';
    modal.hidden=false;
    document.querySelector('#mockEditCancel').onclick=()=>{modal.hidden=true;card.innerHTML=''};
    document.querySelector('#mockEditSave').onclick=async()=>{
      const player=document.querySelector('#mockEditPlayer').value;
      const rowRes=await window.ATMCloud.saveMockRow(pick,{
        player,club_id:document.querySelector('#mockEditClub').value,
        path:document.querySelector('#mockEditPath').value.trim(),
        mechanism:document.querySelector('#mockEditMechanism').value.trim()
      });
      if(rowRes?.error)return toast(rowRes.error.message||'Unable to publish pick');
      const profRes=await window.ATMCloud.saveMockProfile(player,{
        why:document.querySelector('#mockEditWhy').value.trim(),
        comparison:document.querySelector('#mockEditComparison').value.trim(),
        description:document.querySelector('#mockEditDescription').value.trim(),
        position:document.querySelector('#mockEditPosition').value.trim(),
        pathway:document.querySelector('#mockEditPathway').value.trim()
      });
      if(profRes?.error)return toast(profRes.error.message||'Unable to publish profile');
      modal.hidden=true;card.innerHTML='';await loadOverrides();render();toast('Mock draft changes published globally');
    };
    document.querySelector('#mockEditReset').onclick=async()=>{
      if(!confirm('Reset this pick to the code/default version?'))return;
      await window.ATMCloud.clearMockRow(pick);
      await window.ATMCloud.clearMockProfile(r.player);
      modal.hidden=true;card.innerHTML='';await loadOverrides();render();toast('Mock override reset');
    };
  }

  async function render(){
    const el=document.querySelector('#featuredMockList');if(!el)return;
    if(!loaded)await loadOverrides();
    const rows=[];M.board.forEach(base=>{rows.push(playerRow(base));eventsAfter(base.pick).forEach(e=>rows.push(eventRow(e)))});
    el.innerHTML='<div class="mock-audit-note"><strong>PREDICTED SELECTIONS</strong><span>This is the published mock draft. Player selections stay front and centre; the detailed absorbed/compo pick accounting is available underneath.</span>'+(window.ATMCloud?.isAdmin?'<span class="admin-badge">ADMIN • DRAG WHOLE CLUB + PLAYER CARDS TO REORDER</span>':'')+'</div><div class="my-mock-board">'+rows.join('')+'</div>'+renderAssetLedger();
    document.querySelectorAll('#featuredMockList [data-profile]').forEach(b=>b.onclick=()=>window.ATMProfiles?.open?.(b.dataset.profile,{clubId:b.dataset.club||null,pick:b.dataset.pick}));
    document.querySelectorAll('#featuredMockList [data-edit-mock]').forEach(b=>b.onclick=()=>openEditor(Number(b.dataset.editMock)));
    if(window.ATMCloud?.isAdmin){
      document.querySelectorAll('#featuredMockList [data-drag-mock]').forEach(row=>{
        row.ondragstart=e=>{
          if(e.target.closest('[data-edit-mock],.profile-link-btn')){e.preventDefault();return;}
          dragPick=Number(row.dataset.dragMock);
          e.dataTransfer.effectAllowed='move';
          e.dataTransfer.setData('text/plain',String(dragPick));
          requestAnimationFrame(()=>row.classList.add('dragging'));
        };
        row.ondragend=()=>{dragPick=null;document.querySelectorAll('#featuredMockList .dragging,#featuredMockList .drag-over').forEach(x=>x.classList.remove('dragging','drag-over'));};
      });
      document.querySelectorAll('#featuredMockList [data-mock-row]').forEach(row=>{
        row.ondragover=e=>{if(dragPick==null)return;e.preventDefault();row.classList.add('drag-over');e.dataTransfer.dropEffect='move';};
        row.ondragleave=e=>{if(!row.contains(e.relatedTarget))row.classList.remove('drag-over');};
        row.ondrop=async e=>{e.preventDefault();row.classList.remove('drag-over');const from=dragPick;dragPick=null;if(from!=null)await reorderSelections(from,Number(row.dataset.mockRow));};
      });
    }
  }

  window.FeaturedMock={render,reload:async()=>{loaded=false;await render()},getProfile:name=>mergedProfile(name),getRow:pick=>{const b=M.board.find(r=>Number(r.pick)===Number(pick));return b?mergedRow(b):null}};
  document.addEventListener('atm-auth-change',()=>{loaded=false;render()});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>render());else render();
})();
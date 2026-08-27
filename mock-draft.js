(() => {
  const DD = window.ATM_DRAFT_DATA;
  const D = window.ATM_DATA;
  if (!DD || !D) { console.error('Mock Draft data missing'); return; }

  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const clubs = [...D.clubs];
  const club = id => clubs.find(c => c.id === id);
  const dvi = pick => D.dvi?.[pick] ?? 0;
  const toast = msg => window.ATMToast ? window.ATMToast(msg) : console.log(msg);

  let state;
  const currentLadder = {fre:1,syd:2,bri:3,haw:4,gee:5,ade:6,mel:7,wbd:8,col:9,car:10,stk:11,gws:12,gcs:13,nm:14,pa:15,wce:16,ric:17,ess:18};

  function initialOrder(){
    return Object.entries(DD.ownerByPick)
      .map(([pick,owner]) => ({pick:Number(pick), owner, player:null, matched:false}))
      .sort((a,b) => a.pick-b.pick);
  }

  function reset(){
    state = {order:initialOrder(), selectedProspect:null, log:[]};
    render();
    toast('Mock draft reset');
  }

  function available(){
    const drafted = new Set(state.order.filter(x => x.player).map(x => x.player.name));
    return DD.prospects.filter(p => !drafted.has(p.name));
  }
  function onClock(){ return state.order.find(x => !x.player); }
  function ladderPos(id){ return currentLadder[id] || 10; }
  function bidMultiplier(clubId,pick){
    const pos = ladderPos(clubId);
    if (pick > 36) return 1;
    if (pick <= 18 && pos <= 2) return 1.20;
    if (pick <= 18 && pos <= 4) return 1.10;
    if (pos >= 11) return 0.90;
    return 1;
  }
  function matchCost(clubId,pick){ return Math.round(dvi(pick) * bidMultiplier(clubId,pick)); }
  function clubLivePicks(id,afterPick){
    return state.order.filter(x => !x.player && x.owner === id && x.pick > afterPick).sort((a,b) => a.pick-b.pick);
  }
  function matchPlan(tiedClub,bidPick){
    const cost = matchCost(tiedClub,bidPick);
    const eligible = clubLivePicks(tiedClub,bidPick);
    const maxPicks = bidPick <= 36 ? 2 : 1;
    const used=[];
    let points=0;
    for (const p of eligible){
      if (used.length >= maxPicks) break;
      used.push(p); points += dvi(p.pick);
      if (points >= cost) break;
    }
    const deficit = Math.max(0,cost-points);
    const hasFutureFirst = (D.picks2027?.[tiedClub]||[]).some(([round])=>round===1);
    return {cost, used, points, deficit, hasFutureFirst, canMatch: deficit===0 || (deficit <= DD.deficitCap && hasFutureFirst)};
  }
  function addLog(text){
    state.log.unshift({time:new Date().toLocaleTimeString('en-AU',{hour:'2-digit',minute:'2-digit'}), text});
  }

  function openModal(html){
    const modal=$('#draftModal'), card=$('#draftModalCard');
    if(!modal||!card) return;
    card.innerHTML=html; modal.hidden=false;
  }
  function closeModal(){
    const modal=$('#draftModal'), card=$('#draftModalCard');
    if(modal) modal.hidden=true;
    if(card) card.innerHTML='';
  }

  function selectProspect(name){
    state.selectedProspect = DD.prospects.find(p => p.name === name) || null;
    renderOnClock(); renderProspects();
    document.querySelector('.on-clock-panel')?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function usePick(){
    const oc=onClock(), prospect=state.selectedProspect;
    if(!oc) return toast('Draft complete');
    if(!prospect) return toast('Select a prospect first');
    if(prospect.tiedClub && prospect.tiedClub !== oc.owner) return handleBid(oc,prospect);
    oc.player=prospect;
    addLog(`Pick ${oc.pick}: ${club(oc.owner).name} selects ${prospect.name}.`);
    state.selectedProspect=null;
    render();
  }

  function handleBid(oc,prospect){
    const tiedClub=club(prospect.tiedClub);
    const plan=matchPlan(prospect.tiedClub,oc.pick);
    openModal(`
      <div class="modal-kicker">CLUB-TIED BID</div>
      <h3>Pick ${oc.pick}: ${esc(club(oc.owner).name)} bids on ${esc(prospect.name)}</h3>
      <p>${esc(prospect.tieType)} prospect tied to <strong>${esc(tiedClub.name)}</strong>.</p>
      <div class="bid-grid">
        <div><span>Bid value</span><strong>${dvi(oc.pick).toLocaleString()} pts</strong></div>
        <div><span>Adjusted match cost</span><strong>${plan.cost.toLocaleString()} pts</strong></div>
        <div><span>Picks used</span><strong>${plan.used.map(p=>p.pick).join(', ') || 'None'}</strong></div>
        <div><span>Deficit</span><strong>${plan.deficit.toLocaleString()} pts${plan.deficit?` • ${plan.hasFutureFirst?'future R1 held':'NO future R1'}`:''}</strong></div>
      </div>
      <p class="modal-note">Core 2026 match rules are represented. Any deficit is capped at 412 points and requires a following-year first-round pick. Loading/discount uses the current indicative finishing band; the final post-season finish can change it. Complex surplus-pick and compensation reshuffling remains an MVP approximation.</p>
      <div class="modal-actions">
        <button class="ghost-btn" id="declineBidBtn">DECLINE MATCH</button>
        <button class="primary-btn" id="matchBidBtn" ${plan.canMatch?'':'disabled'}>MATCH BID</button>
      </div>`);

    $('#declineBidBtn').onclick=()=>{
      oc.player=prospect;
      addLog(`Pick ${oc.pick}: ${club(oc.owner).name} bids on ${prospect.name}; ${tiedClub.name} declines. ${club(oc.owner).name} selects ${prospect.name}.`);
      state.selectedProspect=null; closeModal(); render();
    };
    $('#matchBidBtn').onclick=()=>matchBid(oc,prospect,plan);
  }

  function matchBid(oc,prospect,plan){
    const tied=prospect.tiedClub;
    const bidPick=oc.pick;
    const consumed = new Set(plan.used);
    const remaining = state.order.filter(item => !consumed.has(item));

    // Insert the matched player at the bid position and move the original on-clock selection back one place.
    remaining.filter(x => x.pick >= bidPick).forEach(x => x.pick += 1);
    remaining.push({pick:bidPick, owner:tied, player:prospect, matched:true});
    state.order = remaining.sort((a,b)=>a.pick-b.pick);
    // MVP reshuffle: consumed matching selections disappear and the remaining live order is compressed.
    state.order.forEach((item,index) => { item.pick = index + 1; });

    if(plan.deficit>0){
      addLog(`${club(tied).name} matches the bid on ${prospect.name}; ${plan.deficit} points are carried as an indicative future deficit.`);
    }else{
      addLog(`${club(tied).name} matches the bid on ${prospect.name} using picks ${plan.used.map(p=>p.pick).join(' and ')}.`);
    }
    state.selectedProspect=null; closeModal(); render();
  }

  function tradeOnClock(){
    const oc=onClock();
    if(!oc) return toast('Draft complete');
    const others=clubs.filter(c=>c.id!==oc.owner).sort((a,b)=>a.name.localeCompare(b.name));
    openModal(`
      <div class="modal-kicker">LIVE PICK TRADE</div>
      <h3>Trade Pick ${oc.pick}</h3>
      <p><strong>${esc(club(oc.owner).name)}</strong> currently owns the on-clock selection.</p>
      <label class="modal-label" for="draftTradeDest">TRADE PICK TO</label>
      <select id="draftTradeDest" class="modal-select">${others.map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join('')}</select>
      <p class="modal-note">This control changes the ownership of the on-clock selection. Full player/multi-pick consideration will be linked to the Trade Machine in a later integration.</p>
      <div class="modal-actions"><button id="cancelDraftTrade" class="ghost-btn">CANCEL</button><button id="confirmDraftTrade" class="primary-btn">TRADE PICK</button></div>`);
    $('#cancelDraftTrade').onclick=closeModal;
    $('#confirmDraftTrade').onclick=()=>{
      const from=oc.owner, to=$('#draftTradeDest').value;
      oc.owner=to;
      addLog(`Live trade: Pick ${oc.pick} moves from ${club(from).name} to ${club(to).name}.`);
      closeModal(); render();
    };
  }

  function renderOnClock(){
    const el=$('#onClock'); if(!el) return;
    const oc=onClock();
    if(!oc){el.innerHTML='<div class="on-clock-inner"><div class="on-clock-label">DRAFT COMPLETE</div><h2>Every available selection has been used.</h2></div>';return;}
    const p=state.selectedProspect;
    el.innerHTML=`<div class="on-clock-inner">
      <div class="on-clock-label">ON THE CLOCK</div>
      <div class="on-clock-row">
        <div><div class="on-clock-pick">PICK ${oc.pick}</div><h2>${esc(club(oc.owner).name)}</h2><div class="on-clock-meta">${dvi(oc.pick).toLocaleString()} DVI points • current owner</div></div>
        <div class="selected-prospect">
          ${p?`<span>Selected prospect</span><strong>${esc(p.name)}</strong><small>${esc(p.position)} • ${esc(p.pathway)}${p.tiedClub?` • ${esc(p.tieType)}: ${esc(club(p.tiedClub).abbr)}`:''}</small><button id="draftPlayerBtn" class="primary-btn">USE PICK ${oc.pick}</button>`:'<span>NO PROSPECT SELECTED</span><strong>Choose a player from the prospect board</strong><small>The selected player will appear here before you confirm the pick.</small>'}
        </div>
      </div>
    </div>`;
    if(p) $('#draftPlayerBtn').onclick=usePick;
  }

  function renderOrder(){
    const el=$('#draftOrder'); if(!el) return;
    const oc=onClock();
    el.innerHTML=state.order.map(x=>`<div class="draft-order-row ${x===oc?'current':''} ${x.player?'used':''}">
      <div class="draft-pick-no">${x.pick}</div>
      <div class="draft-club"><strong>${esc(club(x.owner)?.abbr||x.owner)}</strong><span>${esc(club(x.owner)?.name||'')}</span></div>
      <div class="draft-points">${dvi(x.pick).toLocaleString()} pts</div>
      <div class="draft-player">${x.player?`<strong>${esc(x.player.name)}</strong><span>${esc(x.player.position)}</span>`:'—'}</div>
      ${x.matched?'<span class="matched-badge">MATCHED BID</span>':''}
    </div>`).join('');
  }

  function renderProspects(){
    const el=$('#prospectBoard'); if(!el) return;
    const q=($('#prospectSearch')?.value||'').toLowerCase().trim();
    const list=available().filter(p=>(`${p.name} ${p.position} ${p.pathway} ${p.tieType||''}`).toLowerCase().includes(q));
    el.innerHTML=list.map(p=>`<button class="prospect-row ${state.selectedProspect?.name===p.name?'selected':''}" data-prospect="${esc(p.name)}">
      <span class="prospect-rank">${p.rank}</span>
      <span class="prospect-copy"><strong>${esc(p.name)}</strong><small>${esc(p.position)} • ${esc(p.pathway)}</small>${p.tiedClub?`<em>${esc(p.tieType)} • ${esc(club(p.tiedClub).name)}</em>`:''}</span>
      <span class="prospect-select-label">SELECT</span>
    </button>`).join('');
    document.querySelectorAll('[data-prospect]').forEach(b=>b.onclick=()=>selectProspect(b.dataset.prospect));
  }

  function renderLog(){
    const el=$('#draftLog'); if(!el) return;
    el.innerHTML=state.log.length?state.log.map(l=>`<div class="log-item"><span>${esc(l.time)}</span><p>${esc(l.text)}</p></div>`).join(''):'<div class="empty-log">Selections, club-tied bids and live pick trades will appear here.</div>';
  }

  function render(){ renderOnClock(); renderOrder(); renderProspects(); renderLog(); }
  function init(){
    state={order:initialOrder(),selectedProspect:null,log:[]};
    if($('#prospectSearch')) $('#prospectSearch').oninput=renderProspects;
    if($('#resetDraftBtn')) $('#resetDraftBtn').onclick=reset;
    if($('#draftTradePickBtn')) $('#draftTradePickBtn').onclick=tradeOnClock;
    if($('#draftModal')) $('#draftModal').onclick=e=>{ if(e.target.id==='draftModal') closeModal(); };
    render();
  }

  window.MockDraft={render,reset};
  init();
})();

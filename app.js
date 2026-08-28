(() => {
  const D = window.ATM_DATA;
  if (!D || !Array.isArray(D.clubs)) {
    console.error('ATM_DATA missing');
    return;
  }
  const clubs = [...D.clubs].sort((a,b)=>a.name.localeCompare(b.name));
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const money = n => n == null ? '' : new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0}).format(n);
  const elite = new Set(['Nick Daicos','Harley Reid','Will Ashcroft','Matt Rowell','Noah Anderson','Marcus Bontempelli','Zak Butters','Jason Horne-Francis','Chad Warner','Errol Gulden','Caleb Serong','Harry Sheezel','Sam Darcy','Max Holmes','Finn Callaghan','Jordan Dawson','Izak Rankine']);
  const stars = new Set(['Patrick Cripps','Sam Walsh','Jacob Weitering','Christian Petracca','Max Gawn','Kysaiah Pickett','Tom Green','Toby Greene','Isaac Heeney','Andrew Brayshaw','Luke Jackson','Shai Bolton','Hugh McCluggage','Josh Dunkley','Harris Andrews','Jai Newcombe','Will Day','James Sicily','Luke Davies-Uniacke','Colby McKercher','Connor Rozee','Mac Andrew','Bailey Smith','Jeremy Cameron']);

  // Contract data is deliberately conservative. Salary figures are estimates only where public reporting exists.
  const contracts = {
    'Sean Darcy': {expiry:2030, salaryLow:700000, salaryHigh:800000, salaryEstimate:750000, status:'Contracted', note:'Has spent a significant 2026 period at Peel Thunder/WAFL level despite being fit; a trade would create substantial long-term cap relief for Fremantle.', source:'Fremantle/AFL contract confirmation; salary range reported by SEN'},
    'Andrew Brayshaw': {expiry:2031,status:'Contracted',note:'Long-term Fremantle commitment.'},
    'Hayden Young': {expiry:2033,status:'Contracted',note:'Long-term Fremantle commitment.'},
    'Luke Jackson': {expiry:2029,status:'Contracted'},
    'Jye Amiss': {expiry:2029,status:'Contracted'},
    'Shai Bolton': {expiry:2029,status:'Contracted'},
    'Brennan Cox': {expiry:2030,status:'Contracted'},
    'Josh Treacy': {expiry:2030,status:'Contracted'},
    'Murphy Reid': {expiry:2029,status:'Contracted'},
    'Harry McKay': {expiry:2030,status:'Contracted'},
    'Jacob Weitering': {expiry:2031,status:'Contracted'},
    'Sam Taylor': {expiry:2032,status:'Contracted'},
    'Connor Rozee': {expiry:2032,status:'Contracted'},
    'Noah Balta': {expiry:2032,status:'Contracted'},
    'Max King': {expiry:2032,status:'Contracted'},
    'Aaron Naughton': {expiry:2032,status:'Contracted'},
    'Harry Sheezel': {expiry:2030,status:'Contracted'},
    'Mac Andrew': {expiry:2030,status:'Contracted',note:'Publicly reported deal includes a trigger that could extend beyond 2030.'}
  };

  let selected = ['fre','ric'];
  let trade = [];
  const tabs = {};

  function club(id){ return clubs.find(c=>c.id===id); }
  function playerValue(name){ return elite.has(name)?3600:stars.has(name)?2850:2200; }
  function futureIndicativeValue(round){ return ({1:1300,2:500,3:150,4:0})[round] ?? 0; }
  function roundForPick(n){ return Math.ceil(n/18); }
  function contractText(name){
    const c = contracts[name]; if(!c) return '';
    const bits=[];
    if(c.expiry) bits.push(`contract to ${c.expiry}`);
    if(c.salaryLow && c.salaryHigh) bits.push(`est. ${money(c.salaryLow)}–${money(c.salaryHigh)} p.a.`);
    else if(c.salaryEstimate) bits.push(`est. ${money(c.salaryEstimate)} p.a.`);
    return bits.join(' • ');
  }
  function playerAssets(c){
    return [...c.players].sort((a,b)=>a.localeCompare(b)).map((name,i)=>({id:`${c.id}-p-${i}`,type:'player',name,value:playerValue(name),contract:contracts[name]||null,meta:`2026 listed player${contractText(name)?` • ${contractText(name)}`:''}`}));
  }
  function originLabel(originId,ownerId){
    if(!club(originId)) return `owned by ${club(ownerId).name}`;
    return originId===ownerId?`${club(ownerId).name}'s own selection`:`originally ${club(originId).name} • owned by ${club(ownerId).name}`;
  }
  function currentPickAssets(c){
    return (D.picks2026?.[c.id]||[]).map(n=>{
      const origin=D.pickOrigin2026?.[n]||c.id, pts=D.dvi?.[n]??0, round=roundForPick(n);
      return {id:`${c.id}-2026-${n}`,type:'pick',year:2026,round,pick:n,origin,points:pts,value:pts,name:`2026 Pick ${n}`,meta:`Round ${round} • ${pts.toLocaleString()} DVI pts • ${originLabel(origin,c.id)}`};
    });
  }
  function futurePickAssets(c,year){
    const owned=year===2027?(D.picks2027?.[c.id]||[]):[1,2,3,4].map(r=>[r,c.id]);
    return owned.map(([round,origin],i)=>({id:`${c.id}-${year}-r${round}-${origin}-${i}`,type:'pick',year,round,origin,pick:null,points:null,value:futureIndicativeValue(round),name:`${year} ${club(origin)?.abbr||''} Round ${round}`,meta:`Future Round ${round} • DVI points TBD • ${originLabel(origin,c.id)}`}));
  }
  function assets(c){ return [...playerAssets(c),...currentPickAssets(c),...futurePickAssets(c,2027),...futurePickAssets(c,2028)]; }
  function toast(msg){const t=$('#toast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('show'),1800);}

  function renderPicker(){
    $('#clubPicker').innerHTML=clubs.map(c=>`<button class="club-chip ${selected.includes(c.id)?'selected':''}" style="--club:${c.color}" data-club="${c.id}"><span class="club-logo-wrap"><span class="logo-fallback">${esc(c.abbr)}</span><img class="club-logo" src="${esc(c.logo)}" alt="${esc(c.name)} logo" onerror="this.style.display='none'"></span><span class="club-chip-name">${esc(c.name)}</span></button>`).join('');
    $('#selectedCount').textContent=`${selected.length} / 4`;
    document.querySelectorAll('[data-club]').forEach(b=>b.onclick=()=>toggleClub(b.dataset.club));
  }
  function toggleClub(id){
    if(selected.includes(id)){ if(selected.length<=2)return toast('A trade needs at least two clubs'); selected=selected.filter(x=>x!==id); trade=trade.filter(t=>t.from!==id&&t.to!==id); }
    else { if(selected.length>=4)return toast('Maximum four clubs'); selected.push(id); }
    selected.sort((a,b)=>club(a).name.localeCompare(club(b).name)); renderAll();
  }
  function destinationControl(from,assetId){
    const opts=selected.filter(x=>x!==from);
    if(opts.length===1)return `<span class="destination-fixed">→ ${club(opts[0]).abbr}</span>`;
    return `<select class="asset-destination" data-destination-for="${esc(assetId)}">${opts.map(id=>`<option value="${id}">→ ${esc(club(id).abbr)}</option>`).join('')}</select>`;
  }
  function assetRow(c,a){
    const used=trade.some(t=>t.asset.id===a.id);
    const points=a.type==='pick'?(a.points==null?'<span class="points-badge tbd">PTS TBD</span>':`<span class="points-badge">${a.points.toLocaleString()} PTS</span>`):'';
    const contract=a.type==='player'&&a.contract?`<div class="contract-inline">${esc(contractText(a.name))}${a.contract.note?`<span title="${esc(a.contract.note)}">ⓘ</span>`:''}</div>`:'';
    return `<div class="asset-row" data-name="${esc((a.name+' '+a.meta).toLowerCase())}"><div class="asset-copy"><div class="asset-name">${esc(a.name)} ${points}</div><div class="asset-meta">${esc(a.meta)}</div>${contract}</div><div class="asset-actions">${destinationControl(c.id,a.id)}<button class="asset-add" data-team="${c.id}" data-asset="${esc(a.id)}" ${used?'disabled':''}>ADD</button></div></div>`;
  }
  function movementColumn(title,items,direction){
    return `<div class="movement-col"><div class="outgoing-title">${title}</div>${items.length?items.map(t=>`<div class="trade-item"><div class="trade-item-main"><div class="name">${esc(t.asset.name)}</div><div class="route">${direction==='in'?`from ${esc(club(t.from).name)}`:`to ${esc(club(t.to).name)}`}</div>${t.asset.contract?`<div class="trade-contract">${esc(contractText(t.asset.name))}</div>`:''}</div><button class="trade-remove" data-uid="${t.uid}">×</button></div>`).join(''):'<div class="empty-mini">Nothing yet.</div>'}</div>`;
  }
  function teamCard(c){
    const tab=tabs[c.id]||'players'; tabs[c.id]=tab;
    const list=assets(c).filter(a=>tab==='players'?a.type==='player':a.type==='pick');
    const outgoing=trade.filter(t=>t.from===c.id), incoming=trade.filter(t=>t.to===c.id);
    const first=currentPickAssets(c).find(p=>p.round===1);
    return `<article class="team-card" style="--club:${c.color};--clubText:${c.clubText||'#fff'}"><div class="team-card-head"><div class="team-title"><div class="team-logo-box"><span class="logo-fallback">${esc(c.abbr)}</span><img class="team-logo" src="${esc(c.logo)}" alt="${esc(c.name)} logo" onerror="this.style.display='none'"></div><div><div class="team-name">${esc(c.name)}</div><div class="team-rank">${first?`Current 2026 R1: Pick ${first.pick} • ${first.points.toLocaleString()} pts`:'No 2026 first-round pick currently owned'}</div></div></div>${selected.length>2?`<button class="remove-team" data-remove-team="${c.id}">×</button>`:''}</div><div class="team-tabs"><button class="team-tab ${tab==='players'?'active':''}" data-team="${c.id}" data-tab="players">PLAYERS</button><button class="team-tab ${tab==='picks'?'active':''}" data-team="${c.id}" data-tab="picks">DRAFT PICKS</button></div><div class="asset-tools"><input class="asset-search" data-team="${c.id}" placeholder="Search ${tab==='players'?'players':'2026 / 2027 / 2028 picks'}…"></div><div class="asset-list">${list.map(a=>assetRow(c,a)).join('')}</div><div class="movement-grid">${movementColumn('Incoming',incoming,'in')}${movementColumn('Outgoing',outgoing,'out')}</div></article>`;
  }
  function renderBoard(){
    const board=$('#tradeBoard'); board.className=`trade-board cols-${selected.length}`; board.innerHTML=selected.map(id=>teamCard(club(id))).join('');
    document.querySelectorAll('.team-tab').forEach(b=>b.onclick=()=>{tabs[b.dataset.team]=b.dataset.tab;renderBoard();});
    document.querySelectorAll('.asset-search').forEach(i=>i.oninput=()=>{const q=i.value.toLowerCase().trim();i.closest('.team-card').querySelectorAll('.asset-row').forEach(r=>r.style.display=r.dataset.name.includes(q)?'grid':'none');});
    document.querySelectorAll('.asset-add').forEach(b=>b.onclick=()=>addAsset(b.dataset.team,b.dataset.asset));
    document.querySelectorAll('.trade-remove').forEach(b=>b.onclick=()=>{trade=trade.filter(t=>t.uid!==b.dataset.uid);renderAll();});
    document.querySelectorAll('[data-remove-team]').forEach(b=>b.onclick=()=>toggleClub(b.dataset.removeTeam));
  }
  function addAsset(from,aid){
    const opts=selected.filter(x=>x!==from); let dest=opts.length===1?opts[0]:document.querySelector(`[data-destination-for="${CSS.escape(aid)}"]`)?.value;
    if(!dest||!opts.includes(dest))return toast('Choose a participating destination club');
    const a=assets(club(from)).find(x=>x.id===aid); if(!a||trade.some(t=>t.asset.id===aid))return;
    trade.push({uid:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),from,to:dest,asset:a}); renderAll();
  }
  function renderBalance(){
    $('#balancePanel').innerHTML=selected.map(id=>{const inc=trade.filter(t=>t.to===id).reduce((s,t)=>s+t.asset.value,0),out=trade.filter(t=>t.from===id).reduce((s,t)=>s+t.asset.value,0),d=inc-out,max=Math.max(inc,out,1);const salIn=trade.filter(t=>t.to===id&&t.asset.contract?.salaryEstimate).reduce((s,t)=>s+t.asset.contract.salaryEstimate,0),salOut=trade.filter(t=>t.from===id&&t.asset.contract?.salaryEstimate).reduce((s,t)=>s+t.asset.contract.salaryEstimate,0);return `<div class="balance-row"><div><div class="balance-team">${esc(club(id).name)}</div><div class="balance-detail">Value: In ${inc.toLocaleString()} • Out ${out.toLocaleString()}${salIn||salOut?`<br>Known est. salary: In ${money(salIn)} • Out ${money(salOut)}`:''}</div></div><div class="meter"><div class="meter-fill" style="width:${Math.min(100,Math.round((Math.min(inc,out)/max)*100))}%"></div></div><div class="delta ${Math.abs(d)<300?'neutral':d>0?'pos':'neg'}">${d>0?'+':''}${d.toLocaleString()}</div></div>`;}).join('')+`<div class="balance-footnote">Known 2026 picks use DVI points. Future-pick and player trade values are indicative. Salary figures are estimates only where public reporting is available.</div>`;
  }
  function listRule(c){
    const incoming=trade.filter(t=>t.to===c.id&&t.asset.type==='player').length,outgoing=trade.filter(t=>t.from===c.id&&t.asset.type==='player').length,net=incoming-outgoing,baseline=Math.min(c.players.length,c.listCap||44),cap=c.listCap||44,projected=baseline+net,over=projected>cap;
    return {s:over?'fail':'pass',t:`${c.name} list size`,x:over?`Net player movement ${net>0?'+':''}${net} projects to ${projected}/${cap}. Another list vacancy/delisting or permitted mechanism would be required.`:`Net player movement ${net>0?'+':''}${net} projects to ${projected}/${cap}. No indicative list-size overflow detected.`};
  }
  function renderRules(){
    const future=trade.filter(t=>t.asset.type==='pick'&&t.asset.year>2026).length;
    const rules=[...selected.map(id=>listRule(club(id))),{s:'warn',t:'Player consent',x:'AFL player trades require player agreement. The simulator cannot verify consent.'},{s:future?'warn':'pass',t:'Future-pick rules',x:future?'Future selections are shown by current ownership; final trading restrictions and any later swaps still require official confirmation.':'No future selections included.'},{s:'warn',t:'Contracts / salary',x:'Contract expiry is shown where verified. Salary figures are media estimates unless a club or player has publicly disclosed them.'},{s:'warn',t:'Official approval',x:'AFL approval, final list categories, contract renegotiation and other mechanisms are not automatically verified.'}];
    $('#rulesPanel').innerHTML=rules.map(r=>`<div class="rule ${r.s}"><div class="rule-icon">${r.s==='pass'?'✓':r.s==='fail'?'×':'!'}</div><div><div class="rule-title">${esc(r.t)}</div><div class="rule-text">${esc(r.x)}</div></div></div>`).join('');
  }
  function renderSummary(){
    if(!trade.length){$('#tradeSummaryText').textContent='No assets have been added yet.';$('#tradeSummary').innerHTML='';return;}
    $('#tradeSummaryText').textContent=`${trade.length} asset${trade.length!==1?'s':''} in this proposal.`;
    $('#tradeSummary').innerHTML=selected.map(id=>{const c=club(id),incoming=trade.filter(t=>t.to===id),outgoing=trade.filter(t=>t.from===id),salIn=incoming.reduce((s,t)=>s+(t.asset.contract?.salaryEstimate||0),0),salOut=outgoing.reduce((s,t)=>s+(t.asset.contract?.salaryEstimate||0),0);return `<div class="summary-club"><div class="summary-club-name">${esc(c.name)}</div><div class="summary-assets"><div class="summary-direction"><strong>IN</strong>${incoming.length?incoming.map(t=>`<span class="summary-token">${esc(t.asset.name)} <span class="summary-origin">from ${esc(club(t.from).abbr)}</span></span>`).join(''):'<span class="empty-mini">Nothing</span>'}</div><div class="summary-direction"><strong>OUT</strong>${outgoing.length?outgoing.map(t=>`<span class="summary-token">${esc(t.asset.name)} <span class="summary-origin">to ${esc(club(t.to).abbr)}</span></span>`).join(''):'<span class="empty-mini">Nothing</span>'}</div>${salIn||salOut?`<div class="salary-summary">Known estimated annual salary movement: in ${money(salIn)} • out ${money(salOut)}</div>`:''}</div></div>`;}).join('');
  }
  function tradeSignature(){
    return trade.map(t=>`${t.from}>${t.to}:${t.asset.id}`).sort().join('|');
  }
  function tradeStats(){
    return selected.map(id=>{
      const incoming=trade.filter(t=>t.to===id),outgoing=trade.filter(t=>t.from===id);
      const valueIn=incoming.reduce((s,t)=>s+t.asset.value,0),valueOut=outgoing.reduce((s,t)=>s+t.asset.value,0);
      const salaryIn=incoming.reduce((s,t)=>s+(t.asset.contract?.salaryEstimate||0),0),salaryOut=outgoing.reduce((s,t)=>s+(t.asset.contract?.salaryEstimate||0),0);
      return {id,incoming,outgoing,valueIn,valueOut,delta:valueIn-valueOut,salaryIn,salaryOut};
    });
  }
  function runTradeEvaluation(){
    if(!trade.length)return toast('Add players or picks before running the trade');
    const section=$('#tradeVerdictSection'),out=$('#tradeVerdict');if(!section||!out)return;
    const stats=tradeStats();
    const active=stats.filter(s=>s.incoming.length||s.outgoing.length);
    const inactive=stats.filter(s=>!s.incoming.length&&!s.outgoing.length);
    const scored=active.map(s=>{const base=Math.max(750,(s.valueIn+s.valueOut)/2);return {...s,pressure:Math.abs(s.delta)/base};});
    const maxPressure=Math.max(0,...scored.map(s=>s.pressure));
    const winner=[...scored].sort((a,b)=>b.delta-a.delta)[0];
    const loser=[...scored].sort((a,b)=>a.delta-b.delta)[0];
    let fairness='BALANCED',fairClass='pass',fairCopy='The indicative value coming in and going out is reasonably close across the participating clubs.';
    if(maxPressure>.45){fairness=`HEAVILY FAVOURS ${club(winner.id).abbr}`,fairClass='fail',fairCopy=`The current value model shows a large gap between what ${club(winner.id).name} receives and what it sends. ${club(loser.id).name} is giving up the most net indicative value.`;}
    else if(maxPressure>.28){fairness=`FAVOURS ${club(winner.id).abbr}`,fairClass='warn',fairCopy=`The trade is workable as a concept, but the indicative value leans toward ${club(winner.id).name}. ${club(loser.id).name} would likely want more value or a different asset mix.`;}
    else if(maxPressure>.15){fairness=`SLIGHT EDGE ${club(winner.id).abbr}`,fairClass='warn',fairCopy=`The trade is within a plausible negotiating range, with a modest indicative value edge to ${club(winner.id).name}.`;}
    const listChecks=stats.map(s=>listRule(club(s.id)));
    const listFails=listChecks.filter(r=>r.s==='fail');
    const future=trade.filter(t=>t.asset.type==='pick'&&t.asset.year>2026);
    const contracted=trade.filter(t=>t.asset.type==='player'&&t.asset.contract?.expiry);
    let compliance='NO OBVIOUS LIST-SIZE BREACH',compClass='pass',compCopy='No indicative list-cap overflow is detected from the player movements in this proposal.';
    if(listFails.length){compliance='LIST / COMPLIANCE ISSUE',compClass='fail',compCopy=listFails.map(r=>r.x).join(' ');}
    else if(future.length){compliance='RULE CHECK REQUIRED',compClass='warn',compCopy='The proposal contains future selections. The simulator can show current ownership, but the applicable future-pick trading restrictions still require official AFL confirmation.';}
    if(inactive.length){compClass=compClass==='fail'?'fail':'warn';compCopy+=` ${inactive.map(s=>club(s.id).name).join(', ')} ${inactive.length===1?'is':'are'} selected but not currently involved in an asset movement.`;}
    const teamCards=stats.map(s=>{
      const c=club(s.id),delta=s.delta,cls=Math.abs(delta)<250?'neutral':delta>0?'pos':'neg';
      const playerIn=s.incoming.filter(t=>t.asset.type==='player').length,playerOut=s.outgoing.filter(t=>t.asset.type==='player').length,pickIn=s.incoming.filter(t=>t.asset.type==='pick').length,pickOut=s.outgoing.filter(t=>t.asset.type==='pick').length;
      let note='Indicative value is close to even.';
      if(delta>250)note=`Receives about ${delta.toLocaleString()} more indicative value than it sends.`;
      if(delta<-250)note=`Sends about ${Math.abs(delta).toLocaleString()} more indicative value than it receives.`;
      return `<article class="verdict-team" style="--club:${c.color}"><div class="verdict-team-head"><img src="${esc(c.logo)}" alt="${esc(c.name)} logo"><div><strong>${esc(c.name)}</strong><span>IN ${s.valueIn.toLocaleString()} • OUT ${s.valueOut.toLocaleString()}</span></div><b class="verdict-delta ${cls}">${delta>0?'+':''}${delta.toLocaleString()}</b></div><p>${esc(note)}</p><small>${playerIn} player${playerIn!==1?'s':''} in / ${playerOut} out • ${pickIn} pick${pickIn!==1?'s':''} in / ${pickOut} out${s.salaryIn||s.salaryOut?` • known est. salary ${money(s.salaryIn)} in / ${money(s.salaryOut)} out`:''}</small></article>`;
    }).join('');
    out.innerHTML=`<div class="trade-verdict-hero"><div class="verdict-score ${fairClass}"><span>FAIRNESS</span><strong>${esc(fairness)}</strong><p>${esc(fairCopy)}</p></div><div class="verdict-score ${compClass}"><span>COMPLIANCE</span><strong>${esc(compliance)}</strong><p>${esc(compCopy)}</p></div></div><div class="verdict-team-grid">${teamCards}</div><div class="verdict-notes"><strong>WHAT THIS CHECK MEANS</strong><span>Fairness uses the site's indicative player values plus known DVI points; it is not an official AFL valuation. Player consent is still required for player trades${contracted.length?`, including ${contracted.length} contracted player${contracted.length!==1?'s':''} in this proposal`:''}. AFL approval, final list categories, salary-cap treatment and any special draft/trade rules remain subject to official confirmation.</span></div>`;
    section.hidden=false;section.dataset.signature=tradeSignature();
    section.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function syncEvaluationState(){
    const section=$('#tradeVerdictSection');if(section&&!section.hidden&&section.dataset.signature!==tradeSignature()){section.hidden=true;section.removeAttribute('data-signature');}
  }
  function renderAll(){renderPicker();renderBoard();renderBalance();renderRules();renderSummary();syncEvaluationState();}

  window.ATMToast = toast;
  window.TradeMachine = {
    render: renderAll,
    getTrade(){ return trade.map(t=>({from:t.from,to:t.to,asset:{...t.asset}})); },
    getIncomingPlayers(clubId){ return trade.filter(t=>t.to===clubId&&t.asset.type==='player').map(t=>({...t.asset,from:t.from})); },
    reset(){ trade=[]; selected=['fre','ric']; renderAll(); toast('Trade reset'); }
  };
  $('#resetBtn').onclick=()=>window.TradeMachine.reset();
  $('#runTradeBtn')&&($('#runTradeBtn').onclick=runTradeEvaluation);
  $('#closeTradeVerdictBtn')&&($('#closeTradeVerdictBtn').onclick=()=>{$('#tradeVerdictSection').hidden=true;});
  $('#shareBtn').onclick=async()=>{const text=trade.length?trade.map(t=>`${club(t.from).abbr} → ${club(t.to).abbr}: ${t.asset.name}`).join('\n'):'AFL Trade Machine';try{await navigator.clipboard.writeText(text);toast('Trade copied to clipboard');}catch{toast('Copy unavailable in this browser');}};
  if($('#ladderStatus'))$('#ladderStatus').textContent=`Draft order • ${D.updated||'2026'}`;
  renderAll();
})();

(() => {
  const D = window.ATM_DATA;
  const clubs = [...D.clubs].sort((a,b) => a.name.localeCompare(b.name));
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const elite = new Set(['Nick Daicos','Harley Reid','Will Ashcroft','Matt Rowell','Noah Anderson','Marcus Bontempelli','Zak Butters','Jason Horne-Francis','Chad Warner','Errol Gulden','Caleb Serong','Harry Sheezel','Sam Darcy','Max Holmes','Finn Callaghan','Jordan Dawson','Izak Rankine']);
  const stars = new Set(['Patrick Cripps','Sam Walsh','Jacob Weitering','Christian Petracca','Max Gawn','Kysaiah Pickett','Tom Green','Toby Greene','Isaac Heeney','Andrew Brayshaw','Luke Jackson','Shai Bolton','Hugh McCluggage','Josh Dunkley','Harris Andrews','Jai Newcombe','Will Day','James Sicily','Luke Davies-Uniacke','Colby McKercher','Connor Rozee','Mac Andrew','Bailey Smith','Jeremy Cameron']);

  let selected = ['fre','ric'];
  let trade = [];
  const tabs = {};

  function club(id){ return clubs.find(c => c.id === id); }
  function roundForPick(n){ return Math.ceil(n / 18); }
  function playerValue(name){ return elite.has(name) ? 3600 : stars.has(name) ? 2850 : 2200; }
  function futureIndicativeValue(round){ return ({1:1300,2:500,3:150,4:0})[round] ?? 0; }
  function originLabel(originId, ownerId){
    if(originId === ownerId) return `${club(ownerId).name}'s own selection`;
    return `originally ${club(originId).name} • owned by ${club(ownerId).name}`;
  }

  function playerAssets(c){
    return [...c.players].sort((a,b) => a.localeCompare(b)).map((name,i) => ({
      id:`${c.id}-p-${i}`,
      type:'player',
      name,
      value:playerValue(name),
      meta:'2026 listed player'
    }));
  }

  function currentPickAssets(c){
    return (D.picks2026[c.id] || []).map(n => {
      const origin = D.pickOrigin2026[n] || c.id;
      const pts = D.dvi[n] ?? 0;
      const round = roundForPick(n);
      return {
        id:`${c.id}-2026-${n}`,
        type:'pick',
        year:2026,
        round,
        pick:n,
        origin,
        name:`2026 Pick ${n}`,
        value:pts,
        points:pts,
        meta:`Round ${round} • ${pts > 0 ? `${pts.toLocaleString()} DVI pts` : '0 DVI pts'} • ${originLabel(origin,c.id)}`
      };
    });
  }

  function futurePickAssets(c, year){
    let owned;
    if(year === 2027) owned = D.picks2027[c.id] || [];
    else owned = [1,2,3,4].map(r => [r,c.id]);
    return owned.map(([round,origin],i) => ({
      id:`${c.id}-${year}-r${round}-${origin}-${i}`,
      type:'pick',
      year,
      round,
      origin,
      pick:null,
      points:null,
      value:futureIndicativeValue(round),
      name:`${year} ${club(origin).abbr} Round ${round}`,
      meta:`Future Round ${round} • DVI points TBD • ${originLabel(origin,c.id)}`
    }));
  }

  function assets(c){
    return [
      ...playerAssets(c),
      ...currentPickAssets(c),
      ...futurePickAssets(c,2027),
      ...futurePickAssets(c,2028)
    ];
  }

  function toast(msg){
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => t.classList.remove('show'), 1800);
  }

  function renderPicker(){
    $('#clubPicker').innerHTML = clubs.map(c => `
      <button class="club-chip ${selected.includes(c.id)?'selected':''}" style="--club:${c.color}" data-club="${c.id}" title="${esc(c.name)}">
        <span class="club-logo-wrap"><img class="club-logo" src="${esc(c.logo)}" alt="" onerror="this.style.display='none'" /></span>
        <span class="club-chip-name">${esc(c.name)}</span>
      </button>`).join('');
    $('#selectedCount').textContent = `${selected.length} / 4`;
    document.querySelectorAll('[data-club]').forEach(b => b.onclick = () => toggleClub(b.dataset.club));
  }

  function toggleClub(id){
    if(selected.includes(id)){
      if(selected.length <= 2) return toast('A trade needs at least two clubs');
      selected = selected.filter(x => x !== id);
      trade = trade.filter(t => t.from !== id && t.to !== id);
    } else {
      if(selected.length >= 4) return toast('Maximum four clubs');
      selected.push(id);
    }
    selected.sort((a,b) => club(a).name.localeCompare(club(b).name));
    renderAll();
  }

  function destinationControl(from, assetId){
    const opts = selected.filter(x => x !== from);
    if(opts.length === 1) return `<span class="destination-fixed">→ ${club(opts[0]).abbr}</span>`;
    return `<select class="asset-destination" data-destination-for="${assetId}" aria-label="Destination club">
      ${opts.map(id => `<option value="${id}">→ ${esc(club(id).abbr)}</option>`).join('')}
    </select>`;
  }

  function renderBoard(){
    const board = $('#tradeBoard');
    board.className = `trade-board cols-${selected.length}`;
    board.innerHTML = selected.map(id => teamCard(club(id))).join('');
    document.querySelectorAll('.team-tab').forEach(b => b.onclick = () => { tabs[b.dataset.team] = b.dataset.tab; renderBoard(); });
    document.querySelectorAll('.asset-search').forEach(i => i.oninput = () => filterRows(i));
    document.querySelectorAll('.asset-add').forEach(b => b.onclick = () => addAsset(b.dataset.team,b.dataset.asset));
    document.querySelectorAll('.trade-remove').forEach(b => b.onclick = () => { trade = trade.filter(t => t.uid !== b.dataset.uid); renderAll(); });
  }

  function teamCard(c){
    const tab = tabs[c.id] || 'players';
    tabs[c.id] = tab;
    const list = assets(c).filter(a => tab === 'players' ? a.type === 'player' : a.type === 'pick');
    const outgoing = trade.filter(t => t.from === c.id);
    const current2026 = currentPickAssets(c);
    const first = current2026.find(p => p.round === 1);
    return `<article class="team-card" style="--club:${c.color};--clubText:${c.clubText||'#fff'}">
      <div class="team-card-head">
        <div class="team-title">
          <div class="team-logo-box"><img class="team-logo" src="${esc(c.logo)}" alt="${esc(c.name)} logo" onerror="this.style.display='none'" /></div>
          <div>
            <div class="team-name">${esc(c.name)}</div>
            <div class="team-rank">${first ? `Current 2026 R1: Pick ${first.pick} • ${first.points.toLocaleString()} pts` : 'No 2026 first-round pick currently owned'}</div>
          </div>
        </div>
        ${selected.length>2?`<button class="remove-team" data-remove-team="${c.id}" title="Remove ${esc(c.name)}">×</button>`:''}
      </div>
      <div class="team-tabs">
        <button class="team-tab ${tab==='players'?'active':''}" data-team="${c.id}" data-tab="players">PLAYERS</button>
        <button class="team-tab ${tab==='picks'?'active':''}" data-team="${c.id}" data-tab="picks">DRAFT PICKS</button>
      </div>
      <div class="asset-tools"><input class="asset-search" data-team="${c.id}" placeholder="Search ${tab==='players'?'players':'2026 / 2027 / 2028 picks'}…"></div>
      <div class="asset-list">
        ${list.map(a => assetRow(c,a)).join('')}
      </div>
      <div class="outgoing">
        <div class="outgoing-title">Outgoing</div>
        ${outgoing.length ? outgoing.map(t => `<div class="trade-item"><div class="trade-item-main"><div class="name">${esc(t.asset.name)}</div><div class="route">to ${esc(club(t.to).name)}</div></div><button class="trade-remove" data-uid="${t.uid}">×</button></div>`).join('') : '<div class="empty-mini">Nothing outgoing yet.</div>'}
      </div>
    </article>`;
  }

  function assetRow(c,a){
    const used = trade.some(t => t.asset.id === a.id);
    const pointsBadge = a.type === 'pick' ? (a.points === null ? '<span class="points-badge tbd">PTS TBD</span>' : `<span class="points-badge">${a.points.toLocaleString()} PTS</span>`) : '';
    return `<div class="asset-row" data-name="${esc((a.name+' '+a.meta).toLowerCase())}">
      <div class="asset-copy">
        <div class="asset-name">${esc(a.name)} ${pointsBadge}</div>
        <div class="asset-meta">${esc(a.meta)}</div>
      </div>
      <div class="asset-actions">
        ${destinationControl(c.id,a.id)}
        <button class="asset-add" data-team="${c.id}" data-asset="${a.id}" ${used?'disabled':''}>ADD</button>
      </div>
    </div>`;
  }

  function filterRows(i){
    const q = i.value.toLowerCase().trim();
    i.closest('.team-card').querySelectorAll('.asset-row').forEach(r => r.style.display = r.dataset.name.includes(q) ? 'grid' : 'none');
  }

  function addAsset(from, aid){
    const opts = selected.filter(x => x !== from);
    let dest;
    if(opts.length === 1) dest = opts[0];
    else dest = document.querySelector(`[data-destination-for="${CSS.escape(aid)}"]`)?.value;
    if(!dest || !opts.includes(dest)) return toast('Choose a participating destination club');
    const a = assets(club(from)).find(x => x.id === aid);
    if(!a || trade.some(t => t.asset.id === aid)) return;
    trade.push({ uid:crypto.randomUUID ? crypto.randomUUID() : String(Date.now()+Math.random()), from, to:dest, asset:a });
    renderAll();
  }

  function renderBalance(){
    $('#balancePanel').innerHTML = selected.map(id => {
      const inc = trade.filter(t => t.to === id).reduce((s,t) => s + t.asset.value,0);
      const out = trade.filter(t => t.from === id).reduce((s,t) => s + t.asset.value,0);
      const d = inc - out, max = Math.max(inc,out,1);
      return `<div class="balance-row">
        <div><div class="balance-team">${esc(club(id).name)}</div><div class="balance-detail">Indicative value: In ${inc.toLocaleString()} • Out ${out.toLocaleString()}</div></div>
        <div class="meter"><div class="meter-fill" style="width:${Math.min(100,Math.round((Math.min(inc,out)/max)*100))}%"></div></div>
        <div class="delta ${Math.abs(d)<300?'neutral':d>0?'pos':'neg'}">${d>0?'+':''}${d.toLocaleString()}</div>
      </div>`;
    }).join('') + `<div class="balance-footnote">Known 2026 picks use current DVI points. Future-pick values in this balance are indicative only because their eventual pick number and DVI points are not yet known.</div>`;
  }

  function listRule(c){
    const incoming = trade.filter(t => t.to === c.id && t.asset.type === 'player').length;
    const outgoing = trade.filter(t => t.from === c.id && t.asset.type === 'player').length;
    const net = incoming - outgoing;
    const baseline = Math.min(c.players.length, c.listCap);
    const projected = baseline + net;
    const over = projected > c.listCap;
    const netText = net > 0 ? `+${net}` : String(net);
    return {
      s: over ? 'fail' : 'pass',
      t:`${c.name} list size`,
      x: over
        ? `Net player movement ${netText} projects to ${projected}/${c.listCap}. This trade would require another list vacancy, delisting or permitted list mechanism.`
        : `Net player movement ${netText} projects to ${projected}/${c.listCap} against the indicative maximum. No list-size overflow detected.`
    };
  }

  function renderRules(){
    const same = trade.some(t => t.from === t.to);
    const dup = new Set(trade.map(t => t.asset.id)).size !== trade.length;
    const future = trade.filter(t => t.asset.type === 'pick' && t.asset.year > 2026);
    const farFuture = future.some(t => t.asset.year === 2028);
    const rules = [
      {s:trade.length?'pass':'warn',t:'Trade structure',x:trade.length?'All selected assets move between participating clubs.':'Add at least one asset to begin.'},
      {s:same||dup?'fail':'pass',t:'Asset ownership',x:same||dup?'A duplicated or invalid asset route was detected.':'Every asset is offered only by the club that currently owns it in this dataset.'},
      ...selected.map(id => listRule(club(id))),
      {s:'warn',t:'Player consent',x:'AFL player trades require player agreement. This simulator cannot verify player consent or contract terms.'},
      {s:future.length?'warn':'pass',t:'Future-pick rules',x:future.length ? `${future.length} future selection${future.length===1?' is':'s are'} included${farFuture?', including a pick two years ahead':''}. AFL future-pick safeguards and required retained selections still need official confirmation.` : 'No future selections included.'},
      {s:'warn',t:'Official approval',x:'List categories, inactive-list replacements, contracts and AFL approval can affect legality. The list-size check is a conservative planning check, not an official determination.'}
    ];
    $('#rulesPanel').innerHTML = rules.map(r => `<div class="rule ${r.s}"><div class="rule-icon">${r.s==='pass'?'✓':r.s==='fail'?'×':'!'}</div><div><div class="rule-title">${esc(r.t)}</div><div class="rule-text">${esc(r.x)}</div></div></div>`).join('');
  }

  function renderSummary(){
    if(!trade.length){ $('#tradeSummaryText').textContent='No assets have been added yet.'; $('#tradeSummary').innerHTML=''; return; }
    $('#tradeSummaryText').textContent = `${trade.length} asset${trade.length>1?'s':''} in this proposal.`;
    $('#tradeSummary').innerHTML = selected.map(id => {
      const incoming = trade.filter(t => t.to === id);
      return `<div class="summary-club"><div class="summary-club-name">${esc(club(id).name)} receives</div><div class="summary-assets">${incoming.length ? incoming.map(t => `<span class="summary-token"><strong>+ </strong>${esc(t.asset.name)} <span class="summary-origin">from ${esc(club(t.from).abbr)}</span></span>`).join('') : '<span class="empty-mini">Nothing yet</span>'}</div></div>`;
    }).join('');
  }

  function renderAll(){
    renderPicker();
    renderBoard();
    document.querySelectorAll('[data-remove-team]').forEach(b => b.onclick = () => toggleClub(b.dataset.removeTeam));
    renderBalance();
    renderRules();
    renderSummary();
  }

  $('#resetBtn').onclick = () => { trade=[]; selected=['fre','ric']; renderAll(); toast('Trade reset'); };
  $('#shareBtn').onclick = async () => {
    const text = trade.length ? trade.map(t => `${club(t.from).abbr} → ${club(t.to).abbr}: ${t.asset.name}`).join('\n') : 'AFL Trade Machine';
    try { await navigator.clipboard.writeText(text); toast('Trade copied to clipboard'); }
    catch { toast('Copy unavailable in this browser'); }
  };
  $('#ladderStatus').textContent = `Draft order • ${D.updated}`;
  $('#ladderStatus').classList.add('live');
  renderAll();
})();

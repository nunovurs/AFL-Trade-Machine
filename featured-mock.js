(() => {
 const D=window.ATM_DATA,M=window.ATM_MY_MOCK,P=window.ATM_PLAYER_PROFILES||{}; if(!D?.clubs||!M)return;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
 const DVI=[0,3000,2481,2178,1962,1795,1659,1543,1443,1355,1276,1205,1140,1080,1024,973,924,879,836,796,757,721,686,653,621,590,561,533,505,479,454,429,405,382,360,338,317,297,277,257,238];
 const dvi=n=>DVI[Number(n)]??0;
 const club=id=>D.clubs.find(c=>c.id===id);
 const eventsAfter=pick=>(M.events||[]).filter(e=>Number(e.afterPick)===Number(pick));
 function eventRow(e){
   const c=club(e.clubId);
   if(e.payment){
     const pay=e.payment;
     const assets=(pay.assets||[]).map(a=>{
       const cls=a.status==='ABSORBED'?'absorbed':a.status==='MOVED_TO_BID'?'moved':'provisional';
       return `<div class="bid-payment-asset ${cls}">
         <div class="payment-status">${esc(a.statusLabel||a.status||'PAYMENT')}</div>
         <div class="payment-asset-main"><strong>${esc(a.label||'Draft pick')}</strong><span>${esc(a.origin||'')}</span></div>
         <div class="payment-live"><small>LIVE AT MATCH</small><strong>${esc(a.liveAtMatch||'TBC')}</strong></div>
         <div class="payment-points"><small>DVI USED</small><strong>${a.points==null?'TBC':esc(a.points)+' pts'}</strong></div>
       </div>`;
     }).join('');
     const total=pay.total==null?'TBC':`${esc(pay.total)} pts`;
     const required=pay.required==null?'TBC':`${esc(pay.required)} pts`;
     const deficit=pay.deficit==null?'TBC':`${esc(pay.deficit)} pts`;
     return `<article class="my-mock-row bid-payment-row" style="--club:${c?.color||'#8995a1'};--clubText:${c?.clubText||'#fff'}">
       <div class="mock-pick-no payment-marker">↳</div>
       <div class="bid-payment-copy">
         <div class="bid-payment-head"><div><strong>${esc(e.title||'BID PAYMENT')}</strong><p>${esc(e.detail||'')}</p></div><span class="bid-paid-chip">PICK ${esc(pay.bidPick||'—')} BID • ${esc(pay.bidValue||'—')} DVI</span></div>
         <div class="bid-payment-assets">${assets}</div>
         <div class="bid-payment-totals"><span><small>REQUIRED AFTER DISCOUNT / LOADING</small><strong>${required}</strong></span><span><small>POINTS SUPPLIED</small><strong>${total}</strong></span><span><small>DEFICIT / SURPLUS</small><strong>${deficit}</strong></span><span class="payment-rule-note">${esc(pay.rule||'')}</span></div>
       </div>
     </article>`;
   }
   return `<article class="my-mock-row mock-mechanics-row" style="--club:${c?.color||'#8995a1'};--clubText:${c?.clubText||'#fff'}"><div class="mock-pick-no mechanics-marker">↳</div><div class="mock-mechanics-copy"><strong>${esc(e.title||'PICK MECHANICS')}</strong><p>${esc(e.detail||'')}</p></div></article>`;
 }
 function playerRow(r){
   if(r.placeholder){return `<article class="my-mock-row mock-tbd-row"><div class="mock-pick-no">${r.pick}</div><div class="mock-tbd-copy"><strong>PICK ${r.pick} — TO BE ADDED</strong><span>${esc(r.path||'Club / selection TBC')}</span><p>${esc(r.mechanism||'')}</p></div></article>`;}
   const p=P[M.resolve(r.player)]||{},c=club(r.clubId); const clubLabel=r.path||c?.name||r.note||'Club TBC'; const clubColor=c?.color||'#657281',clubText=c?.clubText||'#fff';
   return `<article class="my-mock-row" style="--club:${clubColor};--clubText:${clubText}"><div class="mock-pick-no"><strong>${r.pick}</strong><small>${dvi(r.pick)} pts</small></div><div class="mock-club-band">${c?`<img src="${esc(c.logo)}" alt="">`:''}<span>${esc(clubLabel)}</span></div><button class="mock-player-summary" data-profile="${esc(r.player)}" data-club="${esc(r.clubId||'')}" data-pick="${r.pick}"><img src="${esc(p.photo||'assets/player-placeholder.svg')}" onerror="this.src='assets/player-placeholder.svg'" alt="${esc(r.player)}"><span><strong>${esc(r.player)}</strong><small>${esc(p.position||'')} • ${esc(p.pathway||r.note||'')}</small></span></button><div class="mock-comparison"><span>PLAYER COMPARISON</span><strong>${esc(p.comparison||'—')}</strong></div><div class="mock-why"><span>WHY THIS PICK?</span><p>${esc(p.why||r.note||'')}</p></div><div class="mock-mechanism"><span>HOW THE PICK HAPPENS</span><p>${esc(r.mechanism||r.note||'Direct selection')}</p></div><button class="profile-link-btn" data-profile="${esc(r.player)}" data-club="${esc(r.clubId||'')}" data-pick="${r.pick}">VIEW FULL PROFILE</button></article>`;
 }
 function render(){const el=document.querySelector('#featuredMockList');if(!el)return;
  const rows=[]; M.board.forEach(r=>{rows.push(playerRow(r));eventsAfter(r.pick).forEach(e=>rows.push(eventRow(e)));});
  el.innerHTML=`<div class="mock-audit-note"><strong>DRAFT-NIGHT VIEW</strong><span><b>Numbered rows</b> are live player selections. <b class="legend-moved">USED → BID</b> means the club's first matching pick moves up to select the tied player. <b class="legend-absorbed">ABSORBED</b> means an additional pick is spent for points and disappears from the later order. Each bid ledger shows the live pick number and DVI used at the time of the match.</span></div><div class="my-mock-board">${rows.join('')}</div>`;
  document.querySelectorAll('#featuredMockList [data-profile]').forEach(b=>b.onclick=()=>window.ATMProfiles?.open?.(b.dataset.profile,{clubId:b.dataset.club||null,pick:b.dataset.pick}));
 }
 window.FeaturedMock={render};render();
})();

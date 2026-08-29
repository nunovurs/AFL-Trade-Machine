(() => {
 const D=window.ATM_DATA,M=window.ATM_MY_MOCK,P=window.ATM_PLAYER_PROFILES||{}; if(!D?.clubs||!M)return;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
 const club=id=>D.clubs.find(c=>c.id===id);
 const eventsAfter=pick=>(M.events||[]).filter(e=>Number(e.afterPick)===Number(pick));
 function eventRow(e){const c=club(e.clubId);return `<article class="my-mock-row mock-mechanics-row" style="--club:${c?.color||'#8995a1'};--clubText:${c?.clubText||'#fff'}"><div class="mock-pick-no mechanics-marker">↳</div><div class="mock-mechanics-copy"><strong>${esc(e.title||'PICK MECHANICS')}</strong><p>${esc(e.detail||'')}</p></div></article>`;}
 function playerRow(r){
   if(r.placeholder){return `<article class="my-mock-row mock-tbd-row"><div class="mock-pick-no">${r.pick}</div><div class="mock-tbd-copy"><strong>PICK ${r.pick} — TO BE ADDED</strong><span>${esc(r.path||'Club / selection TBC')}</span><p>${esc(r.mechanism||'')}</p></div></article>`;}
   const p=P[M.resolve(r.player)]||{},c=club(r.clubId); const clubLabel=r.path||c?.name||r.note||'Club TBC'; const clubColor=c?.color||'#657281',clubText=c?.clubText||'#fff';
   return `<article class="my-mock-row" style="--club:${clubColor};--clubText:${clubText}"><div class="mock-pick-no">${r.pick}</div><div class="mock-club-band">${c?`<img src="${esc(c.logo)}" alt="">`:''}<span>${esc(clubLabel)}</span></div><button class="mock-player-summary" data-profile="${esc(r.player)}" data-club="${esc(r.clubId||'')}" data-pick="${r.pick}"><img src="${esc(p.photo||'assets/player-placeholder.svg')}" onerror="this.src='assets/player-placeholder.svg'" alt="${esc(r.player)}"><span><strong>${esc(r.player)}</strong><small>${esc(p.position||'')} • ${esc(p.pathway||r.note||'')}</small></span></button><div class="mock-comparison"><span>PLAYER COMPARISON</span><strong>${esc(p.comparison||'—')}</strong></div><div class="mock-why"><span>WHY THIS PICK?</span><p>${esc(p.why||r.note||'')}</p></div><div class="mock-mechanism"><span>HOW THE PICK HAPPENS</span><p>${esc(r.mechanism||r.note||'Direct selection')}</p></div><button class="profile-link-btn" data-profile="${esc(r.player)}" data-club="${esc(r.clubId||'')}" data-pick="${r.pick}">VIEW FULL PROFILE</button></article>`;
 }
 function render(){const el=document.querySelector('#featuredMockList');if(!el)return;
  const rows=[]; M.board.forEach(r=>{rows.push(playerRow(r));eventsAfter(r.pick).forEach(e=>rows.push(eventRow(e)));});
  el.innerHTML=`<div class="mock-audit-note"><strong>LIVE NUMBERING</strong><span>Only actual player selections receive draft numbers. Bid-payment assets remain visible as unnumbered mechanics rows.</span></div><div class="my-mock-board">${rows.join('')}</div>`;
  document.querySelectorAll('#featuredMockList [data-profile]').forEach(b=>b.onclick=()=>window.ATMProfiles?.open?.(b.dataset.profile,{clubId:b.dataset.club||null,pick:b.dataset.pick}));
 }
 window.FeaturedMock={render};render();
})();

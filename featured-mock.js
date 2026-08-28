(() => {
 const D=window.ATM_DATA,M=window.ATM_MY_MOCK,P=window.ATM_PLAYER_PROFILES||{}; if(!D?.clubs||!M)return;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
 const club=id=>D.clubs.find(c=>c.id===id);
 function render(){const el=document.querySelector('#featuredMockList');if(!el)return;
  el.innerHTML=`<div class="my-mock-board">${M.board.map(r=>{if(r.absorbed)return `<article class="my-mock-row absorbed-pick"><div class="mock-pick-no">${r.pick}</div><div class="absorbed-copy"><strong>ABSORBED SELECTION</strong><span>${esc(r.note)}</span></div></article>`;
   const p=P[M.resolve(r.player)]||{},c=club(r.clubId); const clubLabel=c?.name||r.note||'Club TBC'; const clubColor=c?.color||'#657281',clubText=c?.clubText||'#fff';
   return `<article class="my-mock-row" style="--club:${clubColor};--clubText:${clubText}"><div class="mock-pick-no">${r.pick}</div><div class="mock-club-band">${c?`<img src="${esc(c.logo)}" alt="">`:''}<span>${esc(clubLabel)}</span></div><button class="mock-player-summary" data-profile="${esc(r.player)}" data-club="${esc(r.clubId||'')}" data-pick="${r.pick}"><img src="${esc(p.photo||'assets/player-placeholder.svg')}" onerror="this.src='assets/player-placeholder.svg'" alt="${esc(r.player)}"><span><strong>${esc(r.player)}</strong><small>${esc(p.position||'')} • ${esc(p.pathway||r.note||'')}</small></span></button><div class="mock-comparison"><span>PLAYER COMPARISON</span><strong>${esc(p.comparison||'—')}</strong></div><div class="mock-why"><span>WHY THIS PICK?</span><p>${esc(p.why||r.note||'')}</p></div><button class="profile-link-btn" data-profile="${esc(r.player)}" data-club="${esc(r.clubId||'')}" data-pick="${r.pick}">VIEW FULL PROFILE</button></article>`}).join('')}</div>`;
  document.querySelectorAll('#featuredMockList [data-profile]').forEach(b=>b.onclick=()=>window.ATMProfiles?.open?.(b.dataset.profile,{clubId:b.dataset.club||null,pick:b.dataset.pick}));
 }
 window.FeaturedMock={render};render();
})();
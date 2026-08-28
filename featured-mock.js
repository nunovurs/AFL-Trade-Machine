(() => {
  const D=window.ATM_DATA,P=window.ATM_PLAYER_PROFILES||{};if(!D?.clubs)return;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const club=id=>D.clubs.find(c=>c.id===id);
  const board=[
    {pick:1,club:'pa',player:'Dougie Cochrane'},{pick:2,club:'car',player:'Cody Walker'},{pick:3,club:'ess',player:'Arki Butler'},{pick:4,club:'ric',player:'Harry Van Hattum'},{pick:5,club:'mel',player:'Ethan Drever'},
    {club:'wce',player:'Heath Mellody'},{club:'gcs',player:'Gus Teixeira'},{club:'gws',player:'Ethan Matthews'},{club:'col',player:'Mitchell Harris'},{club:'wce',player:'George Gale'},{club:'nm',player:'Jake Eime'},
    {club:'bri',player:'Caylen Murray'},{club:'wbd',player:'Khaled El Souki'},{club:'ess',player:'Leo Steed'},{club:'ric',player:'Harrison Chapman'},{club:'ade',player:'Ethan Herbert'},{club:'ade',player:'Harvie Cooke'},
    {club:'ess',player:'Tyson Bradley'},{club:'ric',player:'Toby Krasna'},{club:'ric',player:'Billy Wigmore'},{club:'wce',player:'Koby LeCras'},{club:'car',player:'Jack Pickett'},{club:'car',player:'Albert MacGowan'},
    {club:'gee',player:'Noah Williams'},{club:'haw',player:'Gabriel Patterson'},{club:'syd',player:'Lachie Burrows'},{club:'wce',player:'Garrison Kenh'},{club:'fre',player:'Benji Van Rooyen'},{club:'ade',player:'Archie Van Dyk'},{club:'ric',player:'Gus Kennedy'}
  ];
  function card(r,i){const c=club(r.club),p=P[r.player]||{};return `<article class="editorial-pick" style="--club:${c?.color||'#667085'};--clubText:${c?.clubText||'#fff'}" data-open-profile="${esc(r.player)}">
    <div class="editorial-pick-number">${r.pick?`PICK ${r.pick}`:`LOCKED SELECTION`}</div>
    <div class="editorial-card-top"><div class="editorial-player-photo"><div class="profile-photo-fallback">${esc(window.ATMProfiles?.initials?.(r.player)||r.player.slice(0,2).toUpperCase())}</div>${p.photo?`<img src="${esc(p.photo)}" alt="${esc(r.player)}">`:''}</div>
      <div><div class="editorial-club"><img src="${esc(c?.logo||'')}" alt=""><span>${esc(c?.name||'')}</span></div><h3>${esc(r.player)}</h3><p>${esc(p.position||'')} • ${esc(p.pathway||'')}</p></div></div>
    ${p.comparison&&p.comparison!=='—'?`<div class="editorial-comparison"><span>COMPARISON</span><strong>${esc(p.comparison)}</strong></div>`:''}
    <div class="editorial-section"><h4>SCOUTING PROFILE</h4><p>${esc(p.description||'')}</p></div>
    <div class="editorial-section why"><h4>WHY ${esc((c?.name||'THIS CLUB').toUpperCase())}</h4><p>${esc(p.why||'')}</p></div>
    <div class="editorial-actions"><button data-profile-btn="${esc(r.player)}">VIEW FULL PROFILE</button><a href="${esc(p.watch||'#')}" target="_blank" rel="noopener">▶ WATCH</a></div></article>`;}
  function render(){const el=document.querySelector('#featuredMockList');if(!el)return;el.innerHTML=board.map(card).join('');
    el.querySelectorAll('[data-profile-btn]').forEach(b=>b.onclick=e=>{e.stopPropagation();const r=board.find(x=>x.player===b.dataset.profileBtn);window.ATMProfiles?.open(b.dataset.profileBtn,{pick:r?.pick,clubName:club(r?.club)?.name});});
    el.querySelectorAll('[data-open-profile]').forEach(a=>a.onclick=e=>{if(e.target.closest('a,button'))return;const r=board.find(x=>x.player===a.dataset.openProfile);window.ATMProfiles?.open(a.dataset.openProfile,{pick:r?.pick,clubName:club(r?.club)?.name});});}
  window.FeaturedMock={render,board};render();
})();
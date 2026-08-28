(() => {
  const P=window.ATM_PLAYER_PROFILES||{}, D=window.ATM_DATA||{};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const club=id=>D.clubs?.find(c=>c.id===id);
  const initials=name=>name.split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase();
  function portrait(p){return `<div class="profile-portrait"><div class="profile-photo-fallback">${esc(initials(p.name))}</div>${p.photo?`<img src="${esc(p.photo)}" alt="${esc(p.name)}" onerror="this.style.display='none'">`:''}</div>`;}
  function open(name,context={}){
    const p=P[name]; if(!p)return;
    const m=document.querySelector('#draftModal'),card=document.querySelector('#draftModalCard');if(!m||!card)return;
    const tied=p.tiedClub?club(p.tiedClub):null;
    card.innerHTML=`<div class="profile-modal"><button class="profile-close" id="profileCloseBtn">×</button>
      <div class="profile-top">${portrait(p)}<div class="profile-title"><div class="modal-kicker">PLAYER PROFILE</div><h3>${esc(p.name)}</h3><p>${esc(p.position||'')} • ${esc(p.pathway||'')}</p>${context.clubName?`<div class="profile-selected-by">${context.pick?`Pick ${esc(context.pick)} • `:''}${esc(context.clubName)}</div>`:''}</div></div>
      <div class="profile-facts"><div><span>HEIGHT</span><strong>${esc(p.height||'—')}</strong></div><div><span>WEIGHT</span><strong>${esc(p.weight||'—')}</strong></div><div><span>STATE</span><strong>${esc(p.state||'—')}</strong></div><div><span>ACCESS</span><strong>${tied?`${esc(p.tieType||'Club-tied')} • ${esc(tied.name)}`:'Open draft'}</strong></div></div>
      ${p.comparison&&p.comparison!=='—'?`<div class="profile-comparison"><span>PLAYER COMPARISON</span><strong>${esc(p.comparison)}</strong>${p.ceiling?`<small>${esc(p.ceiling)}</small>`:''}</div>`:''}
      <section class="profile-copy"><h4>SCOUTING PROFILE</h4><p>${esc(p.description||'')}</p></section>
      ${p.why?`<section class="profile-copy why"><h4>WHY THIS PICK</h4><p>${esc(p.why)}</p></section>`:''}
      <a class="watch-btn" href="${esc(p.watch)}" target="_blank" rel="noopener"><span>▶</span><strong>WATCH</strong><small>Footy Stuff highlights / YouTube</small></a>
    </div>`;
    m.hidden=false; document.querySelector('#profileCloseBtn').onclick=()=>{m.hidden=true;card.innerHTML='';};
  }
  window.ATMProfiles={open,portrait,initials};
})();
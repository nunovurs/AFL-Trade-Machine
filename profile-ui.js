(() => {
 const D=window.ATM_DATA,DD=window.ATM_DRAFT_DATA,P=window.ATM_PLAYER_PROFILES||{},M=window.ATM_MY_MOCK;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
 const club=id=>D?.clubs?.find(c=>c.id===id);
 const resolve=n=>M?.resolve?.(n)||n;
 function get(name){const key=resolve(name);if(P[key])return P[key];const d=DD?.prospects?.find(x=>x.name===name||x.name===key);if(!d)return null;return {height:'—',weight:'—',position:d.position||'—',pathway:d.pathway||'—',state:'—',comparison:'—',description:'My scouting profile has not been added yet.',why:'Not selected in my published mock draft.',photo:'assets/player-placeholder.svg',watch:`https://www.youtube.com/results?search_query=${encodeURIComponent(name+' Footy Stuff')}`,tiedClub:d.tiedClub||null,tieType:d.tieType||null};}
 function close(){const m=document.querySelector('#draftModal'),c=document.querySelector('#draftModalCard');if(m)m.hidden=true;if(c)c.innerHTML='';}
 function open(name,ctx={}){
   const p=get(name);if(!p)return window.ATMToast?.(`Profile coming soon for ${name}`);
   const c=club(ctx.clubId||p.tiedClub), color=c?.color||'#172337', text=c?.clubText||'#fff';
   const tie=p.tieType?(p.tiedClub?`${p.tieType} • ${club(p.tiedClub)?.name||''}`:p.tieType):'—';
   const img=p.photo||'assets/player-placeholder.svg';
   const m=document.querySelector('#draftModal'),card=document.querySelector('#draftModalCard'); if(!m||!card)return;
   card.innerHTML=`<div class="player-profile-modal" style="--club:${esc(color)};--clubText:${esc(text)}">
    <button class="profile-close" id="profileClose" aria-label="Close">×</button>
    <div class="profile-hero"><div class="profile-photo-wrap"><img src="${esc(img)}" alt="${esc(name)}" onerror="this.src='assets/player-placeholder.svg'"></div><div class="profile-title-block"><div class="profile-kicker">${ctx.pick?`PICK ${esc(ctx.pick)} • `:''}2026 DRAFT PROFILE</div><h3>${esc(resolve(name))}</h3><div class="profile-primary">${esc(p.position)}</div>${c?`<div class="profile-club"><img src="${esc(c.logo)}" alt=""><strong>${esc(c.name)}</strong></div>`:''}</div></div>
    <div class="profile-facts"><div><span>HEIGHT</span><strong>${esc(p.height)}</strong></div><div><span>WEIGHT</span><strong>${esc(p.weight)}</strong></div><div><span>POSITION</span><strong>${esc(p.position)}</strong></div><div><span>PATHWAY / CLUB</span><strong>${esc(p.pathway)}</strong></div><div><span>STATE</span><strong>${esc(p.state)}</strong></div><div><span>ACCESS</span><strong>${esc(tie)}</strong></div></div>
    <div class="profile-section comparison"><div class="profile-section-label">PLAYER COMPARISON</div><p>${esc(p.comparison||'—')}</p></div>
    <div class="profile-section"><div class="profile-section-label">MY SCOUTING PROFILE</div><p>${esc(p.description)}</p></div>
    <div class="profile-section club-fit"><div class="profile-section-label">WHY THIS PICK?</div><p>${esc(p.why)}</p></div>
    <div class="profile-actions"><a class="watch-btn" href="${esc(p.watch)}" target="_blank" rel="noopener">▶ WATCH • FOOTY STUFF HIGHLIGHTS</a></div>
    <div class="profile-data-note">Bio fields are reference data and may change as official measurements are updated. Where a reliable published measurement or photo is unavailable, the profile deliberately uses a blank/fallback rather than inventing one.</div>
   </div>`;
   m.hidden=false;document.querySelector('#profileClose').onclick=close;
 }
 window.ATMProfiles={open,get,close,resolve};
})();
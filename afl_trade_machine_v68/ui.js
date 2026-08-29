(() => {
  const buttons=[...document.querySelectorAll('[data-mode]')];
  const panels=[...document.querySelectorAll('[data-mode-panel]')];
  const tradeActions=document.querySelector('#tradeTopActions');
  const draftViewButtons=[...document.querySelectorAll('[data-draft-view]')];

  function setDraftView(view){
    const live=document.querySelector('#liveDraftView'),featured=document.querySelector('#featuredMockView'),redraft=document.querySelector('#redraftView');
    if(live)live.hidden=view!=='live';
    if(featured)featured.hidden=view!=='featured';
    if(redraft)redraft.hidden=view!=='redraft';
    draftViewButtons.forEach(b=>b.classList.toggle('active',b.dataset.draftView===view));
    if(view==='live')window.MockDraft?.render?.();
    if(view==='featured')window.FeaturedMock?.render?.();
    if(view==='redraft')window.Redraft?.render?.();
  }
  function setMode(mode){
    panels.forEach(p=>p.hidden=p.dataset.modePanel!==mode);
    buttons.forEach(b=>{
      const active=b.dataset.mode===mode;
      b.classList.toggle('active',active);
      b.setAttribute('aria-selected',String(active));
    });
    if(tradeActions)tradeActions.style.display=mode==='trade'?'flex':'none';
    document.body.dataset.mode=mode;
    if(mode==='trade')window.TradeMachine?.render?.();
    if(mode==='draft'){window.MockDraft?.render?.();setDraftView('live');}
    if(mode==='best23')window.Best23?.render?.();
    window.scrollTo({top:0,behavior:'instant'});
  }
  buttons.forEach(b=>b.onclick=()=>setMode(b.dataset.mode));
  draftViewButtons.forEach(b=>b.onclick=()=>setDraftView(b.dataset.draftView));
  window.ATMUI={setMode,setDraftView};
  setMode('trade');
})();
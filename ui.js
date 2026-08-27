(() => {
  const buttons=[...document.querySelectorAll('[data-mode]')];
  const panels=[...document.querySelectorAll('[data-mode-panel]')];
  const tradeActions=document.querySelector('#tradeTopActions');

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
    if(mode==='draft')window.MockDraft?.render?.();
    if(mode==='best23')window.Best23?.render?.();
    window.scrollTo({top:0,behavior:'instant'});
  }

  buttons.forEach(b=>b.onclick=()=>setMode(b.dataset.mode));
  window.ATMUI={setMode};
  setMode('trade');
})();

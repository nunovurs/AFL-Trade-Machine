(() => {
  const D=window.ATM_DATA;
  if(!D?.clubs) return;
  const $=s=>document.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const toast=msg=>window.ATMToast?window.ATMToast(msg):console.log(msg);
  const clubs=[...D.clubs].sort((a,b)=>a.name.localeCompare(b.name));
  const club=id=>clubs.find(c=>c.id===id);

  const groups=[
    {label:'BACKS',slots:[['BP','Back Pocket'],['FB','Full Back'],['BP2','Back Pocket']]},
    {label:'HALF BACKS',slots:[['HBF','Half Back Flank'],['CHB','Centre Half Back'],['HBF2','Half Back Flank']]},
    {label:'CENTRES',slots:[['W','Wing'],['C','Centre'],['W2','Wing']]},
    {label:'HALF FORWARDS',slots:[['HFF','Half Forward Flank'],['CHF','Centre Half Forward'],['HFF2','Half Forward Flank']]},
    {label:'FORWARDS',slots:[['FP','Forward Pocket'],['FF','Full Forward'],['FP2','Forward Pocket']]},
    {label:'FOLLOWERS',slots:[['RUC','Ruck'],['RR','Ruck Rover'],['ROV','Rover']]},
    {label:'INTERCHANGE',interchange:true,slots:[['INT1','Interchange 1'],['INT2','Interchange 2'],['INT3','Interchange 3'],['INT4','Interchange 4'],['INT5','Interchange 5']]}
  ];
  const slotKeys=groups.flatMap(g=>g.slots.map(s=>s[0]));
  const lineups={};
  let clubId='ric';

  function blank(){return Object.fromEntries(slotKeys.map(k=>[k,'']));}
  function lineup(){return lineups[clubId] ||= blank();}
  function selectedSet(exceptKey=null){
    return new Set(Object.entries(lineup()).filter(([k,v])=>v&&k!==exceptKey).map(([,v])=>v));
  }
  function selectedCount(){return Object.values(lineup()).filter(Boolean).length;}

  function renderClubOptions(){
    const sel=$('#best23Club'); if(!sel)return;
    sel.innerHTML=clubs.map(c=>`<option value="${c.id}" ${c.id===clubId?'selected':''}>${esc(c.name)}</option>`).join('');
    sel.onchange=()=>{clubId=sel.value;render();};
  }
  function renderIdentity(){
    const c=club(clubId), el=$('#best23ClubIdentity'); if(!el)return;
    el.innerHTML=`<span class="builder-logo-box"><span class="logo-fallback">${esc(c.abbr)}</span><img src="${esc(c.logo)}" alt="${esc(c.name)} logo" onerror="this.style.display='none'"></span><span>${esc(c.name)}</span>`;
    $('#best23Count').textContent=`${selectedCount()} / 23`;
  }

  function slotOptions(key){
    const c=club(clubId), current=lineup()[key], used=selectedSet(key);
    return `<option value="">— SELECT PLAYER —</option>` + [...c.players].sort((a,b)=>a.localeCompare(b)).map(name=>`<option value="${esc(name)}" ${current===name?'selected':''} ${used.has(name)?'disabled':''}>${esc(name)}</option>`).join('');
  }

  function renderField(){
    const el=$('#best23Field'); if(!el)return;
    el.innerHTML=groups.map(g=>`<div class="field-line ${g.interchange?'interchange':''}">
      <div class="field-line-label">${esc(g.label)}</div>
      <div class="field-line-slots">${g.slots.map(([key,label])=>`<div class="position-slot">
        <div class="position-name">${esc(label)}</div>
        <select class="position-select" data-slot="${key}" aria-label="${esc(label)}">${slotOptions(key)}</select>
      </div>`).join('')}</div>
    </div>`).join('');
    document.querySelectorAll('[data-slot]').forEach(sel=>sel.onchange=()=>{
      const key=sel.dataset.slot, value=sel.value;
      if(value && selectedSet(key).has(value)){toast(`${value} is already selected`);return renderField();}
      lineup()[key]=value; render();
    });
  }

  function addToNextEmpty(name){
    if(Object.values(lineup()).includes(name)) return toast(`${name} is already in your 23`);
    const key=slotKeys.find(k=>!lineup()[k]);
    if(!key)return toast('Your Best 23 is already full');
    lineup()[key]=name; render();
  }

  function renderPool(){
    const el=$('#best23Pool'); if(!el)return;
    const q=($('#best23Search')?.value||'').toLowerCase().trim();
    const chosen=new Set(Object.values(lineup()).filter(Boolean));
    const list=[...club(clubId).players].sort((a,b)=>a.localeCompare(b)).filter(n=>n.toLowerCase().includes(q));
    el.innerHTML=list.map(name=>`<div class="squad-row ${chosen.has(name)?'selected':''}">
      <div><div class="squad-name">${esc(name)}</div><div class="squad-status">${chosen.has(name)?'Selected in Best 23':'Available'}</div></div>
      <button class="squad-add" data-add-player="${esc(name)}" ${chosen.has(name)?'disabled':''}>ADD</button>
    </div>`).join('');
    document.querySelectorAll('[data-add-player]').forEach(b=>b.onclick=()=>addToNextEmpty(b.dataset.addPlayer));
  }

  function copyTeam(){
    const c=club(clubId), lines=[];
    groups.forEach(g=>{
      lines.push(`${g.label}: ${g.slots.map(([k])=>lineup()[k]||'—').join(', ')}`);
    });
    const text=`${c.name} Best 23\n${lines.join('\n')}`;
    if(navigator.clipboard?.writeText){navigator.clipboard.writeText(text).then(()=>toast('Best 23 copied')).catch(()=>toast('Copy unavailable'));}
    else toast('Copy unavailable');
  }
  function clearTeam(){lineups[clubId]=blank();render();toast(`${club(clubId).name} team cleared`);}

  function render(){renderClubOptions();renderIdentity();renderField();renderPool();}
  function init(){
    if($('#best23Search'))$('#best23Search').oninput=renderPool;
    if($('#copyBest23Btn'))$('#copyBest23Btn').onclick=copyTeam;
    if($('#resetBest23Btn'))$('#resetBest23Btn').onclick=clearTeam;
    render();
  }
  window.Best23={render,clear:clearTeam};
  init();
})();

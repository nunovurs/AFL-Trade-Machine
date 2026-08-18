(() => {
const D=window.ATM_DATA, clubs=D.clubs;
const elite=new Set(['Nick Daicos','Harley Reid','Will Ashcroft','Matt Rowell','Noah Anderson','Marcus Bontempelli','Zak Butters','Jason Horne-Francis','Chad Warner','Errol Gulden','Caleb Serong','Harry Sheezel','Sam Darcy','Max Holmes','Finn Callaghan','Jordan Dawson','Izak Rankine']);
const stars=new Set(['Patrick Cripps','Sam Walsh','Jacob Weitering','Christian Petracca','Max Gawn','Kysaiah Pickett','Tom Green','Toby Greene','Isaac Heeney','Andrew Brayshaw','Luke Jackson','Shai Bolton','Hugh McCluggage','Josh Dunkley','Harris Andrews','Jai Newcombe','Will Day','James Sicily','Luke Davies-Uniacke','Colby McKercher','Connor Rozee','Mac Andrew','Bailey Smith','Jeremy Cameron']);
let selected=['fre','ric'], trade=[], tabs={};
const $=s=>document.querySelector(s), esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
function club(id){return clubs.find(c=>c.id===id)}
function pickNo(rank,round){return (18-rank+1)+(round-1)*18}
function pickValue(n){return Math.max(120, Math.round(3200*Math.pow(.925,n-1)))}
function playerValue(name){return elite.has(name)?3600:stars.has(name)?2850:2200}
function assets(c){return [
 ...c.players.map((name,i)=>({id:`${c.id}-p-${i}`,type:'player',name,value:playerValue(name),meta:'2026 senior list'})),
 ...[1,2,3].map(r=>{const n=pickNo(c.rank,r);return {id:`${c.id}-d-${r}`,type:'pick',name:`Projected Pick ${n}`,value:pickValue(n),meta:`${c.name}'s 2026 Round ${r} • tied to club`}})
]}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
function renderPicker(){
 $('#clubPicker').innerHTML=clubs.map(c=>`<button class="club-chip ${selected.includes(c.id)?'selected':''}" style="--club:${c.color}" data-club="${c.id}"><span class="club-dot"></span>${c.abbr}</button>`).join('');
 $('#selectedCount').textContent=`${selected.length} / 4`;
 document.querySelectorAll('[data-club]').forEach(b=>b.onclick=()=>toggleClub(b.dataset.club));
}
function toggleClub(id){if(selected.includes(id)){if(selected.length<=2)return toast('A trade needs at least two clubs'); selected=selected.filter(x=>x!==id); trade=trade.filter(t=>t.from!==id&&t.to!==id)}else{if(selected.length>=4)return toast('Maximum four clubs');selected.push(id)} renderAll()}
function renderBoard(){
 $('#tradeBoard').innerHTML=selected.map(id=>teamCard(club(id))).join('');
 document.querySelectorAll('.team-tab').forEach(b=>b.onclick=()=>{tabs[b.dataset.team]=b.dataset.tab;renderBoard()});
 document.querySelectorAll('.asset-search').forEach(i=>i.oninput=()=>filterRows(i));
 document.querySelectorAll('.asset-add').forEach(b=>b.onclick=()=>addAsset(b.dataset.team,b.dataset.asset));
 document.querySelectorAll('.trade-remove').forEach(b=>b.onclick=()=>{trade=trade.filter(t=>t.uid!==b.dataset.uid);renderAll()});
}
function teamCard(c){const tab=tabs[c.id]||'players';tabs[c.id]=tab;const list=assets(c).filter(a=>tab==='players'?a.type==='player':a.type==='pick');
 const outgoing=trade.filter(t=>t.from===c.id);
 return `<article class="team-card" style="--club:${c.color};--clubText:${c.clubText||'#fff'}"><div class="team-card-head"><div class="team-title"><div class="team-abbr">${c.abbr}</div><div><div class="team-name">${c.name}</div><div class="team-rank">Ladder #${c.rank} • projected R1 pick ${pickNo(c.rank,1)}</div></div></div>${selected.length>2?`<button class="remove-team" onclick="document.querySelector('[data-club=${c.id}]')?.click()">×</button>`:''}</div>
 <div class="team-tabs"><button class="team-tab ${tab==='players'?'active':''}" data-team="${c.id}" data-tab="players">PLAYERS</button><button class="team-tab ${tab==='picks'?'active':''}" data-team="${c.id}" data-tab="picks">DRAFT PICKS</button></div>
 <div class="asset-tools"><input class="asset-search" data-team="${c.id}" placeholder="Search ${tab}…"></div>
 <div class="asset-list">${list.map(a=>`<div class="asset-row" data-name="${esc(a.name.toLowerCase())}"><div><div class="asset-name">${esc(a.name)}</div><div class="asset-meta">${esc(a.meta)} • value ${a.value.toLocaleString()}</div></div><button class="asset-add" data-team="${c.id}" data-asset="${a.id}" ${trade.some(t=>t.asset.id===a.id)?'disabled':''}>ADD</button></div>`).join('')}</div>
 <div class="outgoing"><div class="outgoing-title">Outgoing</div>${outgoing.length?outgoing.map(t=>`<div class="trade-item"><div class="trade-item-main"><div class="name">${esc(t.asset.name)}</div><div class="route">to ${club(t.to).name}</div></div><button class="trade-remove" data-uid="${t.uid}">×</button></div>`).join(''):'<div class="empty-mini">Nothing outgoing yet.</div>'}</div></article>`}
function filterRows(i){const q=i.value.toLowerCase();i.closest('.team-card').querySelectorAll('.asset-row').forEach(r=>r.style.display=r.dataset.name.includes(q)?'grid':'none')}
function addAsset(from,aid){const opts=selected.filter(x=>x!==from);const to=opts.length===1?opts[0]:prompt(`Send to: ${opts.map(x=>club(x).abbr).join(', ')}`,'')?.trim().toLowerCase();let dest=opts.find(x=>x===to||club(x).abbr.toLowerCase()===to||club(x).name.toLowerCase()===to);if(!dest)return toast('Choose a participating destination club');const a=assets(club(from)).find(x=>x.id===aid);trade.push({uid:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),from,to:dest,asset:a});renderAll()}
function renderBalance(){
 const rows=selected.map(id=>{const inc=trade.filter(t=>t.to===id).reduce((s,t)=>s+t.asset.value,0),out=trade.filter(t=>t.from===id).reduce((s,t)=>s+t.asset.value,0),d=inc-out,max=Math.max(inc,out,1);return `<div class="balance-row"><div><div class="balance-team">${club(id).name}</div><div class="balance-detail">In ${inc.toLocaleString()} • Out ${out.toLocaleString()}</div></div><div class="meter"><div class="meter-fill" style="width:${Math.min(100,Math.round((Math.min(inc,out)/max)*100))}%"></div></div><div class="delta ${Math.abs(d)<300?'neutral':d>0?'pos':'neg'}">${d>0?'+':''}${d.toLocaleString()}</div></div>`}).join('');
 $('#balancePanel').innerHTML=rows;
}
function renderRules(){const same=trade.some(t=>t.from===t.to), dup=new Set(trade.map(t=>t.asset.id)).size!==trade.length, future=trade.filter(t=>t.asset.type==='pick').length;
 const rules=[{s:trade.length?'pass':'warn',t:'Trade structure',x:trade.length?'All assets move between participating clubs.':'Add at least one asset to begin.'},{s:same||dup?'fail':'pass',t:'Asset ownership',x:same||dup?'A duplicated or invalid asset route was detected.':'Each selected asset is owned and moved once.'},{s:'warn',t:'Player consent',x:'AFL player trades require player agreement. This simulator cannot verify consent.'},{s:future>0?'warn':'pass',t:'Future-pick rules',x:future>0?'Projected picks are tied to club and ladder position; final AFL future-pick restrictions still require official confirmation.':'No draft selections included.'},{s:'warn',t:'Official approval',x:'Indicative checker only. AFL trade approval, list spots and contract matters are not verified.'}];
 $('#rulesPanel').innerHTML=rules.map(r=>`<div class="rule ${r.s}"><div class="rule-icon">${r.s==='pass'?'✓':r.s==='fail'?'×':'!'}</div><div><div class="rule-title">${r.t}</div><div class="rule-text">${r.x}</div></div></div>`).join('')}
function renderSummary(){if(!trade.length){$('#tradeSummaryText').textContent='No assets have been added yet.';$('#tradeSummary').innerHTML='';return}$('#tradeSummaryText').textContent=`${trade.length} asset${trade.length>1?'s':''} in this proposal.`;$('#tradeSummary').innerHTML=selected.map(id=>{const incoming=trade.filter(t=>t.to===id);return `<div class="summary-club"><div class="summary-club-name">${club(id).name} receives</div><div class="summary-assets">${incoming.length?incoming.map(t=>`<span class="summary-token"><strong>+ </strong>${esc(t.asset.name)} <span style="opacity:.55">from ${club(t.from).abbr}</span></span>`).join(''):'<span class="empty-mini">Nothing yet</span>'}</div></div>`}).join('')}
function renderAll(){renderPicker();renderBoard();renderBalance();renderRules();renderSummary()}
$('#resetBtn').onclick=()=>{trade=[];selected=['fre','ric'];renderAll();toast('Trade reset')};
$('#shareBtn').onclick=async()=>{const text=trade.length?trade.map(t=>`${club(t.from).abbr} → ${club(t.to).abbr}: ${t.asset.name}`).join('\n'):'AFL Trade Machine';try{await navigator.clipboard.writeText(text);toast('Trade copied to clipboard')}catch{toast('Copy unavailable in this browser')}};
$('#ladderStatus').textContent=`Ladder projection • ${D.updated}`;$('#ladderStatus').classList.add('live');
renderAll();
})();

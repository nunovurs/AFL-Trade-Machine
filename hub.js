(function(){
  var D=window.ATM_DATA, DD=window.ATM_DRAFT_DATA, M=window.ATM_MY_MOCK;
  var DVI=[0,3000,2481,2178,1962,1795,1659,1543,1443,1355,1276,1205,1140,1080,1024,973,924,879,836,796,757,721,686,653,621,590,561,533,505,479,454,429,405,382,360,338,317,297,277,257,238];
  var natural=['ess','ric','wce','pa','nm','gcs','gws','stk','col','mel','car','wbd','ade','gee','haw','syd','fre','bri'];
  var newsItems=[], editMode=false, newsLoaded=false;
  function q(s,r){return (r||document).querySelector(s)}
  function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
  function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]})}
  function club(id){return D&&D.clubs&&D.clubs.find(function(c){return c.id===id})}
  function dvi(n){return DVI[Number(n)]||0}
  function load(key,fallback){try{return JSON.parse(localStorage.getItem(key)||'')||fallback}catch(e){return fallback}}
  function save(key,val){localStorage.setItem(key,JSON.stringify(val))}
  function toast(s){if(window.ATMToast)window.ATMToast(s)}
  function setView(view){
    qa('[data-hub-view]').forEach(function(b){b.classList.toggle('active',b.dataset.hubView===view)});
    qa('[data-hub-panel]').forEach(function(p){p.hidden=p.dataset.hubPanel!==view});
    if(view==='news')renderNews();
    if(view==='draft-order')renderDraftOrder();
    if(view==='clubs')renderClubHub();
    if(view==='ladder')renderLadder();
    if(view==='fan')renderFan();
  }
  function edits(){return load('atm-news-edits-v1',{})}
  function applyEdit(n){var e=edits()[n.id]||{};return Object.assign({},n,e)}
  async function loadNews(silent){
    try{
      var r=await fetch('/api/news',{headers:{accept:'application/json'}});
      if(!r.ok)throw new Error('news '+r.status);
      var data=await r.json(), editorial=Array.isArray(window.ATM_EDITORIAL_NEWS)?window.ATM_EDITORIAL_NEWS:[];
      var seen={}, merged=editorial.concat(data.items||[]).filter(function(n){var k=n.id||n.link||n.title;if(seen[k])return false;seen[k]=1;return true});
      if(newsLoaded && !silent && merged[0] && newsItems[0] && merged[0].id!==newsItems[0].id && 'Notification' in window && Notification.permission==='granted'){
        new Notification('AFL News & Intel',{body:merged[0].title});
      }
      newsItems=merged;newsLoaded=true;renderNews();
    }catch(e){console.warn(e);if(!silent)toast('News feed could not refresh')}
  }
  function editNews(id){
    var n=newsItems.find(function(x){return x.id===id});if(!n)return;
    var cur=applyEdit(n), title=prompt('Headline',cur.title);if(title===null)return;
    var summary=prompt('Your summary / note',cur.summary||'');if(summary===null)return;
    var tag=(prompt('Status: CONFIRMED / REPORTED / RUMOUR / ANALYSIS',cur.tag||'REPORTED')||'REPORTED').toUpperCase();
    var e=edits();e[id]=Object.assign({},e[id]||{},{title:title,summary:summary,tag:tag});save('atm-news-edits-v1',e);renderNews();
  }
  function hideNews(id){var e=edits();e[id]=Object.assign({},e[id]||{},{hidden:true});save('atm-news-edits-v1',e);renderNews()}
  function renderNews(){
    var host=q('#newsFeed');if(!host)return;
    var tag=q('#newsTagFilter')?q('#newsTagFilter').value:'ALL', cf=q('#newsClubFilter')?q('#newsClubFilter').value:'ALL';
    var rows=newsItems.map(applyEdit).filter(function(n){return !n.hidden}).filter(function(n){return tag==='ALL'||n.tag===tag}).filter(function(n){return cf==='ALL'||(n.clubs||[]).indexOf(cf)>=0}).slice(0,40);
    if(!rows.length){host.innerHTML='<div class="empty-state">No stories match those filters yet.</div>';return}
    host.innerHTML=rows.map(function(n){
      var dt=n.publishedAt?new Date(n.publishedAt).toLocaleString('en-AU',{dateStyle:'medium',timeStyle:'short'}):'';
      var chips=(n.clubs||[]).map(function(c){return '<span class="news-club-chip">'+esc(c)+'</span>'}).join('');
      var edit=editMode?'<span class="news-edit-actions"><button data-news-edit="'+esc(n.id)+'">EDIT</button><button data-news-hide="'+esc(n.id)+'">HIDE</button></span>':'';
      return '<article class="news-card"><div class="news-card-top"><span class="news-tag '+esc((n.tag||'REPORTED').toLowerCase())+'">'+esc(n.tag||'REPORTED')+'</span><span class="news-source">'+esc(n.source||n.feed||'AFL source')+'</span></div><h3>'+esc(n.title)+'</h3>'+(n.summary?'<p>'+esc(n.summary)+'</p>':'')+'<div class="news-meta"><span>'+esc(dt)+'</span>'+chips+'</div><div class="news-card-actions"><a href="'+esc(n.link)+'" target="_blank" rel="noopener">OPEN ORIGINAL SOURCE ↗</a>'+edit+'</div></article>';
    }).join('');
    qa('[data-news-edit]',host).forEach(function(b){b.onclick=function(){editNews(b.dataset.newsEdit)}});
    qa('[data-news-hide]',host).forEach(function(b){b.onclick=function(){hideNews(b.dataset.newsHide)}});
  }
  function renderDraftOrder(){
    var host=q('#hubDraftOrder');if(!host)return;
    var rows=[];for(var i=1;i<=40;i++){
      var oid=DD&&DD.ownerByPick&&DD.ownerByPick[i], rid=natural[(i-1)%18], o=club(oid), r=club(rid), traded=oid&&rid&&oid!==rid;
      rows.push('<div class="hub-draft-row"><strong>'+i+'</strong><span>'+dvi(i)+' pts</span><div>'+(o?'<img src="'+esc(o.logo)+'" alt=""><b>'+esc(o.name)+'</b>':'—')+'</div><div class="'+(traded?'traded':'')+'">'+(traded?'via '+esc(r?r.name:'original club'):'Natural selection')+'</div></div>');
    }
    host.innerHTML='<div class="hub-order-head"><span>PICK</span><span>DVI</span><span>CURRENT OWNER</span><span>ORIGIN</span></div>'+rows.join('');
    if(q('#draftOrderUpdated'))q('#draftOrderUpdated').textContent='Updated '+((DD&&DD.updated)||'27 Sep 2026')+' • factual baseline only';
  }
  function mockRows(id){return ((M&&M.board)||[]).filter(function(r){return r.clubId===id&&!r.placeholder})}
  function renderClubHub(){
    var sel=q('#hubClubSelect'),host=q('#clubHubBody');if(!sel||!host)return;
    if(!sel.options.length){D.clubs.forEach(function(c){sel.add(new Option(c.name,c.id))});sel.value='ric';sel.onchange=renderClubHub}
    var id=sel.value||'ric',c=club(id),picks=((DD&&DD.byClub&&DD.byClub[id])||[]).slice().sort(function(a,b){return a-b}),mocks=mockRows(id);
    var intel=newsItems.map(applyEdit).filter(function(n){return !n.hidden&&(((n.clubs||[]).indexOf(c.name)>=0)||String(n.title||'').toLowerCase().indexOf(c.name.toLowerCase())>=0)}).slice(0,6);
    host.innerHTML='<section class="club-hub-hero" style="--club:'+esc(c.color)+';--clubText:'+esc(c.clubText||'#fff')+'"><img src="'+esc(c.logo)+'" alt=""><div><span>CLUB HUB</span><h3>'+esc(c.name)+'</h3><p>'+c.players.length+' listed players • '+picks.length+' current draft assets</p></div><div class="club-hub-actions"><button data-jump="trade">OPEN TRADE MACHINE</button><button data-jump="best23">BUILD BEST 23</button></div></section><div class="club-hub-grid"><section><h4>CURRENT DRAFT PICKS</h4><div class="club-pick-chips">'+(picks.map(function(p){return '<span><b>'+p+'</b><small>'+dvi(p)+' pts</small></span>'}).join('')||'None listed')+'</div></section><section><h4>MY MOCK SELECTIONS</h4><div class="club-mock-list">'+(mocks.map(function(r){return '<div><b>Pick '+r.pick+'</b><span>'+esc(r.player)+'</span></div>'}).join('')||'<span>No current selections in My Mock.</span>')+'</div></section><section class="club-list-block"><h4>LIST</h4><div class="club-list-grid">'+c.players.map(function(p){return '<span>'+esc(p)+'</span>'}).join('')+'</div></section><section><h4>LATEST INTEL</h4><div class="club-news-list">'+(intel.map(function(n){return '<a href="'+esc(n.link)+'" target="_blank" rel="noopener"><b>'+esc(n.tag||'REPORTED')+'</b>'+esc(n.title)+'</a>'}).join('')||'<span>No matching feed items yet.</span>')+'</div></section></div>';
    qa('[data-jump]',host).forEach(function(b){b.onclick=function(){if(window.ATMUI)window.ATMUI.setMode(b.dataset.jump)}});
  }
  function ladderState(){var s=load('atm-ladder-2027-v1',null);return Array.isArray(s)&&s.length===D.clubs.length?s:D.clubs.map(function(c){return c.id})}
  function moveLadder(id,dir){var a=ladderState(),i=a.indexOf(id),j=i+dir;if(i<0||j<0||j>=a.length)return;var t=a[i];a[i]=a[j];a[j]=t;save('atm-ladder-2027-v1',a);renderLadder()}
  function renderLadder(){
    var host=q('#ladderBoard');if(!host)return;var a=ladderState();
    host.innerHTML=a.map(function(id,i){var c=club(id);return '<div class="ladder-row" draggable="true" data-ladder="'+id+'"><strong>'+(i+1)+'</strong><img src="'+esc(c.logo)+'" alt=""><span>'+esc(c.name)+'</span><div><button data-up="'+id+'" '+(i===0?'disabled':'')+'>↑</button><button data-down="'+id+'" '+(i===a.length-1?'disabled':'')+'>↓</button></div></div>'}).join('');
    qa('[data-up]',host).forEach(function(b){b.onclick=function(){moveLadder(b.dataset.up,-1)}});
    qa('[data-down]',host).forEach(function(b){b.onclick=function(){moveLadder(b.dataset.down,1)}});
    var drag=null;qa('.ladder-row',host).forEach(function(row){row.ondragstart=function(){drag=row.dataset.ladder};row.ondragover=function(e){e.preventDefault()};row.ondrop=function(e){e.preventDefault();var a=ladderState(),from=a.indexOf(drag),to=a.indexOf(row.dataset.ladder);if(from<0||to<0||from===to)return;a.splice(to,0,a.splice(from,1)[0]);save('atm-ladder-2027-v1',a);renderLadder()}});
  }
  function fanState(){return load('atm-fan-board-v1',{})}
  function vote(name,d){var s=fanState();s[name]=(s[name]||0)+d;save('atm-fan-board-v1',s);renderFan()}
  function renderFan(){
    var host=q('#fanBoard');if(!host)return;var s=fanState(),pool=((DD&&DD.prospects)||[]).slice(0,60).sort(function(a,b){return (s[b.name]||0)-(s[a.name]||0)||a.rank-b.rank}).slice(0,30);
    host.innerHTML=pool.map(function(p,i){return '<div class="fan-row"><strong>'+(i+1)+'</strong><div><b>'+esc(p.name)+'</b><span>'+esc(p.position)+' • '+esc(p.pathway)+'</span></div><div class="fan-score">'+(s[p.name]||0)+'</div><button data-vote-up="'+esc(p.name)+'">+1</button><button data-vote-down="'+esc(p.name)+'">−1</button></div>'}).join('');
    qa('[data-vote-up]',host).forEach(function(b){b.onclick=function(){vote(b.dataset.voteUp,1)}});
    qa('[data-vote-down]',host).forEach(function(b){b.onclick=function(){vote(b.dataset.voteDown,-1)}});
  }
  function init(){
    var cf=q('#newsClubFilter');if(cf&&!cf.options.length){cf.add(new Option('All clubs','ALL'));D.clubs.forEach(function(c){cf.add(new Option(c.name,c.name))})}
    qa('[data-hub-view]').forEach(function(b){b.onclick=function(){setView(b.dataset.hubView)}});
    if(q('#newsRefreshBtn'))q('#newsRefreshBtn').onclick=function(){loadNews(false)};
    if(q('#newsEditModeBtn'))q('#newsEditModeBtn').onclick=function(){editMode=!editMode;q('#newsEditModeBtn').classList.toggle('active',editMode);q('#newsEditModeBtn').textContent=editMode?'DONE EDITING':'EDIT NEWS';renderNews()};
    if(q('#newsResetEditsBtn'))q('#newsResetEditsBtn').onclick=function(){localStorage.removeItem('atm-news-edits-v1');renderNews()};
    if(q('#newsTagFilter'))q('#newsTagFilter').onchange=renderNews;
    if(cf)cf.onchange=renderNews;
    if(q('#newsAlertsBtn'))q('#newsAlertsBtn').onclick=async function(){if(!('Notification' in window))return toast('Browser notifications are not supported here');var p=await Notification.requestPermission();toast(p==='granted'?'News alerts enabled while the site is open':'News alerts not enabled')};
    if(q('#ladderResetBtn'))q('#ladderResetBtn').onclick=function(){localStorage.removeItem('atm-ladder-2027-v1');renderLadder()};
    if(q('#ladderCopyBtn'))q('#ladderCopyBtn').onclick=function(){var t=ladderState().map(function(id,i){return (i+1)+'. '+club(id).name}).join('\n');navigator.clipboard&&navigator.clipboard.writeText(t);toast('Ladder copied')};
    if(q('#fanResetBtn'))q('#fanResetBtn').onclick=function(){localStorage.removeItem('atm-fan-board-v1');renderFan()};
    if(q('#fanCopyBtn'))q('#fanCopyBtn').onclick=function(){var s=fanState(),t=Object.entries(s).sort(function(a,b){return b[1]-a[1]}).map(function(x,i){return (i+1)+'. '+x[0]+' ('+(x[1]>0?'+':'')+x[1]+')'}).join('\n');navigator.clipboard&&navigator.clipboard.writeText(t||'No fan votes yet');toast('Fan ballot copied')};
    setView('news');loadNews(true);setInterval(function(){loadNews(true)},300000);
  }
  window.AFLHub={render:function(){renderNews();renderDraftOrder();renderClubHub();renderLadder();renderFan()},setView:setView,loadNews:loadNews};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
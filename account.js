(() => {
  const SUPABASE_URL='https://petuunopkuywnxoorzek.supabase.co';
  const SUPABASE_KEY='sb_publishable_esIbiT_WLCvH_BCSvCHIZQ_Kr2hTPgL';
  const sbGlobal=window.supabase;
  if(!sbGlobal?.createClient){console.warn('Supabase client unavailable');return;}
  const client=sbGlobal.createClient(SUPABASE_URL,SUPABASE_KEY);
  const $=s=>document.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const toast=msg=>window.ATMToast?window.ATMToast(msg):alert(msg);
  let session=null, isAdmin=false, fanConsensus={}, myVotes={};

  function modal(html){
    const m=$('#draftModal'), card=$('#draftModalCard'); if(!m||!card)return;
    card.innerHTML=html;m.hidden=false;
  }
  function close(){const m=$('#draftModal'),card=$('#draftModalCard');if(m)m.hidden=true;if(card)card.innerHTML='';}
  async function refreshSession(){
    const {data}=await client.auth.getSession();session=data.session||null;
    isAdmin=false;
    if(session?.user){
      const {data:a}=await client.from('admin_users').select('user_id').eq('user_id',session.user.id).maybeSingle();
      isAdmin=!!a;
      await loadMyVotes();
    }else myVotes={};
    renderControls();
    document.dispatchEvent(new CustomEvent('atm-auth-change',{detail:{session,isAdmin}}));
  }
  async function signIn(){
    modal('<div class="modal-kicker">AFL TRADE MACHINE ACCOUNT</div><h3>Sign in or create an account</h3><p>Enter your email and we’ll send you a secure sign-in link. No password required.</p><label class="modal-label">EMAIL</label><input id="atmLoginEmail" class="modal-input" type="email" autocomplete="email" placeholder="you@example.com"><div class="modal-actions"><button id="atmLoginCancel" class="ghost-btn">CANCEL</button><button id="atmLoginSend" class="primary-btn">SEND SIGN-IN LINK</button></div><p class="profile-data-note">Accounts let you save trades, mocks, Best 23s and ladders across devices.</p>');
    $('#atmLoginCancel').onclick=close;
    $('#atmLoginSend').onclick=async()=>{
      const email=$('#atmLoginEmail').value.trim();if(!email)return toast('Enter your email');
      const btn=$('#atmLoginSend');btn.disabled=true;btn.textContent='SENDING…';
      const {error}=await client.auth.signInWithOtp({email,options:{emailRedirectTo:location.origin+location.pathname}});
      if(error){btn.disabled=false;btn.textContent='SEND SIGN-IN LINK';return toast(error.message)}
      cardMessage('Check your email','Open the secure link we just sent you. Once you return to this site, you will be signed in.');
    };
  }
  function cardMessage(title,copy){modal('<div class="modal-kicker">ACCOUNT</div><h3>'+esc(title)+'</h3><p>'+esc(copy)+'</p><div class="modal-actions"><button id="atmMessageClose" class="primary-btn">CLOSE</button></div>');$('#atmMessageClose').onclick=close;}
  async function signOut(){await client.auth.signOut();toast('Signed out');}
  function renderControls(){
    let wrap=$('#atmAccountControls');
    if(!wrap){
      wrap=document.createElement('div');wrap.id='atmAccountControls';wrap.className='account-controls';
      const header=document.querySelector('.topbar');if(header)header.appendChild(wrap);
    }
    if(!session){
      wrap.innerHTML='<button id="atmAccountBtn" class="ghost-btn">ACCOUNT</button>';
      $('#atmAccountBtn').onclick=signIn;
    }else{
      const label=session.user.email?.split('@')[0]||'ACCOUNT';
      wrap.innerHTML='<button id="atmSaveBtn" class="ghost-btn">SAVE</button><button id="atmSavesBtn" class="ghost-btn">MY SAVES</button><button id="atmAccountBtn" class="ghost-btn">'+esc(label)+'</button>';
      $('#atmSaveBtn').onclick=saveCurrent;
      $('#atmSavesBtn').onclick=openSaves;
      $('#atmAccountBtn').onclick=openAccount;
    }
  }
  function currentPayload(){
    const mode=document.body.dataset.mode||'trade';
    if(mode==='trade')return {item_type:'trade',title:'Trade scenario',payload:{trade:window.TradeMachine?.getTrade?.()||[]}};
    if(mode==='draft')return {item_type:'mock_draft',title:'Live mock draft',payload:{state:window.MockDraft?.getState?.()||null}};
    if(mode==='best23')return {item_type:'best23',title:'Best 23',payload:{state:window.Best23?.getState?.()||null}};
    if(mode==='hub'){
      const ladder=JSON.parse(localStorage.getItem('atm-ladder-2027-v1')||'null');
      return {item_type:'ladder',title:'2027 ladder prediction',payload:{ladder}};
    }
    return null;
  }
  async function saveCurrent(){
    if(!session)return signIn();
    const item=currentPayload();if(!item)return toast('Nothing to save here');
    const title=prompt('Name this save',item.title);if(title===null)return;
    const {error}=await client.from('saved_items').insert({user_id:session.user.id,item_type:item.item_type,title:title.trim()||item.title,payload:item.payload,is_public:false});
    if(error)return toast(error.message);toast('Saved to your account');
  }
  async function openSaves(){
    if(!session)return signIn();
    const {data,error}=await client.from('saved_items').select('id,item_type,title,payload,created_at').eq('user_id',session.user.id).order('created_at',{ascending:false});
    if(error)return toast(error.message);
    modal('<div class="modal-kicker">YOUR ACCOUNT</div><h3>My saves</h3><div class="saved-items-list">'+((data||[]).map(x=>'<div class="saved-item"><div><strong>'+esc(x.title)+'</strong><span>'+esc(x.item_type.replace('_',' ').toUpperCase())+' • '+new Date(x.created_at).toLocaleString('en-AU')+'</span></div><div><button data-load-save="'+x.id+'" class="ghost-btn">LOAD</button><button data-delete-save="'+x.id+'" class="ghost-btn danger">DELETE</button></div></div>').join('')||'<div class="empty-state">No saves yet.</div>')+'</div><div class="modal-actions"><button id="atmSavesClose" class="primary-btn">CLOSE</button></div>');
    $('#atmSavesClose').onclick=close;
    document.querySelectorAll('[data-load-save]').forEach(b=>b.onclick=()=>loadSave((data||[]).find(x=>x.id===b.dataset.loadSave)));
    document.querySelectorAll('[data-delete-save]').forEach(b=>b.onclick=()=>deleteSave(b.dataset.deleteSave));
  }
  function loadSave(x){
    if(!x)return;
    if(x.item_type==='trade'){window.ATMUI?.setMode?.('trade');window.TradeMachine?.setTrade?.(x.payload?.trade||[]);}
    if(x.item_type==='mock_draft'){window.ATMUI?.setMode?.('draft');window.MockDraft?.setState?.(x.payload?.state);}
    if(x.item_type==='best23'){window.ATMUI?.setMode?.('best23');window.Best23?.setState?.(x.payload?.state);}
    if(x.item_type==='ladder'){if(x.payload?.ladder)localStorage.setItem('atm-ladder-2027-v1',JSON.stringify(x.payload.ladder));window.ATMUI?.setMode?.('hub');window.AFLHub?.setView?.('ladder');window.AFLHub?.render?.();}
    close();toast('Save loaded');
  }
  async function deleteSave(id){
    if(!confirm('Delete this saved item?'))return;
    const {error}=await client.from('saved_items').delete().eq('id',id).eq('user_id',session.user.id);
    if(error)return toast(error.message);toast('Deleted');openSaves();
  }
  function openAccount(){
    modal('<div class="modal-kicker">ACCOUNT</div><h3>'+esc(session.user.email||'Signed in')+'</h3><p>Your trades, drafts, teams and ladders can now be saved to this account.</p>'+(isAdmin?'<div class="admin-badge">SITE ADMIN</div>':'')+'<div class="modal-actions"><button id="atmAccountSaves" class="ghost-btn">MY SAVES</button><button id="atmAccountSignOut" class="ghost-btn danger">SIGN OUT</button><button id="atmAccountClose" class="primary-btn">CLOSE</button></div>');
    $('#atmAccountSaves').onclick=openSaves;$('#atmAccountSignOut').onclick=async()=>{close();await signOut()};$('#atmAccountClose').onclick=close;
  }
  async function loadFanConsensus(){
    const {data,error}=await client.from('fan_votes').select('prospect_name,score');
    if(error){console.warn(error);return fanConsensus}
    const sums={},counts={};(data||[]).forEach(v=>{sums[v.prospect_name]=(sums[v.prospect_name]||0)+v.score;counts[v.prospect_name]=(counts[v.prospect_name]||0)+1});
    fanConsensus=Object.fromEntries(Object.keys(sums).map(k=>[k,{score:sums[k],votes:counts[k]}]));
    window.ATMCloud.fanConsensus=fanConsensus;
    document.dispatchEvent(new CustomEvent('atm-cloud-votes'));
    return fanConsensus;
  }
  async function loadMyVotes(){
    if(!session){myVotes={};return}
    const {data}=await client.from('fan_votes').select('prospect_name,score').eq('user_id',session.user.id);
    myVotes=Object.fromEntries((data||[]).map(v=>[v.prospect_name,v.score]));
    window.ATMCloud.myVotes=myVotes;
  }
  async function voteProspect(name,delta){
    if(!session){signIn();return false}
    const next=Math.max(-10,Math.min(10,(myVotes[name]||0)+delta));
    const {error}=await client.from('fan_votes').upsert({user_id:session.user.id,prospect_name:name,score:next,updated_at:new Date().toISOString()},{onConflict:'user_id,prospect_name'});
    if(error){toast(error.message);return false}
    myVotes[name]=next;window.ATMCloud.myVotes=myVotes;await loadFanConsensus();return true;
  }
  async function loadGlobalNews(){
    const {data,error}=await client.from('news_posts').select('*').eq('is_published',true).order('published_at',{ascending:false,nullsFirst:false}).limit(100);
    if(error){console.warn(error);return []}
    return (data||[]).map(n=>({id:'db-'+n.id,dbId:n.id,title:n.title,summary:n.summary,source:n.source,link:n.source_url,publishedAt:n.published_at,tag:n.status,clubs:n.clubs||[],global:true}));
  }
  async function updateGlobalNews(dbId,patch){
    if(!isAdmin)return {error:new Error('Admin access required')};
    return client.from('news_posts').update({...patch,updated_at:new Date().toISOString()}).eq('id',dbId);
  }
  async function loadMockOverrides(){
    const [{data:rows,error:e1},{data:profiles,error:e2}]=await Promise.all([
      client.from('mock_draft_overrides').select('*'),
      client.from('mock_profile_overrides').select('*')
    ]);
    if(e1||e2){console.warn(e1||e2);return {rows:[],profiles:[]}}
    return {rows:rows||[],profiles:profiles||[]};
  }
  async function saveMockPlayerOrder(rows){
    if(!isAdmin)return {error:new Error('Admin access required')};
    const payload=(rows||[]).map(r=>({
      pick:Number(r.pick),
      club_id:r.club_id??r.clubId??null,
      player:r.player??null,
      path:r.path??null,
      mechanism:r.mechanism??null,
      updated_by:session.user.id,
      updated_at:new Date().toISOString()
    }));
    if(!payload.length)return {data:[]};
    return client.from('mock_draft_overrides').upsert(payload,{onConflict:'pick'});
  }
  async function saveMockRow(pick,patch){
    if(!isAdmin)return {error:new Error('Admin access required')};
    return client.from('mock_draft_overrides').upsert({
      pick:Number(pick),
      club_id:patch.club_id||null,
      player:patch.player||null,
      path:patch.path||null,
      mechanism:patch.mechanism||null,
      updated_by:session.user.id,
      updated_at:new Date().toISOString()
    },{onConflict:'pick'});
  }
  async function saveMockProfile(player,patch){
    if(!isAdmin)return {error:new Error('Admin access required')};
    return client.from('mock_profile_overrides').upsert({
      player,
      comparison:patch.comparison??null,
      why:patch.why??null,
      description:patch.description??null,
      position:patch.position??null,
      pathway:patch.pathway??null,
      updated_by:session.user.id,
      updated_at:new Date().toISOString()
    },{onConflict:'player'});
  }
  async function clearMockRow(pick){
    if(!isAdmin)return {error:new Error('Admin access required')};
    return client.from('mock_draft_overrides').delete().eq('pick',Number(pick));
  }
  async function clearMockProfile(player){
    if(!isAdmin)return {error:new Error('Admin access required')};
    return client.from('mock_profile_overrides').delete().eq('player',player);
  }
  async function createGlobalNews(item){
    if(!isAdmin)return {error:new Error('Admin access required')};
    const slug=(String(item.title||'story').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,70)||'story')+'-'+Date.now().toString(36);
    return client.from('news_posts').insert({
      slug,
      title:item.title,
      summary:item.summary||null,
      source:item.source||item.feed||null,
      source_url:item.link||null,
      status:item.tag||'REPORTED',
      clubs:item.clubs||[],
      published_at:item.publishedAt||new Date().toISOString(),
      is_published:true,
      created_by:session.user.id
    }).select().single();
  }
  window.ATMCloud={client,get session(){return session},get isAdmin(){return isAdmin},fanConsensus,myVotes,signIn,signOut,saveCurrent,openSaves,voteProspect,loadFanConsensus,loadGlobalNews,updateGlobalNews,createGlobalNews,loadMockOverrides,saveMockPlayerOrder,saveMockRow,saveMockProfile,clearMockRow,clearMockProfile};
  client.auth.onAuthStateChange(()=>setTimeout(refreshSession,0));
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{refreshSession();loadFanConsensus()});else{refreshSession();loadFanConsensus()}
})();
/* Keep club squads in sync with confirmed National Draft selections.
 * Draft results remain authoritative in draft-data.js; no mock picks are used.
 * The Rookie Draft on 23 November 2026 is not yet included.
 */
(() => {
  const data=window.ATM_DATA;
  const selections=window.ATM_DRAFT_DATA?.confirmedDraftSelections;
  if(!Array.isArray(data?.clubs)||!Array.isArray(selections)||selections.length<60)return;

  const normalize=name=>String(name||'').trim().toLowerCase()
    .normalize('NFKD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[\u2019\u2018']/g,"'").replace(/[-\s]+/g,' ');
  const byClub=new Map(data.clubs.map(c=>[c.id,c]));
  const picks=[...selections].sort((a,b)=>a.pick-b.pick);
  let added=0,transferred=0;

  for(const {club:clubId,player} of picks){
    const destination=byClub.get(clubId);
    if(!destination||!player)continue;
    const key=normalize(player);
    for(const c of data.clubs){
      if(c.id===clubId)continue;
      const before=c.players.length;
      c.players=c.players.filter(name=>normalize(name)!==key);
      transferred+=before-c.players.length;
    }
    if(!destination.players.some(name=>normalize(name)===key)){
      destination.players.push(player);
      added++;
    }
  }
  data.nationalDraftRosterSync={
    draft:'2026 AFL National Draft',date:'2026-11-20',
    selections:picks.length,added,transferred,
    source:'https://www.afl.com.au/draft/draft-tracker/2026',
    pending:'Pre-season and Rookie Draft on 2026-11-23'
  };
  data.updated=(data.updated||'')+'; National Draft club rosters synchronised 21 Nov 2026';
})();

const FALLBACK={
  ade:[13,32,33,41,54,90],bri:[18,39,40,51,57,77,95],car:[11,16,23,24,59,70,88],col:[9,28,65,66,68,86],
  ess:[1,15,19,25,78],fre:[17,38,58,61,76,94],gee:[34,55,60,73,91],gcs:[79,83],gws:[7,26,29,48,75,84],
  haw:[27,35,69,92],mel:[6,10,47,87],nm:[5,45,64,72,82],pa:[4,22,30,44,46,63,81],
  ric:[2,20,42],stk:[8,14,49,67,85],syd:[36,37,50,52,74,93],wce:[3,21,43,56,62,71,80],wbd:[12,31,53,89]
};
const NOTES={
  61:'Nathan O\'Driscoll trade from Richmond',
  15:'Zach Merrett trade from Hawthorn',
  25:'Zach Merrett trade from Hawthorn (originally via GWS)',
  26:'Toby Greene compensation',
  33:'Jordon Butts compensation',
  37:'Joel Amartey compensation',
  40:'Lachie Neale compensation',
  48:'Kieren Briggs compensation',
  60:'Jordan Ridley / Jack Bowes trade from Essendon to Geelong',
  61:"Nathan O'Driscoll trade from Richmond to Fremantle"
};
const BID_SLIDE=[
  {afterOfficialPick:19,owner:'ess',note:'Essendon bid-slide compensation'},
  {afterOfficialPick:20,owner:'ric',note:'Richmond bid-slide compensation'},
  {afterOfficialPick:21,owner:'wce',note:'West Coast bid-slide compensation'},
  {afterOfficialPick:23,owner:'nm',note:'North Melbourne bid-slide compensation'}
];
function officialPicks(){
  const out=[];
  Object.entries(FALLBACK).forEach(([owner,nums])=>nums.forEach(pick=>out.push({pick,owner,note:NOTES[pick]||null})));
  return out.sort((a,b)=>a.pick-b.pick);
}
function projectedPicks(){
  const out=[];let inserted=0;
  officialPicks().forEach(row=>{
    out.push({...row,officialPick:row.pick,pick:row.pick+inserted,conditional:false});
    const comp=BID_SLIDE.find(x=>x.afterOfficialPick===row.pick);
    if(comp){
      inserted+=1;
      out.push({
        pick:row.pick+inserted,
        officialPick:null,
        owner:comp.owner,
        note:comp.note+' — projected under 2026 matched-bid rule',
        conditional:true,
        compensationType:'bid-slide'
      });
    }
  });
  return out;
}
module.exports=async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Cache-Control','public, s-maxage=300, stale-while-revalidate=900');
  if(req.method==='OPTIONS') return res.status(204).end();
  return res.status(200).json({
    source:'AFL Trade Machine verified order',
    updated:'2026-10-08',
    note:'Confirmed 2026 indicative order updated through 8 October, including free-agency compensation and completed pick trades. Hypothetical bids and user trades are applied separately in the simulator.',
    picks:projectedPicks()
  });
};

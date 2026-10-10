const FALLBACK={
  ade:[15,34,35,43,56,92],
  bri:[20,42,53,59,79,97],
  car:[13,18,25,26,61,72,90],
  col:[11,30,67,68,70,88],
  ess:[1,17,21,27,80],
  fre:[19,40,60,63,78,96],
  gee:[36,57,62,75,93],
  gcs:[8,81,85],
  gws:[9,28,31,50,77,86],
  haw:[29,37,71,94],
  mel:[4,14,33,48,49],
  nm:[6,47,66,74,84],
  pa:[5,7,12,24,32,46,65],
  ric:[2,22,44],
  stk:[10,16,41,51,69,87],
  syd:[38,39,52,54,76,95],
  wce:[3,23,45,58,64,73,82],
  wbd:[55,83,89,91]
};
const NOTES={
  4:'via Port Adelaide - five-club trade',
  5:'Zak Butters compensation',
  7:'via Gold Coast - five-club trade',
  8:'Ben King compensation',
  12:'via Melbourne - five-club trade',
  14:'via Western Bulldogs - five-club trade',
  16:'via Geelong - Rowan Marshall trade',
  17:'via Hawthorn - Zach Merrett trade',
  18:'via Sydney',
  25:'via North Melbourne',
  26:'via Gold Coast',
  27:'via Greater Western Sydney / Hawthorn - Zach Merrett trade',
  28:'Toby Greene compensation',
  29:'via St Kilda',
  31:'via Melbourne',
  32:'via Carlton',
  33:'via Western Bulldogs - five-club trade',
  35:'Jordon Butts compensation',
  39:'Joel Amartey compensation',
  41:'via Brisbane - Sam Marshall trade',
  42:'Lachie Neale compensation',
  50:'Kieren Briggs compensation',
  62:'via Essendon - Ridley / Bowes trade',
  63:'via Richmond - O\'Driscoll trade'
};
const BID_SLIDE=[
  {afterOfficialPick:21,owner:'ess',note:'Essendon bid-slide compensation'},
  {afterOfficialPick:22,owner:'ric',note:'Richmond bid-slide compensation'},
  {afterOfficialPick:23,owner:'wce',note:'West Coast bid-slide compensation'},
  {afterOfficialPick:25,owner:'nm',note:'North Melbourne bid-slide compensation'}
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
    updated:'2026-10-11',
    note:'2026 indicative draft order updated through 9 October using AFL club data, including the Butters and King free agency compensation, five-club mega trade and Sam Marshall swap. Projected matched bids remain separate.',
    picks:projectedPicks()
  });
};

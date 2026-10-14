const FALLBACK={
  ade:[15,34,35,43,56,92],
  bri:[25,28,42,53,79,97],
  car:[13,18,31,50,61,72,90],
  col:[11,30,67,68,70,88],
  ess:[1,17,21,27,80],
  fre:[19,40,60,63,78,96],
  gee:[36,57,62,75,93],
  gcs:[8,81,85],
  gws:[9,20,26,59,77,86],
  haw:[29,37,71,94],
  mel:[4,14,48,52],
  nm:[33,49,66,74,84],
  pa:[7,12,22,24,32,46,65],
  ric:[2,5,44],
  stk:[10,16,41,51,69,87],
  syd:[6,38,39,47,54,76,95],
  wce:[3,23,45,58,64,73,82],
  wbd:[55,83,89,91]
};
const NOTES={
  4:'via Port Adelaide - five-club trade',
  5:'via Port Adelaide - Richmond pick swap (originally Zak Butters compensation)',
  6:'via North Melbourne - Nick Blakey trade',
  7:'via Gold Coast - five-club trade',
  8:'Ben King compensation',
  12:'via Melbourne - five-club trade',
  14:'via Western Bulldogs - five-club trade',
  16:'via Geelong - Rowan Marshall trade',
  17:'via Hawthorn - Zach Merrett trade',
  18:'via Sydney',
  22:'via Richmond - Port Adelaide pick swap',
  20:'via Brisbane - GWS pick swap',
  25:'via GWS - Brisbane pick swap (originally Carlton / North Melbourne via Lachie Whitfield trade)',
  26:'via Carlton - Lachie Whitfield trade (originally Gold Coast)',
  27:'via Greater Western Sydney / Hawthorn - Zach Merrett trade',
  28:'via GWS - Brisbane pick swap (originally Toby Greene compensation)',
  29:'via St Kilda',
  31:'via Greater Western Sydney - Lachie Whitfield trade (originally Melbourne)',
  32:'via Carlton',
  33:'via Melbourne - Zane Duursma trade (originally Western Bulldogs)',
  35:'Jordon Butts compensation',
  39:'Joel Amartey compensation',
  41:'via Brisbane - Sam Marshall trade',
  42:'Lachie Neale compensation',
  47:'via North Melbourne - Nick Blakey trade',
  49:'via Melbourne - Zane Duursma trade (originally Greater Western Sydney)',
  52:'via North Melbourne - Zane Duursma trade (originally Sydney/Collingwood)',
  50:'via Greater Western Sydney - Lachie Whitfield trade (originally Kieren Briggs compensation)',
  59:'via Brisbane - GWS pick swap (originally Sydney)',
  62:'via Essendon - Ridley / Bowes trade',
  63:'via Richmond - O\'Driscoll trade'
};
const BID_SLIDE=[
  {afterOfficialPick:21,owner:'ess',note:'Essendon bid-slide compensation'},
  {afterOfficialPick:22,owner:'ric',note:'Richmond bid-slide compensation'},
  {afterOfficialPick:23,owner:'wce',note:'West Coast bid-slide compensation'}
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
    updated:'2026-10-14',
    note:'2026 indicative draft order verified against AFL official 14 October register, including the Brisbane-GWS and Richmond-Port Adelaide pick swaps, and Nick Blakey, Zane Duursma and Lachie Whitfield trades. Three projected bid-slide compensation picks remain conditional and separate from the official order.',
    picks:projectedPicks()
  });
};

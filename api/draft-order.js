const FALLBACK={
  ade:[15,32,35,43,54],
  bri:[21,27,28,45],
  car:[13,18,31,50,59,67,73],
  col:[11,30,63,64,65],
  ess:[1,17,25,69,75,78,80],
  fre:[19,40,58,61,68],
  gee:[36,55,60],
  gcs:[8,70,72,77],
  gws:[9,20,26,57],
  haw:[29,37,66,74],
  mel:[4,14,48,51,79],
  nm:[33,49,62],
  pa:[7,12,22,24,34,46],
  ric:[2,5,44,76],
  stk:[10,16,41],
  syd:[6,38,39,47],
  wce:[3,23,56],
  wbd:[42,52,53,71]
};
const NOTES={
  4:'via Port Adelaide - five-club trade',
  5:'via Port Adelaide - Richmond pick swap (originally Zak Butters compensation)',
  6:'via North Melbourne - Nick Blakey trade',
  7:'via Melbourne - five-club mega deal (tied to Gold Coast)',
  8:'Ben King compensation',
  12:'via Melbourne - five-club trade',
  14:'via Western Bulldogs - five-club trade',
  16:'via Geelong - Rowan Marshall trade',
  17:'via Hawthorn - Zach Merrett trade',
  18:'tied to Sydney (Carlton holds the selection)',
  22:'via Richmond - Port Adelaide pick swap',
  20:'via Brisbane - GWS pick swap',
  25:'via Brisbane - Keidean Coleman trade (via GWS pick swap and Carlton / Lachie Whitfield trade; tied to North Melbourne)',
  26:'via Carlton - Lachie Whitfield trade (tied to Gold Coast)',
  27:'via Essendon - Keidean Coleman trade (via Hawthorn / Zach Merrett trade; tied to Greater Western Sydney)',
  28:'via GWS - Brisbane pick swap (originally Toby Greene compensation)',
  29:'via West Coast (originally tied to St Kilda; Hawthorn holds the selection)',
  31:'via Greater Western Sydney - Lachie Whitfield trade (tied to Melbourne)',
  32:'via Port Adelaide - Luke Pedlar trade (tied to Carlton)',
  33:'via Melbourne - Zane Duursma trade (tied to Western Bulldogs; Melbourne received via five-club mega deal)',
  35:'Jordon Butts compensation',
  39:'Joel Amartey compensation',
  41:'via Brisbane - Sam Marshall trade',
  42:'via Brisbane - Western Bulldogs pick swap (Lachie Neale compensation)',
  47:'via North Melbourne - Nick Blakey trade',
  21:'via Essendon - Keidean Coleman trade',
  34:'via Adelaide - Luke Pedlar trade',
  45:'via Melbourne - Will McLachlan trade (West Coast / Jack Viney and Trent Rivers trade)',
  43:'via Gold Coast (tied to Essendon)',
  48:'via Port Adelaide - five-club mega deal (tied to Gold Coast)',
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
    updated:'2026-11-11',
    note:'Official AFL final 2026 National Draft order (11 November): 80 picks. Three bid-slide compensation picks remain conditional projections.',
    picks:projectedPicks()
  });
};

const FALLBACK={
  ade:[15,32,35,43,56,92,110],
  bri:[21,27,28,45,79,97,115],
  car:[13,18,31,50,61,72,90,108],
  col:[11,30,67,68,70,88,106],
  ess:[1,17,25,80,98],
  fre:[19,40,60,63,78,96,114],
  gee:[36,57,62,75,93,111],
  gcs:[8,81,85,103],
  gws:[9,20,26,59,77,86,104],
  haw:[29,37,71,94,107,112],
  mel:[4,14,48,52],
  nm:[33,49,66,74,84,102],
  pa:[7,12,22,24,34,46,65,101],
  ric:[2,5,44,99],
  stk:[10,16,41,51,69,87,105],
  syd:[6,38,39,47,54,76,95,113],
  wce:[3,23,58,64,73,82,100],
  wbd:[42,53,55,83,89,91,109]
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
  29:'tied to St Kilda (Hawthorn holds the selection)',
  31:'via Greater Western Sydney - Lachie Whitfield trade (tied to Melbourne)',
  32:'via Port Adelaide - Luke Pedlar trade (tied to Carlton)',
  33:'via Melbourne - Zane Duursma trade (tied to Western Bulldogs; Melbourne received via five-club mega deal)',
  35:'Jordon Butts compensation',
  39:'Joel Amartey compensation',
  41:'via Brisbane - Sam Marshall trade',
  42:'via Brisbane - Western Bulldogs pick swap (Lachie Neale compensation)',
  47:'via North Melbourne - Nick Blakey trade',
  49:'via Melbourne - Zane Duursma trade (tied to Greater Western Sydney)',
  52:'via North Melbourne - Zane Duursma trade (North Melbourne received from Sydney in Nick Blakey trade; tied to Collingwood)',
  50:'via Greater Western Sydney - Lachie Whitfield trade (originally Kieren Briggs compensation)',
  59:'via Brisbane - GWS pick swap (tied to Sydney)',
  62:'via Essendon - Ridley / Bowes trade',
  63:'via Richmond - O\'Driscoll trade',
  21:'via Essendon - Keidean Coleman trade',
  34:'via Adelaide - Luke Pedlar trade',
  45:'via Melbourne - Will McLachlan trade (West Coast / Jack Viney and Trent Rivers trade)',
  53:'via Brisbane - Western Bulldogs pick swap (tied to Melbourne)',
  107:'via Melbourne - Bodie Ryan trade'
  43:'via Gold Coast (tied to Essendon)',
  48:'via Port Adelaide - five-club mega deal (tied to Gold Coast)',
  54:'tied to Carlton (Sydney holds the selection)',
  58:'tied to Hawthorn (West Coast holds the selection)',
  61:'tied to Brisbane (Carlton holds the selection)',
  67:'via Gold Coast - Scott Pendlebury trade',
  68:'tied to Greater Western Sydney (Collingwood holds the selection)',
  71:'tied to Melbourne (Hawthorn holds the selection)',
  73:'tied to Western Bulldogs (West Coast holds the selection)',
  74:'tied to Adelaide (North Melbourne holds the selection)',
  76:'tied to Hawthorn (Sydney holds the selection)',
  77:'via Collingwood - Jesse Hogan trade (tied to Sydney)',
  81:'tied to Richmond (Gold Coast holds the selection)',
  83:'via Port Adelaide - five-club mega deal',
  89:'via Melbourne - five-club mega deal',
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
    updated:'2026-10-23',
    note:'Official AFL post-trade-period 2026 draft order: 115 picks. Three bid-slide compensation picks remain conditional projections.',
    picks:projectedPicks()
  });
};

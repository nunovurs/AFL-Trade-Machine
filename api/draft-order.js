const FALLBACK={
  ade:[13,31,37,49],bri:[18,36,46,51,71],car:[11,16,23,24,53,65],col:[9,27,61,63,70],
  ess:[1,19,55],fre:[17,35,54,72],gee:[14,32,50,68],gcs:[60],gws:[7,28],
  haw:[15,25,26,33,64],mel:[6,10,43],nm:[5,41,59,67],pa:[4,22,29,40,42,58],
  ric:[2,20,38,56],stk:[8,44,62],syd:[34,45,47,69],wce:[3,21,39,52,57,66],wbd:[12,30,48]
};
function picks(){
  const out=[];
  Object.entries(FALLBACK).forEach(([owner,nums])=>nums.forEach(pick=>out.push({pick,owner})));
  return out.sort((a,b)=>a.pick-b.pick);
}
module.exports=async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Cache-Control','public, s-maxage=300, stale-while-revalidate=900');
  if(req.method==='OPTIONS') return res.status(204).end();
  return res.status(200).json({
    source:'AFL Trade Machine verified order',
    updated:'2026-09-27',
    note:'Post-2026 Grand Final baseline. Hypothetical compensation, bids and user trades are applied separately in the simulator.',
    picks:picks()
  });
};

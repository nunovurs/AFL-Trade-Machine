const FALLBACK={
  ade:[13,32,33,41,54,90],bri:[18,39,40,51,57,77,95],car:[11,16,23,24,59,70,88],col:[9,28,66,68,86],
  ess:[1,19,60,78],fre:[17,38,58,76,94],gee:[14,34,55,73,91],gcs:[65,79,83],gws:[7,26,29,48,75,84],
  haw:[15,25,27,35,69,92],mel:[6,10,47,87],nm:[5,45,64,72,82],pa:[4,22,30,44,46,63,81],
  ric:[2,20,42,61],stk:[8,49,67,85],syd:[36,37,50,52,74,93],wce:[3,21,43,56,62,71,80],wbd:[12,31,53,89]
};
const NOTES={
  26:'Toby Greene compensation',
  33:'Jordon Butts compensation',
  37:'Joel Amartey compensation',
  40:'Lachie Neale compensation',
  48:'Kieren Briggs compensation'
};
function picks(){
  const out=[];
  Object.entries(FALLBACK).forEach(([owner,nums])=>nums.forEach(pick=>out.push({pick,owner,note:NOTES[pick]||null})));
  return out.sort((a,b)=>a.pick-b.pick);
}
module.exports=async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Cache-Control','public, s-maxage=300, stale-while-revalidate=900');
  if(req.method==='OPTIONS') return res.status(204).end();
  return res.status(200).json({
    source:'AFL Trade Machine verified order',
    updated:'2026-10-03',
    note:'Confirmed 2026 indicative order as published by AFL.com.au on 3 October, including free-agency compensation. Hypothetical bids and user trades are applied separately in the simulator.',
    picks:picks()
  });
};

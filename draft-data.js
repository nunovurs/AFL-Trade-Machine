window.ATM_DRAFT_DATA = (() => {
  const officialByClub = {
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
  const officialOriginByPick = {
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
  const bidSlideCompensations = [
    {afterOfficialPick:21,club:'ess',label:'Essendon bid-slide compensation'},
    {afterOfficialPick:22,club:'ric',label:'Richmond bid-slide compensation'},
    {afterOfficialPick:23,club:'wce',label:'West Coast bid-slide compensation'},
    {afterOfficialPick:25,club:'nm',label:'North Melbourne bid-slide compensation'}
  ];
  const officialRows=[];
  Object.entries(officialByClub).forEach(([club,picks])=>picks.forEach(pick=>officialRows.push({
    pick,owner:club,origin:officialOriginByPick[pick]||'Natural selection'
  })));
  officialRows.sort((a,b)=>a.pick-b.pick);

  const projectedRows=[];
  let inserted=0;
  officialRows.forEach(row=>{
    const projectedPick=row.pick+inserted;
    projectedRows.push({...row,pick:projectedPick,officialPick:row.pick});
    const comp=bidSlideCompensations.find(x=>x.afterOfficialPick===row.pick);
    if(comp){
      inserted+=1;
      projectedRows.push({
        pick:row.pick+inserted,
        owner:comp.club,
        officialPick:null,
        origin:comp.label+' — projected under 2026 matched-bid rule',
        conditional:true,
        compensationType:'bid-slide'
      });
    }
  });

  const ownerByPick={},originByPick={},byClub={};
  projectedRows.forEach(row=>{
    ownerByPick[row.pick]=row.owner;
    originByPick[row.pick]=row.origin;
    (byClub[row.owner]||(byClub[row.owner]=[])).push(row.pick);
  });

  const prospects = [
    ['Dougie Cochrane','Utility','Central District','pa','NGA'],['Arki Butler','Midfielder/Forward','Sandringham Dragons',null,null],['Cody Walker','Midfielder','Bendigo Pioneers','car','Father-Son'],['Harry Van Hattum','Ruck','Northern Knights',null,null],['Gus Teixeira','Midfielder','Sandringham Dragons',null,null],['Ethan Drever','Midfielder','GWV Rebels',null,null],['Ethan Matthews','Midfielder','GWS Academy','gws','Academy'],['Leo Steed','Midfielder','Swan Districts',null,null],['Mitchell Harris','Key Defender','Woodville-West Torrens',null,null],['Caylen Murray','Utility','Brisbane Academy','bri','Academy'],
    ['Noah Williams','Midfielder','Geelong Falcons',null,null],['Kodah Edwards','Midfielder/Forward','South Adelaide',null,null],['Heath Mellody','Midfielder/Utility','Claremont',null,null],['Marlon Neocleous','Small Forward/Midfielder','Gippsland Power',null,null],['George Gale','Utility','Claremont',null,null],['Harrison Chapman','Wing/Utility','Eastern Ranges',null,null],['Hugh McCallum','Wing/Utility','Tasmania Devils',null,null],['Clancy Snell','Key Defender','Gippsland Power',null,null],['Jordan Knapp','Midfielder','Eastern Ranges',null,null],['Khaled El Souki','Forward/Midfielder','Western Jets','wbd','NGA'],['Jacob McNicol','Midfielder/Forward','Glenelg',null,null],['Memphis Webb','Midfielder','North Adelaide',null,null],['Gabriel Patterson','Forward/Midfielder','Glenelg',null,null],['Kale Matthews-Hampton','Defender/Half Back','Sturt',null,null],['Jack Pickett','Key Forward','Geelong Falcons',null,null],['Darcy Szerszyn','Defender','Dandenong Stingrays',null,null],['Xavier Ladbrook','Key Utility','Gippsland Power',null,null],['Jackson Phillips','Midfielder','Dandenong Stingrays',null,null],['Archie Van Dyk','Midfielder','South Adelaide',null,null],['Archie Spencer','Midfielder','Eastern Ranges',null,null],['Albert MacGowan','Midfielder/Forward','Sandringham Dragons',null,null],['Ben Carroll','Midfielder','Dandenong Stingrays',null,null],['Tanner Armstrong','Midfielder','Murray Bushrangers','ric','NGA'],['Tyson Bradley','Key Defender','Sandringham Dragons',null,null],['Harvey Spawton-Guy','Key Utility','West Perth',null,null],['Lachlan Hicks','Midfielder/Forward','Western Jets',null,null],['Sam Harris','Midfielder/Forward','Calder Cannons','nm','Father-Son'],['Keenan Boi','Forward/Midfielder','Gippsland Power','haw','NGA'],['Wil Antrobus','Half Back','Dandenong Stingrays',null,null],['Jake Eime','Half Back','Central District',null,null],['Archie Elliott','Forward','GWV Rebels',null,null],['Harvie Cooke','Forward/Midfielder','Northern Knights',null,null],['Toby Krasna','Wing','Northern Knights',null,null],['Blake Justice','Forward/Midfielder','Calder Cannons','ess','NGA'],['Benji Van Rooyen','Ruck/Forward','Claremont',null,null],['Lewis Houndsome','Key Forward/Ruck','Northern Knights',null,null],['Harrison Leeder','Key Forward','Northern Knights',null,null],['Aiden McCartney','Forward','Sydney Academy','nm','Father-Son'],['Harry Franz','Key Defender','Glenelg',null,null],['Mitch Toner','Forward','Dandenong Stingrays',null,null],['Archie Hill','Half Back/Utility','Gold Coast Academy','gcs','Academy'],['Anthony Long','Forward/Midfielder','West Adelaide','ade','NGA'],['Jack Gordon','Midfielder/Half Back','Central District',null,null],['Sam Tassone','Half Back','North Adelaide',null,null],['Harper Banfield','Midfielder/Forward','Claremont','wce','Father-Son'],['Eamon Austin','Small Forward/Midfielder','Bendigo Pioneers',null,null],['Finlay Yeo','Small Forward/Midfielder','East Fremantle','fre','NGA'],['George Dimer','Forward/Midfielder','Sandringham Dragons',null,null],['Billy Wigmore','Tall Utility','Western Jets',null,null],['Kai Parker','Defender/Half Back','Northern Knights',null,null],['Garrison Kenh','Half Back','East Perth','wce','NGA'],['Angus Tippet','Midfielder','Western Jets',null,null],['Charlie Bradford','Key Forward','West Adelaide',null,null],['Lucas Robinson','Midfielder','South Fremantle','fre','NGA'],['Matthew Owen','Midfielder','Brisbane Academy','bri','Academy'],['Will Ekberg','Midfielder','Sturt','ade','NGA'],['Blake Newton','Forward/Midfielder','Murray Bushrangers',null,null],['Sam Gayfer','Key Forward','Northern Knights',null,null],['Seb Marsic','Key Forward','Oakleigh Chargers',null,null],['Flynn Woolhouse','Key Forward','Oakleigh Chargers',null,null],['Clancy Stuart','Midfielder/Forward','Dandenong Stingrays',null,null],['Chas Woodward','Wing/Midfielder','Northern Knights',null,null],['Max Downes','Forward/Midfielder','Northern Knights',null,null],['Charlie Hanegraaf','Midfielder','Geelong Falcons',null,null],['Jack Nelson','Midfielder','Sturt',null,null],['Cain Florance','Midfielder','South Adelaide',null,null],['Harvey Croker','Wing','Glenelg',null,null],['Judd Burgiel','Midfielder','Gippsland Power',null,null],['Thatcher Simmons','Forward/Midfielder','Subiaco',null,null],['Marcus Prasad','Small Forward','Dandenong Stingrays',null,null],['Fletcher Pulleine','Defender/Utility','Geelong Falcons',null,null],['Lachie Burrows','Midfielder','Sandringham Dragons',null,null],['Cooper Hodge','Utility','Brisbane Academy','haw','Father-Son'],['Lachlan McGlade','Small Forward','East Perth','wce','NGA'],['Darcy Harrington','Small Utility','Geelong Falcons',null,null],['Archie Daffy','Forward/Midfielder','Geelong Falcons','ric','Father-Son'],['Jack Bell','Wing/Utility','Bendigo Pioneers',null,null],['Lachie Werts','Small Forward','Sturt',null,null],['Jake Medved','Key Defender','Sydney Academy','syd','Academy'],['Charlie Bovill','Key Utility','Tasmania Devils',null,null],['Archie Fogarty','Tall Utility','Oakleigh Chargers',null,null],['Mitch Stirling','Key Utility','Peel Thunder',null,null],['Cooper White','Key Defender','Dandenong Stingrays',null,null],['Hudson Graham','Key Defender/Wing','South Fremantle',null,null],['Ethan Herbert','Ruck/Forward','South Australia',null,null],['Koby LeCras','Forward','Western Australia',null,null],['Jackson Hewitt','Midfielder','Talent League pathway',null,null],['Gus Kennedy','Midfielder/Defender','Dandenong Stingrays',null,null],['Mason McGroder','Key Defender','Sydney Academy','syd','Academy'],['Henry Meaney','Midfielder','Sydney Academy','syd','Academy'],['Jobe Janeway','Ruck','Glenelg',null,null],['Cody Templeton','Forward/Midfielder','Gippsland Power',null,null],['Wil Malady','Forward/Wing','Gippsland Power',null,null],['Jack Slattery','Key Forward','Woodville-West Torrens',null,null]
  ].map((p,i)=>({rank:i+1,name:p[0],position:p[1],pathway:p[2],tiedClub:p[3],tieType:p[4]}));
  return {
    updated:'11 Oct 2026',
    ownerByPick,byClub,originByPick,
    officialByClub,officialOriginByPick,officialRows,projectedRows,bidSlideCompensations,
    projectionNote:'Projected night-two order assumes Essendon, Richmond, West Coast and North Melbourne satisfy the 2026 bid-slide compensation conditions. Port Adelaide is excluded in this scenario because its natural first-round pick is used to match the Dougie Cochrane bid.',
    displayThrough:44,
    prospects,deficitCap:412
  };
})();

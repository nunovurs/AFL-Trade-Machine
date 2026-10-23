window.ATM_DRAFT_DATA = (() => {
  const officialByClub = {
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
  const officialOriginByPick = {
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
  50:'via Greater Western Sydney - Lachie Whitfield trade (originally Kieren Briggs compensation)',
  59:'via Brisbane - GWS pick swap (tied to Sydney)',
  52:'via North Melbourne - Zane Duursma trade (North Melbourne received from Sydney in Nick Blakey trade; tied to Collingwood)',
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
  const bidSlideCompensations = [
    {afterOfficialPick:21,club:'ess',label:'Essendon bid-slide compensation'},
    {afterOfficialPick:22,club:'ric',label:'Richmond bid-slide compensation'},
    {afterOfficialPick:23,club:'wce',label:'West Coast bid-slide compensation'}
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
    updated:'23 Oct 2026 — AFL verified 115-pick ownership and draft-origin notes',
    ownerByPick,byClub,originByPick,
    officialByClub,officialOriginByPick,officialRows,projectedRows,bidSlideCompensations,
    projectionNote:'Projected night-two order assumes Essendon, Richmond and West Coast satisfy the 2026 bid-slide compensation conditions. North Melbourne is excluded because its natural first-round selection was traded to Sydney. Port Adelaide is excluded in this scenario because its natural first-round pick is used to match the Dougie Cochrane bid.',
    displayThrough:44,
    prospects,deficitCap:412
  };
})();

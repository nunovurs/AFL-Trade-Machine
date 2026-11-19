window.ATM_DRAFT_DATA = (() => {
  const officialByClub = {
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
  21:'via Essendon - Keidean Coleman trade',
  34:'via Adelaide - Luke Pedlar trade',
  45:'via Melbourne - Will McLachlan trade (West Coast / Jack Viney and Trent Rivers trade)',
  43:'tied to Essendon (Adelaide holds the selection)',
  48:'via Port Adelaide - five-club mega deal (tied to Gold Coast)',
  49:'via Melbourne - Zane Duursma trade (tied to Greater Western Sydney)',
  50:'via Greater Western Sydney - Lachie Whitfield trade (originally Kieren Briggs compensation)',
  51:'via North Melbourne - Zane Duursma trade (originally Sydney / Nick Blakey trade; tied to Collingwood)',
  52:'via Brisbane - Western Bulldogs pick swap (tied to Melbourne)',
  56:'tied to Hawthorn (West Coast holds the selection)',
  57:'via Brisbane - GWS pick swap (tied to Sydney)',
  59:'tied to Brisbane (Carlton holds the selection)',
  60:'via Essendon - Jordan Ridley / Jack Bowes trade',
  61:'via Richmond - Nathan O’Driscoll trade',
  63:'via Gold Coast - Scott Pendlebury trade',
  64:'tied to Greater Western Sydney (Collingwood holds the selection)',
  66:'tied to Melbourne (Hawthorn holds the selection)',
  70:'tied to Richmond (Gold Coast holds the selection)',
  71:'via Port Adelaide - five-club mega deal',
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

  // AFL official 20 November night-two order; kept separate from user mock and 11 November baseline.
  const verifiedNightTwoByClub={"ade":[33,44,60,82],"bri":[27,28,29,35],"car":[32,36,51,55,68,81],"col":[31,64,65,66],"ess":[21,26,70,75,78,80],"fre":[41,59,62,69],"gee":[37,56,61],"gcs":[71,73,77],"gws":[46,58],"haw":[30,38,67,74],"mel":[49,52,79],"nm":[34,50,63],"pa":[20,24,47,83],"ric":[23,45,76],"stk":[42],"syd":[39,40,48],"wce":[22,25,57],"wbd":[43,53,54,72]};
  const verifiedNightTwoRows=Object.entries(verifiedNightTwoByClub).flatMap(([owner,picks])=>picks.map(pick=>({pick,owner}))).sort((a,b)=>a.pick-b.pick);
  const verifiedNightTwoSource='https://www.afl.com.au/draft/draft-order';
  const prospects = [
    ['Dougie Cochrane','Utility','Central District','pa','NGA'],['Arki Butler','Midfielder/Forward','Sandringham Dragons',null,null],['Cody Walker','Midfielder','Bendigo Pioneers','car','Father-Son'],['Harry Van Hattum','Ruck','Northern Knights',null,null],['Gus Teixeira','Midfielder','Sandringham Dragons',null,null],['Ethan Drever','Midfielder','GWV Rebels',null,null],['Ethan Matthews','Midfielder','GWS Academy','gws','Academy'],['Leo Steed','Midfielder','Swan Districts',null,null],['Mitchell Harris','Key Defender','Woodville-West Torrens',null,null],['Caylen Murray','Utility','Brisbane Academy','bri','Academy'],
    ['Noah Williams','Midfielder','Geelong Falcons',null,null],['Kodah Edwards','Midfielder/Forward','South Adelaide',null,null],['Heath Mellody','Midfielder/Utility','Claremont',null,null],['Marlon Neocleous','Small Forward/Midfielder','Gippsland Power',null,null],['George Gale','Utility','Claremont',null,null],['Harrison Chapman','Wing/Utility','Eastern Ranges',null,null],['Hugh McCallum','Wing/Utility','Tasmania Devils',null,null],['Clancy Snell','Key Defender','Gippsland Power',null,null],['Jordan Knapp','Midfielder','Eastern Ranges',null,null],['Khaled El Souki','Forward/Midfielder','Western Jets','wbd','NGA'],['Jacob McNicol','Midfielder/Forward','Glenelg',null,null],['Memphis Webb','Midfielder','North Adelaide',null,null],['Gabriel Patterson','Forward/Midfielder','Glenelg',null,null],['Kale Matthews-Hampton','Defender/Half Back','Sturt',null,null],['Jack Pickett','Key Forward','Geelong Falcons',null,null],['Darcy Szerszyn','Defender','Dandenong Stingrays',null,null],['Xavier Ladbrook','Key Utility','Gippsland Power',null,null],['Jackson Phillips','Midfielder','Dandenong Stingrays',null,null],['Archie Van Dyk','Midfielder','South Adelaide',null,null],['Archie Spencer','Midfielder','Eastern Ranges',null,null],['Albert MacGowan','Midfielder/Forward','Sandringham Dragons',null,null],['Ben Carroll','Midfielder','Dandenong Stingrays',null,null],['Tanner Armstrong','Midfielder','Murray Bushrangers','ric','NGA'],['Tyson Bradley','Key Defender','Sandringham Dragons',null,null],['Harvey Spawton-Guy','Key Utility','West Perth',null,null],['Lachlan Hicks','Midfielder/Forward','Western Jets',null,null],['Sam Harris','Midfielder/Forward','Calder Cannons','nm','Father-Son'],['Keenan Boi','Forward/Midfielder','Gippsland Power','haw','NGA'],['Wil Antrobus','Half Back','Dandenong Stingrays',null,null],['Jake Eime','Half Back','Central District',null,null],['Archie Elliott','Forward','GWV Rebels',null,null],['Harvie Cooke','Forward/Midfielder','Northern Knights',null,null],['Toby Krasna','Wing','Northern Knights',null,null],['Blake Justice','Forward/Midfielder','Calder Cannons','ess','NGA'],['Benji Van Rooyen','Ruck/Forward','Claremont',null,null],['Lewis Houndsome','Key Forward/Ruck','Northern Knights',null,null],['Harrison Leeder','Key Forward','Northern Knights',null,null],['Aiden McCartney','Forward','Sydney Academy','nm','Father-Son'],['Harry Franz','Key Defender','Glenelg',null,null],['Mitch Toner','Forward','Dandenong Stingrays',null,null],['Archie Hill','Half Back/Utility','Gold Coast Academy','gcs','Academy'],['Anthony Long','Forward/Midfielder','West Adelaide','ade','NGA'],['Jack Gordon','Midfielder/Half Back','Central District',null,null],['Sam Tassone','Half Back','North Adelaide',null,null],['Harper Banfield','Midfielder/Forward','Claremont','wce','Father-Son'],['Eamon Austin','Small Forward/Midfielder','Bendigo Pioneers',null,null],['Finlay Yeo','Small Forward/Midfielder','East Fremantle','fre','NGA'],['George Dimer','Forward/Midfielder','Sandringham Dragons',null,null],['Billy Wigmore','Tall Utility','Western Jets',null,null],['Kai Parker','Defender/Half Back','Northern Knights',null,null],['Garrison Kenh','Half Back','East Perth','wce','NGA'],['Angus Tippet','Midfielder','Western Jets',null,null],['Charlie Bradford','Key Forward','West Adelaide',null,null],['Lucas Robinson','Midfielder','South Fremantle','fre','NGA'],['Matthew Owen','Midfielder','Brisbane Academy','bri','Academy'],['Will Ekberg','Midfielder','Sturt','ade','NGA'],['Blake Newton','Forward/Midfielder','Murray Bushrangers',null,null],['Sam Gayfer','Key Forward','Northern Knights',null,null],['Seb Marsic','Key Forward','Oakleigh Chargers',null,null],['Flynn Woolhouse','Key Forward','Oakleigh Chargers',null,null],['Clancy Stuart','Midfielder/Forward','Dandenong Stingrays',null,null],['Chas Woodward','Wing/Midfielder','Northern Knights',null,null],['Max Downes','Forward/Midfielder','Northern Knights',null,null],['Charlie Hanegraaf','Midfielder','Geelong Falcons',null,null],['Jack Nelson','Midfielder','Sturt',null,null],['Cain Florance','Midfielder','South Adelaide',null,null],['Harvey Croker','Wing','Glenelg',null,null],['Judd Burgiel','Midfielder','Gippsland Power',null,null],['Thatcher Simmons','Forward/Midfielder','Subiaco',null,null],['Marcus Prasad','Small Forward','Dandenong Stingrays',null,null],['Fletcher Pulleine','Defender/Utility','Geelong Falcons',null,null],['Lachie Burrows','Midfielder','Sandringham Dragons',null,null],['Cooper Hodge','Utility','Brisbane Academy','haw','Father-Son'],['Lachlan McGlade','Small Forward','East Perth','wce','NGA'],['Darcy Harrington','Small Utility','Geelong Falcons',null,null],['Archie Daffy','Forward/Midfielder','Geelong Falcons','ric','Father-Son'],['Jack Bell','Wing/Utility','Bendigo Pioneers',null,null],['Lachie Werts','Small Forward','Sturt',null,null],['Jake Medved','Key Defender','Sydney Academy','syd','Academy'],['Charlie Bovill','Key Utility','Tasmania Devils',null,null],['Archie Fogarty','Tall Utility','Oakleigh Chargers',null,null],['Mitch Stirling','Key Utility','Peel Thunder',null,null],['Cooper White','Key Defender','Dandenong Stingrays',null,null],['Hudson Graham','Key Defender/Wing','South Fremantle',null,null],['Ethan Herbert','Ruck/Forward','South Australia',null,null],['Koby LeCras','Forward','Western Australia',null,null],['Jackson Hewitt','Midfielder','Talent League pathway',null,null],['Gus Kennedy','Midfielder/Defender','Dandenong Stingrays',null,null],['Mason McGroder','Key Defender','Sydney Academy','syd','Academy'],['Henry Meaney','Midfielder','Sydney Academy','syd','Academy'],['Jobe Janeway','Ruck','Glenelg',null,null],['Cody Templeton','Forward/Midfielder','Gippsland Power',null,null],['Wil Malady','Forward/Wing','Gippsland Power',null,null],['Jack Slattery','Key Forward','Woodville-West Torrens',null,null],
    ["Sam Devers","Defender / Half Back","Eastern Ranges",null,null],
    ["Brady Wright","Key Forward","Werribee (VFL)",null,null],
    ["Zac Antonellos","Forward","Eastern Ranges",null,null],
    ["Oliver Bartal","Key Defender","Sandringham Dragons",null,null],
    ["Tom Brown","Key Defender","Claremont",null,null],
    ["Tate Hodgson","Key Defender","Northern Knights",null,null],
    ["Kane Johnston","Key Forward","Perth (WAFL)",null,null],
    ["Jackson O'Brien","Ruck","GWV Rebels",null,null],
    ["Andrio Sousa","Midfielder","Dandenong Stingrays",null,null],
    ["Angus White","Midfielder","South Adelaide",null,null],
    ["Jasper Williams","Key Defender","Sandringham Dragons",null,null],
    ["Reece Thompson","Key Forward","Brisbane Academy",null,null],
    ["Sonny Smiler","Forward","Northern Territory Academy",null,null],
    ["Zach Stevens","Forward","Geelong (VFL)",null,null],
    ["Brodie Wilson","Forward","Eastern Ranges",null,null],
    ["Charlie Nash","Key Defender","Eastern Ranges",null,null],
    ["Jackson Watkins","Midfielder","Calder Cannons",null,null],
    ["Jack Leys","Midfielder","Woodville-West Torrens",null,null],
    ["Klay Nicholls","Key Defender","GWV Rebels",null,null],
    ["Cameron Maynard","Forward","South Fremantle",null,null],
    ["Jake Soutar","Defender / Intercept Back","East Perth (WAFL)",null,null]
  ].map((p,i)=>({rank:i+1,name:p[0],position:p[1],pathway:p[2],tiedClub:p[3],tieType:p[4]}));
  return {
    updated:'11 Nov 2026 — AFL final 80-pick draft order and ownership; conditional bid-slide projections separate',
    ownerByPick,byClub,originByPick,
    officialByClub,officialOriginByPick,officialRows,projectedRows,bidSlideCompensations,
    verifiedNightTwoByClub,verifiedNightTwoRows,verifiedNightTwoSource,
    projectionNote:'Projected night-two order assumes Essendon, Richmond and West Coast satisfy the 2026 bid-slide compensation conditions. North Melbourne is excluded because its natural first-round selection was traded to Sydney. Port Adelaide is excluded in this scenario because its natural first-round pick is used to match the Dougie Cochrane bid.',
    displayThrough:44,
    // Completed 19 November draft-night trades; reported pick identifiers are as published at the time.
    // This ledger does not replace the pre-draft ownership baseline or user mock assumptions.
    confirmedDraftNightTrades:[
      {clubs:['GWS','Port Adelaide'],details:"GWS received pick 12; Port Adelaide received pick 26 and 2027 and 2028 second-round selections",confirmedOn:'2026-11-19',source:'https://www.foxsports.com.au/en-AU/news/australian-rules/afl-draft-tracker-2026-every-pick-and-trade-full-order-dvi-points/1vtjh1vbvstv9161hzxfd8sz4p'},
      {clubs:['GWS','Port Adelaide'],details:"GWS received a 2027 second-round selection; Port Adelaide received pick 20",confirmedOn:'2026-11-19',source:'https://www.foxsports.com.au/en-AU/news/australian-rules/afl-draft-tracker-2026-every-pick-and-trade-full-order-dvi-points/1vtjh1vbvstv9161hzxfd8sz4p'},
      {clubs:['Adelaide','Carlton'],details:"Adelaide received picks 13 and 58; Carlton received picks 15, 34 and 53",confirmedOn:'2026-11-19',source:'https://www.foxsports.com.au/en-AU/news/australian-rules/afl-draft-tracker-2026-every-pick-and-trade-full-order-dvi-points/1vtjh1vbvstv9161hzxfd8sz4p'},
      {clubs:['Gold Coast','GWS'],details:"Gold Coast received pick 10 and a 2028 third-round selection; GWS received pick 9",confirmedOn:'2026-11-19',source:'https://www.foxsports.com.au/en-AU/news/australian-rules/afl-draft-tracker-2026-every-pick-and-trade-full-order-dvi-points/1vtjh1vbvstv9161hzxfd8sz4p'},
      {clubs:['GWS','Sydney'],details:"GWS received pick 8; Sydney received pick 9 and a 2028 third-round selection",confirmedOn:'2026-11-19',source:'https://www.foxsports.com.au/en-AU/news/australian-rules/afl-draft-tracker-2026-every-pick-and-trade-full-order-dvi-points/1vtjh1vbvstv9161hzxfd8sz4p'},
      {clubs:['Brisbane','GWS'],details:"Brisbane received a 2027 second-round selection; GWS received pick 43 and a 2028 third-round selection",confirmedOn:'2026-11-19',source:'https://www.foxsports.com.au/en-AU/news/australian-rules/afl-draft-tracker-2026-every-pick-and-trade-full-order-dvi-points/1vtjh1vbvstv9161hzxfd8sz4p'},
      {clubs:['Brisbane','Port Adelaide'],details:"Brisbane received picks 24 and 32; Port Adelaide received pick 20",confirmedOn:'2026-11-19',source:'https://www.foxsports.com.au/en-AU/news/australian-rules/afl-draft-tracker-2026-every-pick-and-trade-full-order-dvi-points/1vtjh1vbvstv9161hzxfd8sz4p'}
    ],
    // Confirmed post-night-one order for 20 November, separate from the 11 November baseline and user mock.
    // These are current scheduled pick holders, not completed night-two player selections.
    liveNightTwoOrderUpdated:'2026-11-20',
    liveNightTwoOrderSource:'https://www.foxsports.com.au/en-AU/news/australian-rules/afl-draft-tracker-2026-every-pick-and-trade-full-order-dvi-points/1vtjh1vbvstv9161hzxfd8sz4p',
    liveNightTwoOrder:[{"pick":20,"club":"pa"},{"pick":21,"club":"wce"},{"pick":22,"club":"pa"},{"pick":23,"club":"ess"},{"pick":24,"club":"bri"},{"pick":25,"club":"bri"},{"pick":26,"club":"bri"},{"pick":27,"club":"haw"},{"pick":28,"club":"col"},{"pick":29,"club":"car"},{"pick":30,"club":"ade"},{"pick":31,"club":"nm"},{"pick":32,"club":"bri"},{"pick":33,"club":"car"},{"pick":34,"club":"gee"},{"pick":35,"club":"haw"},{"pick":36,"club":"syd"},{"pick":37,"club":"syd"},{"pick":38,"club":"fre"},{"pick":39,"club":"stk"},{"pick":40,"club":"wbd"},{"pick":41,"club":"ade"},{"pick":42,"club":"ric"},{"pick":43,"club":"gws"},{"pick":44,"club":"pa"},{"pick":45,"club":"syd"},{"pick":46,"club":"mel"},{"pick":47,"club":"nm"},{"pick":48,"club":"car"},{"pick":49,"club":"mel"},{"pick":50,"club":"wbd"},{"pick":51,"club":"wbd"},{"pick":52,"club":"car"},{"pick":53,"club":"gee"},{"pick":54,"club":"wce"},{"pick":55,"club":"gws"},{"pick":56,"club":"fre"},{"pick":57,"club":"ade"},{"pick":58,"club":"gee"},{"pick":59,"club":"fre"},{"pick":60,"club":"nm"},{"pick":61,"club":"col"},{"pick":62,"club":"col"},{"pick":63,"club":"col"},{"pick":64,"club":"haw"},{"pick":65,"club":"car"},{"pick":66,"club":"fre"},{"pick":67,"club":"ess"},{"pick":68,"club":"gcs"},{"pick":69,"club":"wbd"},{"pick":70,"club":"gcs"},{"pick":71,"club":"haw"},{"pick":72,"club":"ess"},{"pick":73,"club":"ric"},{"pick":74,"club":"gcs"},{"pick":75,"club":"ess"},{"pick":76,"club":"mel"},{"pick":77,"club":"ess"},{"pick":78,"club":"car"},{"pick":79,"club":"ade"},{"pick":80,"club":"pa"}],
    // Confirmed AFL draft-night selections, independent of user mock predictions.
    confirmedDraftSelections:[
      {pick:1,club:'pa',player:'Dougie Cochrane',mechanism:'Essendon bid matched by Port Adelaide',confirmedOn:'2026-11-19',source:'https://www.afl.com.au/news/1642128/power-play-port-adelaide-lands-nga-talent-dougie-cochrane-as-clubs-first-ever-no1-pick'},
      {pick:2,club:'ess',player:'Ethan Drever',mechanism:'open selection',confirmedOn:'2026-11-19',source:'https://www.afl.com.au/news/1642063/draft-night-live-every-pick-the-best-analysis-from-645pm-aedt'},
      {pick:3,club:'car',player:'Cody Walker',mechanism:'Richmond father-son bid matched by Carlton',confirmedOn:'2026-11-19',source:'https://www.abc.net.au/news/2026-11-19/afl-draft-night-one-live-blog-cocrane-drever-walker-butler/107405924'},
      {pick:4,club:'ric',player:'Arki Butler',mechanism:'open selection',confirmedOn:'2026-11-19',source:'https://www.abc.net.au/news/2026-11-19/afl-draft-night-one-live-blog-cocrane-drever-walker-butler/107405924'},
      {pick:5,club:'wce',player:'Heath Mellody',mechanism:'open selection',confirmedOn:'2026-11-19',source:'https://www.abc.net.au/news/2026-11-19/afl-draft-night-one-live-blog-cocrane-drever-walker-butler/107405924'},
      {pick:6,club:'gws',player:'Ethan Matthews',mechanism:'Melbourne Academy bid matched by GWS',confirmedOn:'2026-11-19',source:'https://www.abc.net.au/news/2026-11-19/afl-draft-night-one-live-blog-cocrane-drever-walker-butler/107405924'},
      {pick:7,club:'mel',player:'Mitch Harris',mechanism:'open selection',confirmedOn:'2026-11-19',source:'https://www.abc.net.au/news/2026-11-19/afl-draft-night-one-live-blog-cocrane-drever-walker-butler/107405924'},
      {pick:8,club:'ric',player:'Harry Van Hattum',mechanism:'open selection',confirmedOn:'2026-11-19',source:'https://www.abc.net.au/news/2026-11-19/afl-draft-night-one-live-blog-cocrane-drever-walker-butler/107405924'},
      {pick:9,club:'syd',player:'Caylen Murray',mechanism:'Sydney bid on Brisbane Academy player; Brisbane did not match',confirmedOn:'2026-11-19',source:'https://www.abc.net.au/news/2026-11-19/afl-draft-night-one-live-blog-cocrane-drever-walker-butler/107405924'},
      {pick:10,club:'gcs',player:'Leo Steed',mechanism:'open selection',confirmedOn:'2026-11-19',source:'https://www.abc.net.au/news/2026-11-19/afl-draft-night-one-live-blog-cocrane-drever-walker-butler/107405924'},
      {pick:11,club:'stk',player:'Gustavo Teixeira',mechanism:'open selection',confirmedOn:'2026-11-19',source:'https://www.abc.net.au/news/2026-11-19/afl-draft-night-one-live-blog-cocrane-drever-walker-butler/107405924'},
      {pick:12,club:'col',player:'Sam Gayfer',mechanism:'open selection',confirmedOn:'2026-11-19',source:'https://www.abc.net.au/news/2026-11-19/afl-draft-night-one-live-blog-cocrane-drever-walker-butler/107405924'},
      {pick:13,club:'gws',player:'Jake Eime',mechanism:'open selection',confirmedOn:'2026-11-19',source:'https://www.abc.net.au/news/2026-11-19/afl-draft-night-one-live-blog-cocrane-drever-walker-butler/107405924'},
      {pick:14,club:'ade',player:'Toby Krasna',mechanism:'open selection; Adelaide acquired pick from Carlton in draft-night trade',confirmedOn:'2026-11-19',source:'https://www.abc.net.au/news/2026-11-19/afl-draft-night-one-live-blog-cocrane-drever-walker-butler/107405924'},
      {pick:15,club:'mel',player:'Lachie Burrows',mechanism:'open selection',confirmedOn:'2026-11-19',source:'https://www.abc.net.au/news/2026-11-19/afl-draft-night-one-live-blog-cocrane-drever-walker-butler/107405924'},
      {pick:16,club:'stk',player:'Tyson Bradley',mechanism:'open selection',confirmedOn:'2026-11-19',source:'https://www.abc.net.au/news/2026-11-19/afl-draft-night-one-live-blog-cocrane-drever-walker-butler/107405924'},
      {pick:17,club:'ess',player:'Archie Elliott',mechanism:'open selection',confirmedOn:'2026-11-19',source:'https://www.abc.net.au/news/2026-11-19/afl-draft-night-one-live-blog-cocrane-drever-walker-butler/107405924'},
      {pick:18,club:'fre',player:'George Dimer',mechanism:'open selection',confirmedOn:'2026-11-19',source:'https://www.abc.net.au/news/2026-11-19/afl-draft-night-one-live-blog-cocrane-drever-walker-butler/107405924'},
      {pick:19,club:'pa',player:'Clancy Snell',mechanism:'open selection',confirmedOn:'2026-11-19',source:'https://www.abc.net.au/news/2026-11-19/afl-draft-night-one-live-blog-cocrane-drever-walker-butler/107405924'}
    ],
    prospects,deficitCap:412
  };
})();

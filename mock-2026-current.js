(() => {
  const P=window.ATM_PLAYER_PROFILES||{};
  const fill=(name,data)=>{P[name]={...(P[name]||{}),...data};};
  const ph='assets/player-placeholder.svg';

  fill('Dougie Cochrane',{why:'Port Adelaide match Essendon’s opening bid because Cochrane is their NGA prospect and a genuine top-end talent.'});
  fill('Cody Walker',{why:'Carlton match the father-son bid and add a dynamic foundation player for their next era.'});
  fill('Arki Butler',{why:'Essendon take the explosive forward/midfielder with their first open-pool selection.'});
  fill('Harry Van Hattum',{why:'Richmond prioritise the draft’s standout ruck/forward physical profile and long-term upside.'});
  fill('Ethan Drever',{why:'West Coast use their retained top-end selection on midfield power, burst and a player who can turn stoppage wins into attack.'});
  fill('Gus Teixeira',{why:'North Melbourne add speed, polish and forward-half damage rather than another pure accumulator.'});
  fill('Heath Mellody',{why:'Melbourne use the Gold Coast-origin first-round selection they already hold to add a high-end runner and creator.'});
  fill('Caylen Murray',{why:'The player remains at this numbered mock slot; the club attached to the slot now follows the current draft order. Brisbane Academy access is shown separately.',tiedClub:'bri',tieType:'Brisbane Academy'});
  fill('Ethan Matthews',{why:'GWS add one of their own Academy midfielders to the next generation of the engine room.'});
  fill('Clancy Snell',{why:'St Kilda add a long-term key defender with mature-body/VFL exposure.'});
  fill('Mitchell Harris',{why:'Collingwood invest in a long-term key-defensive option with genuine size and upside.'});
  fill('George Gale',{why:'Melbourne use their retained natural first-round selection on a versatile prospect with upside.'});
  fill('Kodah Edwards',{why:'Adelaide keep the South Australian captain and add leadership, competitiveness and scoreboard impact.'});
  fill('Albert MacGowan',{why:'Geelong add another versatile midfielder/forward to their next-generation midfield mix.'});
  fill('Tyson Bradley',{why:'The player remains at this numbered mock slot while club ownership now follows the current draft order.'});
  fill('Harrison Chapman',{why:'Brisbane add an athletic defender/wing who can defend different types, intercept and break lines.'});
  fill('Jake Eime',{why:'The player remains at this numbered mock slot while club ownership now follows the current draft order.'});

  fill('Sam Gayfer',{
    height:'—',weight:'—',position:'Key Forward',pathway:'Northern Knights',state:'Victoria Metro',comparison:'—',
    description:'A genuine tall-forward option who gives clubs a different list-building choice from the heavy run of midfielders and flankers in this range.',
    why:'Essendon use this selection to add a developing key-forward option to the next list cycle.',photo:ph,watch:'https://www.youtube.com/results?search_query=Sam+Gayfer+Footy+Stuff'
  });
  fill('Darcy Szerszyn',{
    height:'—',weight:'—',position:'Defender',pathway:'Dandenong Stingrays',state:'Victoria Country',comparison:'—',
    description:'A defender in the national draft mix who gives clubs intercept and rebounding depth rather than another pure midfielder.',
    why:'Essendon continue balancing the haul with another defensive prospect.',photo:ph,watch:'https://www.youtube.com/results?search_query=Darcy+Szerszyn+Footy+Stuff'
  });
  fill('Cody Templeton',{
    height:'—',weight:'—',position:'Forward / Midfielder',pathway:'Gippsland Power',state:'Victoria Country',comparison:'—',
    description:'A forward/midfielder from Gippsland who offers another attacking option in the middle section of the draft.',
    why:'Collingwood add forward-half flexibility and another player who can rotate through the midfield.',photo:ph,watch:'https://www.youtube.com/results?search_query=Cody+Templeton+Footy+Stuff'
  });
  fill('Xavier Ladbrook',{
    height:'201cm',weight:'—',position:'Key Forward / Key Utility',pathway:'Gippsland Power / Nar Nar Goon',state:'Victoria Country',comparison:'—',
    description:'A 201cm athletic tall with running power and the flexibility to develop at either end of the ground.',
    why:'GWS add size, mobility and positional flexibility to their young key-position stocks.',photo:ph,watch:'https://www.youtube.com/results?search_query=Xavier+Ladbrook+Footy+Stuff'
  });
  fill('Wil Malady',{
    height:'—',weight:'—',position:'Forward / Wing',pathway:'Gippsland Power',state:'Victoria Country',comparison:'—',
    description:'A dangerous attacking prospect with speed, aerial impact and the ability to influence the scoreboard.',
    why:'Port Adelaide add another point-of-difference forward/wing after investing heavily in their top-end talent.',photo:ph,watch:'https://www.youtube.com/results?search_query=Wil+Malady+Footy+Stuff'
  });
  fill('Jack Slattery',{
    height:'—',weight:'—',position:'Key Forward',pathway:'Woodville-West Torrens',state:'South Australia',comparison:'—',
    description:'A South Australian tall-forward prospect who gives clubs a developmental marking target later in the draft.',
    why:'Geelong add another developing tall forward to keep refreshing their key-position depth.',photo:ph,watch:'https://www.youtube.com/results?search_query=Jack+Slattery+Footy+Stuff'
  });
  fill('Hugh McCallum',{
    height:'—',weight:'—',position:'Wing / Utility',pathway:'Tasmania Devils',state:'Tasmania',comparison:'—',
    description:'An outside-running utility who offers a different mix of movement and ground coverage from the inside-heavy midfield prospects.',
    why:'Brisbane add outside run and positional flexibility with their later selection.',photo:ph,watch:'https://www.youtube.com/results?search_query=Hugh+McCallum+Footy+Stuff'
  });
  fill('Jordan Knapp',{
    height:'—',weight:'—',position:'Midfielder',pathway:'Eastern Ranges',state:'Victoria Metro',comparison:'—',
    description:'A midfielder who remains in the strong next group after the first wave of top-end prospects has gone.',
    why:'Richmond continue building midfield depth with another genuine on-ball prospect.',photo:ph,watch:'https://www.youtube.com/results?search_query=Jordan+Knapp+Footy+Stuff'
  });

  // 25 October 2026 user's latest 41-pick board. Earlier scouting descriptions are retained;
  // older club-fit explanations are refreshed to match the new destinations.
  fill("Dougie Cochrane",{why:"Port Adelaide select Dougie Cochrane with pick 1 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Dougie Cochrane"]?.photo||ph});
  fill("Harry Van Hattum",{why:"Essendon select Harry Van Hattum with pick 2 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Harry Van Hattum"]?.photo||ph});
  fill("Cody Walker",{why:"Carlton select Cody Walker with pick 3 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Cody Walker"]?.photo||ph});
  fill("Ethan Drever",{why:"Richmond select Ethan Drever with pick 4 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Ethan Drever"]?.photo||ph});
  fill("Heath Mellody",{why:"West Coast select Heath Mellody with pick 5 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Heath Mellody"]?.photo||ph});
  fill("Arki Butler",{why:"Melbourne select Arki Butler with pick 6 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Arki Butler"]?.photo||ph});
  fill("Gus Teixeira",{why:"Richmond select Gus Teixeira with pick 7 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Gus Teixeira"]?.photo||ph});
  fill("Ethan Matthews",{why:"GWS select Ethan Matthews with pick 8 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Ethan Matthews"]?.photo||ph});
  fill("Mitchell Harris",{why:"Sydney select Mitchell Harris with pick 9 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Mitchell Harris"]?.photo||ph});
  fill("Caylen Murray",{why:"Brisbane select Caylen Murray with pick 10 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Caylen Murray"]?.photo||ph});
  fill("Tyson Bradley",{why:"Gold Coast select Tyson Bradley with pick 11 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Tyson Bradley"]?.photo||ph});
  fill("Clancy Snell",{why:"St Kilda select Clancy Snell with pick 12 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Clancy Snell"]?.photo||ph});
  fill("Sam Gayfer",{why:"Collingwood select Sam Gayfer with pick 13 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Sam Gayfer"]?.photo||ph});
  fill("George Gale",{why:"Melbourne select George Gale with pick 14 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["George Gale"]?.photo||ph});
  fill("Jake Eime",{why:"Adelaide select Jake Eime with pick 15 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Jake Eime"]?.photo||ph});
  fill("Harrison Chapman",{why:"St Kilda select Harrison Chapman with pick 16 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Harrison Chapman"]?.photo||ph});
  fill("Harvie Cooke",{why:"Essendon select Harvie Cooke with pick 17 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Harvie Cooke"]?.photo||ph});
  fill("Leo Steed",{why:"Fremantle select Leo Steed with pick 18 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Leo Steed"]?.photo||ph});
  fill("Xavier Ladbrook",{why:"Essendon select Xavier Ladbrook with pick 19 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Xavier Ladbrook"]?.photo||ph});
  fill("Kodah Edwards",{why:"Port Adelaide select Kodah Edwards with pick 20 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Kodah Edwards"]?.photo||ph});
  fill("Billy Wigmore",{why:"Richmond select Billy Wigmore with pick 21 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Billy Wigmore"]?.photo||ph});
  fill("Jake Soutar",{why:"West Coast select Jake Soutar with pick 22 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Jake Soutar"]?.photo||ph});
  fill("Koby LeCras",{why:"West Coast select Koby LeCras with pick 23 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Koby LeCras"]?.photo||ph});
  fill("Archie Van Dyk",{why:"Port Adelaide select Archie Van Dyk with pick 24 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Archie Van Dyk"]?.photo||ph});
  fill("Blake Justice",{why:"Essendon select Blake Justice with pick 25 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Blake Justice"]?.photo||ph});
  fill("Mason McGroder",{why:"Sydney select Mason McGroder with pick 26 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Mason McGroder"]?.photo||ph});
  fill("Lachie Burrows",{why:"GWS select Lachie Burrows with pick 27 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Lachie Burrows"]?.photo||ph});
  fill("Khaled El Souki",{why:"Western Bulldogs select Khaled El Souki with pick 28 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Khaled El Souki"]?.photo||ph});
  fill("Cooper Hodge",{why:"Hawthorn select Cooper Hodge with pick 29 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Cooper Hodge"]?.photo||ph});
  fill("Albert MacGowan",{why:"Brisbane select Albert MacGowan with pick 30 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Albert MacGowan"]?.photo||ph});
  fill("Bright",{why:"Collingwood select Bright with pick 31 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Bright"]?.photo||ph});
  fill("Jackson Hewitt",{why:"Carlton select Jackson Hewitt with pick 32 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Jackson Hewitt"]?.photo||ph});
  fill("Jack Slattery",{why:"Adelaide select Jack Slattery with pick 33 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Jack Slattery"]?.photo||ph});
  fill("Gus Kennedy",{why:"North Melbourne select Gus Kennedy with pick 34 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Gus Kennedy"]?.photo||ph});
  fill("Ethan Herbert",{why:"Port Adelaide select Ethan Herbert with pick 35 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Ethan Herbert"]?.photo||ph});
  fill("Harry Franz",{why:"Adelaide select Harry Franz with pick 36 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Harry Franz"]?.photo||ph});
  fill("Noah Williams",{why:"Geelong select Noah Williams with pick 37 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Noah Williams"]?.photo||ph});
  fill("Harvey Spawton-Guy",{why:"Fremantle select Harvey Spawton-Guy with pick 38 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Harvey Spawton-Guy"]?.photo||ph});
  fill("Jack Pickett",{why:"St Kilda select Jack Pickett with pick 39 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Jack Pickett"]?.photo||ph});
  fill("Gabriel Patterson",{why:"Adelaide select Gabriel Patterson with pick 40 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Gabriel Patterson"]?.photo||ph});
  fill("Toby Krasna",{why:"Richmond select Toby Krasna with pick 41 in the user's 2026 mock draft. This is a projected club-player pairing, not an official selection.",photo:P["Toby Krasna"]?.photo||ph});

  const board=[
  {
    "pick": 1,
    "clubId": "pa",
    "player": "Dougie Cochrane",
    "path": "Port Adelaide — matched NGA bid",
    "mechanism": "MATCHED NGA BID • Port Adelaide match Essendon's Pick 1 bid for Cochrane. Final bid-payment picks, deficits and residual picks are provisional."
  },
  {
    "pick": 2,
    "clubId": "ess",
    "player": "Harry Van Hattum",
    "path": "Essendon",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 3,
    "clubId": "car",
    "player": "Cody Walker",
    "path": "Carlton — matched father-son bid",
    "mechanism": "MATCHED FATHER-SON BID • Carlton match a Pick 3 father-son bid on Walker; the bidding club has not been specified. Final bid-payment picks, deficits and residual picks are provisional."
  },
  {
    "pick": 4,
    "clubId": "ric",
    "player": "Ethan Drever",
    "path": "Richmond",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 5,
    "clubId": "wce",
    "player": "Heath Mellody",
    "path": "West Coast",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 6,
    "clubId": "mel",
    "player": "Arki Butler",
    "path": "Melbourne",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 7,
    "clubId": "ric",
    "player": "Gus Teixeira",
    "path": "Richmond",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 8,
    "clubId": "gws",
    "player": "Ethan Matthews",
    "path": "GWS — matched Academy bid",
    "mechanism": "MATCHED ACADEMY BID • GWS match Sydney's Pick 8 bid for Ethan Matthews. Final bid-payment picks, deficits and residual picks are provisional."
  },
  {
    "pick": 9,
    "clubId": "syd",
    "player": "Mitchell Harris",
    "path": "Sydney",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 10,
    "clubId": "bri",
    "player": "Caylen Murray",
    "path": "Brisbane — matched Academy bid",
    "mechanism": "MATCHED ACADEMY BID • Brisbane match Gold Coast's Pick 10 bid for Caylen Murray. Final bid-payment picks, deficits and residual picks are provisional."
  },
  {
    "pick": 11,
    "clubId": "gcs",
    "player": "Tyson Bradley",
    "path": "Gold Coast",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 12,
    "clubId": "stk",
    "player": "Clancy Snell",
    "path": "St Kilda",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 13,
    "clubId": "col",
    "player": "Sam Gayfer",
    "path": "Collingwood",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 14,
    "clubId": "mel",
    "player": "George Gale",
    "path": "Melbourne",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 15,
    "clubId": "ade",
    "player": "Jake Eime",
    "path": "Adelaide",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 16,
    "clubId": "stk",
    "player": "Harrison Chapman",
    "path": "St Kilda",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 17,
    "clubId": "ess",
    "player": "Harvie Cooke",
    "path": "Essendon",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 18,
    "clubId": "fre",
    "player": "Leo Steed",
    "path": "Fremantle",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 19,
    "clubId": "ess",
    "player": "Xavier Ladbrook",
    "path": "Essendon — projected bid-slide compensation",
    "mechanism": "PROJECTED COMPENSATION • Essendon bid-slide compensation (assumed). Exact allocation depends on AFL bid-slide rules and live asset movements."
  },
  {
    "pick": 20,
    "clubId": "pa",
    "player": "Kodah Edwards",
    "path": "Port Adelaide",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 21,
    "clubId": "ric",
    "player": "Billy Wigmore",
    "path": "Richmond — projected bid-slide compensation",
    "mechanism": "PROJECTED COMPENSATION • Richmond bid-slide compensation (assumed). Exact allocation depends on AFL bid-slide rules and live asset movements."
  },
  {
    "pick": 22,
    "clubId": "wce",
    "player": "Jake Soutar",
    "path": "West Coast",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 23,
    "clubId": "wce",
    "player": "Koby LeCras",
    "path": "West Coast — projected bid-slide compensation",
    "mechanism": "PROJECTED COMPENSATION • West Coast bid-slide compensation (assumed). Exact allocation depends on AFL bid-slide rules and live asset movements."
  },
  {
    "pick": 24,
    "clubId": "pa",
    "player": "Archie Van Dyk",
    "path": "Port Adelaide",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 25,
    "clubId": "ess",
    "player": "Blake Justice",
    "path": "Essendon",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 26,
    "clubId": "syd",
    "player": "Mason McGroder",
    "path": "Sydney — matched Academy bid",
    "mechanism": "MATCHED ACADEMY BID • Sydney match the Pick 26 bid from GWS for Mason McGroder; Sydney are assumed to trade for sufficient points. Final bid-payment picks, deficits and residual picks are provisional."
  },
  {
    "pick": 27,
    "clubId": "gws",
    "player": "Lachie Burrows",
    "path": "GWS",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 28,
    "clubId": "wbd",
    "player": "Khaled El Souki",
    "path": "Western Bulldogs — matched NGA bid",
    "mechanism": "MATCHED NGA BID • Western Bulldogs match the Pick 28 NGA bid for Khaled El Souki; bidding club not yet nominated. Final bid-payment picks, deficits and residual picks are provisional."
  },
  {
    "pick": 29,
    "clubId": "haw",
    "player": "Cooper Hodge",
    "path": "Hawthorn — matched father-son bid",
    "mechanism": "MATCHED FATHER-SON BID • Hawthorn match Brisbane's Pick 29 father-son bid for Cooper Hodge. Final bid-payment picks, deficits and residual picks are provisional."
  },
  {
    "pick": 30,
    "clubId": "bri",
    "player": "Albert MacGowan",
    "path": "Brisbane",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 31,
    "clubId": "col",
    "player": "Bright",
    "path": "Collingwood",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 32,
    "clubId": "car",
    "player": "Jackson Hewitt",
    "path": "Carlton",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 33,
    "clubId": "ade",
    "player": "Jack Slattery",
    "path": "Adelaide",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 34,
    "clubId": "nm",
    "player": "Gus Kennedy",
    "path": "North Melbourne",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 35,
    "clubId": "pa",
    "player": "Ethan Herbert",
    "path": "Port Adelaide",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 36,
    "clubId": "ade",
    "player": "Harry Franz",
    "path": "Adelaide",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 37,
    "clubId": "gee",
    "player": "Noah Williams",
    "path": "Geelong",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 38,
    "clubId": "fre",
    "player": "Harvey Spawton-Guy",
    "path": "Fremantle",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 39,
    "clubId": "stk",
    "player": "Jack Pickett",
    "path": "St Kilda",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 40,
    "clubId": "ade",
    "player": "Gabriel Patterson",
    "path": "Adelaide",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  },
  {
    "pick": 41,
    "clubId": "ric",
    "player": "Toby Krasna",
    "path": "Richmond",
    "mechanism": "MOCK SELECTION • User's projected club and player; any required live trades or pick movements are assumed, not confirmed."
  }
];

  const events=[
  {
    "afterPick": 1,
    "player": "Dougie Cochrane",
    "clubId": "pa",
    "title": "PICK 1 — DOUGIE COCHRANE BID MATCH",
    "detail": "Port Adelaide match Essendon's Pick 1 bid for Cochrane. The draft board shows the user's intended selected-player sequence; exact payments and live residual picks are not presented as confirmed."
  },
  {
    "afterPick": 3,
    "player": "Cody Walker",
    "clubId": "car",
    "title": "PICK 3 — CODY WALKER BID MATCH",
    "detail": "Carlton match a Pick 3 father-son bid on Walker; the bidding club has not been specified. The draft board shows the user's intended selected-player sequence; exact payments and live residual picks are not presented as confirmed."
  },
  {
    "afterPick": 8,
    "player": "Ethan Matthews",
    "clubId": "gws",
    "title": "PICK 8 — ETHAN MATTHEWS BID MATCH",
    "detail": "GWS match Sydney's Pick 8 bid for Ethan Matthews. The draft board shows the user's intended selected-player sequence; exact payments and live residual picks are not presented as confirmed."
  },
  {
    "afterPick": 10,
    "player": "Caylen Murray",
    "clubId": "bri",
    "title": "PICK 10 — CAYLEN MURRAY BID MATCH",
    "detail": "Brisbane match Gold Coast's Pick 10 bid for Caylen Murray. The draft board shows the user's intended selected-player sequence; exact payments and live residual picks are not presented as confirmed."
  },
  {
    "afterPick": 26,
    "player": "Mason McGroder",
    "clubId": "syd",
    "title": "PICK 26 — MASON MCGRODER BID MATCH",
    "detail": "Sydney match the Pick 26 bid from GWS for Mason McGroder; Sydney are assumed to trade for sufficient points. The draft board shows the user's intended selected-player sequence; exact payments and live residual picks are not presented as confirmed."
  },
  {
    "afterPick": 28,
    "player": "Khaled El Souki",
    "clubId": "wbd",
    "title": "PICK 28 — KHALED EL SOUKI BID MATCH",
    "detail": "Western Bulldogs match the Pick 28 NGA bid for Khaled El Souki; bidding club not yet nominated. The draft board shows the user's intended selected-player sequence; exact payments and live residual picks are not presented as confirmed."
  },
  {
    "afterPick": 29,
    "player": "Cooper Hodge",
    "clubId": "haw",
    "title": "PICK 29 — COOPER HODGE BID MATCH",
    "detail": "Hawthorn match Brisbane's Pick 29 father-son bid for Cooper Hodge. The draft board shows the user's intended selected-player sequence; exact payments and live residual picks are not presented as confirmed."
  }
];

  const assetLedger={
  "updated": "25 Oct 2026",
  "assumptions": [
    "41 selections are the user's nominated 2026 mock (25 October 2026), not the officially finalised AFL selection order.",
    "Matched bids: Cochrane (Essendon → Port Adelaide), Walker (Carlton match at 3; bidder unspecified), Matthews (Sydney → GWS), Murray (Gold Coast → Brisbane), McGroder (GWS → Sydney), El Souki (Bulldogs match; bidder unspecified), Hodge (Brisbane → Hawthorn).",
    "Sydney are assumed to acquire adequate matching points for McGroder before the Pick 26 bid.",
    "Essendon Pick 19, Richmond Pick 21 and West Coast Pick 23 are modelled as projected bid-slide compensation; exact eligibility and placement are unverified.",
    "All other pick paths and compensation adjustments are illustrative only. This board does not claim to be a fully reconciled, bid-point-balanced official draft ledger.",
    "Bright is retained as supplied until the player's first name is confirmed."
  ],
  "rows": [
    {
      "pick": 1,
      "clubId": "pa",
      "origin": "Dougie Cochrane matched bid",
      "status": "BID",
      "detail": "Port Adelaide match Essendon's Pick 1 bid for Cochrane."
    },
    {
      "pick": 2,
      "clubId": "ess",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 3,
      "clubId": "car",
      "origin": "Cody Walker matched bid",
      "status": "BID",
      "detail": "Carlton match a Pick 3 father-son bid on Walker; the bidding club has not been specified."
    },
    {
      "pick": 4,
      "clubId": "ric",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 5,
      "clubId": "wce",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 6,
      "clubId": "mel",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 7,
      "clubId": "ric",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 8,
      "clubId": "gws",
      "origin": "Ethan Matthews matched bid",
      "status": "BID",
      "detail": "GWS match Sydney's Pick 8 bid for Ethan Matthews."
    },
    {
      "pick": 9,
      "clubId": "syd",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 10,
      "clubId": "bri",
      "origin": "Caylen Murray matched bid",
      "status": "BID",
      "detail": "Brisbane match Gold Coast's Pick 10 bid for Caylen Murray."
    },
    {
      "pick": 11,
      "clubId": "gcs",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 12,
      "clubId": "stk",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 13,
      "clubId": "col",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 14,
      "clubId": "mel",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 15,
      "clubId": "ade",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 16,
      "clubId": "stk",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 17,
      "clubId": "ess",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 18,
      "clubId": "fre",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 19,
      "clubId": "ess",
      "origin": "Essendon bid-slide compensation (assumed)",
      "status": "COMPO",
      "detail": "Compensation location projected."
    },
    {
      "pick": 20,
      "clubId": "pa",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 21,
      "clubId": "ric",
      "origin": "Richmond bid-slide compensation (assumed)",
      "status": "COMPO",
      "detail": "Compensation location projected."
    },
    {
      "pick": 22,
      "clubId": "wce",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 23,
      "clubId": "wce",
      "origin": "West Coast bid-slide compensation (assumed)",
      "status": "COMPO",
      "detail": "Compensation location projected."
    },
    {
      "pick": 24,
      "clubId": "pa",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 25,
      "clubId": "ess",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 26,
      "clubId": "syd",
      "origin": "Mason McGroder matched bid",
      "status": "BID",
      "detail": "Sydney match the Pick 26 bid from GWS for Mason McGroder; Sydney are assumed to trade for sufficient points."
    },
    {
      "pick": 27,
      "clubId": "gws",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 28,
      "clubId": "wbd",
      "origin": "Khaled El Souki matched bid",
      "status": "BID",
      "detail": "Western Bulldogs match the Pick 28 NGA bid for Khaled El Souki; bidding club not yet nominated."
    },
    {
      "pick": 29,
      "clubId": "haw",
      "origin": "Cooper Hodge matched bid",
      "status": "BID",
      "detail": "Hawthorn match Brisbane's Pick 29 father-son bid for Cooper Hodge."
    },
    {
      "pick": 30,
      "clubId": "bri",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 31,
      "clubId": "col",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 32,
      "clubId": "car",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 33,
      "clubId": "ade",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 34,
      "clubId": "nm",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 35,
      "clubId": "pa",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 36,
      "clubId": "ade",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 37,
      "clubId": "gee",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 38,
      "clubId": "fre",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 39,
      "clubId": "stk",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 40,
      "clubId": "ade",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    },
    {
      "pick": 41,
      "clubId": "ric",
      "origin": "User-assumed live selection",
      "status": "MOCK",
      "detail": "Club/selection pairing nominated by user."
    }
  ]
};

  const aliases={...(window.ATM_MY_MOCK?.aliases||{}),'Lochie Burrows':'Lachie Burrows','Albert Macgowan':'Albert MacGowan','Garrison Kehn':'Garrison Kenh'};
  const resolve=n=>aliases[n]||n;
  window.ATM_PLAYER_PROFILES=P;
  window.ATM_MY_MOCK={cloudOverrideCutoff:"2026-10-24T14:27:05.294Z",updated:'25 Oct 2026 — user mock v4',board,events,assetLedger,pool:Object.keys(P),resolve,aliases};
})();
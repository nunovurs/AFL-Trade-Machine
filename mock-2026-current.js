(() => {
  const P=window.ATM_PLAYER_PROFILES||{};
  const fill=(name,data)=>{P[name]={...(P[name]||{}),...data};};
  const ph='assets/player-placeholder.svg';

  fill('Dougie Cochrane',{why:'Port Adelaide match Essendon’s opening bid because Cochrane is their NGA prospect and a genuine top-end talent.'});
  fill('Cody Walker',{why:'Carlton match the father-son bid and add a dynamic foundation player for their next era.'});
  fill('Arki Butler',{why:'Essendon take the explosive forward/midfielder with their first open-pool selection.'});
  fill('Harry Van Hattum',{why:'Richmond prioritise the draft’s standout ruck/forward physical profile and long-term upside.'});
  fill('Ethan Drever',{why:'Melbourne trade up for midfield power, burst and a player who can turn stoppage wins into attack.'});
  fill('Gus Teixeira',{why:'North Melbourne add speed, polish and forward-half damage rather than another pure accumulator.'});
  fill('Heath Mellody',{why:'West Coast use the split-pick strategy to add a high-end WA runner and creator.'});
  fill('Caylen Murray',{why:'Gold Coast use the Ben King compensation selection on Murray in this scenario, with Brisbane unable to match the bid.',tiedClub:'bri',tieType:'Brisbane Academy'});
  fill('Ethan Matthews',{why:'GWS add one of their own Academy midfielders to the next generation of the engine room.'});
  fill('Clancy Snell',{why:'St Kilda add a long-term key defender with mature-body/VFL exposure.'});
  fill('Mitchell Harris',{why:'Collingwood invest in a long-term key-defensive option with genuine size and upside.'});
  fill('George Gale',{why:'West Coast complete the split-pick strategy with another versatile local prospect.'});
  fill('Kodah Edwards',{why:'Adelaide keep the South Australian captain and add leadership, competitiveness and scoreboard impact.'});
  fill('Albert MacGowan',{why:'Geelong add another versatile midfielder/forward to their next-generation midfield mix.'});
  fill('Tyson Bradley',{why:'Essendon use the Hawthorn/Merrett-related first-round asset on a strong key defender with intercept value.'});
  fill('Harrison Chapman',{why:'Brisbane add an athletic defender/wing who can defend different types, intercept and break lines.'});
  fill('Jake Eime',{why:'Richmond use the Fremantle/Sean Darcy-related selection on a rebounding defender/wing with speed and kicking.'});

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

  const board=[
    {pick:1,clubId:'pa',player:'Dougie Cochrane',path:'Port Adelaide — matched Essendon bid',mechanism:'MATCHED NGA BID • Essendon call Cochrane at Pick 1 and Port Adelaide match. Port’s supporting points assets are shown separately as bid-payment mechanics.'},
    {pick:2,clubId:'car',player:'Cody Walker',path:'Carlton — matched father-son bid',mechanism:'MATCHED FATHER-SON BID • Carlton match the bid on Cody Walker. The North-origin first moves to the bid and supporting Carlton assets are consumed for points.'},
    {pick:3,clubId:'ess',player:'Arki Butler',path:'Essendon',mechanism:'ESSENDON SELECTION • Butler is Essendon’s first open-pool selection after the two opening matched bids.'},
    {pick:4,clubId:'ric',player:'Harry Van Hattum',path:'Richmond',mechanism:'RICHMOND SELECTION • Richmond take the leading ruck/forward in the open pool.'},
    {pick:5,clubId:'mel',player:'Ethan Drever',path:'Melbourne via West Coast trade',mechanism:'WEST COAST / MELBOURNE TRADE • Melbourne acquire West Coast’s premium first-round asset and move up for Drever.'},
    {pick:6,clubId:'nm',player:'Gus Teixeira',path:'North Melbourne',mechanism:'NORTH MELBOURNE SELECTION • North add speed, polish and forward-half impact.'},
    {pick:7,clubId:'wce',player:'Heath Mellody',path:'West Coast via Melbourne / Gold Coast',mechanism:'TRADE-CHAIN SELECTION • West Coast use one of the selections received in the Melbourne split-pick scenario.'},
    {pick:8,clubId:'gcs',player:'Caylen Murray',path:'Gold Coast compensation — Brisbane cannot match',mechanism:'PROJECTED BEN KING COMPENSATION • Gold Coast bid on Brisbane Academy prospect Caylen Murray with the King compensation selection. In this mock Brisbane cannot complete the match, so Murray becomes a Sun.'},
    {pick:9,clubId:'gws',player:'Ethan Matthews',path:'GWS',mechanism:'GWS SELECTION • The Giants take their Academy midfielder with their own live selection.'},
    {pick:10,clubId:'stk',player:'Clancy Snell',path:'St Kilda',mechanism:'ST KILDA SELECTION • The Saints invest in a long-term key defender.'},
    {pick:11,clubId:'col',player:'Mitchell Harris',path:'Collingwood',mechanism:'COLLINGWOOD SELECTION • Collingwood add another high-end key-defensive prospect.'},
    {pick:12,clubId:'wce',player:'George Gale',path:'West Coast via Melbourne',mechanism:'MELBOURNE / WEST COAST TRADE • West Coast use the second major asset from the projected split.'},
    {pick:13,clubId:'ade',player:'Kodah Edwards',path:'Adelaide',mechanism:'ADELAIDE SELECTION • Adelaide retain the South Australian captain and forward/midfielder.'},
    {pick:14,clubId:'gee',player:'Albert MacGowan',path:'Geelong',mechanism:'GEELONG SELECTION • Geelong add a versatile midfielder/forward.'},
    {pick:15,clubId:'ess',player:'Tyson Bradley',path:'Essendon via Hawthorn / Merrett trade',mechanism:'ZACH MERRETT TRADE • Essendon use Hawthorn first-round capital received in the projected Merrett deal.'},
    {pick:16,clubId:'bri',player:'Harrison Chapman',path:'Brisbane',mechanism:'BRISBANE SELECTION • Brisbane use their first-round selection on Chapman.'},
    {pick:17,clubId:'ric',player:'Jake Eime',path:'Richmond via Fremantle / Sean Darcy trade',mechanism:'SEAN DARCY TRADE • Richmond use the Fremantle first-round asset on Eime.'},
    {pick:18,clubId:'ess',player:'Billy Wigmore',path:'Essendon — start-of-Round-2 compensation',mechanism:'BID-SLIDE COMPENSATION • Essendon use the compensation selection on Wigmore in this mock scenario.'},
    {pick:19,clubId:'ric',player:'Toby Krasna',path:'Richmond — start-of-Round-2 compensation',mechanism:'BID-SLIDE COMPENSATION • Richmond use the compensation selection on Krasna in this mock scenario.'},
    {pick:20,clubId:'nm',player:'Jackson Phillips',path:'North Melbourne — start-of-Round-2 compensation',mechanism:'BID-SLIDE COMPENSATION • North Melbourne use the compensation selection on Phillips in this mock scenario.'},
    {pick:21,clubId:'ess',player:'Sam Gayfer',path:'Essendon',mechanism:'ESSENDON SELECTION • The Bombers add a key-forward prospect.'},
    {pick:22,clubId:'ric',player:'Leo Steed',path:'Richmond',mechanism:'RICHMOND SELECTION • Richmond add another genuine midfielder to the rebuild.'},
    {pick:23,clubId:'wce',player:'Archie Van Dyk',path:'West Coast',mechanism:'WEST COAST SELECTION • The Eagles add another midfielder to their young group.'},
    {pick:24,clubId:'pa',player:'Ethan Herbert',path:'Port Adelaide',mechanism:'PORT ADELAIDE SELECTION • Port add a mobile ruck/forward prospect.'},
    {pick:25,clubId:'wbd',player:'Khaled El Souki',path:'Western Bulldogs — matched NGA bid',mechanism:'MATCHED NGA BID • A rival club bids on El Souki and the Western Bulldogs match.'},
    {pick:26,clubId:'car',player:'Harvie Cooke',path:'Carlton',mechanism:'CARLTON SELECTION • Carlton use the next surviving selection after the Walker match.'},
    {pick:27,clubId:'ess',player:'Jack Pickett',path:'Essendon via Hawthorn / GWS asset',mechanism:'MERRETT TRADE CAPITAL • Essendon use another Hawthorn-linked asset from the projected Merrett package.'},
    {pick:28,clubId:'ess',player:'Darcy Szerszyn',path:'Essendon via Hawthorn / St Kilda asset',mechanism:'MERRETT TRADE CAPITAL • Essendon use the second later Hawthorn-linked asset.'},
    {pick:29,clubId:'col',player:'Cody Templeton',path:'Collingwood',mechanism:'COLLINGWOOD SELECTION • Collingwood add another forward/midfield option.'},
    {pick:30,clubId:'gws',player:'Xavier Ladbrook',path:'GWS via Melbourne',mechanism:'GWS SELECTION • GWS use the Melbourne-linked asset on an athletic key utility.'},
    {pick:31,clubId:'pa',player:'Wil Malady',path:'Port Adelaide via Carlton',mechanism:'PORT ADELAIDE SELECTION • Port use the Carlton-linked asset on an attacking forward/wing.'},
    {pick:32,clubId:'ade',player:'Lachie Burrows',path:'Adelaide',mechanism:'ADELAIDE SELECTION • Adelaide add another midfield option.'},
    {pick:33,clubId:'gee',player:'Jack Slattery',path:'Geelong',mechanism:'GEELONG SELECTION • Geelong add a developing key forward.'},
    {pick:34,clubId:'haw',player:'Koby LeCras',path:'Hawthorn',mechanism:'HAWTHORN SELECTION • Hawthorn add the mobile WA forward.'},
    {pick:35,clubId:'syd',player:'Noah Williams',path:'Sydney',mechanism:'SYDNEY SELECTION • Sydney take one of the notable midfielders still on the board.'},
    {pick:36,clubId:'bri',player:'Hugh McCallum',path:'Brisbane',mechanism:'BRISBANE SELECTION • Brisbane add outside run and versatility.'},
    {pick:37,clubId:'fre',player:'Gus Kennedy',path:'Fremantle',mechanism:'FREMANTLE SELECTION • Fremantle add a hard, versatile midfielder/defender.'},
    {pick:38,clubId:'ade',player:'Gabriel Patterson',path:'Adelaide via Essendon',mechanism:'ADELAIDE SELECTION • Adelaide use the Essendon-origin asset on Patterson.'},
    {pick:39,clubId:'ric',player:'Jordan Knapp',path:'Richmond',mechanism:'RICHMOND SELECTION • Richmond keep adding to the midfield pipeline.'},
    {pick:40,clubId:'wce',player:'Garrison Kenh',path:'West Coast',mechanism:'WEST COAST SELECTION • West Coast close the published Top 40 with their NGA half-back prospect.'}
  ];

  const events=[
    {afterPick:1,clubId:'pa',title:'COCHRANE MATCH — PORT BID PAYMENT',detail:'Essendon bid on Cochrane at Pick 1. Port Adelaide receive a 10% discount because they finished 15th, so the 3000-point bid costs 2700 DVI. Port use their natural first and the projected Zak Butters Band 1 compensation asset. The unused value of the second asset is converted into a later selection rather than disappearing.',payment:{
      bidPick:1,bidValue:3000,required:2700,total:3757,deficit:1057,
      rule:'2026 rule: maximum two picks may be used to match a bid through Pick 36. Port receive the 10% lower-ladder discount. Surplus value on the final matching asset converts into a later live selection.',
      assets:[
        {label:'ORIGINAL PICK 4 — PORT NATURAL FIRST',origin:'Port Adelaide • 1962 DVI',liveAtMatch:'4',points:1962,status:'ABSORBED',statusLabel:'USED → COCHRANE BID'},
        {label:'ORIGINAL PICK 5 — PROJECTED BUTTERS BAND 1 COMPENSATION',origin:'Port Adelaide • 1795 DVI',liveAtMatch:'5',points:738,status:'MOVED_TO_BID',statusLabel:'PART USED → COCHRANE BID'},
        {label:'PORT RESIDUAL SELECTION',origin:'1057 DVI remains from the Pick 5 asset; equivalent to about Pick 14 (1024 DVI) before later bid/selection renumbering',liveAtMatch:'PROVISIONAL ~14',points:1057,status:'RESIDUAL',statusLabel:'RETURNED VALUE'}
      ]
    }},
    {afterPick:2,clubId:'car',title:'WALKER MATCH — CARLTON BID PAYMENT',detail:'Carlton’s primary matching first moves up to Pick 2. Supporting Carlton assets are consumed for points and do not become later live selections.'},
    {afterPick:8,clubId:'bri',title:'MURRAY BID — BRISBANE CANNOT COMPLETE MATCH',detail:'This mock assumes the Gold Coast compensation selection is used to bid on Caylen Murray and Brisbane cannot complete the match under the 2026 matching constraints.'},
    {afterPick:25,clubId:'wbd',title:'EL SOUKI MATCH — BULLDOGS PICK ABSORBED',detail:'Western Bulldogs match the NGA bid on Khaled El Souki. Their later points selection is absorbed and does not appear as a numbered live selection.'}
  ];

  const assetLedger={
    updated:'27 Sep 2026',
    assumptions:[
      'Brisbane won the 2026 Grand Final, so its natural first-round selection is Pick 18 before free-agency compensation or bid matching; Fremantle is Pick 17.',
      'This scenario applies projected Band 1 compensation for Zak Butters and Ben King if their reported free-agency moves proceed. Those insertions move Brisbane’s pre-bid live slot from 18 to 20.',
      'Lachie Neale and Toby Greene are currently treated as projected Band 3 cases for planning, but their exact live second-round insertion points are not hard-coded until free agency compensation is formally known.',
      'Possible Band 2 compensation for Jordon Butts and Joel Amartey is not applied to the numbered ledger yet.'
    ],
    rows:[
      {pick:1,clubId:'ess',origin:'Essendon natural R1',status:'BID',detail:'Essendon use the opening selection to bid on Dougie Cochrane.'},
      {pick:2,clubId:'ric',origin:'Richmond natural R1',status:'LIVE',detail:'Slides as matched bids are inserted ahead.'},
      {pick:3,clubId:'wce',origin:'West Coast natural R1',status:'TRADE',detail:'Mock assumption: traded to Melbourne for later first-round assets.'},
      {pick:4,clubId:'pa',origin:'Port Adelaide natural R1',status:'ABSORBED',detail:'1962 DVI. Used in Port’s Pick 1 match for Dougie Cochrane.'},
      {pick:5,clubId:'pa',origin:'Projected Zak Butters Band 1 compensation',status:'PART USED',detail:'1795 DVI. 738 points complete the Cochrane match; 1057 DVI remains and converts into a later live selection.'},
      {pick:6,clubId:'nm',origin:'North Melbourne natural R1',status:'LIVE',detail:'Pre-bid / pre-trade slot after the Butters compensation insertion.'},
      {pick:7,clubId:'mel',origin:'Gold Coast natural R1 → Melbourne',status:'LIVE',detail:'Gold Coast’s traded natural first.'},
      {pick:8,clubId:'gcs',origin:'Projected Ben King Band 1 compensation',status:'COMPO',detail:'Gold Coast compensation immediately after its natural first-round position.'},
      {pick:9,clubId:'gws',origin:'GWS natural R1',status:'LIVE',detail:''},
      {pick:10,clubId:'stk',origin:'St Kilda natural R1',status:'LIVE',detail:''},
      {pick:11,clubId:'col',origin:'Collingwood natural R1',status:'LIVE',detail:''},
      {pick:12,clubId:'mel',origin:'Melbourne natural R1',status:'LIVE',detail:''},
      {pick:13,clubId:'car',origin:'Carlton natural R1',status:'LIVE',detail:'Carlton’s matching/trade package for Cody Walker can alter this asset.'},
      {pick:14,clubId:'wbd',origin:'Western Bulldogs natural R1',status:'LIVE',detail:''},
      {pick:15,clubId:'ade',origin:'Adelaide natural R1',status:'LIVE',detail:''},
      {pick:16,clubId:'gee',origin:'Geelong natural R1',status:'LIVE',detail:''},
      {pick:17,clubId:'haw',origin:'Hawthorn natural R1',status:'LIVE',detail:''},
      {pick:18,clubId:'car',origin:'Sydney natural R1 → Carlton',status:'LIVE',detail:''},
      {pick:19,clubId:'fre',origin:'Fremantle natural R1',status:'LIVE',detail:'Runner-up selection after Brisbane won the Grand Final.'},
      {pick:20,clubId:'bri',origin:'Brisbane natural R1',status:'LIVE',detail:'Brisbane’s premiership Pick 18 shifted to projected Pick 20 here by the applied Butters + King Band 1 compensation insertions.'},
      {pick:21,clubId:'ess',origin:'Projected start-of-Round-2 bid-slide compensation',status:'COMPO',detail:'Activated after night one if Essendon’s natural first is pushed back by a matched bid and then used.'},
      {pick:22,clubId:'ric',origin:'Projected start-of-Round-2 bid-slide compensation',status:'COMPO',detail:'Activated after night one if Richmond meets the 2026 compensation conditions.'},
      {pick:23,clubId:'nm',origin:'Projected start-of-Round-2 bid-slide compensation',status:'COMPO',detail:'Activated after night one if North Melbourne meets the 2026 compensation conditions.'},
      {pick:24,clubId:'ess',origin:'Essendon natural R2',status:'LIVE',detail:'Original Pick 19 shifted by the two applied Band 1 picks and three projected start-R2 compensation picks.'},
      {pick:25,clubId:'ric',origin:'Richmond natural R2',status:'LIVE',detail:'Original Pick 20 shifted under the same assumptions.'},
      {pick:26,clubId:'wce',origin:'West Coast natural R2',status:'LIVE',detail:''},
      {pick:27,clubId:'pa',origin:'Port Adelaide natural R2',status:'LIVE',detail:''},
      {pick:28,clubId:'car',origin:'North Melbourne R2 → Carlton',status:'LIVE',detail:''},
      {pick:29,clubId:'car',origin:'Gold Coast R2 → Carlton',status:'LIVE',detail:''},
      {pick:30,clubId:'haw',origin:'GWS R2 → Hawthorn',status:'LIVE',detail:''},
      {pick:31,clubId:'haw',origin:'St Kilda R2 → Hawthorn',status:'LIVE',detail:''},
      {pick:32,clubId:'col',origin:'Collingwood natural R2',status:'LIVE',detail:''},
      {pick:33,clubId:'gws',origin:'Melbourne R2 → GWS',status:'LIVE',detail:''},
      {pick:34,clubId:'pa',origin:'Carlton R2 → Port Adelaide',status:'LIVE',detail:''},
      {pick:35,clubId:'wbd',origin:'Western Bulldogs natural R2',status:'LIVE',detail:''},
      {pick:36,clubId:'ade',origin:'Adelaide natural R2',status:'LIVE',detail:''},
      {pick:37,clubId:'gee',origin:'Geelong natural R2',status:'LIVE',detail:''},
      {pick:38,clubId:'haw',origin:'Hawthorn natural R2',status:'LIVE',detail:''},
      {pick:39,clubId:'syd',origin:'Sydney natural R2',status:'LIVE',detail:''},
      {pick:40,clubId:'fre',origin:'Fremantle natural R2',status:'LIVE',detail:''}
    ]
  };

  const aliases={...(window.ATM_MY_MOCK?.aliases||{}),'Lochie Burrows':'Lachie Burrows','Albert Macgowan':'Albert MacGowan','Garrison Kehn':'Garrison Kenh'};
  const resolve=n=>aliases[n]||n;
  window.ATM_PLAYER_PROFILES=P;
  window.ATM_MY_MOCK={updated:'5 Oct 2026',board,events,assetLedger,pool:Object.keys(P),resolve,aliases};
})();
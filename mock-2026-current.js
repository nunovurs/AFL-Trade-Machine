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

  const board=[
    {pick:1,clubId:'pa',player:'Dougie Cochrane',path:'Port Adelaide — matched Essendon bid',mechanism:'MATCHED NGA BID • Essendon call Cochrane at Pick 1 and Port Adelaide match. Port’s matching assets are handled separately.'},
    {pick:2,clubId:'car',player:'Cody Walker',path:'Carlton — matched father-son bid',mechanism:'MATCHED FATHER-SON BID • Carlton match the bid on Cody Walker. Drag Walker to change where the bid occurs; Carlton follows him automatically.'},
    {pick:3,clubId:'ess',player:'Arki Butler',path:'Essendon',mechanism:'ESSENDON SELECTION • Current-order selection after the opening matched bids.'},
    {pick:4,clubId:'ric',player:'Harry Van Hattum',path:'Richmond',mechanism:'RICHMOND SELECTION • Current-order selection after the opening matched bids.'},
    {pick:5,clubId:'wce',player:'Ethan Drever',path:'West Coast',mechanism:'WEST COAST SELECTION • West Coast retain their current first-round selection.'},
    {pick:6,clubId:'nm',player:'Gus Teixeira',path:'North Melbourne',mechanism:'NORTH MELBOURNE SELECTION • North Melbourne retain their current first-round selection.'},
    {pick:7,clubId:'mel',player:'Heath Mellody',path:'Melbourne via Gold Coast',mechanism:'MELBOURNE SELECTION • Melbourne hold Gold Coast’s first-round selection.'},
    {pick:8,clubId:'gws',player:'Caylen Murray',path:'Greater Western Sydney',mechanism:'GWS SELECTION • Current-order selection.'},
    {pick:9,clubId:'stk',player:'Ethan Matthews',path:'St Kilda',mechanism:'ST KILDA SELECTION • Current-order selection.'},
    {pick:10,clubId:'col',player:'Clancy Snell',path:'Collingwood',mechanism:'COLLINGWOOD SELECTION • Current-order selection.'},
    {pick:11,clubId:'mel',player:'Mitchell Harris',path:'Melbourne',mechanism:'MELBOURNE SELECTION • Melbourne retain their natural first-round selection.'},
    {pick:12,clubId:'wbd',player:'George Gale',path:'Western Bulldogs',mechanism:'WESTERN BULLDOGS SELECTION • Current-order selection.'},
    {pick:13,clubId:'ade',player:'Kodah Edwards',path:'Adelaide',mechanism:'ADELAIDE SELECTION • Current-order selection.'},
    {pick:14,clubId:'gee',player:'Albert MacGowan',path:'Geelong',mechanism:'GEELONG SELECTION • Current-order selection.'},
    {pick:15,clubId:'ess',player:'Tyson Bradley',path:'Essendon via Hawthorn — Zach Merrett trade',mechanism:'ZACH MERRETT TRADE • Essendon receive Hawthorn’s Pick 15 in the confirmed Merrett deal.'},
    {pick:16,clubId:'fre',player:'Harrison Chapman',path:'Fremantle',mechanism:'FREMANTLE SELECTION • Carlton’s two first-round assets are treated as Walker matching assets in this mock, so Fremantle is the next live ordinary selection.'},
    {pick:17,clubId:'bri',player:'Jake Eime',path:'Brisbane',mechanism:'BRISBANE SELECTION • Brisbane’s premiership first-round selection.'},
    {pick:18,clubId:'ess',player:'Billy Wigmore',path:'Essendon — second round',mechanism:'ESSENDON SELECTION • Essendon’s current second-round selection.'},
    {pick:19,clubId:'ess',player:'Toby Krasna',path:'Essendon — bid-slide compensation',mechanism:'BID-SLIDE COMPENSATION • Projected compensation immediately after Essendon’s second-round position.'},
    {pick:20,clubId:'ric',player:'Jackson Phillips',path:'Richmond — second round',mechanism:'RICHMOND SELECTION • Richmond’s current second-round selection.'},
    {pick:21,clubId:'ric',player:'Sam Gayfer',path:'Richmond — bid-slide compensation',mechanism:'BID-SLIDE COMPENSATION • Projected compensation immediately after Richmond’s second-round position.'},
    {pick:22,clubId:'wce',player:'Leo Steed',path:'West Coast — second round',mechanism:'WEST COAST SELECTION • West Coast’s current second-round selection.'},
    {pick:23,clubId:'wce',player:'Archie Van Dyk',path:'West Coast — bid-slide compensation',mechanism:'BID-SLIDE COMPENSATION • Projected compensation immediately after West Coast’s second-round position.'},
    {pick:24,clubId:'pa',player:'Ethan Herbert',path:'Port Adelaide — second round',mechanism:'PORT ADELAIDE SELECTION • Port keep their ordinary second-round selection but do not receive bid-slide compensation in this mock because their first is used in the Cochrane match.'},
    {pick:25,clubId:'wbd',player:'Khaled El Souki',path:'Western Bulldogs — matched NGA bid',mechanism:'MATCHED NGA BID • Western Bulldogs match the bid on Khaled El Souki. Drag El Souki to change where the bid occurs; the Bulldogs follow him automatically.'},
    {pick:26,clubId:'car',player:'Harvie Cooke',path:'Carlton via North Melbourne',mechanism:'CARLTON SELECTION • Carlton hold North Melbourne’s current second-round asset.'},
    {pick:27,clubId:'nm',player:'Jack Pickett',path:'North Melbourne — bid-slide compensation',mechanism:'BID-SLIDE COMPENSATION • Projected compensation at North Melbourne’s natural second-round position.'},
    {pick:28,clubId:'car',player:'Darcy Szerszyn',path:'Carlton via Gold Coast',mechanism:'CARLTON SELECTION • Carlton hold Gold Coast’s current second-round asset.'},
    {pick:29,clubId:'ess',player:'Cody Templeton',path:'Essendon via Hawthorn / Greater Western Sydney — Zach Merrett trade',mechanism:'ZACH MERRETT TRADE • Essendon receive Hawthorn’s Pick 25 (originally via GWS), which sits at this projected mock position after bid-slide insertions.'},
    {pick:30,clubId:'gws',player:'Xavier Ladbrook',path:'Greater Western Sydney — Toby Greene compensation',mechanism:'FREE-AGENCY COMPENSATION • GWS use the confirmed Toby Greene compensation selection.'},
    {pick:31,clubId:'haw',player:'Wil Malady',path:'Hawthorn via St Kilda',mechanism:'HAWTHORN SELECTION • Hawthorn hold St Kilda’s current second-round asset.'},
    {pick:32,clubId:'col',player:'Lachie Burrows',path:'Collingwood',mechanism:'COLLINGWOOD SELECTION • Current-order selection.'},
    {pick:33,clubId:'gws',player:'Jack Slattery',path:'Greater Western Sydney via Melbourne',mechanism:'GWS SELECTION • GWS hold Melbourne’s current second-round asset.'},
    {pick:34,clubId:'pa',player:'Koby LeCras',path:'Port Adelaide via Carlton',mechanism:'PORT ADELAIDE SELECTION • Port hold Carlton’s current second-round asset.'},
    {pick:35,clubId:'ade',player:'Noah Williams',path:'Adelaide',mechanism:'ADELAIDE SELECTION • Adelaide’s current second-round selection.'},
    {pick:36,clubId:'ade',player:'Hugh McCallum',path:'Adelaide — Jordon Butts compensation',mechanism:'FREE-AGENCY COMPENSATION • Adelaide use the confirmed Jordon Butts compensation selection.'},
    {pick:37,clubId:'gee',player:'Gus Kennedy',path:'Geelong',mechanism:'GEELONG SELECTION • Current-order selection.'},
    {pick:38,clubId:'haw',player:'Gabriel Patterson',path:'Hawthorn',mechanism:'HAWTHORN SELECTION • Current-order selection.'},
    {pick:39,clubId:'syd',player:'Jordan Knapp',path:'Sydney',mechanism:'SYDNEY SELECTION • Sydney’s current second-round selection.'},
    {pick:40,clubId:'syd',player:'Garrison Kenh',path:'Sydney — Joel Amartey compensation',mechanism:'FREE-AGENCY COMPENSATION • Sydney use the confirmed Joel Amartey compensation selection.'}
  ];

  const events=[
    {afterPick:1,player:'Dougie Cochrane',clubId:'pa',title:'COCHRANE MATCH — PORT BID PAYMENT',detail:'Essendon bid on Cochrane at Pick 1. Port Adelaide receive a 10% discount because they finished 15th, so the 3000-point bid costs 2700 DVI. Port use their natural first and the projected Zak Butters Band 1 compensation asset. The unused value of the second asset is converted into a later selection rather than disappearing.',payment:{
      bidPick:1,bidValue:3000,required:2700,total:3757,deficit:1057,
      rule:'2026 rule: maximum two picks may be used to match a bid through Pick 36. Port receive the 10% lower-ladder discount. Surplus value on the final matching asset converts into a later live selection.',
      assets:[
        {label:'ORIGINAL PICK 4 — PORT NATURAL FIRST',origin:'Port Adelaide • 1962 DVI',liveAtMatch:'4',points:1962,status:'ABSORBED',statusLabel:'USED → COCHRANE BID'},
        {label:'ORIGINAL PICK 5 — PROJECTED BUTTERS BAND 1 COMPENSATION',origin:'Port Adelaide • 1795 DVI',liveAtMatch:'5',points:738,status:'MOVED_TO_BID',statusLabel:'PART USED → COCHRANE BID'},
        {label:'PORT RESIDUAL SELECTION',origin:'1057 DVI remains from the Pick 5 asset; equivalent to about Pick 14 (1024 DVI) before later bid/selection renumbering',liveAtMatch:'PROVISIONAL ~14',points:1057,status:'RESIDUAL',statusLabel:'RETURNED VALUE'}
      ]
    }},
    {afterPick:2,player:'Cody Walker',clubId:'car',title:'WALKER MATCH — CARLTON BID PAYMENT',detail:'Carlton’s primary matching first moves up to Pick 2. Supporting Carlton assets are consumed for points and do not become later live selections.'},
    {afterPick:8,player:'Caylen Murray',clubId:'bri',title:'MURRAY BID — BRISBANE CANNOT COMPLETE MATCH',detail:'This mock assumes the Gold Coast compensation selection is used to bid on Caylen Murray and Brisbane cannot complete the match under the 2026 matching constraints.'},
    {afterPick:25,player:'Khaled El Souki',clubId:'wbd',title:'EL SOUKI MATCH — BULLDOGS PICK ABSORBED',detail:'Western Bulldogs match the NGA bid on Khaled El Souki. Their later points selection is absorbed and does not appear as a numbered live selection.'}
  ];

  const assetLedger={
    updated:'5 Oct 2026',
    assumptions:[
      'Club ownership is based on the current AFL indicative draft order and confirmed free-agency compensation.',
      'This mock then applies the user’s draft-night matched-bid assumptions for Dougie Cochrane, Cody Walker and Khaled El Souki.',
      'Projected bid-slide compensation is inserted after the natural second-round positions for Essendon, Richmond, West Coast and North Melbourne. Port Adelaide does not receive that extra selection in this mock because its first-round asset is used to match Cochrane.',
      'There is no West Coast–Melbourne split-pick trade in this mock.',
      'Player selections and scouting profiles are user-controlled and can be moved independently of ordinary club ownership.',
      'Confirmed Zach Merrett trade: Essendon receive 2026 Picks 15 and 25 plus Hawthorn’s 2028 second-round pick.'
    ],
    rows:[
      {pick:1,clubId:'pa',origin:'Cochrane matched bid',status:'BID',detail:'Port Adelaide match Essendon’s opening bid.'},
      {pick:2,clubId:'car',origin:'Walker matched bid',status:'BID',detail:'Carlton match the father-son bid; this row moves with Cody Walker.'},
      {pick:3,clubId:'ess',origin:'Essendon natural R1',status:'LIVE',detail:''},
      {pick:4,clubId:'ric',origin:'Richmond natural R1',status:'LIVE',detail:''},
      {pick:5,clubId:'wce',origin:'West Coast natural R1',status:'LIVE',detail:''},
      {pick:6,clubId:'nm',origin:'North Melbourne natural R1',status:'LIVE',detail:''},
      {pick:7,clubId:'mel',origin:'Gold Coast R1 → Melbourne',status:'LIVE',detail:'Current traded first-round asset.'},
      {pick:8,clubId:'gws',origin:'GWS natural R1',status:'LIVE',detail:''},
      {pick:9,clubId:'stk',origin:'St Kilda natural R1',status:'LIVE',detail:''},
      {pick:10,clubId:'col',origin:'Collingwood natural R1',status:'LIVE',detail:''},
      {pick:11,clubId:'mel',origin:'Melbourne natural R1',status:'LIVE',detail:''},
      {pick:12,clubId:'wbd',origin:'Western Bulldogs natural R1',status:'LIVE',detail:''},
      {pick:13,clubId:'ade',origin:'Adelaide natural R1',status:'LIVE',detail:''},
      {pick:14,clubId:'gee',origin:'Geelong natural R1',status:'LIVE',detail:''},
      {pick:15,clubId:'ess',origin:'Hawthorn R1 → Essendon (Zach Merrett trade)',status:'TRADE',detail:'Confirmed 5 Oct 2026.'},
      {pick:16,clubId:'fre',origin:'Fremantle natural R1',status:'LIVE',detail:''},
      {pick:17,clubId:'bri',origin:'Brisbane natural R1',status:'LIVE',detail:''},
      {pick:18,clubId:'ess',origin:'Essendon natural R2',status:'LIVE',detail:''},
      {pick:19,clubId:'ess',origin:'Essendon bid-slide compensation',status:'COMPO',detail:'Projected under the 2026 matched-bid rule.'},
      {pick:20,clubId:'ric',origin:'Richmond natural R2',status:'LIVE',detail:''},
      {pick:21,clubId:'ric',origin:'Richmond bid-slide compensation',status:'COMPO',detail:'Projected under the 2026 matched-bid rule.'},
      {pick:22,clubId:'wce',origin:'West Coast natural R2',status:'LIVE',detail:''},
      {pick:23,clubId:'wce',origin:'West Coast bid-slide compensation',status:'COMPO',detail:'Projected under the 2026 matched-bid rule.'},
      {pick:24,clubId:'pa',origin:'Port Adelaide natural R2',status:'LIVE',detail:'No extra bid-slide compensation in this mock.'},
      {pick:25,clubId:'wbd',origin:'El Souki matched NGA bid',status:'BID',detail:'Bulldogs match the bid; this row moves with El Souki.'},
      {pick:26,clubId:'car',origin:'North Melbourne R2 → Carlton',status:'LIVE',detail:''},
      {pick:27,clubId:'nm',origin:'North Melbourne bid-slide compensation',status:'COMPO',detail:'Projected at North Melbourne’s natural second-round position.'},
      {pick:28,clubId:'car',origin:'Gold Coast R2 → Carlton',status:'LIVE',detail:''},
      {pick:29,clubId:'ess',origin:'GWS R2 → Hawthorn → Essendon (Zach Merrett trade)',status:'TRADE',detail:'Confirmed 5 Oct 2026.'},
      {pick:30,clubId:'gws',origin:'Toby Greene compensation',status:'COMPO',detail:'Confirmed free-agency compensation.'},
      {pick:31,clubId:'haw',origin:'St Kilda R2 → Hawthorn',status:'LIVE',detail:''},
      {pick:32,clubId:'col',origin:'Collingwood natural R2',status:'LIVE',detail:''},
      {pick:33,clubId:'gws',origin:'Melbourne R2 → GWS',status:'LIVE',detail:''},
      {pick:34,clubId:'pa',origin:'Carlton R2 → Port Adelaide',status:'LIVE',detail:''},
      {pick:35,clubId:'ade',origin:'Adelaide natural R2',status:'LIVE',detail:''},
      {pick:36,clubId:'ade',origin:'Jordon Butts compensation',status:'COMPO',detail:'Confirmed free-agency compensation.'},
      {pick:37,clubId:'gee',origin:'Geelong natural R2',status:'LIVE',detail:''},
      {pick:38,clubId:'haw',origin:'Hawthorn natural R2',status:'LIVE',detail:''},
      {pick:39,clubId:'syd',origin:'Sydney natural R2',status:'LIVE',detail:''},
      {pick:40,clubId:'syd',origin:'Joel Amartey compensation',status:'COMPO',detail:'Confirmed free-agency compensation.'},
      {pick:41,clubId:'fre',origin:'Fremantle natural R2',status:'LIVE',detail:''},
      {pick:42,clubId:'bri',origin:'Brisbane natural R2',status:'LIVE',detail:''},
      {pick:43,clubId:'bri',origin:'Lachie Neale compensation',status:'COMPO',detail:'Confirmed free-agency compensation.'}
    ]
  };

  const aliases={...(window.ATM_MY_MOCK?.aliases||{}),'Lochie Burrows':'Lachie Burrows','Albert Macgowan':'Albert MacGowan','Garrison Kehn':'Garrison Kenh'};
  const resolve=n=>aliases[n]||n;
  window.ATM_PLAYER_PROFILES=P;
  window.ATM_MY_MOCK={updated:'5 Oct 2026 — current club order',board,events,assetLedger,pool:Object.keys(P),resolve,aliases};
})();
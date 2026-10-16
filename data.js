const ATM_CLUBS = [
  {id:'ade',name:'Adelaide',abbr:'ADE',zh:'ADEL',color:'#002b5c',clubText:'#fff',logo:'assets/logos/ade.svg',listCap:44,players:[
    'Ben Keays','Sam Berry','Callum Ah Chee','Sid Draper','Daniel Curtin','Riley Thilthorpe','Josh Rachele','Nick Murray','Charlie Edwards','Jordan Dawson','Jake Soligo','Brayden Cook','Max Michalanney','Zac Taylor','Mitchell Hinge','Hugh Bond','Oscar Ryan','Izak Rankine','Josh Worrell','James Peatling','Mitchell Marsh','Luke Nankervis','Alex Neal-Bullen','Rory Laird','Wayne Milera','Billy Dowling','Darcy Fogarty','Indy Cotton','Archie Ludowyke','James Borlase','Finnbar Maley','Toby Murray','Hugo Hall-Kahan','Lachlan McAndrew',"Reilly O'Brien",'Isaac Cumming','Mark Keane','Harry Cunningham'
  ]},
  {id:'bri',name:'Brisbane',abbr:'BRI',zh:'BL',color:'#7b002c',clubText:'#fff',logo:'assets/logos/bri.svg',listCap:44,players:[
    'Kai Lohmann','Sam Draper','Jaspa Fletcher','Oscar Allen','Josh Dunkley','Hugh McCluggage','Jarrod Berry','Will Ashcroft','Levi Ashcroft','Lincoln McCarthy','Tom Doedee','Logan Morris','Daniel Annable','Dayne Zorko','Cam Rayner','Luke Beecken','Luke Lloyd','Zane Zakostelsky','Ty Gallop','Charlie Cameron','Koby Evans','Henry Smith','Conor McKenna','Darcy Gardiner','James Tunstill','Eric Hipwood','Harris Andrews','Darcy Fort','Zac Bailey','Shadeau Brain','Ryan Lester','Reece Torrent','Cody Curtin','Bruce Reville','Ben Murphy','Jack Payne','Darragh Joyce','Tai Hayes','Noah Answerth','Darcy Wilmot'
  ]},
  {id:'car',name:'Carlton',abbr:'CAR',zh:'CARL',color:'#071c3d',clubText:'#fff',logo:'assets/logos/car.svg',listCap:44,players:[
    'Lachlan Cowan','Jesse Motlop','Oliver Hollands','Adam Cerra','Jagga Smith','Patrick Cripps','Harry McKay','Mitch McGovern','Ben Ainsworth','Blake Acres','Oliver Florent','Billy Wilson','Brodie Kemp','Sam Walsh','Will Hayward',"Harry O'Farrell",'Jacob Weitering','Nic Newman','Liam Reidy','Nick Haynes','Marc Pittonet','George Hewett','Jack Ison','Campbell Chesser','Matthew Carroll','Rob Monahan','Harry Dean','Cooper Lord','Talor Byrne','Adam Saad','Ashton Moir','Francis Evans','Matthew Cottrell','Wade Derksen','Joel Amartey','Lachie Whitfield'
  ]},
  {id:'col',name:'Collingwood',abbr:'COL',zh:'COLL',color:'#111111',clubText:'#fff',logo:'assets/logos/col.svg',listCap:44,players:[
    'Patrick Lipinski','Jordan De Goey','Isaac Quaynor','Brayden Maynard','Jamie Elliott','Josh Daicos','Lachie Schultz','Dan Houston','Daniel McStay','Harry Perryman','Harry DeMattia','Darcy Cameron','Edward Allan','Billy Frampton','Tyan Prindable','Tew Jiath','Oscar Steene','Jack Crisp','Reef McInnes','Tim Membrey','Charlie West','Darcy Moore','Beau McCreery','Sam Swadling','Jack Buller','Nick Daicos','Harvey Harrison','Zac McCarthy','Jeremy Howe','William Hayes','Noah Howes','Angus Anderson','Jai Saxena','Ned Long','Roan Steele','Liam Puncher','Harrison Coe','Lachie Neale','Jesse Hogan', 'Flynn Riley','Finnbarr Roarty'
  ]},
  {id:'ess',name:'Essendon',abbr:'ESS',zh:'ESS',color:'#cc2031',clubText:'#fff',logo:'assets/logos/ess.svg',listCap:44,players:[
    'Andrew McGrath','Jacob Farrow','Darcy Parish','Kyle Langford','Jye Caldwell','Brayden Fiorini','Sullivan Robey','Isaac Kako','Will Setterfield','Nik Cox','Dyson Sharp','Archie Perkins','Vigo Visentini','Lewis Hayes','Kayle Gerreyn','Peter Wright','Archie Roberts','Sam Durham','Harrison Jones','Nick Bryan','Jaxon Prior','Archer May','Mason Redman','Xavier Duursma','Max Kondogiannis','Nate Caddy','Zach Reid','Ben McKay','Hussien El Achkar','Jaxon Artemis','Angus Clarke','Nic Martin','Rhys Unwin','Cillian Bourke','Zak Johnson','Jayden Nguyen','Archer Day-Wicks','Thomas Edwards','Lachlan Blakiston','Jack Bowes','Keidean Coleman'
  ]},
  {id:'fre',name:'Fremantle',abbr:'FRE',zh:'FRE',color:'#5b2b82',clubText:'#fff',logo:'assets/logos/fre.svg',listCap:44,players:[
    "Jaeger O'Meara",'Caleb Serong','Sean Darcy','Heath Chapman','Jordan Clark','Andrew Brayshaw','Luke Jackson','Shai Bolton','Tobyn Murray','Hugh Davies','Luke Ryan','Jeremy Sharp','Adam Sweid','Murphy Reid','Judd McVee','Mason Cox','Leon Kickett','Patrick Voss','Oscar McDonald','Charlie Nicholls','Karl Worner','Jye Amiss','Alex Pearce','Hayden Young','Toby Whan','Neil Erasmus','Cooper Simpson','Brandon Walker','Michael Frederick','Corey Wagner','Josh Treacy','Brennan Cox','Joshua Draper','Jaren Carr','Aiden Riddle','Isaiah Dudley','Matthew Johnson','Christopher Scerri','Dominic Bedendo'
  ]},
  {id:'gee',name:'Geelong',abbr:'GEE',zh:'GEEL',color:'#002b5c',clubText:'#fff',logo:'assets/logos/gee.svg',listCap:44,players:[
    'Rowan Marshall','Jay Polkinghorne','Bailey Smith','Tanner Bruhn','Jeremy Cameron','Toby Conway','Shaun Mannagh','Max Holmes','Mitch Knevitt','Mitchell Edwards','Jhye Clark',"Connor O'Sullivan",'Sam De Koning','Lawson Humphries','Jack Martin','Jacob Molier','Oliver Wiltshire','Hunter Holmes','Lennox Hofmann','Jesse Mellor','Harley Barker','Nicholas Driscoll','Oliver Dempsey','James Worpel','Tom Atkins','Gryan Miers','Shannon Neale','Oisin Mullin','Patrick Dangerfield','Oliver Henry','Joe Pike','Jack Henry','Zach Guthrie','Cillian Burke',"Mark O'Connor",'Tom Stewart','Brad Close','Mark Blicavs','Toby Greene','Jordan Ridley'
  ]},
  {id:'gcs',name:'Gold Coast',abbr:'GCS',zh:'GC',color:'#e7192d',clubText:'#fff',logo:'assets/logos/gcs.svg',listCap:44,players:[
    'Mac Andrew','John Noble','Christian Petracca','Jed Walter','Alex Davies','Bodhi Uwland','Leonardo Lombard','Jamarra Ugle-Hagan','Charlie Ballard','Touk Miller','Elliott Himmelberg','Lachie Weller','Noah Anderson','Joel Jeffrey','Daniel Rioli','Matt Rowell','Bailey Humphrey','Ethan Read','Ben Long','Ned Moyle','Sam Collins','Will Graham','Wil Powell','Jarrod Witts','Jake Rogers','Dylan Patterson','Zeke Uwland','Sam Clohesy','Jai Murray','Zak Evans','Max Knobel','Beau Addinsall','Lachlan Gulbin','Avery Thomas','Koby Coulson','Ben Jepson','Caleb Lewis','Oscar Adams','Jy Farrar','Scott Pendlebury','Aidan Schubert','Sam Butler'
  ]},
  {id:'gws',name:'GWS Giants',abbr:'GWS',zh:'GWS',color:'#f15a22',clubText:'#111',logo:'assets/logos/gws.svg',listCap:44,players:[
    'Harvey Thomas','Darcy Jones','Stephen Coniglio','Aaron Cadman','Lachie Ash','Ryan Angwin','Clayton Oliver','Phoenix Gothard','Tom Green','Oliver Hannaford','Toby Bedford','Sam Taylor','Brent Daniels','Finn Callaghan','Conor Stone','Harrison Oliver','Leek Aleer','Josh Kelly','Harry Rowston','Jayden Laverde','Jake Riccardi','Harry Himmelberg','Jack Ough','Cody Angove','James Leake','Toby McMullin',"Xavier O'Halloran",'Oskar Taylor','Max Gruzewski','Logan Smith','Joe Fonti','Josaia Delana','Connor Idun','Nicholas Madden','Nathan Wardius','Riley Hamilton','Jack Buckley','Finnegan Davis','Callum Brown'
  ]},
  {id:'haw',name:'Hawthorn',abbr:'HAW',zh:'HAW',color:'#4d2004',clubText:'#fff',logo:'assets/logos/haw.svg',listCap:44,players:[
    'Harry Morrison','Mitch Lewis','Jai Newcombe','Jarman Impey','Nick Watson','James Sicily','Ned Reeves','Dylan Moore','Connor Macdonald','Karl Amon','Conor Nash','Will Day','Calsher Dear','Jack Scrimshaw','Blake Hardwick',"Massimo D'Ambrosio",'Lloyd Meek','Mabior Chol','Jack Gunston','Noah Mraz','Cameron Nairn','Josh Weddle','Josh Battle','Josh Ward','William McCabe','Cam Mackenzie','Matthew LeRay','Jack Ginnivan','Jack Dalton','Oliver Greeves','Tom Barrass','Max Beattie','Matt Hill','Bailey Macdonald','Zach Merrett','Ollie Purcell','Ben King','Josh Goater'
  ]},
  {id:'mel',name:'Melbourne',abbr:'MEL',zh:'MELB',color:'#061a33',clubText:'#fff',logo:'assets/logos/mel.svg',listCap:44,players:[
    'Jacob van Rooyen','Christian Salem','Harvey Langford','Xavier Lindsay','Caleb Windsor','Jake Lever','Jack Steele','Daniel Turner','Max Gawn','Koltyn Tholstrup','Jai Culley','Changkuoth Jiath','Ed Langdon','Bailey Laurie','Jake Bowey','Xavier Taylor','Thomas Matthews','Matthew Jefferson','Blake Howes','Jed Adams','Max Heath','Brody Mihocek','Harry Sharp','Bayley Fritsch','Tom Sparrow','Latrelle Pickett','Harrison Petty','Kysaiah Pickett','Kade Chandler','Oscar Berry','Ricky Mentha','Paddy Cross','Luker Kentfield','Lukas Cooke','Joel Fitzgerald','Max Mapley', 'Zane Duursma','Will McLachlan','Bodie Ryan'
  ]},
  {id:'nm',name:'North Melbourne',abbr:'NM',zh:'NMFC',color:'#00529b',clubText:'#fff',logo:'assets/logos/nm.svg',listCap:44,players:[
    'Lachy Dovaston',"Finn O'Sullivan",'Harry Sheezel','Aidan Corr','Caleb Daniel','George Wardlaw','Luke Davies-Uniacke','Colby McKercher','Luke McDonald','Jy Simpkin','Charlie Spargo','Luke Urquhart','Dylan Stephens','Zac Fisher','Riley Hardeman','Wil Dawson','Griffin Logue','Nick Larkey','Taylor Goad','Blake Thredgold','Tom Powell','Paul Curtis','Luke Parker','Jack Darling','Hugo Mikunda','Charlie Comben','Toby Pink','Jackson Archer','Matt Whitlock','River Stevens','Cooper Harvey','Tristan Xerri','Tom Blamires','Lachy Brewer','Jacob Konstanty','Oliver Griffin','Cameron Zurhaar','Zac Banch','Cooper Trembath', 'Nick Blakey'
  ]},
  {id:'pa',name:'Port Adelaide',abbr:'PA',zh:'PORT',color:'#008aab',clubText:'#111',logo:'assets/logos/pa.svg',listCap:44,players:[
    'Connor Rozee','Sam Powell-Pepper','Todd Marshall','Joe Berry','Kane Farrell','Jase Burgoyne','Josh Sinn','Christian Moraes','Jack Lukosius','Miles Bergman','Jacob Wehr','Ollie Wines','Jack Whitlock','Jason Horne-Francis','Mitch Georgiades','Aliir Aliir','Logan Evans','Jordon Sweet','Brandon Zerk-Thatcher','Tom Cochrane','Esava Ratugolea','Willem Drew','Ewan Mackinlay','Harrison Ramm','Darcy Byrne-Jones','Lachie Jones','Joe Richards','Jack Watkins','Dante Visentini','Mitch Zadow',"Balyn O'Brien",'Josh Lai','Corey Durdin','Xavier Bamert','Alex Van Wyk','Luke Pedlar'
  ]},
  {id:'ric',name:'Richmond',abbr:'RIC',zh:'RICH',color:'#f2d318',clubText:'#111',logo:'assets/logos/ric.svg',listCap:44,players:[
    'Nick Vlastuin','Jacob Hopper','Sam Lalor','Jack Ross','Sam Banks','Rhyan Mansell','Jonty Faull','Taj Hotton','Luke Trainor','Ben Miller','Hugo Ralphsmith','Tim Taranto','Jayden Short','Josh Smillie','Maurice Rioli','Josh Gibcus','Tom Lynch','Noah Balta','Sam Cumming','Judson Clarke','Sam Grlj','Toby Nankervis','Zane Peucker','Noah Roberts-Thomson','Kane McAuliffe','Jasper Alger','Tom Brown','Patrick Retschko','Harry Armstrong','Tom Sims','Kye Annand','Mykelti Lefau','Seth Campbell','Tom Burton','Patrick Carr','Campbell Gray',"Nathan O'Driscoll",'Kieren Briggs'
  ]},
  {id:'stk',name:'St Kilda',abbr:'STK',zh:'STK',color:'#ed1b2f',clubText:'#fff',logo:'assets/logos/stk.svg',listCap:44,players:[
    'Jack Higgins','Marcus Windhager','Jack Silvagni','Lance Collard','Tobie Travaglia','Jack Macrae','Nasiah Wanganeen-Milera','Bradley Hill','Sam Flanders','Mitch Owens','Hunter Clark','Max King','Ryan Byrnes','Liam Stocker','Dan Butler','Jack Carroll','Tom De Koning','Darcy Wilson','Liam Henry','Angus Hastie','Mattaes Phillipou','Alix Tauru','James Barrat','Alex Dodson','Liam Ryan','Mason Wood','Hugo Garcia','Jack Sinclair','Charlie Banfield','Kye Fincher','Hugh Boxshall','Campbell Lake','Max Hall','Kobe McDonald','Cooper Sharman','Callum Wilkie',"Liam O'Connell",'Eamonn Armstrong','Anthony Caminiti','Sam Marshall'
  ]},
  {id:'syd',name:'Sydney',abbr:'SYD',zh:'SYD',color:'#e31b23',clubText:'#fff',logo:'assets/logos/syd.svg',listCap:44,players:[
    'Chad Warner','Hayden McLean','Brodie Grundy','Isaac Heeney','Logan McDonald','James Rowbottom','Jesse Dattoli','Malcolm Rosas','Tom Papley','Angus Sheldrick','Jai Serong','Callum Mills','Sam Wicks','Braeden Campbell','James Jordon','Jevan Phillipou','Peter Ladhams','Riak Andrew','Errol Gulden','Ned Bowman','Dane Rampe','Billy Cootee','Riley Bice','Justin McInerney','William Edwards','Joel Hamling','Tom McCartin','Max King','Harry Kyle','Caiden Cleary','Matt Roberts','Charlie Curnow','Corey Warner','Liam Hetherton','Tom Hanily','Patrick Snell','Noah Chamberlain','Lewis Melican','Jake Lloyd','William Green'
  ]},
  {id:'wce',name:'West Coast',abbr:'WCE',zh:'WCE',color:'#003087',clubText:'#fff',logo:'assets/logos/wce.svg',listCap:48,players:[
    'Willem Duursma','Jake Waterman','Liam Baker','Brandon Starcevich','Josh Lindsay','Elliot Yeo','Reuben Ginbey','Elijah Hewett','Harley Reid','Tim Kelly','Sam Allen','Noah Long','Liam Duggan','Matthew Owies','Jack Graham','Tom McCarthy','Brady Hough','Tylar Young','Cooper Duff-Tytler','Archer Reid','Ryan Maric','Matt Flynn','Bo Allan','Tom Gross','Tom Cole','Clay Hall','Lucca Grego','Bailey J. Williams','Rhett Bazzo','Jack Williams','Jobe Shanahan','Tylah Williams','Malakai Champion','Hamish Davis','Fred Rodriguez','Deven Robertson','Sandy Brock','Harry Edwards','Tyrell Dewar','Jack Hutchinson','Finlay Macrae','Jacob Newton','Milan Murdock','Harry Schoenberg','Jake Miles-Wrency','Oliver Francou','Marcus Herbert','Jack Viney','Trent Rivers'
  ]},
  {id:'wbd',name:'Western Bulldogs',abbr:'WBD',zh:'WB',color:'#1b4f9c',clubText:'#fff',logo:'assets/logos/wbd.svg',listCap:44,players:[
    'Lachlan Carmichael','Cody Weightman','Marcus Bontempelli','Jedd Busslinger','Cooper Hynes','Rory Lobb','Matthew Kennedy','Ryley Sanders','Sam Darcy','Lachie Jaques','Rhylee West','Will Darcy','Jordan Croft',"James O'Donnell",'Connor Budarick','Ed Richards','Caleb May','Laitham Vandermeer','Buku Khamis','Louis Emmett','Josh Dolan','Joel Freijah','Will Lewis','Lachlan Bramble','Bailey Dale','Arthur Jones','Aaron Naughton','Bailey Williams','Luke Kennedy','Luke Cleary','Michael Sellwood','Riley Garcia','Sam Davidson','Tim English','Jordon Butts','Zak Butters','Finn Maginness','Hudson O\'Keeffe'
  ]}
];

const DVI = {1:3000,2:2481,3:2178,4:1962,5:1795,6:1659,7:1543,8:1443,9:1355,10:1276,11:1205,12:1140,13:1080,14:1024,15:973,16:924,17:879,18:836,19:796,20:757,21:721,22:686,23:653,24:621,25:590,26:561,27:533,28:505,29:479,30:454,31:429,32:405,33:382,34:360,35:338,36:317,37:297,38:277,39:257,40:238,41:220,42:202,43:184,44:167,45:150,46:134,47:118,48:102,49:86,50:71,51:57,52:42,53:28,54:14};

const PICKS_2026 = {
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
const PICK_ORIGIN_2026 = {21:'ess',34:'ade',45:'wce',107:'mel',5:'pa',6:'nm',47:'nm',4:'pa',7:'gcs',12:'mel',14:'wbd',16:'gee',17:'haw',18:'syd',22:'ric',25:'nm',26:'gcs',27:'gws',29:'stk',31:'mel',32:'car',33:'wbd',43:'ess',48:'gcs',49:'gws',52:'col',53:'mel',54:'car',58:'haw',59:'syd',61:'bri',62:'ess',63:'ric',67:'gcs',68:'gws',71:'mel',73:'wbd',74:'ade',76:'haw',77:'syd',81:'ric',83:'pa',89:'mel'};

const PICKS_2027 = {
  ade:[[1,'ade'],[2,'ade'],[3,'ade'],[4,'ade'],[4,'ric']],
  bri:[[1,'bri'],[1,'stk'],[2,'mel'],[2,'wbd'],[3,'bri'],[4,'bri']],
  car:[[1,'car'],[1,'syd'],[3,'car'],[4,'car']],
  col:[[1,'col'],[2,'col'],[3,'col'],[4,'col']],
  ess:[[1,'ess'],[1,'gee'],[2,'ess'],[3,'ess'],[4,'ess']],
  fre:[[1,'fre'],[2,'fre'],[3,'fre'],[4,'fre']],
  gee:[[2,'gee'],[3,'gee'],[4,'gee']],
  gcs:[[1,'gcs'],[3,'gcs'],[4,'gcs']],
  gws:[[1,'gws'],[2,'gws'],[3,'gws'],[4,'gws']],
  haw:[[1,'haw'],[2,'haw'],[2,'gcs'],[4,'haw']],
  mel:[[2,'bri'],[2,'wce'],[4,'wce']],
  nm:[[1,'nm'],[3,'nm'],[3,'pa'],[4,'nm']],
  pa:[[1,'pa'],[1,'mel'],[1,'ric'],[2,'ric']],
  ric:[[3,'ric']],
  stk:[[2,'stk'],[3,'mel'],[3,'stk'],[3,'wce'],[4,'mel'],[4,'stk']],
  syd:[[2,'car'],[2,'syd'],[2,'nm'],[3,'syd'],[4,'syd']],
  wce:[[1,'wce'],[3,'haw']],
  wbd:[[1,'wbd'],[2,'pa'],[3,'wbd'],[4,'wbd'],[4,'pa']]
};

// Confirmed future-pick ownership, AFL official register updated 14 Oct 2026.
const PICKS_2028 = {
  ade:[[1,'ade'],[2,'ade'],[3,'ade'],[4,'ade']],
  bri:[[1,'bri'],[2,'bri'],[3,'bri'],[4,'bri']],
  car:[[1,'car'],[2,'car'],[3,'col'],[4,'car'],[4,'pa']],
  col:[[1,'col'],[2,'col'],[4,'col']],
  ess:[[1,'ess'],[2,'ess'],[2,'gee'],[2,'haw'],[3,'ess']],
  fre:[[1,'fre'],[2,'fre'],[3,'fre'],[4,'fre']],
  gee:[[1,'gee'],[3,'gee'],[3,'stk'],[4,'gee'],[4,'ess']],
  gcs:[[1,'haw'],[3,'gcs'],[4,'gcs']],
  gws:[[1,'gws'],[2,'gws'],[3,'gws'],[3,'car'],[4,'gws']],
  haw:[[1,'gcs'],[2,'gcs'],[4,'haw']],
  mel:[[1,'mel'],[2,'wce'],[3,'mel']],
  nm:[[2,'syd'],[3,'nm'],[4,'nm']],
  pa:[[1,'pa'],[1,'wbd']],
  ric:[[1,'ric'],[2,'ric'],[3,'ric'],[4,'ric']],
  stk:[[1,'stk'],[2,'stk'],[4,'stk']],
  syd:[[1,'syd'],[1,'nm'],[2,'nm'],[3,'syd'],[4,'syd']],
  wce:[[1,'wce'],[2,'mel'],[3,'wce'],[4,'wce']],
  wbd:[[2,'wbd'],[2,'pa'],[3,'wbd'],[3,'haw'],[3,'pa'],[4,'wbd'],[4,'mel']]
};

window.ATM_DATA = {
  updated:'16 Oct 2026 — official AFL post-trade 115-pick order, verified future picks and Hawthorn list changes',
  clubs:ATM_CLUBS,
  dvi:DVI,
  picks2026:PICKS_2026,
  pickOrigin2026:PICK_ORIGIN_2026,
  picks2027:PICKS_2027,
  picks2028:PICKS_2028
};

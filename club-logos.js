(() => {
  const D=window.ATM_DATA; if(!D?.clubs)return;
  // Recognisable club artwork rather than the translucent/generated placeholder marks.
  const names={
    ade:'Adelaide_Football_Club_logo.svg',
    bri:'Brisbane_Lions_logo.svg',
    car:'Carlton_Football_Club_logo.svg',
    col:'Collingwood_Football_Club_logo.svg',
    ess:'Essendon_Football_Club_logo.svg',
    fre:'Fremantle_Football_Club_logo.svg',
    gee:'Geelong_Football_Club_logo.svg',
    gcs:'Gold_Coast_Suns_logo.svg',
    gws:'Greater_Western_Sydney_Giants_logo.svg',
    haw:'Hawthorn_Football_Club_logo.svg',
    mel:'Melbourne_Football_Club_logo.svg',
    nm:'North_Melbourne_Football_Club_logo.svg',
    pa:'Port_Adelaide_Football_Club_logo.svg',
    ric:'Richmond_Football_Club_logo.svg',
    stk:'St_Kilda_Football_Club_logo.svg',
    syd:'Sydney_Swans_logo.svg',
    wce:'West_Coast_Eagles_logo.svg',
    wbd:'Western_Bulldogs_logo.svg'
  };
  D.clubs.forEach(c=>{
    c.fallbackLogo=c.logo;
    if(names[c.id]) c.logo=`https://en.wikipedia.org/wiki/Special:FilePath/${names[c.id]}`;
  });
})();
(() => {
  const D=window.ATM_DATA;if(!D?.clubs)return;
  const map={};
  D.clubs.forEach(c=>{
    const path=`assets/logos/${c.id}.svg`;
    map[c.id]=path;
    c.logo=path;
  });
  window.ATM_CLUB_LOGOS=map;
})();

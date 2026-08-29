# AFL Trade Machine v6.8

Independent AFL trade, draft, redraft and Best 23 simulator.

## V6.8 changes
- Corrected **My Mock Draft** to use genuine live player-selection numbering. Bid-payment/absorbed assets remain visible as unnumbered mechanics rows instead of consuming draft numbers.
- My Mock Draft now runs to a genuine **40 player selections**, including:
  - 35 North Melbourne — Darcy Szerszyn
  - 36 Port Adelaide — Jack Slattery
  - 37 Melbourne — Xavier Ladbrook
  - 38 St Kilda — Sam Gayfer
  - 39 Sydney — Mason McGroder
  - 40 Sydney — Henry Meaney
- Corrected the Zach Merrett/Hawthorn mock-trade explanation to the current baseline package of Picks **15, 25 and 26** (2,124 baseline DVI points).
- Live Draft Simulator keeps club logos in the draft order and adds prospect/player photos to the pool, drag cards, selected prospect and drafted-player row where a photo is available.
- Added **COMPARE WITH MY MOCK** to the 2026 Live Simulator. It compares each live selection with My Mock Draft and reports matches/differences/pending selections.
- Added **REDRAFT 2011–2025**:
  - choose any of the previous 15 completed drafts;
  - load the entire National Draft class plus first-time Rookie Draft selections;
  - drag any player into a hindsight Top 30, including players originally outside the top 30 or rookie selections;
  - load the actual Top 30 as a starting point;
  - compare your redraft with the actual draft, including risers/fallers, rookie-to-top-30 entries, new top-30 players and actual top-30 players dropped.
- Historical draft data is loaded through `/api/redraft-class`, using the relevant Wikipedia AFL draft page and cached by Vercel.
- Best 23 is now field-dropdown free: use click targeting and drag/drop only. Field position containers blend into the oval; compact player tags carry club colours.
- Best 23 supports **DELIST / RESTORE**, including removing a delisted player from the field if selected.
- AFL listed-player views use `/api/player-photos` to resolve current-player headshots with a clean placeholder fallback.
- Club colour treatments include Richmond black/yellow/black, West Coast dark-yellow/blue/dark-yellow, Carlton solid navy, Western Bulldogs red/white/blue and GWS orange/dark-blue/orange.
- Preserves the **RUN TRADE** verdict system covering indicative fairness, club-by-club balance, list-size/compliance issues, future-pick warnings, player-consent caveats and known estimated salary movement.

## Notes
Trade fairness and draft mechanics are modelling tools, not official AFL rulings or valuations. Historical redraft data requires the deployed Vercel API route to access Wikipedia. Player-photo availability depends on the AFL Fantasy feed and supplied draft-prospect profile photos; missing images fall back safely rather than breaking the UI.

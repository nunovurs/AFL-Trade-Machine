# AFL Trade Machine v6.10

Independent AFL trade, draft, redraft and Best 23 simulator.

## V6.10 updates
- Best 23 now includes a **VFL / reserves Best 23** directly underneath the AFL side. The same player can only exist in one place at a time: AFL 23, VFL 23, or the unselected squad pool.
- The squad pool now shows **only unselected players**. Selecting a player onto either field removes them from the pool; dragging them back returns them. Players can also be dragged directly AFL ↔ VFL.
- Added separate clear controls for AFL 23, VFL 23 and both teams, while COPY TEAM now copies both sides.
- Rebuilt the North Melbourne/Carlton mock trade wording: North send their natural 2026 first + **2027 third-round pick** for Carlton's natural 2026 first + the Sydney-origin 2026 first.
- Cody Walker's Pick 2 match is now modelled using the North-origin first (baseline Pick 6) + Carlton's Gold Coast-origin second (baseline Pick 23), leaving an indicative 169-point deficit under the current DVI table.
- Jake Eime is explicitly tied to the Carlton-natural first that North retain. The Sydney-origin first is then on-traded by North to Adelaide for **Nick Murray**, and Adelaide use that pick on Ethan Herbert.
- Removed the erroneous second consecutive Carlton selection. Carlton take **Jack Pickett at 25**; every later live selection shifts up one.
- **Albert MacGowan moves to Geelong (27)**, **Noah Williams to Hawthorn (28)**, Gabriel Patterson drops out of the Top 40, and **Lachlan Hicks enters at Western Bulldogs Pick 40**.
- Updated Melbourne/West Coast and Zach Merrett pick-path wording so finals-dependent selections are tracked by **asset origin**, not stale fixed pick numbers.
- Fixed historical Redraft loading across **2011–2024** by selecting the actual Pick/Player/Club draft table rather than the notation/legend table used on many older Wikipedia draft pages.
- Fixed historical club matching so **North Melbourne** is not misidentified as Melbourne (and longer club names win over partial matches).
- Redraft is now permanently **pick-for-pick side-by-side**: Your Redraft on the left and the Actual Draft on the right for selections 1–30.
- Fixed comparison calculations when the user leaves gaps in their Top 30, so movement is based on the actual slot number rather than a compressed list.

## Carried forward from V6.8
- Corrected **My Mock Draft** to use genuine live player-selection numbering. Bid-payment/absorbed assets remain visible as unnumbered mechanics rows instead of consuming draft numbers.
- My Mock Draft runs to a genuine **40 player selections**. The corrected 25–40 tail is:
  - 25 Carlton — Jack Pickett
  - 26 GWS via Essendon/Hawthorn — Jackson Hewitt
  - 27 Geelong — Albert MacGowan
  - 28 Hawthorn — Noah Williams
  - 29 Sydney — Lachie Burrows
  - 30 West Coast — Garrison Kenh
  - 31 Fremantle — Benji Van Rooyen
  - 32 Adelaide — Archie Van Dyk
  - 33 Richmond — Gus Kennedy
  - 34 North Melbourne — Darcy Szerszyn
  - 35 Port Adelaide — Jack Slattery
  - 36 Melbourne — Xavier Ladbrook
  - 37 St Kilda — Sam Gayfer
  - 38 Sydney — Mason McGroder
  - 39 Sydney — Henry Meaney
  - 40 Western Bulldogs — Lachlan Hicks
- Zach Merrett/Hawthorn trade explanations now track Hawthorn’s first-round asset plus the GWS-origin and St Kilda-origin second-round assets without freezing a finals-dependent first-round number.
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

# AFL Trade Machine v3

Independent AFL simulator owned by the repository owner.

## Trade Machine
- 18 clubs alphabetically with club marks
- expanded 2026 player lists
- 2-, 3- and 4-club desktop layouts
- current 2026 pick ownership and DVI points
- 2027 / 2028 future selections
- list-size overflow checks
- **Incoming and Outgoing shown together in every club panel**
- player contract context where verified
- estimated salary movement where credible public reporting exists
- Sean Darcy example: contracted to 2030, publicly reported estimate $700k-$800k p.a., plus 2026 WAFL context

## Mock Draft (new)
- Trade Machine / Mock Draft mode switch
- starts from current Zero Hanger 2026 pick ownership/order snapshot
- prospect board with club-tied labels
- make selections pick-by-pick
- trade the on-clock pick
- father-son / Academy / NGA bid prompts
- 2026 ladder-based bid loading/discount
- maximum two current picks to match bids through Pick 36
- 412-point deficit cap logic
- live draft order and draft log

## Important mock-draft limitation
The first mock-draft release implements the main 2026 bid cost, two-pick and deficit rules. The AFL's most complex surplus-pick reshuffling and new first-round slide compensation mechanics are approximated in this MVP and should not yet be treated as an exact official draft-night calculator.

## Data sources
- Draft order / pick ownership / DVI: Zero Hanger 2026 Draft Order
- Prospect seed board: Zero Hanger 2026 Draft Hub / Top 100
- Bidding framework: AFL.com.au 2026 player-movement rule changes
- Player list data: existing AFL Trade Machine v2 dataset
- Contract context: club/AFL confirmations and clearly labelled media salary estimates

## Uploading v3
Upload/replace these files in the existing GitHub repository:
- `index.html`
- `styles.css`
- `app.js`
- `README.md`
- `draft-data.js` (new)
- `mock-draft.js` (new)

**Keep the existing `data.js` file in the repository.** v3 uses the current v2 `data.js` dataset.

The project is not affiliated with or endorsed by the AFL. Trade values and salary estimates are indicative only.

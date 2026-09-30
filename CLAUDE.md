# Notes for Claude

This is a learning project: the user is learning US geography and economics by filling in one or two states a day. Their understanding matters more than speed.

- Talk with the user in Chinese. Everything in the map and data files is in English.
- Adding a state is a data-only change. Don't touch app code for it.

## Adding a state

1. Before researching, ask the user for their guess about what the state lives on. Record it in `myGuess`.
2. Get real numbers from the sources in README.md (BEA SAGDP2, BLS QCEW, Census) for the latest full year available. Never write figures from memory; if a number can't be found, say so and leave it out.
3. Copy `data/states/_TEMPLATE.js` to `data/states/<CODE>.js` and fill it in:
   - `specialties`: 2-4 entries, sorted by LQ, each with a specific `why` (geography, resources, history, policy). Use only category ids from `data/categories.js`.
   - `largest`: 3-5 sectors by share of state GDP, with `usShare` when available.
   - `gdpRank` is among the 50 states + DC.
4. Leave `oneLiner` for the user to write, or draft one only if they ask.
5. Add the code to `data/studied.js`, then run `node tools/check.js`.
6. Commit as `Add <State> (<CODE>)`.

Follow the route order in `data/geo.js` unless the user picks a different state.

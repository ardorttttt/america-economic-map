# America Economic Map

An interactive map of the pillar industries of all 50 states and DC, filled in one or two states a day while learning US geography along the way.

**Live map: https://ardorttttt.github.io/america-economic-map/**

Or open `index.html` locally in a browser; no build step or server needed.

## How the map works

- **Grey** states are not studied yet. **Blue** ones are done. The **dashed orange** outline marks the next stop on the route.
- Click a state (or a row in the side panel) to open its profile. Small northeastern states have callout labels on the right, and zooming in shows their labels in place.
- **Highlight industry** recolors the map for one industry: dark blue where it is the state's top specialty, light blue where it's one of its specialties. The panel lists those states.
- **Route** draws the study trail. **Labels** toggles the postal codes.
- The URL remembers the view, e.g. `index.html#TX` or `index.html#energy/TX`.

## Two layers per state

1. **Signature industries** (shown first): what sets the state apart, ranked by **location quotient**:
   LQ = industry's share of the state ÷ industry's share of the US. An LQ above ~1.5 is a real specialty. Each one says *why it is here*: geography, resources, history or policy.
2. **Largest sectors**: the biggest slices of state GDP, with the US share drawn as a marker. This layer is often dull (real estate, government, healthcare), and that is why the specialties come first.

Every specialty belongs to one of the fixed categories in `data/categories.js`, so states can be compared across the map.

## The route

East to west through the nine Census divisions. Each stop borders the one before it, except WV → NC and the jumps to Alaska and Hawaii:

New England → Mid-Atlantic → South Atlantic → East South Central → East North Central → West North Central → West South Central → Mountain → Pacific

## Daily workflow

1. **Guess first.** Before looking anything up, write down what you think the state lives on.
2. Research it with real data (see sources below) and fill in `data/states/<CODE>.js`, starting from `data/states/_TEMPLATE.js`.
3. Write your own `oneLiner`.
4. Add the code to `data/studied.js`.
5. Run `node tools/check.js` to validate, then commit and push. The live site updates in about a minute.

## Data sources

- GDP and GDP by industry: BEA, [GDP by State](https://www.bea.gov/data/gdp/gdp-state) (table SAGDP2, current dollars)
- Employment location quotients: BLS [QCEW](https://www.bls.gov/cew/) (published LQs by industry and state)
- Population: Census Bureau [population estimates](https://www.census.gov/programs-surveys/popest.html)

Record the data year in `stats.year` and cite sources in each state file.

## Files

```
index.html, styles.css, app.js   the page
data/geo.js                      states, Census divisions, route order
data/categories.js               fixed industry taxonomy
data/studied.js                  which states are done
data/states/<CODE>.js            one file per studied state
data/us-states-topo.js           state boundaries (us-atlas, Albers USA)
tools/check.js                   data validator
vendor/                          d3 v7.9.0, topojson-client v3.1.0
```

// Template for one state. Copy to data/states/<CODE>.js, replace XX with the
// postal code, fill it in, then add the code to data/studied.js.
// Optional fields can be omitted; the panel skips anything that is missing.

(window.STATE_DATA = window.STATE_DATA || {}).XX = {
  code: "XX",
  studied: "YYYY-MM-DD",            // the day you studied it
  nickname: "",                     // e.g. "The Pine Tree State"
  capital: "",
  largestCity: "",

  stats: {
    year: 2024,                     // data year for the numbers in this block
    gdp: 0,                         // nominal GDP, $ billions (BEA)
    gdpRank: 0,                     // rank among the 50 states + DC
    population: 0,                  // millions (Census Bureau estimate)
  },

  // Layer 1 (shown first): what makes this state different from the US as a whole.
  // Ranked by location quotient, highest first. LQ = state share / US share;
  // above ~1.5 is a real specialty. Aim for 2-4 entries.
  specialties: [
    {
      name: "",                     // specific: "Lobster & seafood", not "Agriculture"
      category: "",                 // an id from data/categories.js
      lq: 0,
      lqBasis: "employment",        // "employment" (BLS QCEW) or "gdp" (BEA)
      why: "",                      // why here: geography, resources, history, policy
      players: [],                  // companies or institutions
      places: [],                   // cities, regions, ports, basins
    },
  ],

  // Layer 2: the biggest sectors by share of state GDP, largest first. Aim for 3-5.
  // usShare (optional) is the same sector's share of US GDP, drawn as a marker.
  largest: [
    { name: "", share: 0, usShare: 0 },
  ],

  // Physical anchors worth remembering: coast, rivers, mountains, ports, climate.
  // Bordering states are computed from the map, so don't list them here.
  geography: [],

  myGuess: "",                      // what you guessed before studying
  oneLiner: "",                     // your own one-sentence summary

  sources: [
    { label: "", url: "" },
  ],
};

// Maine. Numbers: BEA SAGDP2 (2025, released Sept 2026), BLS QCEW 2025 annual
// averages, Census Vintage 2025. LQs are private-sector employment; the grouped
// ones (seafood, forest products) are computed from QCEW by summing NAICS codes.

(window.STATE_DATA = window.STATE_DATA || {}).ME = {
  code: "ME",
  studied: "2026-09-30",
  nickname: "The Pine Tree State",
  capital: "Augusta",
  largestCity: "Portland",

  stats: {
    year: 2025,
    gdp: 101.7,
    gdpRank: 44,
    population: 1.4149,
  },

  specialties: [
    {
      name: "Navy shipbuilding",
      category: "aerospace",
      lq: 12.4, // NAICS 3366, private only; the federal shipyard in Kittery adds ~6,700 more jobs
      lqBasis: "employment",
      why: "Maine built wooden ships for centuries from its own timber along a coast full of deep harbors, and Bath on the Kennebec River became the \"City of Ships.\" That skill base turned into Navy work: Bath Iron Works is the lead yard for the Navy's Arleigh Burke-class destroyers, and Portsmouth Naval Shipyard in Kittery, the oldest continuously operating naval shipyard in the US (1800), overhauls nuclear attack submarines.",
      players: ["Bath Iron Works (General Dynamics, ~6,800 workers)", "Portsmouth Naval Shipyard (US Navy)"],
      places: ["Bath", "Kittery"],
    },
    {
      name: "Lobster & seafood",
      category: "agriculture",
      lq: 9.8, // fishing + aquaculture + seafood processing (NAICS 1141, 1125, 3117)
      lqBasis: "employment",
      why: "The cold Gulf of Maine and a rocky, deeply indented coast are ideal lobster habitat, and Maine lands over 80% of the American lobster caught in the US. In 2025 harvesters landed 78.8 million pounds worth $461 million, down for a fourth straight year. Payroll data undercounts this sector because most lobstermen are self-employed.",
      players: ["Independent owner-operator lobster boats", "Farmed oysters, mussels and salmon"],
      places: ["Stonington", "Portland", "Damariscotta River"],
    },
    {
      name: "Forest products: logging, lumber & paper",
      category: "resources",
      lq: 3.0, // logging + wood products + paper (NAICS 113, 321, 322)
      lqBasis: "employment",
      why: "Nearly 90% of Maine is forest, the highest share of any state. Its rivers once carried logs to mills and powered them, so paper towns grew up at the falls. Many mills closed as demand for printing paper fell, but five pulp and paper mills still run, several re-tooled for specialty grades.",
      players: ["Sappi (Somerset Mill)", "ND Paper", "Woodland Pulp"],
      places: ["Skowhegan", "Rumford", "Baileyville", "North Maine Woods"],
    },
    {
      name: "Tourism & lodging",
      category: "tourism",
      lq: 1.6, // accommodation, NAICS 721
      lqBasis: "employment",
      why: "A rocky coast, lighthouses, lakes and woods within a day's drive of Boston and New York. Maine's license plates say \"Vacationland.\" Acadia National Park drew about 4.1 million visits in 2025, a record. The season is short: visits peak in July and August.",
      players: ["Acadia National Park", "L.L.Bean (Freeport)"],
      places: ["Bar Harbor & Mount Desert Island", "Portland", "Kennebunkport", "Old Orchard Beach"],
    },
  ],

  largest: [
    { name: "Real estate, rental & leasing", share: 15.3, usShare: 13.7 },
    { name: "Government", share: 11.6, usShare: 11.1 },
    { name: "Health care & social assistance", share: 11.2, usShare: 7.5 },
    { name: "Retail trade", share: 8.5, usShare: 5.9 },
    { name: "Manufacturing", share: 8.1, usShare: 9.5 },
  ],

  geography: [
    "The only state that borders just one other state (New Hampshire). Canada's Quebec and New Brunswick wrap around the north and east.",
    "A rocky, deeply indented coast on the Gulf of Maine: short as the crow flies, thousands of miles long once every bay and island is counted.",
    "Big rivers (Androscoggin, Kennebec, Penobscot) run south from the North Maine Woods to the sea.",
    "Mount Katahdin, the highest point, is the northern end of the Appalachian Trail.",
    "Most people live in the south (Portland, Lewiston, Augusta, Bangor); the north is almost empty timberland.",
    "The oldest state by median age (about 45 in 2025), which helps explain why health care is such a large share of the economy.",
  ],

  myGuess: "Forestry, fishing, and tourism.",
  oneLiner: "Maine's special industries are fishing (mainly lobster, it lands over 80% of the lobster in the US), forestry, tourism, and navy shipbuilding.",

  sources: [
    { label: "BEA: GDP by state and industry (SAGDP2), 2025", url: "https://www.bea.gov/data/gdp/gdp-state" },
    { label: "BLS QCEW: Maine 2025 annual averages with location quotients", url: "https://data.bls.gov/cew/data/api/2025/a/area/23000.csv" },
    { label: "Census Bureau: Vintage 2025 state population estimates", url: "https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv" },
    { label: "Maine DMR: 2025 commercial fisheries landings", url: "https://www.maine.gov/dmr/news/fri-03062026-1200-2025-maine-commercial-fisheries-value-again-tops-600-million" },
    { label: "NOAA Fisheries: American lobster", url: "https://www.fisheries.noaa.gov/species/american-lobster" },
    { label: "NAVSEA: Portsmouth Naval Shipyard", url: "https://www.navsea.navy.mil/Home/Shipyards/Portsmouth/About-Us/" },
    { label: "Bath Iron Works", url: "https://en.wikipedia.org/wiki/Bath_Iron_Works" },
    { label: "National Association of State Foresters: Maine", url: "https://www.stateforesters.org/districts/maine/" },
    { label: "Sun Journal: Maine's remaining paper mills (Aug 2026)", url: "https://www.sunjournal.com/2026/08/27/maines-remaining-paper-mills-race-to-survive/" },
    { label: "Maine Public: Acadia's record 2025 visitation", url: "https://www.mainepublic.org/environment-and-outdoors/2026-01-27/acadia-national-park-saw-record-number-of-visitors-in-2025" },
  ],
};

// Connecticut. Numbers: BEA SAGDP2 (2025, released Sept 2026), BLS QCEW 2025
// annual averages, Census Vintage 2025. Shipbuilding employment is suppressed in
// QCEW (one dominant employer), so the defense-manufacturing LQ uses BEA GDP.

(window.STATE_DATA = window.STATE_DATA || {}).CT = {
  code: "CT",
  studied: "2026-10-13",
  nickname: "The Constitution State",
  capital: "Hartford",
  largestCity: "Bridgeport",

  stats: {
    year: 2025,
    gdp: 382.6,
    gdpRank: 23,
    population: 3.6885,
  },

  specialties: [
    {
      name: "Jet engines, helicopters & submarines",
      category: "aerospace",
      lq: 6.6, // BEA "other transportation equipment" (aircraft + ships), 4.3% of state GDP
      lqBasis: "gdp",
      why: "Pratt & Whitney, headquartered in East Hartford, builds the F135 engines that power the F-35 fighter; aircraft-engine jobs alone are about 15 times the US share. Sikorsky, in Stratford, builds military helicopters such as the CH-53K. Electric Boat in Groton has been the Navy's main submarine builder for over 100 years and does final assembly on the hull sections made in Rhode Island. Together this industry is 4.3% of state GDP.",
      players: ["Pratt & Whitney (RTX)", "Sikorsky (Lockheed Martin)", "Electric Boat (General Dynamics)"],
      places: ["East Hartford", "Middletown", "Stratford", "Groton"],
    },
    {
      name: "Insurance",
      category: "finance",
      lq: 3.0, // BEA insurance carriers and related activities, 9.1% of state GDP
      lqBasis: "gdp",
      why: "Hartford merchants began insuring ships and warehouses in the early 1800s (Hartford Fire in 1810, Aetna in 1819, Travelers in 1864), and the city's insurers built a national name by paying claims after great fires in New York and Chicago. Insurance carriers still produce 9% of state GDP, three times the US share, though the \"Insurance Capital of the World\" has lost ground; Aetna now belongs to CVS Health.",
      players: ["Travelers", "The Hartford", "Aetna (CVS Health)"],
      places: ["Hartford"],
    },
    {
      name: "Hedge funds & asset management",
      category: "finance",
      lq: 2.8, // portfolio management, NAICS 52394
      lqBasis: "employment",
      why: "Fairfield County sits next to New York City but offers lower taxes and shorter commutes, so hedge funds clustered in Greenwich, Stamford and Westport, and new funds kept spinning off from old ones nearby. Bridgewater is in Westport, Point72 in Stamford, and AQR and Viking Global in Greenwich.",
      players: ["Bridgewater Associates", "Point72", "AQR", "Viking Global"],
      places: ["Greenwich", "Stamford", "Westport"],
    },
    {
      name: "Universities",
      category: "health",
      lq: 2.6, // colleges and universities, NAICS 6113, private only
      lqBasis: "employment",
      why: "Yale, founded in 1701, anchors New Haven, joined by Wesleyan, Trinity and the public University of Connecticut. Private colleges alone employ about 36,000 people, and education is more than twice the US share of GDP.",
      players: ["Yale University", "Wesleyan University", "Trinity College", "UConn"],
      places: ["New Haven", "Middletown", "Hartford", "Storrs"],
    },
  ],

  largest: [
    { name: "Finance & insurance", share: 16.4, usShare: 8.7 },
    { name: "Real estate, rental & leasing", share: 13.1, usShare: 13.7 },
    { name: "Manufacturing", share: 10.5, usShare: 9.5 },
    { name: "Government", share: 8.8, usShare: 11.1 },
    { name: "Health care & social assistance", share: 8.5, usShare: 7.5 },
  ],

  geography: [
    "The Connecticut River, New England's longest, runs south past Hartford to Long Island Sound.",
    "Two halves: the southwest corner (Fairfield County) is part of New York City's commuter belt, while Hartford and the rest of the state are more tied to New England.",
    "The whole south coast faces Long Island Sound. Groton, on the Thames River, is home to the Navy's submarine base and Electric Boat's shipyard.",
    "Hartford is the capital; Bridgeport is the largest city.",
    "GDP per person is the 6th-highest of the 50 states (7th counting DC), about $104,000, second in New England after Massachusetts.",
  ],

  myGuess: "Ship (submarine) assembly, hinted by Rhode Island.",
  oneLiner: "Connecticut lives on submarine assembly, insurance, hedge funds drawn by low taxes, and universities.",

  sources: [
    { label: "BEA: GDP by state and industry (SAGDP2), 2025", url: "https://www.bea.gov/data/gdp/gdp-state" },
    { label: "BLS QCEW: Connecticut 2025 annual averages with location quotients", url: "https://data.bls.gov/cew/data/api/2025/a/area/09000.csv" },
    { label: "Census Bureau: Vintage 2025 state population estimates", url: "https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv" },
    { label: "CT Office of Military Affairs: Pratt & Whitney F135 contract (2026)", url: "https://portal.ct.gov/oma/in-the-news/2026-news/ct-based-pratt-whitney-gets-3-8-billion-contract-modification-for-more-fighter-jet-engines" },
    { label: "CT Public: Sikorsky wins $10B helicopter contract (2025)", url: "https://www.ctpublic.org/news/2025-09-26/stratford-based-sikorsky-wins-a-10b-helicopter-contract" },
    { label: "General Dynamics Electric Boat", url: "https://en.wikipedia.org/wiki/General_Dynamics_Electric_Boat" },
    { label: "Connecticut History: Aetna and the Insurance Capital of the World", url: "https://connecticuthistory.org/aetna-helps-make-hartford-the-insurance-capital-of-the-world/" },
    { label: "Hartford Business Journal: Hartford's insurance capital status", url: "https://hartfordbusiness.com/article/marketing-push-defends-hartfords-insurance-capital-status-as-midwest-rivals-gain-ground/" },
    { label: "Greenwich Time: CT cements status as hedge fund capital", url: "https://www.greenwichtime.com/business/article/CT-cements-status-as-hedge-fund-capital-16468437.php" },
  ],
};

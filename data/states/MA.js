// Massachusetts. Numbers: BEA SAGDP2 (2025, released Sept 2026), BLS QCEW 2025
// annual averages, Census Vintage 2025. LQs are private-sector employment; the
// grouped one (fishing + seafood processing) is computed from QCEW by summing NAICS codes.

(window.STATE_DATA = window.STATE_DATA || {}).MA = {
  code: "MA",
  studied: "2026-10-12",
  nickname: "The Bay State",
  capital: "Boston",
  largestCity: "Boston",

  stats: {
    year: 2025,
    gdp: 813.6,
    gdpRank: 12,
    population: 7.154,
  },

  specialties: [
    {
      name: "Biotech research",
      category: "health",
      lq: 9.7, // R&D in biotechnology, NAICS 541714 (~64,000 jobs)
      lqBasis: "employment",
      why: "MIT, Harvard and Boston's big teaching hospitals turn out scientists and discoveries, and companies cluster right next to them in Cambridge's Kendall Square. Biogen has been there since the early 1980s and Moderna is headquartered in Cambridge. Boston and Cambridge lead the nation in NIH research funding. Biotech R&D alone employs about 64,000 people here, nearly 10 times the US share.",
      players: ["Biogen", "Moderna", "MIT and Harvard labs"],
      places: ["Kendall Square, Cambridge", "Boston", "Waltham"],
    },
    {
      name: "Scallops & seafood",
      category: "agriculture",
      lq: 4.7, // fishing + seafood processing (NAICS 1141, 3117)
      lqBasis: "employment",
      why: "New Bedford has been the most valuable fishing port in the US for more than 20 years, almost entirely because of Atlantic sea scallops dredged on offshore banks like Georges Bank. It's a real specialty by LQ but tiny next to the rest of the economy: about 4,300 jobs, and fishing and forestry together are under 0.1% of state GDP.",
      players: ["New Bedford scallop fleet"],
      places: ["New Bedford", "Gloucester", "Georges Bank (offshore)"],
    },
    {
      name: "Universities",
      category: "health",
      lq: 3.5, // colleges and universities, NAICS 6113, private only
      lqBasis: "employment",
      why: "Harvard, founded in 1636, is the oldest college in the US, and MIT, Boston University, Northeastern and dozens more pack the Boston area. Private colleges alone employ over 100,000 people. They also feed the other specialties: the scientists for biotech, the engineers for software, the analysts for finance.",
      players: ["Harvard", "MIT", "Boston University", "Northeastern"],
      places: ["Cambridge", "Boston", "Amherst"],
    },
    {
      name: "Asset management",
      category: "finance",
      lq: 2.4, // portfolio management, NAICS 52394
      lqBasis: "employment",
      why: "The mutual fund was born here: Massachusetts Investors Trust, launched in Boston in 1924, is generally credited as the first in the US and is still run by MFS. Boston has been a money-management center ever since, home to Fidelity, State Street, Wellington and MFS.",
      players: ["Fidelity Investments", "State Street", "Wellington Management", "MFS"],
      places: ["Boston Financial District"],
    },
  ],

  largest: [
    { name: "Real estate, rental & leasing", share: 14.1, usShare: 13.7 },
    { name: "Professional, scientific & technical services", share: 13.9, usShare: 8.0 },
    { name: "Finance & insurance", share: 9.2, usShare: 8.7 },
    { name: "Health care & social assistance", share: 9.2, usShare: 7.5 },
    { name: "Government", share: 8.7, usShare: 11.1 },
  ],

  geography: [
    "Boston, the capital and largest city, sits on a natural harbor where the Charles River meets the sea; the Charles separates Boston from Cambridge.",
    "Cape Cod curls into the Atlantic like a flexed arm, with Martha's Vineyard and Nantucket to the south.",
    "Most people live in the east around Boston. The west, with the Berkshires and the Connecticut River valley, is hillier and more rural.",
    "Where colonial America started: the Pilgrims landed at Plymouth in 1620, and the Revolution's first battles were fought at Lexington and Concord in 1775.",
    "GDP per person is the 3rd-highest of the 50 states (4th counting DC), about $114,000.",
  ],

  myGuess: "Fishing, tourism, and education.",
  oneLiner: "Backed by educational power, biotech development is the most concentrated industry in Massachusetts; it is a state that has a high ratio of technology services in GDP.",

  sources: [
    { label: "BEA: GDP by state and industry (SAGDP2), 2025", url: "https://www.bea.gov/data/gdp/gdp-state" },
    { label: "BLS QCEW: Massachusetts 2025 annual averages with location quotients", url: "https://data.bls.gov/cew/data/api/2025/a/area/25000.csv" },
    { label: "Census Bureau: Vintage 2025 state population estimates", url: "https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv" },
    { label: "Biogen: new headquarters in Kendall Square", url: "https://investors.biogen.com/news-releases/news-release-details/biogen-announces-plans-new-global-headquarters-and-innovation" },
    { label: "GEN: Top 10 US biopharma clusters 2025", url: "https://www.genengnews.com/a-lists/top-10-u-s-biopharma-clusters-2025/" },
    { label: "National Fisherman: Dutch Harbor and New Bedford, top US ports for a quarter century", url: "https://www.nationalfisherman.com/top-u-s-ports-for-a-quarter-century" },
    { label: "NOAA Fisheries: New Bedford port profile", url: "https://www.greateratlantic.fisheries.noaa.gov/educational_resources/seafood/ports/new_bedford__ma.html" },
    { label: "MFS Investment Management (Massachusetts Investors Trust, 1924)", url: "https://en.wikipedia.org/wiki/MFS_Investment_Management" },
  ],
};

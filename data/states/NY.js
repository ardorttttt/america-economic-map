// New York. Numbers: BEA SAGDP2 (2025, released Sept 2026), BLS QCEW 2025 annual
// averages, Census Vintage 2025. Wall Street's LQ uses BEA GDP (banking + securities),
// because its weight shows in output more than in headcount.

(window.STATE_DATA = window.STATE_DATA || {}).NY = {
  code: "NY",
  studied: "2026-10-14",
  nickname: "The Empire State",
  capital: "Albany",
  largestCity: "New York City",

  stats: {
    year: 2025,
    gdp: 2465.7,
    gdpRank: 3,
    population: 20.002,
  },

  specialties: [
    {
      name: "Wall Street: banking & securities",
      category: "finance",
      lq: 3.4, // BEA credit intermediation + securities and investments, 19.1% of state GDP
      lqBasis: "gdp",
      why: "The Erie Canal (1825) linked New York Harbor to the Great Lakes and made New York City the busiest port in the country, and the money that financed that trade grew into Wall Street, whose stock exchange traces back to the Buttonwood Agreement of 1792. Banks and securities firms now produce about 19% of the state's GDP, 3.4 times the US share, and investment banking and trading alone employ about 110,000 people.",
      players: ["New York Stock Exchange", "Nasdaq", "JPMorgan Chase", "Goldman Sachs", "Morgan Stanley", "Citigroup"],
      places: ["Wall Street, Lower Manhattan", "Midtown Manhattan"],
    },
    {
      name: "Media, advertising & publishing",
      category: "tech",
      lq: 2.5, // advertising + newspaper/magazine/book publishers + media networks + film and TV production (NAICS 5418, 5131, 5162, 5121)
      lqBasis: "employment",
      why: "Madison Avenue is shorthand for American advertising, all five of the biggest US book publishers have their headquarters in New York City, and so do major TV networks, magazines and newspapers. Ad agencies, publishers, media networks and film and TV production together employ about 205,000 people.",
      players: ["Penguin Random House", "HarperCollins", "Simon & Schuster", "The New York Times", "NBCUniversal"],
      places: ["Madison Avenue", "Midtown Manhattan"],
    },
    {
      name: "Universities",
      category: "health",
      lq: 2.4, // colleges and universities, NAICS 6113, private only
      lqBasis: "employment",
      why: "Columbia and NYU in Manhattan, Cornell in Ithaca and the University of Rochester lead a long list of private colleges that together employ about 190,000 people, plus the big public SUNY and CUNY systems.",
      players: ["Columbia University", "New York University", "Cornell University", "University of Rochester"],
      places: ["New York City", "Ithaca", "Rochester"],
    },
    {
      name: "Broadway & museums",
      category: "tourism",
      lq: 2.1, // performing arts companies + museums and historical sites (NAICS 7111, 7121)
      lqBasis: "employment",
      why: "Broadway's 2025-26 season sold 14.6 million tickets and grossed a record $1.91 billion, and theater companies alone employ 3.4 times the US share. Museums like the Met add to the draw. Hotels, though, are a smaller share of the economy than the US average, because everything else here is so big.",
      players: ["Metropolitan Museum of Art", "Lincoln Center"],
      places: ["Times Square & the Theater District", "Museum Mile"],
    },
  ],

  largest: [
    { name: "Finance & insurance", share: 21.1, usShare: 8.7 },
    { name: "Real estate, rental & leasing", share: 14.3, usShare: 13.7 },
    { name: "Government", share: 9.6, usShare: 11.1 },
    { name: "Professional, scientific & technical services", share: 8.6, usShare: 8.0 },
    { name: "Information (media, telecom, internet)", share: 8.3, usShare: 5.7 },
  ],

  geography: [
    "New York City, the largest US city, holds about 43% of the state's 20 million people; Albany, up the Hudson, is the capital.",
    "The Hudson River runs south from the Adirondack Mountains to New York Harbor. The Erie Canal joined it to Lake Erie at Buffalo, making New York the gateway to the Midwest.",
    "Upstate cities (Buffalo, Rochester, Syracuse) line the old canal route; the north and west are farm and dairy country.",
    "Borders two Great Lakes (Erie and Ontario) and Canada; Niagara Falls is on the border.",
    "Long Island stretches more than 100 miles east into the Atlantic.",
    "GDP per person is the highest of the 50 states (only DC is higher), about $123,000. Manufacturing is just 3.4% of GDP, about a third of the US share.",
  ],

  myGuess: "Finance, tourism, and education.",
  oneLiner: "New York, the third-largest economy in the US, specializes in banking, securities, education and home health care.",

  sources: [
    { label: "BEA: GDP by state and industry (SAGDP2), 2025", url: "https://www.bea.gov/data/gdp/gdp-state" },
    { label: "BLS QCEW: New York 2025 annual averages with location quotients", url: "https://data.bls.gov/cew/data/api/2025/a/area/36000.csv" },
    { label: "Census Bureau: Vintage 2025 state population estimates", url: "https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv" },
    { label: "Census QuickFacts: New York City", url: "https://www.census.gov/quickfacts/newyorkcitynewyork" },
    { label: "Library of Congress: Opening of the Erie Canal", url: "https://guides.loc.gov/this-month-in-business-history/october/opening-erie-canal" },
    { label: "NYSE: history", url: "https://www.nyse.com/history-of-nyse" },
    { label: "Pace University: the Big Five publishers in NYC", url: "https://www.pace.edu/news/publishing-houses-nyc" },
    { label: "Broadway League: 2025-26 season wraps with 14.6M attendance and $1.91B grosses", url: "https://www.broadwayleague.com/press/press-releases/broadways-20252026-season-wraps-with-146-million-attendances-and-grosses-of-191-billion/" },
  ],
};

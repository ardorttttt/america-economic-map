// Pennsylvania. Numbers: BEA SAGDP2 (2025, released Sept 2026), BLS QCEW 2025 annual
// averages, Census Vintage 2025, USDA 2025-26 mushroom report. LQs are private-sector
// employment; the grouped one (mushrooms + candy + snacks) is computed from QCEW.

(window.STATE_DATA = window.STATE_DATA || {}).PA = {
  code: "PA",
  studied: "2026-10-16",
  nickname: "The Keystone State",
  capital: "Harrisburg",
  largestCity: "Philadelphia",

  stats: {
    year: 2025,
    gdp: 1056.5,
    gdpRank: 6,
    population: 13.0594,
  },

  specialties: [
    {
      name: "Mushrooms, chocolate & snacks",
      category: "agriculture",
      lq: 3.8, // mushroom farming + chocolate and candy + snack foods (NAICS 111411, 3113, 311919)
      lqBasis: "employment",
      why: "Pennsylvania grows about three-quarters of the country's button mushrooms, centered on Kennett Square in Chester County; mushroom farming alone employs about 12 times the US share. Milton Hershey finished his chocolate factory in 1905 and built a whole company town, Hershey, around it. Hanover is known as the \"Snack Food Capital of the World\", home to Utz chips and Snyder's pretzels.",
      players: ["The Hershey Company", "Utz", "Snyder's of Hanover"],
      places: ["Kennett Square", "Hershey", "Hanover"],
    },
    {
      name: "Steel & metals",
      category: "manufacturing",
      lq: 2.4, // primary metal manufacturing, NAICS 331
      lqBasis: "employment",
      why: "Pittsburgh became the Steel City thanks to coal in the surrounding hills and three rivers to move materials and steel. U.S. Steel, formed in 1901 around Andrew Carnegie's Pittsburgh mills, is still headquartered there, and Japan's Nippon Steel completed its purchase of the company in 2025; it plans to spend up to $2.5 billion on the Mon Valley Works, which employs about 3,000 people, including replacing a hot strip mill built in 1938.",
      players: ["U.S. Steel (Nippon Steel)"],
      places: ["Pittsburgh", "Mon Valley"],
    },
    {
      name: "Universities & \"eds and meds\"",
      category: "health",
      lq: 2.3, // colleges and universities, NAICS 6113, private only
      lqBasis: "employment",
      why: "Penn and Carnegie Mellon lead a long list of colleges that employ about 116,000 people. In Pittsburgh, universities and hospitals (\"eds and meds\") replaced steel as the biggest employers: UPMC, the University of Pittsburgh's medical center, is the state's largest non-government employer, with around 100,000 staff. Health care is 10.5% of state GDP.",
      players: ["University of Pennsylvania", "Carnegie Mellon University", "UPMC"],
      places: ["Philadelphia", "Pittsburgh", "State College"],
    },
    {
      name: "Warehousing & distribution",
      category: "logistics",
      lq: 1.7, // warehousing and storage, NAICS 493
      lqBasis: "employment",
      why: "Interstates 78 and 81 put eastern and central Pennsylvania within a day's truck drive of a huge share of US consumers. The Lehigh Valley went from under 4 million to more than 40 million square feet of large warehouses after 2000. Warehousing employs about 123,000 people statewide.",
      places: ["Lehigh Valley", "I-81 corridor"],
    },
  ],

  largest: [
    { name: "Real estate, rental & leasing", share: 12.8, usShare: 13.7 },
    { name: "Health care & social assistance", share: 10.5, usShare: 7.5 },
    { name: "Manufacturing", share: 10.2, usShare: 9.5 },
    { name: "Government", share: 8.6, usShare: 11.1 },
    { name: "Finance & insurance", share: 8.4, usShare: 8.7 },
  ],

  geography: [
    "Two big cities at opposite ends: Philadelphia in the east on the Delaware River, and Pittsburgh in the west, where the Allegheny and Monongahela rivers meet to form the Ohio. Harrisburg is the capital.",
    "The Appalachian ridges sweep diagonally across the middle of the state.",
    "Second only to Texas in natural gas, mostly from the Marcellus Shale, and coal is still mined in the west. But the economy is so big that mining is only about average as a share of GDP.",
    "Despite its rivers and ports, water transportation is only about a third of the US share today.",
    "Philadelphia is where the Declaration of Independence (1776) and the Constitution (1787) were signed.",
  ],

  myGuess: "Mining and shipping.",
  oneLiner: "Pennsylvania lives on mushrooms, Hershey chocolate and snacks, steel from its industrial past, universities like Penn and Carnegie Mellon, and warehousing and distribution.",

  sources: [
    { label: "BEA: GDP by state and industry (SAGDP2), 2025", url: "https://www.bea.gov/data/gdp/gdp-state" },
    { label: "BLS QCEW: Pennsylvania 2025 annual averages with location quotients", url: "https://data.bls.gov/cew/data/api/2025/a/area/42000.csv" },
    { label: "Census Bureau: Vintage 2025 state population estimates", url: "https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv" },
    { label: "Penn State Extension: Pennsylvania leads US mushroom production", url: "https://extension.psu.edu/pennsylvania-mushroom-farmers-lead-u-s-in-mushroom-production" },
    { label: "Hershey, PA: history", url: "https://www.hersheypa.com/about-hershey/history/" },
    { label: "Hanover, Pennsylvania (Snack Food Capital)", url: "https://en.wikipedia.org/wiki/Hanover,_Pennsylvania" },
    { label: "PublicSource: U.S. Steel's Mon Valley investment plan", url: "https://www.publicsource.org/us-steel-plan-mon-valley-investment/" },
    { label: "UPMC: facts and stats", url: "https://www.upmc.com/about/facts" },
    { label: "Lehigh Valley Public Media: the warehouse boom", url: "https://www.lehighvalleypublicmedia.org/news/local/the-lehigh-valley-warehouse-boom-has-brought-prosperity-problems-and-a-notable-culture-change/" },
    { label: "EIA: Pennsylvania state profile", url: "https://www.eia.gov/state/index.php?sid=PA" },
  ],
};

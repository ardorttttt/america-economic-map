// Rhode Island. Numbers: BEA SAGDP2 (2025, released Sept 2026), BLS QCEW 2025
// annual averages, Census Vintage 2025. LQs are private-sector employment; the
// grouped one (jewelry + textiles) is computed from QCEW by summing NAICS codes.

(window.STATE_DATA = window.STATE_DATA || {}).RI = {
  code: "RI",
  studied: "2026-10-12",
  nickname: "The Ocean State",
  capital: "Providence",
  largestCity: "Providence",

  stats: {
    year: 2025,
    gdp: 88.2,
    gdpRank: 45,
    population: 1.1145,
  },

  specialties: [
    {
      name: "Submarines & boatbuilding",
      category: "aerospace",
      lq: 17.2, // ship and boat building, NAICS 3366
      lqBasis: "employment",
      why: "General Dynamics Electric Boat's yard at Quonset Point, with more than 8,000 workers, cuts and outfits the hull sections of Navy submarines, then barges them to Groton, Connecticut, or Newport News, Virginia, for final assembly. A big Navy contract has it hiring thousands more. Narragansett Bay has a long boatbuilding tradition too, from Bristol's America's Cup yachts to the Navy in Newport.",
      players: ["General Dynamics Electric Boat"],
      places: ["Quonset Point, North Kingstown", "Newport", "Bristol"],
    },
    {
      name: "Jewelry & textiles",
      category: "manufacturing",
      lq: 10.3, // jewelry and silverware + textile mills (NAICS 33991, 313)
      lqBasis: "employment",
      why: "In 1793 Samuel Slater built the first water-powered cotton-spinning mill in the US at Pawtucket, on the Blackstone River, and the American Industrial Revolution spread from there. Providence then became the \"Jewelry Capital of the World\", and by the mid-1980s Rhode Island made about 80% of the country's costume jewelry. Most of those jobs are gone, but jewelry still employs about 30 times the US share and textile mills about 6 times.",
      players: ["Slater Mill (now a national park site)"],
      places: ["Pawtucket", "Providence Jewelry District", "Blackstone River Valley"],
    },
    {
      name: "Universities",
      category: "health",
      lq: 3.3, // colleges and universities, NAICS 6113, private only
      lqBasis: "employment",
      why: "Brown University (1764) and the Rhode Island School of Design share Providence's College Hill, joined by Providence College, Johnson & Wales and the University of Rhode Island. Education is about 3% of state GDP, more than 2.5 times the US share.",
      players: ["Brown University", "RISD", "Providence College", "Johnson & Wales", "University of Rhode Island"],
      places: ["Providence (College Hill)", "Kingston"],
    },
    {
      name: "Insurance",
      category: "finance",
      lq: 2.2, // direct property and casualty insurance carriers, NAICS 524126
      lqBasis: "employment",
      why: "Insurance carriers produce 6.7% of Rhode Island's GDP, more than twice the US share. FM, headquartered in Johnston, insures factories and commercial property around the world, and Amica, in Lincoln, sells car and home insurance.",
      players: ["FM (formerly FM Global)", "Amica Mutual"],
      places: ["Johnston", "Lincoln"],
    },
  ],

  largest: [
    { name: "Real estate, rental & leasing", share: 13.9, usShare: 13.7 },
    { name: "Finance & insurance", share: 12.7, usShare: 8.7 },
    { name: "Government", share: 11.9, usShare: 11.1 },
    { name: "Health care & social assistance", share: 10.0, usShare: 7.5 },
    { name: "Manufacturing", share: 7.0, usShare: 9.5 },
  ],

  geography: [
    "The smallest state by area. Narragansett Bay cuts deep into it, so the Ocean State has far more shoreline than its size suggests. Block Island lies offshore.",
    "Providence, the capital and largest city, sits at the head of Narragansett Bay.",
    "Newport is known for Gilded Age mansions and sailing (it hosted the America's Cup for decades), and marinas employ about 6 times the US share. Tourism overall is only about average, though.",
    "Commercial fishing works out of Point Judith, but fishing and forestry are only about 0.1% of GDP.",
    "CVS Health, one of the largest US companies, is headquartered in Woonsocket.",
    "Borders only Connecticut and Massachusetts.",
  ],

  myGuess: "Tourism and fishing.",
  oneLiner: "As the birthplace of the American Industrial Revolution, Rhode Island specializes in submarines, jewelry and education, especially RISD.",

  sources: [
    { label: "BEA: GDP by state and industry (SAGDP2), 2025", url: "https://www.bea.gov/data/gdp/gdp-state" },
    { label: "BLS QCEW: Rhode Island 2025 annual averages with location quotients", url: "https://data.bls.gov/cew/data/api/2025/a/area/44000.csv" },
    { label: "Census Bureau: Vintage 2025 state population estimates", url: "https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv" },
    { label: "Electric Boat: Quonset Point", url: "https://www.gdeb.com/qp/" },
    { label: "WJAR: Electric Boat plans to hire 8,000 workers by end of 2026", url: "https://turnto10.com/news/local/electric-boat-plans-hire-8000-workers-end-2026-quonset-point-companys-facilities-submarine-numbers-april-21-2026" },
    { label: "Slater Mill historical marker", url: "https://www.hmdb.org/m.asp?m=118324" },
    { label: "GBH: Rhode Island jewelry, one company's story of survival", url: "https://www.wgbh.org/news/local/2017-12-20/rhode-island-jewelry-one-companys-story-of-21st-century-survival" },
    { label: "FM (commercial property insurer)", url: "https://en.wikipedia.org/wiki/FM_Global" },
    { label: "Amica: company facts and history", url: "https://www.amica.com/en/about-us/company-facts-and-history.html" },
    { label: "CVS Health: contact and headquarters", url: "https://www.cvshealth.com/contact.html" },
  ],
};

// New Jersey. Numbers: BEA SAGDP2 (2025, released Sept 2026), BLS QCEW 2025 annual
// averages, Census Vintage 2025. LQs are private-sector employment; the grouped one
// (logistics) is computed from QCEW by summing NAICS codes.

(window.STATE_DATA = window.STATE_DATA || {}).NJ = {
  code: "NJ",
  studied: "2026-10-15",
  nickname: "The Garden State",
  capital: "Trenton",
  largestCity: "Newark",

  stats: {
    year: 2025,
    gdp: 887.8,
    gdpRank: 11,
    population: 9.5482,
  },

  specialties: [
    {
      name: "Pharmaceuticals",
      category: "health",
      lq: 3.1, // pharmaceutical and medicine manufacturing, NAICS 3254
      lqBasis: "employment",
      why: "New Jersey has been called the \"medicine chest of the world\" since the 1950s. Johnson & Johnson started in a New Brunswick factory in 1886, and Merck, Bristol Myers Squibb and the US arms of Novartis, Novo Nordisk and Bayer are here too. Chemical manufacturing, mostly drugs, is 4.1% of state GDP, more than twice the US share, and drug wholesalers and biotech labs add tens of thousands more jobs.",
      players: ["Johnson & Johnson", "Merck", "Bristol Myers Squibb", "Novartis", "Novo Nordisk"],
      places: ["New Brunswick", "Princeton", "Middlesex County"],
    },
    {
      name: "Atlantic City casinos",
      category: "tourism",
      lq: 2.8, // casino hotels, NAICS 721120
      lqBasis: "employment",
      why: "A 1976 statewide referendum allowed casino gambling in Atlantic City, which became the East Coast's gambling capital; nine casinos operate today. New Jersey then fought the federal ban on sports betting all the way to the Supreme Court and won in Murphy v. NCAA (2018), which let every state decide for itself. New casinos coming to New York are the next threat.",
      players: ["Borgata", "Hard Rock Atlantic City", "Ocean Casino Resort"],
      places: ["Atlantic City", "Jersey Shore"],
    },
    {
      name: "Ports, warehouses & distribution",
      category: "logistics",
      lq: 1.5, // warehousing + couriers + port services + freight arrangement (NAICS 493, 492, 4883, 4885)
      lqBasis: "employment",
      why: "Port Newark-Elizabeth is the core of the Port of New York and New Jersey, which handled 8.9 million TEU (twenty-foot container units) in 2025, second-busiest in the US. Warehouses and parcel hubs line the New Jersey Turnpike between New York and Philadelphia, and wholesale trade is 9.2% of state GDP, about 1.5 times the US share. Port and harbor operations alone are 7.6 times the US share.",
      players: ["Port Authority of New York and New Jersey"],
      places: ["Port Newark-Elizabeth", "New Jersey Turnpike corridor"],
    },
  ],

  largest: [
    { name: "Real estate, rental & leasing", share: 15.8, usShare: 13.7 },
    { name: "Professional, scientific & technical services", share: 9.8, usShare: 8.0 },
    { name: "Wholesale trade", share: 9.2, usShare: 6.3 },
    { name: "Government", share: 9.1, usShare: 11.1 },
    { name: "Health care & social assistance", share: 8.6, usShare: 7.5 },
  ],

  geography: [
    "Squeezed between New York City and Philadelphia: the north is largely New York suburbs, the south looks to Philadelphia.",
    "The most densely populated state. Trenton is the capital; Newark is the largest city.",
    "The Hudson River separates it from Manhattan, and Jersey City's waterfront holds big financial back offices.",
    "The Delaware River forms the western border with Pennsylvania and Delaware.",
    "The Jersey Shore runs along the whole Atlantic coast, from Sandy Hook to Cape May.",
    "Real estate is the largest sector mostly because homes are expensive: BEA counts the rent homeowners would pay themselves (imputed rent) as real estate output.",
  ],

  myGuess: "Education and housing rentals.",
  oneLiner: "New Jersey lives on pharmaceuticals, casinos, and its port, warehousing and logistics.",

  sources: [
    { label: "BEA: GDP by state and industry (SAGDP2), 2025", url: "https://www.bea.gov/data/gdp/gdp-state" },
    { label: "BLS QCEW: New Jersey 2025 annual averages with location quotients", url: "https://data.bls.gov/cew/data/api/2025/a/area/34000.csv" },
    { label: "Census Bureau: Vintage 2025 state population estimates", url: "https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv" },
    { label: "Barry Popik: \"New Jersey: Medicine Chest of the World\"", url: "https://barrypopik.com/blog/new_jersey_medicine_chest_of_the_world" },
    { label: "GEN: Middlesex County, NJ, where life sciences companies thrive", url: "https://www.genengnews.com/industry-news/middlesex-county-nj-where-life-sciences-companies-thrive/" },
    { label: "Port Technology: Port of NY and NJ handles 8.9m TEUs in 2025", url: "https://www.porttechnology.org/port-of-new-york-and-new-jersey-handles-8-9m-teus-in-2025/" },
    { label: "CDC Gaming: Atlantic City casino profits in 2025", url: "https://cdcgaming.com/brief/atlantic-city-casino-profits-fell-almost-4-in-2025-cause-for-concern-with-nyc-casinos-coming/" },
    { label: "Congressional Research Service: Murphy v. NCAA", url: "https://www.congress.gov/crs_external_products/LSB/HTML/LSB10133.html" },
    { label: "BEA FAQ: owner-occupied housing in the real estate industry", url: "https://bea.gov/help/faq/95" },
  ],
};

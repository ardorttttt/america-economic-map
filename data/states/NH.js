// New Hampshire. Numbers: BEA SAGDP2 (2025, released Sept 2026), BLS QCEW 2025
// annual averages, Census Vintage 2025. LQs are private-sector employment; the
// grouped one (ski areas + camps) is computed from QCEW by summing NAICS codes.

(window.STATE_DATA = window.STATE_DATA || {}).NH = {
  code: "NH",
  studied: "2026-10-05",
  nickname: "The Granite State",
  capital: "Concord",
  largestCity: "Manchester",

  stats: {
    year: 2025,
    gdp: 128.3,
    gdpRank: 40,
    population: 1.4153,
  },

  specialties: [
    {
      name: "Ski resorts & summer camps",
      category: "tourism",
      lq: 6.9, // skiing facilities + RV parks and recreational camps (NAICS 71392, 7212)
      lqBasis: "employment",
      why: "The White Mountains are the highest in the Northeast and get reliable snow, and the Lakes Region around Lake Winnipesaukee has been a summer-camp and resort country for generations, all within a few hours' drive of Boston. Ski areas alone employ about 10 times the US share of workers. Unlike Maine, its forests matter more for recreation than for logging: logging and paper are below the US average here.",
      players: ["Loon Mountain", "Bretton Woods", "Cannon Mountain (state-owned)"],
      places: ["White Mountains", "Lake Winnipesaukee", "Wolfeboro", "North Conway"],
    },
    {
      name: "Firearms & precision metal parts",
      category: "manufacturing",
      lq: 4.2, // other fabricated metal products, NAICS 3329; small arms alone (332994) is 15.4
      lqBasis: "employment",
      why: "Sig Sauer runs its US headquarters and main plant at Pease International Tradeport in Newington, a former Air Force base, and Ruger makes most of its revolvers in Newport, with its own casting shop. Small-arms manufacturing alone is about 15 times the US share. The same precision-metal skills show up in steel investment casting, where the LQ is about 18.",
      players: ["Sig Sauer", "Sturm, Ruger & Co."],
      places: ["Newington (Pease Tradeport)", "Newport", "Rochester"],
    },
    {
      name: "Defense electronics & instruments",
      category: "aerospace",
      lq: 3.4, // computer and electronic products, NAICS 334
      lqBasis: "employment",
      why: "Nashua's economy was on the brink when Sanders Associates, a Cold War defense-electronics company founded in 1951, set up there. It grew into today's BAE Systems Electronic Systems, the state's largest employer, which builds electronic-warfare gear that protects military aircraft. Southern New Hampshire is within commuting distance of Boston's tech belt, and many instrument and chip makers cluster there too.",
      players: ["BAE Systems Electronic Systems (ex-Sanders Associates)"],
      places: ["Nashua", "Merrimack", "Manchester"],
    },
    {
      name: "Colleges & online education",
      category: "health",
      lq: 1.9, // colleges and universities, NAICS 6113
      lqBasis: "employment",
      why: "Southern New Hampshire University grew from a small business school in Manchester into the largest nonprofit online university in the US, with about 200,000 students, almost all of them online. Dartmouth College, in Hanover on the Connecticut River, is the state's Ivy League anchor.",
      players: ["Southern New Hampshire University", "Dartmouth College", "University of New Hampshire"],
      places: ["Manchester", "Hanover", "Durham"],
    },
  ],

  largest: [
    { name: "Real estate, rental & leasing", share: 14.0, usShare: 13.7 },
    { name: "Finance & insurance", share: 9.4, usShare: 8.7 },
    { name: "Manufacturing", share: 9.4, usShare: 9.5 },
    { name: "Professional, scientific & technical services", share: 9.2, usShare: 8.0 },
    { name: "Government", share: 9.0, usShare: 11.1 },
  ],

  geography: [
    "Since 2025 the only state with no income tax and no sales tax at any level (motto: \"Live Free or Die\"). Stores near the border draw shoppers from Massachusetts.",
    "Southern New Hampshire is effectively greater Boston: Nashua and Salem sit right on the Massachusetts line.",
    "The Merrimack River runs south through Concord, Manchester and Nashua into Massachusetts. Its falls powered Manchester's Amoskeag mills, once among the world's largest textile mills.",
    "The White Mountains in the north include Mount Washington, the highest peak in the Northeast, known for some of the world's worst weather.",
    "About 80% forested, second only to Maine. The Connecticut River forms the whole western border with Vermont.",
    "The shortest ocean coastline of any coastal state, centered on Portsmouth. The Portsmouth Naval Shipyard is actually across the river in Kittery, Maine.",
  ],

  myGuess: "Similar to Maine: shipbuilding, fishing, forestry.",
  oneLiner: "Skiing, guns and precision metal processing, defense electronics, education (SNHU and Dartmouth); especially, from 2025, no income tax and no sales tax.",

  sources: [
    { label: "BEA: GDP by state and industry (SAGDP2), 2025", url: "https://www.bea.gov/data/gdp/gdp-state" },
    { label: "BLS QCEW: New Hampshire 2025 annual averages with location quotients", url: "https://data.bls.gov/cew/data/api/2025/a/area/33000.csv" },
    { label: "Census Bureau: Vintage 2025 state population estimates", url: "https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv" },
    { label: "Sanders Associates (now BAE Systems)", url: "https://en.wikipedia.org/wiki/Sanders_Associates" },
    { label: "Nashua Telegraph: how Sanders helped Nashua recover", url: "https://www.nashuatelegraph.com/news/local-news/2012/12/08/arrival-of-bae-then-known-as-sanders-helped-nashua-economy-recover/" },
    { label: "Sig Sauer: contact and headquarters", url: "https://www.sigsauer.com/contact" },
    { label: "CLUI: Sturm, Ruger Newport plant", url: "https://clui.org/ludb/site/sturm-ruger-newport-plant" },
    { label: "Southern New Hampshire University", url: "https://en.wikipedia.org/wiki/Southern_New_Hampshire_University" },
    { label: "McLane Middleton: NH Interest and Dividends Tax repealed (2025)", url: "https://www.mclane.com/insights/nh-interest-and-dividends-tax-repealed-as-of-january-1/" },
    { label: "USDA Forest Service: Forests of New Hampshire, 2021", url: "https://www.fs.usda.gov/nrs/pubs/ru/ru_fs371.pdf" },
    { label: "Britannica: New Hampshire natural regions", url: "https://www.britannica.com/place/New-Hampshire-state/Natural-regions" },
  ],
};

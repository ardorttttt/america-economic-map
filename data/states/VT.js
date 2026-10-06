// Vermont. Numbers: BEA SAGDP2 (2025, released Sept 2026), BLS QCEW 2025 annual
// averages, Census Vintage 2025, USDA NASS 2026 maple season. LQs are private-sector
// employment; the grouped ones are computed from QCEW by summing NAICS codes.

(window.STATE_DATA = window.STATE_DATA || {}).VT = {
  code: "VT",
  studied: "2026-10-05",
  nickname: "The Green Mountain State",
  capital: "Montpelier",
  largestCity: "Burlington",

  stats: {
    year: 2025,
    gdp: 49.7,
    gdpRank: 51,
    population: 0.6447,
  },

  specialties: [
    {
      name: "Dairy & maple syrup",
      category: "agriculture",
      lq: 7.2, // dairy farming + dairy product manufacturing (NAICS 112120, 3115); maple producers are mostly family farms outside payroll data
      lqBasis: "employment",
      why: "Hilly land with thin, rocky soil and a short growing season suits grass better than crops, so Vermont became dairy country. Dairy is still about two-thirds of farm sales, with milk turned into Cabot cheese and Ben & Jerry's ice cream, but farms are consolidating fast: about 440 dairies were left in 2025, half as many as a decade earlier. Sugar maples cover the hillsides, and in 2026 Vermont made about 3.1 million gallons of maple syrup, more than half of the US total.",
      players: ["Cabot Creamery (farmer co-op)", "Ben & Jerry's (Waterbury)", "Family sugarhouses"],
      places: ["Champlain Valley", "Cabot", "Waterbury"],
    },
    {
      name: "Granite & marble",
      category: "resources",
      lq: 4.8, // dimension stone quarrying + stone products (NAICS 212311, 3279)
      lqBasis: "employment",
      why: "Barre's fine-grained granite is easy to carve, and about a third of the nation's gravestones and monuments come from the Barre district, where Rock of Ages runs what is believed to be the world's largest monumental granite quarry. Proctor was home to the Vermont Marble Company, once the largest marble company in the world; its stone is in the Jefferson Memorial and the Supreme Court building.",
      players: ["Rock of Ages (Polycor)", "Vermont Marble Company (historic)"],
      places: ["Barre", "Proctor"],
    },
    {
      name: "Ski resorts, inns & fall foliage",
      category: "tourism",
      lq: 3.0, // traveler accommodation + skiing facilities (NAICS 7211, 71392)
      lqBasis: "employment",
      why: "The Green Mountains hold Killington, the largest ski resort in the eastern US, and Stowe, below Mount Mansfield. Country inns fill up in summer and especially during fall foliage season, still the state's biggest tourist draw; bed-and-breakfast jobs alone are about 29 times the US share. Accommodation is 3.7% of Vermont's GDP, more than four times the US share.",
      players: ["Killington Resort", "Stowe Mountain Resort"],
      places: ["Killington", "Stowe", "Burlington"],
    },
    {
      name: "Semiconductors",
      category: "tech",
      lq: 2.8, // semiconductors and electronic components, NAICS 3344
      lqBasis: "employment",
      why: "IBM opened a plant in Essex Junction in 1957, and it became Vermont's largest private employer, with more than 8,500 workers at its peak. GlobalFoundries took it over in 2015. Its chips are Vermont's largest export, a surprising high-tech core for such a rural state.",
      players: ["GlobalFoundries (ex-IBM)"],
      places: ["Essex Junction"],
    },
  ],

  largest: [
    { name: "Real estate, rental & leasing", share: 14.7, usShare: 13.7 },
    { name: "Government", share: 12.3, usShare: 11.1 },
    { name: "Health care & social assistance", share: 10.6, usShare: 7.5 },
    { name: "Retail trade", share: 7.9, usShare: 5.9 },
    { name: "Manufacturing", share: 7.8, usShare: 9.5 },
  ],

  geography: [
    "The only New England state without an ocean coast. Lake Champlain and New York lie to the west, the Connecticut River forms the whole eastern border with New Hampshire, and Quebec is to the north.",
    "The Green Mountains run north to south down the middle of the state; Mount Mansfield, above Stowe, is the highest point.",
    "The smallest economy of any state, and the second-smallest population after Wyoming (about 645,000).",
    "Burlington, on Lake Champlain, is the largest city. Montpelier is the smallest state capital by population.",
    "The second-oldest state by median age, after Maine, which is one reason health care is such a large share of the economy.",
  ],

  myGuess: "Tourism, forestry, and maple syrup (found by searching).",
  oneLiner: "Tourism, including skiing and sightseeing themed at maple trees in autumn; maple syrup (over half of the production in the US), dairy, and marble; surprisingly, it has a semiconductor factory (IBM); by the way, it has the lowest GDP in the US.",

  sources: [
    { label: "BEA: GDP by state and industry (SAGDP2), 2025", url: "https://www.bea.gov/data/gdp/gdp-state" },
    { label: "BLS QCEW: Vermont 2025 annual averages with location quotients", url: "https://data.bls.gov/cew/data/api/2025/a/area/50000.csv" },
    { label: "Census Bureau: Vintage 2025 state population estimates", url: "https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv" },
    { label: "Vermont Business Magazine: 2026 maple season leads nation (USDA NASS)", url: "https://vermontbiz.com/news/2026/june/11/2026-vermont-maple-season-production-leads-nation" },
    { label: "Vermont Public: Vermont has lost more than 400 dairies in a decade", url: "https://www.vermontpublic.org/show/vermont-edition/2025-04-21/new-commisoned-study-shows-americans-consuming-more-dairy-vermont-is-in-the-forefront" },
    { label: "Cabot Creamery", url: "https://en.wikipedia.org/wiki/Cabot_Creamery" },
    { label: "Vermont Geological Survey: Granite", url: "https://dec.vermont.gov/geological-survey/resources-energy/minres/granite" },
    { label: "Proctor, Vermont (Vermont Marble Company)", url: "https://en.wikipedia.org/wiki/Proctor,_Vermont" },
    { label: "Killington Ski Resort", url: "https://en.wikipedia.org/wiki/Killington_Ski_Resort" },
    { label: "Vermont ACCD: fall foliage is still Vermont's biggest draw", url: "https://accd.vermont.gov/press-releases/economic-impact-studies-show-boost-april-eclipse-fall-foliage-season-still-vermonts" },
    { label: "VTDigger: GlobalFoundries takes over IBM's Essex plant", url: "https://vtdigger.org/2015/07/01/ibms-essex-plant-now-belongs-to-globalfoundries/" },
    { label: "Essex Junction: IBM begins operations (1957)", url: "https://nationaltoday.com/us/vt/essex-junction/news/2026/02/25/ibm-begins-operations-in-essex-junction-vermont/" },
  ],
};

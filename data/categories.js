// Fixed industry taxonomy. Every specialty in a state file uses one of these ids,
// so states stay comparable across the whole map. Change this list only with care:
// renaming an id means updating every state file that uses it.

window.CATEGORIES = [
  { id: "energy",        name: "Energy",                  hint: "Oil, natural gas, coal, refining, power generation" },
  { id: "agriculture",   name: "Agriculture & Food",      hint: "Crops, livestock, fishing, food processing" },
  { id: "resources",     name: "Mining & Forestry",       hint: "Metals, minerals, timber, wood and paper" },
  { id: "manufacturing", name: "Manufacturing",           hint: "Autos, machinery, chemicals, steel, consumer goods" },
  { id: "aerospace",     name: "Aerospace & Defense",     hint: "Aircraft, space, shipbuilding, defense contractors" },
  { id: "tech",          name: "Tech & Information",      hint: "Software, semiconductors, internet, media, telecom" },
  { id: "finance",       name: "Finance & Insurance",     hint: "Banking, asset management, insurance, credit cards" },
  { id: "health",        name: "Health & Education",      hint: "Hospitals, universities, pharma, biotech, medical devices" },
  { id: "tourism",       name: "Tourism & Entertainment", hint: "Travel, hospitality, gaming, film, outdoor recreation" },
  { id: "logistics",     name: "Trade & Logistics",       hint: "Ports, freight rail, trucking, distribution, wholesale" },
  { id: "government",    name: "Government & Military",   hint: "Federal agencies, military bases, public administration" },
];

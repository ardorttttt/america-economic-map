#!/usr/bin/env node
// Validates the state data files against the schema in data/states/_TEMPLATE.js.
// Usage: node tools/check.js

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const ctx = { window: {} };
vm.createContext(ctx);
const load = (rel) => vm.runInContext(fs.readFileSync(path.join(root, rel), "utf8"), ctx, { filename: rel });

load("data/geo.js");
load("data/categories.js");
load("data/studied.js");

const { STATES, DIVISIONS, CATEGORIES, STUDIED } = ctx.window;
const codes = new Set(STATES.map((s) => s.code));
const cats = new Set(CATEGORIES.map((c) => c.id));
const route = DIVISIONS.flatMap((d) => d.states);

const errors = [];
const warnings = [];
const err = (code, msg) => errors.push(`${code}: ${msg}`);
const warn = (code, msg) => warnings.push(`${code}: ${msg}`);

if (route.length !== codes.size || new Set(route).size !== route.length || !route.every((c) => codes.has(c))) {
  errors.push("route: DIVISIONS must list every state in data/geo.js exactly once");
}

const seen = new Set();
for (const code of STUDIED) {
  if (!codes.has(code)) { err(code, "not a known state code (data/studied.js)"); continue; }
  if (seen.has(code)) err(code, "listed twice in data/studied.js");
  seen.add(code);
}

const stateDir = path.join(root, "data/states");
const files = fs.readdirSync(stateDir).filter((f) => /^[A-Z]{2}\.js$/.test(f)).map((f) => f.slice(0, 2));

for (const code of files) {
  if (!STUDIED.includes(code)) warn(code, "data file exists but the code is not in data/studied.js");
}

for (const code of STUDIED) {
  if (!codes.has(code)) continue;
  if (!files.includes(code)) { err(code, `missing data/states/${code}.js`); continue; }
  try {
    load(`data/states/${code}.js`);
  } catch (e) {
    err(code, `data file throws: ${e.message}`);
    continue;
  }
  const d = (ctx.window.STATE_DATA || {})[code];
  if (!d) { err(code, `file does not set window.STATE_DATA.${code}`); continue; }

  if (d.code !== code) err(code, `code field is "${d.code}"`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.studied || "")) err(code, "studied must be YYYY-MM-DD");
  for (const f of ["capital", "largestCity"]) if (!d[f]) warn(code, `${f} is empty`);

  const st = d.stats || {};
  for (const f of ["year", "gdp", "gdpRank", "population"]) {
    if (typeof st[f] !== "number" || !(st[f] > 0)) err(code, `stats.${f} must be a positive number`);
  }
  if (st.gdpRank > 51) err(code, "stats.gdpRank is above 51");

  const specs = d.specialties || [];
  if (specs.length < 1) err(code, "needs at least one specialty");
  specs.forEach((sp, i) => {
    const at = `specialties[${i}]`;
    if (!sp.name) err(code, `${at}.name is empty`);
    if (!cats.has(sp.category)) err(code, `${at}.category "${sp.category}" is not in data/categories.js`);
    if (typeof sp.lq !== "number" || !(sp.lq > 0)) err(code, `${at}.lq must be a positive number`);
    if (!["employment", "gdp"].includes(sp.lqBasis)) err(code, `${at}.lqBasis must be "employment" or "gdp"`);
    if (!sp.why) warn(code, `${at}.why is empty`);
    if (i > 0 && typeof sp.lq === "number" && sp.lq > specs[i - 1].lq) warn(code, `${at} has a higher LQ than the one before it`);
  });

  const largest = d.largest || [];
  if (largest.length < 1) err(code, "needs at least one entry in largest");
  largest.forEach((r, i) => {
    const at = `largest[${i}]`;
    if (!r.name) err(code, `${at}.name is empty`);
    if (typeof r.share !== "number" || r.share <= 0 || r.share >= 100) err(code, `${at}.share must be a percent between 0 and 100`);
    if (r.usShare !== undefined && (typeof r.usShare !== "number" || r.usShare <= 0 || r.usShare >= 100)) err(code, `${at}.usShare must be a percent between 0 and 100`);
    if (i > 0 && r.share > largest[i - 1].share) warn(code, `${at} is larger than the entry before it`);
  });

  if (!(d.sources || []).some((s) => s.url)) err(code, "needs at least one source with a url");
  if (!d.oneLiner) warn(code, "oneLiner is empty (write it yourself)");
}

for (const w of warnings) console.log(`warn  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`\n${STUDIED.length} studied · ${errors.length} error(s) · ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);

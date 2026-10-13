#!/usr/bin/env python3
"""Pull the numbers for one state from BEA, BLS QCEW and the Census Bureau.

usage: python3 tools/research.py <STATE> <command> [args]

  STATE is a postal code (MA) or FIPS code (25).

  bea                       GDP, GDP rank, GDP per person rank, and every industry's
                            share of state GDP vs the US (BEA SAGDP2). "<==" marks LQ >= 1.5.
  qcew <min_jobs> [codes]   private industries (NAICS 3-6 digit) with employment LQ >= 2
                            and at least min_jobs jobs, then any extra NAICS codes asked for
  group <a+b> [c+d ...]     employment LQ for NAICS codes summed together, for specialties
                            that span several codes (e.g. 1141+3117 = fishing + seafood)
  pop                       population and rank
  age                       median age and rank, from single-year-of-age estimates

Downloads are cached in tools/.cache (git-ignored). Delete it to refetch.
When a newer year is published, update YEAR and the Census file names below.
"""
import csv
import os
import re
import sys
import urllib.request
import zipfile

YEAR = "2025"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, "tools", ".cache")

BEA_ZIP = "https://apps.bea.gov/regional/zip/SAGDP.zip"
BEA_CSV = f"SAGDP2__ALL_AREAS_1997_{YEAR}.csv"
QCEW = "https://data.bls.gov/cew/data/api/{year}/a/area/{area}.csv"
POP = f"https://www2.census.gov/programs-surveys/popest/datasets/2020-{YEAR}/state/totals/NST-EST{YEAR}-ALLDATA.csv"
AGE = f"https://www2.census.gov/programs-surveys/popest/datasets/2020-{YEAR}/state/asrh/sc-est{YEAR}-agesex-civ.csv"


def fetch(url, name):
    os.makedirs(CACHE, exist_ok=True)
    path = os.path.join(CACHE, name)
    if not os.path.exists(path):
        print(f"(downloading {name})", file=sys.stderr)
        urllib.request.urlretrieve(url, path)
    return path


def read_csv(path, encoding="utf-8"):
    with open(path, encoding=encoding) as f:
        return list(csv.DictReader(f))


def state_fips(arg):
    if arg.isdigit():
        return arg.zfill(2)
    geo = open(os.path.join(ROOT, "data", "geo.js")).read()
    m = re.search(r'fips: "(\d\d)", code: "%s"' % arg.upper(), geo)
    if not m:
        sys.exit(f"unknown state: {arg}")
    return m.group(1)


def num(value):
    try:
        return float(value)
    except (TypeError, ValueError):
        return None  # BEA marks suppressed cells as (D), (NA), etc.


def bea_rows():
    path = os.path.join(CACHE, BEA_CSV)
    if not os.path.exists(path):
        zipfile.ZipFile(fetch(BEA_ZIP, "SAGDP.zip")).extract(BEA_CSV, CACHE)
    rows = read_csv(path, encoding="latin-1")
    for r in rows:
        r["fips"] = (r.get("GeoFIPS") or "").strip().strip('"').strip()
    return [r for r in rows if r.get("LineCode")]


def is_state(fips):  # 50 states + DC, not the US total or regions
    return fips.endswith("000") and fips != "00000" and int(fips[:2]) <= 56


def populations():
    rows = read_csv(fetch(POP, "pop.csv"), encoding="latin-1")
    return {r["STATE"]: (r["NAME"], int(r[f"POPESTIMATE{YEAR}"])) for r in rows if r["SUMLEV"] == "040" and r["STATE"] != "72"}


def ranked(values, fips2, label, fmt):
    order = sorted(values, key=lambda k: -values[k])
    print(f"{label}: {fmt(values[fips2])}  rank {order.index(fips2) + 1} of {len(order)}")


def cmd_bea(fips2):
    rows = bea_rows()
    gdp = {r["fips"][:2]: num(r[YEAR]) for r in rows if r["LineCode"].strip() == "1" and is_state(r["fips"])}
    ranked(gdp, fips2, "GDP", lambda v: f"${v / 1000:,.1f}B")
    pops = populations()
    per_person = {k: gdp[k] * 1e6 / pops[k][1] for k in gdp}
    ranked(per_person, fips2, "GDP per person", lambda v: f"${v:,.0f}")

    state = {r["LineCode"].strip(): r for r in rows if r["fips"] == fips2 + "000"}
    us = {r["LineCode"].strip(): r for r in rows if r["fips"] == "00000"}
    total, us_total = num(state["1"][YEAR]), num(us["1"][YEAR])
    print(f"\n{'line':>4} {'industry':58} {'state':>7} {'US':>7} {'LQ':>5}")
    for line in sorted(state, key=int):
        name = state[line]["Description"].strip()[:58]
        v, u = num(state[line][YEAR]), num(us[line][YEAR]) if line in us else None
        if v is None or u is None:
            print(f"{line:>4} {name:58} {state[line][YEAR].strip():>7}")
            continue
        share, us_share = v / total * 100, u / us_total * 100
        lq = share / us_share if us_share else 0
        flag = " <==" if lq >= 1.5 and share >= 0.3 else ""
        print(f"{line:>4} {name:58} {share:6.2f}% {us_share:6.2f}% {lq:5.2f}{flag}")


def qcew_private(area):
    rows = read_csv(fetch(QCEW.format(year=YEAR, area=area), f"qcew_{YEAR}_{area}.csv"))
    return {r["industry_code"]: r for r in rows if r["own_code"] == "5"}


def cmd_qcew(fips2, min_jobs, codes):
    s = qcew_private(fips2 + "000")
    print("private jobs", s["10"]["annual_avg_emplvl"])
    for r in sorted(s.values(), key=lambda r: -float(r["lq_annual_avg_emplvl"] or 0)):
        lq, jobs = float(r["lq_annual_avg_emplvl"] or 0), int(r["annual_avg_emplvl"])
        if r["agglvl_code"] in ("55", "56", "57", "58") and r["disclosure_code"] != "N" and lq >= 2 and jobs >= min_jobs:
            print(f"{r['industry_code']:7} jobs {jobs:7,}  LQ {lq:5.2f}")
    if codes:
        print("-- requested (jobs, LQ; N = suppressed)")
        for c in codes:
            r = s.get(c)
            print(c, (int(r["annual_avg_emplvl"]), r["lq_annual_avg_emplvl"], r["disclosure_code"]) if r else "-")


def cmd_group(fips2, groups):
    s, us = qcew_private(fips2 + "000"), qcew_private("US000")
    jobs = lambda d, c: int(d[c]["annual_avg_emplvl"]) if c in d else 0
    s_total, us_total = jobs(s, "10"), jobs(us, "10")
    for g in groups:
        codes = g.split("+")
        a, b = sum(jobs(s, c) for c in codes), sum(jobs(us, c) for c in codes)
        published = s[codes[0]]["lq_annual_avg_emplvl"] if len(codes) == 1 and codes[0] in s else ""
        # Computed LQs differ from BLS's published ones by a few percent (different US base).
        print(f"{g:24} jobs {a:7,}  US {b:9,}  LQ {(a / s_total) / (b / us_total):5.2f}  published {published}")


def cmd_pop(fips2):
    pops = populations()
    ranked({k: v[1] for k, v in pops.items()}, fips2, "population", lambda v: f"{v:,}")


def cmd_age(fips2):
    by_state = {}
    for r in read_csv(fetch(AGE, "agesex.csv"), encoding="latin-1"):
        if r["SUMLEV"] == "040" and r["SEX"] == "0" and r["AGE"] != "999" and r["STATE"] != "72":
            by_state.setdefault(r["STATE"], {})[int(r["AGE"])] = int(r[f"POPEST{YEAR}_CIV"])
    medians = {}
    for st, ages in by_state.items():
        half, seen = sum(ages.values()) / 2, 0
        for age in range(86):  # 85 means 85+
            if seen + ages[age] >= half:
                medians[st] = age + (half - seen) / ages[age]  # interpolate within the year of age
                break
            seen += ages[age]
    ranked(medians, fips2, "median age (civilian)", lambda v: f"{v:.1f}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    fips2, command, args = state_fips(sys.argv[1]), sys.argv[2], sys.argv[3:]
    if command == "bea":
        cmd_bea(fips2)
    elif command == "qcew":
        cmd_qcew(fips2, int(args[0]) if args else 500, args[1:])
    elif command == "group":
        cmd_group(fips2, args)
    elif command == "pop":
        cmd_pop(fips2)
    elif command == "age":
        cmd_age(fips2)
    else:
        sys.exit(__doc__)

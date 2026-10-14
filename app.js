(function () {
  "use strict";

  // ---------- Data ----------

  const CATEGORIES = window.CATEGORIES;
  const DIVISIONS = window.DIVISIONS;
  const STUDIED = window.STUDIED || [];
  const DATA = (window.STATE_DATA = window.STATE_DATA || {});

  const byCode = new Map(window.STATES.map((s) => [s.code, { ...s }]));
  const byFips = new Map([...byCode.values()].map((s) => [s.fips, s]));
  const catById = new Map(CATEGORIES.map((c) => [c.id, c]));

  const ROUTE = DIVISIONS.flatMap((d) => d.states);
  DIVISIONS.forEach((d) => d.states.forEach((code) => (byCode.get(code).division = d)));
  ROUTE.forEach((code, i) => (byCode.get(code).stop = i + 1));

  // The topology is pre-projected into a 975x610 frame; Alaska's western
  // Aleutians reach x = -58, and the callout column sits east of Maine.
  const VB = { x: -60, y: 6, w: 1080, h: 606 };
  const LABEL_SIZE = 11.5;
  const CALLOUT_SIZE = 11;
  const CALLOUT_X = 950;
  const CALLOUT_HIDE_AT = 2.5; // zoom level where small states get in-state labels instead

  // States too small for an in-state label at full view: label y position in the callout column.
  const CALLOUTS = { MA: 166, RI: 188, CT: 210, NJ: 232, DE: 254, MD: 276, DC: 298 };

  // Nudges where the largest-polygon centroid isn't the best label spot.
  const LABEL_NUDGE = {
    FL: [14, 6], MI: [4, 6], LA: [-10, -4], ID: [2, 18], KY: [4, 2], VA: [6, 2],
    NH: [0, 4], VT: [-2, -6], HI: [-26, -12], MN: [-6, 4], CA: [-6, 0], WV: [-3, 3],
    NY: [4, 0], TN: [0, 1], OK: [12, -6], TX: [6, 0], MD: [-12, -2], NC: [6, 0],
  };

  const state = {
    selected: null,
    hovered: null,
    filter: null,
    showLabels: true,
    showRoute: false,
    k: 1,
    quiz: null, // { scope, questions, i, results } while the quiz is open
  };

  const isStudied = (code) => STUDIED.includes(code) && !!DATA[code];
  const studiedCount = () => ROUTE.filter(isStudied).length;
  const nextUp = () => ROUTE.find((code) => !isStudied(code)) || null;

  // ---------- Helpers ----------

  const esc = (v) =>
    String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const has = (v) => v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0);

  function fmtDate(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    if (!m) return iso || "";
    return new Date(+m[1], +m[2] - 1, +m[3]).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  function fmtGdp(b) {
    return b >= 1000 ? `$${(b / 1000).toFixed(2)}T` : `$${b.toFixed(1)}B`;
  }

  function fmtPop(m) {
    return m >= 10 ? `${m.toFixed(1)}M` : `${m.toFixed(2)}M`;
  }

  const fmtNum = (n, digits = 1) => (Number.isInteger(n) ? String(n) : n.toFixed(digits));

  function loadScript(src) {
    return new Promise((resolve) => {
      const el = document.createElement("script");
      el.src = src;
      el.onload = () => resolve(true);
      el.onerror = () => resolve(false);
      document.head.appendChild(el);
    });
  }

  // ---------- Geometry ----------

  const topo = window.US_TOPOLOGY;
  const path = d3.geoPath();
  const geoms = topo.objects.states.geometries;
  const features = topojson.feature(topo, topo.objects.states).features;
  const neighborIdx = topojson.neighbors(geoms);

  function largestPolygon(geometry) {
    if (geometry.type !== "MultiPolygon") return geometry;
    let best = null;
    let bestArea = -1;
    for (const coordinates of geometry.coordinates) {
      const poly = { type: "Polygon", coordinates };
      const a = path.area(poly);
      if (a > bestArea) {
        bestArea = a;
        best = poly;
      }
    }
    return best;
  }

  features.forEach((f, i) => {
    const s = byFips.get(f.id);
    if (!s) return;
    s.feature = f;
    s.d = path(f);
    s.bounds = path.bounds(f);
    const [cx, cy] = path.centroid(largestPolygon(f.geometry));
    const [nx, ny] = LABEL_NUDGE[s.code] || [0, 0];
    s.label = [cx + nx, cy + ny];
    s.neighbors = neighborIdx[i]
      .map((j) => byFips.get(geoms[j].id))
      .filter(Boolean)
      .map((n) => n.code)
      .sort((a, b) => byCode.get(a).name.localeCompare(byCode.get(b).name));
  });

  // ---------- Map ----------

  const svg = d3.select("#map").attr("viewBox", `${VB.x} ${VB.y} ${VB.w} ${VB.h}`);
  const wrap = document.getElementById("map-wrap");
  const tooltip = document.getElementById("tooltip");

  svg.append("rect")
    .attr("x", VB.x).attr("y", VB.y).attr("width", VB.w).attr("height", VB.h)
    .attr("fill", "transparent")
    .on("click", () => {
      if (!state.quiz) select(null);
    });

  const viewport = svg.append("g");
  const statesG = viewport.append("g").attr("class", "states");
  const routeG = viewport.append("g").attr("class", "route");
  const nextOutline = viewport.append("path").attr("class", "outline next");
  const hoverOutline = viewport.append("path").attr("class", "outline hover");
  const selectedOutline = viewport.append("path").attr("class", "outline selected");
  const labelsG = viewport.append("g").attr("class", "labels");
  const calloutsG = viewport.append("g").attr("class", "callouts");

  const mapStates = [...byCode.values()].filter((s) => s.d);

  statesG.selectAll("path")
    .data(mapStates, (s) => s.code)
    .join("path")
    .attr("class", "state")
    .attr("d", (s) => s.d)
    .attr("aria-label", (s) => s.name)
    .call(bindStateEvents);

  labelsG.selectAll("text")
    .data(mapStates, (s) => s.code)
    .join("text")
    .attr("x", (s) => s.label[0])
    .attr("y", (s) => s.label[1])
    .attr("dx", (s) => (s.code === "DC" ? "0.7em" : null)) // sit beside DC's dot, not on it
    .style("text-anchor", (s) => (s.code === "DC" ? "start" : null))
    .text((s) => s.code);

  const callouts = calloutsG.selectAll("g")
    .data(Object.entries(CALLOUTS).map(([code, y]) => ({ s: byCode.get(code), y })))
    .join("g")
    .attr("class", "callout");

  callouts.append("line")
    .attr("x1", (c) => c.s.label[0]).attr("y1", (c) => c.s.label[1])
    .attr("x2", CALLOUT_X - 5).attr("y2", (c) => c.y);

  callouts.append("text")
    .attr("x", CALLOUT_X).attr("y", (c) => c.y)
    .text((c) => c.s.code);

  callouts.append("rect")
    .attr("class", "hit")
    .attr("x", CALLOUT_X - 6).attr("y", (c) => c.y - 9)
    .attr("width", 34).attr("height", 18);

  callouts.selectAll("text, rect.hit").datum((c) => c.s).call(bindStateEvents);

  // DC is only a few units across; give it a visible dot and a larger hit area.
  const dc = byCode.get("DC");
  const dcDot = calloutsG.append("circle")
    .datum(dc)
    .attr("class", "state dot")
    .attr("cx", dc.label[0]).attr("cy", dc.label[1]);
  const dcHit = calloutsG.append("circle")
    .datum(dc)
    .attr("class", "hit")
    .attr("cx", dc.label[0]).attr("cy", dc.label[1])
    .call(bindStateEvents);

  function bindStateEvents(sel) {
    sel
      .on("pointerenter", (ev, s) => {
        setHover(s.code);
        if (ev.pointerType === "mouse" && !state.quiz) showTooltip(ev, s);
      })
      .on("pointermove", (ev, s) => {
        if (ev.pointerType === "mouse" && !state.quiz) showTooltip(ev, s);
      })
      .on("pointerleave", () => {
        setHover(null);
        hideTooltip();
      })
      .on("click", (ev, s) => {
        ev.stopPropagation();
        hideTooltip();
        if (state.quiz) quizPick(s.code);
        else select(state.selected === s.code ? null : s.code);
      });
  }

  // ---------- Zoom ----------

  const isWide = () => window.matchMedia("(min-width: 961px)").matches;

  const zoom = d3.zoom()
    .scaleExtent([1, 8])
    .extent([[VB.x, VB.y], [VB.x + VB.w, VB.y + VB.h]])
    .translateExtent([[VB.x, VB.y], [VB.x + VB.w, VB.y + VB.h]])
    .filter((ev) => {
      // Plain scrolling only zooms when the page itself doesn't scroll; pinch always does.
      if (ev.type === "wheel") return ev.ctrlKey || isWide();
      if (ev.type === "dblclick") return false;
      if (ev.type === "touchstart") return ev.touches.length > 1;
      return !ev.ctrlKey && !ev.button;
    })
    .on("zoom", (ev) => {
      viewport.attr("transform", ev.transform);
      applyScale(ev.transform.k);
    });

  svg.call(zoom);

  window.addEventListener("resize", () => applyScale(state.k));

  function applyScale(k) {
    state.k = k;
    // On narrow screens the whole map shrinks; grow labels a little so they stay readable.
    const boost = Math.min(1.6, Math.max(1, 800 / (svg.node().clientWidth || 800)));
    labelsG.attr("font-size", (LABEL_SIZE * boost) / k);
    calloutsG.selectAll("text").attr("font-size", (CALLOUT_SIZE * boost) / k);
    dcDot.attr("r", 3.5 / k);
    dcHit.attr("r", 9 / k);
    updateLabelVisibility();
  }

  function updateLabelVisibility() {
    const zoomedIn = state.k >= CALLOUT_HIDE_AT;
    // In the quiz, labels stay hidden except for states revealed by the last answer.
    const reveal = state.quiz ? quizRevealed() : null;
    const show = state.showLabels || !!reveal;
    labelsG.attr("display", show ? null : "none");
    labelsG.selectAll("text").attr("display", (s) => {
      if (reveal && !reveal.has(s.code)) return "none";
      return CALLOUTS[s.code] !== undefined && !zoomedIn ? "none" : null;
    });
    callouts.attr("display", show && !zoomedIn ? null : "none");
    // Small states keep their callout as a click target; it shows "?" until revealed.
    calloutsG.selectAll(".callout text").text((s) => (reveal && !reveal.has(s.code) ? "?" : s.code));
  }

  function focusState(code) {
    const s = byCode.get(code);
    if (!s || !s.bounds) return;
    const [[x0, y0], [x1, y1]] = s.bounds;
    const small = Math.max(x1 - x0, y1 - y0) < 45;
    if (!small) {
      if (state.k > 1) svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity);
      return;
    }
    const k = code === "DC" ? 6 : 4;
    const cx = (x0 + x1) / 2;
    const cy = (y0 + y1) / 2;
    const t = d3.zoomIdentity
      .translate(VB.x + VB.w / 2, VB.y + VB.h / 2)
      .scale(k)
      .translate(-cx, -cy);
    const bounded = zoom.constrain()(t, [[VB.x, VB.y], [VB.x + VB.w, VB.y + VB.h]], zoom.translateExtent());
    svg.transition().duration(600).call(zoom.transform, bounded);
  }

  document.getElementById("zoom-in").addEventListener("click", () => svg.transition().duration(300).call(zoom.scaleBy, 1.6));
  document.getElementById("zoom-out").addEventListener("click", () => svg.transition().duration(300).call(zoom.scaleBy, 1 / 1.6));
  const resetZoom = () => svg.transition().duration(400).call(zoom.transform, d3.zoomIdentity);
  document.getElementById("zoom-reset").addEventListener("click", resetZoom);

  // ---------- Tones (what color each state gets) ----------

  function toneFor(code) {
    if (state.quiz) return quizTone(code);
    if (!isStudied(code)) return "unstudied";
    if (!state.filter) return "studied";
    const idx = (DATA[code].specialties || []).findIndex((sp) => sp.category === state.filter);
    if (idx === 0) return "top";
    if (idx > 0) return "also";
    return "other";
  }

  const DARK_TONES = new Set(["studied", "top", "quiz-target", "quiz-right", "quiz-wrong"]);

  function renderMap() {
    statesG.selectAll("path.state").attr("class", (s) => `state tone-${toneFor(s.code)}`);
    dcDot.attr("class", `state dot tone-${toneFor("DC")}`);
    labelsG.selectAll("text").classed("on-dark", (s) => DARK_TONES.has(toneFor(s.code)));

    const next = nextUp();
    nextOutline.attr("d", next && !state.filter && !state.quiz ? byCode.get(next).d : null);
    selectedOutline.attr("d", state.selected ? byCode.get(state.selected).d : null);
    renderRoute();
    updateLabelVisibility();
  }

  function setHover(code) {
    state.hovered = code;
    hoverOutline.attr("d", code ? byCode.get(code).d : null);
  }

  function renderRoute() {
    routeG.selectAll("*").remove();
    if (!state.showRoute || state.quiz) return;
    const done = [];
    const todo = [];
    for (let i = 1; i < ROUTE.length; i++) {
      const a = byCode.get(ROUTE[i - 1]);
      const b = byCode.get(ROUTE[i]);
      if (b.code === "AK" || b.code === "HI") continue; // island hops, not a land border
      const seg = `M${a.label[0]},${a.label[1]}L${b.label[0]},${b.label[1]}`;
      (isStudied(a.code) && isStudied(b.code) ? done : todo).push(seg);
    }
    routeG.append("path").attr("class", "route-line").attr("d", todo.join(""));
    routeG.append("path").attr("class", "route-line done").attr("d", done.join(""));
  }

  // ---------- Tooltip ----------

  function showTooltip(ev, s) {
    const d = isStudied(s.code) ? DATA[s.code] : null;
    let status;
    if (d) {
      const top = (d.specialties || [])[0];
      status = top ? `Top specialty: ${esc(top.name)}${has(top.lq) ? ` (LQ ${top.lq.toFixed(1)})` : ""}` : "Studied";
    } else if (s.code === nextUp()) {
      status = "Up next";
    } else {
      status = "Not studied yet";
    }
    tooltip.innerHTML = `
      <div class="tt-name">${esc(s.name)} <span class="tt-meta">${s.code}</span></div>
      <div class="tt-meta">${esc(s.division.name)} · stop ${s.stop} of ${ROUTE.length}</div>
      <div class="tt-status">${status}</div>`;
    tooltip.hidden = false;

    const r = wrap.getBoundingClientRect();
    const tw = tooltip.offsetWidth;
    const th = tooltip.offsetHeight;
    let x = ev.clientX - r.left + 14;
    let y = ev.clientY - r.top + 14;
    if (x + tw > r.width - 8) x = ev.clientX - r.left - tw - 14;
    if (y + th > r.height - 8) y = ev.clientY - r.top - th - 14;
    tooltip.style.left = `${Math.max(8, x)}px`;
    tooltip.style.top = `${Math.max(8, y)}px`;
  }

  function hideTooltip() {
    tooltip.hidden = true;
  }

  // ---------- Header: progress ----------

  function renderProgress() {
    const done = studiedCount();
    document.getElementById("progress-done").textContent = done;
    document.getElementById("progress-total").textContent = ROUTE.length;
    const bar = document.getElementById("progress-bar");
    bar.setAttribute("aria-label", `${done} of ${ROUTE.length} states studied`);
    bar.innerHTML = DIVISIONS.map((d) => {
      const n = d.states.filter(isStudied).length;
      return `<div class="progress-seg" style="flex:${d.states.length}" title="${esc(d.name)}: ${n} of ${d.states.length}">
        <span style="width:${(n / d.states.length) * 100}%"></span></div>`;
    }).join("");
  }

  // ---------- Toolbar: industry picker ----------

  function statesWithCategory(catId) {
    return ROUTE.filter(isStudied).filter((code) => (DATA[code].specialties || []).some((sp) => sp.category === catId));
  }

  const industrySelect = document.getElementById("industry");

  function renderIndustryPicker() {
    industrySelect.innerHTML = `<option value="">None (show progress)</option>` + CATEGORIES.map((c) =>
      `<option value="${c.id}">${esc(c.name)} (${statesWithCategory(c.id).length})</option>`
    ).join("");
    industrySelect.value = state.filter || "";
    industrySelect.classList.toggle("is-active", !!state.filter);
  }

  industrySelect.addEventListener("change", () => setFilter(industrySelect.value || null));

  // ---------- Legend ----------

  function renderLegend() {
    const item = (cls, text, style = "") => `<span class="legend-item"><span class="swatch ${cls}" style="${style}"></span>${text}</span>`;
    const fill = (v) => `background:var(${v})`;
    const el = document.getElementById("legend");
    if (state.quiz) {
      el.innerHTML = [
        item("", "Correct answer", fill("--good")),
        item("", "Wrong pick", fill("--bad")),
        item("", "Highlighted state", fill("--accent")),
        `<span class="legend-note">Labels are hidden. Zoom in for small states.</span>`,
      ].join("");
    } else if (state.filter) {
      el.innerHTML = [
        item("", "Top specialty", fill("--fill-top")),
        item("", "Also a specialty", fill("--fill-also")),
        item("", "Studied, other strengths", fill("--fill-other")),
        item("", "Not studied yet", fill("--fill-unstudied")),
      ].join("");
    } else {
      el.innerHTML = [
        item("", "Studied", fill("--fill-studied")),
        item("", "Not studied yet", fill("--fill-unstudied")),
        item("next", "Up next"),
        `<span class="legend-note">Scroll or pinch to zoom</span>`,
      ].join("");
    }
  }

  // ---------- Panel ----------

  const panel = document.getElementById("panel");

  function renderPanel() {
    if (state.quiz) panel.innerHTML = quizView();
    else if (state.selected) panel.innerHTML = stateView(state.selected);
    else if (state.filter) panel.innerHTML = filterView(state.filter);
    else panel.innerHTML = routeView();
    panel.scrollTop = 0;
  }

  function statusBadge(code) {
    if (isStudied(code)) return `<span class="status done">${esc(fmtDate(DATA[code].studied)) || "Studied"}</span>`;
    if (code === nextUp()) return `<span class="status next">Up next</span>`;
    return `<span class="status">Not yet</span>`;
  }

  function routeView() {
    const next = nextUp();
    const nextCard = next
      ? `<div class="next-card">
          <div class="label">Up next</div>
          <div class="name">${esc(byCode.get(next).name)} <span class="code-badge">${next}</span></div>
          <div class="meta">${esc(byCode.get(next).division.name)} · stop ${byCode.get(next).stop} of ${ROUTE.length}</div>
          <button type="button" data-select="${next}">Open ${esc(byCode.get(next).name)}</button>
        </div>`
      : `<div class="empty-note">All ${ROUTE.length} done. The whole map is yours.</div>`;

    const divisions = DIVISIONS.map((d) => {
      const n = d.states.filter(isStudied).length;
      const rows = d.states.map((code) => {
        const s = byCode.get(code);
        return `<li><button type="button" class="route-item" data-select="${code}" data-hover="${code}">
          <span class="route-num">${s.stop}</span>
          <span>${esc(s.name)}<span class="route-code">${code}</span></span>
          ${statusBadge(code)}
        </button></li>`;
      }).join("");
      return `<section class="division">
        <div class="division-head">
          <span class="division-name">${esc(d.name)}</span>
          <span class="division-meta">${esc(d.region)} · ${n}/${d.states.length}</span>
        </div>
        <ul class="route-list">${rows}</ul>
      </section>`;
    }).join("");

    return `
      <div class="kicker">Study route · east to west</div>
      <h2>${ROUTE.length} stops, one border at a time</h2>
      <p class="intro">Each state on the route borders the one before it, so the map fills in as one continuous trail.</p>
      ${nextCard}
      ${divisions}`;
  }

  function filterView(catId) {
    const c = catById.get(catId);
    const rows = statesWithCategory(catId)
      .map((code) => {
        const specs = DATA[code].specialties || [];
        const idx = specs.findIndex((sp) => sp.category === catId);
        return { code, idx, matches: specs.filter((sp) => sp.category === catId) };
      })
      .sort((a, b) => a.idx - b.idx || (b.matches[0].lq || 0) - (a.matches[0].lq || 0));

    const list = rows.length
      ? rows.map(({ code, idx, matches }) => `
          <button type="button" class="filter-item" data-select="${code}" data-hover="${code}">
            <div class="top">
              <span>${esc(byCode.get(code).name)}${idx === 0 ? `<span class="rank-tag">Top specialty</span>` : ""}</span>
              ${has(matches[0].lq) ? `<span class="lq-inline">${matches[0].lq.toFixed(1)}×</span>` : ""}
            </div>
            <div class="what">${matches.map((m) => esc(m.name)).join(" · ")}</div>
          </button>`).join("")
      : `<div class="empty-note">No studied state has a ${esc(c.name)} specialty yet. This list fills in as you go.</div>`;

    return `
      <button type="button" class="back" data-action="clear-filter">← Back to route</button>
      <div class="kicker">Industry</div>
      <h2>${esc(c.name)}</h2>
      <p class="intro">${esc(c.hint)}</p>
      <h3>States specializing in it</h3>
      <p class="section-note">Sorted by rank within each state, then by location quotient.</p>
      ${list}`;
  }

  function neighborChips(code) {
    const list = byCode.get(code).neighbors || [];
    if (!list.length) return `<p class="section-note">No land border with another state.</p>`;
    return `<div class="neighbors">${list.map((n) =>
      `<button type="button" class="neighbor${isStudied(n) ? " is-studied" : ""}" data-select="${n}" data-hover="${n}">${esc(byCode.get(n).name)}</button>`
    ).join("")}</div>`;
  }

  function stateView(code) {
    const s = byCode.get(code);
    const d = isStudied(code) ? DATA[code] : null;
    const backLabel = state.filter ? `← Back to ${esc(catById.get(state.filter).name)}` : "← Back to route";
    const kickerBits = [esc(s.division.name), `Stop ${s.stop} of ${ROUTE.length}`];
    if (d && d.studied) kickerBits.push(`Studied ${esc(fmtDate(d.studied))}`);

    let html = `
      <button type="button" class="back" data-action="deselect">${backLabel}</button>
      <div class="kicker">${kickerBits.join(" · ")}</div>
      <h2>${esc(s.name)}<span class="code-badge">${code}</span></h2>
      ${d && has(d.nickname) ? `<p class="nickname">${esc(d.nickname)}</p>` : ""}`;

    if (!d) {
      const before = ROUTE.slice(0, s.stop - 1).filter((c) => !isStudied(c)).length;
      const msg = code === nextUp()
        ? "Up next. Before you open the sources, write down your guess: what does this state live on?"
        : `Not studied yet. ${before} unstudied stop${before === 1 ? "" : "s"} before it on the route.`;
      if (STUDIED.includes(code) && !DATA[code]) {
        html += `<div class="empty-note">Listed in data/studied.js, but data/states/${code}.js didn't load.</div>`;
      } else {
        html += `<div class="empty-note">${msg}</div>`;
      }
      html += `<h3>Borders</h3>${neighborChips(code)}`;
      return html;
    }

    // Facts
    const st = d.stats || {};
    const facts = [];
    if (has(d.capital)) facts.push(["Capital", esc(d.capital)]);
    if (has(d.largestCity)) facts.push(["Largest city", esc(d.largestCity)]);
    if (has(st.gdp)) facts.push(["GDP", `${fmtGdp(st.gdp)}${has(st.gdpRank) ? ` <span class="sub">#${st.gdpRank}</span>` : ""}`]);
    if (has(st.population)) facts.push(["Population", fmtPop(st.population)]);
    if (has(st.gdp) && has(st.population)) {
      facts.push(["GDP per person", `$${(Math.round((st.gdp * 1000) / st.population / 100) * 100).toLocaleString("en-US")}`]);
    }
    if (has(st.year)) facts.push(["Data year", esc(st.year)]);
    if (facts.length) {
      html += `<dl class="facts">${facts.map(([k, v]) => `<div class="fact"><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>`;
    }

    if (has(d.oneLiner)) {
      html += `<p class="one-liner"><span class="label">My one-liner</span>${esc(d.oneLiner)}</p>`;
    }

    // Layer 1: specialties
    if (has(d.specialties)) {
      html += `<h3>Signature industries</h3>
        <p class="section-note">What sets ${esc(s.name)} apart, ranked by location quotient (LQ = state share ÷ US share; above 1.5 is a real specialty).</p>`;
      html += d.specialties.map((sp) => {
        const cat = catById.get(sp.category);
        return `<div class="specialty">
          <div class="specialty-head">
            <div>
              <div class="specialty-name">${esc(sp.name)}</div>
              ${cat ? `<button type="button" class="cat-tag" data-cat="${cat.id}">${esc(cat.name)}</button>` : ""}
            </div>
            ${has(sp.lq) ? `<div class="lq"><div class="lq-value">${sp.lq.toFixed(1)}×</div><div class="lq-label">LQ${has(sp.lqBasis) ? ` · ${esc(sp.lqBasis)}` : ""}</div></div>` : ""}
          </div>
          ${has(sp.why) ? `<p>${esc(sp.why)}</p>` : ""}
          ${has(sp.players) ? `<div class="meta"><b>Key players:</b> ${sp.players.map(esc).join(", ")}</div>` : ""}
          ${has(sp.places) ? `<div class="meta"><b>Where:</b> ${sp.places.map(esc).join(", ")}</div>` : ""}
        </div>`;
      }).join("");
    }

    // Layer 2: largest sectors
    if (has(d.largest)) {
      const max = Math.max(...d.largest.flatMap((r) => [r.share || 0, r.usShare || 0])) * 1.08 || 1;
      const anyUs = d.largest.some((r) => has(r.usShare));
      html += `<h3>Largest sectors</h3>
        <p class="section-note">Share of state GDP${has(st.year) ? `, ${esc(st.year)}` : ""}.</p>
        <div class="bars">${d.largest.map((r) => `
          <div class="bar-row">
            <div class="bar-label">
              <span>${esc(r.name)}</span>
              <span class="bar-value">${fmtNum(r.share)}%${has(r.usShare) ? `<span class="bar-us">US ${fmtNum(r.usShare)}%</span>` : ""}</span>
            </div>
            <div class="bar-track">
              <div class="bar-fill" style="width:${(r.share / max) * 100}%"></div>
              ${has(r.usShare) ? `<div class="bar-us-mark" style="left:${(r.usShare / max) * 100}%"></div>` : ""}
            </div>
          </div>`).join("")}
        </div>
        ${anyUs ? `<div class="bar-legend"><span><span class="mark"></span>US average</span></div>` : ""}`;
    }

    // Geography
    html += `<h3>Geography</h3>`;
    if (has(d.geography)) html += `<ul class="plain-list">${d.geography.map((g) => `<li>${esc(g)}</li>`).join("")}</ul>`;
    html += `<p class="section-note" style="margin:12px 0 0">Borders</p>${neighborChips(code)}`;

    if (has(d.myGuess)) {
      html += `<h3>My guess before studying</h3><p class="guess">${esc(d.myGuess)}</p>`;
    }

    if (has(d.sources)) {
      html += `<h3>Sources</h3><ul class="sources">${d.sources.map((src) =>
        `<li>${has(src.url) ? `<a href="${esc(src.url)}" target="_blank" rel="noopener">${esc(src.label || src.url)}</a>` : esc(src.label)}</li>`
      ).join("")}</ul>`;
    }

    return html;
  }

  panel.addEventListener("click", (ev) => {
    const t = ev.target.closest("[data-quiz], [data-select], [data-cat], [data-action]");
    if (!t) return;
    if (t.dataset.quiz) {
      quizAction(t.dataset.quiz, t.dataset.value);
    } else if (t.dataset.select) {
      select(t.dataset.select);
      focusState(t.dataset.select);
    } else if (t.dataset.cat) {
      setFilter(t.dataset.cat);
    } else if (t.dataset.action === "deselect") {
      select(null);
    } else if (t.dataset.action === "clear-filter") {
      setFilter(null);
    }
  });

  panel.addEventListener("pointerover", (ev) => {
    const t = ev.target.closest("[data-hover]");
    setHover(t ? t.dataset.hover : null);
  });
  panel.addEventListener("pointerleave", () => setHover(null));

  // ---------- Quiz ----------

  const QUIZ_LENGTH = 10;
  const quizToggle = document.getElementById("quiz-toggle");
  const quizBanner = document.getElementById("quiz-banner");

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Draws n codes from the pool, repeating only when the pool is smaller than n.
  function draw(pool, n) {
    const out = [];
    while (out.length < n && pool.length) out.push(...shuffle(pool));
    return out.slice(0, n);
  }

  const STATE_NAMES = [...byCode.values()].map((s) => s.name);
  const CONNECTORS = new Set(["and", "of", "the", "&"]);
  const stripParens = (t) => t.replace(/\s*\(.*?\)/g, "").trim();
  // Players and places make fair clues only when they're proper names ("Bath Iron Works")
  // rather than descriptions ("Family sugarhouses"), and when they don't give away a state's name.
  const isProperName = (t) => t.split(/[\s,]+/).filter(Boolean).every((w) => CONNECTORS.has(w) || /^[A-Z0-9]/.test(w));
  const givesAway = (t) => STATE_NAMES.some((n) => t.includes(n));

  // Fact questions come from the studied states' data. Every state the fact fits counts as correct.
  function buildClues(codes) {
    const clues = new Map();
    const add = (text, fits) => {
      if (clues.has(text) || givesAway(text)) return;
      const answers = codes.filter(fits);
      if (answers.length) clues.set(text, { type: "clue", text, answers });
    };
    const listed = (code, specName, key, item) =>
      (DATA[code].specialties || []).some((sp) => sp.name === specName && (sp[key] || []).map(stripParens).includes(item));

    for (const code of codes) {
      const d = DATA[code];
      if (has(d.capital)) add(`Which state's capital is ${d.capital}?`, (x) => DATA[x].capital === d.capital);
      if (has(d.largestCity) && d.largestCity !== d.capital) {
        add(`Which state's largest city is ${d.largestCity}?`, (x) => DATA[x].largestCity === d.largestCity);
      }
      if (has(d.nickname)) add(`Which state is called "${d.nickname}"?`, (x) => DATA[x].nickname === d.nickname);
      for (const sp of d.specialties || []) {
        add(`Which state has "${sp.name}" as a signature industry?`, (x) => (DATA[x].specialties || []).some((o) => o.name === sp.name));
        for (const p of (sp.players || []).map(stripParens).filter(isProperName)) {
          add(`Which state is home to ${p}? (${sp.name})`, (x) => listed(x, sp.name, "players", p));
        }
        for (const p of (sp.places || []).map(stripParens).filter(isProperName)) {
          add(`Where is ${p}? (${sp.name})`, (x) => listed(x, sp.name, "places", p));
        }
      }
    }
    return [...clues.values()];
  }

  // Wrong options come from the state's neighbors, then its division, which is the harder test.
  function nameOptions(code) {
    const s = byCode.get(code);
    const candidates = [...shuffle(s.neighbors || []), ...shuffle(s.division.states), ...shuffle(ROUTE)];
    const wrong = candidates.filter((c, i) => c !== code && candidates.indexOf(c) === i).slice(0, 3);
    return shuffle([code, ...wrong]);
  }

  function buildQuiz(scope) {
    const studied = ROUTE.filter(isStudied);
    const pool = scope === "all" ? ROUTE : studied;
    const clues = shuffle(buildClues(studied)).slice(0, studied.length >= 2 ? 4 : 0);
    const rest = QUIZ_LENGTH - clues.length;
    const locateCount = Math.ceil(rest / 2);
    const mapQuestions = draw(pool, rest).map((code, i) =>
      i < locateCount
        ? { type: "locate", code, answers: [code] }
        : { type: "name", code, answers: [code], options: nameOptions(code) });
    return shuffle([...mapQuestions, ...clues]);
  }

  const quizQuestion = () => (state.quiz && state.quiz.questions ? state.quiz.questions[state.quiz.i] || null : null);
  const quizResult = () => (state.quiz && state.quiz.questions ? state.quiz.results[state.quiz.i] || null : null);
  const stateName = (code) => byCode.get(code).name;
  const answerNames = (q) => q.answers.map(stateName).join(", ");

  function promptText(q) {
    if (q.type === "locate") return `Find ${stateName(q.code)} on the map.`;
    if (q.type === "name") return "Which state is highlighted?";
    return q.text;
  }

  function feedbackText(q, r) {
    const fits = q.answers.length > 1 ? `Any of these fit: ${answerNames(q)}.` : null;
    if (r.correct) return `<span class="icon good">✓</span><b>Correct.</b> ${esc(fits || `${answerNames(q)}.`)}`;
    return `<span class="icon bad">✗</span><b>Not quite.</b> You picked ${esc(stateName(r.pick))}. ${esc(fits || `The answer is ${answerNames(q)}.`)}`;
  }

  // States whose names the last answer revealed on the map.
  function quizRevealed() {
    const q = quizQuestion();
    const r = quizResult();
    return r ? new Set([...q.answers, r.pick]) : new Set();
  }

  function quizTone(code) {
    const q = quizQuestion();
    const r = quizResult();
    if (!q) return "unstudied";
    if (r) {
      if (q.answers.includes(code)) return "quiz-right";
      if (code === r.pick) return "quiz-wrong";
    } else if (q.type === "name" && code === q.code) {
      return "quiz-target";
    }
    return "unstudied";
  }

  function openQuiz() {
    hideTooltip();
    state.selected = null;
    state.filter = null;
    syncHash();
    state.quiz = { scope: studiedCount() >= 3 ? "studied" : "all", questions: null, i: 0, results: [] };
    if (state.k > 1) resetZoom();
    renderQuiz();
  }

  function closeQuiz() {
    state.quiz = null;
    resetZoom();
    renderQuiz();
  }

  function startQuiz() {
    Object.assign(state.quiz, { questions: buildQuiz(state.quiz.scope), i: 0, results: [] });
    showQuestion();
  }

  function showQuestion() {
    const q = quizQuestion();
    if (q && q.type === "name") focusState(q.code); // zooms in on small states
    else resetZoom(); // also cancels a zoom-in still animating from the last question
    renderQuiz();
  }

  function quizPick(code, fromMap = true) {
    const q = quizQuestion();
    if (!q || quizResult() || (fromMap && q.type === "name")) return;
    state.quiz.results[state.quiz.i] = { pick: code, correct: q.answers.includes(code) };
    renderQuiz();
  }

  function quizNext() {
    if (!quizResult()) return;
    state.quiz.i += 1;
    showQuestion();
  }

  function quizAction(action, value) {
    if (action === "scope") {
      state.quiz.scope = value;
      renderQuiz();
    } else if (action === "start") startQuiz();
    else if (action === "pick") quizPick(value, false);
    else if (action === "next") quizNext();
    else if (action === "setup") {
      state.quiz.questions = null;
      renderQuiz();
    } else if (action === "exit") closeQuiz();
    else if (action === "review") {
      closeQuiz();
      select(value);
      focusState(value);
    }
  }

  function quizKey(ev) {
    const q = quizQuestion();
    if (ev.key === "Escape") return closeQuiz();
    if (ev.key === "Enter" || ev.key === "ArrowRight") {
      if (ev.key === "Enter" && /^(BUTTON|SELECT|INPUT)$/.test(ev.target.tagName)) return; // the button handles it
      if (!state.quiz.questions) startQuiz();
      else if (quizResult()) quizNext();
      return;
    }
    if (q && q.type === "name" && !quizResult() && /^[1-4]$/.test(ev.key)) quizPick(q.options[+ev.key - 1], false);
  }

  function quizView() {
    const qz = state.quiz;
    if (!qz.questions) {
      const studied = studiedCount();
      const scopeButton = (value, label, disabled) =>
        `<button type="button" class="seg-btn" data-quiz="scope" data-value="${value}" aria-pressed="${qz.scope === value}" ${disabled ? "disabled" : ""}>${label}</button>`;
      return `
        <div class="kicker">Quiz</div>
        <h2>Test yourself</h2>
        <p class="intro">${QUIZ_LENGTH} questions: find a state on the map, name a highlighted state, and match facts to the states you've studied. Labels stay hidden until you answer.</p>
        <h3>Which states?</h3>
        <div class="seg">
          ${scopeButton("studied", `Studied (${studied})`, studied === 0)}
          ${scopeButton("all", `All ${ROUTE.length}`, false)}
        </div>
        <p class="section-note quiz-note">Fact questions always come from the states you've studied.</p>
        <div class="quiz-actions">
          <button type="button" class="primary-btn" data-quiz="start">Start quiz</button>
          <button type="button" class="link-btn" data-quiz="exit">Back to the map</button>
        </div>`;
    }

    const total = qz.questions.length;
    const score = qz.results.filter((r) => r && r.correct).length;
    const dots = qz.questions.map((_, i) => {
      const r = qz.results[i];
      const cls = r ? (r.correct ? "right" : "wrong") : i === qz.i ? "current" : "";
      return `<span class="quiz-dot ${cls}"></span>`;
    }).join("");

    if (qz.i >= total) {
      const misses = qz.questions.map((q, i) => ({ q, r: qz.results[i] })).filter(({ r }) => !r.correct);
      const verdict = score === total ? "A perfect round."
        : score >= total * 0.8 ? "Strong round."
        : score >= total * 0.5 ? "Getting there."
        : "Keep going; it gets easier every round.";
      return `
        <div class="kicker">Quiz · results</div>
        <div class="quiz-score">${score}<span> / ${total}</span></div>
        <p class="intro">${verdict}</p>
        <div class="quiz-dots">${dots}</div>
        ${misses.length ? `<h3>Review what you missed</h3>${misses.map(({ q, r }) => `
          <button type="button" class="filter-item" data-quiz="review" data-value="${q.answers[0]}">
            <div class="top"><span>${esc(answerNames(q))}</span><span class="lq-inline">Review →</span></div>
            <div class="what">${esc(promptText(q))} You picked ${esc(stateName(r.pick))}.</div>
          </button>`).join("")}` : ""}
        <div class="quiz-actions">
          <button type="button" class="primary-btn" data-quiz="start">Play again</button>
          <button type="button" class="link-btn" data-quiz="setup">Change settings</button>
          <button type="button" class="link-btn" data-quiz="exit">Exit quiz</button>
        </div>`;
    }

    const q = qz.questions[qz.i];
    const r = qz.results[qz.i];
    let body = "";
    if (q.type === "name") {
      body = `<div class="quiz-options">${q.options.map((c, i) => {
        const cls = r ? (q.answers.includes(c) ? " right" : c === r.pick ? " wrong" : "") : "";
        return `<button type="button" class="quiz-option${cls}" data-quiz="pick" data-value="${c}" ${r ? "disabled" : ""}>
          <span class="key">${i + 1}</span>${esc(stateName(c))}</button>`;
      }).join("")}</div>`;
    } else if (!r) {
      body = `<p class="quiz-hint">Click the state on the map. Small states have "?" markers on the right, or zoom in.</p>`;
    }
    const feedback = r
      ? `<div class="quiz-feedback">${feedbackText(q, r)}</div>
         <div class="quiz-actions">
           <button type="button" class="primary-btn" data-quiz="next">${qz.i + 1 === total ? "See results" : "Next question"} →</button>
           <span class="key-hint">or press Enter</span>
         </div>`
      : "";

    return `
      <div class="kicker">Quiz · question ${qz.i + 1} of ${total} · score ${score}</div>
      <div class="quiz-dots">${dots}</div>
      <div class="quiz-prompt">${esc(promptText(q))}</div>
      ${body}
      ${feedback}
      <div class="quiz-actions"><button type="button" class="link-btn" data-quiz="exit">Exit quiz</button></div>`;
  }

  // A one-line copy of the question over the map, so it stays in view on small screens.
  function renderQuizBanner() {
    const q = quizQuestion();
    if (!q) {
      quizBanner.hidden = true;
      return;
    }
    const r = quizResult();
    const last = state.quiz.i + 1 === state.quiz.questions.length;
    const text = r
      ? `${r.correct ? `<span class="icon good">✓</span>Correct: ` : `<span class="icon bad">✗</span>Answer: `}${esc(answerNames(q))}`
      : esc(q.type === "name" ? "Which state is highlighted? Pick its name." : promptText(q));
    quizBanner.innerHTML = `
      <span class="q-num">${state.quiz.i + 1}/${state.quiz.questions.length}</span>
      <span class="q-text">${text}</span>
      ${r ? `<button type="button" class="banner-next" data-quiz="next">${last ? "Results" : "Next"} →</button>` : ""}`;
    quizBanner.hidden = false;
  }

  function renderQuiz() {
    const on = !!state.quiz;
    quizToggle.setAttribute("aria-pressed", String(on));
    quizToggle.textContent = on ? "Exit quiz" : "Quiz";
    industrySelect.disabled = on;
    document.getElementById("toggle-labels").disabled = on;
    document.getElementById("toggle-route").disabled = on;
    renderIndustryPicker();
    renderLegend();
    renderMap();
    renderPanel();
    renderQuizBanner();
  }

  quizToggle.addEventListener("click", () => (state.quiz ? closeQuiz() : openQuiz()));
  quizBanner.addEventListener("click", (ev) => {
    const t = ev.target.closest("[data-quiz]");
    if (t) quizAction(t.dataset.quiz, t.dataset.value);
  });

  // ---------- State changes ----------

  // The hash mirrors the view, e.g. #ME, #energy, or #energy/TX.
  function syncHash() {
    const hash = [state.filter, state.selected].filter(Boolean).join("/");
    history.replaceState(null, "", hash ? `#${hash}` : location.pathname + location.search);
  }

  function select(code) {
    state.selected = code;
    syncHash();
    renderMap();
    renderPanel();
  }

  function setFilter(catId) {
    state.filter = catId;
    syncHash();
    renderIndustryPicker();
    renderLegend();
    renderMap();
    if (!state.selected) renderPanel();
  }

  document.getElementById("toggle-labels").addEventListener("change", (ev) => {
    state.showLabels = ev.target.checked;
    updateLabelVisibility();
  });

  document.getElementById("toggle-route").addEventListener("change", (ev) => {
    state.showRoute = ev.target.checked;
    renderRoute();
  });

  document.addEventListener("keydown", (ev) => {
    if (state.quiz) {
      quizKey(ev);
      return;
    }
    if (ev.key !== "Escape") return;
    if (state.selected) select(null);
    else if (state.filter) setFilter(null);
  });

  // ---------- Boot ----------

  function checkData(code) {
    const d = DATA[code];
    if (!d) return;
    if (d.code !== code) console.warn(`[${code}] code field is "${d.code}"`);
    (d.specialties || []).forEach((sp, i) => {
      if (!catById.has(sp.category)) console.warn(`[${code}] specialties[${i}].category "${sp.category}" is not in data/categories.js`);
    });
  }

  async function boot() {
    const unknown = STUDIED.filter((c) => !byCode.has(c));
    if (unknown.length) console.warn("Unknown codes in data/studied.js:", unknown);

    const results = await Promise.all(STUDIED.filter((c) => byCode.has(c)).map((c) => loadScript(`data/states/${c}.js`).then((ok) => [c, ok])));
    results.filter(([, ok]) => !ok).forEach(([c]) => console.warn(`Could not load data/states/${c}.js`));
    STUDIED.forEach(checkData);

    applyScale(1);
    renderProgress();
    applyHash();
    window.addEventListener("hashchange", applyHash);
  }

  function applyHash() {
    if (state.quiz) closeQuiz(); // following a link means leaving the quiz
    const parts = decodeURIComponent(location.hash.slice(1)).split("/");
    state.filter = parts.find((p) => catById.has(p)) || null;
    const code = parts.map((p) => p.toUpperCase()).find((p) => byCode.has(p)) || null;

    renderIndustryPicker();
    renderLegend();
    select(code);
    if (code) focusState(code);
  }

  boot();
})();

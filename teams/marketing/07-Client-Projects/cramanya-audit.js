const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Marketing Audit — CRAMANYA Advocates & Solicitors";

// ── Palette ───────────────────────────────────────────────────────
const C = {
  navy:        "1B2A4A",
  navyMid:     "243356",
  navyLight:   "2D3F6A",
  gold:        "C49A2A",
  goldLight:   "E8C84A",
  cream:       "FAF7F2",
  sand:        "EDE8DE",
  white:       "FFFFFF",
  textDark:    "1A1A2E",
  textMuted:   "5A6478",
  textLight:   "FFFFFF",
  borderLight: "DDD8CE",
  red:         "C0392B",
  orange:      "D35400",
  amber:       "B7950B",
  green:       "1E8449",
  blue:        "2471A3",
};

const makeShadow = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.09 });

function scoreColor(score) {
  if (score >= 70) return C.green;
  if (score >= 55) return C.blue;
  if (score >= 40) return C.amber;
  return C.red;
}

// ── SLIDE 1: Title ────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  // Gold left bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.4, h: 5.625, fill: { color: C.gold }, line: { type: "none" } });

  // Overline
  s.addText("MARKETING AUDIT REPORT", {
    x: 0.7, y: 1.3, w: 8.5, h: 0.35,
    fontFace: "Calibri", fontSize: 11, bold: true, color: C.gold, charSpacing: 3, margin: 0,
  });

  // Title
  s.addText("CRAMANYA Advocates\n& Solicitors", {
    x: 0.7, y: 1.75, w: 8.5, h: 1.5,
    fontFace: "Georgia", fontSize: 40, bold: true, color: C.textLight, margin: 0,
  });

  // Subtitle
  s.addText("cramanya.com  ·  Kampala, Uganda", {
    x: 0.7, y: 3.35, w: 8.5, h: 0.45,
    fontFace: "Calibri", fontSize: 14, color: "A8B8CC", margin: 0,
  });

  // Score pill
  s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 3.95, w: 2.2, h: 0.72, fill: { color: C.amber }, line: { type: "none" } });
  s.addText("50/100 — Grade D", {
    x: 0.7, y: 3.95, w: 2.2, h: 0.72,
    fontFace: "Calibri", fontSize: 16, bold: true, color: C.white,
    align: "center", valign: "middle", margin: 0,
  });

  s.addText("March 4, 2026", {
    x: 0.7, y: 5.1, w: 9, h: 0.3,
    fontFace: "Calibri", fontSize: 10, color: "5A6E8A", margin: 0,
  });
}

// ── SLIDE 2: Score at a Glance ────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy }, line: { type: "none" } });
  s.addText("SCORE AT A GLANCE", {
    x: 0.5, y: 0.08, w: 9, h: 0.65,
    fontFace: "Calibri", fontSize: 11, bold: true, color: C.gold, charSpacing: 3, valign: "middle", margin: 0,
  });

  s.addText("Overall Marketing Score", {
    x: 0.5, y: 1.0, w: 6, h: 0.62,
    fontFace: "Georgia", fontSize: 28, bold: true, color: C.textDark, margin: 0,
  });

  // Big score
  s.addShape(pres.shapes.RECTANGLE, { x: 7.2, y: 0.92, w: 2.3, h: 0.75, fill: { color: C.amber }, line: { type: "none" } });
  s.addText("50 / 100", {
    x: 7.2, y: 0.92, w: 2.3, h: 0.75,
    fontFace: "Georgia", fontSize: 22, bold: true, color: C.white,
    align: "center", valign: "middle", margin: 0,
  });

  // 6 score bars
  const cats = [
    { name: "Content & Messaging",     score: 48, weight: "25%" },
    { name: "Conversion Optimization", score: 48, weight: "20%" },
    { name: "SEO & Discoverability",   score: 51, weight: "20%" },
    { name: "Competitive Positioning", score: 38, weight: "15%" },
    { name: "Brand & Trust",           score: 67, weight: "10%" },
    { name: "Growth & Strategy",       score: 54, weight: "10%" },
  ];

  const barX = 3.0, maxW = 5.8, barH = 0.42, gap = 0.16;
  const startY = 1.88;

  cats.forEach((cat, i) => {
    const y = startY + i * (barH + gap);
    const col = scoreColor(cat.score);

    // Label
    s.addText(cat.name, {
      x: 0.5, y: y, w: 2.35, h: barH,
      fontFace: "Calibri", fontSize: 11, color: C.textDark, valign: "middle", margin: 0,
    });
    // Weight
    s.addText(cat.weight, {
      x: 2.65, y: y, w: 0.45, h: barH,
      fontFace: "Calibri", fontSize: 9, color: C.textMuted, valign: "middle", align: "right", margin: 0,
    });
    // Track
    s.addShape(pres.shapes.RECTANGLE, { x: barX, y: y + 0.06, w: maxW, h: barH - 0.12, fill: { color: "E0DDD5" }, line: { type: "none" } });
    // Fill
    s.addShape(pres.shapes.RECTANGLE, { x: barX, y: y + 0.06, w: maxW * cat.score / 100, h: barH - 0.12, fill: { color: col }, line: { type: "none" } });
    // Score label
    s.addText(`${cat.score}`, {
      x: barX + maxW * cat.score / 100 + 0.08, y: y, w: 0.45, h: barH,
      fontFace: "Calibri", fontSize: 11, bold: true, color: col, valign: "middle", margin: 0,
    });
  });

  // Legend
  s.addText("80+ Strong   60–79 Solid   40–59 Needs Work   <40 Critical", {
    x: 0.5, y: 5.22, w: 9, h: 0.28,
    fontFace: "Calibri", fontSize: 9, color: C.textMuted, margin: 0,
  });
}

// ── SLIDE 3: The Core Problem ─────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy }, line: { type: "none" } });
  s.addText("EXECUTIVE SUMMARY", {
    x: 0.5, y: 0.08, w: 9, h: 0.65,
    fontFace: "Calibri", fontSize: 11, bold: true, color: C.gold, charSpacing: 3, valign: "middle", margin: 0,
  });

  s.addText("Strong Assets. Weak Marketing Infrastructure.", {
    x: 0.5, y: 1.0, w: 9, h: 0.65,
    fontFace: "Georgia", fontSize: 26, bold: true, color: C.textDark, margin: 0,
  });

  // Callout box
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.78, w: 9, h: 0.75, fill: { color: "FEF9EC" }, line: { color: "E8C84A", width: 1.5 } });
  s.addText("CRAMANYA holds genuinely rare assets — World Bank & OXFAM as clients, a 252-office global network, 5 international bar memberships, and a legal academy. The problem: the copy surrounding these assets actively undermines the credibility they have earned.", {
    x: 0.7, y: 1.86, w: 8.6, h: 0.6, fontFace: "Calibri", fontSize: 11.5, color: C.textDark, margin: 0,
  });

  // 3 columns
  const cols = [
    {
      head: "What Exists",
      col: C.green,
      items: ["World Bank, OXFAM client logos", "Prae Legal: 252+ offices globally", "5 international bar memberships", "CRAA Academy + newsletter", "Paid consultation UGX 200K"],
    },
    {
      head: "What's Missing",
      col: C.red,
      items: ["Name/email on booking form", "Meta descriptions (zero site-wide)", "Outcome-led hero copy", "Practice area CTAs", "Named partner profiles"],
    },
    {
      head: "The Opportunity",
      col: C.amber,
      items: ["Lead Prae Legal positioning", "Migrate blog to main domain", "Build international client page", "Activate Academy as lead funnel", "Niche authority in 2–3 areas"],
    },
  ];

  cols.forEach((col, i) => {
    const x = 0.5 + i * 3.15;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.68, w: 2.9, h: 2.65, fill: { color: C.white }, line: { color: C.borderLight, width: 1 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.68, w: 2.9, h: 0.07, fill: { color: col.col }, line: { type: "none" } });
    s.addText(col.head, { x: x + 0.15, y: 2.78, w: 2.6, h: 0.35, fontFace: "Calibri", fontSize: 11, bold: true, color: col.col, margin: 0 });
    col.items.forEach((item, j) => {
      s.addText(`• ${item}`, { x: x + 0.15, y: 3.22 + j * 0.4, w: 2.6, h: 0.35, fontFace: "Calibri", fontSize: 10, color: C.textDark, margin: 0 });
    });
  });
}

// ── SLIDE 4: Content & Messaging ─────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy }, line: { type: "none" } });
  s.addText("CONTENT & MESSAGING  ·  48/100", {
    x: 0.5, y: 0.08, w: 8.5, h: 0.65,
    fontFace: "Calibri", fontSize: 11, bold: true, color: C.gold, charSpacing: 2, valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 8.8, y: 0.15, w: 0.75, h: 0.52, fill: { color: C.amber }, line: { type: "none" } });
  s.addText("D", { x: 8.8, y: 0.15, w: 0.75, h: 0.52, fontFace: "Georgia", fontSize: 22, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });

  s.addText("The Copy Works Against the Credentials", {
    x: 0.5, y: 1.0, w: 9, h: 0.62,
    fontFace: "Georgia", fontSize: 26, bold: true, color: C.textDark, margin: 0,
  });

  // Left: problem copy
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.75, w: 4.4, h: 3.55, fill: { color: "FEF2F2" }, line: { color: "FECACA", width: 1.5 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.75, w: 4.4, h: 0.07, fill: { color: C.red }, line: { type: "none" } });
  s.addText("CURRENT COPY — 3 CRITICAL FAILURES", { x: 0.7, y: 1.88, w: 4.0, h: 0.3, fontFace: "Calibri", fontSize: 9, bold: true, color: C.red, charSpacing: 1, margin: 0 });

  const problems = [
    { q: '"We provide exquisite and tailor made legal services"', note: '"Exquisite" is hospitality vocab — it evokes nothing in a client evaluating legal risk.' },
    { q: '"Unlike other law firms, CR. Amanya is legal, approachable"', note: 'Claiming to be "legal" is unintentional comedy, not a differentiator.' },
    { q: '"We exist to cultivate growth for our staff and clients"', note: 'Staff growth is an internal HR goal — invisible to clients and damaging when visible.' },
  ];
  problems.forEach((p, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.65, y: 2.25 + i * 1.02, w: 4.1, h: 0.9, fill: { color: C.white }, line: { color: "FECACA", width: 1 } });
    s.addText(`"${p.q}"`, { x: 0.8, y: 2.3 + i * 1.02, w: 3.8, h: 0.37, fontFace: "Georgia", fontSize: 10, color: C.textDark, italic: true, margin: 0 });
    s.addText(p.note, { x: 0.8, y: 2.66 + i * 1.02, w: 3.8, h: 0.4, fontFace: "Calibri", fontSize: 9.5, color: C.textMuted, margin: 0 });
  });

  // Right: fixes
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.75, w: 4.4, h: 3.55, fill: { color: "F0F9F4" }, line: { color: "BBF7D0", width: 1.5 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.75, w: 4.4, h: 0.07, fill: { color: C.green }, line: { type: "none" } });
  s.addText("RECOMMENDED REWRITES", { x: 5.4, y: 1.88, w: 4.0, h: 0.3, fontFace: "Calibri", fontSize: 9, bold: true, color: C.green, charSpacing: 1, margin: 0 });

  const fixes = [
    '"Uganda-based legal counsel with global reach. We protect your business, your assets, and your people — from Day 1 through every stage of growth."',
    '"Most law firms speak in legislation. We speak in outcomes. Our clients — from the World Bank to first-time entrepreneurs — come back because we translate complex law into decisions they can act on."',
    '"We exist to remove legal uncertainty from your path — so you can build, invest, and operate in Uganda with confidence."',
  ];
  fixes.forEach((fix, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 5.35, y: 2.25 + i * 1.02, w: 4.1, h: 0.9, fill: { color: "DCFCE7" }, line: { color: "BBF7D0", width: 1 } });
    s.addText(fix, { x: 5.5, y: 2.3 + i * 1.02, w: 3.8, h: 0.78, fontFace: "Calibri", fontSize: 10, color: C.textDark, margin: 0 });
  });
}

// ── SLIDE 5: Conversion Optimization ─────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy }, line: { type: "none" } });
  s.addText("CONVERSION OPTIMIZATION  ·  48/100", {
    x: 0.5, y: 0.08, w: 8.5, h: 0.65,
    fontFace: "Calibri", fontSize: 11, bold: true, color: C.gold, charSpacing: 2, valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 8.8, y: 0.15, w: 0.75, h: 0.52, fill: { color: C.amber }, line: { type: "none" } });
  s.addText("D", { x: 8.8, y: 0.15, w: 0.75, h: 0.52, fontFace: "Georgia", fontSize: 22, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });

  s.addText("One Conversion Path. Zero Contact Data.", {
    x: 0.5, y: 1.0, w: 9, h: 0.62,
    fontFace: "Georgia", fontSize: 26, bold: true, color: C.textDark, margin: 0,
  });

  // Critical alert
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.75, w: 9, h: 0.65, fill: { color: "FEF2F2" }, line: { color: "FECACA", width: 1.5 } });
  s.addText("CRITICAL: The consultation booking form collects Date, Time, and Mode — but no name, email, or phone number. Every no-show results in total lead loss with zero recovery path.", {
    x: 0.7, y: 1.83, w: 8.6, h: 0.5, fontFace: "Calibri", fontSize: 11.5, color: C.red, margin: 0,
  });

  // 2 columns
  // Left: what exists
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.55, w: 4.3, h: 2.75, fill: { color: C.white }, line: { color: C.borderLight, width: 1 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.55, w: 0.07, h: 2.75, fill: { color: C.green }, line: { type: "none" } });
  s.addText("WHAT'S WORKING", { x: 0.7, y: 2.68, w: 3.9, h: 0.3, fontFace: "Calibri", fontSize: 9, bold: true, color: C.green, charSpacing: 1, margin: 0 });
  const working = [
    ["Pricing upfront", "UGX 200,000 shown before the form — rare for a law firm"],
    ["Multi-mode access", "Physical / Telephone / Zoom removes geographic barriers"],
    ["WhatsApp button", "Floating CTA captures intent before formal booking commitment"],
  ];
  working.forEach(([title, desc], i) => {
    s.addText(title, { x: 0.7, y: 3.08 + i * 0.73, w: 3.9, h: 0.28, fontFace: "Calibri", fontSize: 11, bold: true, color: C.textDark, margin: 0 });
    s.addText(desc, { x: 0.7, y: 3.34 + i * 0.73, w: 3.9, h: 0.3, fontFace: "Calibri", fontSize: 10, color: C.textMuted, margin: 0 });
  });

  // Right: gaps
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 2.55, w: 4.4, h: 2.75, fill: { color: C.white }, line: { color: C.borderLight, width: 1 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 2.55, w: 0.07, h: 2.75, fill: { color: C.red }, line: { type: "none" } });
  s.addText("CRITICAL GAPS TO FIX", { x: 5.4, y: 2.68, w: 3.9, h: 0.3, fontFace: "Calibri", fontSize: 9, bold: true, color: C.red, charSpacing: 1, margin: 0 });
  const gaps = [
    ["No contact data on booking form", "Add Name + Email + Phone before Date field"],
    ["No mid-funnel path for researchers", "Create lead magnets for non-ready visitors"],
    ["Practice area pages dead-end", "Add contextual CTA on every practice page"],
    ["Enterprise logos misplaced", "Move World Bank / OXFAM logos near the CTA"],
  ];
  gaps.forEach(([title, fix], i) => {
    s.addText(title, { x: 5.4, y: 3.08 + i * 0.6, w: 3.9, h: 0.25, fontFace: "Calibri", fontSize: 10.5, bold: true, color: C.textDark, margin: 0 });
    s.addText(`→ ${fix}`, { x: 5.4, y: 3.32 + i * 0.6, w: 3.9, h: 0.22, fontFace: "Calibri", fontSize: 9.5, color: C.textMuted, margin: 0 });
  });
}

// ── SLIDE 6: SEO ──────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy }, line: { type: "none" } });
  s.addText("SEO & DISCOVERABILITY  ·  51/100", {
    x: 0.5, y: 0.08, w: 8.5, h: 0.65,
    fontFace: "Calibri", fontSize: 11, bold: true, color: C.gold, charSpacing: 2, valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 8.8, y: 0.15, w: 0.75, h: 0.52, fill: { color: C.amber }, line: { type: "none" } });
  s.addText("D", { x: 8.8, y: 0.15, w: 0.75, h: 0.52, fontFace: "Georgia", fontSize: 22, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });

  s.addText("Two Structural Issues Limiting Organic Reach", {
    x: 0.5, y: 1.0, w: 9, h: 0.62,
    fontFace: "Georgia", fontSize: 26, bold: true, color: C.textDark, margin: 0,
  });

  // Two big issue cards
  const issues = [
    {
      num: "01",
      title: "Zero Meta Descriptions — Site Wide",
      col: C.red,
      body: "Not a single page has a meta description — homepage, practice areas, team, blog, contact. Without them, Google auto-generates snippets from generic boilerplate, suppressing click-through rates across every organic impression. Yoast SEO is already installed. This takes 1–2 hours to fix.",
      fix: "Write 150–160 char meta descriptions for homepage + all 10 practice area pages. Use Yoast (already installed).",
    },
    {
      num: "02",
      title: "Blog Hosted on WordPress.com — Authority Leak",
      col: C.orange,
      body: "cramanyaadvocates.wordpress.com is a separate, active domain. Every backlink earned by content there builds PageRank for WordPress.com, not cramanya.com. The main site's /blog/ page links out to this external domain, sending both users and crawlers away. Every article published there is a permanent authority donation to a third party.",
      fix: "Migrate all content to cramanya.com/publications/. Set 301 redirects. Publish exclusively on the main domain going forward.",
    },
  ];

  issues.forEach((issue, i) => {
    const x = 0.5 + i * 4.85;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.78, w: 4.55, h: 3.55, fill: { color: C.white }, line: { color: C.borderLight, width: 1 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.78, w: 4.55, h: 0.07, fill: { color: issue.col }, line: { type: "none" } });

    // Number + title
    s.addShape(pres.shapes.OVAL, { x: x + 0.18, y: 1.98, w: 0.42, h: 0.42, fill: { color: issue.col }, line: { type: "none" } });
    s.addText(issue.num, { x: x + 0.18, y: 1.98, w: 0.42, h: 0.42, fontFace: "Calibri", fontSize: 12, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
    s.addText(issue.title, { x: x + 0.72, y: 1.98, w: 3.65, h: 0.42, fontFace: "Calibri", fontSize: 12, bold: true, color: C.textDark, valign: "middle", margin: 0 });

    // Body
    s.addText(issue.body, { x: x + 0.18, y: 2.5, w: 4.2, h: 1.55, fontFace: "Calibri", fontSize: 10.5, color: C.textDark, margin: 0 });

    // Fix box
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.18, y: 4.15, w: 4.2, h: 0.92, fill: { color: "F0F9F4" }, line: { color: "BBF7D0", width: 1 } });
    s.addText("FIX:", { x: x + 0.33, y: 4.22, w: 0.5, h: 0.22, fontFace: "Calibri", fontSize: 9, bold: true, color: C.green, margin: 0 });
    s.addText(issue.fix, { x: x + 0.33, y: 4.44, w: 3.9, h: 0.55, fontFace: "Calibri", fontSize: 9.5, color: C.textDark, margin: 0 });
  });
}

// ── SLIDE 7: Competitive Positioning ─────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy }, line: { type: "none" } });
  s.addText("COMPETITIVE POSITIONING  ·  38/100", {
    x: 0.5, y: 0.08, w: 8.5, h: 0.65,
    fontFace: "Calibri", fontSize: 11, bold: true, color: C.gold, charSpacing: 2, valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 8.8, y: 0.15, w: 0.75, h: 0.52, fill: { color: C.red }, line: { type: "none" } });
  s.addText("F", { x: 8.8, y: 0.15, w: 0.75, h: 0.52, fontFace: "Georgia", fontSize: 22, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });

  s.addText("Lowest Score — \"Full Service Law Firm\" Is Not a Position", {
    x: 0.5, y: 1.0, w: 9, h: 0.62,
    fontFace: "Georgia", fontSize: 24, bold: true, color: C.textDark, margin: 0,
  });

  // The trap
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.75, w: 9, h: 0.62, fill: { color: "FEF2F2" }, line: { color: "FECACA", width: 1.5 } });
  s.addText('"A leading full service law firm in Uganda" is identical to the positioning of MMAKS Advocates, AF Mpanga Advocates, Katende Ssempebwa & Co — and every other established firm. When every competitor makes the same claim, the claim communicates nothing.', {
    x: 0.7, y: 1.82, w: 8.6, h: 0.48, fontFace: "Calibri", fontSize: 10.5, color: C.red, italic: true, margin: 0,
  });

  // Comparison table
  const headers = ["Factor", "CRAMANYA", "MMAKS", "AF Mpanga", "Intl Desks"];
  const rows = [
    ["Brand recognition",      "Medium",        "High",   "Med-High", "High"],
    ["Intl network",           "Strong (Prae)", "Moderate","Weak",     "Strong"],
    ["Named partner rep",      "Weak",          "Strong", "Very Strong","N/A"],
    ["Dev sector clients",     "Strong",        "Moderate","Weak",     "Moderate"],
    ["Local community",        "Strong",        "Moderate","Low",      "Low"],
    ["Positioning clarity",    "Low",           "Medium", "High",     "High"],
  ];

  const colWidths = [2.0, 1.9, 1.5, 1.5, 1.6];
  const tableRows = [
    headers.map((h, i) => ({ text: h, options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 9, alignment: i === 0 ? "left" : "center" } })),
    ...rows.map(row =>
      row.map((cell, ci) => {
        const isWeak = cell.toLowerCase().includes("weak") || cell === "Low" || cell === "Medium";
        const isStrong = cell.toLowerCase().includes("strong") || cell === "High" || cell === "Very Strong";
        const color = ci === 0 ? C.textDark : (isStrong ? C.green : (isWeak ? C.red : C.amber));
        return { text: cell, options: { fontSize: 9, color, bold: ci === 1, alignment: ci === 0 ? "left" : "center" } };
      })
    ),
  ];

  s.addTable(tableRows, {
    x: 0.5, y: 2.52, w: 9.0,
    fontFace: "Calibri",
    border: { type: "solid", pt: 0.5, color: C.borderLight },
    rowH: 0.42,
    colW: colWidths,
    fill: { color: C.white },
  });

  // Key recommendation
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 5.08, w: 9.0, h: 0.38, fill: { color: "FEF9EC" }, line: { color: C.gold, width: 1 } });
  s.addText("OPPORTUNITY: Replace 'full service law firm' with a Prae Legal-anchored position — 'Uganda's locally rooted firm for cross-border mandates.' No competitor owns this.", {
    x: 0.65, y: 5.13, w: 8.7, h: 0.28, fontFace: "Calibri", fontSize: 9.5, color: C.textDark, margin: 0,
  });
}

// ── SLIDE 8: Brand & Trust ────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy }, line: { type: "none" } });
  s.addText("BRAND & TRUST  ·  67/100", {
    x: 0.5, y: 0.08, w: 8.5, h: 0.65,
    fontFace: "Calibri", fontSize: 11, bold: true, color: C.gold, charSpacing: 2, valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 8.8, y: 0.15, w: 0.75, h: 0.52, fill: { color: C.blue }, line: { type: "none" } });
  s.addText("C", { x: 8.8, y: 0.15, w: 0.75, h: 0.52, fontFace: "Georgia", fontSize: 22, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });

  s.addText("Best-Performing Category — But Assets Are Underactivated", {
    x: 0.5, y: 1.0, w: 9, h: 0.62,
    fontFace: "Georgia", fontSize: 24, bold: true, color: C.textDark, margin: 0,
  });

  // Left: assets
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.75, w: 4.3, h: 3.55, fill: { color: C.white }, line: { color: C.borderLight, width: 1 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.75, w: 4.3, h: 0.07, fill: { color: C.green }, line: { type: "none" } });
  s.addText("STRONG ASSETS", { x: 0.7, y: 1.88, w: 3.9, h: 0.3, fontFace: "Calibri", fontSize: 9, bold: true, color: C.green, charSpacing: 1, margin: 0 });

  const assets = [
    ["28+ institutional client logos", "World Bank, OXFAM, Equity Bank, Habitat for Humanity — tier-1 credibility no Ugandan boutique can easily match"],
    ["5 international bar memberships", "Uganda Law Society + East Africa + ABA + Commonwealth + International Bar Association"],
    ["Prae Legal affiliation (252+ offices)", "Most defensible differentiator on the site — structurally rare in the Ugandan market"],
  ];
  assets.forEach(([title, desc], i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.65, y: 2.28 + i * 1.0, w: 4.0, h: 0.88, fill: { color: "F0F9F4" }, line: { color: "BBF7D0", width: 1 } });
    s.addText(title, { x: 0.8, y: 2.33 + i * 1.0, w: 3.7, h: 0.28, fontFace: "Calibri", fontSize: 11, bold: true, color: C.textDark, margin: 0 });
    s.addText(desc, { x: 0.8, y: 2.6 + i * 1.0, w: 3.7, h: 0.5, fontFace: "Calibri", fontSize: 9.5, color: C.textMuted, margin: 0 });
  });

  // Right: gaps
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.75, w: 4.4, h: 3.55, fill: { color: C.white }, line: { color: C.borderLight, width: 1 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.75, w: 4.4, h: 0.07, fill: { color: C.orange }, line: { type: "none" } });
  s.addText("GAPS TO CLOSE", { x: 5.4, y: 1.88, w: 3.9, h: 0.3, fontFace: "Calibri", fontSize: 9, bold: true, color: C.orange, charSpacing: 1, margin: 0 });

  const brandGaps = [
    ["Anonymous team page", "\"50+ years combined experience\" is unverifiable. Name the lawyers, list their credentials, surface their international training."],
    ["Unattributed testimonials", "First-name-only reviews don't match the sophistication of a World Bank-level client roster. Get attributed quotes with role + matter type."],
    ["Mixed positioning signals", "\"Leading\" + \"boutique\" + \"exquisite\" are pulling in 3 directions. Pick a lane and unify the narrative."],
  ];
  brandGaps.forEach(([title, desc], i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 5.35, y: 2.28 + i * 1.0, w: 4.1, h: 0.88, fill: { color: "FFF7ED" }, line: { color: "FED7AA", width: 1 } });
    s.addText(title, { x: 5.5, y: 2.33 + i * 1.0, w: 3.8, h: 0.28, fontFace: "Calibri", fontSize: 11, bold: true, color: C.textDark, margin: 0 });
    s.addText(desc, { x: 5.5, y: 2.6 + i * 1.0, w: 3.8, h: 0.5, fontFace: "Calibri", fontSize: 9.5, color: C.textMuted, margin: 0 });
  });
}

// ── SLIDE 9: Growth & Strategy ────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy }, line: { type: "none" } });
  s.addText("GROWTH & STRATEGY  ·  54/100", {
    x: 0.5, y: 0.08, w: 8.5, h: 0.65,
    fontFace: "Calibri", fontSize: 11, bold: true, color: C.gold, charSpacing: 2, valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 8.8, y: 0.15, w: 0.75, h: 0.52, fill: { color: C.amber }, line: { type: "none" } });
  s.addText("D", { x: 8.8, y: 0.15, w: 0.75, h: 0.52, fontFace: "Georgia", fontSize: 22, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });

  s.addText("Strong Pieces — No Connected Funnel", {
    x: 0.5, y: 1.0, w: 9, h: 0.62,
    fontFace: "Georgia", fontSize: 26, bold: true, color: C.textDark, margin: 0,
  });

  const modules = [
    { title: "CRAA Academy", status: "Underactivated", col: C.orange, desc: "Simultaneous lead gen, retention, and revenue tool — but no public catalog, no email capture, no pipeline to services." },
    { title: "Newsletter Signup", status: "Partially Active", col: C.amber, desc: "Well-framed (insights, jobs, rulings) but no visible nurture sequence converting subscribers to consultations." },
    { title: "Thought Leadership", status: "Split Domain", col: C.red, desc: "Blog is on WordPress.com — every article published there permanently donates authority to a third-party domain." },
    { title: "Prae Legal Network", status: "Underutilized", col: C.orange, desc: "252+ offices globally. No dedicated international client page, no cross-border case studies, no referral pathway content." },
    { title: "Online Payment", status: "Infrastructure Ready", col: C.blue, desc: "Payment infrastructure exists but isn't used as a funnel anchor — not referenced in content or practice area pages." },
    { title: "Consultation (UGX 200K)", status: "Good Entry Point", col: C.green, desc: "Priced well as a low-friction entry point, but no objection-handling copy, no \"what happens after\" process explanation." },
  ];

  modules.forEach((mod, i) => {
    const col = i % 2 === 0 ? 0 : 1;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 4.85;
    const y = 1.82 + row * 1.18;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.5, h: 1.05, fill: { color: C.white }, line: { color: C.borderLight, width: 1 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.07, h: 1.05, fill: { color: mod.col }, line: { type: "none" } });
    s.addText(mod.title, { x: x + 0.2, y: y + 0.08, w: 2.5, h: 0.28, fontFace: "Calibri", fontSize: 11, bold: true, color: C.textDark, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: x + 2.85, y: y + 0.08, w: 1.5, h: 0.28, fill: { color: mod.col }, line: { type: "none" } });
    s.addText(mod.status, { x: x + 2.85, y: y + 0.08, w: 1.5, h: 0.28, fontFace: "Calibri", fontSize: 8, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
    s.addText(mod.desc, { x: x + 0.2, y: y + 0.4, w: 4.15, h: 0.55, fontFace: "Calibri", fontSize: 9.5, color: C.textMuted, margin: 0 });
  });
}

// ── SLIDE 10: Quick Wins ──────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.green }, line: { type: "none" } });
  s.addText("QUICK WINS — IMPLEMENT THIS WEEK", {
    x: 0.5, y: 0.08, w: 9, h: 0.65,
    fontFace: "Calibri", fontSize: 11, bold: true, color: C.white, charSpacing: 3, valign: "middle", margin: 0,
  });

  s.addText("7 Changes. Most Take Less Than a Day.", {
    x: 0.5, y: 1.0, w: 9, h: 0.62,
    fontFace: "Georgia", fontSize: 28, bold: true, color: C.textDark, margin: 0,
  });

  const wins = [
    { n: "1", title: "Add Name + Email + Phone to consultation form", impact: "HIGH", desc: "Eliminate total lead loss on no-shows. Frame it: \"So we can brief the right partner.\"" },
    { n: "2", title: "Rewrite hero headline — retire \"exquisite\"", impact: "HIGH", desc: "Lead with Prae Legal network + client outcomes, not adjectives." },
    { n: "3", title: "Fix the broken differentiator claim", impact: "HIGH", desc: "Replace \"is legal, approachable\" with a proof-backed outcome statement." },
    { n: "4", title: "Write meta descriptions for all 10 practice areas", impact: "HIGH", desc: "Use Yoast (installed). 1–2 hours. Immediate click-through improvement." },
    { n: "5", title: "Rewrite title tags with keywords + geography", impact: "HIGH", desc: "Homepage: 'CRAMANYA Advocates | Law Firm Kampala Uganda'" },
    { n: "6", title: "Move enterprise logos near the CTA", impact: "MED", desc: "World Bank + OXFAM logos belong above the Book Appointment button, not in a general carousel." },
    { n: "7", title: "Remove staff growth from client-facing purpose statement", impact: "MED", desc: "\"Cultivates growth for our staff\" is an HR message, not a client promise." },
  ];

  wins.forEach((w, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i < 4 ? i : i - 4;
    const x = 0.5 + col * 4.85;
    const y = 1.78 + row * 0.88;
    const impactColor = w.impact === "HIGH" ? C.red : C.amber;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.5, h: 0.78, fill: { color: C.white }, line: { color: C.borderLight, width: 1 }, shadow: makeShadow() });
    s.addShape(pres.shapes.OVAL, { x: x + 0.12, y: y + 0.18, w: 0.32, h: 0.32, fill: { color: C.green }, line: { type: "none" } });
    s.addText(w.n, { x: x + 0.12, y: y + 0.18, w: 0.32, h: 0.32, fontFace: "Calibri", fontSize: 10, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: x + 3.6, y: y + 0.18, w: 0.75, h: 0.25, fill: { color: impactColor }, line: { type: "none" } });
    s.addText(w.impact, { x: x + 3.6, y: y + 0.18, w: 0.75, h: 0.25, fontFace: "Calibri", fontSize: 8, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
    s.addText(w.title, { x: x + 0.55, y: y + 0.06, w: 3.0, h: 0.3, fontFace: "Calibri", fontSize: 10, bold: true, color: C.textDark, margin: 0 });
    s.addText(w.desc, { x: x + 0.55, y: y + 0.38, w: 3.8, h: 0.32, fontFace: "Calibri", fontSize: 9, color: C.textMuted, margin: 0 });
  });
}

// ── SLIDE 11: Strategic Recommendations ──────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy }, line: { type: "none" } });
  s.addText("STRATEGIC RECOMMENDATIONS — THIS MONTH", {
    x: 0.5, y: 0.08, w: 9, h: 0.65,
    fontFace: "Calibri", fontSize: 11, bold: true, color: C.gold, charSpacing: 3, valign: "middle", margin: 0,
  });

  s.addText("5 Moves That Unlock the Existing Assets", {
    x: 0.5, y: 1.0, w: 9, h: 0.62,
    fontFace: "Georgia", fontSize: 28, bold: true, color: C.textDark, margin: 0,
  });

  const recs = [
    { n: "1", title: "Build a Prae Legal / International Clients page", timeline: "2–3 weeks", desc: "Explain what 252+ offices delivers for clients. Target: 'law firm Uganda foreign investment'. No competitor owns this real estate." },
    { n: "2", title: "Add contextual CTAs to every practice area page", timeline: "1 week", desc: "Dead-end pages kill conversions at highest-intent moments. Add a 2-sentence risk statement + 'Book a [Practice Area] Consultation' CTA at the bottom of each." },
    { n: "3", title: "Create 3 lead magnet PDFs for top practice areas", timeline: "3 weeks", desc: "\"5 Legal Steps Before Registering a Company in Uganda\" etc. Gate behind name + email. Converts Publications from passive brand asset to lead capture engine." },
    { n: "4", title: "Rebuild team page with individual practitioner profiles", timeline: "2 weeks", desc: "Named lawyers with credentials, bar admissions, and matter types. One internationally-trained partner, properly surfaced, materially changes conversion for high-value mandates." },
    { n: "5", title: "Upgrade testimonials with case-specific attribution", timeline: "3 weeks", desc: "Approach 3–5 institutional clients for: job title + org type + matter reference. Place adjacent to relevant practice area pages, not just a general testimonials section." },
  ];

  recs.forEach((rec, i) => {
    const y = 1.78 + i * 0.72;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 0.62, fill: { color: C.white }, line: { color: C.borderLight, width: 1 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.45, h: 0.62, fill: { color: C.gold }, line: { type: "none" } });
    s.addText(rec.n, { x: 0.5, y, w: 0.45, h: 0.62, fontFace: "Georgia", fontSize: 16, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
    s.addText(rec.title, { x: 1.1, y: y + 0.04, w: 5.8, h: 0.28, fontFace: "Calibri", fontSize: 12, bold: true, color: C.textDark, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 7.05, y: y + 0.06, w: 1.9, h: 0.28, fill: { color: "EFF6FF" }, line: { color: "BFDBFE", width: 1 } });
    s.addText(rec.timeline, { x: 7.05, y: y + 0.06, w: 1.9, h: 0.28, fontFace: "Calibri", fontSize: 9, color: C.blue, align: "center", valign: "middle", margin: 0 });
    s.addText(rec.desc, { x: 1.1, y: y + 0.34, w: 8.25, h: 0.25, fontFace: "Calibri", fontSize: 9.5, color: C.textMuted, margin: 0 });
  });
}

// ── SLIDE 12: Revenue Impact ──────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy }, line: { type: "none" } });
  s.addText("REVENUE IMPACT SUMMARY", {
    x: 0.5, y: 0.08, w: 9, h: 0.65,
    fontFace: "Calibri", fontSize: 11, bold: true, color: C.gold, charSpacing: 3, valign: "middle", margin: 0,
  });

  s.addText("Estimated $3,000–$8,000/Month in Incremental Mandate Value", {
    x: 0.5, y: 1.0, w: 9, h: 0.62,
    fontFace: "Georgia", fontSize: 22, bold: true, color: C.textDark, margin: 0,
  });

  const tableRows = [
    [
      { text: "Recommendation", options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 9 } },
      { text: "Est. Monthly Impact", options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 9, alignment: "center" } },
      { text: "Confidence", options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 9, alignment: "center" } },
      { text: "Timeline", options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 9, alignment: "center" } },
    ],
    ["Fix consultation form (add contact fields)", "Recover 30–50% of no-show leads", "High", "1 day"],
    ["Rewrite hero + differentiator copy", "+15–25% homepage conversion", "High", "3 days"],
    ["Meta descriptions + title tags", "+20–30% organic click-through", "High", "1 week"],
    ["Contextual CTAs on practice pages", "+30–50% practice page bookings", "High", "2 weeks"],
    ["Enterprise logos near CTA", "+10–20% consultation page conversion", "Medium", "3 days"],
    ["Lead magnet PDFs (3 areas)", "30–80 new email leads/month", "Medium", "3 weeks"],
    ["WordPress blog migration", "+40–60% organic traffic (6 months)", "High", "4–6 weeks"],
    ["LegalService schema + GBP", "Local pack visibility in Kampala", "High", "2 weeks"],
    ["International investor page", "+2–5 international inquiries/month", "Medium", "3 weeks"],
    ["CRAA Academy as lead funnel", "10–30 qualified leads/month", "Medium", "6 weeks"],
  ];

  const formattedRows = tableRows.map((row, ri) =>
    ri === 0 ? row : row.map((cell, ci) => ({
      text: cell,
      options: {
        fontSize: 9,
        color: ci === 1 ? C.green : (ci === 2 ? (cell === "High" ? C.green : C.amber) : C.textDark),
        bold: ci === 2 && cell === "High",
        alignment: ci === 0 ? "left" : "center",
      },
    }))
  );

  s.addTable(formattedRows, {
    x: 0.5, y: 1.78, w: 9.0,
    fontFace: "Calibri",
    border: { type: "solid", pt: 0.5, color: C.borderLight },
    rowH: 0.38,
    colW: [3.2, 2.5, 1.2, 1.2],
    fill: { color: C.white },
  });

  // Coloring alternating rows via background would require per-row styling - skipping, table styling handles it
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 5.2, w: 9.0, h: 0.3, fill: { color: C.navy }, line: { type: "none" } });
  s.addText("Total Potential:  $3,000–$8,000/month in incremental mandate value  |  Based on professional services benchmarks for the Ugandan market", {
    x: 0.65, y: 5.2, w: 8.7, h: 0.3, fontFace: "Calibri", fontSize: 9, bold: true, color: C.gold, valign: "middle", margin: 0,
  });
}

// ── SLIDE 13: Priority Roadmap ────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy }, line: { type: "none" } });
  s.addText("PRIORITY ROADMAP", {
    x: 0.5, y: 0.08, w: 9, h: 0.65,
    fontFace: "Calibri", fontSize: 11, bold: true, color: C.gold, charSpacing: 3, valign: "middle", margin: 0,
  });

  s.addText("3-Phase Implementation Plan", {
    x: 0.5, y: 1.0, w: 9, h: 0.62,
    fontFace: "Georgia", fontSize: 28, bold: true, color: C.textDark, margin: 0,
  });

  const phases = [
    {
      phase: "Phase 1", label: "This Week", color: C.green,
      items: ["Fix consultation form fields", "Rewrite hero + differentiator copy", "Write all meta descriptions", "Rewrite title tags (keyword + geo)", "Move enterprise logos near CTA"],
    },
    {
      phase: "Phase 2", label: "This Month", color: C.gold,
      items: ["Contextual CTAs on practice pages", "Prae Legal / Intl clients page", "3 lead magnet PDFs", "Rebuild team page (named profiles)", "Upgrade testimonials with attribution"],
    },
    {
      phase: "Phase 3", label: "This Quarter", color: C.blue,
      items: ["Migrate WordPress blog to main domain", "LegalService schema + Google Business Profile", "Activate CRAA Academy as lead funnel", "Niche content in Banking, Employment, Real Estate"],
    },
  ];

  phases.forEach((phase, i) => {
    const x = 0.5 + i * 3.15;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.82, w: 2.9, h: 3.55, fill: { color: C.white }, line: { color: C.borderLight, width: 1 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.82, w: 2.9, h: 0.6, fill: { color: phase.color }, line: { type: "none" } });
    s.addText(phase.phase, { x: x + 0.12, y: 1.85, w: 1.0, h: 0.52, fontFace: "Calibri", fontSize: 9, bold: true, color: "E8E0D0", charSpacing: 1, valign: "middle", margin: 0 });
    s.addText(phase.label, { x: x + 1.05, y: 1.85, w: 1.7, h: 0.52, fontFace: "Calibri", fontSize: 14, bold: true, color: C.white, valign: "middle", align: "right", margin: 0 });
    phase.items.forEach((item, j) => {
      s.addShape(pres.shapes.OVAL, { x: x + 0.18, y: 2.6 + j * 0.66, w: 0.2, h: 0.2, fill: { color: phase.color }, line: { type: "none" } });
      s.addText(item, { x: x + 0.48, y: 2.57 + j * 0.66, w: 2.28, h: 0.35, fontFace: "Calibri", fontSize: 10.5, color: C.textDark, margin: 0 });
    });
  });
}

// ── SLIDE 14: Closing ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.4, h: 5.625, fill: { color: C.gold }, line: { type: "none" } });

  s.addText("THE BOTTOM LINE", {
    x: 0.7, y: 1.2, w: 8.5, h: 0.35,
    fontFace: "Calibri", fontSize: 11, bold: true, color: C.gold, charSpacing: 3, margin: 0,
  });
  s.addText("Earned Credibility.\nNot Yet Marketed.", {
    x: 0.7, y: 1.65, w: 8.5, h: 1.5,
    fontFace: "Georgia", fontSize: 42, bold: true, color: C.white, margin: 0,
  });
  s.addText("The World Bank trusts CRAMANYA. The Prae Legal network connects it to 252 offices. The CRAA Academy builds the next generation of legal talent in Uganda. None of this is working as hard as it should be — because the copy describes the firm rather than the outcomes it delivers, and the infrastructure leaks leads at every stage. Fix the copy. Fix the form. Consolidate the blog. The assets are already there.", {
    x: 0.7, y: 3.3, w: 8.2, h: 1.65,
    fontFace: "Calibri", fontSize: 13, color: "A8B8CC", margin: 0,
  });
}

pres.writeFile({ fileName: "cramanya-marketing-audit.pptx" });
console.log("Done: cramanya-marketing-audit.pptx");

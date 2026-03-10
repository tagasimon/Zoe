const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Homepage CRO Analysis - The Cooking School Uganda";

// Palette
const C = {
  espresso:      "2C1810",
  terracotta:    "B85042",
  cream:         "FDF6EC",
  sand:          "E8D5C0",
  sage:          "4A7C59",
  textDark:      "2C1810",
  textLight:     "FFFFFF",
  textMuted:     "7A6155",
  cardBg:        "FFFFFF",
  borderLight:   "E8D5C0",
};

const makeShadow = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.10 });

// ─── SLIDE 1: Title ───────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.espresso };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.35, h: 5.625, fill: { color: C.terracotta }, line: { type: "none" } });

  s.addText("CONVERSION RATE OPTIMIZATION", {
    x: 0.65, y: 1.4, w: 8.5, h: 0.35,
    fontFace: "Calibri", fontSize: 11, bold: true, color: C.terracotta, charSpacing: 3, margin: 0,
  });
  s.addText("Homepage CRO Analysis", {
    x: 0.65, y: 1.85, w: 8.5, h: 1.05,
    fontFace: "Georgia", fontSize: 44, bold: true, color: C.textLight, margin: 0,
  });
  s.addText("The Cooking School Uganda", {
    x: 0.65, y: 3.0, w: 8.5, h: 0.55,
    fontFace: "Georgia", fontSize: 22, color: C.sand, margin: 0,
  });
  s.addText("Turning visitors into leads — what's working, what's not, and what to fix first.", {
    x: 0.65, y: 3.65, w: 7.5, h: 0.5,
    fontFace: "Calibri", fontSize: 14, color: C.textMuted, margin: 0,
  });
  s.addText("March 2026", {
    x: 0.65, y: 5.1, w: 9, h: 0.3,
    fontFace: "Calibri", fontSize: 11, color: C.textMuted, margin: 0,
  });
}

// ─── SLIDE 2: Audit Overview ──────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.terracotta }, line: { type: "none" } });
  s.addText("WHAT WE ANALYZED", {
    x: 0.5, y: 0.08, w: 9, h: 0.7,
    fontFace: "Calibri", fontSize: 11, bold: true, color: C.textLight, charSpacing: 3, valign: "middle", margin: 0,
  });
  s.addText("Audit Overview", {
    x: 0.5, y: 1.05, w: 9, h: 0.65,
    fontFace: "Georgia", fontSize: 32, bold: true, color: C.textDark, margin: 0,
  });

  const cards = [
    { label: "PAGE TYPE",        value: "Homepage",       sub: "Cold + warm traffic" },
    { label: "CONVERSION GOAL",  value: "Lead Capture",   sub: "WhatsApp & form fills" },
    { label: "PRIMARY CTA",      value: '"REGISTER"',     sub: "Links to WhatsApp" },
  ];
  cards.forEach((card, i) => {
    const x = 0.5 + i * 3.15;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.95, w: 2.9, h: 2.65, fill: { color: C.cardBg }, line: { color: C.borderLight, width: 1 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.95, w: 2.9, h: 0.07, fill: { color: i === 2 ? C.sage : C.terracotta }, line: { type: "none" } });
    s.addText(card.label, { x: x + 0.2, y: 2.1, w: 2.5, h: 0.35, fontFace: "Calibri", fontSize: 9, bold: true, color: C.textMuted, charSpacing: 2, margin: 0 });
    s.addText(card.value, { x: x + 0.2, y: 2.5, w: 2.5, h: 0.8, fontFace: "Georgia", fontSize: 22, bold: true, color: C.textDark, margin: 0 });
    s.addText(card.sub,   { x: x + 0.2, y: 3.35, w: 2.5, h: 0.7, fontFace: "Calibri", fontSize: 12, color: C.textMuted, margin: 0 });
  });
}

// ─── SLIDE 3: Key Findings ────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.espresso }, line: { type: "none" } });
  s.addText("KEY FINDINGS", {
    x: 0.5, y: 0.08, w: 9, h: 0.7,
    fontFace: "Calibri", fontSize: 11, bold: true, color: C.textLight, charSpacing: 3, valign: "middle", margin: 0,
  });
  s.addText("4 Critical Issues Found", {
    x: 0.5, y: 1.05, w: 9, h: 0.65,
    fontFace: "Georgia", fontSize: 32, bold: true, color: C.textDark, margin: 0,
  });

  const issues = [
    { num: "01", title: "Vague Value Proposition", rating: "CRITICAL", rColor: "C0392B", desc: "\"See it, Like it, Get it\" tells visitors nothing about what the school is or offers." },
    { num: "02", title: "Weak CTA Copy",            rating: "HIGH",     rColor: "D35400", desc: "\"REGISTER\" is premature — visitors need to be persuaded before being asked to act." },
    { num: "03", title: "No Email Lead Capture",    rating: "HIGH",     rColor: "D35400", desc: "WhatsApp-only means losing every visitor who isn't ready to message right now." },
    { num: "04", title: "Thin Trust Signals",       rating: "MEDIUM",   rColor: "B7950B", desc: "First-name testimonials, no graduate count, no accreditation badges visible." },
  ];

  issues.forEach((issue, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 4.85;
    const y = 1.85 + row * 1.75;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.5, h: 1.55, fill: { color: C.cardBg }, line: { color: C.borderLight, width: 1 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.5, h: 1.55, fill: { color: C.terracotta }, line: { type: "none" } });
    s.addText(issue.num, { x, y: y + 0.52, w: 0.5, h: 0.5, fontFace: "Georgia", fontSize: 14, bold: true, color: C.textLight, align: "center", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.62, y: y + 0.1, w: 0.85, h: 0.28, fill: { color: issue.rColor }, line: { type: "none" } });
    s.addText(issue.rating, { x: x + 0.62, y: y + 0.1, w: 0.85, h: 0.28, fontFace: "Calibri", fontSize: 8, bold: true, color: C.textLight, align: "center", valign: "middle", margin: 0 });
    s.addText(issue.title, { x: x + 0.62, y: y + 0.44, w: 3.7, h: 0.35, fontFace: "Calibri", fontSize: 13, bold: true, color: C.textDark, margin: 0 });
    s.addText(issue.desc,  { x: x + 0.62, y: y + 0.82, w: 3.7, h: 0.65, fontFace: "Calibri", fontSize: 11, color: C.textMuted, margin: 0 });
  });
}

// ─── SLIDE 4: Issue 1 – Value Proposition ────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.terracotta }, line: { type: "none" } });
  s.addText("ISSUE #1 — VALUE PROPOSITION", { x: 0.5, y: 0.08, w: 9, h: 0.7, fontFace: "Calibri", fontSize: 11, bold: true, color: C.textLight, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("The Value Proposition Is Not Working", { x: 0.5, y: 1.05, w: 9, h: 0.65, fontFace: "Georgia", fontSize: 28, bold: true, color: C.textDark, margin: 0 });

  // Left: current
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.85, w: 4.1, h: 3.35, fill: { color: "FEF2F2" }, line: { color: "FECACA", width: 1.5 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.85, w: 4.1, h: 0.07, fill: { color: "EF4444" }, line: { type: "none" } });
  s.addText("CURRENT TAGLINE", { x: 0.7, y: 2.02, w: 3.7, h: 0.3, fontFace: "Calibri", fontSize: 9, bold: true, color: "EF4444", charSpacing: 2, margin: 0 });
  s.addText('"See it, Like it, Get it"', { x: 0.7, y: 2.38, w: 3.7, h: 0.75, fontFace: "Georgia", fontSize: 20, bold: true, color: C.textDark, margin: 0 });
  s.addText([
    { text: "Why it fails:", options: { bold: true, breakLine: true } },
    { text: "• Tells visitors nothing specific", options: { breakLine: true } },
    { text: "• No mention of what's offered", options: { breakLine: true } },
    { text: "• No differentiation from competitors", options: { breakLine: true } },
    { text: "• Could apply to any product", options: {} },
  ], { x: 0.7, y: 3.2, w: 3.7, h: 1.85, fontFace: "Calibri", fontSize: 12, color: C.textDark, margin: 0 });

  // Right: alternatives
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.85, w: 4.4, h: 3.35, fill: { color: "F0FDF4" }, line: { color: "BBF7D0", width: 1.5 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.85, w: 4.4, h: 0.07, fill: { color: C.sage }, line: { type: "none" } });
  s.addText("RECOMMENDED ALTERNATIVES", { x: 5.3, y: 2.02, w: 4.0, h: 0.3, fontFace: "Calibri", fontSize: 9, bold: true, color: C.sage, charSpacing: 2, margin: 0 });

  const alts = [
    '"Uganda\'s Leading Culinary School — Train as a Chef in 3–12 Months"',
    '"Professional Chef Training in Kampala — Hands-On, Accredited Programs"',
    '"Turn Your Passion for Food into a Career — Diploma & Certificate Programs"',
  ];
  alts.forEach((alt, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 2.42 + i * 0.87, w: 4.0, h: 0.75, fill: { color: "DCFCE7" }, line: { color: "BBF7D0", width: 1 } });
    s.addText(`${i + 1}. ${alt}`, { x: 5.45, y: 2.47 + i * 0.87, w: 3.7, h: 0.65, fontFace: "Calibri", fontSize: 11, color: C.textDark, margin: 0 });
  });
}

// ─── SLIDE 5: Issue 2 – CTA ───────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.terracotta }, line: { type: "none" } });
  s.addText("ISSUE #2 — CTA COPY", { x: 0.5, y: 0.08, w: 9, h: 0.7, fontFace: "Calibri", fontSize: 11, bold: true, color: C.textLight, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("The CTA Asks Too Much, Too Soon", { x: 0.5, y: 1.05, w: 9, h: 0.65, fontFace: "Georgia", fontSize: 28, bold: true, color: C.textDark, margin: 0 });

  // Left: problem
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.85, w: 4.1, h: 3.35, fill: { color: C.cardBg }, line: { color: C.borderLight, width: 1 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.85, w: 0.07, h: 3.35, fill: { color: "EF4444" }, line: { type: "none" } });
  s.addText("THE PROBLEM", { x: 0.7, y: 2.02, w: 3.7, h: 0.3, fontFace: "Calibri", fontSize: 9, bold: true, color: "EF4444", charSpacing: 2, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 1.5, y: 2.48, w: 1.8, h: 0.45, fill: { color: "6B7280" }, line: { type: "none" } });
  s.addText("REGISTER", { x: 1.5, y: 2.48, w: 1.8, h: 0.45, fontFace: "Calibri", fontSize: 13, bold: true, color: C.textLight, align: "center", valign: "middle", margin: 0 });
  s.addText([
    { text: "Why it underperforms:", options: { bold: true, breakLine: true } },
    { text: "• Implies commitment before visitor is ready", options: { breakLine: true } },
    { text: "• Unexpectedly opens WhatsApp — confusing", options: { breakLine: true } },
    { text: "• Doesn't tell visitors what happens next", options: { breakLine: true } },
    { text: "• No secondary CTA for undecided visitors", options: {} },
  ], { x: 0.7, y: 3.1, w: 3.7, h: 2.0, fontFace: "Calibri", fontSize: 12, color: C.textDark, margin: 0 });

  // Right: fixes
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.85, w: 4.4, h: 3.35, fill: { color: C.cardBg }, line: { color: C.borderLight, width: 1 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.85, w: 0.07, h: 3.35, fill: { color: C.sage }, line: { type: "none" } });
  s.addText("FIXES", { x: 5.3, y: 2.02, w: 4.0, h: 0.3, fontFace: "Calibri", fontSize: 9, bold: true, color: C.sage, charSpacing: 2, margin: 0 });

  const ctaFixes = [
    { label: "Lower-commitment primary CTA:",    opts: ["Apply for the Next Intake", "Find My Program"] },
    { label: "Be transparent about WhatsApp:",   opts: ["Chat With Us on WhatsApp"] },
    { label: "Add a secondary CTA:",             opts: ["Download Program Guide (email capture)"] },
  ];
  let yOff = 2.42;
  ctaFixes.forEach((fix) => {
    s.addText(fix.label, { x: 5.3, y: yOff, w: 4.0, h: 0.28, fontFace: "Calibri", fontSize: 10, bold: true, color: C.textMuted, margin: 0 });
    yOff += 0.3;
    fix.opts.forEach((opt) => {
      s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: yOff, w: 3.8, h: 0.35, fill: { color: "E9F5EE" }, line: { color: "BBF7D0", width: 1 } });
      s.addText(opt, { x: 5.45, y: yOff, w: 3.5, h: 0.35, fontFace: "Calibri", fontSize: 11, bold: true, color: C.sage, valign: "middle", margin: 0 });
      yOff += 0.4;
    });
    yOff += 0.18;
  });
}

// ─── SLIDE 6: Issue 3 – Lead Capture ─────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.terracotta }, line: { type: "none" } });
  s.addText("ISSUE #3 — LEAD CAPTURE", { x: 0.5, y: 0.08, w: 9, h: 0.7, fontFace: "Calibri", fontSize: 11, bold: true, color: C.textLight, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("No Email Capture — Visitors Are Slipping Away", { x: 0.5, y: 1.05, w: 9, h: 0.65, fontFace: "Georgia", fontSize: 26, bold: true, color: C.textDark, margin: 0 });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.85, w: 9.0, h: 0.75, fill: { color: "FEF3C7" }, line: { color: "FCD34D", width: 1 } });
  s.addText("Right now, there is only ONE conversion path: click a button, open WhatsApp, and message the school. Every visitor who isn't ready for that step leaves forever — with no way to re-engage them.", {
    x: 0.7, y: 1.93, w: 8.6, h: 0.6, fontFace: "Calibri", fontSize: 12, color: "78350F", margin: 0,
  });

  // Left card
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.75, w: 4.1, h: 2.55, fill: { color: C.cardBg }, line: { color: C.borderLight, width: 1 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.75, w: 4.1, h: 0.07, fill: { color: "EF4444" }, line: { type: "none" } });
  s.addText("CURRENT STATE", { x: 0.7, y: 2.9, w: 3.7, h: 0.3, fontFace: "Calibri", fontSize: 9, bold: true, color: "EF4444", charSpacing: 2, margin: 0 });
  s.addText([
    { text: "WhatsApp CTA only", options: { bullet: true, breakLine: true } },
    { text: "No email capture form anywhere on page", options: { bullet: true, breakLine: true } },
    { text: "No downloadable resource", options: { bullet: true, breakLine: true } },
    { text: "Can't retarget or nurture cold leads", options: { bullet: true } },
  ], { x: 0.7, y: 3.28, w: 3.7, h: 1.8, fontFace: "Calibri", fontSize: 12, color: C.textDark, margin: 0 });

  // Right card
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 2.75, w: 4.4, h: 2.55, fill: { color: C.cardBg }, line: { color: C.borderLight, width: 1 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 2.75, w: 4.4, h: 0.07, fill: { color: C.sage }, line: { type: "none" } });
  s.addText("RECOMMENDED FIX", { x: 5.3, y: 2.9, w: 4.0, h: 0.3, fontFace: "Calibri", fontSize: 9, bold: true, color: C.sage, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Add a secondary lead magnet CTA:\n", options: { bold: true } },
    { text: '"Get our Program Guide & Fee Sheet" ', options: { italic: true } },
    { text: "— Name + Email only.\n\n", options: {} },
    { text: "Benefits:", options: { bold: true, breakLine: true } },
    { text: "• Captures undecided visitors", options: { breakLine: true } },
    { text: "• Enables email nurture sequence", options: { breakLine: true } },
    { text: "• Builds a re-engageable list", options: {} },
  ], { x: 5.3, y: 3.12, w: 4.0, h: 2.0, fontFace: "Calibri", fontSize: 12, color: C.textDark, margin: 0 });
}

// ─── SLIDE 7: Issue 4 – Trust Signals ────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.terracotta }, line: { type: "none" } });
  s.addText("ISSUE #4 — TRUST SIGNALS", { x: 0.5, y: 0.08, w: 9, h: 0.7, fontFace: "Calibri", fontSize: 11, bold: true, color: C.textLight, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("Trust Signals Are Too Thin", { x: 0.5, y: 1.05, w: 9, h: 0.65, fontFace: "Georgia", fontSize: 32, bold: true, color: C.textDark, margin: 0 });

  s.addText("What exists today", { x: 0.5, y: 1.82, w: 4.2, h: 0.38, fontFace: "Calibri", fontSize: 14, bold: true, color: C.textMuted, margin: 0 });
  s.addText("What to add", { x: 5.2, y: 1.82, w: 4.5, h: 0.38, fontFace: "Calibri", fontSize: 14, bold: true, color: C.sage, margin: 0 });

  const current = [
    { item: "4 testimonials", note: "First names only, no photos, no outcomes" },
    { item: "Countdown timer", note: "Good — creates urgency, keep it" },
    { item: "Social media links", note: "Useful but no video featured on page" },
    { item: "Vision/Mission section", note: "Doesn't build trust — belongs on About page" },
  ];
  current.forEach((t, i) => {
    const isGood = t.note.includes("Good");
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.27 + i * 0.77, w: 4.2, h: 0.65, fill: { color: isGood ? "F0FDF4" : "FFF7ED" }, line: { color: isGood ? "BBF7D0" : "FED7AA", width: 1 } });
    s.addText(t.item, { x: 0.7, y: 2.31 + i * 0.77, w: 4.0, h: 0.28, fontFace: "Calibri", fontSize: 12, bold: true, color: C.textDark, margin: 0 });
    s.addText(t.note, { x: 0.7, y: 2.58 + i * 0.77, w: 4.0, h: 0.27, fontFace: "Calibri", fontSize: 10, color: C.textMuted, margin: 0 });
  });

  const add = [
    "Credibility bar: graduate count, accreditation, years operating",
    "Richer testimonials: full name, photo, job outcome + star rating",
    "FAQ section addressing cost, experience needed, payment plans",
    "Video embed: cooking demo or student story from YouTube",
  ];
  add.forEach((item, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 2.27 + i * 0.77, w: 4.4, h: 0.65, fill: { color: "F0FDF4" }, line: { color: "BBF7D0", width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 2.27 + i * 0.77, w: 0.07, h: 0.65, fill: { color: C.sage }, line: { type: "none" } });
    s.addText(item, { x: 5.4, y: 2.31 + i * 0.77, w: 4.05, h: 0.55, fontFace: "Calibri", fontSize: 11, color: C.textDark, valign: "middle", margin: 0 });
  });
}

// ─── SLIDE 8: Quick Wins ──────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.sage }, line: { type: "none" } });
  s.addText("RECOMMENDATIONS", { x: 0.5, y: 0.08, w: 9, h: 0.7, fontFace: "Calibri", fontSize: 11, bold: true, color: C.textLight, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("Quick Wins — Implement Now", { x: 0.5, y: 1.05, w: 9, h: 0.62, fontFace: "Georgia", fontSize: 30, bold: true, color: C.textDark, margin: 0 });
  s.addText("Easy changes with likely immediate impact on conversions.", { x: 0.5, y: 1.72, w: 9, h: 0.32, fontFace: "Calibri", fontSize: 12, color: C.textMuted, margin: 0 });

  const wins = [
    { n: "1", title: "Rewrite the hero headline", desc: "Replace \"See it, Like it, Get it\" with a specific, outcome-driven headline that names what you offer." },
    { n: "2", title: "Change CTA button copy", desc: "\"Apply for the Next Intake\" or \"Find My Program\" instead of \"REGISTER\"." },
    { n: "3", title: "Add WhatsApp context below CTA", desc: "\"Chat with our admissions team — we reply within 24 hours.\" Removes friction." },
    { n: "4", title: "Remove Vision/Mission block", desc: "Move to About page. Replace with an FAQ section or short social proof block." },
    { n: "5", title: "Add urgency to the countdown", desc: "\"Next intake closes in X days — limited spots available.\" Make the timer purposeful." },
  ];

  wins.forEach((w, i) => {
    const col = i < 3 ? 0 : 1;
    const row = i < 3 ? i : i - 3;
    const x = 0.5 + col * 4.85;
    const y = 2.15 + row * 1.06;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.5, h: 0.92, fill: { color: C.cardBg }, line: { color: C.borderLight, width: 1 }, shadow: makeShadow() });
    s.addShape(pres.shapes.OVAL, { x: x + 0.12, y: y + 0.24, w: 0.38, h: 0.38, fill: { color: C.sage }, line: { type: "none" } });
    s.addText(w.n, { x: x + 0.12, y: y + 0.24, w: 0.38, h: 0.38, fontFace: "Calibri", fontSize: 12, bold: true, color: C.textLight, align: "center", valign: "middle", margin: 0 });
    s.addText(w.title, { x: x + 0.65, y: y + 0.08, w: 3.7, h: 0.3, fontFace: "Calibri", fontSize: 12, bold: true, color: C.textDark, margin: 0 });
    s.addText(w.desc,  { x: x + 0.65, y: y + 0.42, w: 3.7, h: 0.44, fontFace: "Calibri", fontSize: 10, color: C.textMuted, margin: 0 });
  });
}

// ─── SLIDE 9: High-Impact Changes ────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.espresso }, line: { type: "none" } });
  s.addText("RECOMMENDATIONS", { x: 0.5, y: 0.08, w: 9, h: 0.7, fontFace: "Calibri", fontSize: 11, bold: true, color: C.textLight, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("High-Impact Changes — Prioritize These", { x: 0.5, y: 1.05, w: 9, h: 0.62, fontFace: "Georgia", fontSize: 28, bold: true, color: C.textDark, margin: 0 });
  s.addText("Bigger effort, but these will significantly move the needle on leads.", { x: 0.5, y: 1.7, w: 9, h: 0.32, fontFace: "Calibri", fontSize: 12, color: C.textMuted, margin: 0 });

  const items = [
    { title: "Add pricing signals",       desc: "\"Programs from UGX X\" or \"Payment plans available\" — addresses the #1 unspoken objection on the page." },
    { title: "Add email lead capture",    desc: "\"Download our Program Guide\" — name + email only. Captures visitors not ready to message on WhatsApp." },
    { title: "Build individual program pages", desc: "Each of the 5 programs needs its own page with duration, fees, outcomes, and a dedicated CTA." },
    { title: "Add credibility bar",       desc: "Graduate count, accreditation body, years in operation — positioned right under the hero section." },
    { title: "Expand navigation",         desc: "Add Programs, Admissions, and Gallery. Home / About / Contact isn't enough to guide diverse visitor intent." },
  ];

  items.forEach((item, i) => {
    const y = 2.18 + i * 0.66;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 0.58, fill: { color: C.cardBg }, line: { color: C.borderLight, width: 1 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.45, h: 0.58, fill: { color: C.terracotta }, line: { type: "none" } });
    s.addText(`${i + 1}`, { x: 0.5, y, w: 0.45, h: 0.58, fontFace: "Georgia", fontSize: 16, bold: true, color: C.textLight, align: "center", valign: "middle", margin: 0 });
    s.addText(item.title, { x: 1.08, y: y + 0.04, w: 2.8, h: 0.5, fontFace: "Calibri", fontSize: 13, bold: true, color: C.textDark, valign: "middle", margin: 0 });
    s.addShape(pres.shapes.LINE, { x: 3.98, y: y + 0.1, w: 0, h: 0.38, line: { color: C.borderLight, width: 1 } });
    s.addText(item.desc, { x: 4.1, y: y + 0.04, w: 5.2, h: 0.5, fontFace: "Calibri", fontSize: 11, color: C.textMuted, valign: "middle", margin: 0 });
  });
}

// ─── SLIDE 10: A/B Tests ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.terracotta }, line: { type: "none" } });
  s.addText("EXPERIMENTATION", { x: 0.5, y: 0.08, w: 9, h: 0.7, fontFace: "Calibri", fontSize: 11, bold: true, color: C.textLight, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("What to A/B Test", { x: 0.5, y: 1.05, w: 9, h: 0.62, fontFace: "Georgia", fontSize: 32, bold: true, color: C.textDark, margin: 0 });

  const rows = [
    [
      { text: "Element",           options: { bold: true, color: "FFFFFF", fill: { color: C.espresso } } },
      { text: "Control (current)", options: { bold: true, color: "FFFFFF", fill: { color: C.espresso } } },
      { text: "Variant to test",   options: { bold: true, color: "FFFFFF", fill: { color: C.espresso } } },
      { text: "Hypothesis",        options: { bold: true, color: "FFFFFF", fill: { color: C.espresso } } },
    ],
    ["Hero headline",   '"See it, Like it, Get it"', "Outcome-focused headline",         "Specific > clever for cold traffic"],
    ["CTA copy",        '"REGISTER"',                '"Apply for the Next Intake"',       "Lower commitment = more clicks"],
    ["Lead capture",    "WhatsApp CTA only",         "Add email guide download",          "Email form grows total leads captured"],
    ["Testimonials",    "First name only",           "Full name + photo + outcome",       "Specificity lifts credibility"],
    ["Navigation",      "Home / About / Contact",    "Add Programs + Admissions",         "Better nav reduces bounce rate"],
  ];

  s.addTable(rows, {
    x: 0.5, y: 1.82, w: 9.0,
    fontSize: 11, fontFace: "Calibri",
    border: { type: "solid", pt: 0.5, color: C.borderLight },
    fill: { color: "FFFFFF" },
    color: C.textDark,
    rowH: 0.58,
    colW: [1.6, 2.0, 2.2, 3.2],
  });
}

// ─── SLIDE 11: Priority Roadmap ───────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.espresso }, line: { type: "none" } });
  s.addText("NEXT STEPS", { x: 0.5, y: 0.08, w: 9, h: 0.7, fontFace: "Calibri", fontSize: 11, bold: true, color: C.textLight, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("Priority Roadmap", { x: 0.5, y: 1.05, w: 9, h: 0.62, fontFace: "Georgia", fontSize: 32, bold: true, color: C.textDark, margin: 0 });

  const phases = [
    { phase: "Phase 1", label: "Copy Fixes",       color: C.terracotta, items: ["Rewrite hero headline", "Update CTA button copy", "Add WhatsApp context line", "Remove Vision/Mission block"] },
    { phase: "Phase 2", label: "Lead Capture",     color: C.sage,       items: ["Add email capture form", "Create program guide PDF", "Add credibility bar", "Add FAQ section"] },
    { phase: "Phase 3", label: "Pages & Structure",color: "5B6EAE",     items: ["Build individual program pages", "Expand site navigation", "Improve testimonials", "Add video embed"] },
  ];

  phases.forEach((phase, i) => {
    const x = 0.5 + i * 3.15;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.82, w: 2.9, h: 3.5, fill: { color: C.cardBg }, line: { color: C.borderLight, width: 1 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.82, w: 2.9, h: 0.58, fill: { color: phase.color }, line: { type: "none" } });
    s.addText(phase.phase, { x: x + 0.12, y: 1.85, w: 1.0, h: 0.52, fontFace: "Calibri", fontSize: 9, bold: true, color: "EAD8C8", charSpacing: 1, valign: "middle", margin: 0 });
    s.addText(phase.label, { x: x + 1.05, y: 1.85, w: 1.7, h: 0.52, fontFace: "Calibri", fontSize: 14, bold: true, color: C.textLight, valign: "middle", align: "right", margin: 0 });

    phase.items.forEach((item, j) => {
      s.addShape(pres.shapes.OVAL, { x: x + 0.18, y: 2.57 + j * 0.7, w: 0.22, h: 0.22, fill: { color: phase.color }, line: { type: "none" } });
      s.addText(item, { x: x + 0.5, y: 2.54 + j * 0.7, w: 2.25, h: 0.35, fontFace: "Calibri", fontSize: 11, color: C.textDark, margin: 0 });
    });
  });
}

// ─── SLIDE 12: Closing ────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.espresso };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.35, h: 5.625, fill: { color: C.terracotta }, line: { type: "none" } });

  s.addText("THE BOTTOM LINE", { x: 0.65, y: 1.2, w: 8.5, h: 0.35, fontFace: "Calibri", fontSize: 11, bold: true, color: C.terracotta, charSpacing: 3, margin: 0 });
  s.addText("Fix Clarity First.\nThen Capture.", { x: 0.65, y: 1.65, w: 8.5, h: 1.5, fontFace: "Georgia", fontSize: 42, bold: true, color: C.textLight, margin: 0 });
  s.addText("The biggest leak is visitors arriving, not understanding what the school offers or costs, and leaving with no way to re-engage them. A clearer value proposition, a lower-friction CTA, and an email capture form are the three highest-ROI changes you can make.", {
    x: 0.65, y: 3.3, w: 8.0, h: 1.55, fontFace: "Calibri", fontSize: 14, color: C.sand, margin: 0,
  });
}

pres.writeFile({ fileName: "cooking-school-cro-analysis.pptx" });
console.log("Done: cooking-school-cro-analysis.pptx");

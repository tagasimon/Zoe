# Presentation Specialist Agent Memory

## Environment Notes

### Running PptxGenJS Scripts
pptxgenjs is installed globally but not on the default Node module path.
Always run scripts with NODE_PATH set:
```
NODE_PATH=$(npm root -g) node /absolute/path/to/script.js
```

### Converting PPTX to PDF for Visual QA
LibreOffice (soffice) is NOT installed on this machine.
Use markitdown for content QA instead:
```
python3 -m markitdown /absolute/path/to/file.pptx
```
markitdown is installed at: /Library/Frameworks/Python.framework (python3 -m markitdown)

## Brand Palette (Elastic Technologies Ltd)
- Navy `213555` — headers, title slides, dark backgrounds
- Slate `358479` — accents, highlights, icon backgrounds
- Beige `D8C4B6` — borders, callout boxes, muted accents
- Cream `F5EFE7` — content slide backgrounds
- Never use # prefix on hex colors in PptxGenJS (causes file corruption)

## PptxGenJS Pitfalls Confirmed
- Always use `makeShadow = () => ({...})` factory function — never reuse shadow objects (PptxGenJS mutates in place)
- Never use unicode bullets ("•") — use `bullet: true` option
- Use `breakLine: true` for multi-line rich text arrays
- Use `RECTANGLE` not `ROUNDED_RECTANGLE` when pairing with accent bars
- Never encode opacity in 8-char hex — use `opacity` property on shadow

## Slide Design Patterns That Work Well
- "Sandwich" structure: dark title + closing slides, cream content slides
- Left accent bar (0.35" wide, slate color) on dark title/closing slides
- Header bar (full-width, navy, 0.75" tall) on all content slides with section label
- Stat cards with colored top-edge accent stripe
- Progress bar rows for data quality / completion metrics
- Two-column layout: chart left (5.5–6"), insight panel right (3")
- Number badge (slate rectangle, 0.5" wide) for recommendation cards

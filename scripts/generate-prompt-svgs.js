#!/usr/bin/env node
const fs = require("fs")
const path = require("path")

const ROOT = process.cwd()
const PROMPTS_PATH = path.join(ROOT, "public/images/generated/PROMPTS.md")
const OUTPUT_DIR = path.join(ROOT, "public/images/generated")

const palette = {
  cream: ["#F7F2EA", "#EFE6D9", "#E6D8C3"],
  sage: ["#DCE6DD", "#C8D5C4", "#B1C1AD"],
  earth: ["#CDB79E", "#B89C7F", "#9F8266"],
  warm: ["#EED7BC", "#E3C8A8", "#D2AE88"],
  dusk: ["#6E665F", "#544C45", "#3F3832"],
}

function hashString(value) {
  let h = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function pickColor(group, seed, index) {
  const arr = palette[group]
  return arr[(seed + index) % arr.length]
}

function readEntries() {
  const content = fs.readFileSync(PROMPTS_PATH, "utf8")
  const regex =
    /`([^`]+\.svg)` \((\d+)x(\d+)\)\s*\nPrompt: `([^`]+)`/g
  const entries = []
  let match = regex.exec(content)
  while (match) {
    entries.push({
      file: match[1],
      width: Number(match[2]),
      height: Number(match[3]),
      prompt: match[4],
    })
    match = regex.exec(content)
  }
  return entries
}

function roundedRect(x, y, w, h, r, fill, opacity = 1) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" opacity="${opacity}"/>`
}

function circle(cx, cy, r, fill, opacity = 1) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${opacity}"/>`
}

function sceneFor(filename, w, h, seed) {
  const unit = Math.min(w, h)
  const centerX = w / 2
  const floorY = h * 0.72
  const neutral = pickColor("cream", seed, 0)
  const sage = pickColor("sage", seed, 1)
  const wood = pickColor("earth", seed, 0)
  const warm = pickColor("warm", seed, 1)
  const dusk = pickColor("dusk", seed, 0)

  if (filename === "hero-nursery.svg") {
    return [
      roundedRect(w * 0.15, h * 0.28, w * 0.38, h * 0.38, 20, "#F3EBDD", 0.42),
      roundedRect(w * 0.18, h * 0.46, w * 0.34, h * 0.16, 16, wood, 0.58),
      ...Array.from({ length: 8 }, (_, i) =>
        roundedRect(w * (0.2 + i * 0.04), h * 0.48, w * 0.015, h * 0.13, 6, "#D9C7B3", 0.8)
      ),
      roundedRect(0, floorY, w, h * 0.3, 0, "#E8DDCD", 0.52),
    ].join("\n")
  }

  if (filename === "about-nursery-shelf.svg" || filename === "social-nursery-corner.svg") {
    return [
      roundedRect(w * 0.18, h * 0.25, w * 0.64, h * 0.03, 8, wood, 0.8),
      roundedRect(w * 0.18, h * 0.48, w * 0.64, h * 0.03, 8, wood, 0.8),
      roundedRect(w * 0.22, h * 0.16, w * 0.08, h * 0.1, 16, neutral, 0.9),
      circle(w * 0.38, h * 0.2, unit * 0.03, warm, 0.75),
      roundedRect(w * 0.48, h * 0.18, w * 0.16, h * 0.07, 8, sage, 0.85),
      roundedRect(w * 0.23, h * 0.4, w * 0.18, h * 0.06, 8, "#EFE4D6", 0.85),
      roundedRect(w * 0.46, h * 0.37, w * 0.12, h * 0.1, 30, "#F4EADB", 0.9),
      roundedRect(w * 0.62, h * 0.39, w * 0.12, h * 0.08, 8, "#D2B79C", 0.78),
      roundedRect(0, floorY, w, h * 0.3, 0, "#E5D8C6", 0.45),
    ].join("\n")
  }

  if (filename === "newsletter-reading-nook.svg") {
    return [
      roundedRect(w * 0.18, h * 0.38, w * 0.26, h * 0.3, 40, "#D6C3AE", 0.8),
      roundedRect(w * 0.24, h * 0.32, w * 0.2, h * 0.12, 20, "#E8D9C9", 0.85),
      roundedRect(w * 0.5, h * 0.5, w * 0.12, h * 0.16, 16, wood, 0.7),
      roundedRect(w * 0.53, h * 0.44, w * 0.06, h * 0.06, 20, neutral, 0.9),
      roundedRect(w * 0.57, h * 0.47, w * 0.08, h * 0.02, 4, sage, 0.65),
      roundedRect(0, floorY, w, h * 0.3, 0, "#E6D7C3", 0.5),
    ].join("\n")
  }

  if (filename === "product-wipes.svg" || filename === "social-nest-approved.svg") {
    return [
      roundedRect(w * 0.23, h * 0.33, w * 0.54, h * 0.36, 30, "#F6EEE3", 0.95),
      roundedRect(w * 0.32, h * 0.42, w * 0.36, h * 0.12, 18, sage, 0.35),
      roundedRect(w * 0.38, h * 0.37, w * 0.24, h * 0.06, 16, "#FFFFFF", 0.85),
      circle(centerX, h * 0.56, unit * 0.06, "#FFFFFF", 0.85),
    ].join("\n")
  }

  if (filename === "product-bodysuits.svg" || filename === "social-baby-outfit.svg") {
    return [
      roundedRect(w * 0.22, h * 0.3, w * 0.56, h * 0.12, 16, "#F3E5D4", 0.86),
      roundedRect(w * 0.24, h * 0.43, w * 0.52, h * 0.12, 16, "#E7D5C0", 0.88),
      roundedRect(w * 0.26, h * 0.56, w * 0.48, h * 0.12, 16, "#DCC6AC", 0.9),
      roundedRect(w * 0.35, h * 0.26, w * 0.3, h * 0.03, 6, "#D2B79A", 0.65),
    ].join("\n")
  }

  if (filename === "product-food-maker.svg") {
    return [
      roundedRect(w * 0.28, h * 0.28, w * 0.26, h * 0.42, 42, "#F8F3EB", 0.94),
      circle(w * 0.41, h * 0.5, unit * 0.06, "#D9C6AF", 0.9),
      roundedRect(w * 0.29, h * 0.25, w * 0.24, h * 0.08, 20, "#E2CFB8", 0.9),
      circle(w * 0.63, h * 0.58, unit * 0.05, "#E3A96E", 0.8),
      circle(w * 0.7, h * 0.5, unit * 0.04, "#97B274", 0.78),
    ].join("\n")
  }

  if (filename === "product-noise-machine.svg") {
    return [
      roundedRect(w * 0.2, h * 0.22, w * 0.6, h * 0.04, 8, wood, 0.8),
      circle(centerX, h * 0.46, unit * 0.16, "#F3EFE9", 0.95),
      circle(centerX, h * 0.46, unit * 0.09, "#D7D1C8", 0.85),
      circle(centerX, h * 0.46, unit * 0.02, dusk, 0.6),
    ].join("\n")
  }

  if (filename === "product-carrier.svg") {
    return [
      roundedRect(w * 0.34, h * 0.2, w * 0.32, h * 0.46, 56, "#B28E71", 0.86),
      roundedRect(w * 0.29, h * 0.17, w * 0.12, h * 0.36, 28, "#9D7D61", 0.72),
      roundedRect(w * 0.59, h * 0.17, w * 0.12, h * 0.36, 28, "#9D7D61", 0.72),
      roundedRect(w * 0.38, h * 0.34, w * 0.24, h * 0.16, 20, "#C7A98D", 0.85),
    ].join("\n")
  }

  if (filename === "product-plates.svg") {
    return [
      circle(w * 0.34, h * 0.45, unit * 0.15, "#D9D0BB", 0.92),
      circle(w * 0.57, h * 0.5, unit * 0.17, "#B7C8B5", 0.88),
      roundedRect(w * 0.22, h * 0.63, w * 0.38, h * 0.06, 30, "#E3CCAA", 0.86),
      roundedRect(w * 0.58, h * 0.62, w * 0.2, h * 0.035, 20, "#DAB991", 0.86),
    ].join("\n")
  }

  if (filename === "blog-sensitive-skin.svg") {
    return [
      circle(w * 0.42, h * 0.52, unit * 0.2, "#EECBB0", 0.72),
      circle(w * 0.58, h * 0.5, unit * 0.2, "#DDB392", 0.7),
      roundedRect(w * 0.3, h * 0.52, w * 0.42, h * 0.1, 40, "#F2D8BF", 0.8),
    ].join("\n")
  }

  if (filename === "blog-wipes-comparison.svg" || filename === "social-wipes-compare.svg") {
    return [
      roundedRect(w * 0.18, h * 0.3, w * 0.28, h * 0.36, 18, "#F4EBDD", 0.92),
      roundedRect(w * 0.54, h * 0.3, w * 0.28, h * 0.36, 18, "#E8DDCD", 0.92),
      roundedRect(w * 0.24, h * 0.39, w * 0.16, h * 0.09, 12, sage, 0.35),
      roundedRect(w * 0.6, h * 0.39, w * 0.16, h * 0.09, 12, "#D6C1A8", 0.35),
    ].join("\n")
  }

  if (filename === "blog-blw-guide.svg") {
    return [
      roundedRect(w * 0.38, h * 0.3, w * 0.24, h * 0.34, 24, "#E4D2BC", 0.85),
      roundedRect(w * 0.33, h * 0.52, w * 0.34, h * 0.08, 18, "#F1E8DA", 0.92),
      circle(w * 0.4, h * 0.55, unit * 0.028, "#E09462", 0.9),
      circle(w * 0.47, h * 0.56, unit * 0.026, "#A6BF7E", 0.9),
      circle(w * 0.54, h * 0.55, unit * 0.03, "#D6B389", 0.9),
      circle(w * 0.61, h * 0.56, unit * 0.024, "#8EB17A", 0.9),
    ].join("\n")
  }

  if (filename === "blog-safe-fabrics.svg") {
    return [
      roundedRect(w * 0.12, h * 0.18, w * 0.76, h * 0.03, 8, wood, 0.72),
      ...Array.from({ length: 6 }, (_, i) =>
        roundedRect(w * (0.16 + i * 0.11), h * 0.24, w * 0.08, h * 0.22, 24, "#E5D8C7", 0.8)
      ),
      roundedRect(w * 0.18, h * 0.56, w * 0.64, h * 0.08, 10, "#EFE5D9", 0.84),
      roundedRect(w * 0.18, h * 0.66, w * 0.64, h * 0.08, 10, "#DFCFBC", 0.8),
    ].join("\n")
  }

  if (filename === "blog-sleep-guide.svg") {
    return [
      circle(w * 0.8, h * 0.2, unit * 0.08, "#F8E8C6", 0.92),
      roundedRect(w * 0.2, h * 0.42, w * 0.45, h * 0.2, 16, "#8C7A66", 0.55),
      ...Array.from({ length: 7 }, (_, i) =>
        roundedRect(w * (0.24 + i * 0.055), h * 0.45, w * 0.02, h * 0.14, 6, "#B39A80", 0.55)
      ),
      roundedRect(0, floorY, w, h * 0.32, 0, "#2D2925", 0.62),
    ].join("\n")
  }

  if (filename === "social-ingredients.svg") {
    return [
      circle(w * 0.33, h * 0.34, unit * 0.09, "#D0C1A7", 0.92),
      circle(w * 0.56, h * 0.36, unit * 0.07, "#AFC3A9", 0.92),
      roundedRect(w * 0.28, h * 0.54, w * 0.42, h * 0.08, 30, "#E8DAC8", 0.88),
      roundedRect(w * 0.62, h * 0.28, w * 0.05, h * 0.2, 30, "#C8AF8F", 0.8),
    ].join("\n")
  }

  if (filename === "social-quote.svg") {
    return [
      ...Array.from({ length: 16 }, (_, i) =>
        `<line x1="0" y1="${h * (0.06 + i * 0.06)}" x2="${w}" y2="${h * (0.065 + i * 0.06)}" stroke="#E7D9C7" stroke-opacity="0.38" stroke-width="1"/>`
      ),
      circle(w * 0.76, h * 0.28, unit * 0.24, "#F4EBDD", 0.45),
      circle(w * 0.22, h * 0.8, unit * 0.16, "#D3E0CF", 0.4),
    ].join("\n")
  }

  return [
    roundedRect(w * 0.2, h * 0.28, w * 0.6, h * 0.44, 28, neutral, 0.75),
    circle(w * 0.7, h * 0.3, unit * 0.15, warm, 0.55),
    roundedRect(0, floorY, w, h * 0.3, 0, "#E9DDCD", 0.4),
  ].join("\n")
}

function buildSvg(entry) {
  const { file, width, height, prompt } = entry
  const seed = hashString(`${file}:${prompt}`)
  const c1 = pickColor("cream", seed, 0)
  const c2 = pickColor("sage", seed, 1)
  const c3 = file === "blog-sleep-guide.svg" ? pickColor("dusk", seed, 2) : pickColor("earth", seed, 2)
  const lightX = (0.68 + ((seed % 20) / 100)).toFixed(2)
  const lightY = (0.16 + (((seed >> 8) % 14) / 100)).toFixed(2)

  const scene = sceneFor(file, width, height, seed)

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${width}" y2="${height}" gradientUnits="userSpaceOnUse">
      <stop stop-color="${c1}"/>
      <stop offset="0.6" stop-color="${c2}"/>
      <stop offset="1" stop-color="${c3}"/>
    </linearGradient>
    <radialGradient id="light" cx="0" cy="0" r="1" gradientUnits="objectBoundingBox" gradientTransform="translate(${lightX} ${lightY}) rotate(135) scale(0.9 1.2)">
      <stop stop-color="#FFF7EC" stop-opacity="0.72"/>
      <stop offset="1" stop-color="#FFF7EC" stop-opacity="0"/>
    </radialGradient>
    <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="${Math.max(8, Math.round(Math.min(width, height) * 0.015))}" />
    </filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.03"/>
      </feComponentTransfer>
    </filter>
    <linearGradient id="vignette" x1="0" y1="0" x2="0" y2="${height}" gradientUnits="userSpaceOnUse">
      <stop stop-color="#000" stop-opacity="0.08"/>
      <stop offset="0.55" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.13"/>
    </linearGradient>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#light)"/>
  <g filter="url(#blur)" opacity="0.75">
    <circle cx="${Math.round(width * 0.2)}" cy="${Math.round(height * 0.18)}" r="${Math.round(Math.min(width, height) * 0.16)}" fill="#FFF1DD"/>
    <circle cx="${Math.round(width * 0.82)}" cy="${Math.round(height * 0.78)}" r="${Math.round(Math.min(width, height) * 0.2)}" fill="#C5D5BF"/>
  </g>
  ${scene}
  <rect width="${width}" height="${height}" filter="url(#grain)"/>
  <rect width="${width}" height="${height}" fill="url(#vignette)"/>
</svg>
`
}

function run() {
  const entries = readEntries()
  if (!entries.length) {
    throw new Error("No se encontraron prompts en PROMPTS.md")
  }

  for (const entry of entries) {
    const svg = buildSvg(entry)
    const outPath = path.join(OUTPUT_DIR, entry.file)
    fs.writeFileSync(outPath, svg, "utf8")
  }

  console.log(`Generated ${entries.length} SVG files in ${OUTPUT_DIR}`)
}

run()

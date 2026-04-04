#!/usr/bin/env node
const fs = require("fs")
const path = require("path")

const ROOT = process.cwd()
const PROMPTS_PATH = path.join(ROOT, "public/images/generated/PROMPTS.md")
const OUTPUT_DIR = path.join(ROOT, "public/images/generated")
const API_KEY = process.env.OPENAI_API_KEY
const MODEL = "gpt-image-1"

if (!API_KEY) {
  console.error("Missing OPENAI_API_KEY")
  process.exit(1)
}

function parsePrompts() {
  const content = fs.readFileSync(PROMPTS_PATH, "utf8")
  const negativeMatch = content.match(/## Negative prompt recomendado \(para todas\)\s*\n`([^`]+)`/m)
  const negative = negativeMatch ? negativeMatch[1] : ""

  const regex = /`([^`]+\.svg)` \((\d+)x(\d+)\)\s*\nPrompt: `([^`]+)`/g
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

  if (!entries.length) {
    throw new Error("No prompts found in PROMPTS.md")
  }

  return { entries, negative }
}

function apiSizeFor(width, height) {
  if (width === height) return "1024x1024"
  return width > height ? "1536x1024" : "1024x1536"
}

async function generateBase64Png(prompt, size) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      size,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`OpenAI API error ${response.status}: ${text}`)
  }

  const json = await response.json()
  const b64 = json?.data?.[0]?.b64_json
  if (!b64) {
    throw new Error("No image payload returned by API")
  }
  return b64
}

function asSvgWithEmbeddedPng(width, height, base64Png) {
  const href = `data:image/png;base64,${base64Png}`
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#F2ECE3"/>
  <image href="${href}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice"/>
</svg>
`
}

async function run() {
  const { entries, negative } = parsePrompts()
  console.log(`Generating ${entries.length} images with ${MODEL}...`)

  for (let i = 0; i < entries.length; i += 1) {
    const entry = entries[i]
    const size = apiSizeFor(entry.width, entry.height)
    const finalPrompt = `${entry.prompt}\n\nNegative prompt: ${negative}`
    console.log(`[${i + 1}/${entries.length}] ${entry.file} (${size})`)

    const b64 = await generateBase64Png(finalPrompt, size)
    const svg = asSvgWithEmbeddedPng(entry.width, entry.height, b64)
    fs.writeFileSync(path.join(OUTPUT_DIR, entry.file), svg, "utf8")
  }

  console.log("Done.")
}

run().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})

#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const productsPath = path.join(root, "data", "affiliate-products.json");

function normalizePinterestUrl(url) {
  const value = String(url || "").trim();
  if (!value) return null;

  try {
    const parsed = new URL(value);
    if (!parsed.hostname.includes("pinterest.com")) return null;
    parsed.hash = "";
    parsed.search = "";
    let pathname = parsed.pathname.replace(/\/+$/, "");
    if (!pathname.startsWith("/pin/")) return null;
    pathname += "/";
    return `${parsed.origin}${pathname}`;
  } catch {
    return null;
  }
}

function toTitleCase(value) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function buildPinEntries(product, urls) {
  const shortName = product.title.split(",")[0]?.trim() || product.title;
  const cleanedBullets = (product.descriptionBullets || [])
    .map((bullet) => String(bullet).replace(/\s+/g, " ").trim())
    .filter((bullet) => bullet.length > 20 && bullet.length < 170);

  const noteSeeds = [
    cleanedBullets[0],
    cleanedBullets[1],
    cleanedBullets[2],
    `Supporting Pinterest content for ${shortName}.`,
  ].filter(Boolean);

  const titleSeeds = [
    `Why Moms Save ${shortName}`,
    `${toTitleCase(product.suggestion || "baby essentials")} Pick: ${shortName}`,
    `${shortName} for Daily Baby Care`,
    `What to Know About ${shortName}`,
  ];

  return urls.map((href, index) => ({
    title: titleSeeds[index] || `${shortName} Pinterest Pin ${index + 1}`,
    href,
    note: noteSeeds[index] || noteSeeds[noteSeeds.length - 1],
  }));
}

function main() {
  const [, , asin, ...rawUrls] = process.argv;

  if (!asin || rawUrls.length === 0) {
    console.error("Usage: node scripts/add-pinterest-pins.js <ASIN> <pin-url> [pin-url...]");
    process.exit(1);
  }

  const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
  const product = products.find((entry) => entry.asin === asin);

  if (!product) {
    console.error(`ASIN not found: ${asin}`);
    process.exit(1);
  }

  const urls = rawUrls
    .map(normalizePinterestUrl)
    .filter(Boolean);

  if (urls.length === 0) {
    console.error("No valid Pinterest URLs were provided.");
    process.exit(1);
  }

  const uniqueUrls = [...new Set(urls)];
  product.relatedPins = buildPinEntries(product, uniqueUrls);
  fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`, "utf8");

  console.log(`Saved ${uniqueUrls.length} Pinterest pins for ${asin}.`);
}

main();

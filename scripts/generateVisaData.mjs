/**
 * Build-time tool — not used at runtime.
 *
 * The app scores visas from src/lib/server/data/visaPairLookup.json so lookups
 * stay fast, deterministic, and offline (no LLM or visa API per request).
 * This script regenerates that JSON from the passport-index CSV when visa
 * policies change: https://github.com/ilyankou/passport-index-dataset
 *
 * Usage:
 *   node scripts/generateVisaData.mjs path/to/passport-index-tidy.csv
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const csvPath = process.argv[2];

if (!csvPath) {
  console.error("Usage: node scripts/generateVisaData.mjs <passport-index-tidy.csv>");
  process.exit(1);
}

const COUNTRY_ALIASES = {
  "Czech Republic": "Czechia",
  "Cape Verde": "Cabo Verde",
  "Ivory Coast": "Cote d'Ivoire",
  Eswatini: "Swaziland",
  "North Macedonia": "Macedonia",
  "Democratic Republic of the Congo": "Congo (Dem. Rep.)",
  Congo: "Congo",
  "United States": "United States of America",
  Russia: "Russian Federation",
  "South Korea": "Korea, South",
  "North Korea": "Korea, North",
  Taiwan: "Taiwan",
  Palestine: "Palestinian Territory",
  "Vatican City": "Vatican",
  "Timor-Leste": "Timor-Leste",
  Brunei: "Brunei Darussalam",
  Laos: "Lao",
  Syria: "Syrian Arab Republic",
  Venezuela: "Venezuela",
  Bolivia: "Bolivia",
  Iran: "Iran",
  Moldova: "Moldova",
  Tanzania: "Tanzania",
  Bahamas: "Bahamas",
  Gambia: "Gambia",
};

function normalizeCountryName(name) {
  return name.trim();
}

function toDatasetName(name) {
  return COUNTRY_ALIASES[name] ?? name;
}

const countriesTs = await readFile(join(root, "src/lib/countries.ts"), "utf8");
const countries = [...countriesTs.matchAll(/"([^"]+)"/g)].map((match) => match[1]);

const csv = await readFile(csvPath, "utf8");
const lines = csv.trim().split("\n").slice(1);

const pairLookup = new Map();

for (const line of lines) {
  const commaIndex = line.indexOf(",");
  const secondComma = line.indexOf(",", commaIndex + 1);
  if (commaIndex === -1 || secondComma === -1) {
    continue;
  }

  const passport = normalizeCountryName(line.slice(0, commaIndex));
  const destination = normalizeCountryName(
    line.slice(commaIndex + 1, secondComma)
  );
  const requirement = line.slice(secondComma + 1).trim();

  pairLookup.set(`${passport}|${destination}`, requirement);
}

const visaPairLookup = {};
for (const passport of countries) {
  const passportDataset = toDatasetName(passport);

  for (const destination of countries) {
    const destinationDataset = toDatasetName(destination);
    const requirement =
      pairLookup.get(`${passportDataset}|${destinationDataset}`) ??
      pairLookup.get(`${passport}|${destination}`);

    if (requirement) {
      visaPairLookup[`${passport}|${destination}`] = requirement;
    }
  }
}

const outDir = join(root, "src/lib/server/data");
await mkdir(outDir, { recursive: true });

await writeFile(
  join(outDir, "visaPairLookup.json"),
  `${JSON.stringify(visaPairLookup)}\n`
);

const missingDestinations = countries.filter((country) => {
  const datasetName = toDatasetName(country);
  return ![...pairLookup.keys()].some((key) => key.endsWith(`|${datasetName}`));
});

console.log(
  `Generated ${Object.keys(visaPairLookup).length} visa pairs for ${countries.length} countries.`
);
if (missingDestinations.length > 0) {
  console.log("Destinations without dataset match:");
  console.log(missingDestinations.join(", "));
}

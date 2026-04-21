#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const IDEAS_DIR = path.resolve(process.cwd(), "..", "ideas");
const VALID_CATEGORIES = new Set([
  "fintech","healthtech","d2c","saas","edtech",
  "agritech","logistics","mediatech","devtools","climate",
]);

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000;

function fail(file, msg) {
  console.error(`❌  ${file}: ${msg}`);
  process.exitCode = 1;
}

if (!fs.existsSync(IDEAS_DIR)) {
  console.error(`ideas/ directory not found at ${IDEAS_DIR}`);
  process.exit(1);
}

const files = fs.readdirSync(IDEAS_DIR).filter((f) => f.endsWith(".md"));
if (files.length === 0) {
  console.warn("⚠️  no ideas to validate (empty ideas/)");
  process.exit(0);
}

let ok = 0;
for (const file of files) {
  const raw = fs.readFileSync(path.join(IDEAS_DIR, file), "utf8");
  const { data: fm } = matter(raw);
  const errs = [];

  if (!fm.title || typeof fm.title !== "string") errs.push("missing title");
  if (!fm.slug || !SLUG_RE.test(fm.slug)) errs.push(`invalid slug: ${fm.slug}`);
  if (!fm.date) errs.push("missing date");
  if (!fm.category || !VALID_CATEGORIES.has(fm.category))
    errs.push(`invalid category: ${fm.category}`);
  if (!fm.pitch || fm.pitch.length > 160)
    errs.push(`pitch missing or > 160 chars`);
  if (!fm.score || typeof fm.score !== "object") errs.push("missing score");
  else {
    const s = fm.score;
    const sum = s.market + s.capital + s.team + s.trend + s.moat + s.economics + s.speed;
    if (sum !== s.total) errs.push(`score.total ${s.total} !== sum ${sum}`);
    if (s.total < 70) errs.push(`score.total ${s.total} < 70 threshold`);
    for (const k of ["market","capital","team","trend","moat","economics","speed"]) {
      if (s[k] === 0) errs.push(`dimension ${k} is 0 — disqualifying`);
    }
  }
  if (typeof fm.capex_inr_lakh !== "number" || fm.capex_inr_lakh > 20)
    errs.push(`capex ${fm.capex_inr_lakh} > 20 lakh`);
  if (typeof fm.team_size !== "number" || fm.team_size < 1 || fm.team_size > 5)
    errs.push(`team_size out of 1-5`);
  if (!Array.isArray(fm.sources) || fm.sources.length === 0)
    errs.push("sources missing");
  else {
    const recent = fm.sources.some((s) => {
      const t = new Date(s.observed_on).getTime();
      return !isNaN(t) && Date.now() - t <= ninetyDaysMs;
    });
    if (!recent) errs.push("no source observed in last 90 days");
  }
  if (fm.slug && !file.includes(fm.slug))
    errs.push(`filename ${file} doesn't match slug ${fm.slug}`);

  if (errs.length) {
    for (const e of errs) fail(file, e);
  } else {
    ok += 1;
  }
}

console.log(`\n${ok}/${files.length} ideas valid.`);
if (process.exitCode) process.exit(process.exitCode);

import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { parseArgs } from "node:util";

const { values } = parseArgs({ options: { components: { type: "string" } } });
const components = values.components ? values.components.split(",") : [];

const locale = process.env.STORYBOOK_LOCALE ?? "en";
const base = locale === "en" ? "http://localhost:6006" : "http://localhost:6007";
const out = path.resolve(import.meta.dirname, `../../static/component-shots/${locale}`);

const hoverList = ["buttons-", "lists-previewlist"];
const waitForList = ["animations-", "frames-book3d"];

const { entries } = await (await fetch(`${base}/index.json`)).json();
const stories = Object.values<{ id: string; type: string }>(entries).filter(
  (e) =>
    e.type === "story" &&
    e.id.startsWith("components-") &&
    e.id.endsWith("--default") &&
    (!components.length || components.some((component) => new RegExp(component, "i").test(e.id)))
);

await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1132, height: 800 }, deviceScaleFactor: 2 });

await page.goto(`${base}/iframe.html`, { waitUntil: "networkidle" });
const runningFr = await page.evaluate(() => document.documentElement.classList.contains("locale-fr"));
if (runningFr !== (locale === "fr")) {
  console.error(
    `Storybook on ${base} is running in ${runningFr ? "fr" : "en"}, but this run is for ${locale}. Start ${locale === "fr" ? "storybook:fr" : "storybook"} first.`
  );
  await browser.close();
  process.exit(1);
}

for (const { id } of stories) {
  await page.goto(`${base}/iframe.html?id=${id}&full=1&shortcuts=false&viewMode=story&zoom=true`, {
    waitUntil: "networkidle"
  });
  await page.locator("html:not(.zoom-pending)").waitFor();

  const el = page.locator('#storybook-root > [class*="-story-example"]').first();

  if (hoverList.some((item) => new RegExp(item).test(id))) {
    await el.hover();
  }

  let animated = false;
  if (waitForList.some((item) => new RegExp(item).test(id))) {
    animated = true;
    await page.waitForTimeout(500);
  }

  await el.screenshot({ path: `${out}/${id}.webp`, animations: animated ? "allow" : "disabled" });
  console.log(id);
}

await browser.close();

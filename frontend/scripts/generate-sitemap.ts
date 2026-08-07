// Runs before `vite dev` and `vite build`; writes public/sitemap.xml.
import { writeFileSync } from "fs";
import { resolve } from "path";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.9" },
  { path: "/programs", changefreq: "monthly", priority: "0.9" },
  { path: "/impact", changefreq: "monthly", priority: "0.8" },
  { path: "/where-we-work", changefreq: "monthly", priority: "0.8" },
  { path: "/stories", changefreq: "weekly", priority: "0.8" },
  { path: "/partnership", changefreq: "monthly", priority: "0.8" },
  { path: "/get-involved", changefreq: "monthly", priority: "0.8" },
  { path: "/transparency", changefreq: "monthly", priority: "0.7" },
  { path: "/governance", changefreq: "monthly", priority: "0.7" },
  { path: "/ethics", changefreq: "monthly", priority: "0.6" },
  { path: "/sustainability", changefreq: "monthly", priority: "0.6" },
  { path: "/resources", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "yearly", priority: "0.5" },
];

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n")
  ),
  `</urlset>`,
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`sitemap.xml written (${entries.length} entries)`);

import { test, expect } from "@playwright/test";

test(
  "redirect /sitemaps/ to main XML sitemap",
  { tag: ["@wip", "@smoke"] },
  async ({ page }) => {
    const response = await page.goto("/sitemaps/");
    const contentType = await response?.headerValue("content-type");
    expect(contentType).toEqual("application/xml; charset=utf-8");
  },
);

test("main sitemap", { tag: ["@wip", "@smoke"] }, async ({ page }) => {
  page.on("response", async (response) => {
    const contentType = await response.headerValue("content-type");
    expect(contentType).toEqual("application/xml; charset=utf-8");
  });
  await page.goto("/sitemap.xml");
});

test("static pages sitemap", { tag: ["@wip", "@smoke"] }, async ({ page }) => {
  page.on("response", async (response) => {
    const contentType = await response.headerValue("content-type");
    expect(contentType).toEqual("application/xml; charset=utf-8");
  });
  await page.goto("/sitemaps/sitemap_1.xml");
});

test(
  "first dynamic pages sitemap",
  { tag: ["@wip", "@smoke"] },
  async ({ page }) => {
    page.on("response", async (response) => {
      const contentType = await response.headerValue("content-type");
      expect(contentType).toEqual("application/xml; charset=utf-8");
    });
    await page.goto("/sitemaps/sitemap_2.xml");
  },
);

test("non-existant sitemap", { tag: "@wip" }, async ({ page }) => {
  const response = await page.goto("/sitemaps/sitemap_99999.xml");
  const status = await response?.status();
  expect(status).toEqual(404);
});

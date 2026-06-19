import { expect, test } from "@playwright/test";

const routes = [
  {
    path: "/",
    title: /websites, mobile apps, SaaS platforms and AI-powered business software/i,
  },
  { path: "/services", title: /software services for real business workflows/i },
  {
    path: "/fieldops-saas",
    title: /run field teams, tasks, expenses, purchase orders and service calls from one cloud platform/i,
  },
  { path: "/products", title: /product demos and prototypes from Kriovya Labs/i },
  { path: "/case-studies", title: /proof blocks that avoid fake claims/i },
  { path: "/contact", title: /contact Kriovya Labs/i },
  { path: "/get-quote", title: /share your project requirements/i },
  { path: "/about", title: /Kriovya Labs builds practical software for operations/i },
  { path: "/missing-page", title: /page not found/i },
] as const;

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
] as const;

for (const viewport of viewports) {
  test(`core routes stay within viewport on ${viewport.name}`, async ({ page }) => {
    test.slow();

    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const route of routes) {
      await page.goto(route.path);
      await expect(page.getByRole("heading", { level: 1, name: route.title })).toBeVisible();

      const overflow = await page.evaluate(() => {
        const root = document.documentElement;
        const body = document.body;
        return Math.max(root.scrollWidth, body.scrollWidth) - window.innerWidth;
      });

      expect(overflow).toBeLessThanOrEqual(1);
    }
  });
}

import { expect, test } from "@playwright/test";

test("home page shows required portfolio modules", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /websites, mobile apps, SaaS platforms and AI-powered business software/i,
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "FieldOps SaaS" }).first()).toBeVisible();
  await expect(page.getByText("No fake client logos", { exact: false })).toBeVisible();
  await expect(page.getByText("Domain, hosting, database", { exact: false })).toBeVisible();
  await expect(page.getByRole("button", { name: "Chat" })).toBeVisible();
});

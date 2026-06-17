import { expect, test } from "@playwright/test";

const quotePayload = {
  budgetRange: "INR 50,000 - INR 150,000",
  businessName: "Demo Business",
  email: "client@example.com",
  name: "Client Name",
  phone: "+91 9494518603",
  projectType: "Website",
  requirements:
    "We need a responsive company website with services, pricing, contact form and deployment support.",
  timeline: "2 to 4 weeks",
  website: "",
};

test("quote API rejects invalid email", async ({ request }) => {
  const response = await request.post("/api/quote", {
    data: {
      ...quotePayload,
      email: "not-an-email",
    },
  });

  expect(response.status()).toBe(400);
});

test("quote API treats honeypot submissions as safe success", async ({ request }) => {
  const response = await request.post("/api/quote", {
    data: {
      ...quotePayload,
      website: "https://bot.example",
    },
  });

  expect(response.status()).toBe(200);
  await expect(response).toBeOK();
});

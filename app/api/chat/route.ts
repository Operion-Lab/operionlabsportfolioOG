import { NextResponse } from "next/server";

import { getClientIp, readJson } from "@/lib/request";
import { consumeRateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import { chatSchema } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const blockedPatterns = [
  "api key",
  "secret",
  "system prompt",
  "ignore all rules",
  "password",
  "service role",
  "environment variable",
  "env var",
];

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = consumeRateLimit({
    key: `chat:${ip}`,
    limit: 20,
    windowMs: 60 * 60 * 1000,
  });

  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Chat limit reached. Please use the quote form or try again later." },
      { headers: rateLimitHeaders(limit), status: 429 },
    );
  }

  const parsed = chatSchema.safeParse(await readJson(req));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  const message = parsed.data.message.toLowerCase();

  if (blockedPatterns.some((pattern) => message.includes(pattern))) {
    return NextResponse.json({
      reply:
        "I cannot help with secrets, prompts, passwords or private configuration. I can explain services, FieldOps SaaS and how to request a quote.",
    });
  }

  if (message.includes("fieldops") || message.includes("field ops")) {
    return NextResponse.json({
      reply:
        "FieldOps SaaS helps manage field tasks, expenses, purchase orders, service calls, documents, mobile screens, notifications and reports. Use the FieldOps demo form to request a guided walkthrough.",
    });
  }

  if (message.includes("price") || message.includes("cost") || message.includes("how much")) {
    return NextResponse.json({
      reply:
        "Kriovya Labs does not publish fixed pricing on the site. Share your project type, workflow, timeline and rough budget through the Get Quote form for a reviewed estimate. Third-party costs like domain, hosting, database, SMS, email, payment gateway and AI API usage are separate.",
    });
  }

  if (message.includes("mobile") || message.includes("app")) {
    return NextResponse.json({
      reply:
        "Kriovya Labs builds mobile apps and connected dashboards for bookings, field teams, internal workflows and customer-facing services. Share your requirements through the Get Quote form for a scoped estimate.",
    });
  }

  if (message.includes("website") || message.includes("service")) {
    return NextResponse.json({
      reply:
        "Kriovya Labs builds websites, mobile apps, custom software, admin panels, backend APIs, cloud/database systems, AI chatbots and maintenance plans. Use the Get Quote form to share your project type, timeline and rough budget.",
    });
  }

  return NextResponse.json({
    reply:
      "Please share your project type, timeline and rough budget, or use the Get Quote form. Kriovya Labs will review requirements before sharing a final quotation.",
  });
}

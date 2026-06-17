import { NextResponse } from "next/server";

import { insertLeadRecord, leadCaptureErrorResponse } from "@/lib/lead-capture";
import { getClientIp, readJson } from "@/lib/request";
import { consumeRateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import { hasEmailConfig, sendQuoteEmail } from "@/lib/resend";
import { hasSupabaseConfig } from "@/lib/supabase-admin";
import { quoteSchema } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = consumeRateLimit({
    key: `quote:${ip}`,
    limit: 5,
    windowMs: 30 * 60 * 1000,
  });

  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many quote requests. Please try again later." },
      { headers: rateLimitHeaders(limit), status: 429 },
    );
  }

  const parsed = quoteSchema.safeParse(await readJson(req));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const canStoreLead = hasSupabaseConfig();
  const canSendEmail = hasEmailConfig();

  if (!canStoreLead && !canSendEmail) {
    return NextResponse.json(
      { error: "Lead capture is not configured yet. Please call or email Operion Labs." },
      { status: 503 },
    );
  }

  try {
    if (canStoreLead) {
      await insertLeadRecord("quote_requests", {
        budget_range: parsed.data.budgetRange || null,
        business_name: parsed.data.businessName,
        email: parsed.data.email,
        name: parsed.data.name,
        phone: parsed.data.phone,
        project_type: parsed.data.projectType,
        requirements: parsed.data.requirements,
        timeline: parsed.data.timeline || null,
      });
    }

    if (canSendEmail) {
      await sendQuoteEmail(parsed.data);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Quote API error", error);
    return leadCaptureErrorResponse(error, "Unable to submit request");
  }
}

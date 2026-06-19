import { NextResponse } from "next/server";

import { insertLeadRecord, leadCaptureErrorResponse } from "@/lib/lead-capture";
import { getClientIp, readJson } from "@/lib/request";
import { consumeRateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import { hasEmailConfig, sendDemoEmail } from "@/lib/resend";
import { hasSupabaseConfig } from "@/lib/supabase-admin";
import { demoSchema } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = consumeRateLimit({
    key: `demo:${ip}`,
    limit: 5,
    windowMs: 30 * 60 * 1000,
  });

  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many demo requests. Please try again later." },
      { headers: rateLimitHeaders(limit), status: 429 },
    );
  }

  const parsed = demoSchema.safeParse(await readJson(req));
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
      { error: "Lead capture is not configured yet. Please call or email Kriovya Labs." },
      { status: 503 },
    );
  }

  try {
    if (canStoreLead) {
      await insertLeadRecord("demo_requests", {
        company: parsed.data.companyName || null,
        email: parsed.data.email,
        message: parsed.data.notes || null,
        name: parsed.data.name,
        phone: parsed.data.phone,
        product: parsed.data.product,
      });
    }

    if (canSendEmail) {
      await sendDemoEmail(parsed.data);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Demo API error", error);
    return leadCaptureErrorResponse(error, "Unable to submit demo request");
  }
}

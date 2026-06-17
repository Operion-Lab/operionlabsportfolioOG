import { NextResponse } from "next/server";

import { getSupabaseLeadClients } from "@/lib/supabase-admin";

type PostgrestLikeError = {
  code?: string;
  hint?: string | null;
  message?: string;
};

export async function insertLeadRecord(table: string, payload: Record<string, unknown>) {
  let firstError: unknown;

  for (const supabase of getSupabaseLeadClients()) {
    const { error } = await supabase.from(table).insert(payload);

    if (!error) {
      return;
    }

    firstError ??= error;
  }

  throw firstError ?? new Error("Lead insert failed");
}

export function leadCaptureErrorResponse(error: unknown, fallbackMessage: string) {
  const postgrestError = error as PostgrestLikeError | null;

  if (postgrestError?.code === "PGRST205") {
    return NextResponse.json(
      {
        error:
          "Lead tables are missing in Supabase. Run supabase/schema.sql in the connected project and try again.",
      },
      { status: 500 },
    );
  }

  if (postgrestError?.code === "PGRST204") {
    return NextResponse.json(
      {
        error:
          "Supabase table schema is out of sync with the app. Re-run supabase/schema.sql in the connected project and try again.",
      },
      { status: 500 },
    );
  }

  if (postgrestError?.code === "42501") {
    if (postgrestError.hint?.includes(" TO anon")) {
      return NextResponse.json(
        {
          error:
            "Supabase grants are missing for anon on this table. Re-run supabase/schema.sql in the connected project and try again.",
        },
        { status: 500 },
      );
    }

    if (postgrestError.hint?.includes(" TO service_role")) {
      return NextResponse.json(
        {
          error:
            "Supabase grants are missing for service_role on this table. Re-run supabase/schema.sql in the connected project and try again.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        error:
          "Supabase permissions or insert policy are blocking this request. Re-run supabase/schema.sql in the connected project and try again.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ error: fallbackMessage }, { status: 500 });
}

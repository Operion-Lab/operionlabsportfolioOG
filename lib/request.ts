export function getClientIp(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return req.headers.get("x-real-ip") || "local";
}

export async function readJson(req: Request) {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

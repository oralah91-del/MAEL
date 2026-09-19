import { NextRequest } from "next/server";

export function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.nextUrl.host;
  } catch {
    return false;
  }
}

export function jsonError(message: string, status: number) {
  return Response.json({ ok: false, error: message }, { status });
}

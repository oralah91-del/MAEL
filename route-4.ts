import { getCurrentSession } from "@/lib/session";

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  return Response.json({ ok: true, user: session.user });
}

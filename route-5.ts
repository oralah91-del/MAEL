import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return Response.json({ ok: true, service: "MAEL", database: "ok" });
  } catch {
    return Response.json({ ok: false, service: "MAEL", database: "unavailable" }, { status: 503 });
  }
}

import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSessionToken, hashPassword, hashSessionToken, normalizeEmail, SESSION_COOKIE, SESSION_MAX_AGE, verifyPassword } from "@/lib/auth";
import { jsonError, sameOrigin } from "@/lib/http";

const schema = z.object({ email: z.string().trim().email().max(254), password: z.string().min(1).max(128) });

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return jsonError("Invalid request origin", 403);
  let body: unknown;
  try { body = await request.json(); } catch { return jsonError("Invalid JSON", 400); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return jsonError("Invalid credentials", 401);

  const email = normalizeEmail(parsed.data.email);
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !verifyPassword(parsed.data.password, user.passwordHash)) return jsonError("Invalid credentials", 401);

  const token = createSessionToken();
  const tokenHash = hashSessionToken(token);
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000);
  await prisma.session.create({ data: { tokenHash, userId: user.id, expiresAt } });

  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return Response.json({ ok: true, user: { id: user.id, email: user.email } });
}

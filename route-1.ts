import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSessionToken, hashPassword, hashSessionToken, normalizeEmail, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth";
import { jsonError, sameOrigin } from "@/lib/http";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

const schema = z.object({ email: z.string().trim().email().max(254), password: z.string().min(12).max(128) });

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return jsonError("Invalid request origin", 403);
  let body: unknown; try { body = await request.json(); } catch { return jsonError("Invalid JSON", 400); }
  const parsed = schema.safeParse(body); if (!parsed.success) return jsonError("Invalid email or password", 400);
  const email = normalizeEmail(parsed.data.email);
  try {
    const result = await prisma.$transaction(async tx => {
      const user = await tx.user.create({ data: { email, passwordHash: hashPassword(parsed.data.password) }, select: { id: true, email: true, createdAt: true } });
      const token = createSessionToken();
      await tx.session.create({ data: { tokenHash: hashSessionToken(token), userId: user.id, expiresAt: new Date(Date.now() + SESSION_MAX_AGE * 1000) } });
      return { user, token };
    });
    const store = await cookies();
    store.set({ name: SESSION_COOKIE, value: result.token, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: SESSION_MAX_AGE });
    return Response.json({ ok: true, user: result.user }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") return jsonError("Unable to create account with these details", 409);
    return jsonError("Unable to create account", 500);
  }
}

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashSessionToken, SESSION_COOKIE } from "@/lib/auth";

export async function getCurrentSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = await prisma.session.findUnique({
    where: { tokenHash: hashSessionToken(token) },
    include: { user: { select: { id: true, email: true, createdAt: true } } },
  });
  if (!session || session.expiresAt <= new Date()) {
    if (session) await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }
  return session;
}

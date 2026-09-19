import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const SCRYPT_KEY_LENGTH = 64;
const SALT_BYTES = 16;

export function normalizeEmail(email: string) { return email.trim().toLowerCase(); }

export function hashPassword(password: string) {
  const salt = randomBytes(SALT_BYTES).toString("hex");
  const hash = scryptSync(password, salt, SCRYPT_KEY_LENGTH).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const parts = stored.split(":");
  if (parts.length !== 2) return false;
  const [salt, hash] = parts;
  if (!/^[a-f0-9]{32}$/.test(salt) || !/^[a-f0-9]{128}$/.test(hash)) return false;
  try {
    const candidate = scryptSync(password, salt, SCRYPT_KEY_LENGTH);
    const expected = Buffer.from(hash, "hex");
    return timingSafeEqual(candidate, expected);
  } catch { return false; }
}

export function createSessionToken() { return randomBytes(32).toString("base64url"); }
export function hashSessionToken(token: string) { return createHash("sha256").update(token).digest("hex"); }

export const SESSION_COOKIE = "mael_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

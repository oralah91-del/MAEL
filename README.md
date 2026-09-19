# MAEL

MAEL is a Next.js + TypeScript foundation for a secure social, video, messaging, creator and business platform.

## Foundation included
- Next.js / React / TypeScript
- Prisma + PostgreSQL
- Real initial Prisma migration
- Secure scrypt password hashing
- Registration with automatic session creation
- Login / logout
- Server-side session lookup and expiry enforcement
- `GET /api/auth/me`
- SHA-256 session-token storage
- HttpOnly + SameSite session cookie
- Same-origin protection
- Security headers
- Database health endpoint

## Commands
- `npm run typecheck`
- `npm run test:auth`
- `npm run build`
- `npm run prisma:migrate`

Set `DATABASE_URL` before database commands. Never commit `.env` or production secrets.

## Important
This is a production-oriented foundation, not a completed social platform. Production deployment, database provisioning and runtime security testing must be verified in the target environment before calling it production-ready.

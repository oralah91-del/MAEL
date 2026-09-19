# MAEL database setup

MAEL uses PostgreSQL through Prisma.

1. Set `DATABASE_URL` in the deployment environment.
2. Run `npx prisma migrate deploy` during deployment or through the approved database migration workflow.
3. Verify `GET /api/health` returns `ok: true` and `database: "ok"`.

Never commit `.env`, passwords, tokens, or provider credentials.

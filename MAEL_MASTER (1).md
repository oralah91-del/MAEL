# MAEL MASTER — Project Control Record

**Project:** MAEL (مائل)  
**Previous working name:** VYRO  
**Founder / Owner:** HOSSEIN  
**Document purpose:** Single source of truth for product decisions, architecture, security requirements, current state, and next approved work.

---

## 1. Product Identity

- **Final product name:** MAEL
- **Persian name:** مائل
- **Previous name:** VYRO
- The name MAEL was selected by HOSSEIN as the final brand identity.
- The brand concept is intended to carry symbolic inspiration associated with حضرت محمد (ص)، حضرت علی (ع)، و امام زمان (عج), without relying on an unverified linguistic claim about the name.
- The product is intended to be a serious global product, not a demo.

## 2. Product Vision

MAEL is planned as a unified ecosystem combining:

- Social network / feed
- Short and long video
- Stories
- Direct and group messaging
- Communities / channels
- Creator tools
- Business accounts
- AI features
- Search / Explore
- Notifications
- Monetization
- Future voice/video calls and screen sharing
- Future standalone MAEL Messenger capability

The design goal is a coherent product rather than unrelated features bundled together.

## 3. Core Product Principles

Priority order:

1. Security
2. Correct architecture
3. Reliability and stability
4. Performance
5. UX/UI quality
6. Feature breadth

Definition of done:

> Build → Functional Test → Security Test → Fix → Retest → Approve → Next

No feature is considered production-ready merely because code or a UI exists.

## 4. Account and Access Model

Planned roles:

- User
- Creator
- Business
- HOSSEIN Owner / Super Admin

Owner security requirements:

- Owner privilege must be enforced server-side.
- Client input must never be able to assign or elevate a role.
- Sensitive Owner operations require MFA and/or re-authentication as appropriate.
- Owner actions must be audit logged.
- Least privilege applies to every administrative operation.
- Admin APIs must independently verify authorization on every privileged request.

Free and Pro:

- Free remains a complete usable product.
- Pro adds capacity and advanced capabilities rather than removing basic safety.
- Architecture must support Free / Pro / Creator Pro / Business without a major rewrite.

## 5. Planned Social Features

### Accounts
- Secure registration/login
- Email recovery
- Unique username
- Avatar
- Bio
- Public/private profile
- Future verification

### Posts
- Photo
- Video
- Carousel
- Caption
- Hashtags
- Mentions
- Location
- Drafts
- Edit/delete
- Privacy controls

### Engagement
- Like
- Comment/reply
- Follow/unfollow
- Share
- Repost
- Bookmark/save

### Sharing and downloads
- Share inside MAEL
- Share to external apps
- Copy link
- Send to MAEL contacts
- Repost
- Save/bookmark
- Content-owner download control
- Secure media access; private objects must not be exposed through permanent enumerable public URLs

### Video
- Short and long video
- Fullscreen
- Autoplay
- Adaptive quality
- Thumbnails
- Subtitles
- Mute/sound
- Views
- Watch history
- Quality selection
- Future Reels/short-video expansion

### Stories
- Photo/video
- 24-hour expiry
- Viewers
- Replies/reactions
- Mentions
- Links
- Privacy
- Delete
- Archive
- Highlights

## 6. Messenger Vision

Messenger is a major product pillar and should feel like a standalone messaging application inside MAEL.

Required direction:

- 1:1 messaging
- Groups
- Communities/channels
- Participant roles
- Admin/moderator permissions
- Replies
- Forwarding
- Editing/deleting
- Reactions
- Pinning
- Search
- Drafts
- Scheduled messages
- Disappearing messages
- Images/videos/documents
- Multi-file attachments
- Voice messages
- Delivery/read state
- Private attachment storage
- Calls
- Group calls
- Screen sharing
- Invite links
- Rules/announcements
- Anti-spam controls
- Block/mute/report
- Device/session management
- Strong transport security
- Planned end-to-end encryption where appropriate
- AI summaries, translation, writing assistance, semantic search and moderation support

Backend must remain modular enough that a standalone MAEL Messenger app can later use the same core services.

## 7. AI

Potential capabilities:

- Caption generation
- Hashtag suggestions
- Content ideas
- Semantic search
- Moderation assistance
- Summaries
- Translation
- Creator assistant
- Messaging assistance
- Anti-spam/abuse support

AI must respect privacy, authorization, rate limits and abuse controls. Sensitive secrets stay server-side.

## 8. Creator / Business / Monetization

Planned:

- Creator Studio
- Content management
- Analytics
- Advanced insights
- Creator subscriptions
- Tipping/support
- Content sales
- Business profiles
- Business tools
- Advertising infrastructure
- Premium subscriptions

Pricing is intentionally deferred until the product and infrastructure are mature.

## 9. Technical Architecture Target

Target stack:

- Frontend: Next.js / React + TypeScript
- Backend: modular server-side architecture; Next.js server routes/actions or a dedicated Node/NestJS service where scale/complexity requires it
- Database: PostgreSQL
- Authentication: secure custom/provider-based architecture; do not use Netlify Identity merely because Netlify provides it
- Media: S3-compatible object storage or another private object-storage architecture
- Video: object storage + asynchronous transcoding pipeline
- Realtime: WebSocket/Pusher/Ably/etc. after the authenticated messaging foundation is proven
- Search: PostgreSQL full-text search initially; later Meilisearch/OpenSearch/Elastic if scale requires
- Deployment: existing Netlify project, with backend/storage/database services selected deliberately

## 10. Database Target

Planned core entities:

- users
- profiles
- roles
- permissions
- sessions
- devices
- follows
- posts
- media
- likes
- comments
- conversations
- conversation_participants
- messages
- message_attachments
- message_reactions
- notifications
- blocks
- reports
- audit_logs

Database requirements:

- UUID identifiers where appropriate
- Foreign keys
- Unique constraints
- Check constraints
- Appropriate indexes
- Transaction boundaries
- Migration history
- Least-privilege database access
- No client-side authorization assumptions

## 11. Security Non-Negotiables

- Server-side authorization for every privileged operation
- Never trust client-supplied role/user ownership fields
- Strong password hashing (scrypt/Argon2-class approach)
- Unique salts
- Secure session tokens
- Store session token hashes where applicable rather than raw long-lived secrets
- HttpOnly cookies where cookie sessions are used
- Secure and appropriate SameSite settings
- TLS in production
- MFA for Owner and sensitive operations
- Re-authentication for high-risk actions
- Rate limiting
- Brute-force protection
- Input validation
- Output encoding
- CSRF protection where applicable
- SQL injection protection through parameterized queries/ORM
- IDOR/BOLA testing
- XSS testing
- Secure file upload validation
- Private media access controls
- No secrets in client bundles
- Environment variables for server-side secrets
- Audit logs
- Dependency/supply-chain checks
- Separate development/test/production environments
- Secure backup and restoration procedures
- Security review and penetration testing before public launch

No system should be described as “100% unhackable”.

## 12. App Size Target

Target installed size:

- Preferred: approximately 100–200 MB
- Avoid exceeding 200 MB where reasonably possible

Optimization approach:

- Do not bundle large AI models unnecessarily
- Server-side AI where appropriate
- On-demand downloads
- Lazy loading
- Smart caching
- Platform-specific optimization

Security and reliability must not be sacrificed to meet the size target.

## 13. Current Netlify Project

Existing project:

- **Netlify project:** `vyro-social-v5wz`
- **Status observed:** Private; not yet deployed
- **Owner/team shown:** VANTA STUDIO

Important:

- Keep this project as the current deployment target unless a deliberate architecture decision changes it.
- Do not create a replacement project merely to rename VYRO to MAEL.
- Do not make the project public without an explicit reason.
- Do not add production secrets until the actual backend/services and required variable names are established.
- Do not connect an unknown or incorrect Git repository.

## 14. Existing Artifacts / Known State

Known files/assets include:

- High-end VYRO concept UI boards
- Existing static VYRO-style prototype concepts
- `vanta_detailing_demo.html` — unrelated portfolio demo
- `noir_barber_demo.html` — unrelated portfolio demo

The actual production MAEL source tree has **not been reliably verified in the current working environment**.

Therefore:

> Previous conversational claims that backend/Auth code had already been fully implemented are not treated as verified unless the actual files, migrations, tests, and runtime are inspected and confirmed.

This is intentional to prevent false completion status.

## 15. Current Verified Status

### Brand
**Approved:** MAEL / مائل

### Product direction
**Approved:** Social + Video + Messenger + Creator + Business + AI + Monetization

### Security philosophy
**Approved:** Security by Design

### Netlify target
**Verified from user's screenshots:** `vyro-social-v5wz` exists and is private/not deployed.

### PostgreSQL
**Planned architecture:** yes  
**Production connection/migrations:** not yet verified

### Authentication
**Required architecture:** defined  
**Production implementation:** not yet verified

### Messenger
**Product architecture:** defined  
**Production backend/realtime:** not yet verified

### Production deployment
**Not yet verified**

## 16. Immediate Next Phase

Before adding more features:

### Phase A — Recover/establish the real source tree
1. Locate the actual MAEL/VYRO application source.
2. Inspect package/dependency structure.
3. Establish a reproducible local build.
4. Establish test commands.
5. Establish lint/type-check commands.
6. Create a clean project structure if the current prototype is insufficient.

### Phase B — Production data layer
1. PostgreSQL connection
2. Schema migrations
3. Constraints/indexes
4. Transaction strategy
5. Database least privilege
6. Automated integration tests

### Phase C — Authentication
1. Registration
2. Login
3. Secure password hashing
4. Email verification
5. Password reset
6. Session creation/revocation
7. Device/session management
8. Rate limiting
9. MFA/TOTP for Owner
10. Re-authentication for sensitive operations

### Phase D — Security verification
Test at minimum:

- Authentication bypass
- Authorization bypass
- BOLA/IDOR
- Privilege escalation
- Brute force
- Session fixation/hijacking
- CSRF
- XSS
- SQL injection
- Malicious upload paths
- Rate-limit bypass
- Token replay
- Password-reset abuse
- Owner privilege abuse

Only after these pass should the next major feature phase be approved.

## 17. After Auth Is Approved

Next major build:

**Messenger Backend + Realtime**

Order:

1. Conversation persistence
2. Participant authorization
3. Message persistence
4. Attachment authorization
5. Realtime delivery
6. Delivery/read state
7. Reactions/replies
8. Search
9. Abuse controls
10. Security testing
11. Calls architecture
12. E2EE design/implementation where appropriate
13. Full Messenger UI integration

## 18. Working Rule for Future Conversations

If the MAEL conversation becomes too long or partially fails to load, this document is the source of truth.

When continuing MAEL:

- Do not assume a feature is complete because an earlier message said it was.
- Verify files and runtime state before declaring implementation complete.
- Preserve approved decisions unless HOSSEIN explicitly changes them.
- Prefer secure, maintainable architecture over shortcuts.
- Do not expose secrets in chat, source code, screenshots, or client bundles.
- Report blockers honestly.
- Continue from the last **verified** phase.

---

**Document created:** 2026-09-18  
**Status:** Project control record / source of truth  
**Current approved next step:** Establish and verify the real source tree, then complete production PostgreSQL + Authentication + Security testing before Messenger.

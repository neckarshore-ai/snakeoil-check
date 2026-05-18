# Phase 1 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the Snake-Oil-or-Gold Next.js 16 project, link it to Vercel, provision Neon Postgres via Drizzle, wire up Vitest + Playwright + Biome + GitHub Actions CI, and ship a deployable placeholder landing page with a health endpoint.

**Architecture:** Next.js 16 App Router monorepo-free. Single Vercel project (Fluid Compute defaults). Postgres via Vercel Marketplace (Neon). Drizzle ORM. Server Components by default, Server Actions for mutations. Biome for lint+format. Vitest for unit, Playwright for E2E. CI runs typecheck + lint + test + build on every PR.

**Tech Stack:** Next.js 16, React 19, TypeScript 5.7 strict, Drizzle 0.36, pg 8.13, Vitest 3.0, Playwright 1.48, Biome 1.9, `@vercel/config` 1.x (for `vercel.ts`), pnpm 10.

**Prerequisites:**
- GitHub repo exists: `neckarshore-ai/snakeoil-check`
- Local clone at `~/Developer/projects/neckarshore-ai/snakeoil-check`
- Vercel account with access to `neckarshore-ai` team
- `pnpm` 10+ installed locally
- `vercel` CLI 54.1+ installed and authenticated

**Working-Dir Discipline:** Every Bash command starts with `cd ~/Developer/projects/neckarshore-ai/snakeoil-check && ...`.

---

## Task 1: Initialize pnpm + install core dependencies

**Files:**
- Create: `package.json`
- Create: `pnpm-lock.yaml` (generated)
- Create: `.nvmrc`
- Create: `pnpm-workspace.yaml`

- [ ] **Step 1.1: Pin Node version**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && echo "24" > .nvmrc
```

- [ ] **Step 1.2: Initialize package.json**

Create `package.json` with this exact content:

```json
{
  "name": "snakeoil-check",
  "version": "0.0.1",
  "private": true,
  "description": "Neutral AI-powered reality-check for online coachings and high-ticket offers",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "format": "biome format --write .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio"
  },
  "engines": {
    "node": ">=24",
    "pnpm": ">=10"
  },
  "packageManager": "pnpm@10.0.0"
}
```

- [ ] **Step 1.3: Install runtime dependencies (exact versions)**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && pnpm add --save-exact \
  next@16.0.0 \
  react@19.0.0 \
  react-dom@19.0.0 \
  drizzle-orm@0.36.4 \
  pg@8.13.1 \
  @vercel/config@1.0.0 \
  zod@3.23.8
```

Expected: `node_modules/` populated, `pnpm-lock.yaml` written.

- [ ] **Step 1.4: Install dev dependencies (exact versions)**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && pnpm add -D --save-exact \
  typescript@5.7.2 \
  @types/node@22.10.2 \
  @types/react@19.0.1 \
  @types/react-dom@19.0.1 \
  @types/pg@8.11.10 \
  drizzle-kit@0.30.1 \
  vitest@3.0.0 \
  @vitest/coverage-v8@3.0.0 \
  @playwright/test@1.48.2 \
  @biomejs/biome@1.9.4
```

- [ ] **Step 1.5: Verify installation**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && pnpm list --depth=0 | head -30
```

Expected: all packages listed with exact pinned versions, no `^` or `~`.

- [ ] **Step 1.6: Commit**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && git add package.json pnpm-lock.yaml .nvmrc && git commit -m "chore: init pnpm + install core dependencies"
```

---

## Task 2: Project structure + TypeScript strict + Biome

**Files:**
- Create: `tsconfig.json`
- Create: `biome.json`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `next.config.ts`
- Create: `.gitignore` (extend existing)

- [ ] **Step 2.1: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "playwright-tests", "test-results"]
}
```

- [ ] **Step 2.2: Write `biome.json`**

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": { "enabled": true, "clientKind": "git", "useIgnoreFile": true },
  "files": {
    "ignoreUnknown": true,
    "ignore": [
      "node_modules",
      ".next",
      "dist",
      "build",
      "drizzle",
      "playwright-report",
      "test-results",
      "*.tsbuildinfo"
    ]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": { "noUnusedVariables": "error", "noUnusedImports": "error" },
      "style": { "useImportType": "error", "useNodejsImportProtocol": "error" },
      "suspicious": { "noConsoleLog": "warn" }
    }
  },
  "javascript": {
    "formatter": { "quoteStyle": "single", "semicolons": "always", "trailingCommas": "all" }
  }
}
```

- [ ] **Step 2.3: Write `next.config.ts`**

```typescript
import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    typedRoutes: true,
  },
};

export default config;
```

- [ ] **Step 2.4: Create root layout and placeholder page**

`src/app/layout.tsx`:

```typescript
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Snake-Oil-or-Gold Check',
  description: 'Neutraler Reality-Check für Online-Coachings und High-Ticket-Angebote.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
```

`src/app/page.tsx`:

```typescript
export default function HomePage() {
  return (
    <main>
      <h1>Snake-Oil-or-Gold Check</h1>
      <p>Coming soon.</p>
    </main>
  );
}
```

`src/app/globals.css`:

```css
:root {
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.5;
  color-scheme: light dark;
}
body {
  margin: 0;
  padding: 2rem;
}
```

- [ ] **Step 2.5: Verify typecheck and lint pass**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && pnpm typecheck && pnpm lint
```

Expected: both pass, no errors.

- [ ] **Step 2.6: Verify dev server boots**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && timeout 30 pnpm dev &
sleep 12
curl -sf http://localhost:3000 | head -5
kill %1 2>/dev/null
```

Expected: HTML response containing `Snake-Oil-or-Gold Check`.

- [ ] **Step 2.7: Commit**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && git add tsconfig.json biome.json next.config.ts src/ && git commit -m "feat: scaffold Next.js 16 App Router + Biome + strict TS"
```

---

## Task 3: Vercel project link + `vercel.ts` + first deploy

**Files:**
- Create: `vercel.ts`
- Create: `.vercelignore`
- Modify: `.gitignore` (already has `.vercel`)

- [ ] **Step 3.1: Authenticate and link Vercel project**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && vercel link --yes --scope neckarshore-ai
```

Expected: `.vercel/project.json` created. Choose: project name `snakeoil-check`, framework `Next.js`, build/output defaults.

- [ ] **Step 3.2: Write `vercel.ts`**

```typescript
import { type VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  buildCommand: 'pnpm build',
  installCommand: 'pnpm install --frozen-lockfile',
  framework: 'nextjs',
  headers: [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    },
  ],
};

export default config;
```

- [ ] **Step 3.3: Write `.vercelignore`**

```
docs
playwright-report
test-results
*.test.ts
*.spec.ts
```

- [ ] **Step 3.4: Verify build runs locally**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && pnpm build
```

Expected: build succeeds, `.next/` created.

- [ ] **Step 3.5: Deploy to Vercel preview**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && vercel --yes
```

Expected: deployment URL printed (e.g., `https://snakeoil-check-xyz-neckarshore-ai.vercel.app`).

- [ ] **Step 3.6: Verify deployment responds**

```bash
DEPLOY_URL=$(cd ~/Developer/projects/neckarshore-ai/snakeoil-check && vercel inspect --token=$VERCEL_TOKEN 2>/dev/null | grep -oE 'https://[^ ]+' | head -1)
echo "Deploy URL: $DEPLOY_URL"
curl -sf "$DEPLOY_URL" | grep -q "Snake-Oil-or-Gold Check"
```

Expected: `0` exit code (grep finds match).

- [ ] **Step 3.7: Commit**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && git add vercel.ts .vercelignore && git commit -m "feat: vercel.ts config + first preview deploy"
```

---

## Task 4: Database — Neon Postgres + Drizzle + users schema + initial migration

**Files:**
- Create: `drizzle.config.ts`
- Create: `src/db/index.ts`
- Create: `src/db/schema.ts`
- Create: `src/db/__tests__/schema.test.ts`
- Create: `drizzle/0000_initial.sql` (generated)

- [ ] **Step 4.1: Provision Neon Postgres via Vercel Marketplace**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && vercel integration add neon
```

Follow prompts: create new Neon project `snakeoil-check`, region `eu-central-1`. Vercel auto-injects `DATABASE_URL` and friends into project env.

- [ ] **Step 4.2: Pull env vars locally**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && vercel env pull .env.local
```

Expected: `.env.local` created with `DATABASE_URL`, `POSTGRES_URL_NON_POOLING`, etc.

- [ ] **Step 4.3: Write `drizzle.config.ts`**

```typescript
import { defineConfig } from 'drizzle-kit';

if (!process.env.POSTGRES_URL_NON_POOLING) {
  throw new Error('POSTGRES_URL_NON_POOLING is required');
}

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL_NON_POOLING,
  },
  strict: true,
  verbose: true,
});
```

- [ ] **Step 4.4: Write `src/db/schema.ts` (users table only — minimum viable schema)**

```typescript
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  emailHash: text('email_hash').notNull().unique(),
  emailPlain: text('email_plain').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
```

- [ ] **Step 4.5: Write `src/db/index.ts` (connection)**

```typescript
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = drizzle(pool, { schema });
export type Db = typeof db;
```

- [ ] **Step 4.6: Write schema unit test**

`src/db/__tests__/schema.test.ts`:

```typescript
import { describe, expect, it } from 'vitest';
import { users } from '../schema';

describe('users table schema', () => {
  it('exposes the expected columns', () => {
    const columnNames = Object.keys(users);
    expect(columnNames).toEqual(
      expect.arrayContaining(['id', 'emailHash', 'emailPlain', 'createdAt', 'lastLoginAt']),
    );
  });

  it('marks emailHash as unique', () => {
    // Drizzle does not expose unique constraints on the runtime object; this test
    // is a placeholder for future schema-shape assertions. Real verification happens
    // via the generated SQL migration.
    expect(users.emailHash).toBeDefined();
  });
});
```

- [ ] **Step 4.7: Run schema test to verify it fails (TDD red phase)**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && pnpm vitest run src/db/__tests__/schema.test.ts
```

Expected: FAIL — vitest config not yet set up. (Resolved in Task 5.) For now we proceed because Task 5 wires Vitest. **Skip this step until Task 5 is complete, then return to verify GREEN.**

- [ ] **Step 4.8: Generate first migration**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && pnpm db:generate
```

Expected: file appears at `drizzle/0000_<name>.sql` containing `CREATE TABLE users`. Inspect:

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && cat drizzle/0000_*.sql
```

Expected SQL contains:
```sql
CREATE TABLE IF NOT EXISTS "users" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "email_hash" text NOT NULL,
    "email_plain" text NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "last_login_at" timestamp with time zone
);
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_hash_unique" ON "users" ("email_hash");
```

- [ ] **Step 4.9: Apply migration to Neon**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && pnpm db:migrate
```

Expected: migration runs without error. Verify with:

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && psql "$POSTGRES_URL_NON_POOLING" -c "\d users"
```

Expected: table description shows all five columns.

- [ ] **Step 4.10: Commit**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && git add drizzle.config.ts src/db/ drizzle/ && git commit -m "feat: drizzle setup + users table + initial migration"
```

---

## Task 5: Vitest setup + first utility unit test (TDD)

**Files:**
- Create: `vitest.config.ts`
- Create: `src/lib/email.ts`
- Create: `src/lib/__tests__/email.test.ts`

- [ ] **Step 5.1: Write `vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'node',
    globals: false,
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'playwright-tests'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/lib/**', 'src/db/**'],
      exclude: ['**/__tests__/**', '**/*.d.ts'],
      thresholds: { lines: 80, functions: 80, branches: 75, statements: 80 },
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
```

- [ ] **Step 5.2: Write the failing test**

`src/lib/__tests__/email.test.ts`:

```typescript
import { describe, expect, it } from 'vitest';
import { hashEmail, normalizeEmail } from '../email';

describe('normalizeEmail', () => {
  it('lowercases and trims', () => {
    expect(normalizeEmail('  Foo@Example.COM  ')).toBe('foo@example.com');
  });

  it('rejects strings without @', () => {
    expect(() => normalizeEmail('notanemail')).toThrow('Invalid email');
  });

  it('rejects empty strings', () => {
    expect(() => normalizeEmail('')).toThrow('Invalid email');
  });
});

describe('hashEmail', () => {
  it('produces a stable SHA-256 hex digest for a normalized email', () => {
    const hash = hashEmail('foo@example.com');
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
    expect(hashEmail('foo@example.com')).toBe(hash);
  });

  it('produces different hashes for different emails', () => {
    expect(hashEmail('a@b.com')).not.toBe(hashEmail('c@d.com'));
  });
});
```

- [ ] **Step 5.3: Run test to verify it fails**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && pnpm test src/lib/__tests__/email.test.ts
```

Expected: FAIL — `Cannot find module '../email'`.

- [ ] **Step 5.4: Write minimal implementation**

`src/lib/email.ts`:

```typescript
import { createHash } from 'node:crypto';

export function normalizeEmail(input: string): string {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed || !trimmed.includes('@')) {
    throw new Error('Invalid email');
  }
  return trimmed;
}

export function hashEmail(normalizedEmail: string): string {
  return createHash('sha256').update(normalizedEmail).digest('hex');
}
```

- [ ] **Step 5.5: Run test to verify it passes**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && pnpm test
```

Expected: all tests PASS (including the schema test from Task 4 Step 4.7).

- [ ] **Step 5.6: Verify coverage report runs**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && pnpm vitest run --coverage
```

Expected: coverage report rendered; `email.ts` shows 100% lines.

- [ ] **Step 5.7: Commit**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && git add vitest.config.ts src/lib/ && git commit -m "feat: vitest + email utils (normalize, hash) with full coverage"
```

---

## Task 6: Playwright setup + first E2E (landing renders)

**Files:**
- Create: `playwright.config.ts`
- Create: `playwright-tests/landing.spec.ts`

- [ ] **Step 6.1: Initialize Playwright (browser binaries)**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && pnpm exec playwright install --with-deps chromium
```

Expected: chromium binaries downloaded.

- [ ] **Step 6.2: Write `playwright.config.ts`**

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './playwright-tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['html'], ['github']] : 'html',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'chromium-mobile', use: { ...devices['iPhone 14'] } },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
```

- [ ] **Step 6.3: Write the failing E2E test**

`playwright-tests/landing.spec.ts`:

```typescript
import { expect, test } from '@playwright/test';

test('landing page renders with expected title and heading', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Snake-Oil-or-Gold Check/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Snake-Oil-or-Gold Check');
});

test('landing page has no console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(errors).toEqual([]);
});
```

- [ ] **Step 6.4: Run E2E (it should now PASS — landing page exists from Task 2)**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && pnpm test:e2e
```

Expected: 4 passes (2 tests × 2 projects).

- [ ] **Step 6.5: Update `.gitignore` to include Playwright outputs**

(`.gitignore` already lists `playwright-report` and `test-results` from initial commit — verify, no edit needed.)

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && grep -E "playwright-report|test-results" .gitignore
```

Expected: both lines present.

- [ ] **Step 6.6: Commit**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && git add playwright.config.ts playwright-tests/ && git commit -m "feat: playwright e2e — landing renders + no console errors"
```

---

## Task 7: Health-check API route + DB-ping smoke

**Files:**
- Create: `src/app/api/health/route.ts`
- Create: `src/app/api/health/__tests__/route.test.ts`
- Create: `playwright-tests/health.spec.ts`

- [ ] **Step 7.1: Write the failing API route test**

`src/app/api/health/__tests__/route.test.ts`:

```typescript
import { describe, expect, it, vi } from 'vitest';

// Mock the db module before importing the route handler
vi.mock('@/db', () => ({
  db: {
    execute: vi.fn().mockResolvedValue({ rows: [{ ok: 1 }] }),
  },
}));

describe('GET /api/health', () => {
  it('returns 200 with status=ok when DB ping succeeds', async () => {
    const { GET } = await import('../route');
    const response = await GET();
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual({ status: 'ok', db: 'reachable' });
  });

  it('returns 503 when DB ping throws', async () => {
    const { db } = await import('@/db');
    vi.mocked(db.execute).mockRejectedValueOnce(new Error('connection refused'));
    const { GET } = await import('../route');
    const response = await GET();
    expect(response.status).toBe(503);
    const body = await response.json();
    expect(body).toEqual({ status: 'degraded', db: 'unreachable' });
  });
});
```

- [ ] **Step 7.2: Run test to verify it fails**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && pnpm test src/app/api/health
```

Expected: FAIL — `Cannot find module '../route'`.

- [ ] **Step 7.3: Implement the route**

`src/app/api/health/route.ts`:

```typescript
import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await db.execute(sql`SELECT 1 AS ok`);
    return NextResponse.json({ status: 'ok', db: 'reachable' });
  } catch {
    return NextResponse.json({ status: 'degraded', db: 'unreachable' }, { status: 503 });
  }
}
```

- [ ] **Step 7.4: Run test to verify it passes**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && pnpm test
```

Expected: all tests PASS, including the two new health tests.

- [ ] **Step 7.5: Write E2E for health endpoint**

`playwright-tests/health.spec.ts`:

```typescript
import { expect, test } from '@playwright/test';

test('GET /api/health returns 200 ok with reachable DB', async ({ request }) => {
  const res = await request.get('/api/health');
  expect(res.status()).toBe(200);
  const json = await res.json();
  expect(json).toEqual({ status: 'ok', db: 'reachable' });
});
```

- [ ] **Step 7.6: Run E2E**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && pnpm test:e2e playwright-tests/health.spec.ts
```

Expected: PASS on both projects.

- [ ] **Step 7.7: Commit**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && git add src/app/api/health/ playwright-tests/health.spec.ts && git commit -m "feat: /api/health with DB ping + unit + e2e coverage"
```

---

## Task 8: GitHub Actions CI

**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `.github/dependabot.yml`

- [ ] **Step 8.1: Write CI workflow**

`.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  validate:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    env:
      DATABASE_URL: ${{ secrets.DATABASE_URL_TEST }}
      POSTGRES_URL_NON_POOLING: ${{ secrets.DATABASE_URL_TEST }}
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: pnpm
      - name: Install
        run: pnpm install --frozen-lockfile
      - name: Lint
        run: pnpm lint
      - name: Typecheck
        run: pnpm typecheck
      - name: Unit tests
        run: pnpm test
      - name: Build
        run: pnpm build

  e2e:
    runs-on: ubuntu-latest
    timeout-minutes: 20
    needs: validate
    env:
      DATABASE_URL: ${{ secrets.DATABASE_URL_TEST }}
      POSTGRES_URL_NON_POOLING: ${{ secrets.DATABASE_URL_TEST }}
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm exec playwright install --with-deps chromium
      - run: pnpm test:e2e
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report
          retention-days: 14
```

- [ ] **Step 8.2: Write Dependabot config**

`.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: "/"
    schedule:
      interval: weekly
      day: monday
    open-pull-requests-limit: 5
    versioning-strategy: increase-if-necessary
    labels:
      - dependencies
  - package-ecosystem: github-actions
    directory: "/"
    schedule:
      interval: monthly
    labels:
      - dependencies
      - github-actions
```

- [ ] **Step 8.3: Add CI test database**

Create a separate Neon branch named `ci-test` in the Neon dashboard (manual step, one-time). Copy its `POSTGRES_URL_NON_POOLING` and add as GitHub repo secret `DATABASE_URL_TEST`:

```bash
gh secret set DATABASE_URL_TEST --repo neckarshore-ai/snakeoil-check
# paste the URL when prompted
```

- [ ] **Step 8.4: Push to main and verify CI passes**

```bash
cd ~/Developer/projects/neckarshore-ai/snakeoil-check && git add .github/ && git commit -m "ci: GitHub Actions — lint, typecheck, test, build, e2e + dependabot" && git push origin main
```

Watch CI:

```bash
gh run watch --repo neckarshore-ai/snakeoil-check
```

Expected: both `validate` and `e2e` jobs green.

- [ ] **Step 8.5: Wire up production deploy on main**

Vercel auto-deploys main when project is linked (Step 3.1). Verify by visiting the project's production URL and curling `/api/health`:

```bash
curl -sf https://snakeoil-check.vercel.app/api/health | jq
```

Expected: `{ "status": "ok", "db": "reachable" }`.

---

## Phase-1 Definition of Done

All of these must hold before Phase 1 is "Done":

- [ ] All 8 tasks committed to main
- [ ] CI green on main (validate + e2e jobs)
- [ ] Vercel production deploy live, `/api/health` returns `{status: ok, db: reachable}`
- [ ] Landing page renders at production URL
- [ ] `pnpm test` shows ≥80% coverage on `src/lib` and `src/db`
- [ ] `pnpm test:e2e` passes 6 tests (3 specs × 2 projects)
- [ ] `pnpm typecheck` and `pnpm lint` exit 0
- [ ] Drizzle migration `0000_initial.sql` applied to Neon production DB
- [ ] User says "PASS" — MASCHIN never auto-marks Phase 1 done

## What Phase 1 Does NOT Do

(Documented to prevent scope creep into Phase 1.)

- No AI / scraping / scoring logic — that is Phase 2
- No Stripe / payments — Phase 4
- No magic-link auth — Phase 4
- No real landing content — placeholder only (final copy is Phase 3)
- No Imprint / Privacy / Terms — Phase 7
- No monitoring / Sentry — Phase 7

## Build-Sequence Pointer

After Phase 1 Done: write `phase-2-ai-workflow.md` from stub. Scope: scraping module (`fetch` + `cheerio`), Vercel AI Gateway client, scoring rubric encoded in TypeScript (12 criteria + weights from `docs/scoring-framework.md`), Vercel Workflow setup with 5 steps (scrape → classify → analyze → aggregate → notify). End-state: one test URL runs end-to-end and produces a saved `Check` row with `criterion_scores`.

## References

- Spec: [`../specs/2026-05-18-snakeoil-check-mmp-design.md`](../specs/2026-05-18-snakeoil-check-mmp-design.md)
- Scoring detail: [`../../scoring-framework.md`](../../scoring-framework.md)
- Roadmap: [`../../roadmap.md`](../../roadmap.md)
- Decisions: [`../../decisions.md`](../../decisions.md)

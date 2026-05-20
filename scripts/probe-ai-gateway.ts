/**
 * AI-Gateway probe — Step 1.5 of Phase 2 plan.
 *
 * Smoke-tests the path: code → @ai-sdk/anthropic → AI Gateway (in Vercel env)
 * → Anthropic Claude Sonnet 4.5 → text.
 *
 * Locally (no Gateway): calls Anthropic API directly via ANTHROPIC_API_KEY.
 * In Vercel runtime (with AI Gateway enabled): routes transparently through
 * Gateway via VERCEL_OIDC_TOKEN regardless of the SDK shape used here.
 *
 * Pre-conditions:
 *   - ANTHROPIC_API_KEY in env (locally via .env.local, in prod via Vercel project env)
 *   - For Gateway routing in prod: VERCEL_OIDC_TOKEN auto-injected by Vercel
 *
 * Exit codes:
 *   0 = OK (Sonnet returned "OK")
 *   1 = anything else (network, key, model, parsing)
 *
 * Run: pnpm tsx scripts/probe-ai-gateway.ts
 */

import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

async function main() {
  const { text } = await generateText({
    model: anthropic('claude-sonnet-4.5'),
    prompt: 'Return exactly the word OK and nothing else.',
    temperature: 0,
  });
  const ok = text.trim() === 'OK';
  console.log(JSON.stringify({ ok, raw: text }));
  if (!ok) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(JSON.stringify({ ok: false, error: String(err) }));
  process.exit(1);
});

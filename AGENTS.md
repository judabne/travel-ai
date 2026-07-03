# Travel AI Project Guidelines

## 🔐 API Key Safety (IMPORTANT)

- NEVER expose secret API keys in the frontend.
- NEVER use `NEXT_PUBLIC_*` for sensitive environment variables.
- The OpenAI API key must only be used in server-side code (Next.js API routes).

## Correct pattern

- Store secrets in `.env.local`
- Access them only via `process.env.OPENAI_API_KEY`
- Use API routes in `/app/api/*` for all AI calls

## ❌ Do NOT do

- Calling OpenAI directly from React components
- Putting API keys in client-side code
- Using NEXT_PUBLIC_OPENAI_API_KEY or any NEXT_PUBLIC_* env vars for secrets

## ✅ Do

- Use Next.js API routes (`app/api/recommend/route.ts`)
- Keep all external API calls server-side
- Return only safe JSON to the frontend

## Goal

Keep all sensitive logic and credentials on the server. The frontend should only request data from internal APIs.
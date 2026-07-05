 ## 🔐 API Key Safety (CRITICAL)

### Exposure prevention
- [ ] NEVER expose API keys in frontend code
- [ ] NEVER use `NEXT_PUBLIC_*` for any secret or API key
- [ ] Ensure `.env.local` is not committed to Git

### Correct architecture
- [ ] All API calls must happen in Next.js server-side routes (`/app/api/*`)
- [ ] Frontend must only call internal API endpoints (never external AI APIs directly)
- [ ] API keys must only be accessed via `process.env`

### Code safety rules
- [ ] No hardcoded secrets in components, hooks, or utilities
- [ ] No logging of environment variables in client-side code
- [ ] Avoid passing sensitive values to the browser in props or JSON responses

### Environment setup
- [ ] Maintain `.env.example` with placeholders only
- [ ] Use `.env.local` for development secrets
- [ ] Ensure `.gitignore` includes:
  - .env
  - .env.local
  - .env.*.local

### Runtime checks (recommended)
- [ ] Validate API key exists on server startup:
  ```ts
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
  }
  ```

### Deployment safety (Vercel or similar)
 Store API keys only in platform environment variables
 Never copy .env.local to production builds
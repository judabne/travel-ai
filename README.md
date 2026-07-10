This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment setup

Create your local environmant file:
```
cp .env.example .env.local
```

Then fill in your values inside `.env.local`
```
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scoring

Recommendations come from the LLM; final scores are computed on the server.

### LLM
- Picks 4 destinations and returns per country: `summary`, `estimatedCost`, `visitorSatisfactionScore`, `infrastructureScore`, and `interestMatch` scores
- Writes the top-level `insight`
- `infrastructureScore` is general by default; if **current country** is set, it reflects ease of travel from that country
- If **prioritize visa-friendly destinations** is checked (with nationality), selection favors easier-visa countries

### Server
- **Budget** — from `estimatedCost` vs stay budget
- **Interest** — average of the LLM’s `interestMatch` scores
- **Visa** — looked up locally from passport-index data (not the LLM), scored at request time using trip duration
  - No nationality → average visa score per destination for the selected duration (no visa guidance text)
  - Nationality set → nationality × destination lookup; visa-free day allowances score 100 only when allowed days ≥ trip duration
- **Travel ease** — `visa × 0.6 + infrastructure × 0.4`
- **Overall** — `budget × 0.25 + interest × 0.35 + travel ease × 0.25 + visitor satisfaction × 0.15`

### Visa data

Visa scores read from `src/lib/server/data/visaPairLookup.json` — a static snapshot of passport-index requirements, not the LLM. That keeps scoring factual and fast without an external API on every request.

To refresh the data after policy changes, download [passport-index-tidy.csv](https://github.com/ilyankou/passport-index-dataset/blob/master/passport-index-tidy.csv) and run:

```bash
node scripts/generateVisaData.mjs path/to/passport-index-tidy.csv
```

Commit the updated `visaPairLookup.json`. The script is build-time only; production never runs it.

## To do next

- Factor travel costs (flights, trains, etc.) into the stay budget when scoring and recommending destinations

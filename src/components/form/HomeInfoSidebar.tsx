import { SectionCard } from "@/components/layout/SectionCard";

const HOW_IT_WORKS = [
  "Enter interests and preferences",
  "Optionally add location and nationality for travel ease and visa fit",
  "We score destinations",
  "Compare countries across different dimensions",
];

const WHAT_YOU_GET = [
  "Ranked countries",
  "Metric breakdown",
  "Interactive charts",
  "AI travel insight",
];

const WHAT_WE_SCORE = [
  "Interest match",
  "Budget fit",
  "Travel ease",
  "Visitor satisfaction",
];

export function HomeInfoSidebar() {
  return (
    <div className="min-w-0 space-y-6 lg:sticky lg:top-6 lg:self-start">
      <SectionCard title="How it works">
        <ol className="list-decimal space-y-2 pl-4 text-sm text-slate-700">
          {HOW_IT_WORKS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </SectionCard>

      <SectionCard title="What you'll get">
        <ul className="space-y-2 text-sm text-slate-700">
          {WHAT_YOU_GET.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
              {item}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="What we score">
        <ul className="space-y-2 text-sm text-slate-700">
          {WHAT_WE_SCORE.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
              {item}
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}

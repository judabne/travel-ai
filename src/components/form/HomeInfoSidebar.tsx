import { SectionCard } from "@/components/layout/SectionCard";

const HOW_IT_WORKS = [
  "Enter preferences",
  "We score destinations",
  "Compare countries across 5 dimensions",
];

const WHAT_YOU_GET = [
  "Ranked countries",
  "Score breakdown",
  "Visual charts",
  "Travel insights",
];

const EXAMPLE_OUTPUT = [
  { country: "Georgia", match: "Budget + Hiking" },
  { country: "Turkey", match: "Food + Culture" },
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

      <SectionCard title="Example output">
        <ul className="space-y-3 text-sm">
          {EXAMPLE_OUTPUT.map(({ country, match }) => (
            <li key={country} className="text-slate-700">
              <span className="font-medium text-slate-900">{country}</span>
              <span className="text-slate-400"> → </span>
              {match}
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}

interface InsightBoxProps {
  insight: string;
}

export function InsightBox({ insight }: InsightBoxProps) {
  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
        Top Insight
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">
        &ldquo;{insight}&rdquo;
      </p>
    </div>
  );
}

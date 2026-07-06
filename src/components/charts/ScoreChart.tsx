"use client";

import { BaseChart } from "@/components/charts/BaseChart";
import { extractChartData } from "@/lib/chartHelpers";
import type { CountryResult, ScoreMetric } from "@/types/travel";

interface ScoreChartProps {
  results: CountryResult[];
  metric: ScoreMetric;
  title: string;
  highlight?: boolean;
  onCountryClick?: (index: number) => void;
}

export function ScoreChart({
  results,
  metric,
  title,
  highlight = false,
  onCountryClick,
}: ScoreChartProps) {
  const { labels, values } = extractChartData(results, metric);
  const getTooltipLabel =
    metric === "budget"
      ? (index: number) =>
          `Estimated cost: $${results[index].estimatedCost.toLocaleString()}`
      : undefined;

  return (
    <BaseChart
      title={title}
      labels={labels}
      values={values}
      onBarClick={onCountryClick}
      highlight={highlight}
      getTooltipLabel={getTooltipLabel}
    />
  );
}

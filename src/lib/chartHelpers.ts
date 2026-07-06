import type { ChartData, ChartOptions } from "chart.js";
import type { CountryResult, ScoreChartData, ScoreMetric } from "@/types/travel";
import {
  PRIMARY_COLOR,
  SCORE_BAD,
  SCORE_GOOD,
  SCORE_NEUTRAL,
} from "@/lib/constants";

export function getScoreColor(score: number): string {
  if (score >= 80) return SCORE_GOOD;
  if (score >= 60) return SCORE_NEUTRAL;
  return SCORE_BAD;
}

export function extractChartData(
  results: CountryResult[],
  metric: ScoreMetric
): ScoreChartData {
  return {
    labels: results.map((result) => result.country),
    values: results.map((result) => result.scores[metric]),
  };
}

export function buildBarChartData(
  labels: string[],
  values: number[]
): ChartData<"bar", number[], string> {
  return {
    labels,
    datasets: [
      {
        label: "Score",
        data: values,
        backgroundColor: values.map(getScoreColor),
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };
}

export function buildChartOptions(
  title: string,
  onBarClick?: (index: number) => void,
  getTooltipLabel?: (index: number) => string | string[],
  tooltipDisplayColors = true
): ChartOptions<"bar"> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: title,
        font: { size: 14, weight: "bold" },
        color: "#334155",
        padding: { bottom: 16 },
      },
      tooltip: {
        displayColors: tooltipDisplayColors,
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            if (getTooltipLabel && index >= 0) {
              return getTooltipLabel(index);
            }
            return `Score: ${context.parsed.y}/100`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#64748b", font: { size: 12 } },
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: "#e2e8f0" },
        ticks: {
          stepSize: 20,
          color: "#64748b",
          font: { size: 11 },
        },
      },
    },
    onClick: (_event, elements) => {
      if (elements.length > 0 && onBarClick) {
        onBarClick(elements[0].index);
      }
    },
    onHover: (event, elements) => {
      const target = event.native?.target as HTMLElement | undefined;
      if (target) {
        target.style.cursor = elements.length > 0 ? "pointer" : "default";
      }
    },
  };
}

export function getPrimaryBarOptions(
  title: string,
  onBarClick?: (index: number) => void,
  getTooltipLabel?: (index: number) => string | string[],
  tooltipDisplayColors = true
): ChartOptions<"bar"> {
  const options = buildChartOptions(
    title,
    onBarClick,
    getTooltipLabel,
    tooltipDisplayColors
  );
  if (options.plugins?.title) {
    options.plugins.title.color = PRIMARY_COLOR;
  }
  return options;
}

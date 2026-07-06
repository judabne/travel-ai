"use client";

import { useEffect, useRef } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";
import {
  buildBarChartData,
  buildChartOptions,
  getPrimaryBarOptions,
} from "@/lib/chartHelpers";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface BaseChartProps {
  title: string;
  labels: string[];
  values: number[];
  options?: ChartOptions<"bar">;
  onBarClick?: (index: number) => void;
  highlight?: boolean;
  getTooltipLabel?: (index: number) => string;
}

export function BaseChart({
  title,
  labels,
  values,
  options,
  onBarClick,
  highlight = false,
  getTooltipLabel,
}: BaseChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ChartJS<"bar">>(null);
  const chartData = buildBarChartData(labels, values);
  const chartOptions =
    options ??
    (highlight
      ? getPrimaryBarOptions(title, onBarClick, getTooltipLabel)
      : buildChartOptions(title, onBarClick, getTooltipLabel));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const observer = new ResizeObserver(() => {
      chartRef.current?.resize();
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-64 w-full min-w-0">
      <Bar ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  );
}

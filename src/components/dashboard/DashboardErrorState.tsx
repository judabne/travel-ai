import { SectionCard } from "@/components/layout/SectionCard";

interface DashboardErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function DashboardErrorState({
  message,
  onRetry,
}: DashboardErrorStateProps) {
  return (
    <SectionCard className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-semibold text-slate-900">
        Couldn&apos;t load recommendations
      </h2>
      <p className="mt-3 max-w-md text-base text-red-600">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Try again
      </button>
    </SectionCard>
  );
}

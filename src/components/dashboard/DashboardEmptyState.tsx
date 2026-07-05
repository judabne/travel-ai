import Link from "next/link";
import { SectionCard } from "@/components/layout/SectionCard";

export function DashboardEmptyState() {
  return (
    <SectionCard className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-semibold text-slate-900">
        No travel preferences yet
      </h2>
      <p className="mt-3 max-w-md text-base text-slate-600">
        You haven&apos;t selected your interests, budget, or trip details. Head
        to the home page to set your preferences and generate matches.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Go to home page
      </Link>
    </SectionCard>
  );
}

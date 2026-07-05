import { Skeleton } from "@/components/layout/Skeleton";
import { SectionCard } from "@/components/layout/SectionCard";
import { TwoColumnLayout } from "@/components/layout/TwoColumnLayout";

function FilterRowSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-4 w-28" />
    </div>
  );
}

function ChartCardSkeleton() {
  return (
    <SectionCard className="min-w-0">
      <Skeleton className="mb-4 h-4 w-40" />
      <Skeleton className="h-64 w-full" />
    </SectionCard>
  );
}

function InterestCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <Skeleton className="mb-5 h-5 w-32" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 flex-1" />
            <Skeleton className="h-4 w-8" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <>
      <SectionCard title="Selected Countries" className="mb-8">
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-28 rounded-lg" />
          ))}
        </div>
      </SectionCard>

      <TwoColumnLayout
        sidebar={
          <div className="min-w-0 space-y-6">
            <SectionCard title="Filters">
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FilterRowSkeleton key={index} />
                ))}
              </div>
              <Skeleton className="mt-6 h-10 w-full" />
            </SectionCard>

            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <Skeleton className="mb-3 h-3 w-20" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-4/5" />
            </div>
          </div>
        }
      >
        <div className="space-y-6">
          <ChartCardSkeleton />

          <div className="grid min-w-0 gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <ChartCardSkeleton key={index} />
            ))}
          </div>

          <SectionCard>
            <Skeleton className="mb-2 h-6 w-56" />
            <Skeleton className="mb-6 h-4 w-72" />
            <div className="grid min-w-0 gap-6 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <InterestCardSkeleton key={index} />
              ))}
            </div>
          </SectionCard>
        </div>
      </TwoColumnLayout>
    </>
  );
}

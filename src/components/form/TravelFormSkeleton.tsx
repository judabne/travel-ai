import { Skeleton } from "@/components/layout/Skeleton";
import { SectionCard } from "@/components/layout/SectionCard";

export function TravelFormSkeleton() {
  return (
    <div className="space-y-4 md:space-y-8" aria-busy="true" aria-label="Loading form">
      <SectionCard title="Interests">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-24 rounded-full" />
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-24 rounded-full" />
            ))}
          </div>
        </div>
      </SectionCard>

      {Array.from({ length: 4 }).map((_, index) => (
        <SectionCard key={index}>
          <Skeleton className="h-10 w-full" />
        </SectionCard>
      ))}

      <div className="flex justify-center pt-4">
        <Skeleton className="h-12 w-44 rounded-lg" />
      </div>
    </div>
  );
}

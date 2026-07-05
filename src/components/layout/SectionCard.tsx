import { ReactNode } from "react";

interface SectionCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function SectionCard({ title, children, className = "" }: SectionCardProps) {
  return (
    <section
      className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}
    >
      {title && (
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

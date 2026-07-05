import { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function AppShell({ children, title, subtitle }: AppShellProps) {
  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50">
      <div className="mx-auto min-w-0 max-w-7xl px-6 py-10">
        {(title || subtitle) && (
          <header className="mb-10">
            {title && (
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-2 text-base text-slate-600">{subtitle}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </div>
  );
}

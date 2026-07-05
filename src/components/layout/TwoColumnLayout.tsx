import { ReactNode } from "react";

interface TwoColumnLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function TwoColumnLayout({ sidebar, children }: TwoColumnLayoutProps) {
  return (
    <div className="grid min-w-0 gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
      <main className="min-w-0 lg:col-start-2 lg:row-start-1">{children}</main>
      <aside className="min-w-0 lg:col-start-1 lg:row-start-1">{sidebar}</aside>
    </div>
  );
}

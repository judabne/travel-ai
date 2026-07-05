import { AppShell } from "@/components/layout/AppShell";
import { HomeInfoSidebar } from "@/components/form/HomeInfoSidebar";
import { TravelForm } from "@/components/form/TravelForm";
import { TwoColumnLayout } from "@/components/layout/TwoColumnLayout";

export default function Home() {
  return (
    <AppShell
      title="AI Travel Planner"
      subtitle="Find your best destination based on data"
    >
      <TwoColumnLayout sidebar={<HomeInfoSidebar />}>
        <TravelForm />
      </TwoColumnLayout>
    </AppShell>
  );
}

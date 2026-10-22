import { getForms, getDashboardStats } from "@/lib/data-store";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricCards from "@/components/dashboard/MetricCards";
import FormList from "@/components/dashboard/FormList";

export const metadata = {
  title: "Dashboard | Chatbot Form Builder",
  description: "Manage your conversational forms, track live submissions, and customize widgets.",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [forms, stats] = await Promise.all([
    getForms(),
    getDashboardStats(),
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <DashboardHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100">
              Form Overview & Analytics
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Create conversational forms, embed floating widgets, and review collected responses.
            </p>
          </div>
        </div>

        {/* Aggregated Analytics Metric Cards */}
        <MetricCards stats={stats} />

        {/* Forms Management Section */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-100">
              Your Chatbot Forms ({forms.length})
            </h2>
          </div>

          <FormList initialForms={forms} />
        </div>
      </main>
    </div>
  );
}

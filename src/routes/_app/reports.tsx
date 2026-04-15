import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../../components/PageHeader";
import StatsCard from "../../components/StatsCard";

export const Route = createFileRoute("/_app/reports")({
  component: ReportsPage,
});

const reportCards = [
  { title: "Student Performance Report", description: "Class-wise and subject-wise analysis of student marks and grades", icon: "📊" },
  { title: "Attendance Report", description: "Monthly and yearly attendance reports for all classes", icon: "✅" },
  { title: "Fee Collection Report", description: "Summary of fee collection, pending payments and defaulters", icon: "💰" },
  { title: "Exam Results Report", description: "Detailed exam results with pass/fail analysis and toppers", icon: "📝" },
  { title: "Teacher Workload Report", description: "Analysis of teacher assignments, periods and responsibilities", icon: "👩‍🏫" },
  { title: "Library Report", description: "Books issued, returned, overdue and inventory status", icon: "📖" },
];

function ReportsPage() {
  return (
    <div>
      <PageHeader title="Reports" description="Generate and view analytical reports" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reportCards.map((report, i) => (
          <div key={i} className="group cursor-pointer rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl">
              {report.icon}
            </div>
            <h3 className="text-base font-semibold text-card-foreground group-hover:text-primary transition-colors">{report.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{report.description}</p>
            <p className="mt-3 text-sm font-medium text-primary">Generate Report →</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Quick Stats</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Average Attendance" value="94.2%" icon="✅" change="This month" changeType="positive" />
          <StatsCard title="Pass Rate" value="91.5%" icon="📈" change="Last exam cycle" changeType="positive" />
          <StatsCard title="Fee Recovery" value="87.3%" icon="💰" change="This quarter" changeType="neutral" />
          <StatsCard title="Library Usage" value="68%" icon="📖" change="Active borrowers" changeType="positive" />
        </div>
      </div>
    </div>
  );
}

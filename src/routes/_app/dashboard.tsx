import { createFileRoute } from "@tanstack/react-router";
import StatsCard from "../../components/StatsCard";
import DataTable from "../../components/DataTable";
import PageHeader from "../../components/PageHeader";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [
      { title: "Dashboard — SchoolSphere" },
      { name: "description", content: "Overview of school statistics and recent activities." },
    ],
  }),
});

const recentActivities = [
  { id: 1, activity: "New student Priya Sharma enrolled in Class 10-A", time: "2 hours ago", type: "enrollment" },
  { id: 2, activity: "Math exam results published for Class 9-B", time: "3 hours ago", type: "exam" },
  { id: 3, activity: "Fee payment received from Rahul Verma — ₹15,000", time: "5 hours ago", type: "fee" },
  { id: 4, activity: "Library book 'Physics Vol. 2' issued to Anita Das", time: "6 hours ago", type: "library" },
  { id: 5, activity: "Teacher Mrs. Gupta marked attendance for Class 8-C", time: "7 hours ago", type: "attendance" },
];

const upcomingEvents = [
  { id: 1, event: "Annual Sports Day", date: "Apr 20, 2026", status: "Upcoming" },
  { id: 2, event: "Mid-Term Examinations", date: "Apr 25, 2026", status: "Scheduled" },
  { id: 3, event: "Parent-Teacher Meeting", date: "May 02, 2026", status: "Planning" },
  { id: 4, event: "Science Exhibition", date: "May 10, 2026", status: "Upcoming" },
];

function DashboardPage() {
  return (
    <div>
      <PageHeader title="Dashboard" description="Welcome back, Admin. Here's what's happening today." />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Students" value="1,247" icon="🎓" change="+12 this month" changeType="positive" />
        <StatsCard title="Total Teachers" value="86" icon="👩‍🏫" change="+3 this month" changeType="positive" />
        <StatsCard title="Total Classes" value="42" icon="🏫" change="Same as last month" changeType="neutral" />
        <StatsCard title="Fee Collection" value="₹12.5L" icon="💰" change="+8% from last month" changeType="positive" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-card-foreground">Recent Activities</h2>
          <div className="space-y-3">
            {recentActivities.map((item) => (
              <div key={item.id} className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted/30 transition-colors">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm">
                  {item.type === "enrollment" ? "🎓" : item.type === "exam" ? "📝" : item.type === "fee" ? "💰" : item.type === "library" ? "📖" : "✅"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-card-foreground">{item.activity}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-card-foreground">Upcoming Events</h2>
          <div className="space-y-3">
            {upcomingEvents.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-card-foreground">{item.event}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatsCard title="Attendance Today" value="94.2%" icon="✅" change="+1.2% from yesterday" changeType="positive" />
        <StatsCard title="Pending Fees" value="₹3.2L" icon="⏳" change="23 students" changeType="negative" />
        <StatsCard title="Books Issued" value="342" icon="📖" change="18 overdue" changeType="warning" />
      </div>
    </div>
  );
}

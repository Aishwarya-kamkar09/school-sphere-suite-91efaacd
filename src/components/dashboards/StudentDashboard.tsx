import { useState, useEffect } from "react";
import PageHeader from "../PageHeader";
import StatsCard from "../StatsCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [student, setStudent] = useState<any>(null);
  const [attendanceCount, setAttendanceCount] = useState({ present: 0, total: 0 });

  useEffect(() => {
    if (!user) return;
    // Try to find student linked to this user
    supabase.from("students").select("*").eq("user_id", user.id).maybeSingle().then(({ data }) => {
      setStudent(data);
      if (data) {
        supabase.from("attendance_records").select("status").eq("student_id", data.id).then(({ data: att }) => {
          const total = att?.length ?? 0;
          const present = att?.filter((a) => a.status === "present").length ?? 0;
          setAttendanceCount({ present, total });
        });
      }
    });
  }, [user]);

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || "Student";
  const attendancePercent = attendanceCount.total > 0
    ? Math.round((attendanceCount.present / attendanceCount.total) * 100)
    : 0;

  return (
    <div>
      <PageHeader title="Student Dashboard" description={`Welcome, ${displayName}. Here's your academic overview.`} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="My Class" value={student ? `${student.class}-${student.section}` : "N/A"} icon="🏫" change={student?.usn || ""} changeType="neutral" />
        <StatsCard title="Attendance" value={`${attendancePercent}%`} icon="✅" change={`${attendanceCount.present}/${attendanceCount.total} days`} changeType={attendancePercent >= 90 ? "positive" : "warning"} />
        <StatsCard title="Pending Fees" value="₹0" icon="💰" change="All paid" changeType="positive" />
        <StatsCard title="Library Books" value="2" icon="📖" change="None overdue" changeType="positive" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-card-foreground">Upcoming Exams</h2>
          <div className="space-y-3">
            {["Mathematics — Apr 25", "Physics — Apr 27", "English — Apr 29"].map((exam, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
                <p className="text-sm text-card-foreground">{exam}</p>
                <span className="rounded-full bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning">Upcoming</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-card-foreground">Recent Homework</h2>
          <div className="space-y-3">
            {[
              { subject: "Math", title: "Quadratic Equations", due: "Apr 18" },
              { subject: "Physics", title: "Newton's Laws", due: "Apr 17" },
              { subject: "English", title: "Essay Writing", due: "Apr 19" },
            ].map((hw, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-card-foreground">{hw.subject}: {hw.title}</p>
                  <p className="text-xs text-muted-foreground">Due: {hw.due}</p>
                </div>
                <span className="rounded-full bg-info/10 px-2.5 py-0.5 text-xs font-medium text-info">Pending</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

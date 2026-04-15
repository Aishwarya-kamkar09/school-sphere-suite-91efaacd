import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "../../integrations/supabase/client";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import StudentSearch from "../../components/StudentSearch";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/_app/students")({
  component: StudentsPage,
  head: () => ({
    meta: [
      { title: "Students — SchoolSphere" },
      { name: "description", content: "Manage student records, enrollments and profiles." },
    ],
  }),
});

function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("students")
      .select("*")
      .order("class")
      .order("roll_no");
    setStudents(data ?? []);
    setLoading(false);
  };

  const activeCount = students.filter((s) => s.status === "Active").length;
  const inactiveCount = students.filter((s) => s.status !== "Active").length;

  return (
    <div>
      <PageHeader
        title="Students"
        description="Manage all student records and enrollments"
        actions={<Button>+ Add Student</Button>}
      />

      <div className="mb-4">
        <StudentSearch />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-primary">{students.length}</p>
          <p className="text-xs text-muted-foreground">Total Students</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-success">{activeCount}</p>
          <p className="text-xs text-muted-foreground">Active</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-warning">0</p>
          <p className="text-xs text-muted-foreground">New This Month</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-destructive">{inactiveCount}</p>
          <p className="text-xs text-muted-foreground">Inactive</p>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-sm text-muted-foreground">Loading students...</div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">USN</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Class</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Roll No</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Gender</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Phone</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground">{s.usn}</td>
                    <td className="px-4 py-3 font-medium text-card-foreground">{s.name}</td>
                    <td className="px-4 py-3">{s.class}-{s.section}</td>
                    <td className="px-4 py-3">{s.roll_no}</td>
                    <td className="px-4 py-3">{s.gender}</td>
                    <td className="px-4 py-3">{s.phone || "—"}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={s.status} variant={s.status === "Active" ? "success" : "destructive"} />
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to="/students/$studentId"
                        params={{ studentId: s.id }}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        View Profile
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

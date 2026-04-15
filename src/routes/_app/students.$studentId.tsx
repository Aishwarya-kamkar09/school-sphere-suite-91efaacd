import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "../../integrations/supabase/client";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";

export const Route = createFileRoute("/_app/students/$studentId")({
  component: StudentProfilePage,
});

function StudentProfilePage() {
  const { studentId } = Route.useParams();
  const [student, setStudent] = useState<any>(null);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: s } = await supabase.from("students").select("*").eq("id", studentId).maybeSingle();
      setStudent(s);
      if (s) {
        const { data: att } = await supabase.from("attendance_records").select("*").eq("student_id", s.id).order("date", { ascending: false }).limit(30);
        setAttendance(att ?? []);
      }
      setLoading(false);
    })();
  }, [studentId]);

  if (loading) return <div className="flex min-h-[50vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>;
  if (!student) return <div className="flex min-h-[50vh] items-center justify-center"><p className="text-muted-foreground">Student not found</p></div>;

  const totalAtt = attendance.length;
  const presentAtt = attendance.filter((a) => a.status === "present").length;
  const attPercent = totalAtt > 0 ? Math.round((presentAtt / totalAtt) * 100) : 0;

  const grades = [
    { subject: "Mathematics", marks: 87, total: 100, grade: "A" },
    { subject: "Physics", marks: 78, total: 100, grade: "B+" },
    { subject: "Chemistry", marks: 82, total: 100, grade: "A" },
    { subject: "English", marks: 90, total: 100, grade: "A+" },
    { subject: "Hindi", marks: 75, total: 100, grade: "B+" },
    { subject: "Computer Science", marks: 95, total: 100, grade: "A+" },
  ];

  const fees = [
    { term: "Term 1", amount: "₹15,000", paid: "₹15,000", status: "Paid" },
    { term: "Term 2", amount: "₹15,000", paid: "₹15,000", status: "Paid" },
    { term: "Term 3", amount: "₹15,000", paid: "₹10,000", status: "Partial" },
  ];

  const libraryBooks = [
    { title: "Physics Vol. 2", author: "H.C. Verma", due: "Apr 19, 2026", status: "Active" },
    { title: "Mathematics NCERT", author: "NCERT", due: "Apr 03, 2026", status: "Returned" },
  ];

  return (
    <div>
      <PageHeader title="Student Profile" description={`Detailed profile for ${student.name}`} />

      <div className="mb-6 rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-start gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary">{student.name.charAt(0)}</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-card-foreground">{student.name}</h2>
            <p className="text-sm text-muted-foreground">USN: {student.usn}</p>
            <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-4">
              <div><span className="text-xs text-muted-foreground">Class</span><p className="text-sm font-medium">{student.class}-{student.section}</p></div>
              <div><span className="text-xs text-muted-foreground">Roll No</span><p className="text-sm font-medium">{student.roll_no}</p></div>
              <div><span className="text-xs text-muted-foreground">Gender</span><p className="text-sm font-medium">{student.gender}</p></div>
              <div><span className="text-xs text-muted-foreground">Status</span><p className="text-sm"><StatusBadge status={student.status} variant={student.status === "Active" ? "success" : "destructive"} /></p></div>
              <div><span className="text-xs text-muted-foreground">Phone</span><p className="text-sm font-medium">{student.phone || "N/A"}</p></div>
              <div><span className="text-xs text-muted-foreground">Guardian</span><p className="text-sm font-medium">{student.guardian_name || "N/A"}</p></div>
              <div><span className="text-xs text-muted-foreground">Guardian Phone</span><p className="text-sm font-medium">{student.guardian_phone || "N/A"}</p></div>
              <div><span className="text-xs text-muted-foreground">Admission</span><p className="text-sm font-medium">{student.admission_date || "N/A"}</p></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
          <p className={`text-2xl font-bold ${attPercent >= 90 ? "text-success" : attPercent >= 75 ? "text-warning" : "text-destructive"}`}>{attPercent}%</p>
          <p className="text-xs text-muted-foreground">Attendance</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-primary">84.5%</p>
          <p className="text-xs text-muted-foreground">Avg Grade</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-success">₹40,000</p>
          <p className="text-xs text-muted-foreground">Fees Paid</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-info">1</p>
          <p className="text-xs text-muted-foreground">Books Issued</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-card-foreground">Attendance History</h3>
          {attendance.length === 0 ? <p className="text-sm text-muted-foreground">No attendance records yet</p> : (
            <div className="max-h-64 overflow-y-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border"><th className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground">Date</th><th className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground">Status</th></tr></thead>
                <tbody>{attendance.map((a) => (
                  <tr key={a.id} className="border-b border-border last:border-0">
                    <td className="px-3 py-2">{new Date(a.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                    <td className="px-3 py-2"><StatusBadge status={a.status === "present" ? "Present" : "Absent"} variant={a.status === "present" ? "success" : "destructive"} /></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-card-foreground">Exam Grades</h3>
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border"><th className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground">Subject</th><th className="px-3 py-2 text-center text-xs font-semibold text-muted-foreground">Marks</th><th className="px-3 py-2 text-center text-xs font-semibold text-muted-foreground">Grade</th></tr></thead>
            <tbody>{grades.map((g, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-medium">{g.subject}</td>
                <td className="px-3 py-2 text-center">{g.marks}/{g.total}</td>
                <td className="px-3 py-2 text-center"><StatusBadge status={g.grade} variant={g.marks >= 85 ? "success" : g.marks >= 70 ? "info" : "warning"} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-card-foreground">Fee History</h3>
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border"><th className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground">Term</th><th className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground">Amount</th><th className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground">Paid</th><th className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground">Status</th></tr></thead>
            <tbody>{fees.map((f, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-medium">{f.term}</td><td className="px-3 py-2">{f.amount}</td><td className="px-3 py-2">{f.paid}</td>
                <td className="px-3 py-2"><StatusBadge status={f.status} variant={f.status === "Paid" ? "success" : "warning"} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-card-foreground">Library Books</h3>
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border"><th className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground">Title</th><th className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground">Due</th><th className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground">Status</th></tr></thead>
            <tbody>{libraryBooks.map((b, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-3 py-2"><p className="font-medium">{b.title}</p><p className="text-xs text-muted-foreground">{b.author}</p></td>
                <td className="px-3 py-2">{b.due}</td>
                <td className="px-3 py-2"><StatusBadge status={b.status} variant={b.status === "Active" ? "info" : "success"} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

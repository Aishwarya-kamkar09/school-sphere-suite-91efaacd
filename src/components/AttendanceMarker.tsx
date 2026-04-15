import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";

interface Student {
  id: string;
  name: string;
  usn: string;
  roll_no: number;
  attendance?: "present" | "absent";
}

export default function AttendanceMarker() {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSection, setSelectedSection] = useState("A");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const classes = ["8", "9", "10", "11"];
  const sections = ["A", "B"];

  useEffect(() => {
    loadStudents();
  }, [selectedClass, selectedSection]);

  const loadStudents = async () => {
    setLoading(true);
    setSaved(false);
    const { data } = await supabase
      .from("students")
      .select("id, name, usn, roll_no")
      .eq("class", selectedClass)
      .eq("section", selectedSection)
      .eq("status", "Active")
      .order("roll_no");

    const today = new Date().toISOString().split("T")[0];
    const { data: existingAtt } = await supabase
      .from("attendance_records")
      .select("student_id, status")
      .eq("class", `${selectedClass}-${selectedSection}`)
      .eq("date", today);

    const attMap = new Map(existingAtt?.map((a) => [a.student_id, a.status]) ?? []);

    setStudents(
      (data ?? []).map((s) => ({
        ...s,
        attendance: (attMap.get(s.id) as "present" | "absent") ?? undefined,
      }))
    );
    setLoading(false);
  };

  const toggleAttendance = (studentId: string, status: "present" | "absent") => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, attendance: status } : s))
    );
    setSaved(false);
  };

  const markAll = (status: "present" | "absent") => {
    setStudents((prev) => prev.map((s) => ({ ...s, attendance: status })));
    setSaved(false);
  };

  const saveAttendance = async () => {
    setSaving(true);
    const today = new Date().toISOString().split("T")[0];
    const classLabel = `${selectedClass}-${selectedSection}`;

    const records = students
      .filter((s) => s.attendance)
      .map((s) => ({
        student_id: s.id,
        class: classLabel,
        date: today,
        status: s.attendance!,
        marked_by: user?.id,
      }));

    // Upsert attendance
    const { error } = await supabase
      .from("attendance_records")
      .upsert(records, { onConflict: "student_id,date" });

    if (!error) setSaved(true);
    setSaving(false);
  };

  const markedCount = students.filter((s) => s.attendance).length;

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-card-foreground">Mark Attendance — {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</h2>
        <div className="flex items-center gap-2">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
          >
            {classes.map((c) => (
              <option key={c} value={c}>Class {c}</option>
            ))}
          </select>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
          >
            {sections.map((s) => (
              <option key={s} value={s}>Section {s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => markAll("present")}>✅ Mark All Present</Button>
        <Button variant="outline" size="sm" onClick={() => markAll("absent")}>❌ Mark All Absent</Button>
        <span className="ml-auto text-xs text-muted-foreground">{markedCount}/{students.length} marked</span>
      </div>

      {loading ? (
        <div className="py-8 text-center text-sm text-muted-foreground">Loading students...</div>
      ) : students.length === 0 ? (
        <div className="py-8 text-center text-sm text-muted-foreground">No students found in this class</div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-semibold text-muted-foreground">Roll</th>
                <th className="px-4 py-2 text-left font-semibold text-muted-foreground">USN</th>
                <th className="px-4 py-2 text-left font-semibold text-muted-foreground">Name</th>
                <th className="px-4 py-2 text-center font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-2">{s.roll_no}</td>
                  <td className="px-4 py-2 text-muted-foreground">{s.usn}</td>
                  <td className="px-4 py-2 font-medium">{s.name}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => toggleAttendance(s.id, "present")}
                        className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                          s.attendance === "present"
                            ? "bg-success text-success-foreground"
                            : "bg-muted text-muted-foreground hover:bg-success/20"
                        }`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => toggleAttendance(s.id, "absent")}
                        className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                          s.attendance === "absent"
                            ? "bg-destructive text-destructive-foreground"
                            : "bg-muted text-muted-foreground hover:bg-destructive/20"
                        }`}
                      >
                        Absent
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <Button onClick={saveAttendance} disabled={saving || markedCount === 0}>
          {saving ? "Saving..." : saved ? "✅ Saved!" : "Save Attendance"}
        </Button>
        {saved && <p className="text-sm text-success">Attendance saved successfully!</p>}
      </div>
    </div>
  );
}

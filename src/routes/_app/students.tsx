import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "../../integrations/supabase/client";
import { useAuth } from "../../contexts/AuthContext";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import StudentSearch from "../../components/StudentSearch";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/_app/students")({
  component: StudentsPage,
  head: () => ({
    meta: [
      { title: "Students — INDDIA ERP" },
      { name: "description", content: "Manage student records, enrollments and profiles." },
    ],
  }),
});

interface Student {
  id: string;
  usn: string;
  name: string;
  class: string;
  section: string;
  roll_no: number;
  gender: string;
  phone: string | null;
  status: string;
  institute: string;
  branch: string;
}

function StudentsPage() {
  const { userRole } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  const canEdit = userRole === "admin" || userRole === "teacher";

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("students")
      .select("id, usn, name, class, section, roll_no, gender, phone, status, institute, branch")
      .order("institute")
      .order("class")
      .order("roll_no");
    setStudents((data ?? []) as Student[]);
    setLoading(false);
  };

  const activeCount = students.filter((s) => s.status === "Active").length;
  const inactiveCount = students.filter((s) => s.status !== "Active").length;

  return (
    <div>
      <PageHeader
        title="Students"
        description="Manage all student records and enrollments"
        actions={canEdit ? <Button onClick={() => setShowAdd(true)}>+ Add Student</Button> : null}
      />

      <div className="mb-4">
        <StudentSearch />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatPill value={students.length} label="Total Students" tone="text-primary" />
        <StatPill value={activeCount} label="Active" tone="text-success" />
        <StatPill value={0} label="New This Month" tone="text-warning" />
        <StatPill value={inactiveCount} label="Inactive" tone="text-destructive" />
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
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Institute</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Branch / Class</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Roll</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Phone</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-sm text-muted-foreground">
                      No students yet. {canEdit ? "Click + Add Student to get started." : ""}
                    </td>
                  </tr>
                ) : (
                  students.map((s) => (
                    <tr key={s.id} className="border-b border-border transition-colors last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3 text-muted-foreground">{s.usn}</td>
                      <td className="px-4 py-3 font-medium text-card-foreground">{s.name}</td>
                      <td className="px-4 py-3">{s.institute || "—"}</td>
                      <td className="px-4 py-3">{s.branch || `${s.class}-${s.section}`}</td>
                      <td className="px-4 py-3">{s.roll_no}</td>
                      <td className="px-4 py-3">{s.phone || "—"}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={s.status} variant={s.status === "Active" ? "success" : "destructive"} />
                      </td>
                      <td className="px-4 py-3">
                        <Link to="/students/$studentId" params={{ studentId: s.id }} className="text-sm font-medium text-primary hover:underline">
                          View Profile
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showAdd && canEdit && (
        <AddStudentDialog onClose={() => setShowAdd(false)} onCreated={loadStudents} />
      )}
    </div>
  );
}

function StatPill({ value, label, tone }: { value: number; label: string; tone: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 text-center">
      <p className={`text-2xl font-bold ${tone}`}>{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function AddStudentDialog({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({
    name: "",
    usn: "",
    institute: "VTU",
    branch: "CSE",
    class: "1",
    section: "A",
    roll_no: 1,
    gender: "Male",
    phone: "",
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.usn) return setErr("Name and USN are required");
    setSaving(true);
    setErr("");
    const { error } = await supabase.from("students").insert({
      name: form.name,
      usn: form.usn,
      institute: form.institute,
      branch: form.branch,
      class: form.class,
      section: form.section,
      roll_no: Number(form.roll_no),
      gender: form.gender,
      phone: form.phone || null,
    });
    setSaving(false);
    if (error) return setErr(error.message);
    onCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-card-foreground">Add New Student</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">✕</button>
        </div>
        <form onSubmit={submit} className="space-y-4 p-6">
          {err && <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{err}</div>}
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Full name *" value={form.name} onChange={(v) => set("name", v)} />
            <Input label="USN / Admission No *" value={form.usn} onChange={(v) => set("usn", v)} />
            <Select label="Institute" value={form.institute} onChange={(v) => set("institute", v)} options={["VTU", "CBSE", "ICSE", "State Board", "Other"]} />
            <Input label="Branch / Department" value={form.branch} onChange={(v) => set("branch", v)} placeholder="CSE, ECE, Commerce..." />
            <Input label="Class / Year" value={form.class} onChange={(v) => set("class", v)} />
            <Input label="Section" value={form.section} onChange={(v) => set("section", v)} />
            <Input label="Roll No" type="number" value={String(form.roll_no)} onChange={(v) => set("roll_no", Number(v) || 0)} />
            <Select label="Gender" value={form.gender} onChange={(v) => set("gender", v)} options={["Male", "Female", "Other"]} />
            <Input label="Phone" value={form.phone} onChange={(v) => set("phone", v)} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Add Student"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

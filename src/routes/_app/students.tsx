import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
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

const students = [
  { id: "STU001", name: "Priya Sharma", class: "10-A", rollNo: 1, gender: "Female", phone: "9876543210", status: "Active" },
  { id: "STU002", name: "Rahul Verma", class: "10-A", rollNo: 2, gender: "Male", phone: "9876543211", status: "Active" },
  { id: "STU003", name: "Anita Das", class: "9-B", rollNo: 5, gender: "Female", phone: "9876543212", status: "Active" },
  { id: "STU004", name: "Vikram Singh", class: "10-B", rollNo: 3, gender: "Male", phone: "9876543213", status: "Active" },
  { id: "STU005", name: "Meera Patel", class: "8-A", rollNo: 7, gender: "Female", phone: "9876543214", status: "Inactive" },
  { id: "STU006", name: "Arjun Reddy", class: "9-A", rollNo: 4, gender: "Male", phone: "9876543215", status: "Active" },
  { id: "STU007", name: "Kavya Nair", class: "10-A", rollNo: 8, gender: "Female", phone: "9876543216", status: "Active" },
  { id: "STU008", name: "Rohan Gupta", class: "8-B", rollNo: 2, gender: "Male", phone: "9876543217", status: "Active" },
  { id: "STU009", name: "Sneha Iyer", class: "9-B", rollNo: 6, gender: "Female", phone: "9876543218", status: "Active" },
  { id: "STU010", name: "Aditya Kumar", class: "10-B", rollNo: 1, gender: "Male", phone: "9876543219", status: "Active" },
];

const columns = [
  { key: "id", label: "Student ID" },
  { key: "name", label: "Name", render: (s: typeof students[0]) => <span className="font-medium">{s.name}</span> },
  { key: "class", label: "Class" },
  { key: "rollNo", label: "Roll No" },
  { key: "gender", label: "Gender" },
  { key: "phone", label: "Phone" },
  { key: "status", label: "Status", render: (s: typeof students[0]) => (
    <StatusBadge status={s.status} variant={s.status === "Active" ? "success" : "destructive"} />
  )},
];

function StudentsPage() {
  return (
    <div>
      <PageHeader
        title="Students"
        description="Manage all student records and enrollments"
        actions={<Button>+ Add Student</Button>}
      />
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-primary">1,247</p>
          <p className="text-xs text-muted-foreground">Total Students</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-success">1,198</p>
          <p className="text-xs text-muted-foreground">Active</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-warning">37</p>
          <p className="text-xs text-muted-foreground">New This Month</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-destructive">12</p>
          <p className="text-xs text-muted-foreground">Inactive</p>
        </div>
      </div>
      <DataTable columns={columns} data={students} keyField="id" />
    </div>
  );
}

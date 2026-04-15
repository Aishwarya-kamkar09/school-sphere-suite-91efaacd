import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/_app/teachers")({
  component: TeachersPage,
});

const teachers = [
  { id: "TCH001", name: "Mrs. Sunita Gupta", subject: "Mathematics", classes: "9-A, 10-A, 10-B", phone: "9812345670", experience: "12 yrs", status: "Active" },
  { id: "TCH002", name: "Mr. Rajesh Kumar", subject: "Physics", classes: "10-A, 10-B, 11-A", phone: "9812345671", experience: "8 yrs", status: "Active" },
  { id: "TCH003", name: "Ms. Priya Menon", subject: "English", classes: "8-A, 8-B, 9-A", phone: "9812345672", experience: "6 yrs", status: "Active" },
  { id: "TCH004", name: "Mr. Anil Sharma", subject: "Chemistry", classes: "10-A, 11-A, 11-B", phone: "9812345673", experience: "15 yrs", status: "Active" },
  { id: "TCH005", name: "Mrs. Deepa Nair", subject: "Biology", classes: "9-B, 10-B", phone: "9812345674", experience: "10 yrs", status: "On Leave" },
  { id: "TCH006", name: "Mr. Suresh Rao", subject: "History", classes: "8-A, 9-A, 9-B", phone: "9812345675", experience: "9 yrs", status: "Active" },
  { id: "TCH007", name: "Ms. Anjali Verma", subject: "Computer Science", classes: "10-A, 10-B, 11-A", phone: "9812345676", experience: "5 yrs", status: "Active" },
  { id: "TCH008", name: "Mr. Kiran Joshi", subject: "Hindi", classes: "8-A, 8-B, 9-A, 9-B", phone: "9812345677", experience: "11 yrs", status: "Active" },
];

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name", render: (t: typeof teachers[0]) => <span className="font-medium">{t.name}</span> },
  { key: "subject", label: "Subject" },
  { key: "classes", label: "Classes" },
  { key: "phone", label: "Phone" },
  { key: "experience", label: "Experience" },
  { key: "status", label: "Status", render: (t: typeof teachers[0]) => (
    <StatusBadge status={t.status} variant={t.status === "Active" ? "success" : "warning"} />
  )},
];

function TeachersPage() {
  return (
    <div>
      <PageHeader title="Teachers" description="Manage teaching staff and assignments" actions={<Button>+ Add Teacher</Button>} />
      <DataTable columns={columns} data={teachers} keyField="id" />
    </div>
  );
}

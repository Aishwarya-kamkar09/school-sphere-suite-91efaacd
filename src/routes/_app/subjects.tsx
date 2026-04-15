import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/_app/subjects")({
  component: SubjectsPage,
});

const subjects = [
  { id: 1, name: "Mathematics", code: "MATH", teacher: "Mrs. Sunita Gupta", classes: "8-A, 9-A, 10-A, 10-B", periods: 6 },
  { id: 2, name: "Physics", code: "PHY", teacher: "Mr. Rajesh Kumar", classes: "10-A, 10-B, 11-A", periods: 5 },
  { id: 3, name: "Chemistry", code: "CHEM", teacher: "Mr. Anil Sharma", classes: "10-A, 11-A, 11-B", periods: 5 },
  { id: 4, name: "Biology", code: "BIO", teacher: "Mrs. Deepa Nair", classes: "9-B, 10-B", periods: 4 },
  { id: 5, name: "English", code: "ENG", teacher: "Ms. Priya Menon", classes: "8-A, 8-B, 9-A", periods: 6 },
  { id: 6, name: "Hindi", code: "HIN", teacher: "Mr. Kiran Joshi", classes: "8-A, 8-B, 9-A, 9-B", periods: 5 },
  { id: 7, name: "History", code: "HIST", teacher: "Mr. Suresh Rao", classes: "8-A, 9-A, 9-B", periods: 3 },
  { id: 8, name: "Computer Science", code: "CS", teacher: "Ms. Anjali Verma", classes: "10-A, 10-B, 11-A", periods: 4 },
];

const columns = [
  { key: "code", label: "Code" },
  { key: "name", label: "Subject", render: (s: typeof subjects[0]) => <span className="font-medium">{s.name}</span> },
  { key: "teacher", label: "Teacher" },
  { key: "classes", label: "Classes" },
  { key: "periods", label: "Periods/Week" },
];

function SubjectsPage() {
  return (
    <div>
      <PageHeader title="Subjects" description="Manage subjects and teacher assignments" actions={<Button>+ Add Subject</Button>} />
      <DataTable columns={columns} data={subjects} keyField="id" />
    </div>
  );
}

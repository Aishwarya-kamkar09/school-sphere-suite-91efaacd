import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/_app/homework")({
  component: HomeworkPage,
});

const homework = [
  { id: 1, subject: "Mathematics", class: "10-A", title: "Chapter 5 — Quadratic Equations", assignedBy: "Mrs. Sunita Gupta", dueDate: "Apr 18, 2026", status: "Active" },
  { id: 2, subject: "Physics", class: "10-A", title: "Numerical Problems — Newton's Laws", assignedBy: "Mr. Rajesh Kumar", dueDate: "Apr 17, 2026", status: "Active" },
  { id: 3, subject: "English", class: "9-A", title: "Essay: My Favorite Book", assignedBy: "Ms. Priya Menon", dueDate: "Apr 19, 2026", status: "Active" },
  { id: 4, subject: "Chemistry", class: "11-A", title: "Lab Report — Titration Experiment", assignedBy: "Mr. Anil Sharma", dueDate: "Apr 16, 2026", status: "Due Today" },
  { id: 5, subject: "Hindi", class: "8-A", title: "व्याकरण अभ्यास — समास", assignedBy: "Mr. Kiran Joshi", dueDate: "Apr 14, 2026", status: "Overdue" },
  { id: 6, subject: "Computer Science", class: "10-B", title: "Python Programming — Functions", assignedBy: "Ms. Anjali Verma", dueDate: "Apr 20, 2026", status: "Active" },
  { id: 7, subject: "History", class: "9-B", title: "Timeline: Indian Freedom Movement", assignedBy: "Mr. Suresh Rao", dueDate: "Apr 13, 2026", status: "Completed" },
  { id: 8, subject: "Biology", class: "9-B", title: "Diagram: Human Digestive System", assignedBy: "Mrs. Deepa Nair", dueDate: "Apr 12, 2026", status: "Completed" },
];

const columns = [
  { key: "subject", label: "Subject" },
  { key: "class", label: "Class" },
  { key: "title", label: "Title", render: (h: typeof homework[0]) => <span className="font-medium">{h.title}</span> },
  { key: "assignedBy", label: "Assigned By" },
  { key: "dueDate", label: "Due Date" },
  { key: "status", label: "Status", render: (h: typeof homework[0]) => (
    <StatusBadge status={h.status} variant={h.status === "Completed" ? "success" : h.status === "Active" ? "info" : h.status === "Due Today" ? "warning" : "destructive"} />
  )},
];

function HomeworkPage() {
  return (
    <div>
      <PageHeader title="Homework" description="Assign and track homework submissions" actions={<Button>+ Assign Homework</Button>} />
      <DataTable columns={columns} data={homework} keyField="id" />
    </div>
  );
}

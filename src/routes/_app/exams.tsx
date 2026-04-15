import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/_app/exams")({
  component: ExamsPage,
});

const exams = [
  { id: 1, name: "Mid-Term Examination", subject: "Mathematics", class: "10-A", date: "Apr 25, 2026", duration: "3 hrs", maxMarks: 100, status: "Scheduled" },
  { id: 2, name: "Mid-Term Examination", subject: "Physics", class: "10-A", date: "Apr 27, 2026", duration: "3 hrs", maxMarks: 100, status: "Scheduled" },
  { id: 3, name: "Mid-Term Examination", subject: "English", class: "9-A", date: "Apr 25, 2026", duration: "3 hrs", maxMarks: 100, status: "Scheduled" },
  { id: 4, name: "Unit Test 3", subject: "Chemistry", class: "11-A", date: "Apr 10, 2026", duration: "1 hr", maxMarks: 50, status: "Completed" },
  { id: 5, name: "Unit Test 3", subject: "Biology", class: "9-B", date: "Apr 08, 2026", duration: "1 hr", maxMarks: 50, status: "Results Published" },
  { id: 6, name: "Unit Test 3", subject: "History", class: "8-A", date: "Apr 07, 2026", duration: "1 hr", maxMarks: 50, status: "Results Published" },
  { id: 7, name: "Practical Exam", subject: "Computer Science", class: "10-B", date: "Apr 20, 2026", duration: "2 hrs", maxMarks: 30, status: "Scheduled" },
  { id: 8, name: "Practical Exam", subject: "Physics", class: "11-A", date: "Apr 22, 2026", duration: "2 hrs", maxMarks: 30, status: "Scheduled" },
];

const columns = [
  { key: "name", label: "Exam", render: (e: typeof exams[0]) => <span className="font-medium">{e.name}</span> },
  { key: "subject", label: "Subject" },
  { key: "class", label: "Class" },
  { key: "date", label: "Date" },
  { key: "duration", label: "Duration" },
  { key: "maxMarks", label: "Max Marks" },
  { key: "status", label: "Status", render: (e: typeof exams[0]) => (
    <StatusBadge status={e.status} variant={e.status === "Results Published" ? "success" : e.status === "Completed" ? "info" : "warning"} />
  )},
];

function ExamsPage() {
  return (
    <div>
      <PageHeader title="Examinations" description="Manage exam schedules and results" actions={<Button>+ Schedule Exam</Button>} />
      <DataTable columns={columns} data={exams} keyField="id" />
    </div>
  );
}

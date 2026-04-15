import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/_app/classes")({
  component: ClassesPage,
});

const classes = [
  { id: 1, name: "Class 8-A", section: "A", grade: "8", classTeacher: "Mr. Suresh Rao", students: 38, room: "Room 101" },
  { id: 2, name: "Class 8-B", section: "B", grade: "8", classTeacher: "Mr. Kiran Joshi", students: 36, room: "Room 102" },
  { id: 3, name: "Class 9-A", section: "A", grade: "9", classTeacher: "Ms. Priya Menon", students: 40, room: "Room 201" },
  { id: 4, name: "Class 9-B", section: "B", grade: "9", classTeacher: "Mrs. Deepa Nair", students: 37, room: "Room 202" },
  { id: 5, name: "Class 10-A", section: "A", grade: "10", classTeacher: "Mrs. Sunita Gupta", students: 42, room: "Room 301" },
  { id: 6, name: "Class 10-B", section: "B", grade: "10", classTeacher: "Mr. Rajesh Kumar", students: 39, room: "Room 302" },
  { id: 7, name: "Class 11-A", section: "A", grade: "11", classTeacher: "Mr. Anil Sharma", students: 35, room: "Room 401" },
  { id: 8, name: "Class 11-B", section: "B", grade: "11", classTeacher: "Ms. Anjali Verma", students: 34, room: "Room 402" },
];

const columns = [
  { key: "name", label: "Class", render: (c: typeof classes[0]) => <span className="font-medium">{c.name}</span> },
  { key: "grade", label: "Grade" },
  { key: "section", label: "Section" },
  { key: "classTeacher", label: "Class Teacher" },
  { key: "students", label: "Students" },
  { key: "room", label: "Room" },
];

function ClassesPage() {
  return (
    <div>
      <PageHeader title="Classes" description="Manage classes, sections and room assignments" actions={<Button>+ Add Class</Button>} />
      <DataTable columns={columns} data={classes} keyField="id" />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import StatsCard from "../../components/StatsCard";

export const Route = createFileRoute("/_app/attendance")({
  component: AttendancePage,
});

const attendanceData = [
  { id: 1, class: "8-A", totalStudents: 38, present: 36, absent: 2, late: 0, percentage: "94.7%" },
  { id: 2, class: "8-B", totalStudents: 36, present: 33, absent: 2, late: 1, percentage: "91.7%" },
  { id: 3, class: "9-A", totalStudents: 40, present: 39, absent: 1, late: 0, percentage: "97.5%" },
  { id: 4, class: "9-B", totalStudents: 37, present: 34, absent: 2, late: 1, percentage: "91.9%" },
  { id: 5, class: "10-A", totalStudents: 42, present: 40, absent: 1, late: 1, percentage: "95.2%" },
  { id: 6, class: "10-B", totalStudents: 39, present: 37, absent: 2, late: 0, percentage: "94.9%" },
  { id: 7, class: "11-A", totalStudents: 35, present: 33, absent: 1, late: 1, percentage: "94.3%" },
  { id: 8, class: "11-B", totalStudents: 34, present: 32, absent: 2, late: 0, percentage: "94.1%" },
];

const columns = [
  { key: "class", label: "Class", render: (a: typeof attendanceData[0]) => <span className="font-medium">{a.class}</span> },
  { key: "totalStudents", label: "Total" },
  { key: "present", label: "Present", render: (a: typeof attendanceData[0]) => <span className="text-success font-medium">{a.present}</span> },
  { key: "absent", label: "Absent", render: (a: typeof attendanceData[0]) => <span className="text-destructive font-medium">{a.absent}</span> },
  { key: "late", label: "Late", render: (a: typeof attendanceData[0]) => <span className="text-warning font-medium">{a.late}</span> },
  { key: "percentage", label: "Attendance %", render: (a: typeof attendanceData[0]) => (
    <StatusBadge status={a.percentage} variant={parseFloat(a.percentage) >= 95 ? "success" : parseFloat(a.percentage) >= 90 ? "warning" : "destructive"} />
  )},
];

function AttendancePage() {
  return (
    <div>
      <PageHeader title="Attendance" description="Today's attendance overview — April 15, 2026" />
      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-4">
        <StatsCard title="Total Present" value="284" icon="✅" change="94.2% attendance" changeType="positive" />
        <StatsCard title="Total Absent" value="13" icon="❌" change="4.3% absent" changeType="negative" />
        <StatsCard title="Late Arrivals" value="4" icon="⏰" change="1.3% late" changeType="warning" />
        <StatsCard title="On Leave" value="5" icon="📝" change="Approved leaves" changeType="neutral" />
      </div>
      <DataTable columns={columns} data={attendanceData} keyField="id" />
    </div>
  );
}

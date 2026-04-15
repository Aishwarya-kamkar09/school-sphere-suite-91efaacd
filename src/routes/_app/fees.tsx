import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import StatsCard from "../../components/StatsCard";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/_app/fees")({
  component: FeesPage,
});

const feeRecords = [
  { id: 1, studentId: "STU001", name: "Priya Sharma", class: "10-A", totalFee: "₹45,000", paid: "₹45,000", pending: "₹0", status: "Paid" },
  { id: 2, studentId: "STU002", name: "Rahul Verma", class: "10-A", totalFee: "₹45,000", paid: "₹30,000", pending: "₹15,000", status: "Partial" },
  { id: 3, studentId: "STU003", name: "Anita Das", class: "9-B", totalFee: "₹42,000", paid: "₹42,000", pending: "₹0", status: "Paid" },
  { id: 4, studentId: "STU004", name: "Vikram Singh", class: "10-B", totalFee: "₹45,000", paid: "₹45,000", pending: "₹0", status: "Paid" },
  { id: 5, studentId: "STU005", name: "Meera Patel", class: "8-A", totalFee: "₹40,000", paid: "₹0", pending: "₹40,000", status: "Unpaid" },
  { id: 6, studentId: "STU006", name: "Arjun Reddy", class: "9-A", totalFee: "₹42,000", paid: "₹42,000", pending: "₹0", status: "Paid" },
  { id: 7, studentId: "STU007", name: "Kavya Nair", class: "10-A", totalFee: "₹45,000", paid: "₹20,000", pending: "₹25,000", status: "Partial" },
  { id: 8, studentId: "STU008", name: "Rohan Gupta", class: "8-B", totalFee: "₹40,000", paid: "₹40,000", pending: "₹0", status: "Paid" },
];

const columns = [
  { key: "studentId", label: "ID" },
  { key: "name", label: "Student", render: (f: typeof feeRecords[0]) => <span className="font-medium">{f.name}</span> },
  { key: "class", label: "Class" },
  { key: "totalFee", label: "Total Fee" },
  { key: "paid", label: "Paid" },
  { key: "pending", label: "Pending" },
  { key: "status", label: "Status", render: (f: typeof feeRecords[0]) => (
    <StatusBadge status={f.status} variant={f.status === "Paid" ? "success" : f.status === "Partial" ? "warning" : "destructive"} />
  )},
];

function FeesPage() {
  return (
    <div>
      <PageHeader title="Fee Management" description="Track and manage student fee payments" actions={<Button>+ Record Payment</Button>} />
      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-4">
        <StatsCard title="Total Collection" value="₹12.5L" icon="💰" change="This quarter" changeType="positive" />
        <StatsCard title="Pending Fees" value="₹3.2L" icon="⏳" change="23 students" changeType="negative" />
        <StatsCard title="Paid This Month" value="₹2.1L" icon="✅" change="+15% from last month" changeType="positive" />
        <StatsCard title="Overdue" value="₹80K" icon="⚠️" change="8 students" changeType="negative" />
      </div>
      <DataTable columns={columns} data={feeRecords} keyField="id" />
    </div>
  );
}

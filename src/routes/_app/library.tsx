import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/_app/library")({
  component: LibraryPage,
});

const books = [
  { id: 1, title: "Physics Vol. 2", author: "H.C. Verma", isbn: "978-8177091878", category: "Science", copies: 12, available: 8, status: "Available" },
  { id: 2, title: "Mathematics — NCERT Class 10", author: "NCERT", isbn: "978-8174506306", category: "Textbook", copies: 45, available: 3, status: "Low Stock" },
  { id: 3, title: "English Grammar & Composition", author: "Wren & Martin", isbn: "978-9352530144", category: "English", copies: 20, available: 15, status: "Available" },
  { id: 4, title: "Organic Chemistry", author: "Morrison & Boyd", isbn: "978-0136436690", category: "Science", copies: 10, available: 0, status: "Out of Stock" },
  { id: 5, title: "Indian History", author: "Bipan Chandra", isbn: "978-0140298352", category: "History", copies: 8, available: 6, status: "Available" },
  { id: 6, title: "Computer Fundamentals", author: "P.K. Sinha", isbn: "978-8176567527", category: "Computer", copies: 15, available: 12, status: "Available" },
  { id: 7, title: "Biology — NCERT Class 11", author: "NCERT", isbn: "978-8174506399", category: "Textbook", copies: 30, available: 22, status: "Available" },
  { id: 8, title: "Hindi Vyakaran", author: "Kamta Prasad", isbn: "978-8170283355", category: "Hindi", copies: 18, available: 14, status: "Available" },
];

const columns = [
  { key: "title", label: "Title", render: (b: typeof books[0]) => <span className="font-medium">{b.title}</span> },
  { key: "author", label: "Author" },
  { key: "category", label: "Category" },
  { key: "copies", label: "Total Copies" },
  { key: "available", label: "Available" },
  { key: "status", label: "Status", render: (b: typeof books[0]) => (
    <StatusBadge status={b.status} variant={b.status === "Available" ? "success" : b.status === "Low Stock" ? "warning" : "destructive"} />
  )},
];

function LibraryPage() {
  return (
    <div>
      <PageHeader title="Library" description="Manage books, issues and returns" actions={<Button>+ Add Book</Button>} />
      <DataTable columns={columns} data={books} keyField="id" />
    </div>
  );
}

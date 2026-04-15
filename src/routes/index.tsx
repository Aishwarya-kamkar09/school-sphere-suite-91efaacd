import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "SchoolSphere — School Management System" },
      { name: "description", content: "Complete school management system for managing students, teachers, classes, attendance, exams, fees, and more." },
    ],
  }),
});

function Index() {
  return <Navigate to="/dashboard" />;
}

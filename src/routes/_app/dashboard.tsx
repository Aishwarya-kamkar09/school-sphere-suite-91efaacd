import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../contexts/AuthContext";
import TeacherDashboard from "../../components/dashboards/TeacherDashboard";
import StudentDashboard from "../../components/dashboards/StudentDashboard";
import AdminDashboard from "../../components/dashboards/AdminDashboard";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [
      { title: "Dashboard — SchoolSphere" },
      { name: "description", content: "Overview of school statistics and recent activities." },
    ],
  }),
});

function DashboardPage() {
  const { userRole } = useAuth();

  if (userRole === "teacher") return <TeacherDashboard />;
  if (userRole === "student") return <StudentDashboard />;
  return <AdminDashboard />;
}

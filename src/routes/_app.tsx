import { createFileRoute, Outlet } from "@tanstack/react-router";
import AppSidebar from "../components/AppSidebar";

export const Route = createFileRoute("/_app")({
  component: AppLayoutRoute,
});

function AppLayoutRoute() {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-64 min-h-screen">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

import { Link, useLocation } from "@tanstack/react-router";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: "📊" },
  { label: "Students", path: "/students", icon: "🎓" },
  { label: "Teachers", path: "/teachers", icon: "👩‍🏫" },
  { label: "Classes", path: "/classes", icon: "🏫" },
  { label: "Subjects", path: "/subjects", icon: "📚" },
  { label: "Attendance", path: "/attendance", icon: "✅" },
  { label: "Exams", path: "/exams", icon: "📝" },
  { label: "Fees", path: "/fees", icon: "💰" },
  { label: "Library", path: "/library", icon: "📖" },
  { label: "Timetable", path: "/timetable", icon: "🕐" },
  { label: "Homework", path: "/homework", icon: "📋" },
  { label: "Reports", path: "/reports", icon: "📈" },
  { label: "Messages", path: "/messages", icon: "💬" },
  { label: "Settings", path: "/settings", icon: "⚙️" },
];

export default function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-lg font-bold">
          S
        </div>
        <div>
          <h1 className="text-base font-bold text-sidebar-primary-foreground">SchoolSphere</h1>
          <p className="text-xs text-sidebar-foreground/60">Management Suite</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent text-sm font-semibold text-sidebar-accent-foreground">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Admin User</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">admin@school.edu</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "SchoolSphere Pro — Complete School Automation & Analytics Platform" },
      { name: "description", content: "A centralized hub connecting teachers, students, parents, and administrators. Streamline operations, enhance collaboration, and drive measurable improvements in academic outcomes." },
      { property: "og:title", content: "SchoolSphere Pro — Complete School Automation & Analytics Platform" },
      { property: "og:description", content: "A centralized hub connecting teachers, students, parents, and administrators in one unified platform." },
    ],
  }),
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1)_0%,_transparent_60%)]" />
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-20 lg:flex-row lg:py-28">
          {/* Left Content */}
          <div className="relative z-10 flex-1 text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-primary-foreground/90 backdrop-blur-sm">
              ⭐ Trusted by 500+ schools across India
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              Complete School{" "}
              <span className="text-white/70">Automation &amp;</span>{" "}
              <span className="text-white/70">Analytics</span>{" "}
              Platform
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/75 lg:text-xl">
              A centralized hub connecting teachers, students, parents, and administrators in one unified platform. Streamline operations, enhance collaboration, and drive measurable improvements in academic outcomes.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg transition-all hover:bg-white/90 hover:shadow-xl">
                Get Started Free <span aria-hidden>→</span>
              </Link>
              <a href="#features" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-semibold text-primary-foreground backdrop-blur-sm transition-colors hover:bg-white/20">
                <span className="text-base">▶</span> Watch Demo
              </a>
            </div>
          </div>

          {/* Right - Dashboard Preview Mockup */}
          <div className="relative flex-1">
            <div className="relative mx-auto max-w-lg rounded-2xl border border-white/10 bg-white/10 p-2 shadow-2xl backdrop-blur-md lg:max-w-xl">
              {/* Browser Chrome */}
              <div className="mb-2 flex items-center gap-2 rounded-t-lg bg-white/20 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-destructive/60" />
                  <div className="h-3 w-3 rounded-full bg-accent-foreground/40" />
                  <div className="h-3 w-3 rounded-full bg-primary/60" />
                </div>
                <div className="ml-3 flex-1 rounded-md bg-white/20 px-3 py-1 text-xs text-primary-foreground/60">
                  app.schoolsphere.com/dashboard
                </div>
              </div>
              {/* Dashboard Content */}
              <div className="rounded-b-xl bg-card p-4">
                <div className="grid grid-cols-3 gap-3">
                  <DashCard icon="👥" label="TOTAL STUDENTS" value="2,458" change="+12.5% this month" color="text-primary" />
                  <DashCard icon="👩‍🏫" label="TEACHERS" value="184" change="Active" color="text-foreground" />
                  <DashCard icon="✅" label="ATTENDANCE" value="96.3%" change="" color="text-primary" bar />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-border bg-card p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm">🏆</div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">Top Performer</p>
                        <p className="text-[10px] text-muted-foreground">Grade 10 · 94.8% avg</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 rounded-xl border border-border bg-card p-3">
                    {/* Mini bar chart */}
                    <div className="flex h-full items-end gap-1 px-1">
                      {[40, 60, 45, 70, 55, 80, 65].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t bg-primary/30" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm">💰</div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">Fee Collected</p>
                        <p className="text-[10px] text-muted-foreground">₹4.2L this week +8%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="border-b border-border bg-muted/30 py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 text-center md:grid-cols-4">
          {[
            { value: "500+", label: "Schools" },
            { value: "1M+", label: "Students Managed" },
            { value: "99.9%", label: "Uptime" },
            { value: "50+", label: "Features" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Everything You Need to Run a School</h2>
            <p className="mt-3 text-lg text-muted-foreground">Powerful modules for every aspect of school management</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🎓", title: "Student Management", desc: "Complete student profiles, admissions, transfers, and academic records in one place." },
              { icon: "👩‍🏫", title: "Teacher Management", desc: "Track qualifications, schedules, performance, and payroll for all teaching staff." },
              { icon: "✅", title: "Attendance Tracking", desc: "Mark and monitor attendance daily with automated reports and parent notifications." },
              { icon: "📝", title: "Exam & Grades", desc: "Create exam schedules, enter marks, and generate report cards automatically." },
              { icon: "💰", title: "Fee Management", desc: "Handle fee collection, receipts, due reminders, and financial reports." },
              { icon: "📖", title: "Library System", desc: "Catalog books, track issues/returns, and manage overdue fines effortlessly." },
              { icon: "🕐", title: "Timetable", desc: "Auto-generate conflict-free timetables for classes and teachers." },
              { icon: "📋", title: "Homework", desc: "Assign, track, and grade homework digitally with submission deadlines." },
              { icon: "💬", title: "Messaging", desc: "Built-in communication between teachers, students, and parents." },
            ].map((f) => (
              <div key={f.title} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl transition-colors group-hover:bg-primary/20">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Based Section */}
      <section id="roles" className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Built for Every Role</h2>
            <p className="mt-3 text-lg text-muted-foreground">Tailored dashboards and permissions for everyone</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: "🔑", role: "Admin", desc: "Full control over school operations, user management, reports, and system configuration.", features: ["Manage all users & roles", "Financial overview & reports", "System-wide settings"] },
              { icon: "👩‍🏫", role: "Teacher", desc: "Manage classes, mark attendance, assign homework, and track student performance.", features: ["Mark attendance daily", "Assign & grade homework", "View class analytics"] },
              { icon: "🎓", role: "Student", desc: "Access grades, attendance history, fee status, library books, and timetable.", features: ["View grades & attendance", "Check fee payment status", "Access timetable & homework"] },
            ].map((r) => (
              <div key={r.role} className="rounded-2xl border border-border bg-card p-8 text-center transition-all hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl">{r.icon}</div>
                <h3 className="text-xl font-bold text-foreground">{r.role}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
                <ul className="mt-5 space-y-2 text-left">
                  {r.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-primary">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Ready to Transform Your School?</h2>
          <p className="mt-4 text-lg text-muted-foreground">Join hundreds of schools already using SchoolSphere Pro to streamline their operations.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/signup" className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl">
              Get Started Free →
            </Link>
            <Link to="/login" className="rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
              Log in to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">🎓</div>
            <span className="text-sm font-bold text-foreground">SchoolSphere Pro</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 SchoolSphere Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function DashCard({ icon, label, value, change, color, bar }: { icon: string; label: string; value: string; change: string; color: string; bar?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="mb-1 flex items-center gap-1.5">
        <span className="text-sm">{icon}</span>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      </div>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
      {bar ? (
        <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted">
          <div className="h-full w-[96%] rounded-full bg-primary" />
        </div>
      ) : change ? (
        <p className="mt-0.5 text-[10px] text-muted-foreground">{change}</p>
      ) : null}
    </div>
  );
}

function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
            🎓
          </div>
          <div>
            <span className="text-lg font-bold text-foreground">SchoolSphere</span>
            <span className="ml-1 text-lg font-bold text-primary">Pro</span>
          </div>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Features</a>
          <a href="#stats" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">About</a>
          <a href="#roles" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Roles</a>
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          <Link to="/login" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Log in
          </Link>
          <Link to="/signup" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            Get Started Free
          </Link>
        </div>
        {/* Mobile hamburger */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg sm:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>
      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-4 py-4 sm:hidden">
          <nav className="flex flex-col gap-3">
            <a href="#features" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#stats" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#roles" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Roles</a>
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Link to="/login" className="text-center text-sm font-medium text-foreground">Log in</Link>
            <Link to="/signup" className="rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground">Get Started Free</Link>
          </div>
        </div>
      )}
    </header>
  );
}

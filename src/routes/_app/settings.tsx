import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../../components/PageHeader";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
});

const settingsSections = [
  {
    title: "School Information",
    fields: [
      { label: "School Name", value: "SchoolSphere International Academy" },
      { label: "Address", value: "123 Education Lane, Mumbai, Maharashtra 400001" },
      { label: "Phone", value: "+91 22 1234 5678" },
      { label: "Email", value: "admin@schoolsphere.edu.in" },
      { label: "Website", value: "www.schoolsphere.edu.in" },
    ],
  },
  {
    title: "Academic Session",
    fields: [
      { label: "Current Session", value: "2025-2026" },
      { label: "Session Start", value: "April 01, 2025" },
      { label: "Session End", value: "March 31, 2026" },
      { label: "Working Days", value: "Monday — Saturday" },
    ],
  },
  {
    title: "Fee Configuration",
    fields: [
      { label: "Fee Payment Deadline", value: "10th of every month" },
      { label: "Late Fee Penalty", value: "₹50 per day" },
      { label: "Payment Methods", value: "Cash, Cheque, UPI, Net Banking" },
    ],
  },
];

function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" description="Manage school configuration and preferences" actions={<Button>Save Changes</Button>} />
      <div className="space-y-6">
        {settingsSections.map((section, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">{section.title}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {section.fields.map((field, j) => (
                <div key={j}>
                  <label className="text-xs font-medium text-muted-foreground">{field.label}</label>
                  <div className="mt-1 rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-card-foreground">
                    {field.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

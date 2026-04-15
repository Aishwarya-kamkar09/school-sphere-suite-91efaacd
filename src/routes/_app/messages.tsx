import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../../components/PageHeader";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/_app/messages")({
  component: MessagesPage,
});

const messages = [
  { id: 1, from: "Mrs. Sunita Gupta", role: "Teacher", subject: "Math exam preparation material", preview: "Please find the attached study material for the upcoming mid-term exam...", time: "10:30 AM", unread: true },
  { id: 2, from: "Principal Office", role: "Admin", subject: "Annual Sports Day — Schedule Update", preview: "Dear Staff, the annual sports day has been rescheduled to April 20...", time: "9:15 AM", unread: true },
  { id: 3, from: "Mr. Rajesh Kumar", role: "Teacher", subject: "Physics lab equipment request", preview: "We need additional lab equipment for the practical exams scheduled next week...", time: "Yesterday", unread: false },
  { id: 4, from: "Priya Sharma (Parent)", role: "Parent", subject: "Leave application for daughter", preview: "My daughter Priya will be absent on April 18-19 due to a family function...", time: "Yesterday", unread: false },
  { id: 5, from: "Ms. Anjali Verma", role: "Teacher", subject: "Computer lab maintenance", preview: "The computers in Lab 2 need software updates. Can we schedule it this weekend?", time: "Apr 13", unread: false },
  { id: 6, from: "Accounts Dept.", role: "Admin", subject: "Fee defaulters list — April", preview: "Attached is the list of students with pending fee payments for this month...", time: "Apr 12", unread: false },
];

function MessagesPage() {
  return (
    <div>
      <PageHeader title="Messages" description="Communication hub for staff and parents" actions={<Button>+ Compose</Button>} />
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-4 border-b border-border p-4 transition-colors hover:bg-muted/30 cursor-pointer ${msg.unread ? "bg-primary/5" : ""}`}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {msg.from.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className={`text-sm ${msg.unread ? "font-bold text-card-foreground" : "font-medium text-card-foreground"}`}>{msg.from}</p>
                  <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{msg.role}</span>
                </div>
                <span className="text-xs text-muted-foreground">{msg.time}</span>
              </div>
              <p className={`text-sm ${msg.unread ? "font-semibold text-card-foreground" : "text-card-foreground"}`}>{msg.subject}</p>
              <p className="mt-0.5 text-xs text-muted-foreground truncate">{msg.preview}</p>
            </div>
            {msg.unread && <div className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />}
          </div>
        ))}
      </div>
    </div>
  );
}

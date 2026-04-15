import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../../components/PageHeader";

export const Route = createFileRoute("/_app/timetable")({
  component: TimetablePage,
});

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const periods = ["8:00-8:45", "8:45-9:30", "9:30-10:15", "10:15-10:30", "10:30-11:15", "11:15-12:00", "12:00-12:45", "12:45-1:30"];

const timetableData: Record<string, string[]> = {
  Monday: ["Mathematics", "English", "Physics", "BREAK", "Chemistry", "Hindi", "Computer Sc.", "Sports"],
  Tuesday: ["English", "Mathematics", "Chemistry", "BREAK", "Biology", "History", "Physics", "Library"],
  Wednesday: ["Physics", "Hindi", "Mathematics", "BREAK", "English", "Computer Sc.", "Chemistry", "Art"],
  Thursday: ["Chemistry", "Physics", "English", "BREAK", "Mathematics", "Biology", "Hindi", "Sports"],
  Friday: ["Hindi", "Computer Sc.", "Biology", "BREAK", "Physics", "English", "Mathematics", "Music"],
  Saturday: ["Mathematics", "English", "History", "BREAK", "Hindi", "Physics", "—", "—"],
};

function TimetablePage() {
  return (
    <div>
      <PageHeader title="Timetable" description="Class 10-A — Weekly Schedule" />
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-3 py-3 text-left font-semibold text-muted-foreground">Day / Period</th>
                {periods.map((p, i) => (
                  <th key={i} className="px-3 py-3 text-center font-semibold text-muted-foreground text-xs">
                    {p === "10:15-10:30" ? "Break" : `P${i < 3 ? i + 1 : i}`}
                    <div className="text-[10px] font-normal">{p}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-3 py-3 font-medium text-card-foreground">{day}</td>
                  {timetableData[day].map((subject, i) => (
                    <td key={i} className="px-2 py-3 text-center">
                      {subject === "BREAK" ? (
                        <span className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">Break</span>
                      ) : subject === "—" ? (
                        <span className="text-muted-foreground">—</span>
                      ) : (
                        <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {subject}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

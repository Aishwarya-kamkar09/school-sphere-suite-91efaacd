import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

interface StudentResult {
  id: string;
  usn: string;
  name: string;
  class: string;
  section: string;
  status: string;
  institute: string | null;
  branch: string | null;
}

export default function StudentSearch() {
  const [query, setQuery] = useState("");
  const [institute, setInstitute] = useState("");
  const [institutes, setInstitutes] = useState<string[]>([]);
  const [results, setResults] = useState<StudentResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Load distinct institutes for the dropdown
  useEffect(() => {
    supabase
      .from("students")
      .select("institute")
      .neq("institute", "")
      .then(({ data }) => {
        const uniq = Array.from(new Set((data ?? []).map((r) => r.institute).filter(Boolean))) as string[];
        setInstitutes(uniq);
      });
  }, []);

  const runSearch = async (q: string, inst: string) => {
    setHasSearched(true);
    setSearching(true);

    let req = supabase
      .from("students")
      .select("id, usn, name, class, section, status, institute, branch")
      .limit(50);

    if (inst) req = req.eq("institute", inst);
    if (q.trim().length >= 2) req = req.or(`name.ilike.%${q}%,usn.ilike.%${q}%`);

    const { data } = await req.order("class").order("roll_no");
    setResults((data ?? []) as StudentResult[]);
    setSearching(false);
  };

  const handleQuery = (v: string) => {
    setQuery(v);
    if (v.trim().length < 2 && !institute) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    runSearch(v, institute);
  };

  const handleInstitute = (v: string) => {
    setInstitute(v);
    if (!v && query.trim().length < 2) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    runSearch(query, v);
  };

  // Group by branch (college) or class (school) when institute filter is active
  const grouped = institute
    ? results.reduce<Record<string, StudentResult[]>>((acc, s) => {
        const key = s.branch || `Class ${s.class}-${s.section}`;
        (acc[key] ||= []).push(s);
        return acc;
      }, {})
    : null;

  return (
    <div className="relative">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => handleQuery(e.target.value)}
            placeholder="Search student by name or USN..."
            className="w-full rounded-lg border border-input bg-card py-2.5 pl-10 pr-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select
          value={institute}
          onChange={(e) => handleInstitute(e.target.value)}
          className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-card-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-56"
        >
          <option value="">🏛️ All institutes</option>
          {institutes.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>

      {hasSearched && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-card shadow-xl">
          {searching ? (
            <div className="p-4 text-center text-sm text-muted-foreground">Searching...</div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">No students found</div>
          ) : grouped ? (
            <div className="max-h-96 overflow-y-auto">
              {Object.entries(grouped).map(([group, list]) => (
                <div key={group}>
                  <div className="sticky top-0 bg-muted/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground backdrop-blur">
                    {group} <span className="ml-1 text-muted-foreground/70">({list.length})</span>
                  </div>
                  {list.map((s) => (
                    <ResultRow key={s.id} s={s} onClick={() => { setQuery(""); setInstitute(""); setHasSearched(false); }} />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="max-h-72 overflow-y-auto">
              {results.map((s) => (
                <ResultRow key={s.id} s={s} onClick={() => { setQuery(""); setHasSearched(false); }} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ResultRow({ s, onClick }: { s: StudentResult; onClick: () => void }) {
  return (
    <Link
      to="/students/$studentId"
      params={{ studentId: s.id }}
      onClick={onClick}
      className="flex items-center justify-between border-b border-border px-4 py-3 text-sm transition-colors last:border-0 hover:bg-muted/50"
    >
      <div>
        <p className="font-medium text-card-foreground">{s.name}</p>
        <p className="text-xs text-muted-foreground">
          USN: {s.usn} · {s.institute ? `${s.institute} · ` : ""}{s.branch || `Class ${s.class}-${s.section}`}
        </p>
      </div>
      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${s.status === "Active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
        {s.status}
      </span>
    </Link>
  );
}

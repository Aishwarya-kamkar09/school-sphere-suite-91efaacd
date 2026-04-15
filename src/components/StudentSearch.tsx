import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

interface StudentResult {
  id: string;
  usn: string;
  name: string;
  class: string;
  section: string;
  status: string;
}

export default function StudentSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StudentResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setSearching(true);
    setHasSearched(true);

    const { data } = await supabase
      .from("students")
      .select("id, usn, name, class, section, status")
      .or(`name.ilike.%${searchQuery}%,usn.ilike.%${searchQuery}%`)
      .limit(10);

    setResults(data ?? []);
    setSearching(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search student by name or USN..."
            className="w-full rounded-lg border border-input bg-card py-2.5 pl-10 pr-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {hasSearched && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full max-w-md overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          {searching ? (
            <div className="p-4 text-center text-sm text-muted-foreground">Searching...</div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">No students found</div>
          ) : (
            <div className="max-h-64 overflow-y-auto">
              {results.map((student) => (
                <Link
                  key={student.id}
                  to="/students/$studentId"
                  params={{ studentId: student.id }}
                  onClick={() => { setQuery(""); setHasSearched(false); }}
                  className="flex items-center justify-between px-4 py-3 text-sm hover:bg-muted/50 transition-colors border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-card-foreground">{student.name}</p>
                    <p className="text-xs text-muted-foreground">USN: {student.usn} · Class {student.class}-{student.section}</p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${student.status === "Active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                    {student.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

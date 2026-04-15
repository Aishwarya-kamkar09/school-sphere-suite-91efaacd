import { useState, useEffect } from "react";
import PageHeader from "../PageHeader";
import StatsCard from "../StatsCard";
import StudentSearch from "../StudentSearch";
import AttendanceMarker from "../AttendanceMarker";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    supabase.from("students").select("id", { count: "exact", head: true }).then(({ count }) => {
      setStudentCount(count ?? 0);
    });
  }, []);

  return (
    <div>
      <PageHeader title="Teacher Dashboard" description="Manage your classes, mark attendance and track students." />

      <div className="mb-6">
        <StudentSearch />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="My Students" value={studentCount} icon="🎓" change="All classes" changeType="neutral" />
        <StatsCard title="Classes Today" value="5" icon="🏫" change="Next: 10-A Math" changeType="neutral" />
        <StatsCard title="Pending Homework" value="3" icon="📋" change="Due this week" changeType="warning" />
        <StatsCard title="Attendance Rate" value="94%" icon="✅" change="This week" changeType="positive" />
      </div>

      <div className="mt-6">
        <AttendanceMarker />
      </div>
    </div>
  );
}

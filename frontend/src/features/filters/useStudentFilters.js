import { useMemo } from "react";

export default function useStudentFilters({ students, filter }) {
  return useMemo(() => {
    switch (filter) {
      case "risk":     return students.filter((s) => s.metrics?.risk === "high");
      case "payments": return students.filter((s) => s.metrics?.pendingPayments > 0);
      case "excellent":return students.filter((s) => s.metrics?.average >= 90);
      default:         return students;
    }
  }, [students, filter]);
}
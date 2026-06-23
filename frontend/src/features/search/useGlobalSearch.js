import { useMemo } from "react";

export default function useGlobalSearch({ query, students = [] }) {
  return useMemo(() => {
    if (!query) return [];
    const lower = query.toLowerCase();
    return students.filter(
      (s) =>
        s.first_name?.toLowerCase().includes(lower) ||
        s.last_name?.toLowerCase().includes(lower)  ||
        s.email?.toLowerCase().includes(lower)
    );
  }, [query, students]);
}
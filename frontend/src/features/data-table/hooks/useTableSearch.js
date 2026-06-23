import { useState } from "react";
export function useTableSearch() {
  const [search, setSearch] = useState("");
  return { search, setSearch };
}
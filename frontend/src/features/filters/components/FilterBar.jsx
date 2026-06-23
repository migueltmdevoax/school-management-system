import FilterButton from "./FilterButton";

export default function FilterBar({ filter, setFilter }) {
  const filters = [
    { key: "all",      label: "All" },
    { key: "risk",     label: "At Risk" },
    { key: "payments", label: "Pending Payments" },
    { key: "excellent",label: "Excellent" },
  ];
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {filters.map((f) => (
        <FilterButton key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>
          {f.label}
        </FilterButton>
      ))}
    </div>
  );
}
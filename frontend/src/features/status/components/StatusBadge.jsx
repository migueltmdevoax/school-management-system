const statusStyles = {
  low:    "bg-emerald-500/20 text-emerald-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  high:   "bg-red-500/20 text-red-400",
};

export default function StatusBadge({ status = "low" }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold capitalize border border-white/10 ${statusStyles[status] || statusStyles.low}`}>
      {status} risk
    </span>
  );
}
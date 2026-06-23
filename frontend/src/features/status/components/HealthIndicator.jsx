export default function HealthIndicator({ incidents = 0, pendingPayments = 0 }) {
  const unhealthy = incidents >= 3 || pendingPayments >= 2;
  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 w-3 rounded-full ${unhealthy ? "bg-red-500" : "bg-emerald-500"}`} />
      <span className="text-xs text-gray-400">{unhealthy ? "Needs attention" : "Healthy"}</span>
    </div>
  );
}
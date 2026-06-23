export default function DashboardCard({ title, value, icon, subtitle, trend }) {
  return (
    <div className="rounded-3xl border border-gray-800 bg-gray-900/70 backdrop-blur-xl p-6 shadow-2xl transition-all hover:border-indigo-500/40 hover:scale-[1.02]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h2 className="mt-3 text-4xl font-black text-white">{value}</h2>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">{subtitle}</p>
        {trend && (
          <div className={`text-xs font-semibold px-2 py-1 rounded-full ${trend > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
            {trend > 0 ? "+" : ""}{trend}%
          </div>
        )}
      </div>
    </div>
  );
}
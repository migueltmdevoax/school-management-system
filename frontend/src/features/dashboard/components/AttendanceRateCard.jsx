export default function AttendanceRateCard({ stats }) {
  if (!stats) return null;
  const total = Number(stats.present) + Number(stats.absent) + Number(stats.late);
  const rate  = total === 0 ? 0 : Math.round((Number(stats.present) / total) * 100);
  return (
    <div className="rounded-3xl border border-gray-800 bg-gray-950 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Attendance Rate</p>
          <h2 className="mt-2 text-5xl font-black text-white">{rate}%</h2>
        </div>
        <div className="text-6xl">📈</div>
      </div>
    </div>
  );
}
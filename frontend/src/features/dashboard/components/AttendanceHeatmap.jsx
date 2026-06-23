export default function AttendanceHeatmap({ data = [] }) {
  const getColor = (present) => {
    if (present >= 20) return "bg-green-500";
    if (present >= 10) return "bg-yellow-500";
    return "bg-red-500";
  };
  return (
    <div className="rounded-3xl border border-gray-800 bg-gray-950 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white">Attendance Heatmap</h3>
        <p className="mt-1 text-sm text-gray-400">Last 30 days</p>
      </div>
      <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
        {data.map((day) => (
          <div key={day.attendance_date}
            className={`aspect-square rounded-2xl ${getColor(day.present)} flex items-center justify-center text-xs font-bold text-white`}>
            {day.present}
          </div>
        ))}
      </div>
    </div>
  );
}
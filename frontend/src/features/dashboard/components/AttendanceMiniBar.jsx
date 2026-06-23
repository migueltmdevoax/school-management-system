export default function AttendanceMiniBar({ percentage }) {
  return (
    <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-800">
      <div
        className="h-full rounded-full bg-green-500 transition-all"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
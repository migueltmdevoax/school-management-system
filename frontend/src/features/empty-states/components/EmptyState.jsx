export default function EmptyState({ icon = "📭", title = "No data", description = "Nothing found", action = null }) {
  return (
    <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-12 text-center">
      <div className="text-6xl">{icon}</div>
      <h2 className="mt-6 text-2xl font-bold text-white">{title}</h2>
      <p className="mt-3 text-gray-400 max-w-md mx-auto">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
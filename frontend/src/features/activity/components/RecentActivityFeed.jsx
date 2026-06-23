import RecentActivityItem from "./RecentActivityItem";

export default function RecentActivityFeed({ activities = [] }) {
  return (
    <div className="rounded-3xl border border-gray-800 bg-gray-900/70 backdrop-blur-xl p-6 shadow-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Recent Activity</h2>
      </div>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">No recent activity</p>
        ) : (
          activities.map((activity) => (
            <RecentActivityItem key={activity.id} activity={activity} />
          ))
        )}
      </div>
    </div>
  );
}
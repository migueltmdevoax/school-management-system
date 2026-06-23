import { useGetMyDashboardQuery } from "../../../features/me/meApi";
import SkeletonDashboard from "../../../components/feedback/SkeletonDashboard";

export default function ParentDashboard() {
  const { data: res, isLoading, isError } = useGetMyDashboardQuery();
  const data = res?.data || [];

  if (isLoading) return <div className="p-6"><SkeletonDashboard /></div>;
  if (isError)   return <div className="p-6 text-red-400">Error loading dashboard</div>;
  if (!data.length) return (
    <div className="p-6 text-center text-gray-400">
      <p className="text-5xl mb-4">👨‍👩‍👧</p>
      <p className="text-xl font-bold text-white">No children linked</p>
      <p className="mt-2">Contact the school to link your account</p>
    </div>
  );

  const riskBadge = {
    HIGH:   "bg-red-500/20 text-red-400",
    MEDIUM: "bg-yellow-500/20 text-yellow-400",
    LOW:    "bg-green-500/20 text-green-400",
  };

  // 🔥 Colores y labels por status de pago
  const paymentStyles = {
    PENDING: { bg: "bg-yellow-500/10 border-yellow-500/20", text: "text-yellow-400", sub: "text-yellow-300", icon: "⚠️" },
    OVERDUE: { bg: "bg-red-500/10 border-red-500/20",       text: "text-red-400",    sub: "text-red-300",    icon: "🚨" },
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-black text-white">👋 Parent Dashboard</h1>
        <p className="text-gray-400 mt-1">Your children's progress</p>
      </div>

      {data.map(({ student, metrics, payments, incidents, grades }) => {
        // 🔥 Separar pagos por status
        const pendingPayments = payments.filter((p) => p.status === "PENDING");
        const overduePayments = payments.filter((p) => p.status === "OVERDUE");
        const totalUnpaid     = pendingPayments.length + overduePayments.length;

        return (
          <div key={student.id} className="bg-gray-900 border border-gray-800 rounded-3xl p-6 space-y-6">
            {/* HEADER */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">{student.first_name} {student.last_name}</h2>
                <p className="text-gray-400 text-sm mt-1">{student.email}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${riskBadge[metrics.risk] || riskBadge.LOW}`}>
                {metrics.risk} risk
              </span>
            </div>

            {/* METRICS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Average Grade",    value: metrics.averageGrade,    icon: "📊" },
                { label: "Incidents",        value: metrics.incidentCount,   icon: "🚨" },
                { label: "Unpaid",           value: totalUnpaid,             icon: "💰" },
                { label: "Assignments",      value: `${metrics.completed} / ${metrics.completed + metrics.pending}`, icon: "📚" },
              ].map((m) => (
                <div key={m.label} className="bg-gray-800 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span>{m.icon}</span>
                    <p className="text-gray-400 text-xs">{m.label}</p>
                  </div>
                  <h3 className="text-white text-xl font-bold">{m.value}</h3>
                </div>
              ))}
            </div>

            {/* 🔥 OVERDUE ALERT — aparece primero por ser más urgente */}
            {overduePayments.length > 0 && (
              <div className={`border rounded-2xl p-4 ${paymentStyles.OVERDUE.bg}`}>
                <p className={`font-semibold text-sm mb-2 ${paymentStyles.OVERDUE.text}`}>
                  {paymentStyles.OVERDUE.icon} {overduePayments.length} overdue payment(s) — Requires immediate attention
                </p>
                {overduePayments.map((p) => (
                  <p key={p.id} className={`text-xs mt-1 ${paymentStyles.OVERDUE.sub}`}>
                    ${Number(p.amount).toFixed(2)} — Was due: {p.due_date || "No date"}
                  </p>
                ))}
              </div>
            )}

            {/* 🔥 PENDING ALERT */}
            {pendingPayments.length > 0 && (
              <div className={`border rounded-2xl p-4 ${paymentStyles.PENDING.bg}`}>
                <p className={`font-semibold text-sm mb-2 ${paymentStyles.PENDING.text}`}>
                  {paymentStyles.PENDING.icon} {pendingPayments.length} pending payment(s)
                </p>
                {pendingPayments.map((p) => (
                  <p key={p.id} className={`text-xs mt-1 ${paymentStyles.PENDING.sub}`}>
                    ${Number(p.amount).toFixed(2)} — Due: {p.due_date || "No date"}
                  </p>
                ))}
              </div>
            )}

            {/* INCIDENTS */}
            {incidents.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
                <p className="text-red-400 font-semibold text-sm mb-2">🚨 Recent Incidents</p>
                {incidents.slice(0, 3).map((i) => (
                  <div key={i.id} className="flex items-center justify-between py-1">
                    <p className="text-red-300 text-xs">{i.title}</p>
                    <span className="text-red-400 text-xs font-bold">{i.severity}</span>
                  </div>
                ))}
              </div>
            )}

            {/* GRADES */}
            {grades.length > 0 && (
              <div>
                <p className="text-gray-400 text-sm font-semibold mb-3">📝 Recent Grades</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {grades.slice(0, 4).map((g, i) => (
                    <div key={i} className="bg-gray-800 rounded-2xl p-3 text-center">
                      <p className={`text-2xl font-black ${
                        g.grade >= 90 ? "text-green-400" :
                        g.grade >= 70 ? "text-yellow-400" : "text-red-400"
                      }`}>{g.grade}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {g.assignment_title || "Assignment"}
                      </p>
                      <p className="text-gray-600 text-xs">
                        {new Date(g.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
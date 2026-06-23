import {
  View, Text, ScrollView, StyleSheet,
  RefreshControl, TouchableOpacity, ActivityIndicator,
} from "react-native";
import { useDispatch }            from "react-redux";
import { useGetMyDashboardQuery } from "../../features/me/meApi";
import { logoutAndClear }         from "../../features/auth/authSlice";
import { disconnectSocket }       from "../../services/socket/socketClient";

export default function ParentDashboardScreen() {
  const dispatch = useDispatch();
  const { data, isLoading, refetch } = useGetMyDashboardQuery();

  // 🔥 Asegura que siempre sea array
  const raw       = data?.data;
  const dashboard = Array.isArray(raw) ? raw : [];

  const handleLogout = async () => {
    disconnectSocket();
    await dispatch(logoutAndClear());
  };

  const riskColor = { HIGH: "#ef4444", MEDIUM: "#eab308", LOW: "#22c55e" };

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#0f172a", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View style={s.container}>
      <View style={s.header}>
        <View>
          <Text style={s.title}>👋 Parent Dashboard</Text>
          <Text style={s.sub}>Your children's progress</Text>
        </View>
        <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
          <Text style={s.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#3b82f6" />
        }
      >
        {dashboard.length === 0 ? (
          <View style={s.emptyBox}>
            <Text style={s.emptyIcon}>👨‍👩‍👧</Text>
            <Text style={s.emptyTitle}>No children linked</Text>
            <Text style={s.emptySub}>Contact the school to link your account</Text>
          </View>
        ) : (
          dashboard.map(({ student, metrics, payments, incidents, grades }) => (
            <View key={student.id} style={s.card}>
              {/* STUDENT HEADER */}
              <View style={s.studentHeader}>
                <View style={s.avatar}>
                  <Text style={s.avatarText}>
                    {student.first_name?.[0]}{student.last_name?.[0]}
                  </Text>
                </View>
                <View style={s.studentInfo}>
                  <Text style={s.studentName}>
                    {student.first_name} {student.last_name}
                  </Text>
                  <Text style={s.studentEmail}>{student.email}</Text>
                </View>
                <View style={[
                  s.riskBadge,
                  { backgroundColor: `${riskColor[metrics?.risk] || "#22c55e"}20` }
                ]}>
                  <Text style={[
                    s.riskText,
                    { color: riskColor[metrics?.risk] || "#22c55e" }
                  ]}>
                    {metrics?.risk || "LOW"}
                  </Text>
                </View>
              </View>

              {/* METRICS */}
              <View style={s.metricsGrid}>
                {[
                  { label: "Avg Grade",  value: metrics?.averageGrade    ?? 0,   icon: "📊" },
                  { label: "Incidents",  value: metrics?.incidentCount   ?? 0,   icon: "🚨" },
                  { label: "Payments",   value: metrics?.pendingPayments ?? 0,   icon: "💰" },
                  { label: "Progress",   value: `${metrics?.completed ?? 0}/${(metrics?.completed ?? 0) + (metrics?.pending ?? 0)}`, icon: "📚" },
                ].map((m) => (
                  <View key={m.label} style={s.metricCard}>
                    <Text style={s.metricIcon}>{m.icon}</Text>
                    <Text style={s.metricValue}>{m.value}</Text>
                    <Text style={s.metricLabel}>{m.label}</Text>
                  </View>
                ))}
              </View>

              {/* PENDING PAYMENTS ALERT */}
              {Array.isArray(payments) && payments.filter((p) => p.status === "PENDING").length > 0 && (
                <View style={s.alert}>
                  <Text style={s.alertText}>
                    ⚠️ {payments.filter((p) => p.status === "PENDING").length} pending payment(s)
                  </Text>
                  {payments.filter((p) => p.status === "PENDING").map((p) => (
                    <Text key={p.id} style={s.alertSub}>
                      ${Number(p.amount).toFixed(2)} — Due: {p.due_date || "No date"}
                    </Text>
                  ))}
                </View>
              )}

              {/* RECENT GRADES */}
              {Array.isArray(grades) && grades.length > 0 && (
                <View style={s.gradesRow}>
                  <Text style={s.gradesLabel}>Recent Grades</Text>
                  <View style={s.gradesPills}>
                    {grades.slice(0, 5).map((g, i) => (
                      <View key={i} style={[s.gradePill, {
                        backgroundColor:
                          g.grade >= 90 ? "rgba(34,197,94,0.2)" :
                          g.grade >= 70 ? "rgba(234,179,8,0.2)" :
                                          "rgba(239,68,68,0.2)",
                      }]}>
                        <Text style={[s.gradePillText, {
                          color:
                            g.grade >= 90 ? "#22c55e" :
                            g.grade >= 70 ? "#eab308" :
                                            "#ef4444",
                        }]}>
                          {g.grade}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* INCIDENTS ALERT */}
              {Array.isArray(incidents) && incidents.length > 0 && (
                <View style={s.incidentAlert}>
                  <Text style={s.incidentText}>
                    🚨 {incidents.length} incident(s) registered
                  </Text>
                  {incidents.slice(0, 2).map((inc) => (
                    <Text key={inc.id} style={s.incidentSub}>
                      • {inc.title} — {inc.severity}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container:     { flex: 1, backgroundColor: "#0f172a" },
  header:        { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20, paddingTop: 56, backgroundColor: "#111827", borderBottomWidth: 1, borderBottomColor: "#1f2937" },
  title:         { color: "#fff", fontSize: 18, fontWeight: "900" },
  sub:           { color: "#6b7280", fontSize: 12 },
  logoutBtn:     { backgroundColor: "#dc2626", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  logoutText:    { color: "#fff", fontWeight: "700", fontSize: 13 },
  emptyBox:      { padding: 40, alignItems: "center" },
  emptyIcon:     { fontSize: 56, marginBottom: 16 },
  emptyTitle:    { color: "#fff", fontSize: 20, fontWeight: "700" },
  emptySub:      { color: "#6b7280", fontSize: 14, marginTop: 8, textAlign: "center" },
  card:          { margin: 16, backgroundColor: "#111827", borderRadius: 24, padding: 20, borderWidth: 1, borderColor: "#1f2937" },
  studentHeader: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  avatar:        { width: 48, height: 48, borderRadius: 24, backgroundColor: "#2563eb", justifyContent: "center", alignItems: "center", marginRight: 12 },
  avatarText:    { color: "#fff", fontWeight: "700", fontSize: 18 },
  studentInfo:   { flex: 1 },
  studentName:   { color: "#fff", fontWeight: "700", fontSize: 16 },
  studentEmail:  { color: "#6b7280", fontSize: 12, marginTop: 2 },
  riskBadge:     { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  riskText:      { fontWeight: "700", fontSize: 12 },
  metricsGrid:   { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  metricCard:    { backgroundColor: "#1f2937", borderRadius: 16, padding: 12, width: "47%", alignItems: "center" },
  metricIcon:    { fontSize: 20, marginBottom: 4 },
  metricValue:   { color: "#fff", fontWeight: "900", fontSize: 20 },
  metricLabel:   { color: "#6b7280", fontSize: 11, marginTop: 2 },
  alert:         { backgroundColor: "rgba(234,179,8,0.1)", borderRadius: 16, padding: 12, borderWidth: 1, borderColor: "rgba(234,179,8,0.3)", marginBottom: 12 },
  alertText:     { color: "#eab308", fontWeight: "700", fontSize: 13 },
  alertSub:      { color: "#ca8a04", fontSize: 12, marginTop: 4 },
  incidentAlert: { backgroundColor: "rgba(239,68,68,0.1)", borderRadius: 16, padding: 12, borderWidth: 1, borderColor: "rgba(239,68,68,0.3)", marginTop: 8 },
  incidentText:  { color: "#ef4444", fontWeight: "700", fontSize: 13 },
  incidentSub:   { color: "#fca5a5", fontSize: 12, marginTop: 4 },
  gradesRow:     { marginTop: 4 },
  gradesLabel:   { color: "#6b7280", fontSize: 12, marginBottom: 8 },
  gradesPills:   { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  gradePill:     { width: 44, height: 44, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  gradePillText: { fontWeight: "900", fontSize: 16 },
});
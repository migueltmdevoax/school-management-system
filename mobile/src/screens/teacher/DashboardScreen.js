import {
  View, Text, ScrollView, StyleSheet,
  RefreshControl, TouchableOpacity,
} from "react-native";
import { useDispatch }           from "react-redux";
import { useGetMyDashboardQuery } from "../../features/me/meApi";
import { logoutAndClear }         from "../../features/auth/authSlice";
import { disconnectSocket }       from "../../services/socket/socketClient";

export default function TeacherDashboardScreen() {
  const dispatch = useDispatch();
  const { data, isLoading, refetch } = useGetMyDashboardQuery();
  const dashboard = data?.data || {};
  const students  = dashboard.students || [];

  const handleLogout = async () => {
    disconnectSocket();
    await dispatch(logoutAndClear());
  };

  const riskColor = { high: "#ef4444", medium: "#eab308", low: "#22c55e" };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <View>
          <Text style={s.title}>👨‍🏫 Teacher Dashboard</Text>
          <Text style={s.sub}>Academic Operations Center</Text>
        </View>
        <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
          <Text style={s.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#3b82f6" />}
      >
        {/* KPI */}
        <View style={s.grid}>
          {[
            { label: "Students",    value: dashboard.totalStudents    || 0 },
            { label: "At Risk",     value: dashboard.riskStudents     || 0 },
            { label: "Assignments", value: dashboard.totalAssignments || 0 },
            { label: "Pending",     value: dashboard.pendingSubmissions || 0 },
          ].map((k) => (
            <View key={k.label} style={s.kpiCard}>
              <Text style={s.kpiValue}>{k.value}</Text>
              <Text style={s.kpiLabel}>{k.label}</Text>
            </View>
          ))}
        </View>

        {/* STUDENTS */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>My Students</Text>
          {students.map((student) => {
            const sg  = (dashboard.grades || []).filter((g) => String(g.student_id) === String(student.id));
            const avg = sg.length > 0 ? (sg.reduce((a, g) => a + Number(g.grade), 0) / sg.length).toFixed(1) : "0.0";
            const progress = Math.min(sg.length * 20, 100);
            const risk = avg < 70 ? "high" : avg < 80 ? "medium" : "low";

            return (
              <View key={student.id} style={s.studentCard}>
                <View style={s.studentRow}>
                  <View style={s.avatar}>
                    <Text style={s.avatarText}>{student.first_name?.[0]}{student.last_name?.[0]}</Text>
                  </View>
                  <View style={s.studentInfo}>
                    <Text style={s.studentName}>{student.first_name} {student.last_name}</Text>
                    <Text style={s.studentEmail}>{student.email}</Text>
                  </View>
                  <View style={[s.riskDot, { backgroundColor: riskColor[risk] }]} />
                </View>
                <View style={s.metricsRow}>
                  <Text style={s.metricText}>Avg: <Text style={{ color: "#fff", fontWeight: "700" }}>{avg}</Text></Text>
                  <Text style={s.metricText}>Progress: <Text style={{ color: "#fff", fontWeight: "700" }}>{progress}%</Text></Text>
                  <Text style={s.metricText}>Tasks: <Text style={{ color: "#fff", fontWeight: "700" }}>{sg.length}</Text></Text>
                </View>
                <View style={s.progressBar}>
                  <View style={[s.progressFill, { width: `${progress}%` }]} />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container:    { flex: 1, backgroundColor: "#0f172a" },
  header:       { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20, paddingTop: 56, backgroundColor: "#111827", borderBottomWidth: 1, borderBottomColor: "#1f2937" },
  title:        { color: "#fff", fontSize: 18, fontWeight: "900" },
  sub:          { color: "#6b7280", fontSize: 12 },
  logoutBtn:    { backgroundColor: "#dc2626", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  logoutText:   { color: "#fff", fontWeight: "700", fontSize: 13 },
  grid:         { flexDirection: "row", flexWrap: "wrap", padding: 16, gap: 12 },
  kpiCard:      { backgroundColor: "#111827", borderRadius: 16, padding: 16, width: "47%", borderWidth: 1, borderColor: "#1f2937", alignItems: "center" },
  kpiValue:     { color: "#fff", fontSize: 28, fontWeight: "900" },
  kpiLabel:     { color: "#6b7280", fontSize: 12, marginTop: 4 },
  section:      { margin: 16 },
  sectionTitle: { color: "#fff", fontSize: 16, fontWeight: "700", marginBottom: 12 },
  studentCard:  { backgroundColor: "#111827", borderRadius: 20, padding: 16, borderWidth: 1, borderColor: "#1f2937", marginBottom: 12 },
  studentRow:   { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  avatar:       { width: 40, height: 40, borderRadius: 20, backgroundColor: "#2563eb", justifyContent: "center", alignItems: "center", marginRight: 12 },
  avatarText:   { color: "#fff", fontWeight: "700" },
  studentInfo:  { flex: 1 },
  studentName:  { color: "#fff", fontWeight: "700" },
  studentEmail: { color: "#6b7280", fontSize: 12 },
  riskDot:      { width: 10, height: 10, borderRadius: 5 },
  metricsRow:   { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  metricText:   { color: "#6b7280", fontSize: 12 },
  progressBar:  { height: 6, backgroundColor: "#1f2937", borderRadius: 3, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: "#2563eb", borderRadius: 3 },
});
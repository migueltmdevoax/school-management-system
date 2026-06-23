import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, RefreshControl, Dimensions,
} from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { useDispatch }          from "react-redux";
import { useGetDashboardQuery } from "../../features/dashboard/dashboardApi";
import { logoutAndClear }       from "../../features/auth/authSlice";
import { disconnectSocket }     from "../../services/socket/socketClient";

const screenWidth = Dimensions.get("window").width - 32;

const chartConfig = {
  backgroundColor: "#111827",
  backgroundGradientFrom: "#111827",
  backgroundGradientTo: "#111827",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
  style: { borderRadius: 16 },
  propsForDots: { r: "4", strokeWidth: "2", stroke: "#3b82f6" },
};

export default function AdminDashboardScreen() {
  const dispatch = useDispatch();
  const { data, isLoading, refetch } = useGetDashboardQuery();
  const metrics = data?.data;

  const handleLogout = async () => {
    disconnectSocket();
    await dispatch(logoutAndClear());
  };

  const kpis = metrics ? [
    { label: "Students",         value: metrics.students,   icon: "👨‍🎓" },
    { label: "Pending Payments", value: metrics.pendingPayments, icon: "💰" },
    { label: "Incidents",        value: metrics.incidents,  icon: "🚨" },
    { label: "Attendance",       value: `${metrics.attendance}%`, icon: "📈" },
  ] : [];

  // Datos de ejemplo para attendance — el backend puede mandar esto real después
  const attendanceData = {
    labels: ["Mon","Tue","Wed","Thu","Fri"],
    datasets: [{ data: [metrics?.attendanceRate || 0, 85, 90, 78, 92] }],
  };

  const incidentsData = {
    labels: ["W1","W2","W3","W4"],
    datasets: [{ data: [2, 1, metrics?.totalIncidents || 0, 1] }],
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <View>
          <Text style={s.headerTitle}>🚀 Admin Dashboard</Text>
          <Text style={s.headerSub}>Realtime school analytics</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={s.logoutBtn}>
          <Text style={s.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={s.scroll}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#3b82f6" />}
      >
        <View style={s.grid}>
          {kpis.map((kpi) => (
            <View key={kpi.label} style={s.kpiCard}>
              <Text style={s.kpiIcon}>{kpi.icon}</Text>
              <Text style={s.kpiValue}>{kpi.value ?? "—"}</Text>
              <Text style={s.kpiLabel}>{kpi.label}</Text>
            </View>
          ))}
        </View>

        {/* 🔥 GRÁFICA DE ATTENDANCE */}
        <View style={s.chartSection}>
          <Text style={s.sectionTitle}>📈 Attendance Trend</Text>
          <LineChart
            data={attendanceData}
            width={screenWidth}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={s.chart}
          />
        </View>

        {/* 🔥 GRÁFICA DE INCIDENTS */}
        <View style={s.chartSection}>
          <Text style={s.sectionTitle}>🚨 Incidents by Week</Text>
          <BarChart
            data={incidentsData}
            width={screenWidth}
            height={200}
            chartConfig={{ ...chartConfig, color: (o = 1) => `rgba(239, 68, 68, ${o})` }}
            style={s.chart}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container:    { flex: 1, backgroundColor: "#0f172a" },
  header:       { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20, paddingTop: 56, backgroundColor: "#111827", borderBottomWidth: 1, borderBottomColor: "#1f2937" },
  headerTitle:  { color: "#fff", fontSize: 20, fontWeight: "900" },
  headerSub:    { color: "#6b7280", fontSize: 12, marginTop: 2 },
  logoutBtn:    { backgroundColor: "#dc2626", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  logoutText:   { color: "#fff", fontWeight: "700", fontSize: 13 },
  scroll:       { flex: 1 },
  grid:         { flexDirection: "row", flexWrap: "wrap", padding: 16, gap: 12 },
  kpiCard:      { backgroundColor: "#111827", borderRadius: 20, padding: 20, width: "47%", borderWidth: 1, borderColor: "#1f2937", alignItems: "center" },
  kpiIcon:      { fontSize: 28, marginBottom: 8 },
  kpiValue:     { color: "#fff", fontSize: 28, fontWeight: "900" },
  kpiLabel:     { color: "#6b7280", fontSize: 12, marginTop: 4, textAlign: "center" },
  chartSection: { margin: 16, backgroundColor: "#111827", borderRadius: 20, padding: 16, borderWidth: 1, borderColor: "#1f2937" },
  sectionTitle: { color: "#fff", fontSize: 16, fontWeight: "700", marginBottom: 12 },
  chart:        { borderRadius: 16 },
});
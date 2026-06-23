import { useState }            from "react";
import {
  View, Text, FlatList, StyleSheet,
  TouchableOpacity, RefreshControl, Alert,
} from "react-native";
import { useGetAttendanceQuery, useMarkAttendanceMutation } from "../../features/attendance/attendanceApi";

export default function AttendanceScreen() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const { data, isLoading, refetch } = useGetAttendanceQuery(selectedDate);
  const [markAttendance, { isLoading: marking }] = useMarkAttendanceMutation();

  const students = Array.isArray(data?.data) ? data.data : [];

  const summary = {
    PRESENT: students.filter((s) => s.status === "PRESENT").length,
    ABSENT:  students.filter((s) => s.status === "ABSENT").length,
    LATE:    students.filter((s) => s.status === "LATE").length,
    PENDING: students.filter((s) => s.status === "PENDING").length,
  };

  const statusColor = {
    PRESENT: "#22c55e",
    ABSENT:  "#ef4444",
    LATE:    "#eab308",
    PENDING: "#6b7280",
  };

  const handleMark = async (studentId, status) => {
    try {
      await markAttendance({ studentId, status, date: selectedDate }).unwrap();
      refetch();
    } catch (err) {
      Alert.alert("Error", err?.data?.message || "Could not mark attendance");
    }
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>📋 Attendance</Text>
        <Text style={s.date}>{selectedDate}</Text>
      </View>

      {/* SUMMARY */}
      <View style={s.summaryRow}>
        {Object.entries(summary).map(([status, count]) => (
          <View key={status} style={[s.summaryCard, { borderColor: statusColor[status] }]}>
            <Text style={[s.summaryCount, { color: statusColor[status] }]}>{count}</Text>
            <Text style={s.summaryLabel}>{status}</Text>
          </View>
        ))}
      </View>

      <FlatList
        data={students}
        keyExtractor={(item) => item.student_id}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#3b82f6" />
        }
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListEmptyComponent={
          <Text style={s.empty}>No students found</Text>
        }
        renderItem={({ item }) => (
          <View style={s.card}>
            <View style={s.cardRow}>
              <View style={s.avatar}>
                <Text style={s.avatarText}>
                  {item.first_name?.[0]}{item.last_name?.[0]}
                </Text>
              </View>
              <View style={s.cardInfo}>
                <Text style={s.name}>{item.first_name} {item.last_name}</Text>
                <View style={[s.statusBadge, { backgroundColor: `${statusColor[item.status]}20` }]}>
                  <Text style={[s.statusText, { color: statusColor[item.status] }]}>
                    {item.status}
                  </Text>
                </View>
              </View>
            </View>
            <View style={s.buttonsRow}>
              {[
                { status: "PRESENT", emoji: "✅" },
                { status: "ABSENT",  emoji: "❌" },
                { status: "LATE",    emoji: "⏰" },
              ].map(({ status, emoji }) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    s.markBtn,
                    item.status === status && {
                      backgroundColor: `${statusColor[status]}30`,
                      borderColor: statusColor[status],
                    },
                  ]}
                  onPress={() => handleMark(item.student_id, status)}
                  disabled={marking}
                >
                  <Text style={[
                    s.markBtnText,
                    item.status === status && { color: statusColor[status] },
                  ]}>
                    {emoji} {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container:    { flex: 1, backgroundColor: "#0f172a" },
  header:       { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20, paddingTop: 56, backgroundColor: "#111827", borderBottomWidth: 1, borderBottomColor: "#1f2937" },
  title:        { color: "#fff", fontSize: 20, fontWeight: "900" },
  date:         { color: "#6b7280", fontSize: 13 },
  summaryRow:   { flexDirection: "row", padding: 16, gap: 8 },
  summaryCard:  { flex: 1, backgroundColor: "#111827", borderRadius: 16, padding: 12, alignItems: "center", borderWidth: 1 },
  summaryCount: { fontSize: 24, fontWeight: "900" },
  summaryLabel: { color: "#6b7280", fontSize: 10, marginTop: 2 },
  empty:        { color: "#6b7280", textAlign: "center", marginTop: 40 },
  card:         { backgroundColor: "#111827", borderRadius: 20, padding: 16, borderWidth: 1, borderColor: "#1f2937" },
  cardRow:      { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  avatar:       { width: 40, height: 40, borderRadius: 20, backgroundColor: "#2563eb", justifyContent: "center", alignItems: "center", marginRight: 12 },
  avatarText:   { color: "#fff", fontWeight: "700" },
  cardInfo:     { flex: 1 },
  name:         { color: "#fff", fontWeight: "700", fontSize: 15 },
  statusBadge:  { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, marginTop: 4 },
  statusText:   { fontSize: 11, fontWeight: "700" },
  buttonsRow:   { flexDirection: "row", gap: 8 },
  markBtn:      { flex: 1, padding: 8, borderRadius: 12, borderWidth: 1, borderColor: "#374151", alignItems: "center" },
  markBtnText:  { color: "#6b7280", fontSize: 11, fontWeight: "600" },
});
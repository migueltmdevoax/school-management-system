import {
  View, Text, FlatList, StyleSheet, RefreshControl,
} from "react-native";
import { useGetMyAssignmentsQuery } from "../../features/assignments/api/assignmentsApi";

export default function ParentAssignmentsScreen() {
  const { data, isLoading, refetch } = useGetMyAssignmentsQuery();
  const assignments = data?.data || [];

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>📚 Assignments</Text>
        <Text style={s.sub}>Your children's assignments</Text>
      </View>
      <FlatList
        data={assignments}
        // 🔥 Fix: combina assignment.id + índice para garantizar unicidad
        // cuando varios hijos comparten el mismo assignment
        keyExtractor={(item, index) => `${item.id}-${item.student_id || index}`}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#3b82f6" />}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListEmptyComponent={<Text style={s.empty}>No assignments yet</Text>}
        renderItem={({ item }) => (
          <View style={s.card}>
            <View style={s.cardRow}>
              <View style={s.cardInfo}>
                <Text style={s.name}>{item.title}</Text>
                {item.description ? <Text style={s.desc}>{item.description}</Text> : null}
                {(item.first_name || item.last_name) && (
                  <Text style={s.student}>👨‍🎓 {item.first_name} {item.last_name}</Text>
                )}
              </View>
              {item.due_date && (
                <View style={s.dueBadge}>
                  <Text style={s.dueText}>Due</Text>
                  <Text style={s.dueDate}>{item.due_date}</Text>
                </View>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container:  { flex: 1, backgroundColor: "#0f172a" },
  header:     { padding: 20, paddingTop: 56, backgroundColor: "#111827", borderBottomWidth: 1, borderBottomColor: "#1f2937" },
  title:      { color: "#fff", fontSize: 20, fontWeight: "900" },
  sub:        { color: "#6b7280", fontSize: 12, marginTop: 2 },
  empty:      { color: "#6b7280", textAlign: "center", marginTop: 40 },
  card:       { backgroundColor: "#111827", borderRadius: 20, padding: 16, borderWidth: 1, borderColor: "#1f2937" },
  cardRow:    { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  cardInfo:   { flex: 1, marginRight: 12 },
  name:       { color: "#fff", fontWeight: "700", fontSize: 15 },
  desc:       { color: "#9ca3af", fontSize: 13, marginTop: 4 },
  student:    { color: "#818cf8", fontSize: 12, marginTop: 6 },
  dueBadge:   { backgroundColor: "#1e3a5f", borderRadius: 12, padding: 10, alignItems: "center", minWidth: 70 },
  dueText:    { color: "#60a5fa", fontSize: 11, fontWeight: "600" },
  dueDate:    { color: "#93c5fd", fontSize: 11, marginTop: 2 },
});
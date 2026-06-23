import {
  View, Text, FlatList, StyleSheet, RefreshControl,
} from "react-native";
import { useGetGradesQuery } from "../../features/grades/api/gradesApi";

export default function ParentGradesScreen() {
  const { data, isLoading, refetch } = useGetGradesQuery();
  const grades = data?.data || [];

  const gradeColor = (g) =>
    g >= 90 ? "#22c55e" : g >= 70 ? "#eab308" : "#ef4444";

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>📝 Grades</Text>
      </View>
      <FlatList
        data={grades}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#3b82f6" />}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListEmptyComponent={<Text style={s.empty}>No grades yet</Text>}
        renderItem={({ item }) => (
          <View style={s.card}>
            <View style={s.cardRow}>
              <View style={s.cardInfo}>
                <Text style={s.name}>{item.first_name} {item.last_name}</Text>
                <Text style={s.assignment}>{item.assignment_title}</Text>
                {item.feedback ? <Text style={s.feedback}>{item.feedback}</Text> : null}
                <Text style={s.date}>{new Date(item.created_at).toLocaleDateString()}</Text>
              </View>
              <View style={[s.gradeBadge, { backgroundColor: `${gradeColor(item.grade)}20` }]}>
                <Text style={[s.gradeText, { color: gradeColor(item.grade) }]}>{item.grade}</Text>
              </View>
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
  empty:      { color: "#6b7280", textAlign: "center", marginTop: 40 },
  card:       { backgroundColor: "#111827", borderRadius: 20, padding: 16, borderWidth: 1, borderColor: "#1f2937" },
  cardRow:    { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardInfo:   { flex: 1, marginRight: 12 },
  name:       { color: "#fff", fontWeight: "700", fontSize: 15 },
  assignment: { color: "#6b7280", fontSize: 13, marginTop: 2 },
  feedback:   { color: "#9ca3af", fontSize: 12, marginTop: 4 },
  date:       { color: "#6b7280", fontSize: 11, marginTop: 6 },
  gradeBadge: { width: 56, height: 56, borderRadius: 16, justifyContent: "center", alignItems: "center" },
  gradeText:  { fontWeight: "900", fontSize: 22 },
});
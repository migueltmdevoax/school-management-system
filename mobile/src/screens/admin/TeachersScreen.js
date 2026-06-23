import { useState } from "react";
import {
  View, Text, FlatList, StyleSheet,
  TouchableOpacity, TextInput, Alert, RefreshControl,
} from "react-native";
import { useGetTeachersQuery, useDeleteTeacherMutation } from "../../features/teachers/teachersApi";

export default function TeachersScreen() {
  const { data, isLoading, refetch } = useGetTeachersQuery();
  const [deleteTeacher] = useDeleteTeacherMutation();
  const [search, setSearch] = useState("");

  const teachers = data?.data || [];
  const filtered = teachers.filter((t) =>
    `${t.first_name} ${t.last_name}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (teacher) => {
    Alert.alert(
      "Delete Teacher",
      `Delete ${teacher.first_name} ${teacher.last_name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteTeacher(teacher.id) },
      ]
    );
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>👨‍🏫 Teachers</Text>
      </View>

      <View style={s.searchBox}>
        <TextInput
          style={s.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search teachers..."
          placeholderTextColor="#6b7280"
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#3b82f6" />}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListEmptyComponent={<Text style={s.empty}>No teachers found</Text>}
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
                <Text style={s.email}>{item.email}</Text>
                <Text style={s.groups}>📚 {item.groups_count} groups</Text>
              </View>
            </View>
            <TouchableOpacity style={s.deleteBtn} onPress={() => handleDelete(item)}>
              <Text style={s.deleteBtnText}>🗑 Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container:    { flex: 1, backgroundColor: "#0f172a" },
  header:       { padding: 20, paddingTop: 56, backgroundColor: "#111827", borderBottomWidth: 1, borderBottomColor: "#1f2937" },
  title:        { color: "#fff", fontSize: 20, fontWeight: "900" },
  searchBox:    { padding: 16 },
  searchInput:  { backgroundColor: "#111827", borderRadius: 16, padding: 14, color: "#fff", borderWidth: 1, borderColor: "#1f2937" },
  empty:        { color: "#6b7280", textAlign: "center", marginTop: 40 },
  card:         { backgroundColor: "#111827", borderRadius: 20, padding: 16, borderWidth: 1, borderColor: "#1f2937" },
  cardRow:      { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  avatar:       { width: 44, height: 44, borderRadius: 22, backgroundColor: "#7c3aed", justifyContent: "center", alignItems: "center", marginRight: 12 },
  avatarText:   { color: "#fff", fontWeight: "700", fontSize: 16 },
  cardInfo:     { flex: 1 },
  name:         { color: "#fff", fontWeight: "700", fontSize: 15 },
  email:        { color: "#6b7280", fontSize: 12, marginTop: 2 },
  groups:       { color: "#6b7280", fontSize: 12, marginTop: 2 },
  deleteBtn:    { backgroundColor: "rgba(239,68,68,0.1)", borderRadius: 12, padding: 10, alignItems: "center", borderWidth: 1, borderColor: "rgba(239,68,68,0.3)" },
  deleteBtnText:{ color: "#ef4444", fontWeight: "600", fontSize: 13 },
});
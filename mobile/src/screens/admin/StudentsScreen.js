import { useState } from "react";
import {
  View, Text, FlatList, StyleSheet,
  TouchableOpacity, TextInput, Alert,
  RefreshControl, Modal, KeyboardAvoidingView, Platform,
} from "react-native";
import {
  useGetStudentsQuery,
  useAddStudentMutation,
  useDeleteStudentMutation,
} from "../../features/students/studentsApi";

export default function StudentsScreen() {
  const { data: students = [], isLoading, refetch } = useGetStudentsQuery();
  const [addStudent,    { isLoading: adding }]   = useAddStudentMutation();
  const [deleteStudent]                           = useDeleteStudentMutation();

  const [search,      setSearch]      = useState("");
  const [showModal,   setShowModal]   = useState(false);
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "",
    tutor_name: "", tutor_phone: "",
  });

  const filtered = students.filter((s) =>
    `${s.first_name} ${s.last_name}`.toLowerCase().includes(search.toLowerCase())
  );

  const riskColor = { high: "#ef4444", medium: "#eab308", low: "#22c55e" };

  const handleAdd = async () => {
    if (!form.first_name || !form.last_name) {
      Alert.alert("Error", "First name and last name are required");
      return;
    }
    try {
      await addStudent(form).unwrap();
      setShowModal(false);
      setForm({ first_name: "", last_name: "", email: "", tutor_name: "", tutor_phone: "" });
    } catch (err) {
      Alert.alert("Error", err?.data?.message || "Error creating student");
    }
  };

  const handleDelete = (student) => {
    Alert.alert(
      "Delete Student",
      `Are you sure you want to delete ${student.first_name} ${student.last_name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteStudent(student.id) },
      ]
    );
  };

  return (
    <View style={s.container}>
      {/* HEADER */}
      <View style={s.header}>
        <Text style={s.title}>👨‍🎓 Students</Text>
        <TouchableOpacity style={s.addBtn} onPress={() => setShowModal(true)}>
          <Text style={s.addBtnText}>+ New</Text>
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <View style={s.searchBox}>
        <TextInput
          style={s.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search students..."
          placeholderTextColor="#6b7280"
        />
      </View>

      {/* LIST */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#3b82f6" />}
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
                <Text style={s.email}>{item.email || "No email"}</Text>
              </View>
              <View style={[s.riskDot, { backgroundColor: riskColor[item.metrics?.risk] || "#22c55e" }]} />
            </View>

            <View style={s.metrics}>
              <Metric label="Avg"       value={item.metrics?.average      || 0} />
              <Metric label="Incidents" value={item.metrics?.incidents     || 0} />
              <Metric label="Payments"  value={item.metrics?.pendingPayments || 0} />
              <Metric label="Attend."   value={`${item.metrics?.attendanceRate || 0}%`} />
            </View>

            <TouchableOpacity
              style={s.deleteBtn}
              onPress={() => handleDelete(item)}
            >
              <Text style={s.deleteBtnText}>🗑 Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* CREATE MODAL */}
      <Modal visible={showModal} transparent animationType="slide">
        <KeyboardAvoidingView
          style={s.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={s.modalCard}>
            <Text style={s.modalTitle}>👨‍🎓 New Student</Text>

            {[
              { label: "First Name *", key: "first_name" },
              { label: "Last Name *",  key: "last_name" },
              { label: "Email",        key: "email" },
              { label: "Tutor Name",   key: "tutor_name" },
              { label: "Tutor Phone",  key: "tutor_phone" },
            ].map((f) => (
              <View key={f.key}>
                <Text style={s.modalLabel}>{f.label}</Text>
                <TextInput
                  style={s.modalInput}
                  value={form[f.key]}
                  onChangeText={(v) => setForm((p) => ({ ...p, [f.key]: v }))}
                  placeholderTextColor="#6b7280"
                  placeholder={f.label}
                />
              </View>
            ))}

            <View style={s.modalActions}>
              <TouchableOpacity
                style={s.cancelBtn}
                onPress={() => setShowModal(false)}
              >
                <Text style={s.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[s.saveBtn, adding && s.btnDisabled]}
                onPress={handleAdd}
                disabled={adding}
              >
                <Text style={s.saveBtnText}>{adding ? "Saving..." : "Create"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

function Metric({ label, value }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>{value}</Text>
      <Text style={{ color: "#6b7280", fontSize: 11 }}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container:    { flex: 1, backgroundColor: "#0f172a" },
  header:       { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20, paddingTop: 56, backgroundColor: "#111827", borderBottomWidth: 1, borderBottomColor: "#1f2937" },
  title:        { color: "#fff", fontSize: 20, fontWeight: "900" },
  addBtn:       { backgroundColor: "#2563eb", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  addBtnText:   { color: "#fff", fontWeight: "700" },
  searchBox:    { padding: 16 },
  searchInput:  { backgroundColor: "#111827", borderRadius: 16, padding: 14, color: "#fff", borderWidth: 1, borderColor: "#1f2937", fontSize: 15 },
  empty:        { color: "#6b7280", textAlign: "center", marginTop: 40, fontSize: 15 },
  card:         { backgroundColor: "#111827", borderRadius: 20, padding: 16, borderWidth: 1, borderColor: "#1f2937" },
  cardRow:      { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  avatar:       { width: 44, height: 44, borderRadius: 22, backgroundColor: "#2563eb", justifyContent: "center", alignItems: "center", marginRight: 12 },
  avatarText:   { color: "#fff", fontWeight: "700", fontSize: 16 },
  cardInfo:     { flex: 1 },
  name:         { color: "#fff", fontWeight: "700", fontSize: 15 },
  email:        { color: "#6b7280", fontSize: 12, marginTop: 2 },
  riskDot:      { width: 12, height: 12, borderRadius: 6 },
  metrics:      { flexDirection: "row", justifyContent: "space-around", paddingVertical: 12, borderTopWidth: 1, borderTopColor: "#1f2937", marginBottom: 12 },
  deleteBtn:    { backgroundColor: "rgba(239,68,68,0.1)", borderRadius: 12, padding: 10, alignItems: "center", borderWidth: 1, borderColor: "rgba(239,68,68,0.3)" },
  deleteBtnText:{ color: "#ef4444", fontWeight: "600", fontSize: 13 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "flex-end" },
  modalCard:    { backgroundColor: "#111827", borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, gap: 12 },
  modalTitle:   { color: "#fff", fontSize: 20, fontWeight: "900", marginBottom: 8 },
  modalLabel:   { color: "#9ca3af", fontSize: 13, marginBottom: 4 },
  modalInput:   { backgroundColor: "#1f2937", borderRadius: 14, padding: 14, color: "#fff", borderWidth: 1, borderColor: "#374151", marginBottom: 4 },
  modalActions: { flexDirection: "row", gap: 12, marginTop: 8 },
  cancelBtn:    { flex: 1, backgroundColor: "#1f2937", borderRadius: 14, padding: 14, alignItems: "center" },
  cancelText:   { color: "#fff", fontWeight: "600" },
  saveBtn:      { flex: 1, backgroundColor: "#2563eb", borderRadius: 14, padding: 14, alignItems: "center" },
  saveBtnText:  { color: "#fff", fontWeight: "700" },
  btnDisabled:  { opacity: 0.5 },
});
import { useState } from "react";
import {
  View, Text, FlatList, StyleSheet,
  TouchableOpacity, Modal, TextInput,
  KeyboardAvoidingView, Platform, Alert, RefreshControl,
} from "react-native";
import { useGetAllIncidentsQuery, useCreateIncidentMutation, useDeleteIncidentMutation } from "../../features/incidents/incidentsApi";
import { useGetStudentsQuery } from "../../features/students/studentsApi";
import { useSelector }         from "react-redux";

export default function IncidentsScreen() {
  const { user } = useSelector((s) => s.auth);
  const { data, isLoading, refetch } = useGetAllIncidentsQuery();
  const { data: studentsData = [] }  = useGetStudentsQuery();
  const [createIncident, { isLoading: creating }] = useCreateIncidentMutation();
  const [deleteIncident]                          = useDeleteIncidentMutation();

  const incidents = data?.data || [];
  const students  = studentsData || [];

  const [showModal,  setShowModal]  = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [form, setForm] = useState({ studentId: "", title: "", description: "", severity: "LOW" });

  const severityColor = { HIGH: "#ef4444", MEDIUM: "#eab308", LOW: "#22c55e" };

  const handleCreate = async () => {
    if (!form.studentId || !form.title) {
      Alert.alert("Error", "Student and title are required");
      return;
    }
    try {
      await createIncident({ ...form, teacherId: user?.teacher_id || null }).unwrap();
      setShowModal(false);
      setForm({ studentId: "", title: "", description: "", severity: "LOW" });
      setSelectedStudent(null);
    } catch (err) {
      Alert.alert("Error", err?.data?.message || "Error creating incident");
    }
  };

  const handleDelete = (id) => {
    Alert.alert("Delete Incident", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteIncident(id) },
    ]);
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>🚨 Incidents</Text>
        <TouchableOpacity style={s.addBtn} onPress={() => setShowModal(true)}>
          <Text style={s.addBtnText}>+ New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={incidents}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#3b82f6" />}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListEmptyComponent={<Text style={s.empty}>No incidents found</Text>}
        renderItem={({ item }) => (
          <View style={s.card}>
            <View style={s.cardRow}>
              <View style={s.cardInfo}>
                <Text style={s.name}>{item.title}</Text>
                <Text style={s.student}>{item.first_name} {item.last_name}</Text>
                {item.description ? <Text style={s.desc}>{item.description}</Text> : null}
              </View>
              <View style={[s.badge, { backgroundColor: `${severityColor[item.severity]}20` }]}>
                <Text style={[s.badgeText, { color: severityColor[item.severity] }]}>{item.severity}</Text>
              </View>
            </View>
            <View style={s.cardFooter}>
              <Text style={s.date}>{new Date(item.created_at).toLocaleDateString()}</Text>
              {user?.role === "admin" && (
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Text style={s.deleteText}>🗑 Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />

      {/* CREATE MODAL */}
      <Modal visible={showModal} transparent animationType="slide">
        <KeyboardAvoidingView style={s.overlay} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={s.modalCard}>
            <Text style={s.modalTitle}>🚨 New Incident</Text>

            <Text style={s.modalLabel}>Student *</Text>
            <TouchableOpacity style={s.pickerBtn} onPress={() => setShowPicker(true)}>
              <Text style={{ color: selectedStudent ? "#fff" : "#6b7280" }}>
                {selectedStudent ? `${selectedStudent.first_name} ${selectedStudent.last_name}` : "Select student"}
              </Text>
            </TouchableOpacity>

            <Text style={s.modalLabel}>Title *</Text>
            <TextInput
              style={s.input}
              value={form.title}
              onChangeText={(v) => setForm((p) => ({ ...p, title: v }))}
              placeholder="Incident title"
              placeholderTextColor="#6b7280"
            />

            <Text style={s.modalLabel}>Description</Text>
            <TextInput
              style={[s.input, { height: 80 }]}
              value={form.description}
              onChangeText={(v) => setForm((p) => ({ ...p, description: v }))}
              placeholder="Describe the incident..."
              placeholderTextColor="#6b7280"
              multiline
            />

            <Text style={s.modalLabel}>Severity</Text>
            <View style={s.severityRow}>
              {["LOW","MEDIUM","HIGH"].map((sv) => (
                <TouchableOpacity
                  key={sv}
                  style={[s.severityBtn, form.severity === sv && { backgroundColor: `${severityColor[sv]}30`, borderColor: severityColor[sv] }]}
                  onPress={() => setForm((p) => ({ ...p, severity: sv }))}
                >
                  <Text style={[s.severityText, form.severity === sv && { color: severityColor[sv] }]}>{sv}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={s.modalActions}>
              <TouchableOpacity style={s.cancelBtn} onPress={() => setShowModal(false)}>
                <Text style={{ color: "#fff", fontWeight: "600" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[s.saveBtn, creating && { opacity: 0.5 }]} onPress={handleCreate} disabled={creating}>
                <Text style={{ color: "#fff", fontWeight: "700" }}>{creating ? "Saving..." : "Register"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* STUDENT PICKER */}
      <Modal visible={showPicker} transparent animationType="slide">
        <View style={s.overlay}>
          <View style={s.modalCard}>
            <Text style={s.modalTitle}>Select Student</Text>
            <FlatList
              data={students}
              keyExtractor={(item) => item.id}
              style={{ maxHeight: 300 }}
              renderItem={({ item }) => (
                <TouchableOpacity style={s.pickerItem} onPress={() => {
                  setSelectedStudent(item);
                  setForm((p) => ({ ...p, studentId: item.id }));
                  setShowPicker(false);
                }}>
                  <Text style={{ color: "#fff" }}>{item.first_name} {item.last_name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={s.cancelBtn} onPress={() => setShowPicker(false)}>
              <Text style={{ color: "#fff", fontWeight: "600" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container:   { flex: 1, backgroundColor: "#0f172a" },
  header:      { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20, paddingTop: 56, backgroundColor: "#111827", borderBottomWidth: 1, borderBottomColor: "#1f2937" },
  title:       { color: "#fff", fontSize: 20, fontWeight: "900" },
  addBtn:      { backgroundColor: "#dc2626", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  addBtnText:  { color: "#fff", fontWeight: "700" },
  empty:       { color: "#6b7280", textAlign: "center", marginTop: 40 },
  card:        { backgroundColor: "#111827", borderRadius: 20, padding: 16, borderWidth: 1, borderColor: "#1f2937" },
  cardRow:     { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 },
  cardInfo:    { flex: 1, marginRight: 12 },
  name:        { color: "#fff", fontWeight: "700", fontSize: 15 },
  student:     { color: "#6b7280", fontSize: 12, marginTop: 2 },
  desc:        { color: "#9ca3af", fontSize: 13, marginTop: 4 },
  badge:       { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText:   { fontWeight: "700", fontSize: 12 },
  cardFooter:  { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  date:        { color: "#6b7280", fontSize: 12 },
  deleteText:  { color: "#ef4444", fontWeight: "600", fontSize: 13 },
  overlay:     { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "flex-end" },
  modalCard:   { backgroundColor: "#111827", borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, gap: 12 },
  modalTitle:  { color: "#fff", fontSize: 20, fontWeight: "900", marginBottom: 8 },
  modalLabel:  { color: "#9ca3af", fontSize: 13 },
  input:       { backgroundColor: "#1f2937", borderRadius: 14, padding: 14, color: "#fff", borderWidth: 1, borderColor: "#374151" },
  pickerBtn:   { backgroundColor: "#1f2937", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "#374151" },
  pickerItem:  { padding: 14, borderBottomWidth: 1, borderBottomColor: "#1f2937" },
  severityRow: { flexDirection: "row", gap: 8 },
  severityBtn: { flex: 1, padding: 10, borderRadius: 12, borderWidth: 1, borderColor: "#374151", alignItems: "center" },
  severityText:{ color: "#6b7280", fontWeight: "600", fontSize: 13 },
  modalActions:{ flexDirection: "row", gap: 12, marginTop: 8 },
  cancelBtn:   { flex: 1, backgroundColor: "#1f2937", borderRadius: 14, padding: 14, alignItems: "center" },
  saveBtn:     { flex: 1, backgroundColor: "#dc2626", borderRadius: 14, padding: 14, alignItems: "center" },
});
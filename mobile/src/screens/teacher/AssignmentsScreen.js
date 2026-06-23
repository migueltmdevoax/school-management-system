import { useState }           from "react";
import {
  View, Text, FlatList, StyleSheet,
  TouchableOpacity, Modal, TextInput,
  KeyboardAvoidingView, Platform, Alert, RefreshControl,
} from "react-native";
import { useSelector }         from "react-redux";
import { useGetMyAssignmentsQuery, useCreateAssignmentMutation, useDeleteAssignmentMutation } from "../../features/assignments/api/assignmentsApi";
import { useGetGroupsQuery }   from "../../features/groups/groupsApi";

export default function AssignmentsScreen() {
  const { user } = useSelector((s) => s.auth);
  const isParent  = user?.role === "parent";

  const { data, isLoading, refetch }                = useGetMyAssignmentsQuery();
  const { data: groupsData }                        = useGetGroupsQuery(undefined, { skip: isParent });
  const [createAssignment, { isLoading: creating }] = useCreateAssignmentMutation();
  const [deleteAssignment]                          = useDeleteAssignmentMutation();

  const assignments = data?.data   || [];
  const groups      = groupsData?.data || [];

  const [showModal,      setShowModal]      = useState(false);
  const [showGroupPick,  setShowGroupPick]  = useState(false);
  const [selectedGroup,  setSelectedGroup]  = useState(null);
  const [form, setForm] = useState({
    title: "", description: "", due_date: "", max_score: "10",
  });

  const handleCreate = async () => {
    if (!form.title) {
      Alert.alert("Error", "Title is required");
      return;
    }
    if (!selectedGroup) {
      Alert.alert("Error", "Please select a group");
      return;
    }
    try {
      await createAssignment({
        title:       form.title,
        description: form.description,
        due_date:    form.due_date || null,
        max_score:   Number(form.max_score) || 10,
        teacher_id:  user?.teacher_id || null,
        group_id:    selectedGroup.id,
        published:   true,
        status:      "ACTIVE",
      }).unwrap();
      setShowModal(false);
      setForm({ title: "", description: "", due_date: "", max_score: "10" });
      setSelectedGroup(null);
      refetch();
    } catch (err) {
      Alert.alert("Error", err?.data?.message || "Error creating assignment");
    }
  };

  const handleDelete = (id) => {
    Alert.alert("Delete", "Delete this assignment?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteAssignment(id) },
    ]);
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>📚 Assignments</Text>
        {!isParent && (
          <TouchableOpacity style={s.addBtn} onPress={() => setShowModal(true)}>
            <Text style={s.addBtnText}>+ New</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={assignments}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#3b82f6" />}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListEmptyComponent={<Text style={s.empty}>No assignments yet</Text>}
        renderItem={({ item }) => (
          <View style={s.card}>
            <View style={s.cardRow}>
              <View style={s.cardInfo}>
                <Text style={s.name}>{item.title}</Text>
                {item.description ? <Text style={s.desc}>{item.description}</Text> : null}
                {item.due_date && <Text style={s.meta}>Due: {item.due_date}</Text>}
              </View>
              <View style={s.scoreBadge}>
                <Text style={s.scoreText}>{item.max_score || 10}</Text>
                <Text style={s.scoreLabel}>pts</Text>
              </View>
            </View>
            {!isParent && (
              <TouchableOpacity style={s.deleteBtn} onPress={() => handleDelete(item.id)}>
                <Text style={s.deleteBtnText}>🗑 Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {/* CREATE MODAL */}
      {!isParent && (
        <Modal visible={showModal} transparent animationType="slide">
          <KeyboardAvoidingView style={s.overlay} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={s.modalCard}>
              <Text style={s.modalTitle}>📚 New Assignment</Text>

              <Text style={s.modalLabel}>Title *</Text>
              <TextInput style={s.input} value={form.title}
                onChangeText={(v) => setForm((p) => ({ ...p, title: v }))}
                placeholder="Assignment title" placeholderTextColor="#6b7280" />

              <Text style={s.modalLabel}>Description</Text>
              <TextInput style={[s.input, { height: 80 }]} value={form.description}
                onChangeText={(v) => setForm((p) => ({ ...p, description: v }))}
                placeholder="Instructions..." placeholderTextColor="#6b7280" multiline />

              <Text style={s.modalLabel}>Group *</Text>
              <TouchableOpacity style={s.pickerBtn} onPress={() => setShowGroupPick(true)}>
                <Text style={{ color: selectedGroup ? "#fff" : "#6b7280" }}>
                  {selectedGroup ? selectedGroup.name : "Select group"}
                </Text>
              </TouchableOpacity>

              <Text style={s.modalLabel}>Due Date</Text>
              <TextInput style={s.input} value={form.due_date}
                onChangeText={(v) => setForm((p) => ({ ...p, due_date: v }))}
                placeholder="YYYY-MM-DD" placeholderTextColor="#6b7280" />

              <Text style={s.modalLabel}>Max Score</Text>
              <TextInput style={s.input} value={form.max_score}
                onChangeText={(v) => setForm((p) => ({ ...p, max_score: v }))}
                placeholder="10" placeholderTextColor="#6b7280" keyboardType="numeric" />

              <View style={s.modalActions}>
                <TouchableOpacity style={s.cancelBtn} onPress={() => { setShowModal(false); setSelectedGroup(null); }}>
                  <Text style={{ color: "#fff", fontWeight: "600" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[s.saveBtn, creating && { opacity: 0.5 }]}
                  onPress={handleCreate} disabled={creating}>
                  <Text style={{ color: "#fff", fontWeight: "700" }}>
                    {creating ? "Saving..." : "Create"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      )}

      {/* GROUP PICKER */}
      <Modal visible={showGroupPick} transparent animationType="slide">
        <View style={s.overlay}>
          <View style={s.modalCard}>
            <Text style={s.modalTitle}>Select Group</Text>
            <FlatList data={groups} keyExtractor={(i) => i.id} style={{ maxHeight: 300 }}
              renderItem={({ item }) => (
                <TouchableOpacity style={s.pickerItem} onPress={() => {
                  setSelectedGroup(item);
                  setShowGroupPick(false);
                }}>
                  <Text style={{ color: "#fff" }}>{item.name}</Text>
                </TouchableOpacity>
              )} />
            <TouchableOpacity style={s.cancelBtn} onPress={() => setShowGroupPick(false)}>
              <Text style={{ color: "#fff", fontWeight: "600" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container:    { flex: 1, backgroundColor: "#0f172a" },
  header:       { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20, paddingTop: 56, backgroundColor: "#111827", borderBottomWidth: 1, borderBottomColor: "#1f2937" },
  title:        { color: "#fff", fontSize: 20, fontWeight: "900" },
  addBtn:       { backgroundColor: "#2563eb", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  addBtnText:   { color: "#fff", fontWeight: "700" },
  empty:        { color: "#6b7280", textAlign: "center", marginTop: 40 },
  card:         { backgroundColor: "#111827", borderRadius: 20, padding: 16, borderWidth: 1, borderColor: "#1f2937" },
  cardRow:      { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
  cardInfo:     { flex: 1, marginRight: 12 },
  name:         { color: "#fff", fontWeight: "700", fontSize: 15 },
  desc:         { color: "#9ca3af", fontSize: 13, marginTop: 4 },
  meta:         { color: "#6b7280", fontSize: 12, marginTop: 4 },
  scoreBadge:   { backgroundColor: "#1e3a5f", borderRadius: 12, padding: 10, alignItems: "center", minWidth: 50 },
  scoreText:    { color: "#60a5fa", fontWeight: "900", fontSize: 18 },
  scoreLabel:   { color: "#6b7280", fontSize: 11 },
  deleteBtn:    { backgroundColor: "rgba(239,68,68,0.1)", borderRadius: 12, padding: 10, alignItems: "center", borderWidth: 1, borderColor: "rgba(239,68,68,0.3)" },
  deleteBtnText:{ color: "#ef4444", fontWeight: "600", fontSize: 13 },
  overlay:      { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "flex-end" },
  modalCard:    { backgroundColor: "#111827", borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, gap: 12 },
  modalTitle:   { color: "#fff", fontSize: 20, fontWeight: "900", marginBottom: 8 },
  modalLabel:   { color: "#9ca3af", fontSize: 13 },
  input:        { backgroundColor: "#1f2937", borderRadius: 14, padding: 14, color: "#fff", borderWidth: 1, borderColor: "#374151" },
  pickerBtn:    { backgroundColor: "#1f2937", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "#374151" },
  pickerItem:   { padding: 14, borderBottomWidth: 1, borderBottomColor: "#1f2937" },
  modalActions: { flexDirection: "row", gap: 12, marginTop: 8 },
  cancelBtn:    { flex: 1, backgroundColor: "#1f2937", borderRadius: 14, padding: 14, alignItems: "center" },
  saveBtn:      { flex: 1, backgroundColor: "#2563eb", borderRadius: 14, padding: 14, alignItems: "center" },
});
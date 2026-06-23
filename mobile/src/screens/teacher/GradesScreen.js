import { useState } from "react";
import {
  View, Text, FlatList, StyleSheet,
  TouchableOpacity, Modal, TextInput,
  KeyboardAvoidingView, Platform, Alert, RefreshControl,
} from "react-native";
import { useDispatch }              from "react-redux";
import { useGetGradesQuery }        from "../../features/grades/api/gradesApi";
import { useGetStudentsQuery }      from "../../features/students/studentsApi";
import { useGetMyAssignmentsQuery } from "../../features/assignments/api/assignmentsApi";
import { apiSlice }                 from "../../app/api/apiSlice";
import AsyncStorage                 from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.71:3000/api";

export default function GradesScreen() {
  const dispatch = useDispatch();
  const { data: gradesRes,      isLoading, refetch } = useGetGradesQuery();
  const { data: studentsData = [] }                  = useGetStudentsQuery();
  const { data: assignmentsRes }                     = useGetMyAssignmentsQuery();

  const grades      = gradesRes?.data      || [];
  const students    = studentsData         || [];
  const assignments = assignmentsRes?.data || [];

  const [showModal,       setShowModal]       = useState(false);
  const [showStudentPick, setShowStudentPick] = useState(false);
  const [showAssignPick,  setShowAssignPick]  = useState(false);
  const [selStudent,      setSelStudent]      = useState(null);
  const [selAssignment,   setSelAssignment]   = useState(null);
  const [grade,    setGrade]    = useState("");
  const [feedback, setFeedback] = useState("");
  const [creating, setCreating] = useState(false);

  const gradeColor = (g) =>
    g >= 90 ? "#22c55e" : g >= 70 ? "#eab308" : "#ef4444";

  const handleCreate = async () => {
    if (!selStudent || !selAssignment || !grade) {
      Alert.alert("Error", "Student, assignment and grade are required");
      return;
    }
    const gradeNum = Number(grade);
    if (gradeNum < 0 || gradeNum > 100) {
      Alert.alert("Error", "Grade must be between 0 and 100");
      return;
    }
    setCreating(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const res   = await fetch(`${API_URL}/grades/assignment-student`, {
        method:  "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:  `Bearer ${token}`,
        },
        body: JSON.stringify({
          assignment_id: selAssignment.id,
          student_id:    selStudent.id,
          grade:         gradeNum,
          feedback,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        Alert.alert("Error", data.message || "Error creating grade");
        return;
      }
      dispatch(apiSlice.util.invalidateTags(["Grades"]));
      setShowModal(false);
      setSelStudent(null);
      setSelAssignment(null);
      setGrade("");
      setFeedback("");
    } catch (err) {
      Alert.alert("Error", err.message || "Error creating grade");
    } finally {
      setCreating(false);
    }
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>📝 Grades</Text>
        <TouchableOpacity style={s.addBtn} onPress={() => setShowModal(true)}>
          <Text style={s.addBtnText}>+ New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={grades}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#3b82f6" />
        }
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListEmptyComponent={
          <Text style={s.empty}>No grades yet</Text>
        }
        renderItem={({ item }) => (
          <View style={s.card}>
            <View style={s.cardRow}>
              <View style={s.cardInfo}>
                <Text style={s.name}>{item.first_name} {item.last_name}</Text>
                <Text style={s.assignment}>{item.assignment_title}</Text>
                {item.feedback ? <Text style={s.feedback}>{item.feedback}</Text> : null}
              </View>
              <View style={[s.gradeBadge, { backgroundColor: `${gradeColor(item.grade)}20` }]}>
                <Text style={[s.gradeText, { color: gradeColor(item.grade) }]}>
                  {item.grade}
                </Text>
              </View>
            </View>
            <Text style={s.date}>
              {new Date(item.created_at).toLocaleDateString()}
            </Text>
          </View>
        )}
      />

      {/* CREATE MODAL */}
      <Modal visible={showModal} transparent animationType="slide">
        <KeyboardAvoidingView
          style={s.overlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={s.modalCard}>
            <Text style={s.modalTitle}>📝 New Grade</Text>

            <Text style={s.modalLabel}>Student *</Text>
            <TouchableOpacity
              style={s.pickerBtn}
              onPress={() => setShowStudentPick(true)}
            >
              <Text style={{ color: selStudent ? "#fff" : "#6b7280" }}>
                {selStudent
                  ? `${selStudent.first_name} ${selStudent.last_name}`
                  : "Select student"}
              </Text>
            </TouchableOpacity>

            <Text style={s.modalLabel}>Assignment *</Text>
            <TouchableOpacity
              style={s.pickerBtn}
              onPress={() => setShowAssignPick(true)}
            >
              <Text style={{ color: selAssignment ? "#fff" : "#6b7280" }}>
                {selAssignment ? selAssignment.title : "Select assignment"}
              </Text>
            </TouchableOpacity>

            <Text style={s.modalLabel}>Grade (0-100) *</Text>
            <TextInput
              style={s.input}
              value={grade}
              onChangeText={setGrade}
              placeholder="85"
              placeholderTextColor="#6b7280"
              keyboardType="numeric"
            />

            <Text style={s.modalLabel}>Feedback</Text>
            <TextInput
              style={s.input}
              value={feedback}
              onChangeText={setFeedback}
              placeholder="Optional feedback..."
              placeholderTextColor="#6b7280"
            />

            <View style={s.modalActions}>
              <TouchableOpacity
                style={s.cancelBtn}
                onPress={() => setShowModal(false)}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[s.saveBtn, creating && { opacity: 0.5 }]}
                onPress={handleCreate}
                disabled={creating}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>
                  {creating ? "Saving..." : "Save Grade"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* STUDENT PICKER */}
      <Modal visible={showStudentPick} transparent animationType="slide">
        <View style={s.overlay}>
          <View style={s.modalCard}>
            <Text style={s.modalTitle}>Select Student</Text>
            <FlatList
              data={students}
              keyExtractor={(i) => i.id}
              style={{ maxHeight: 300 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={s.pickerItem}
                  onPress={() => {
                    setSelStudent(item);
                    setShowStudentPick(false);
                  }}
                >
                  <Text style={{ color: "#fff" }}>
                    {item.first_name} {item.last_name}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={s.cancelBtn}
              onPress={() => setShowStudentPick(false)}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ASSIGNMENT PICKER */}
      <Modal visible={showAssignPick} transparent animationType="slide">
        <View style={s.overlay}>
          <View style={s.modalCard}>
            <Text style={s.modalTitle}>Select Assignment</Text>
            <FlatList
              data={assignments}
              keyExtractor={(i) => i.id}
              style={{ maxHeight: 300 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={s.pickerItem}
                  onPress={() => {
                    setSelAssignment(item);
                    setShowAssignPick(false);
                  }}
                >
                  <Text style={{ color: "#fff" }}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={s.cancelBtn}
              onPress={() => setShowAssignPick(false)}
            >
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
  cardRow:      { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  cardInfo:     { flex: 1, marginRight: 12 },
  name:         { color: "#fff", fontWeight: "700", fontSize: 15 },
  assignment:   { color: "#6b7280", fontSize: 13, marginTop: 2 },
  feedback:     { color: "#9ca3af", fontSize: 12, marginTop: 4 },
  date:         { color: "#6b7280", fontSize: 11, marginTop: 8 },
  gradeBadge:   { width: 56, height: 56, borderRadius: 16, justifyContent: "center", alignItems: "center" },
  gradeText:    { fontWeight: "900", fontSize: 20 },
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
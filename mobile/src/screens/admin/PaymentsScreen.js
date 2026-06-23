import { useState } from "react";
import {
  View, Text, FlatList, StyleSheet,
  TouchableOpacity, Modal, TextInput,
  KeyboardAvoidingView, Platform, Alert, RefreshControl,
} from "react-native";
import { useGetAllPaymentsQuery, useCreatePaymentMutation, useMarkAsPaidMutation } from "../../features/payments/paymentsApi";
import { useGetStudentsQuery } from "../../features/students/studentsApi";

export default function PaymentsScreen() {
  const { data, isLoading, refetch } = useGetAllPaymentsQuery();
  const { data: studentsData = [] }  = useGetStudentsQuery();
  const [createPayment, { isLoading: creating }] = useCreatePaymentMutation();
  const [markAsPaid]                             = useMarkAsPaidMutation();

  const payments  = data?.data || [];
  const students  = studentsData || [];
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ studentId: "", amount: "", dueDate: "" });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentPicker, setShowStudentPicker] = useState(false);

  const statusColor = { PAID: "#22c55e", PENDING: "#eab308", OVERDUE: "#ef4444" };

  const handleCreate = async () => {
    if (!form.studentId || !form.amount) {
      Alert.alert("Error", "Student and amount are required");
      return;
    }
    try {
      await createPayment({ studentId: form.studentId, amount: Number(form.amount), dueDate: form.dueDate || null }).unwrap();
      setShowModal(false);
      setForm({ studentId: "", amount: "", dueDate: "" });
      setSelectedStudent(null);
    } catch (err) {
      Alert.alert("Error", err?.data?.message || "Error creating payment");
    }
  };

  const handleMarkPaid = (id) => {
    Alert.alert("Mark as Paid", "Mark this payment as paid?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => markAsPaid(id) },
    ]);
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>💰 Payments</Text>
        <TouchableOpacity style={s.addBtn} onPress={() => setShowModal(true)}>
          <Text style={s.addBtnText}>+ New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#3b82f6" />}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListEmptyComponent={<Text style={s.empty}>No payments found</Text>}
        renderItem={({ item }) => (
          <View style={s.card}>
            <View style={s.cardRow}>
              <View style={s.cardInfo}>
                <Text style={s.name}>{item.first_name} {item.last_name}</Text>
                <Text style={s.amount}>${Number(item.amount).toFixed(2)} MXN</Text>
                {item.due_date && <Text style={s.meta}>Due: {item.due_date}</Text>}
              </View>
              <View style={[s.badge, { backgroundColor: `${statusColor[item.status]}20` }]}>
                <Text style={[s.badgeText, { color: statusColor[item.status] }]}>{item.status}</Text>
              </View>
            </View>
            {item.status !== "PAID" && (
              <TouchableOpacity style={s.payBtn} onPress={() => handleMarkPaid(item.id)}>
                <Text style={s.payBtnText}>✅ Mark as Paid</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {/* CREATE MODAL */}
      <Modal visible={showModal} transparent animationType="slide">
        <KeyboardAvoidingView style={s.overlay} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={s.modalCard}>
            <Text style={s.modalTitle}>💰 New Payment</Text>

            <Text style={s.modalLabel}>Student *</Text>
            <TouchableOpacity style={s.pickerBtn} onPress={() => setShowStudentPicker(true)}>
              <Text style={{ color: selectedStudent ? "#fff" : "#6b7280" }}>
                {selectedStudent ? `${selectedStudent.first_name} ${selectedStudent.last_name}` : "Select student"}
              </Text>
            </TouchableOpacity>

            <Text style={s.modalLabel}>Amount *</Text>
            <TextInput
              style={s.input}
              value={form.amount}
              onChangeText={(v) => setForm((p) => ({ ...p, amount: v }))}
              placeholder="0.00"
              placeholderTextColor="#6b7280"
              keyboardType="numeric"
            />

            <Text style={s.modalLabel}>Due Date (YYYY-MM-DD)</Text>
            <TextInput
              style={s.input}
              value={form.dueDate}
              onChangeText={(v) => setForm((p) => ({ ...p, dueDate: v }))}
              placeholder="2026-12-31"
              placeholderTextColor="#6b7280"
            />

            <View style={s.modalActions}>
              <TouchableOpacity style={s.cancelBtn} onPress={() => setShowModal(false)}>
                <Text style={{ color: "#fff", fontWeight: "600" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[s.saveBtn, creating && { opacity: 0.5 }]} onPress={handleCreate} disabled={creating}>
                <Text style={{ color: "#fff", fontWeight: "700" }}>{creating ? "Saving..." : "Create"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* STUDENT PICKER */}
      <Modal visible={showStudentPicker} transparent animationType="slide">
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
                  setShowStudentPicker(false);
                }}>
                  <Text style={{ color: "#fff" }}>{item.first_name} {item.last_name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={s.cancelBtn} onPress={() => setShowStudentPicker(false)}>
              <Text style={{ color: "#fff", fontWeight: "600" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container:  { flex: 1, backgroundColor: "#0f172a" },
  header:     { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20, paddingTop: 56, backgroundColor: "#111827", borderBottomWidth: 1, borderBottomColor: "#1f2937" },
  title:      { color: "#fff", fontSize: 20, fontWeight: "900" },
  addBtn:     { backgroundColor: "#2563eb", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  addBtnText: { color: "#fff", fontWeight: "700" },
  empty:      { color: "#6b7280", textAlign: "center", marginTop: 40 },
  card:       { backgroundColor: "#111827", borderRadius: 20, padding: 16, borderWidth: 1, borderColor: "#1f2937" },
  cardRow:    { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  cardInfo:   { flex: 1 },
  name:       { color: "#fff", fontWeight: "700", fontSize: 15 },
  amount:     { color: "#22c55e", fontWeight: "900", fontSize: 18, marginTop: 4 },
  meta:       { color: "#6b7280", fontSize: 12, marginTop: 2 },
  badge:      { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText:  { fontWeight: "700", fontSize: 12 },
  payBtn:     { backgroundColor: "rgba(34,197,94,0.1)", borderRadius: 12, padding: 10, alignItems: "center", borderWidth: 1, borderColor: "rgba(34,197,94,0.3)" },
  payBtnText: { color: "#22c55e", fontWeight: "600", fontSize: 13 },
  overlay:    { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "flex-end" },
  modalCard:  { backgroundColor: "#111827", borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, gap: 12 },
  modalTitle: { color: "#fff", fontSize: 20, fontWeight: "900", marginBottom: 8 },
  modalLabel: { color: "#9ca3af", fontSize: 13 },
  input:      { backgroundColor: "#1f2937", borderRadius: 14, padding: 14, color: "#fff", borderWidth: 1, borderColor: "#374151" },
  pickerBtn:  { backgroundColor: "#1f2937", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "#374151" },
  pickerItem: { padding: 14, borderBottomWidth: 1, borderBottomColor: "#1f2937" },
  modalActions:{ flexDirection: "row", gap: 12, marginTop: 8 },
  cancelBtn:  { flex: 1, backgroundColor: "#1f2937", borderRadius: 14, padding: 14, alignItems: "center" },
  saveBtn:    { flex: 1, backgroundColor: "#2563eb", borderRadius: 14, padding: 14, alignItems: "center" },
});
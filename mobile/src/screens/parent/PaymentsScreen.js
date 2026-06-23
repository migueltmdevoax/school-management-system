import {
  View, Text, FlatList, StyleSheet,
  TouchableOpacity, Alert, RefreshControl,
} from "react-native";
import { useGetAllPaymentsQuery, useMarkAsPaidMutation } from "../../features/payments/paymentsApi";

export default function ParentPaymentsScreen() {
  const { data, isLoading, refetch } = useGetAllPaymentsQuery();
  const [markAsPaid] = useMarkAsPaidMutation();
  const payments = data?.data || [];

  const statusColor = { PAID: "#22c55e", PENDING: "#eab308", OVERDUE: "#ef4444" };

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
            {item.status === "PENDING" && (
              <TouchableOpacity style={s.payBtn} onPress={() => handleMarkPaid(item.id)}>
                <Text style={s.payBtnText}>✅ Mark as Paid</Text>
              </TouchableOpacity>
            )}
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
  cardRow:    { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  cardInfo:   { flex: 1 },
  name:       { color: "#fff", fontWeight: "700", fontSize: 15 },
  amount:     { color: "#22c55e", fontWeight: "900", fontSize: 20, marginTop: 4 },
  meta:       { color: "#6b7280", fontSize: 12, marginTop: 2 },
  badge:      { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText:  { fontWeight: "700", fontSize: 12 },
  payBtn:     { backgroundColor: "rgba(34,197,94,0.1)", borderRadius: 12, padding: 10, alignItems: "center", borderWidth: 1, borderColor: "rgba(34,197,94,0.3)" },
  payBtnText: { color: "#22c55e", fontWeight: "600", fontSize: 13 },
});
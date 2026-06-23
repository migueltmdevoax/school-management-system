import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text }                     from "react-native";
import AdminDashboardScreen  from "../screens/admin/DashboardScreen";
import StudentsScreen        from "../screens/admin/StudentsScreen";
import TeachersScreen        from "../screens/admin/TeachersScreen";
import PaymentsScreen        from "../screens/admin/PaymentsScreen";
import IncidentsScreen       from "../screens/admin/IncidentsScreen";

const Tab = createBottomTabNavigator();

const icon = (emoji) => () => <Text style={{ fontSize: 22 }}>{emoji}</Text>;

export default function AdminNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown:     false,
        tabBarStyle:     { backgroundColor: "#111827", borderTopColor: "#1f2937" },
        tabBarActiveTintColor:   "#3b82f6",
        tabBarInactiveTintColor: "#6b7280",
      }}
    >
      <Tab.Screen name="Dashboard" component={AdminDashboardScreen}
        options={{ tabBarLabel: "Dashboard", tabBarIcon: icon("📊") }} />
      <Tab.Screen name="Students"  component={StudentsScreen}
        options={{ tabBarLabel: "Students",  tabBarIcon: icon("🎓") }} />
      <Tab.Screen name="Teachers"  component={TeachersScreen}
        options={{ tabBarLabel: "Teachers",  tabBarIcon: icon("👨‍🏫") }} />
      <Tab.Screen name="Payments"  component={PaymentsScreen}
        options={{ tabBarLabel: "Payments",  tabBarIcon: icon("💰") }} />
      <Tab.Screen name="Incidents" component={IncidentsScreen}
        options={{ tabBarLabel: "Incidents", tabBarIcon: icon("🚨") }} />
    </Tab.Navigator>
  );
}
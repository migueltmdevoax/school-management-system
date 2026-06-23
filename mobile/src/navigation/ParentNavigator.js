import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text }                     from "react-native";
import ParentDashboardScreen  from "../screens/parent/DashboardScreen";
import ParentGradesScreen     from "../screens/parent/GradesScreen";
import ParentAssignmentsScreen from "../screens/parent/AssignmentsScreen";
import ParentPaymentsScreen   from "../screens/parent/PaymentsScreen";

const Tab = createBottomTabNavigator();
const icon = (emoji) => () => <Text style={{ fontSize: 22 }}>{emoji}</Text>;

export default function ParentNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown:           false,
        tabBarStyle:           { backgroundColor: "#111827", borderTopColor: "#1f2937" },
        tabBarActiveTintColor:   "#3b82f6",
        tabBarInactiveTintColor: "#6b7280",
      }}
    >
      <Tab.Screen name="Progress"    component={ParentDashboardScreen}
        options={{ tabBarLabel: "Progress",    tabBarIcon: icon("📊") }} />
      <Tab.Screen name="Assignments" component={ParentAssignmentsScreen}
        options={{ tabBarLabel: "Assignments", tabBarIcon: icon("📚") }} />
      <Tab.Screen name="Grades"      component={ParentGradesScreen}
        options={{ tabBarLabel: "Grades",      tabBarIcon: icon("📝") }} />
      <Tab.Screen name="Payments"    component={ParentPaymentsScreen}
        options={{ tabBarLabel: "Payments",    tabBarIcon: icon("💰") }} />
    </Tab.Navigator>
  );
}
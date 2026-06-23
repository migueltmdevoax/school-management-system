import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text }                     from "react-native";
import TeacherDashboardScreen from "../screens/teacher/DashboardScreen";
import GradesScreen           from "../screens/teacher/GradesScreen";
import AssignmentsScreen      from "../screens/teacher/AssignmentsScreen";
import AttendanceScreen       from "../screens/teacher/AttendanceScreen";
import IncidentsScreen        from "../screens/admin/IncidentsScreen";

const Tab = createBottomTabNavigator();
const icon = (emoji) => () => <Text style={{ fontSize: 22 }}>{emoji}</Text>;

export default function TeacherNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown:           false,
        tabBarStyle:           { backgroundColor: "#111827", borderTopColor: "#1f2937" },
        tabBarActiveTintColor:   "#3b82f6",
        tabBarInactiveTintColor: "#6b7280",
      }}
    >
      <Tab.Screen name="Dashboard"   component={TeacherDashboardScreen}
        options={{ tabBarLabel: "Dashboard",   tabBarIcon: icon("🔥") }} />
      <Tab.Screen name="Assignments" component={AssignmentsScreen}
        options={{ tabBarLabel: "Assignments", tabBarIcon: icon("📚") }} />
      <Tab.Screen name="Grades"      component={GradesScreen}
        options={{ tabBarLabel: "Grades",      tabBarIcon: icon("📝") }} />
      <Tab.Screen name="Attendance"  component={AttendanceScreen}
        options={{ tabBarLabel: "Attendance",  tabBarIcon: icon("📋") }} />
      <Tab.Screen name="Incidents"   component={IncidentsScreen}
        options={{ tabBarLabel: "Incidents",   tabBarIcon: icon("🚨") }} />
    </Tab.Navigator>
  );
}
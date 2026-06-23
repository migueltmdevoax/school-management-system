import { useEffect }           from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, View } from "react-native";
import { restoreSessionFromStorage } from "../features/auth/authSlice";
import { connectSocket }        from "../services/socket/socketClient";
import LoginScreen              from "../screens/auth/LoginScreen";
import AdminNavigator           from "./AdminNavigator";
import TeacherNavigator         from "./TeacherNavigator";
import ParentNavigator          from "./ParentNavigator";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, role } = useSelector((s) => s.auth);

  useEffect(() => {
    dispatch(restoreSessionFromStorage());
  }, []);

  useEffect(() => {
    if (isAuthenticated) connectSocket();
  }, [isAuthenticated]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f172a" }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  const getNavigator = () => {
    if (!isAuthenticated) return <Stack.Screen name="Login" component={LoginScreen} />;
    if (role === "admin")   return <Stack.Screen name="Admin"   component={AdminNavigator} />;
    if (role === "teacher") return <Stack.Screen name="Teacher" component={TeacherNavigator} />;
    if (role === "parent")  return <Stack.Screen name="Parent"  component={ParentNavigator} />;
    return <Stack.Screen name="Login" component={LoginScreen} />;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {getNavigator()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
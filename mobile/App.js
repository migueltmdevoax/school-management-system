import { StatusBar }        from "expo-status-bar";
import { Provider }         from "react-redux";
import { store }            from "./src/app/store";
import AppNavigator         from "./src/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}
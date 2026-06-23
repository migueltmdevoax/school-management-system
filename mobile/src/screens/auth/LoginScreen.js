import { useState, useRef }    from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
  ActivityIndicator, Alert,
} from "react-native";
import { useLoginMutation } from "../../features/auth/authApi";

export default function LoginScreen() {
  const [login, { isLoading }] = useLoginMutation();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const submittingRef           = useRef(false);

  const handleLogin = async () => {
    if (submittingRef.current || isLoading) return;
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required");
      return;
    }
    submittingRef.current = true;
    try {
      await login({ email, password }).unwrap();
      // AppNavigator detecta isAuthenticated y navega automáticamente
    } catch (err) {
      Alert.alert("Error", err?.data?.error || err?.data?.message || "Invalid credentials");
      submittingRef.current = false;
    }
  };

  return (
    <KeyboardAvoidingView
      style={s.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={s.card}>
        <Text style={s.logo}>🎓</Text>
        <Text style={s.title}>Sistema Escolar</Text>
        <Text style={s.subtitle}>Enterprise School Management</Text>

        <View style={s.form}>
          <Text style={s.label}>Email</Text>
          <TextInput
            style={s.input}
            value={email}
            onChangeText={setEmail}
            placeholder="you@school.com"
            placeholderTextColor="#6b7280"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={s.label}>Password</Text>
          <TextInput
            style={s.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="#6b7280"
            secureTextEntry
          />

          <TouchableOpacity
            style={[s.button, isLoading && s.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading
              ? <ActivityIndicator color="#fff" />
              : <Text style={s.buttonText}>Sign In</Text>
            }
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container:      { flex: 1, backgroundColor: "#0f172a", justifyContent: "center", padding: 24 },
  card:           { backgroundColor: "#111827", borderRadius: 24, padding: 32, borderWidth: 1, borderColor: "#1f2937" },
  logo:           { fontSize: 48, textAlign: "center", marginBottom: 8 },
  title:          { color: "#fff", fontSize: 24, fontWeight: "900", textAlign: "center" },
  subtitle:       { color: "#6b7280", fontSize: 14, textAlign: "center", marginBottom: 32 },
  form:           { gap: 12 },
  label:          { color: "#9ca3af", fontSize: 14, marginBottom: 4 },
  input:          { backgroundColor: "#1f2937", borderRadius: 16, padding: 16, color: "#fff", borderWidth: 1, borderColor: "#374151", fontSize: 16 },
  button:         { backgroundColor: "#2563eb", borderRadius: 16, padding: 16, alignItems: "center", marginTop: 8 },
  buttonDisabled: { opacity: 0.5 },
  buttonText:     { color: "#fff", fontWeight: "700", fontSize: 16 },
});
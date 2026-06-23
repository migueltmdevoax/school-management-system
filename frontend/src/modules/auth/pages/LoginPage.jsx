import { useState, useRef }  from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLoginMutation }  from "../../../features/auth/authApi";
import { connectSocket }     from "../../../services/socket/socketClient";

export default function LoginPage() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const [login, { isLoading }] = useLoginMutation();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const submittingRef           = useRef(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current || isLoading) return;
    submittingRef.current = true;
    setError("");

    try {
      const response = await login({ email, password }).unwrap();
      setTimeout(() => connectSocket(), 150);

      // Si venía de una ruta protegida, regresa ahí
      const from = location.state?.from?.pathname;

      const role = response.user?.role;
      if (from && from.startsWith("/app")) {
        navigate(from, { replace: true });
      } else if (role === "admin")   {
        navigate("/app/admin/dashboard");
      } else if (role === "teacher") {
        navigate("/app/teacher/dashboard");
      } else if (role === "parent")  {
        navigate("/app/parent/dashboard");
      } else {
        navigate("/app");
      }
    } catch (err) {
      setError(err?.data?.error || err?.data?.message || "Invalid credentials");
      submittingRef.current = false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white">🎓 Sistema Escolar</h1>
          <p className="text-gray-400 mt-2">Enterprise School Management</p>
        </div>
        <form onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-2xl space-y-4">
          <h2 className="text-2xl font-bold text-white mb-2">🔐 Sign In</h2>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-2xl text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              required placeholder="you@school.com"
              className="w-full p-3 rounded-2xl bg-gray-800 text-white outline-none border border-transparent focus:border-blue-500" />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              required placeholder="••••••••"
              className="w-full p-3 rounded-2xl bg-gray-800 text-white outline-none border border-transparent focus:border-blue-500" />
          </div>
          <button type="submit" disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white p-3 rounded-2xl font-semibold transition mt-2">
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";

export default function useParentDashboard(userId) {
  // ✅ PRIMERO defines estados
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ DESPUÉS lógica
  useEffect(() => {
    if (!userId) return;

    console.log("🚀 Fetching dashboard for:", userId);

    setLoading(true);

    fetch(`http://localhost:3000/api/parents/dashboard/${userId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return res.json();
      })
      .then(data => {
        console.log("✅ DATA:", data);
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ ERROR:", err);
        setError(err);
        setLoading(false);
      });

  }, [userId]);

  // ✅ AL FINAL retornas
  return { data, loading, error };
}
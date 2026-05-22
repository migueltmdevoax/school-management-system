const API_URL =
  "http://localhost:3000/api/auth";



// 🔥 LOGIN
export async function loginUser(data) {

  const res = await fetch(
    `${API_URL}/login`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {

    throw new Error(
      "Invalid credentials"
    );
  }

  return res.json();
}
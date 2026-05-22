const API_URL =
  "http://localhost:3000/api/auth";

export async function loginRequest({
  email,
  password,
}) {

  const res = await fetch(
    `${API_URL}/login`,
    {

      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data =
    await res.json();

  if (!res.ok) {

    throw new Error(
      data.error ||
      "Login failed"
    );
  }

  return data;
}
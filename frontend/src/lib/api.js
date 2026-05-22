
const BASE_URL =
  "http://localhost:3000/api";



export async function apiFetch(
  endpoint,
  options = {}
) {

  const token =
    localStorage.getItem("token");

  const headers = {

    "Content-Type":
      "application/json",

    ...(token && {
      Authorization:
        `Bearer ${token}`,
    }),

    ...options.headers,
  };



  const response =
    await fetch(
      `${BASE_URL}${endpoint}`,
      {
        ...options,
        headers,
      }
    );



  // 🔥 AUTO HANDLE AUTH
  if (response.status === 401) {

    console.error(
      "401 Unauthorized"
    );

    localStorage.removeItem(
      "token"
    );

    // opcional:
    // window.location.href = "/login";

    throw new Error(
      "Unauthorized"
    );
  }



  // 🔥 HANDLE NORMAL ERRORS
  if (!response.ok) {

    let errorMessage =
      "Request failed";

    try {

      const errorData =
        await response.json();

      errorMessage =
        errorData.message ||
        errorData.error ||
        errorMessage;

    } catch {}

    throw new Error(
      errorMessage
    );
  }



  // 🔥 EMPTY RESPONSE
  if (response.status === 204) {
    return null;
  }



  return response.json();
}

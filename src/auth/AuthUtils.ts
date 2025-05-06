export function getUserIdFromToken(): number | null {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));
    return payload.user_id; // el user_id viene en el token
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
}

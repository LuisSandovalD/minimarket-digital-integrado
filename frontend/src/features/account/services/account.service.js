import api from "@/api/axios";

/**
 * GET ACCOUNT PROFILE
 */
export async function getMyAccount() {
  const response = await api.get("/account/profile");
  return response.data.user;
}

/**
 * UPDATE PROFILE
 */
export async function updateMyAccount(data) {
  const response = await api.put("/account/profile", data);
  return response.data;
}

/**
 * CHANGE PASSWORD
 */
export async function changePassword(data) {
  const response = await api.put("/account/password", data);
  return response.data;
}

/**
 * TOGGLE 2FA (FIX REAL)
 */
export async function toggleTwoFactor(data) {
  const response = await api.put("/account/2fa", data);
  return response.data;
}

/**
 * GET ACTIVE SESSIONS
 */
export async function getSessions() {
  const response = await api.get("/account/sessions");
  return response.data.sessions;
}

/**
 * CLOSE SESSION
 */
export async function closeSession(sessionId) {
  const response = await api.delete(`/account/sessions/${sessionId}`);
  return response.data;
}

/**
 * DELETE ACCOUNT
 */
export async function deleteMyAccount(data) {
  const response = await api.delete("/account/delete", {
    data: {
      password: data.password,
    },
  });

  return response.data;
}
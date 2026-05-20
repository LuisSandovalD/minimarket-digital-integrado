// ======================================
// LOGIN SUCCESS
// ======================================

export const loginSuccess = (user) => ({
  type: "auth/loginSuccess",
  payload: user,
});

// ======================================
// LOGOUT
// ======================================

export const logoutAction = () => ({
  type: "auth/logout",
});

// ======================================
// SET LOADING
// ======================================

export const setAuthLoading = (value) => ({
  type: "auth/setLoading",
  payload: value,
});

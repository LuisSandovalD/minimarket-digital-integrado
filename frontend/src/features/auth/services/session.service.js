// ========================================
// services/session.service.js
// ========================================

const ACCESS_TOKEN_KEY = "accessToken";

const REFRESH_TOKEN_KEY = "refreshToken";

const USER_KEY = "user";

/* ======================================
 * SAVE SESSION
 * ==================================== */
export const saveSession = ({ accessToken, refreshToken, user }) => {
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

/* ======================================
 * TOKENS
 * ==================================== */
export const getToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

/* ======================================
 * USER
 * ==================================== */
export const getUser = () => {
  try {
    const user = localStorage.getItem(USER_KEY);

    if (!user || user === "undefined") {
      return null;
    }

    return JSON.parse(user);
  } catch {
    return null;
  }
};

/* ======================================
 * COMPANY
 * ==================================== */
export const getCompany = () => {
  const user = getUser();

  return user?.company || null;
};

/* ======================================
 * BRANCH
 * ==================================== */
export const getBranch = () => {
  const user = getUser();

  return user?.branch || null;
};

/* ======================================
 * ROLE
 * ==================================== */
export const getRole = () => {
  const user = getUser();

  return user?.role || null;
};

/* ======================================
 * SESSION
 * ==================================== */
export const getSession = () => ({
  accessToken: getToken(),
  refreshToken: getRefreshToken(),
  user: getUser(),
});

/* ======================================
 * UPDATE USER
 * ==================================== */
export const updateSessionUser = (userData) => {
  const currentUser = getUser();

  if (!currentUser) return;

  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      ...currentUser,
      ...userData,
    }),
  );
};

/* ======================================
 * AUTH
 * ==================================== */
export const isAuthenticated = () => {
  return !!getToken();
};

/* ======================================
 * CLEAR SESSION
 * ==================================== */
export const clearSession = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);

  localStorage.removeItem(REFRESH_TOKEN_KEY);

  localStorage.removeItem(USER_KEY);
};

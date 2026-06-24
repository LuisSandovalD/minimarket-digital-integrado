// ========================================
// services/authStorage.js
// ========================================

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";
const COMPANY_KEY = "company";
const BRANCH_KEY = "branch";

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

    if (user.company) {
      localStorage.setItem(COMPANY_KEY, JSON.stringify(user.company));
    }

    if (user.branch) {
      localStorage.setItem(BRANCH_KEY, JSON.stringify(user.branch));
    }
  }
};

/* ======================================
 * GET ACCESS TOKEN
 * ==================================== */
export const getToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/* ======================================
 * GET REFRESH TOKEN
 * ==================================== */
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/* ======================================
 * GET USER
 * ==================================== */
export const getUser = () => {
  try {
    const user = localStorage.getItem(USER_KEY);

    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error leyendo usuario:", error);

    return null;
  }
};

/* ======================================
 * GET COMPANY
 * ==================================== */
export const getCompany = () => {
  try {
    const company = localStorage.getItem(COMPANY_KEY);

    return company ? JSON.parse(company) : null;
  } catch (error) {
    console.error("Error leyendo compañía:", error);

    return null;
  }
};

/* ======================================
 * GET BRANCH
 * ==================================== */
export const getBranch = () => {
  try {
    const branch = localStorage.getItem(BRANCH_KEY);

    return branch ? JSON.parse(branch) : null;
  } catch (error) {
    console.error("Error leyendo sucursal:", error);

    return null;
  }
};

/* ======================================
 * GET SESSION
 * ==================================== */
export const getSession = () => ({
  accessToken: getToken(),
  refreshToken: getRefreshToken(),
  user: getUser(),
  company: getCompany(),
  branch: getBranch(),
});

/* ======================================
 * IS AUTHENTICATED
 * ==================================== */
export const isAuthenticated = () => {
  return !!getToken();
};

/* ======================================
 * UPDATE USER
 * ==================================== */
export const updateSessionUser = (userData) => {
  const currentUser = getUser();

  if (!currentUser) return;

  const updatedUser = {
    ...currentUser,
    ...userData,
  };

  localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));

  if (updatedUser.company) {
    localStorage.setItem(COMPANY_KEY, JSON.stringify(updatedUser.company));
  }

  if (updatedUser.branch) {
    localStorage.setItem(BRANCH_KEY, JSON.stringify(updatedUser.branch));
  }
};

/* ======================================
 * CLEAR SESSION
 * ==================================== */
export const clearSession = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);

  localStorage.removeItem(REFRESH_TOKEN_KEY);

  localStorage.removeItem(USER_KEY);

  localStorage.removeItem(COMPANY_KEY);

  localStorage.removeItem(BRANCH_KEY);
};

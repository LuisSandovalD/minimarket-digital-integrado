// ======================================
// SAVE SESSION
// ======================================

export const saveSession = ({ token, user, company }) => {
  localStorage.setItem("token", token);

  localStorage.setItem("user", JSON.stringify(user));

  localStorage.setItem("company", JSON.stringify(company));
};

// ======================================
// GET TOKEN
// ======================================

export const getToken = () => {
  return localStorage.getItem("token");
};

// ======================================
// GET USER
// ======================================

export const getUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

// ======================================
// GET COMPANY
// ======================================

export const getCompany = () => {
  const company = localStorage.getItem("company");

  return company ? JSON.parse(company) : null;
};

// ======================================
// CLEAR SESSION
// ======================================

export const clearSession = () => {
  localStorage.removeItem("token");

  localStorage.removeItem("user");

  localStorage.removeItem("company");
};

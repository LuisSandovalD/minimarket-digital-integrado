// ======================================
// services/session.service.js
// ======================================

// ======================================
// SAVE SESSION
// ======================================

export const saveSession = ({
  token,
  user,
  company,
}) => {

  // ====================================
  // TOKEN
  // ====================================

  if (token) {

    localStorage.setItem(
      "token",
      token
    );

  }

  // ====================================
  // USER
  // ====================================

  if (user) {

    const currentUser =
      getUser();

    const updatedUser = {

      ...currentUser,

      ...user,

      // Mantener avatar anterior
      // si el nuevo viene null
      avatar:
        user.avatar ??
        currentUser?.avatar ??
        null,

    };

    localStorage.setItem(
      "user",
      JSON.stringify(
        updatedUser
      )
    );

  }

  // ====================================
  // COMPANY
  // ====================================

  if (company) {

    localStorage.setItem(
      "company",
      JSON.stringify(
        company
      )
    );

  }

};

// ======================================
// UPDATE USER SESSION
// SOLO ACTUALIZA USER
// ======================================

export const updateSessionUser =
  (userData) => {

    const currentUser =
      getUser();

    if (!currentUser) {
      return;
    }

    const updatedUser = {

      ...currentUser,

      ...userData,

      avatar:
        userData.avatar ??
        currentUser.avatar ??
        null,

    };

    localStorage.setItem(
      "user",
      JSON.stringify(
        updatedUser
      )
    );

  };

// ======================================
// GET TOKEN
// ======================================

export const getToken =
  () => {

    return localStorage.getItem(
      "token"
    );

  };

// ======================================
// GET USER
// ======================================

export const getUser =
  () => {

    const user =
      localStorage.getItem(
        "user"
      );

    return user
      ? JSON.parse(user)
      : null;

  };

// ======================================
// GET COMPANY
// ======================================

export const getCompany =
  () => {

    const company =
      localStorage.getItem(
        "company"
      );

    return company
      ? JSON.parse(company)
      : null;

  };

// ======================================
// GET SESSION
// ======================================

export const getSession =
  () => {

    return {

      token:
        getToken(),

      user:
        getUser(),

      company:
        getCompany(),

    };

  };

// ======================================
// CLEAR SESSION
// ======================================

export const clearSession =
  () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "company"
    );

  };
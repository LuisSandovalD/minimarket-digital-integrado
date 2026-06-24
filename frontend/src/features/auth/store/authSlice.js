// ========================================
// store/slices/auth.slice.js
// ========================================

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  company: null,
  branch: null,
  isAuthenticated: false,
  loading: true, // 👈 empieza en true: App.jsx valida la sesión contra el backend antes de saber si hay usuario
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    /* ======================================
     * LOGIN / REGISTER SUCCESS
     * ==================================== */
    loginSuccess: (state, action) => {
      const user = action.payload?.user || action.payload;

      state.user = user;

      state.company = user?.company || null;

      state.branch = user?.branch || null;

      state.isAuthenticated = true;

      state.loading = false;
    },

    /* ======================================
     * UPDATE USER
     * ==================================== */
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };

      if (action.payload.company) {
        state.company = action.payload.company;
      }

      if (action.payload.branch) {
        state.branch = action.payload.branch;
      }
    },

    /* ======================================
     * UPDATE COMPANY
     * ==================================== */
    updateCompany: (state, action) => {
      state.company = {
        ...state.company,
        ...action.payload,
      };

      if (state.user) {
        state.user.company = state.company;
      }
    },

    /* ======================================
     * UPDATE BRANCH
     * ==================================== */
    updateBranch: (state, action) => {
      state.branch = {
        ...state.branch,
        ...action.payload,
      };

      if (state.user) {
        state.user.branch = state.branch;
      }
    },

    /* ======================================
     * SET LOADING
     * ==================================== */
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    /* ======================================
     * LOGOUT
     * ==================================== */
    logout: (state) => {
      state.user = null;
      state.company = null;
      state.branch = null;

      state.isAuthenticated = false;

      state.loading = false;
    },
  },
});

export const {
  loginSuccess,
  updateUser,
  updateCompany,
  updateBranch,
  logout,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;

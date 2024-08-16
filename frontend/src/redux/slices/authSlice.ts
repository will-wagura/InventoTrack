import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: string | null;
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('access_token') || null,
  isAuthenticated: !!localStorage.getItem('access_token'), // Initialize isAuthenticated based on token presence
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: string; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;

      // Store token in localStorage
      localStorage.setItem('access_token', action.payload.token);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Remove token from localStorage
      localStorage.removeItem('access_token');
    },
    // Action to update the token (for refresh)
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;

      // Update token in localStorage
      localStorage.setItem('access_token', action.payload);
    },
  },
});

export const { loginSuccess, loginFailure, logout, updateToken } = authSlice.actions;
export default authSlice.reducer;

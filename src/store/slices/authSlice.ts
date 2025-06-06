import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  user: any | null;
  message?: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setCredentials(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;

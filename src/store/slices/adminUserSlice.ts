import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAdminUsersApi, addAdminUser } from '../../api/admin';

export interface AdminUser {
  id: number;
  email: string;
  role: string;
  organization_id: number;
  organization_name: string;
  active: boolean;
}

interface AdminUsersState {
  users: AdminUser[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminUsersState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchAdminUsers = createAsyncThunk(
  'adminUsers/fetchAdminUsers',
  async () => {
    const users = await fetchAdminUsersApi();
    return users;
  }
);

export const createAdminUser = createAsyncThunk(
  'adminUsers/createAdminUser',
  async (user: { email: string; organization_id: number; role: string }) => {
    const newUser = await addAdminUser(user);
    return newUser;
  }
);

const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch admin users';
      })
      .addCase(createAdminUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      });
  },
});

export default adminUsersSlice.reducer;

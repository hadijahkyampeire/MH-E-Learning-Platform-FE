import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchUsersApi } from '../../api/users';

interface User {
  id: number;
  email: string;
  organization_id: number;
  organization_name: string;
  role: number;
  active: boolean;
}
interface UsersState {
  loading: boolean;
  users: User[];
  error: string | null;
}
const initialState: UsersState = {
  loading: false,
  users: [],
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
})

export const { setUsers, setLoading, setError } = usersSlice.actions;

// Async thunk to fetch users
export const fetchUsers = () => async (dispatch: any) => {    
  dispatch(setLoading(true));
  try {
    const users = await fetchUsersApi();
    dispatch(setUsers(users));
  } catch (error: any) {
    dispatch(setError(error.message || 'Failed to fetch users'));
  } finally {
    dispatch(setLoading(false));
  }
}

export default usersSlice.reducer;
export type { User, UsersState };
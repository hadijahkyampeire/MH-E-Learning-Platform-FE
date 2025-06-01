import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOrganizationsApi } from '../../api/organizations';

interface Organization {
  id: number;
  organization_code: string;
  name: string;
}

interface OrganizationState {
  loading: boolean;
  organizations: Organization[];
  error: string | null;
}

const initialState: OrganizationState = {
  loading: false,
  organizations: [],
  error: null,
};

export const fetchOrganizations = createAsyncThunk(
  'organizations/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchOrganizationsApi();
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Error fetching organizations');
    }
  }
);

const organizationSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.loading = false;
        state.organizations = action.payload;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default organizationSlice.reducer;

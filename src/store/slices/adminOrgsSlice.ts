import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOrganizationsApi, createOrganizationApi } from '../../api/admin';

export const fetchOrganizations = createAsyncThunk(
  'adminOrganizations/fetch',
  async () => await fetchOrganizationsApi()
);

export const createOrganization = createAsyncThunk(
  'adminOrganizations/create',
  async (org: {
    name: string;
    code: string;
    settings: { font: string; primaryLightColor: string; primaryDarkColor: string; secondaryLightColor: string; secondaryDarkColor: string };
  }) => await createOrganizationApi(org)
);

const adminOrganizationsSlice = createSlice({
  name: 'adminOrganizations',
  initialState: {
    organizations: [] as any[],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.organizations = action.payload;
        state.loading = false;
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.organizations.push(action.payload);
      });
  },
});

export default adminOrganizationsSlice.reducer;

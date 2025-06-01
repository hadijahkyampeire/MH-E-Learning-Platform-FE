import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import organizationReducer from './slices/organizationSlice';
import usersReducer from './slices/usersSlice';
import adminUsersReducer from './slices/adminUserSlice';
import adminOrgsReducer from './slices/adminOrgsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    organizations: organizationReducer,
    users: usersReducer,
    adminUsers: adminUsersReducer,
    adminOrganizations: adminOrgsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

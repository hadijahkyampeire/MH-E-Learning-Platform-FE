import api from "./api";

export const fetchAdminUsersApi = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const addAdminUser = async (user: {
  email: string;
  organization_id: number;
  role: string;
}) => {
  const response = await api.post("/admin/users", user);
  return response.data;
};

export const fetchOrganizationsApi = async () => {
  const res = await api.get('/admin/organizations');
  return res.data;
};

export const createOrganizationApi = async (org: {
  name: string;
  code: string;
  settings: {
    font: string;
    primaryLightColor: string;
    primaryDarkColor: string;
    secondaryLightColor: string;
    secondaryDarkColor: string;
  };
}) => {
  const res = await api.post('/admin/organizations', org);
  return res.data;
};

export const activateUser = async (userId: number) => {
  const response = await api.patch(`/admin/users/${userId}/activate`);
  return response.data;
};
export const deactivateUser = async (userId: number) => {
  const response = await api.patch(`/admin/users/${userId}/deactivate`);
  return response.data;
};
import api from "./api";

export const fetchUsersApi = async () => {
  const response = await api.get(`/users`);
  return response.data;
};

export const addOrgUser = async (user: {
  email: string;
  role: string;
}) => {
  const response = await api.post(`/users`, user);
  return response.data;
};

export const updateOrgUser = async (user: {
  id: number;
  email: string;
  role: number;
  active: boolean;
}) => {
  const response = await api.patch(`/users/${user.id}`, user);
  return response.data;
};

export const deleteOrgUser = async (userId: number) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};

export const activateOrgUser = async (userId: number) => {
  const response = await api.patch(`/users/${userId}/activate`);
  return response.data;
};
export const deactivateOrgUser = async (userId: number) => {
  const response = await api.patch(`/users/${userId}/deactivate`);
  return response.data;
};

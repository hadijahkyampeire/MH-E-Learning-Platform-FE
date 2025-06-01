import api from "./api";

export const fetchOrganizationsApi = async () => {
  const response = await api.get("/organizations");
  return response.data;
}
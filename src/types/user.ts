export interface User {
  id: number;
  email: string;
  organization_id?: number;
  organization_name?: string;
  role: number | string;
  active?: boolean;
}
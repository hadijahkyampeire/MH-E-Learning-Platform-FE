export interface ResourceItem {
  id: number;
  title: string;
  createdAt: string;
  visible: boolean;
  base64: string;
  type: string;
}

export const RESOURCE_KEY = 'teaching_resources';

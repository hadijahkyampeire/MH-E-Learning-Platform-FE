export interface ResourceItem {
  id: number;
  title: string;
  createdAt: string;
  visible: boolean;
  url: string;
  name: string;
  type: string;
}

export const RESOURCE_KEY = 'teaching_resources';

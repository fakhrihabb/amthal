export interface Project {
  id: string;
  name: string;
  description?: string;
  objective?: string;
  created_at: string;
  updated_at: string;
  locations: any[]; // Placeholder for locations
  location_count: number;
}

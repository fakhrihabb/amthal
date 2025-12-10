import { Project } from './types';

const STORAGE_KEY = 'sivana_projects';

export const LocalStorageService = {
  getProjects: (): Project[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveProject: (project: Project): void => {
    const projects = LocalStorageService.getProjects();
    projects.push(project);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  },

  updateProject: (updatedProject: Project): void => {
    const projects = LocalStorageService.getProjects();
    const index = projects.findIndex((p) => p.id === updatedProject.id);
    if (index !== -1) {
      projects[index] = updatedProject;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }
  },

  deleteProject: (id: string): void => {
    const projects = LocalStorageService.getProjects();
    const newProjects = projects.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProjects));
  },

  // Stub for future Supabase sync
  syncToSupabase: async (): Promise<void> => {
    console.log('Syncing to Supabase... (Stub)');
    // Implement actual sync logic here later
  }
};

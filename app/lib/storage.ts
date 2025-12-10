import { Project } from './types';
import { supabase } from './supabase';

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
};

export const SupabaseService = {
  fetchProjects: async (): Promise<Project[]> => {
    const { data, error } = await supabase
      .from('projects')
      .select('*, locations(count)');
    
    if (error) {
      console.error('Error fetching projects from Supabase:', error);
      return [];
    }

    // Map Supabase response to Project interface
    return (data || []).map((p: any) => ({
      ...p,
      locations: [], // Placeholder as we don't fetch full locations list for the project list
      location_count: p.locations ? p.locations[0]?.count : 0
    }));
  },

  saveProject: async (project: Project): Promise<void> => {
    // Prepare data for insertion (exclude non-column fields)
    const { locations, location_count, ...projectData } = project;
    
    const { error } = await supabase
      .from('projects')
      .insert([projectData]);
      
    if (error) {
      console.error('Error saving project to Supabase:', error);
      throw error;
    }
  },

  deleteProject: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting project from Supabase:', error);
      throw error;
    }
  }
};

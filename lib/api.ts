// API client for communicating with devonshire-brain worker

const WORKER_URL = 'https://devonshire-brain.themarketingcartel.workers.dev';

export interface Job {
  id: string;
  slug: string;
  title: string;
  location: string;
  job_type: string;
  salary: string | null;
  apply_email: string;
  description_md: string;
  status: 'active' | 'paused' | 'archived';
  date_posted: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content_md: string;
  excerpt: string;
  author: string;
  status: 'published' | 'draft' | 'archived';
  date_published: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

// Get auth token from localStorage
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

// Set auth token in localStorage
export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', token);
}

// Clear auth token from localStorage
export function clearAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
}

// Get current user from localStorage
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('current_user');
  return userStr ? JSON.parse(userStr) : null;
}

// Set current user in localStorage
export function setCurrentUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('current_user', JSON.stringify(user));
}

// Clear current user from localStorage
export function clearCurrentUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('current_user');
}

// Get jobs from local JSON file (fallback when worker is unavailable)
async function getJobsFromLocal(): Promise<Job[]> {
  try {
    const response = await fetch('/jobs-data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch local jobs data');
    }
    const data = await response.json();
    return data.map((job: any) => ({
      id: job.slug,
      slug: job.slug,
      title: job.title,
      location: job.location,
      job_type: job.jobType,
      salary: job.salary || null,
      apply_email: job.email || 'careers@devonshirerecruitment.com',
      description_md: job.description || '',
      status: 'active' as const,
      date_posted: new Date().toISOString().split('T')[0],
    }));
  } catch (error) {
    console.error('Failed to load local jobs data:', error);
    return [];
  }
}

// Get single job from local JSON by slug
async function getJobFromLocal(slug: string): Promise<Job | null> {
  try {
    const response = await fetch('/jobs-data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch local jobs data');
    }
    const data = await response.json();
    const job = Object.values(data).find((j: any) => j.slug === slug);
    if (!job) return null;

    return {
      id: (job as any).slug,
      slug: (job as any).slug,
      title: (job as any).title,
      location: (job as any).location,
      job_type: (job as any).jobType,
      salary: (job as any).salary || null,
      apply_email: (job as any).email || 'careers@devonshirerecruitment.com',
      description_md: (job as any).description || '',
      status: 'active' as const,
      date_posted: new Date().toISOString().split('T')[0],
    };
  } catch (error) {
    console.error('Failed to load local job data:', error);
    return null;
  }
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${WORKER_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || error.error || 'API request failed');
  }

  return response.json();
}

// Auth API
export const authApi = {
  async login(email: string, password: string): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  },

  logout(): void {
    clearAuthToken();
    clearCurrentUser();
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message?: string; error?: string }> {
    return apiRequest<{ success: boolean; message?: string; error?: string }>('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  async updateEmail(newEmail: string, password: string): Promise<{ success: boolean; message?: string; error?: string }> {
    return apiRequest<{ success: boolean; message?: string; error?: string }>('/api/auth/update-email', {
      method: 'POST',
      body: JSON.stringify({ newEmail, password }),
    });
  },
};

// Users API
export const usersApi = {
  async list(): Promise<{ users: User[] }> {
    return apiRequest<{ users: User[] }>('/api/admin/users');
  },

  async create(email: string, password: string, name: string, role: 'admin' | 'editor' | 'viewer'): Promise<{ user: User; message?: string; error?: string }> {
    return apiRequest<{ user: User; message?: string; error?: string }>('/api/admin/users', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, role }),
    });
  },

  async update(id: number, updates: Partial<Pick<User, 'name' | 'email' | 'role'>>): Promise<{ user: User; message?: string; error?: string }> {
    return apiRequest<{ user: User; message?: string; error?: string }>(`/api/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async delete(id: number): Promise<{ success: boolean; message?: string; error?: string }> {
    return apiRequest<{ success: boolean; message?: string; error?: string }>(`/api/admin/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// Jobs API
export const jobsApi = {
  async list(filters?: {
    status?: 'active' | 'paused' | 'archived';
    q?: string;
    location?: string;
    jobType?: string;
    limit?: number;
  }): Promise<{ jobs: Job[] }> {
    try {
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.q) params.append('q', filters.q);
      if (filters?.location) params.append('location', filters.location);
      if (filters?.jobType) params.append('jobType', filters.jobType);
      if (filters?.limit) params.append('limit', filters.limit.toString());

      const queryString = params.toString();
      return await apiRequest<{ jobs: Job[] }>(`/api/jobs${queryString ? `?${queryString}` : ''}`);
    } catch (error) {
      console.warn('Worker unavailable, using local data:', error);
      const jobs = await getJobsFromLocal();

      // Apply filters locally if provided
      let filteredJobs = jobs;
      if (filters?.status) {
        filteredJobs = filteredJobs.filter(job => job.status === filters.status);
      }
      if (filters?.q) {
        const q = filters.q.toLowerCase();
        filteredJobs = filteredJobs.filter(job =>
          job.title.toLowerCase().includes(q) ||
          job.description_md.toLowerCase().includes(q)
        );
      }
      if (filters?.location) {
        const location = filters.location.toLowerCase();
        filteredJobs = filteredJobs.filter(job =>
          job.location?.toLowerCase().includes(location)
        );
      }
      if (filters?.jobType) {
        const jobType = filters.jobType.toLowerCase();
        filteredJobs = filteredJobs.filter(job =>
          job.job_type?.toLowerCase().includes(jobType)
        );
      }
      if (filters?.limit) {
        filteredJobs = filteredJobs.slice(0, filters.limit);
      }

      return { jobs: filteredJobs };
    }
  },

  async getBySlug(slug: string): Promise<{ job: Job }> {
    try {
      return await apiRequest<{ job: Job }>(`/api/jobs/${slug}`);
    } catch (error) {
      console.warn('Worker unavailable, using local data:', error);
      const job = await getJobFromLocal(slug);
      if (!job) {
        throw new Error('Job not found');
      }
      return { job };
    }
  },

  async create(job: Omit<Job, 'id'>): Promise<{ job: Job }> {
    return apiRequest<{ job: Job }>('/api/admin/jobs', {
      method: 'POST',
      body: JSON.stringify(job),
    });
  },

  async update(id: string, job: Partial<Job>): Promise<{ job: Job }> {
    return apiRequest<{ job: Job }>(`/api/admin/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(job),
    });
  },

  async delete(id: string): Promise<{ success: boolean }> {
    return apiRequest<{ success: boolean }>(`/api/admin/jobs/${id}`, {
      method: 'DELETE',
    });
  },

  async updateStatus(id: string, status: 'active' | 'paused' | 'archived'): Promise<{ success: boolean }> {
    return apiRequest<{ success: boolean }>(`/api/admin/jobs/${id}/status`, {
      method: 'POST',
      body: JSON.stringify({ status }),
    });
  },
};

// Blog API (placeholder - to be implemented)
export const blogApi = {
  async list(filters?: {
    status?: 'published' | 'draft' | 'archived';
    limit?: number;
  }): Promise<{ posts: BlogPost[] }> {
    // Placeholder implementation
    return { posts: [] };
  },

  async getBySlug(slug: string): Promise<{ post: BlogPost }> {
    // Placeholder implementation
    throw new Error('Blog API not yet implemented');
  },

  async create(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<{ post: BlogPost }> {
    // Placeholder implementation
    throw new Error('Blog API not yet implemented');
  },

  async update(id: string, post: Partial<BlogPost>): Promise<{ post: BlogPost }> {
    // Placeholder implementation
    throw new Error('Blog API not yet implemented');
  },

  async delete(id: string): Promise<{ success: boolean }> {
    // Placeholder implementation
    throw new Error('Blog API not yet implemented');
  },
};
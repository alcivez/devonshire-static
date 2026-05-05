// Authentication utilities for frontend

import { getAuthToken, setAuthToken, getCurrentUser, setCurrentUser, clearAuthToken, clearCurrentUser, authApi } from './api';

export interface AuthState {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
}

// TEMPORARY: Bypass authentication for design review
const BYPASS_AUTH = true;

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (BYPASS_AUTH) return true;
  return !!getAuthToken() && !!getCurrentUser();
}

// Get current authenticated user
export function getCurrentAuthUser(): any {
  if (BYPASS_AUTH) {
    return {
      id: 1,
      email: 'admin@devonshire.com',
      name: 'Admin User',
      role: 'admin' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }
  return getCurrentUser();
}

// Login function
export async function login(email: string, password: string): Promise<void> {
  if (BYPASS_AUTH) {
    // Set fake user for bypass
    const fakeUser = {
      id: 1,
      email: email,
      name: 'Admin User',
      role: 'admin' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setAuthToken('bypass_token_' + Date.now());
    setCurrentUser(fakeUser);
    return;
  }

  const response = await authApi.login(email, password);

  if (response.success && response.token && response.user) {
    setAuthToken(response.token);
    setCurrentUser(response.user);
  } else {
    throw new Error(response.error || 'Login failed');
  }
}

// Logout function
export function logout(): void {
  clearAuthToken();
  clearCurrentUser();
  // Redirect to home page
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
}

// Register function
export async function register(email: string, password: string, name: string): Promise<void> {
  if (BYPASS_AUTH) {
    const fakeUser = {
      id: 1,
      email: email,
      name: name,
      role: 'admin' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setAuthToken('bypass_token_' + Date.now());
    setCurrentUser(fakeUser);
    return;
  }

  const response = await authApi.register(email, password, name);

  if (response.success && response.token && response.user) {
    setAuthToken(response.token);
    setCurrentUser(response.user);
  } else {
    throw new Error(response.error || 'Registration failed');
  }
}

// Require authentication - redirect to login if not authenticated
export function requireAuth(): void {
  if (!isAuthenticated()) {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
  }
}
// Authentication utilities for frontend

import { getAuthToken, setAuthToken, getCurrentUser, setCurrentUser, clearAuthToken, clearCurrentUser, authApi } from './api';

export interface AuthState {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
}

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  username: 'jorgeajs',
  password: 'jorge20511307'
};

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!getAuthToken() && !!getCurrentUser();
}

// Get current authenticated user
export function getCurrentAuthUser(): any {
  return getCurrentUser();
}

// Login function
export async function login(email: string, password: string): Promise<void> {
  // Check against hardcoded admin credentials
  if (email === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const user = {
      id: 1,
      email: email,
      name: 'Jorge Admin',
      role: 'admin' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setAuthToken('admin_token_' + Date.now());
    setCurrentUser(user);
    return;
  }

  // If credentials don't match, try API (if available)
  try {
    const response = await authApi.login(email, password);

    if (response.success && response.token && response.user) {
      setAuthToken(response.token);
      setCurrentUser(response.user);
    } else {
      throw new Error(response.error || 'Login failed');
    }
  } catch (error) {
    throw new Error('Invalid credentials');
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
// Authentication State Interface
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  refreshToken: string | null;
  error: string | null;
  user: AuthUser | null;
  loginMethod: 'google' | 'email' | null;
}

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  authProvider: 'google' | 'email';
  emailVerified: boolean;
  createdAt: Date;
  lastLoginAt: Date;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  token: null,
  refreshToken: null,
  error: null,
  user: null,
  loginMethod: null
};
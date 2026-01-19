import { UserRole } from '../../types/civica-api.types';

// Authentication State Interface
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean; // True after initial auth check completes (success or failure)
  emailConfirmationPending: boolean; // True when user registered but needs to confirm email
  pendingEmail: string | null; // Email address awaiting confirmation
  token: string | null;
  refreshToken: string | null;
  error: string | null;
  user: AuthUser | null;
  loginMethod: 'google' | 'email' | null;
  // Password reset state
  passwordResetEmailSent: boolean;
  passwordResetPendingEmail: string | null;
  passwordResetLoading: boolean;
}

// AuthUser type that matches what the API returns
export interface AuthUser {
  id: string;
  email: string | null;
  displayName: string | null;
  photoUrl: string | null;
  authProvider: 'google' | 'email';
  emailVerified: boolean;
  createdAt: Date;
  lastLoginAt: Date;
  role: UserRole;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  emailConfirmationPending: false,
  pendingEmail: null,
  token: null,
  refreshToken: null,
  error: null,
  user: null,
  loginMethod: null,
  // Password reset state
  passwordResetEmailSent: false,
  passwordResetPendingEmail: null,
  passwordResetLoading: false
};
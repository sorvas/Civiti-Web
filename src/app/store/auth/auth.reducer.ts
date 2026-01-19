import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,

  // Google OAuth Reducers
  on(AuthActions.loginWithGoogle, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(AuthActions.loginWithGoogleSuccess, (state, { user, token, refreshToken }) => ({
    ...state,
    isAuthenticated: true,
    isLoading: false,
    isInitialized: true,
    user,
    token,
    refreshToken,
    loginMethod: 'google' as 'google' | 'email' | null,
    error: null
  })),

  on(AuthActions.loginWithGoogleFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    isLoading: false,
    emailConfirmationPending: false,
    pendingEmail: null,
    error,
    user: null,
    token: null,
    refreshToken: null,
    loginMethod: null
  })),

  // Email/Password Login Reducers
  on(AuthActions.loginWithEmail, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(AuthActions.loginWithEmailSuccess, (state, { user, token, refreshToken }) => ({
    ...state,
    isAuthenticated: true,
    isLoading: false,
    isInitialized: true,
    user,
    token,
    refreshToken,
    loginMethod: 'email' as 'google' | 'email' | null,
    error: null
  })),

  on(AuthActions.loginWithEmailFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    isLoading: false,
    emailConfirmationPending: false,
    pendingEmail: null,
    error,
    user: null,
    token: null,
    refreshToken: null,
    loginMethod: null
  })),

  // Registration Reducers
  on(AuthActions.registerWithEmail, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(AuthActions.registerWithEmailSuccess, (state, { user, token, refreshToken }) => ({
    ...state,
    isAuthenticated: true,
    isLoading: false,
    isInitialized: true,
    emailConfirmationPending: false,
    pendingEmail: null,
    user,
    token,
    refreshToken,
    loginMethod: 'email' as 'google' | 'email' | null,
    error: null
  })),

  on(AuthActions.registerWithEmailPendingConfirmation, (state, { email }) => ({
    ...state,
    isAuthenticated: false,
    isLoading: false,
    isInitialized: true,
    emailConfirmationPending: true,
    pendingEmail: email,
    user: null,
    token: null,
    refreshToken: null,
    loginMethod: null,
    error: null
  })),

  on(AuthActions.clearEmailConfirmationPending, (state) => ({
    ...state,
    emailConfirmationPending: false,
    pendingEmail: null
  })),

  on(AuthActions.registerWithEmailFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    isLoading: false,
    emailConfirmationPending: false,
    pendingEmail: null,
    error,
    user: null,
    token: null,
    refreshToken: null,
    loginMethod: null
  })),

  // Token Management Reducers
  on(AuthActions.refreshToken, (state) => ({
    ...state,
    isLoading: true
  })),

  on(AuthActions.refreshTokenSuccess, (state, { token, refreshToken }) => ({
    ...state,
    isLoading: false,
    token,
    refreshToken,
    error: null
  })),

  on(AuthActions.refreshTokenFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
    isAuthenticated: false,
    emailConfirmationPending: false,
    pendingEmail: null,
    user: null,
    token: null,
    refreshToken: null,
    loginMethod: null
  })),

  // Session Management Reducers
  // Keep isInitialized: true after logout since auth check was already done
  on(AuthActions.logout, () => ({
    ...initialAuthState,
    isInitialized: true
  })),

  on(AuthActions.clearAuthError, (state) => ({
    ...state,
    error: null
  })),

  on(AuthActions.loadUserFromStorage, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(AuthActions.loadUserFromStorageSuccess, (state, { user, token, refreshToken }) => ({
    ...state,
    isAuthenticated: true,
    isLoading: false,
    isInitialized: true,
    user,
    token,
    refreshToken,
    loginMethod: user?.authProvider || null,
    error: null
  })),

  on(AuthActions.loadUserFromStorageFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    isLoading: false,
    isInitialized: true,
    emailConfirmationPending: false,
    pendingEmail: null,
    error: error || null, // Don't store empty strings as errors
    user: null,
    token: null,
    refreshToken: null,
    loginMethod: null
  })),

  // Password Reset Reducers
  on(AuthActions.forgotPassword, (state) => ({
    ...state,
    passwordResetLoading: true,
    passwordResetEmailSent: false,
    passwordResetPendingEmail: null,
    error: null
  })),

  on(AuthActions.forgotPasswordSuccess, (state, { email }) => ({
    ...state,
    passwordResetLoading: false,
    passwordResetEmailSent: true,
    passwordResetPendingEmail: email,
    error: null
  })),

  on(AuthActions.forgotPasswordFailure, (state, { error }) => ({
    ...state,
    passwordResetLoading: false,
    passwordResetEmailSent: false,
    passwordResetPendingEmail: null,
    error
  })),

  on(AuthActions.clearPasswordResetState, (state) => ({
    ...state,
    passwordResetEmailSent: false,
    passwordResetPendingEmail: null,
    passwordResetLoading: false,
    error: null
  })),

  on(AuthActions.resetPassword, (state) => ({
    ...state,
    passwordResetLoading: true,
    error: null
  })),

  on(AuthActions.resetPasswordSuccess, (state) => ({
    ...state,
    passwordResetLoading: false,
    passwordResetEmailSent: false,
    passwordResetPendingEmail: null,
    error: null
  })),

  on(AuthActions.resetPasswordFailure, (state, { error }) => ({
    ...state,
    passwordResetLoading: false,
    error
  }))
);
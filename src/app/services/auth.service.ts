import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { MockAuthService, AuthResponse, TokenResponse } from './mock-auth.service';
import { SupabaseAuthService, SupabaseAuthResponse } from './supabase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private mockAuthService: MockAuthService,
    private supabaseAuthService: SupabaseAuthService
  ) {}

  // ============================================
  // Authentication Methods
  // ============================================

  loginWithGoogle(): Observable<AuthResponse> {
    if (environment.mockMode) {
      return this.mockAuthService.loginWithGoogle();
    }

    return this.supabaseAuthService.signInWithGoogle().pipe(
      map(this.mapSupabaseToMockResponse),
      catchError(error => {
        // Handle OAuth redirect case
        if (error.type === 'oauth_redirect') {
          throw error;
        }
        throw new Error(error.message || 'Google login failed');
      })
    );
  }

  loginWithEmail(email: string, password: string): Observable<AuthResponse> {
    if (environment.mockMode) {
      return this.mockAuthService.loginWithEmail(email, password);
    }

    return this.supabaseAuthService.signInWithEmail(email, password).pipe(
      map(this.mapSupabaseToMockResponse),
      catchError(error => {
        throw new Error(error.message || 'Email login failed');
      })
    );
  }

  registerWithEmail(email: string, password: string, displayName: string): Observable<AuthResponse> {
    if (environment.mockMode) {
      return this.mockAuthService.registerWithEmail(email, password, displayName);
    }

    return this.supabaseAuthService.signUpWithEmail(email, password, displayName).pipe(
      map(this.mapSupabaseToMockResponse),
      catchError(error => {
        throw new Error(error.message || 'Registration failed');
      })
    );
  }

  refreshToken(): Observable<TokenResponse> {
    if (environment.mockMode) {
      return this.mockAuthService.refreshToken();
    }

    return this.supabaseAuthService.refreshToken().pipe(
      map(token => ({
        token,
        refreshToken: '' // Supabase manages refresh tokens internally
      })),
      catchError(error => {
        throw new Error(error.message || 'Token refresh failed');
      })
    );
  }

  getCurrentUser(): Observable<AuthResponse | null> {
    if (environment.mockMode) {
      return this.mockAuthService.getCurrentUser();
    }

    return this.supabaseAuthService.getCurrentUser().pipe(
      map(user => {
        if (!user) return null;
        
        const token = this.supabaseAuthService.getAccessToken();
        if (!token) return null;

        return {
          user: {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            authProvider: user.authProvider,
            emailVerified: user.emailVerified,
            createdAt: user.createdAt,
            lastLoginAt: user.lastLoginAt
          },
          token,
          refreshToken: ''
        };
      })
    );
  }

  isTokenValid(): Observable<boolean> {
    if (environment.mockMode) {
      return this.mockAuthService.isTokenValid();
    }

    return this.supabaseAuthService.isAuthenticated();
  }

  logout(): Observable<void> {
    if (environment.mockMode) {
      return this.mockAuthService.logout();
    }

    return this.supabaseAuthService.signOut().pipe(
      catchError(error => {
        throw new Error(error.message || 'Logout failed');
      })
    );
  }

  // ============================================
  // Email Verification
  // ============================================

  sendEmailVerification(): Observable<void> {
    if (environment.mockMode) {
      return this.mockAuthService.sendEmailVerification();
    }

    return this.supabaseAuthService.sendEmailVerification().pipe(
      catchError(error => {
        throw new Error(error.message || 'Failed to send verification email');
      })
    );
  }

  verifyEmail(token: string): Observable<void> {
    if (environment.mockMode) {
      return this.mockAuthService.verifyEmail(token);
    }

    // Email verification is handled automatically by Supabase
    // This method is mainly for mock compatibility
    return new Observable(observer => {
      observer.next();
      observer.complete();
    });
  }

  // ============================================
  // Password Reset
  // ============================================

  resetPassword(email: string): Observable<void> {
    if (environment.mockMode) {
      return this.mockAuthService.resetPassword(email);
    }

    return this.supabaseAuthService.resetPassword(email).pipe(
      catchError(error => {
        throw new Error(error.message || 'Password reset failed');
      })
    );
  }

  // ============================================
  // Helper Methods
  // ============================================

  private mapSupabaseToMockResponse(supabaseResponse: SupabaseAuthResponse): AuthResponse {
    return {
      user: {
        id: supabaseResponse.user.id,
        email: supabaseResponse.user.email,
        displayName: supabaseResponse.user.displayName,
        photoURL: supabaseResponse.user.photoURL,
        authProvider: supabaseResponse.user.authProvider,
        emailVerified: supabaseResponse.user.emailVerified,
        createdAt: supabaseResponse.user.createdAt,
        lastLoginAt: supabaseResponse.user.lastLoginAt
      },
      token: supabaseResponse.token,
      refreshToken: supabaseResponse.refreshToken
    };
  }

  getAccessToken(): string | null {
    if (environment.mockMode) {
      return localStorage.getItem('civica_token');
    }

    return this.supabaseAuthService.getAccessToken();
  }
}
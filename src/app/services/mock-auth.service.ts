import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { AuthUser } from '../store/auth/auth.state';

export interface AuthResponse {
  user: AuthUser;
  token: string;
  refreshToken: string;
}

export interface TokenResponse {
  token: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class MockAuthService {
  private readonly STORAGE_KEYS = {
    USER: 'civica_user',
    TOKEN: 'civica_token',
    REFRESH_TOKEN: 'civica_refresh_token'
  };

  private mockUsers: { [email: string]: AuthUser & { password?: string } } = {
    'test@civica.ro': {
      id: 'user-001',
      email: 'test@civica.ro',
      displayName: 'Ion Popescu',
      photoURL: '/assets/mock/avatar-1.jpg',
      authProvider: 'email',
      emailVerified: true,
      createdAt: new Date('2024-01-01'),
      lastLoginAt: new Date(),
      password: 'password123'
    },
    'maria.ionescu@gmail.com': {
      id: 'user-002',
      email: 'maria.ionescu@gmail.com',
      displayName: 'Maria Ionescu',
      photoURL: '/assets/mock/avatar-2.jpg',
      authProvider: 'google',
      emailVerified: true,
      createdAt: new Date('2024-01-15'),
      lastLoginAt: new Date()
    }
  };

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Simulate some existing users in localStorage
    if (!localStorage.getItem('civica_mock_users')) {
      localStorage.setItem('civica_mock_users', JSON.stringify(this.mockUsers));
    } else {
      const storedUsers = JSON.parse(localStorage.getItem('civica_mock_users') || '{}');
      this.mockUsers = { ...this.mockUsers, ...storedUsers };
    }
  }

  // Google OAuth Mock Implementation
  loginWithGoogle(): Observable<AuthResponse> {
    console.log('[MOCK AUTH] Simulating Google OAuth login...');
    
    return of(null).pipe(
      delay(this.getRandomDelay()),
      map(() => {
        // Simulate successful Google OAuth
        const user: AuthUser = {
          id: this.generateUserId(),
          email: 'user.google@gmail.com',
          displayName: 'Google User',
          photoURL: 'https://via.placeholder.com/150',
          authProvider: 'google',
          emailVerified: true,
          createdAt: new Date(),
          lastLoginAt: new Date()
        };

        const token = this.generateJWT(user);
        const refreshToken = this.generateRefreshToken();

        this.storeAuthData(user, token, refreshToken);
        
        console.log('[MOCK AUTH] Google login successful:', user);
        return { user, token, refreshToken };
      })
    );
  }

  // Email/Password Login Mock Implementation
  loginWithEmail(email: string, password: string): Observable<AuthResponse> {
    console.log('[MOCK AUTH] Attempting email login for:', email);
    
    return of(null).pipe(
      delay(this.getRandomDelay()),
      map(() => {
        const mockUser = this.mockUsers[email];
        
        if (!mockUser) {
          throw new Error('User not found. Please register first.');
        }

        if (mockUser.password && mockUser.password !== password) {
          throw new Error('Invalid password. Please try again.');
        }

        const user: AuthUser = {
          id: mockUser.id,
          email: mockUser.email,
          displayName: mockUser.displayName,
          photoURL: mockUser.photoURL,
          authProvider: 'email',
          emailVerified: mockUser.emailVerified,
          createdAt: mockUser.createdAt,
          lastLoginAt: new Date()
        };

        const token = this.generateJWT(user);
        const refreshToken = this.generateRefreshToken();

        this.storeAuthData(user, token, refreshToken);
        
        console.log('[MOCK AUTH] Email login successful:', user);
        return { user, token, refreshToken };
      })
    );
  }

  // Registration Mock Implementation
  registerWithEmail(email: string, password: string, displayName: string): Observable<AuthResponse> {
    console.log('[MOCK AUTH] Attempting registration for:', email);
    
    return of(null).pipe(
      delay(this.getRandomDelay()),
      map(() => {
        if (this.mockUsers[email]) {
          throw new Error('User already exists. Please login instead.');
        }

        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters long.');
        }

        const user: AuthUser = {
          id: this.generateUserId(),
          email,
          displayName,
          authProvider: 'email',
          emailVerified: false, // Simulate email verification requirement
          createdAt: new Date(),
          lastLoginAt: new Date()
        };

        // Store new user
        this.mockUsers[email] = { ...user, password };
        localStorage.setItem('civica_mock_users', JSON.stringify(this.mockUsers));

        const token = this.generateJWT(user);
        const refreshToken = this.generateRefreshToken();

        this.storeAuthData(user, token, refreshToken);
        
        console.log('[MOCK AUTH] Registration successful:', user);
        return { user, token, refreshToken };
      })
    );
  }

  // Token Refresh Mock Implementation
  refreshToken(): Observable<TokenResponse> {
    console.log('[MOCK AUTH] Refreshing token...');
    
    return of(null).pipe(
      delay(this.getRandomDelay()),
      map(() => {
        const currentUser = this.getCurrentUserSync();
        if (!currentUser) {
          throw new Error('No valid session found. Please login again.');
        }

        const token = this.generateJWT(currentUser);
        const refreshToken = this.generateRefreshToken();

        localStorage.setItem(this.STORAGE_KEYS.TOKEN, token);
        localStorage.setItem(this.STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

        console.log('[MOCK AUTH] Token refresh successful');
        return { token, refreshToken };
      })
    );
  }

  // Get Current User
  getCurrentUser(): Observable<AuthResponse | null> {
    return of(null).pipe(
      delay(100),
      map(() => {
        const user = this.getCurrentUserSync();
        const token = localStorage.getItem(this.STORAGE_KEYS.TOKEN);
        const refreshToken = localStorage.getItem(this.STORAGE_KEYS.REFRESH_TOKEN);

        if (user && token && refreshToken) {
          return { user, token, refreshToken };
        }
        
        return null;
      })
    );
  }

  // Check Token Validity
  isTokenValid(): Observable<boolean> {
    return of(null).pipe(
      delay(100),
      map(() => {
        const token = localStorage.getItem(this.STORAGE_KEYS.TOKEN);
        if (!token) return false;

        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const expiry = payload.exp * 1000;
          return Date.now() < expiry;
        } catch {
          return false;
        }
      })
    );
  }

  // Logout
  logout(): Observable<void> {
    console.log('[MOCK AUTH] Logging out...');
    
    return of(null).pipe(
      delay(200),
      map(() => {
        localStorage.removeItem(this.STORAGE_KEYS.USER);
        localStorage.removeItem(this.STORAGE_KEYS.TOKEN);
        localStorage.removeItem(this.STORAGE_KEYS.REFRESH_TOKEN);
        console.log('[MOCK AUTH] Logout successful');
      })
    );
  }

  // Private Helper Methods
  private getCurrentUserSync(): AuthUser | null {
    const userData = localStorage.getItem(this.STORAGE_KEYS.USER);
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch {
        return null;
      }
    }
    return null;
  }

  private storeAuthData(user: AuthUser, token: string, refreshToken: string): void {
    localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(this.STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(this.STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }

  private generateUserId(): string {
    return 'user-' + Math.random().toString(36).substr(2, 9);
  }

  private generateJWT(user: AuthUser): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.displayName,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    };
    
    // Mock JWT (not cryptographically secure)
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = btoa('mock-signature-' + Math.random().toString(36));
    
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  private generateRefreshToken(): string {
    return 'refresh-' + Math.random().toString(36).substr(2, 32);
  }

  private getRandomDelay(): number {
    return Math.random() * 400 + 300; // 300-700ms
  }

  // Email Verification Mock (for future use)
  sendEmailVerification(): Observable<void> {
    console.log('[MOCK AUTH] Sending email verification...');
    return of(null).pipe(
      delay(1000),
      map(() => {
        console.log('[MOCK AUTH] Email verification sent');
      })
    );
  }

  verifyEmail(token: string): Observable<void> {
    console.log('[MOCK AUTH] Verifying email with token:', token);
    return of(null).pipe(
      delay(500),
      map(() => {
        const user = this.getCurrentUserSync();
        if (user) {
          user.emailVerified = true;
          localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(user));
        }
        console.log('[MOCK AUTH] Email verified successfully');
      })
    );
  }

  // Password Reset Mock (for future use)
  resetPassword(email: string): Observable<void> {
    console.log('[MOCK AUTH] Sending password reset email to:', email);
    return of(null).pipe(
      delay(1000),
      map(() => {
        if (!this.mockUsers[email]) {
          throw new Error('No user found with this email address.');
        }
        console.log('[MOCK AUTH] Password reset email sent');
      })
    );
  }
}
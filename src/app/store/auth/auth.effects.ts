import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

import * as AuthActions from './auth.actions';
import { MockAuthService } from '../../services/mock-auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private mockAuthService: MockAuthService,
    private router: Router,
    private message: NzMessageService
  ) {}

  // Google OAuth Effects
  loginWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithGoogle),
      switchMap(() =>
        this.mockAuthService.loginWithGoogle().pipe(
          map(response => AuthActions.loginWithGoogleSuccess({
            user: response.user,
            token: response.token,
            refreshToken: response.refreshToken
          })),
          catchError(error => of(AuthActions.loginWithGoogleFailure({ 
            error: error.message || 'Google login failed' 
          })))
        )
      )
    )
  );

  // Email/Password Login Effects
  loginWithEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithEmail),
      switchMap(({ email, password }) =>
        this.mockAuthService.loginWithEmail(email, password).pipe(
          map(response => AuthActions.loginWithEmailSuccess({
            user: response.user,
            token: response.token,
            refreshToken: response.refreshToken
          })),
          catchError(error => of(AuthActions.loginWithEmailFailure({ 
            error: error.message || 'Email login failed' 
          })))
        )
      )
    )
  );

  // Registration Effects
  registerWithEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerWithEmail),
      switchMap(({ email, password, displayName }) =>
        this.mockAuthService.registerWithEmail(email, password, displayName).pipe(
          map(response => AuthActions.registerWithEmailSuccess({
            user: response.user,
            token: response.token,
            refreshToken: response.refreshToken
          })),
          catchError(error => of(AuthActions.registerWithEmailFailure({ 
            error: error.message || 'Registration failed' 
          })))
        )
      )
    )
  );

  // Token Refresh Effects
  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      switchMap(() =>
        this.mockAuthService.refreshToken().pipe(
          map(response => AuthActions.refreshTokenSuccess({
            token: response.token,
            refreshToken: response.refreshToken
          })),
          catchError(error => of(AuthActions.refreshTokenFailure({ 
            error: error.message || 'Token refresh failed' 
          })))
        )
      )
    )
  );

  // Success Navigation Effects
  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AuthActions.loginWithGoogleSuccess,
        AuthActions.loginWithEmailSuccess,
        AuthActions.registerWithEmailSuccess
      ),
      tap(({ user }) => {
        this.message.success(`Welcome back, ${user.displayName}!`);
        this.router.navigate(['/dashboard']);
      })
    ),
    { dispatch: false }
  );

  // Error Message Effects
  authError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AuthActions.loginWithGoogleFailure,
        AuthActions.loginWithEmailFailure,
        AuthActions.registerWithEmailFailure,
        AuthActions.refreshTokenFailure
      ),
      tap(({ error }) => {
        this.message.error(error);
      })
    ),
    { dispatch: false }
  );

  // Logout Effects
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.mockAuthService.logout().pipe(
          tap(() => {
            this.message.info('You have been logged out');
            this.router.navigate(['/auth/register']);
          }),
          map(() => ({ type: '[Auth] Logout Complete' })),
          catchError(error => {
            console.error('Logout error:', error);
            this.router.navigate(['/auth/register']);
            return of({ type: '[Auth] Logout Error' });
          })
        )
      )
    )
  );

  // Load User from Storage on App Init
  loadUserFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserFromStorage),
      switchMap(() =>
        this.mockAuthService.getCurrentUser().pipe(
          map(userData => {
            if (userData) {
              return AuthActions.loadUserFromStorageSuccess({
                user: userData.user,
                token: userData.token,
                refreshToken: userData.refreshToken
              });
            }
            return AuthActions.loadUserFromStorageFailure({ 
              error: 'No user found in storage' 
            });
          }),
          catchError(error => {
            console.error('Load user error:', error);
            return of(AuthActions.loadUserFromStorageFailure({ 
              error: error.message || 'Failed to load user from storage' 
            }));
          })
        )
      )
    )
  );

  // Check Auth Status Effect
  checkAuthStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkAuthStatus),
      switchMap(() =>
        this.mockAuthService.isTokenValid().pipe(
          map(isValid => {
            if (!isValid) {
              return AuthActions.logout();
            }
            return { type: '[Auth] Auth Status Valid' };
          }),
          catchError(() => of(AuthActions.logout()))
        )
      )
    )
  );
}
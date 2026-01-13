import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, take, withLatestFrom } from 'rxjs/operators';
import { selectIsAuthenticated, selectIsAuthInitialized } from '../store/auth/auth.selectors';

/**
 * Guard that requires user to be authenticated.
 * Waits for auth initialization before evaluating.
 * Redirects to login page if not authenticated.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  // Wait for auth initialization before checking authentication
  return store.select(selectIsAuthInitialized).pipe(
    filter(isInitialized => isInitialized),
    take(1),
    withLatestFrom(store.select(selectIsAuthenticated)),
    map(([_, isAuthenticated]) => {
      if (isAuthenticated) {
        return true;
      }
      // Redirect to login with return URL
      router.navigate(['/auth/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    })
  );
};

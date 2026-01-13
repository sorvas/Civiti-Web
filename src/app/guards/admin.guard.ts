import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, take, withLatestFrom } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  selectCanAccessAdminPanel,
  selectIsAuthenticated,
  selectIsAuthInitialized
} from '../store/auth/auth.selectors';

/**
 * Guard that requires user to have admin role.
 * Waits for auth initialization before evaluating.
 * Redirects to login if not authenticated, or shows error and redirects to dashboard if not admin.
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  const message = inject(NzMessageService);

  // Wait for auth initialization before checking permissions
  return store.select(selectIsAuthInitialized).pipe(
    filter(isInitialized => isInitialized),
    take(1),
    withLatestFrom(
      store.select(selectCanAccessAdminPanel),
      store.select(selectIsAuthenticated)
    ),
    map(([_, canAccess, isAuthenticated]) => {
      if (canAccess) {
        return true;
      }

      if (isAuthenticated) {
        // User is logged in but not an admin
        message.error('Nu ai permisiunea de a accesa această pagină');
        router.navigate(['/dashboard']);
      } else {
        // User is not logged in
        router.navigate(['/auth/login'], {
          queryParams: { returnUrl: state.url }
        });
      }

      return false;
    })
  );
};

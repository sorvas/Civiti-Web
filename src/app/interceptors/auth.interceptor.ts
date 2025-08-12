import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { SupabaseAuthService } from '../services/supabase-auth.service';
import { environment } from '../../environments/environment';

let isRefreshingToken = false;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(SupabaseAuthService);
  
  // Only add auth header for API requests
  if (!req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  // Get the access token
  const token = authService.getAccessToken();
  
  // Clone request and add auth header if token exists
  let authReq = req;
  if (token) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 401 Unauthorized errors
      if (error.status === 401 && token && !isRefreshingToken) {
        return handleTokenExpiry(req, next, authService);
      }

      // Handle other errors
      return throwError(() => error);
    })
  );
};

function handleTokenExpiry(
  req: HttpRequest<any>, 
  next: HttpHandlerFn,
  authService: SupabaseAuthService
): Observable<HttpEvent<any>> {
  if (isRefreshingToken) {
    // If already refreshing, wait for it to complete
    // In a more sophisticated implementation, you'd queue requests
    return throwError(() => new Error('Token refresh in progress'));
  }

  isRefreshingToken = true;

  return authService.refreshToken().pipe(
    switchMap((newToken: string) => {
      isRefreshingToken = false;
      
      // Retry the original request with the new token
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${newToken}`)
      });
      
      return next(authReq);
    }),
    catchError((refreshError) => {
      isRefreshingToken = false;
      
      // If token refresh fails, redirect to login or show error
      console.error('Token refresh failed:', refreshError);
      
      // You might want to emit an event here to trigger logout
      // authService.signOut().subscribe();
      
      return throwError(() => refreshError);
    })
  );
}
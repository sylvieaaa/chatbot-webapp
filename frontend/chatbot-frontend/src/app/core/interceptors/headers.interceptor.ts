import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { ACCESS_TOKEN } from '../constants/constants';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.getAuthToken();

  if (req.url.includes('/login')) {
    // Pass the request through without adding headers
    return next(req);
  }

  console.log('here');
  // Clone the request to add the authentication header.

  const authReq = accessToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        // Try refreshing the token if 401 Unauthorized occurs
        return authService.refresh().pipe(
          switchMap((data) => {
            // If successful, retry the original request with the new token
            localStorage.setItem(ACCESS_TOKEN, data.access);
            const retryRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${data.access}`,
              },
            });
            return next(retryRequest);
          }),
          catchError((refreshError) => {
            // If refresh fails, logout the user
            authService.logout();
            return throwError(
              () => new Error('Token refresh failed, logged out.')
            );
          })
        );
      }
      return throwError(() => error);
    })
  );
};

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginResponse, RefreshTokenResponse } from '../models/auth.model';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  login(payload: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login/`, payload).pipe(
      tap((response: LoginResponse) => {
        console.log('RESP> ', response);
        localStorage.setItem(ACCESS_TOKEN, response.access);
        localStorage.setItem(REFRESH_TOKEN, response.refresh);
      })
    );
  }

  refresh(): Observable<RefreshTokenResponse> {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http
      .post<RefreshTokenResponse>(`${this.apiUrl}/token/refresh`, refreshToken)
      .pipe(
        tap((response: RefreshTokenResponse) => {
          localStorage.setItem(ACCESS_TOKEN, response.access);
        }),
        catchError((error) => {
          return throwError(() => new Error(error));
        })
      );
  }

  register(payload: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register/`, payload);
  }

  getAuthToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  isAuthenticatedUser(): boolean {
    const token = this.getAuthToken();
    return token ? true : false;
  }

  logout(): void {
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(ACCESS_TOKEN);
    this.router.navigate(['/login']);
  }
}

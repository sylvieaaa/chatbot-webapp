export interface LoginResponse {
  refresh: string;
  access: string;
}

export interface RefreshTokenResponse {
  access: string;
}

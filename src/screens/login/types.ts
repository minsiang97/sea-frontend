export interface RefreshUserData {
  email: string;
  token: string;
}

export interface UserData extends RefreshUserData {
  refreshToken: string;
}

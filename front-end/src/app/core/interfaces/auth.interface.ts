export interface LoginRequest {
  email: any;
  password: any;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

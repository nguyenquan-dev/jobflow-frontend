export type UserRole = "CANDIDATE" | "EMPLOYER" | "ADMIN";

export interface User {
  id: number;
  email: string;
  fullName: string;
  role: UserRole;
  enabled: boolean;
}

export interface LoginRequest{
  email:string;
  password:string;
}

export interface LoginResponse{
  accessToken: string;
  user: User;
}

export interface RegisterRequest{
  email: string;
  password: string;
  fullName: string;
}

export interface RegisterResponse{
  email: string;
  fullName: string;
  role: UserRole;
}
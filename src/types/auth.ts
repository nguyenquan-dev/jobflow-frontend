export type UserRole = "CANDIDATE" | "EMPLOYER" | "ADMIN";

export interface User {
  id: number;
  email: string;
  role: UserRole;
}

export interface LoginRequest{
  email:string;
  password:string;
}

export interface LoginResponse{
  accessToken: string;
  tokenType: string;
}
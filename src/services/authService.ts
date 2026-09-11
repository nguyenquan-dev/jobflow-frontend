import {api} from "./api"
import type { RegisterRequest, RegisterResponse, User } from "../types/auth";
import type { LoginRequest, LoginResponse } from "../types/auth"

export async function loginService(request: LoginRequest): Promise<LoginResponse>{
  
  const response = await api.post<LoginResponse>("/auth/login", request);
  return response.data;
}

export async function registerCandidateService(request: RegisterRequest):Promise<RegisterResponse>{

  const response = await api.post<RegisterResponse>("/auth/register/candidate", request);
  
  return response.data;
}

export async function registerEmployerService(request: RegisterRequest):Promise<RegisterResponse>{

  const response = await api.post<RegisterResponse>("/auth/register/employer", request);
  
  return response.data;
}

export async function getCurrentUser(): Promise<User>{

  const response = await api.get<User>("/auth/me");

  return response.data;
}
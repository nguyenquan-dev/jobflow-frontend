import type { PageResponse } from "../types/api";
import type { User } from "../types/auth";
import type { Job } from "../types/job";
import { api } from "./api";


export async function getUsers(params: {page : number}):Promise<PageResponse<User>>{

  const response = await api.get<PageResponse<User>>("/admin/users", {params});

  return response.data;

}

export async function getUserById(id : number):Promise<User>{

  const response = await api.get<User>(`/admin/users/${id}`)

  return response.data;

}

export async function blockUser(id : number):Promise<User>{

  const response = await api.put<User>(`/admin/users/${id}/block`);

  return response.data;

}

export async function unblockUser(id : number): Promise<User>{

  const response = await api.put<User>(`/admin/users/${id}/unblock`);

  return response.data;

}

export async function getAdminJobs(
  params: { page: number }
): Promise<PageResponse<Job>> {

  const response = await api.get<PageResponse<Job>>(
    "/admin/jobs",
    { params }
  );

  return response.data;
}

export async function approveJob(
  jobId: number
): Promise<Job> {

  const response = await api.put<Job>(
    `/admin/jobs/${jobId}/approve`
  );

  return response.data;
}

export async function rejectJob(
  jobId: number
): Promise<Job> {

  const response = await api.put<Job>(
    `/admin/jobs/${jobId}/reject`
  );

  return response.data;
}
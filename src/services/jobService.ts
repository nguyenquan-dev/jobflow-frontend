import { api } from "./api"
import type { Job, UpdateJobRequest } from "../types/job"
import type { PageResponse } from "../types/api"

export interface JobServiceParams{

  keyword?: string;
  location?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: string;

}

export async function getJobs(params: JobServiceParams): Promise<PageResponse<Job>>{

  const response = await api.get<PageResponse<Job>>("/jobs", {params});

  return response.data;
}

export async function getJobById(id: number): Promise<Job> {

  const response = await api.get<Job>(`/jobs/${id}`);

  return response.data;
}

export interface CreateJobRequest{

  title: string;
  location: string;
  description: string;

}

export async function createJob(request: CreateJobRequest): Promise<Job>{

  const response = await api.post<Job>("/jobs", request);

  return response.data;
}

export async function getMyJobs(params: JobServiceParams):Promise<PageResponse<Job>> {

  const response = await api.get<PageResponse<Job>>("/jobs/my", {params});

  return response.data;
}

export async function updateJob(jobId: number ,param: UpdateJobRequest): Promise<Job>{

  const response = await api.put<Job>(`/jobs/${jobId}`, param);

  return response.data;

}

export async function deleteJob(jobId: number):Promise<void>{
  
  await api.delete(`/jobs/${jobId}`);

}
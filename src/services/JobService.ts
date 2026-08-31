import { api } from "./api"
import type { job } from "../types/job"
import type { PageResponse } from "../types/api"

export interface JobServiceParams{
  keyword?: string;
  location?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: string;
}

export async function getJobs(params: JobServiceParams): Promise<PageResponse<job>>{
  const response = await api.get<PageResponse<job>>("/jobs", {params});
  return response.data;
}
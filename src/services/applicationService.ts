import { api } from "./api";
import type { ApplicationResponse, ApplicationStatus } from "../types/application";
import type { PageResponse } from "../types/api";

export async function applyJob(jobId: number): Promise<ApplicationResponse> {

  const response = await api.post<ApplicationResponse>(
    `/jobs/${jobId}/applications`
  );

  return response.data;
}


export async function getMyApplications():Promise<ApplicationResponse[]> {

  const response = await api.get<ApplicationResponse[]>("/applications/me");

  return response.data;
}

export async function getJobApplications(jobId: number): Promise<ApplicationResponse[]> {

  const response = await api.get<ApplicationResponse[]>(`/jobs/${jobId}/applications`);

  return response.data;
}

export async function getEmployerApplications(params: {page: number}):Promise<PageResponse<ApplicationResponse>>{

  const response = 
          await api.get<PageResponse<ApplicationResponse>>("/applications/employer",{params});

  return response.data;

}

export async function updateApplicationStatus(
  applicationId: number,
  status: ApplicationStatus
): Promise<ApplicationResponse> {

  const response =
    await api.patch<ApplicationResponse>(
      `/applications/${applicationId}/status`,
      { status }
    );

  return response.data;
}
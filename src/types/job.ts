export type JobStatus =
  | "PENDING"
  | "ACTIVE"
  | "REJECTED";

export interface Job{
  id: number;
  title: string;
  description: string;
  location: string;
  employerName: string;
  status: JobStatus;
}

export interface UpdateJobRequest{
  title: string;
  location: string;
  description: string;
}
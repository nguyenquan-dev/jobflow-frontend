export type ApplicationStatus =
  |"PENDING"
  |"REVIEWING"
	|"SHORTLISTED"
	|"REJECTED"
	|"HIRED";

export interface ApplicationResponse {
  id: number;
  jobId: number;
  title: string;
  candidateId: number;
  candidateName: string;
  status: ApplicationStatus;
  appliedAt: string;
}

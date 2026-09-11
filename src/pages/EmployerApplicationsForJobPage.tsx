import { useParams } from "react-router-dom";
import type { ApplicationStatus } from "../types/application";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getJobApplications,
  updateApplicationStatus,
} from "../services/applicationService";

export default function JobApplicationsPage() {
  const { jobId } = useParams();
  const queryClient = useQueryClient();

  // Get applications
  const { data, isLoading } = useQuery({
    queryKey: ["job-applications", jobId],
    queryFn: () => getJobApplications(Number(jobId)),
    enabled: !!jobId,
  });

  // Update application status
  const updateStatusMutation = useMutation({
    mutationFn: ({
      applicationId,
      status,
    }: {
      applicationId: number;
      status: ApplicationStatus;
    }) => updateApplicationStatus(applicationId, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["job-applications", jobId],
      });
    },
  });

  if (isLoading) {
    return <div>Loading applications...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-6">
      <h1 className="text-2xl font-bold">
        Job Applications
      </h1>

      {data?.map((application) => (
        <div
          key={application.id}
          className="rounded-xl border p-6 shadow-sm"
        >
          <h2 className="font-semibold">
            {application.candidateName}
          </h2>

          <p className="mt-2 text-gray-600">
            Status: {application.status}
          </p>

          {application.status !== "REJECTED" &&
            application.status !== "HIRED" && (
              <div className="mt-4 flex gap-3">

                {application.status === "PENDING" && (
                  <button
                    onClick={() =>
                      updateStatusMutation.mutate({
                        applicationId: application.id,
                        status: "REVIEWING",
                      })
                    }
                    disabled={updateStatusMutation.isPending}
                    className="rounded-lg border px-4 py-2"
                  >
                    Review
                  </button>
                )}

                {application.status === "REVIEWING" && (
                  <button
                    onClick={() =>
                      updateStatusMutation.mutate({
                        applicationId: application.id,
                        status: "SHORTLISTED",
                      })
                    }
                    disabled={updateStatusMutation.isPending}
                    className="rounded-lg border px-4 py-2"
                  >
                    Shortlist
                  </button>
                )}

                {application.status === "SHORTLISTED" && (
                  <button
                    onClick={() =>
                      updateStatusMutation.mutate({
                        applicationId: application.id,
                        status: "HIRED",
                      })
                    }
                    disabled={updateStatusMutation.isPending}
                    className="rounded-lg border px-4 py-2"
                  >
                    Hire
                  </button>
                )}

                <button
                  onClick={() =>
                    updateStatusMutation.mutate({
                      applicationId: application.id,
                      status: "REJECTED",
                    })
                  }
                  disabled={updateStatusMutation.isPending}
                  className="rounded-lg border px-4 py-2"
                >
                  Reject
                </button>
              </div>
            )}
        </div>
      ))}

      {data?.length === 0 && (
        <p className="text-gray-500">
          No applications found.
        </p>
      )}
    </div>
  );
};


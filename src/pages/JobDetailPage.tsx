import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import { getJobById } from "../services/jobService"; 
import { applyJob } from "../services/applicationService";

export default function JobDetailPage() {
  const { jobId } = useParams();

  // Get job detail
  const {data: job, isLoading, isError} = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJobById(Number(jobId)),
    enabled: !!jobId,
  });

  // Apply job
  const mutation = useMutation({
    mutationFn: () => applyJob(Number(jobId)),

    onSuccess: () => {
      alert("Application submitted!");
    },

    onError: () => {
      alert("Failed to apply.");
    },
  });

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (isError || !job) {
    return <div className="p-8">Job not found.</div>;
  }

  return (
    <div className="mx-auto max-w-4xl p-8">

      <h1 className="text-4xl font-bold">
        {job.title}
      </h1>

      <p className="mt-3 text-gray-600">
        {job.location}
      </p>

      <p className="mt-2 text-gray-500">
        {job.employerName}
      </p>

      <div className="mt-8 rounded-xl border p-6">

        <h2 className="text-xl font-semibold">
          Job Description
        </h2>

        <p className="mt-4">
          {job.description}
        </p>

      </div>

      <button
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
        className="mt-8 rounded-lg bg-black px-6 py-3 text-white disabled:opacity-50"
      >
        {mutation.isPending
          ? "Applying..."
          : "Apply Now"}
      </button>

    </div>
  );
}

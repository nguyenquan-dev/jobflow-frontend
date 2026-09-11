import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";

import {
  getMyJobs,
  deleteJob,
} from "../services/jobService";

export default function EmployerJobsPage() {

  const [page, setPage] = useState(0);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["employer-jobs", page],
    queryFn: () =>
      getMyJobs({
        page,
        size: 10,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteJob,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employer-jobs"],
      });
    },
  });

  const handleDelete = (jobId: number) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) {
      return;
    }

    deleteMutation.mutate(jobId);
  };

  if (isLoading) {
    return <p className="p-8">Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-6xl p-8">

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          My Jobs
        </h1>

        <Link
          to="/employer/jobs/new"
          className="rounded-lg bg-black px-5 py-3 text-white"
        >
          Create Job
        </Link>

      </div>

      <div className="mt-8 space-y-4">

        {data?.content.map((job) => (

          <div
            key={job.id}
            className="rounded-xl border p-6"
          >

            <h2 className="text-xl font-semibold">
              {job.title}
            </h2>

            <p className="mt-2 text-gray-600">
              {job.location}
            </p>

            <div className="mt-4 flex items-center gap-3">

              <Link
                to={`/employer/jobs/${job.id}/applications`}
                className="rounded border px-4 py-2"
              >
                View Applications
              </Link>

              <Link
                to={`/employer/jobs/${job.id}/edit`}
                className="rounded border px-4 py-2"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(job.id)}
                disabled={deleteMutation.isPending}
                className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
              >
                {deleteMutation.isPending
                  ? "Deleting..."
                  : "Delete"}
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-center gap-4">

        <button
          disabled={page === 0}
          onClick={() =>
            setPage((current) => current - 1)
          }
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page + 1} of {data?.totalPages ?? 0}
        </span>

        <button
          disabled={
            data == null ||
            page >= data.totalPages - 1
          }
          onClick={() =>
            setPage((current) => current + 1)
          }
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
}

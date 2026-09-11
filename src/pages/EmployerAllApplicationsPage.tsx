import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";

import { getEmployerApplications } from "../services/applicationService";

export default function EmployerAllApplicationsPage() {

  const [page, setPage] = useState(0);

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employer-applications", page],
    queryFn: () =>
      getEmployerApplications({page}),
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl p-8">
        <p className="text-gray-600">
          Loading applications...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-6xl p-8">
        <p className="text-red-500">
          Failed to load applications.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-8">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Applications
          </h1>

          <p className="mt-1 text-gray-600">
            Review applications submitted to your jobs.
          </p>
        </div>

        <Link
          to="/employer/jobs"
          className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-gray-50"
        >
          My Jobs
        </Link>

      </div>

      {/* Applications */}
      <div className="mt-8">

        {data && data.content.length > 0 ? (

          <div className="overflow-hidden rounded-xl border bg-white">

            {/* Table header */}
            <div className="hidden grid-cols-5 gap-4 border-b bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-600 md:grid">

              <div>
                Candidate
              </div>

              <div>
                Job
              </div>

              <div>
                Status
              </div>

              <div>
                Applied
              </div>

              <div>
                Action
              </div>

            </div>

            {/* Application rows */}
            <div className="divide-y">

              {data.content.map((application) => (

                <div
                  key={application.id}
                  className="grid gap-4 px-6 py-5 md:grid-cols-5 md:items-center"
                >

                  {/* Candidate */}
                  <div>
                    <p className="font-medium text-gray-900">
                      {application.candidateName}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Candidate #{application.candidateId}
                    </p>
                  </div>

                  {/* Job */}
                  <div>
                    <Link
                      to={`/employer/jobs/${application.jobId}/applications`}
                      className="font-medium text-gray-900 hover:underline"
                    >
                      {application.title}
                    </Link>
                  </div>

                  {/* Status */}
                  <div>
                    <span className="rounded-md border px-2 py-1 text-xs font-medium text-gray-700">
                      {application.status}
                    </span>
                  </div>


                  {/* Applied date */}
                  <div className="text-sm text-gray-500">
                    {new Date(
                      application.appliedAt
                    ).toLocaleDateString()}
                  </div>

                  {/* Action */}
                  <div>

                    <Link
                      to={`/employer/jobs/${application.jobId}/applications`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      View
                    </Link>

                  </div>

                </div>

              ))}

            </div>

          </div>

        ) : (

          <div className="rounded-xl border bg-white p-12 text-center">

            <h2 className="text-lg font-semibold text-gray-900">
              No applications yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Applications from candidates will appear here.
            </p>

            <Link
              to="/employer/jobs"
              className="mt-6 inline-block rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              View My Jobs
            </Link>

          </div>

        )}

      </div>

      {/* Pagination */}
      {data && data.totalPages > 0 && (
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

          <span className="text-sm text-gray-600">
            Page {page + 1} of {data.totalPages}
          </span>

          <button
            disabled={page >= data.totalPages - 1}
            onClick={() =>
              setPage((current) => current + 1)
            }
            className="rounded border px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
}

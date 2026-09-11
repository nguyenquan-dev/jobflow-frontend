import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import {
  approveJob,
  getAdminJobs,
  rejectJob,
} from "../services/adminService"

export default function AdminJobsPage() {

  const [page, setPage] = useState(0);

  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-jobs", page],

    queryFn: () =>
      getAdminJobs({
        page,
      }),
  });

  const approveMutation = useMutation({
    mutationFn: approveJob,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-jobs"],
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectJob,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-jobs"],
      });
    },
  });

  const isUpdating =
    approveMutation.isPending ||
    rejectMutation.isPending;

  return (
    <div className="mx-auto max-w-6xl p-8">

      <h1 className="text-3xl font-bold">
        Jobs
      </h1>

      <p className="mt-2 text-gray-500">
        Review and manage job postings.
      </p>

      {isLoading && (
        <p className="mt-6">
          Loading jobs...
        </p>
      )}

      {isError && (
        <p className="mt-6 text-red-600">
          Failed to load jobs.
        </p>
      )}

      {!isLoading && !isError && (
        <>
          <div className="mt-6 overflow-hidden rounded-xl border">

            <table className="w-full">

              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left">
                    Title
                  </th>

                  <th className="px-6 py-4 text-left">
                    Employer
                  </th>

                  <th className="px-6 py-4 text-left">
                    Location
                  </th>

                  <th className="px-6 py-4 text-left">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>

                {data?.content.map((job) => (
                  <tr
                    key={job.id}
                    className="border-t"
                  >

                    <td className="px-6 py-4 font-medium">
                      {job.title}
                    </td>

                    <td className="px-6 py-4">
                      {job.employerName}
                    </td>

                    <td className="px-6 py-4">
                      {job.location}
                    </td>

                    <td className="px-6 py-4">

                      {job.status === "PENDING" && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                          Pending
                        </span>
                      )}

                      {job.status === "ACTIVE" && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                          Active
                        </span>
                      )}

                      {job.status === "REJECTED" && (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                          Rejected
                        </span>
                      )}

                    </td>

                    <td className="px-6 py-4">

                      {job.status === "PENDING" && (
                        <div className="flex gap-2">

                          <button
                            disabled={isUpdating}
                            onClick={() =>
                              approveMutation.mutate(
                                job.id
                              )
                            }
                            className="rounded-lg bg-green-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
                          >
                            Approve
                          </button>

                          <button
                            disabled={isUpdating}
                            onClick={() =>
                              rejectMutation.mutate(
                                job.id
                              )
                            }
                            className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
                          >
                            Reject
                          </button>

                        </div>
                      )}

                      {job.status === "ACTIVE" && (
                        <button
                          disabled={isUpdating}
                          onClick={() =>
                            rejectMutation.mutate(
                              job.id
                            )
                          }
                          className="rounded-lg border border-red-600 px-3 py-1.5 text-sm text-red-600 disabled:opacity-50"
                        >
                          Reject
                        </button>
                      )}

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

            {data?.content.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No jobs found.
              </div>
            )}

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
              Page {page + 1} of{" "}
              {data?.totalPages ?? 0}
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
        </>
      )}

    </div>
  );
}

import { useQuery } from "@tanstack/react-query";

import {
  getMyApplications,
} from "../services/applicationService";

export default function MyApplicationsPage() {
  const {data, isLoading, isError} = useQuery({
    queryKey: ["my-applications"],
    queryFn: getMyApplications,
  });

  if (isLoading) {
    return <p className="p-8">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="p-8 text-red-600">
        Failed to load applications.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-8">

      <h1 className="text-3xl font-bold">
        My Applications
      </h1>

      {data?.length === 0 && (
        <p className="mt-6 text-gray-500">
          You haven't applied for any jobs yet.
        </p>
      )}

      <div className="mt-6 space-y-4">

        {data?.map((application) => (
          <div
            key={application.id}
            className="rounded-xl border p-6"
          >

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-semibold">
                  {application.title}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Job ID: {application.jobId}
                </p>
              </div>

              <span className="rounded-full border px-3 py-1 text-sm">
                {application.status}
              </span>

            </div>

            <p className="mt-6 text-sm text-gray-500">
              Applied on {new Date(application.appliedAt).toLocaleDateString()}
            </p>


          </div>
        ))}

      </div>

    </div>
  );
}

import {useQuery} from "@tanstack/react-query"
import { useState } from "react";
import {getJobs} from "../services/JobService"
import JobCard from "../components/job/JobCard";
import JobSearchBar from "../components/job/JobSearchBar"


export default function JobsPage(){

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const [page, setPage] = useState(0);

  const handleKeywordChange = (value : string) => {
    setKeyword(value);
    setPage(0);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    setPage(0);
  };

  const {data, isLoading, isError} = useQuery({
    queryKey: ["jobs", keyword, location, page],
    queryFn: () => getJobs({keyword,
                            location,
                            page,
                            size: 10,
                   }),
  });

  return (
    <div className="mx-auto max-w-6xl p-8">

      <h1 className="text-3xl font-bold">
        Find Your Next Job
      </h1>

      <div className="mt-6">
        <JobSearchBar
          keyword={keyword}
          location={location}
          onKeywordChange={setKeyword}
          onLocationChange={setLocation}
        />
      </div>

      {isLoading && (
        <p className="mt-6">
          Loading...
        </p>
      )}

      {isError && (
        <p className="mt-6">
          Failed to load jobs.
        </p>
      )}

      {/* Danh sách Job */}
      <div className="mt-6 space-y-4">
        {data?.content.map((job) => (
          <JobCard
            key={job.id}
            job={job}
          />
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
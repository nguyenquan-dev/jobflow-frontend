import type {job}  from "../../types/job";

interface JobCardProps{
  job: job;
}

export default function JobCard({job} : JobCardProps){
  return (
    <div className="rounded-lg border p-5">

      <h2 className="text-xl font-semibold">
        {job.title}
      </h2>

      <p className="mt-2 text-gray-600">
        {job.location}
      </p>

      <p className="mt-1 text-sm text-gray-500">
        {job.employerName}
      </p>

    </div>
  );
} 
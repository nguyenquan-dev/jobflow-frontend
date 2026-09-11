import { Link } from "react-router-dom";
import type {Job}  from "../../types/job";

interface JobCardProps{
  job: Job;
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

      <Link to={`/jobs/${job.id}`} className="mt-4 inline-block">
        View Details
      </Link>

    </div>
  );
} 
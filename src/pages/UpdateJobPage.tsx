import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { SubmitEventHandler } from "react";

import {
  getJobById,
  updateJob,
} from "../services/jobService";

import type { UpdateJobRequest } from "../types/job";

export default function UpdateJobPage() {

  const { jobId } = useParams<{ jobId: string }>();

  const navigate = useNavigate();

  const [form, setForm] = useState<UpdateJobRequest>({
    title: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    data: job,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJobById(Number(jobId)),
    enabled: !!jobId,
  });

  useEffect(() => {

    if (!job) {
      return;
    }

    setForm({
      title: job.title,
      location: job.location,
      description: job.description,
    });

  }, [job]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {

    event.preventDefault();

    setError("");
    setLoading(true);

    try {

      await updateJob(Number(jobId), form);

      navigate("/employer/jobs");

    } catch (error) {

      setError("Failed to update job. Please try again.");

    } finally {

      setLoading(false);

    }
  };

  if (isLoading) {
    return <p className="p-8">Loading...</p>;
  }

  if (isError || !job) {
    return (
      <div className="p-8">

        <p className="text-red-600">
          Failed to load job.
        </p>

        <Link
          to="/employer/jobs"
          className="mt-4 inline-block underline"
        >
          Back to My Jobs
        </Link>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-8">

      <h1 className="text-3xl font-bold">
        Update Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >

        {/* Title */}
        <div>

          <label
            htmlFor="title"
            className="mb-2 block font-medium"
          >
            Job Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
          />

        </div>

        {/* Location */}
        <div>

          <label
            htmlFor="location"
            className="mb-2 block font-medium"
          >
            Location
          </label>

          <input
            id="location"
            name="location"
            type="text"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
          />

        </div>

        {/* Description */}
        <div>

          <label
            htmlFor="description"
            className="mb-2 block font-medium"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={8}
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
          />

        </div>

        {error && (
          <p className="text-red-600">
            {error}
          </p>
        )}

        <div className="flex gap-3">

          <Link
            to="/employer/jobs"
            className="rounded-lg border px-5 py-3"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-black px-5 py-3 text-white disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Job"}
          </button>

        </div>

      </form>

    </div>
  );
}

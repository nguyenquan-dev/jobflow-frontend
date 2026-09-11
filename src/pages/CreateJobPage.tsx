import { useState, type SubmitEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { createJob } from "../services/jobService";

export default function CreateJobPage() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] =
    useState("");

  const mutation = useMutation({

    mutationFn: createJob,

    onSuccess: () => {
      navigate("/employer/jobs");
    },

  });

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
  event.preventDefault();

  mutation.mutate({
    title,
    location,
    description,
  });
};


  return (
    <div className="mx-auto max-w-3xl p-8">

      <h1 className="text-3xl font-bold">
        Create Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Job title"
          className="w-full rounded-lg border p-3"
          required
        />

        <input
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          placeholder="Location"
          className="w-full rounded-lg border p-3"
          required
        />

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Job description"
          rows={8}
          className="w-full rounded-lg border p-3"
          required
        />

        <button
          type="submit"
          disabled={mutation.isPending}
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          {mutation.isPending
            ? "Creating..."
            : "Create Job"}
        </button>

      </form>

    </div>
  );
}
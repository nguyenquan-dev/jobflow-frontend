import { Link } from "react-router-dom";

export default function AdminDashboard() {

  return (
    <div className="mx-auto max-w-6xl p-8">

      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <div className="mt-6 grid gap-4 md:grid-cols-3">

        <Link
          to="/admin/users"
          className="rounded-xl border p-6 transition hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold">
            Users
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Manage candidates and recruiters.
          </p>
        </Link>

        <Link
          to="/admin/jobs"
          className="rounded-xl border p-6 transition hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold">
            Jobs
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Manage and moderate job postings.
          </p>
        </Link>

        <Link
          to="/admin/reports"
          className="rounded-xl border p-6 transition hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold">
            Reports
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Review reports submitted by users.
          </p>
        </Link>

      </div>

    </div>
  );
}
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">

      <div className="w-full max-w-2xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Create your JobFlow account
          </h1>

          <p className="mt-2 text-gray-600">
            Choose the account type that fits you
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {/* Candidate */}
          <div className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">
              Candidate
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Find jobs and build your career.
            </p>

            <Link
              to="/register/candidate"
              className="mt-6 block rounded-lg bg-black p-3 text-center text-white"
            >
              Register as Candidate
            </Link>
          </div>

          {/* Employer */}
          <div className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">
              Employer
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Post jobs and find great candidates.
            </p>

            <Link
              to="/register/employer"
              className="mt-6 block rounded-lg bg-black p-3 text-center text-white"
            >
              Register as Employer
            </Link>
          </div>

        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-black underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

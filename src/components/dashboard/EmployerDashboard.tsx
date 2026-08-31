export default function EmployerDashboard() {

  return (
    <div className="mx-auto max-w-6xl p-8">

      <h1 className="text-3xl font-bold">
        Employer Dashboard
      </h1>

      <div className="mt-6 grid gap-4 md:grid-cols-3">

        <div className="rounded-xl border p-6">
          My Jobs
        </div>

        <div className="rounded-xl border p-6">
          Applications
        </div>

        <div className="rounded-xl border p-6">
          Create Job
        </div>

      </div>

    </div>
  );
}
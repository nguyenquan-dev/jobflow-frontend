export default function CandidateDashboard() {

  return (
    <div className="mx-auto max-w-6xl p-8">

      <h1 className="text-3xl font-bold">
        Candidate Dashboard
      </h1>

      <div className="mt-6 grid gap-4 md:grid-cols-3">

        <div className="rounded-xl border p-6">
          Applications
        </div>

        <div className="rounded-xl border p-6">
          Saved Jobs
        </div>

        <div className="rounded-xl border p-6">
          Profile
        </div>

      </div>

    </div>
  );
}
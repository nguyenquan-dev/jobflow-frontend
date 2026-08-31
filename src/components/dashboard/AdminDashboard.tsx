export default function AdminDashboard() {

  return (
    <div className="mx-auto max-w-6xl p-8">

      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <div className="mt-6 grid gap-4 md:grid-cols-3">

        <div className="rounded-xl border p-6">
          Users
        </div>

        <div className="rounded-xl border p-6">
          Jobs
        </div>

        <div className="rounded-xl border p-6">
          Reports
        </div>

      </div>

    </div>
  );
}
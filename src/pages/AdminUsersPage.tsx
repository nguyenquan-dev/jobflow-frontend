import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import {
  blockUser,
  getUsers,
  unblockUser,
} from "../services/adminService";

export default function AdminUsersPage() {

  const [page, setPage] = useState(0);

  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-users", page],
    queryFn: () => getUsers({page}),
  });

  const blockMutation = useMutation({
    mutationFn: blockUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
  });

  const unblockMutation = useMutation({
    mutationFn: unblockUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
  });

  const handleToggleUser = (
    id: number,
    enabled: boolean
  ) => {

    if (enabled) {
      blockMutation.mutate(id);
    } else {
      unblockMutation.mutate(id);
    }
  };

  const isUpdating =
    blockMutation.isPending ||
    unblockMutation.isPending;

  return (
    <div className="mx-auto max-w-6xl p-8">

      <h1 className="text-3xl font-bold">
        Users
      </h1>

      <p className="mt-2 text-gray-500">
        Manage users registered on Jobflow.
      </p>

      {isLoading && (
        <p className="mt-6">
          Loading users...
        </p>
      )}

      {isError && (
        <p className="mt-6 text-red-600">
          Failed to load users.
        </p>
      )}

      {!isLoading && !isError && (
        <>
          <div className="mt-6 overflow-hidden rounded-xl border">

            <table className="w-full">

              <thead className="bg-gray-50">
                <tr>

                  <th className="px-6 py-4 text-left">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {data?.content.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t"
                  >

                    <td className="px-6 py-4 font-medium">
                      {user.fullName}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-4">
                      {user.role}
                    </td>

                    <td className="px-6 py-4">

                      {user.enabled ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                          Blocked
                        </span>
                      )}

                    </td>

                    <td className="px-6 py-4">

                      <button
                        disabled={isUpdating}
                        onClick={() =>
                          handleToggleUser(
                            user.id,
                            user.enabled
                          )
                        }
                        className="rounded-lg border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {user.enabled
                          ? "Block"
                          : "Unblock"}
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

            {data?.content.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No users found.
              </div>
            )}

          </div>

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
        </>
      )}

    </div>
  );
}

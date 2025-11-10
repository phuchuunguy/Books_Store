import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../api";
import { Link, useNavigate } from "react-router-dom";

export default function UsersList() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ totalPages: 1 });

  const loadData = async () => {
    const res = await getUsers(page, 5);
    setUsers(res.data || res);
    setMeta(res.meta || { totalPages: 1 });
  };

  useEffect(() => {
    loadData();
  }, [page]);

  const handleDelete = async (id) => {
    if (!confirm("Delete user?")) return;
    await deleteUser(id);
    loadData();
  };

  return (
    <div className="p-6">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
      >
        ⬅ Back
      </button>

      <h1 className="text-2xl font-semibold mb-4">Users</h1>

      <div className="flex flex-col gap-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="flex justify-between items-center bg-white p-4 rounded shadow"
          >
            <div>
              <p className="font-semibold">{u.username}</p>
              <p className="text-gray-600">Role: {u.role}</p>
            </div>

            <div className="flex gap-2">
              <Link
                to={`/users/${u.id}`}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                View
              </Link>

              <button
                onClick={() => handleDelete(u.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-semibold">
          Page {page} / {meta.totalPages}
        </span>

        <button
          disabled={page >= meta.totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

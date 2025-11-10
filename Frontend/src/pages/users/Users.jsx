import { useAuth } from "../context/AuthContext";
import { fetchUsers, deleteUser } from "../../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Users() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  if (user.role !== "admin") {
    return <p className="p-6 text-red-600">Bạn không có quyền xem danh sách Users.</p>;
  }

  const load = async () => setUsers(await fetchUsers());
  useEffect(() => { load(); }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">👥 Users</h2>

      <div className="mt-4 space-y-3">
        {users.map((u) => (
          <div key={u.id} className="p-4 bg-white rounded shadow">
            <h3 className="font-bold">{u.username}</h3>
            <p>Role: {u.role}</p>

            <Link
              to={`/users/${u.id}`}
              className="text-blue-600 underline"
            >
              Xem chi tiết →
            </Link>

            <button
              onClick={() => deleteUser(u.id).then(load)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
            >
              🗑 Xoá
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

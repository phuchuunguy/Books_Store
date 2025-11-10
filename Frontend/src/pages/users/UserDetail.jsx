import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUser } from "../../api";

export default function UserDetail() {
  const { id } = useParams();
  const [u, setU] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getUser(id);
      setU(data);
    })();
  }, [id]);

  if (!u) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <Link to="/users" className="underline text-blue-600">
        ← Back
      </Link>

      <h1 className="text-2xl font-semibold mt-4">{u.username}</h1>
      <p className="text-gray-700 mt-2">Role: {u.role}</p>
    </div>
  );
}

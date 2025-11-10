import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCategory } from "../../api";

export default function CategoryDetail() {
  const { id } = useParams();
  const [cat, setCat] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getCategory(id);
      setCat(data);
    })();
  }, [id]);

  if (!cat) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <Link to="/categories" className="text-blue-600 underline">
        ← Back
      </Link>

      <h1 className="text-2xl font-semibold mt-4">{cat.name}</h1>
      <p className="text-gray-700 mt-2">{cat.description}</p>
    </div>
  );
}

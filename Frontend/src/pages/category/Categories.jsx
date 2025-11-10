import { useEffect, useState } from "react";
import { fetchCategories, deleteCategory } from "../../api";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const load = async () => setCategories(await fetchCategories());

  useEffect(() => { load(); }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">📂 Categories</h2>

      <Link
        to="/categories/create"
        className="bg-blue-600 text-white px-4 py-2 rounded mt-3 inline-block"
      >
        ➕ Add Category
      </Link>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((c) => (
          <div key={c.id} className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-bold">{c.name}</h3>

            <Link
              to={`/categories/${c.id}`}
              className="text-blue-600 underline"
            >
              Xem chi tiết →
            </Link>

            <button
              onClick={() => deleteCategory(c.id).then(load)}
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

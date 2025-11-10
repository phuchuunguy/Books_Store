import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories, deleteCategory } from "../../api";

export default function CategoriesList() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ totalPages: 1 });

  const loadData = async () => {
    const res = await getCategories(page, 5); // nếu backend chưa phân trang thì vẫn map được
    setCategories(res.data || res);
    setMeta(res.meta || { totalPages: 1 });
  };

  useEffect(() => {
    loadData();
  }, [page]);

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa không?")) return;
    await deleteCategory(id);
    loadData();
  };

  return (
    <div className="p-6">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
      >
        ⬅ Back
      </button>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Categories</h1>

        <Link
          to="/categories/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Category
        </Link>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-3">
        {categories.map((c) => (
          <div
            key={c.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{c.name}</h2>
              <p className="text-gray-600">{c.description}</p>
            </div>

            <div className="flex gap-2">
              <Link
                to={`/categories/${c.id}`}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                View
              </Link>
              <Link
                to={`/categories/${c.id}/edit`}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(c.id)}
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

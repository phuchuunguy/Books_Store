import { useEffect, useState } from "react";
import { getBooks, getCategories } from "../../api";
import { Link, useNavigate } from "react-router-dom";

export default function BooksList() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("all");

  // ✅ Load categories
  useEffect(() => {
    (async () => {
      const list = await getCategories();
      setCategories(list);
    })();
  }, []);

  // ✅ Hàm load toàn bộ sách khi search
  async function loadAllBooks() {
    const res = await getBooks(1, 9999, categoryId);
    return res.data;
  }

  // ✅ Load books (phân trang or search)
  useEffect(() => {
    (async () => {
      // ✅ Nếu SEARCH > 0 → lấy ALL BOOKS
      if (search.length > 0) {
        const allBooks = await loadAllBooks();
        setBooks(allBooks);
        setMeta({ totalPages: 1 });
        return;
      }

      // ✅ Không search → phân trang bình thường
      const res = await getBooks(page, 5, categoryId);
      setBooks(res.data);
      setMeta(res.meta);
    })();
  }, [page, search, categoryId]);

  // ✅ Filter books
  const filteredBooks = books.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      categoryId === "all" ? true : b.category?.id === Number(categoryId);

    return matchSearch && matchCategory;
  });

  return (
    <div className="p-6">

      {/* ✅ Nút Back */}
      <button
        onClick={() => navigate(-1)}
        className="
          mb-4 px-4 py-2 rounded-full 
          bg-gray-200 hover:bg-gray-300 active:bg-gray-400 
          transition shadow-sm
        "
      >
        ⬅ Back
      </button>

      <h1 className="text-2xl font-semibold mb-4">Books</h1>

      {/* ✅ Search + Category Row */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search title or author..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full p-2 border rounded shadow-sm"
        />

        {/* Category Filter */}
        <select
          className="p-2 border rounded shadow-sm"
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setPage(1);
          }}
        >
          <option value="all">All Categories</option>

          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Books List */}
      <div className="flex flex-col gap-4">
        {filteredBooks.map((b) => (
          <Link
            key={b.id}
            to={`/books/${b.id}`}
            className="
              p-4 bg-white rounded shadow-sm 
              hover:shadow-md transition
            "
          >
            <h2 className="font-bold">{b.title}</h2>
            <p className="text-gray-600">{b.author}</p>

            <p className="text-sm mt-1 bg-blue-100 px-2 py-1 rounded inline-block">
              {b.category?.name}
            </p>
          </Link>
        ))}

        {filteredBooks.length === 0 && (
          <p className="text-gray-500 italic">No books found...</p>
        )}
      </div>

      {/* ✅ Pagination */}
      {search.length === 0 && (
        <div className="mt-6 flex items-center justify-center gap-3">

          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="
              px-4 py-2 rounded-full border bg-white shadow-sm 
              hover:bg-gray-100 active:bg-gray-200 
              disabled:opacity-40 disabled:cursor-not-allowed
            "
          >
            ← Prev
          </button>

          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white shadow font-semibold">
            {page}
          </div>

          <button
            disabled={page >= meta.totalPages}
            onClick={() => setPage(page + 1)}
            className="
              px-4 py-2 rounded-full border bg-white shadow-sm 
              hover:bg-gray-100 active:bg-gray-200 
              disabled:opacity-40 disabled:cursor-not-allowed
            "
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { fetchBooks, deleteBook } from "../../api";
import { Link } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState([]);

  const load = async () => {
    const res = await fetchBooks();
    setBooks(res.books);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">📚 Books</h2>
        <Link
          to="/books/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Book
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books.map((b) => (
          <div key={b.id} className="bg-white p-4 rounded shadow border border-gray-200">
            <h3 className="font-bold text-lg">{b.title}</h3>
            <p className="text-gray-700">✍️ {b.author}</p>

            <Link
              to={`/books/${b.id}`}
              className="text-blue-600 underline block mt-2"
            >
              Xem chi tiết →
            </Link>

            <button
              onClick={() => deleteBook(b.id).then(load)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              🗑 Xoá
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

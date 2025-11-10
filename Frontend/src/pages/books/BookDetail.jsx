import { useEffect, useState } from "react";
import { getBook } from "../../api";
import { useParams } from "react-router-dom";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    getBook(id).then(setBook);
  }, [id]);

  if (!book) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-3xl font-bold">{book.title}</h2>

      <p className="text-gray-700 mt-2">✍️ {book.author}</p>
      <p className="mt-4 text-gray-600">{book.description}</p>

      <p className="mt-4 text-sm text-blue-700 font-semibold">
        📂 Category: {book.category?.name}
      </p>
    </div>
  );
}

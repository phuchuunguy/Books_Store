import { useState } from "react";
import { createCategory } from "../../api";
import { useNavigate } from "react-router-dom";

export default function CategoryCreate() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCategory({ name, description: desc });
    nav("/categories");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-4">Add Category</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <input
          className="w-full px-3 py-2 border rounded"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="w-full px-3 py-2 border rounded"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}

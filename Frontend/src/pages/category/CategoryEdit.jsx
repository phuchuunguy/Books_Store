import { useEffect, useState } from "react";
import { getCategory, updateCategory } from "../../api";
import { useNavigate, useParams } from "react-router-dom";

export default function CategoryEdit() {
  const { id } = useParams();
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    (async () => {
      const c = await getCategory(id);
      setName(c.name);
      setDesc(c.description);
    })();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCategory(id, { name, description: desc });
    nav("/categories");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-4">Edit Category</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <input
          className="w-full px-3 py-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="w-full px-3 py-2 border rounded"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button className="bg-yellow-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}

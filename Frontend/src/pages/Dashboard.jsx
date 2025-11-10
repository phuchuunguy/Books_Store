import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header */}
      <h1 className="text-3xl font-bold">Welcome, {user.username} 👋</h1>
      <p className="text-gray-600 mt-1">Here is your dashboard.</p>

      {/* Grid Menu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

        {/* Books */}
        <Link
          to="/books"
          className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center transition"
        >
          <span className="text-4xl mb-2">📚</span>
          <span className="text-xl font-semibold">Books</span>
        </Link>

        {/* Categories */}
        <Link
          to="/categories"
          className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center transition"
        >
          <span className="text-4xl mb-2">🗂</span>
          <span className="text-xl font-semibold">Categories</span>
        </Link>

        {/* Users (only admin) */}
        {user.role === "admin" && (
          <Link
            to="/users"
            className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center transition"
          >
            <span className="text-4xl mb-2">👤</span>
            <span className="text-xl font-semibold">Users</span>
          </Link>
        )}
      </div>
    </div>
  );
}

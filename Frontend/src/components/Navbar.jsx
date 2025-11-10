import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 text-white flex items-center gap-6">
      <Link to="/home" className="font-bold text-lg">Bookstore</Link>

      {user && user.role === "admin" && (
        <Link to="/dashboard">Dashboard</Link>
      )}

      {user && (
        <>
          <Link to="/books">Books</Link>
          {user.role === "admin" && <Link to="/categories">Categories</Link>}
          {user.role === "admin" && <Link to="/users">Users</Link>}
        </>
      )}

      <div className="ml-auto">
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

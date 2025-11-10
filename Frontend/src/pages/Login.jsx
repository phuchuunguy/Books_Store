import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const user = await login(username, password);

      if (user.role === "admin") navigate("/dashboard");
      else navigate("/home");
    } catch {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f0f2f5]">
      <div className="flex flex-col items-center w-[360px]">
        <h1 className="text-5xl font-bold text-blue-600 mb-6">Book Store</h1>

        <div className="bg-white p-5 shadow rounded w-full">
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              className="border p-2 rounded"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              className="border p-2 rounded"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="bg-blue-600 text-white p-2 rounded font-semibold">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

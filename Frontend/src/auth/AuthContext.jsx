import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("username");
    const r = localStorage.getItem("role");
    if (t && u) setUser({ username: u, role: r });
  }, []);

  const login = async (username, password) => {
    const data = await loginApi(username, password);

    localStorage.setItem("token", data.access_token);

    const payload = JSON.parse(atob(data.access_token.split(".")[1]));

    const loggedUser = { username: payload.username, role: payload.role };

    localStorage.setItem("username", loggedUser.username);
    localStorage.setItem("role", loggedUser.role);

    setUser(loggedUser);

    // ✅ Điều hướng đúng theo role
    if (loggedUser.role === "admin") navigate("/dashboard");
    else navigate("/home");

    return loggedUser; // ✅ RẤT QUAN TRỌNG
  };

  const register = async (username, password) => {
    await registerApi(username, password);
    return await login(username, password);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const API_URL = import.meta.env.VITE_API_URL;

/* Core API */
export async function api(endpoint, method = "GET", body = null, auth = false) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Missing token");
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) throw new Error(data.message || "API Error");

  return data;
}

/* BOOK API */
export const getBooks = (p = 1, l = 5, categoryId = "") => {
  let url = `/books?page=${p}&limit=${l}`;
  if (categoryId !== "" && categoryId !== "all") {
    url += `&categoryId=${categoryId}`;
  }
  return api(url, "GET", null, true);
};
  
export const getBook = (id) =>
  api(`/books/${id}`, "GET", null, true);
export const createBook = (data) =>
  api(`/books`, "POST", data, true);
export const updateBook = (id, data) =>
  api(`/books/${id}`, "PUT", data, true);
export const deleteBook = (id) =>
  api(`/books/${id}`, "DELETE", null, true);

/* CATEGORY */
export const getCategories = () => api(`/categories`, "GET", null, true);
export const getCategory = (id) => api(`/categories/${id}`, "GET", null, true);
export const createCategory = (data) => api(`/categories`, "POST", data, true);
export const updateCategory = (id, data) =>
  api(`/categories/${id}`, "PUT", data, true);
export const deleteCategory = (id) =>
  api(`/categories/${id}`, "DELETE", null, true);

/* USERS */
export const getUsers = () => api(`/users`, "GET", null, true);
export const getUser = (id) => api(`/users/${id}`, "GET", null, true);
export const deleteUser = (id) =>
  api(`/users/${id}`, "DELETE", null, true);

/* AUTH */
export const loginApi = (u, p) => api(`/auth/login`, "POST", { username: u, password: p });
export const registerApi = (u, p) => api(`/auth/register`, "POST", { username: u, password: p });

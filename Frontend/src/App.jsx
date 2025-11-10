import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import { useAuth } from "./auth/AuthContext.jsx";

// Auth pages
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// Role pages
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// Books
import BooksList from "./pages/books/BooksList.jsx";
import BookDetail from "./pages/books/BookDetail.jsx";

// Categories
import CategoriesList from "./pages/category/CategoriesList.jsx";
import CategoryDetail from "./pages/category/CategoryDetail.jsx";
import CategoryCreate from "./pages/category/CategoryCreate.jsx";
import CategoryEdit from "./pages/category/CategoryEdit.jsx";

// Users
import UsersList from "./pages/users/UsersList.jsx";
import UserDetail from "./pages/users/UserDetail.jsx";

// Protected
import ProtectedRoute from "./auth/ProtectedRoute.jsx";

export default function App() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <Routes>
        {/* Default page → Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER will go to Home — ADMIN can also access Home */}
        <Route
          path="/home"
          element={
            <ProtectedRoute roles={["user", "admin"]}>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ONLY → Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* BOOKS for all logged-in users */}
        <Route
          path="/books"
          element={
            <ProtectedRoute roles={["admin", "user"]}>
              <BooksList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/books/:id"
          element={
            <ProtectedRoute roles={["admin", "user"]}>
              <BookDetail />
            </ProtectedRoute>
          }
        />

        {/* CATEGORIES → ADMIN ONLY */}
        <Route
          path="/categories"
          element={
            <ProtectedRoute roles={["admin"]}>
              <CategoriesList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories/create"
          element={
            <ProtectedRoute roles={["admin"]}>
              <CategoryCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories/:id"
          element={
            <ProtectedRoute roles={["admin"]}>
              <CategoryDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories/:id/edit"
          element={
            <ProtectedRoute roles={["admin"]}>
              <CategoryEdit />
            </ProtectedRoute>
          }
        />

        {/* USERS → ADMIN ONLY */}
        <Route
          path="/users"
          element={
            <ProtectedRoute roles={["admin"]}>
              <UsersList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/:id"
          element={
            <ProtectedRoute roles={["admin"]}>
              <UserDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, roleRequired }) {
  const { user } = useAuth();

  // Si el usuario no está autenticado, redirige al login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si el rol del usuario no coincide con el requerido, redirige a una página no autorizada
  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/unauthorized" />;
  }

  // Si el usuario está autenticado y cumple el rol, muestra el contenido protegido
  return children;
}

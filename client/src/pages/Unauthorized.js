import React from "react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Acceso no autorizado</h2>
      <p>No tienes permiso para acceder a esta página.</p>
      <button onClick={() => navigate("/")}>Volver al inicio</button>
    </div>
  );
}

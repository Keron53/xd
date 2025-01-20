import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MacBookFormCard from "../cards/MacbookFormCard";
import { Grid } from "@mui/material";

export default function MacbookForm() {
  const [macbook, setMacBook] = useState({
    serial_num: "",
    id_modelo: "",
    num_modelo: "",
    capacidad: "",
    color: "",
    tipo: "",
    caracteristicas: "",
    vendido: false,
    fecha_llegada: new Date().toISOString().split("T")[0],
    fecha_salida: null,
  });

  const [modelos, setModelos] = useState([]);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  // Función para obtener el token del localStorage
  const getToken = () => localStorage.getItem("token");

  const loadModelos = async () => {
    const response = await fetch("http://localhost:4000/modelo/get", {
      headers: {
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      }
    });
    if (response.ok) {
      const data = await response.json();
      setModelos(data);
    } else {
      console.error("Error al cargar modelos:", response.statusText);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await fetch(`http://localhost:4000/macbook/put/${params.id_macbook}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
        },
        body: JSON.stringify(macbook),
      });
    } else {
      await fetch("http://localhost:4000/macbook/post", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
        },
        body: JSON.stringify(macbook),
      });
    }
    navigate("/macbook");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMacBook({
      ...macbook,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const loadMacBook = async (id) => {
    const res = await fetch("http://localhost:4000/macbook/get/" + id, {
      headers: {
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      }
    });
    if (res.ok) {
      const data = await res.json();
      setMacBook({
        ...data,
        fecha_llegada: data.fecha_llegada
          ? new Date(data.fecha_llegada).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        fecha_salida: data.fecha_salida
          ? new Date(data.fecha_salida).toISOString().split("T")[0]
          : null,
      });
      setEditing(true);
    } else {
      console.error("Error al cargar MacBook:", res.statusText);
    }
  };

  useEffect(() => {
    loadModelos();
    if (params.id_macbook) {
      loadMacBook(params.id_macbook);
    }
  }, [params.id_macbook]);

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={3}>
        <MacBookFormCard
          macbook={macbook}
          modelos={modelos}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editing={editing}
        />
      </Grid>
    </Grid>
  );
}

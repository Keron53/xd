import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppleWatchFormCard from "../cards/ApplewatchFormCard";
import { Grid } from "@mui/material";

export default function ApplewatchForm() {
  const [appleWatch, setAppleWatch] = useState({
    serial_num: "",
    id_modelo: "",
    num_modelo: "",
    color: "",
    tipo: "",
    lte_gps: "",
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
      await fetch(`http://localhost:4000/applewatch/put/${params.id_applewatch}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
        },
        body: JSON.stringify(appleWatch),
      });
    } else {
      await fetch("http://localhost:4000/applewatch/post", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
        },
        body: JSON.stringify(appleWatch),
      });
    }
    navigate("/applewatch");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAppleWatch({
      ...appleWatch,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const loadAppleWatch = async (id) => {
    const res = await fetch(`http://localhost:4000/applewatch/get/${id}`, {
      headers: {
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      }
    });
    if (res.ok) {
      const data = await res.json();
      setAppleWatch({
        serial_num: data.serial_num,
        id_modelo: data.id_modelo,
        num_modelo: data.num_modelo,
        color: data.color,
        tipo: data.tipo,
        lte_gps: data.lte_gps,
        vendido: data.vendido,
        fecha_llegada: data.fecha_llegada
          ? new Date(data.fecha_llegada).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        fecha_salida: data.fecha_salida
          ? new Date(data.fecha_salida).toISOString().split("T")[0]
          : null,
      });
      setEditing(true);
    } else {
      console.error("Error al cargar Apple Watch:", res.statusText);
    }
  };

  useEffect(() => {
    loadModelos();
    if (params.id_applewatch) {
      loadAppleWatch(params.id_applewatch);
    }
  }, [params.id_applewatch]);

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={3}>
        <AppleWatchFormCard
          appleWatch={appleWatch}
          modelos={modelos}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editing={editing}
        />
      </Grid>
    </Grid>
  );
}

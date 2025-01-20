import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IPhoneUsedFormCard from "../cards/IPhoneUsedFormCard";
import { Grid } from "@mui/material";

export default function IPhoneUsedForm() {
  const [iphoneUsed, setIphoneUsed] = useState({
    imei: "",
    id_modelo: "",
    capacidad: "",
    color: "",
    bateria: "",
    estado_fisico: "",
    vendido: false,
    detalles: "",
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
      await fetch(`http://localhost:4000/iphoneused/put/${params.id_iphone_usado}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
        },
        body: JSON.stringify(iphoneUsed),
      });
    } else {
      await fetch("http://localhost:4000/iphoneused/post", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
        },
        body: JSON.stringify(iphoneUsed),
      });
    }
    navigate("/iphoneused");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setIphoneUsed({
      ...iphoneUsed,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const loadIphoneUsed = async (id) => {
    const res = await fetch(`http://localhost:4000/iphoneused/get/${id}`, {
      headers: {
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      }
    });
    if (res.ok) {
      const data = await res.json();
      setIphoneUsed({
        imei: data.imei,
        id_modelo: data.id_modelo,
        capacidad: data.capacidad,
        color: data.color,
        bateria: data.bateria,
        estado_fisico: data.estado_fisico,
        vendido: data.vendido,
        detalles: data.detalles,
        fecha_llegada: data.fecha_llegada ? new Date(data.fecha_llegada).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        fecha_salida: data.fecha_salida ? new Date(data.fecha_salida).toISOString().split("T")[0] : null,
      });
      setEditing(true);
    } else {
      console.error("Error al cargar iPhone usado:", res.statusText);
    }
  };

  useEffect(() => {
    loadModelos();
    if (params.id_iphone_usado) {
      loadIphoneUsed(params.id_iphone_usado);
    }
  }, [params.id_iphone_usado]);

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={3}>
        <IPhoneUsedFormCard 
          iphoneUsed={iphoneUsed} 
          modelos={modelos} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit} 
          editing={editing}
        />
      </Grid>
    </Grid>
  );
}

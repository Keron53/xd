import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IPadFormCard from "../cards/IPadFormCard";
import { Grid } from "@mui/material";

export default function IPadForm() {
  const [ipad, setIPad] = useState({
    imei: "",
    id_modelo: "",
    num_modelo: "",
    capacidad: "",
    color: "",
    tipo: "OB",
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
      await fetch(`http://localhost:4000/ipad/put/${params.id_ipad}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
        },
        body: JSON.stringify(ipad),
      });
    } else {
      await fetch("http://localhost:4000/ipad/post", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
        },
        body: JSON.stringify(ipad),
      });
    }
    navigate("/ipad");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setIPad({
      ...ipad,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const loadIPad = async (id) => {
    const res = await fetch(`http://localhost:4000/ipad/get/${id}`, {
      headers: {
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      }
    });
    if (res.ok) {
      const data = await res.json();
      setIPad({
        imei: data.imei,
        id_modelo: data.id_modelo,
        num_modelo: data.num_modelo,
        capacidad: data.capacidad,
        color: data.color,
        tipo: data.tipo,
        vendido: data.vendido,
        fecha_llegada: data.fecha_llegada ? new Date(data.fecha_llegada).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        fecha_salida: data.fecha_salida ? new Date(data.fecha_salida).toISOString().split("T")[0] : null,
      });
      setEditing(true);
    } else {
      console.error("Error al cargar iPad:", res.statusText);
    }
  };

  useEffect(() => {
    loadModelos();
    if (params.id_ipad) {
      loadIPad(params.id_ipad);
    }
  }, [params.id_ipad]);

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={3}>
        <IPadFormCard 
          ipad={ipad} 
          modelos={modelos} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit} 
          editing={editing}
        />
      </Grid>
    </Grid>
  );
}

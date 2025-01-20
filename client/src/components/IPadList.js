import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IPadListCard from "../cards/IPadListCard";

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

const images = importAll(require.context("../images", false, /\.(png|jpe?g|svg)$/));

export default function IPadList() {
  const [ipads, setIpads] = useState([]);
  const [modelos, setModelos] = useState([]);
  const navigate = useNavigate();

  // Función para obtener el token del localStorage
  const getToken = () => localStorage.getItem("token");

  const loadIpads = async (filter) => {
    const response = await fetch(`http://localhost:4000/ipad/${filter}`, {
      headers: {
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      }
    });
    if (response.ok) {
      const data = await response.json();
      setIpads(data);
    } else {
      console.error("Error al cargar iPads:", response.statusText);
    }
  };

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

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/ipad/delete/${id}`, { 
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      }
    });
    setIpads(ipads.filter((ipad) => ipad.id_ipad !== id));
  };

  const handleToggleVendido = async (id) => {
    const ipadToToggle = ipads.find((ipad) => ipad.id_ipad === id);
    const nuevaFechaSalida = !ipadToToggle.vendido ? new Date().toISOString() : null;
    const updatedIpad = { 
      ...ipadToToggle, 
      vendido: !ipadToToggle.vendido, 
      fecha_salida: nuevaFechaSalida 
    };

    await fetch(`http://localhost:4000/ipad/put/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      },
      body: JSON.stringify(updatedIpad),
    });

    setIpads(ipads.map((ipad) => (ipad.id_ipad === id ? updatedIpad : ipad)));
  };

  useEffect(() => {
    loadIpads("notsold");
    loadModelos();
  }, []);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <h1>Lista de iPads</h1>
        <Box display="flex" gap={1}>
          <Button variant="contained" color="success" onClick={() => navigate("/ipad/new")}>
            Agregar iPad
          </Button>
          <Button variant="contained" onClick={() => loadIpads("sold")}>
            Vendidos
          </Button>
          <Button variant="contained" onClick={() => loadIpads("notsold")}>
            No vendidos
          </Button>
          <Button variant="contained" onClick={() => loadIpads("get")}>
            Todos los equipos
          </Button>
        </Box>
      </Box>
      {ipads.map((ipad) => {
        const modeloEncontrado = modelos.find(
          (modelo) => modelo.id_modelo === ipad.id_modelo
        );

        const nombreModelo = modeloEncontrado
          ? modeloEncontrado.nombre_modelo
          : "Desconocido";

        const imageName = `${nombreModelo.replace(/\s+/g, "_").toUpperCase()}${ipad.color.toLowerCase()}.png`;
        const imageSrc = images[imageName];

        return (
          <IPadListCard
            key={ipad.id_ipad}
            ipad={ipad}
            modelos={modelos}
            imageSrc={imageSrc}
            onEdit={() => navigate(`/ipad/${ipad.id_ipad}/edit`)}
            onDelete={() => handleDelete(ipad.id_ipad)}
            onToggleVendido={() => handleToggleVendido(ipad.id_ipad)}
          />
        );
      })}
    </>
  );
}

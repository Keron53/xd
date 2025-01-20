import { useEffect, useState } from "react"; 
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppleWatchListCard from "../cards/ApplewatchListCard";

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
  return images;
};

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

export default function ApplewatchList() {
  const [appleWatches, setAppleWatches] = useState([]);
  const [modelos, setModelos] = useState([]);
  const navigate = useNavigate();

  // Función para obtener el token del localStorage
  const getToken = () => localStorage.getItem("token");

  const loadAppleWatches = async (filter) => {
    const response = await fetch(`http://localhost:4000/applewatch/${filter}`, {
      headers: {
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      }
    });
    if (response.ok) {
      const data = await response.json();
      setAppleWatches(data);
    } else {
      console.error("Error al cargar Apple Watches:", response.statusText);
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
    await fetch(`http://localhost:4000/applewatch/delete/${id}`, { 
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      }
    });
    setAppleWatches(appleWatches.filter((appleWatch) => appleWatch.id_applewatch !== id));
  };

  const handleToggleVendido = async (id) => {
    const appleWatchToToggle = appleWatches.find((appleWatch) => appleWatch.id_applewatch === id);
    const nuevaFechaSalida = !appleWatchToToggle.vendido ? new Date().toISOString() : null;
    const updatedAppleWatch = { 
      ...appleWatchToToggle, 
      vendido: !appleWatchToToggle.vendido, 
      fecha_salida: nuevaFechaSalida 
    };

    await fetch(`http://localhost:4000/applewatch/put/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      },
      body: JSON.stringify(updatedAppleWatch),
    });

    setAppleWatches(appleWatches.map((appleWatch) =>
      appleWatch.id_applewatch === id ? updatedAppleWatch : appleWatch
    ));
  };

  useEffect(() => {
    loadAppleWatches('notsold');
    loadModelos();
  }, []);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <h1>Lista de Apple Watches</h1>
        <Box display="flex" gap={1}>
          <Button variant="contained" color="success" onClick={() => navigate('/applewatch/new')}>
            Agregar Apple Watch
          </Button>
          <Button variant="contained" onClick={() => loadAppleWatches('sold')}>
            Vendidos
          </Button>
          <Button variant="contained" onClick={() => loadAppleWatches('notsold')}>
            No vendidos
          </Button>
          <Button variant="contained" onClick={() => loadAppleWatches('get')}>
            Todos los equipos
          </Button>
        </Box>
      </Box>
      {appleWatches.map((appleWatch) => {
        const modeloEncontrado = modelos.find(
          (modelo) => modelo.id_modelo === appleWatch.id_modelo
        );

        const nombreModelo = modeloEncontrado
          ? modeloEncontrado.nombre_modelo
          : "Desconocido";

        const imageName = `${nombreModelo.replace(/\s+/g, '_').toUpperCase()}${appleWatch.color.toLowerCase()}.png`;
        const imageSrc = images[imageName];

        return (
          <AppleWatchListCard 
            key={appleWatch.id_applewatch} 
            appleWatch={appleWatch} 
            modelos={modelos}
            imageSrc={imageSrc}
            onEdit={() => navigate(`/applewatch/${appleWatch.id_applewatch}/edit`)} 
            onDelete={() => handleDelete(appleWatch.id_applewatch)} 
            onToggleVendido={() => handleToggleVendido(appleWatch.id_applewatch)} 
          />
        );
      })}
    </>
  );
}

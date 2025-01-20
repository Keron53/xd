import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IPhoneListCard from "../cards/IPhoneListCard";

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
  return images;
};

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

export default function IPhoneList() {
  const [iphones, setIphones] = useState([]);
  const [modelos, setModelos] = useState([]);
  const navigate = useNavigate();

  // Función para obtener el token del localStorage
  const getToken = () => localStorage.getItem("token");

  const loadIphones = async (filter) => {
    const response = await fetch(`http://localhost:4000/iphone/${filter}`, {
      headers: {
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      }
    });
    if (response.ok) {
      const data = await response.json();
      setIphones(data);
    } else {
      console.error("Error al cargar iPhones:", response.statusText);
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
    await fetch(`http://localhost:4000/iphone/delete/${id}`, { 
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      }
    });
    setIphones(iphones.filter((iphone) => iphone.id_iphone !== id));
  };

  const handleToggleVendido = async (id) => {
    const iphoneToToggle = iphones.find((iphone) => iphone.id_iphone === id);
    const nuevaFechaSalida = !iphoneToToggle.vendido ? new Date().toISOString() : null;
    const updatedIphone = { 
      ...iphoneToToggle, 
      vendido: !iphoneToToggle.vendido, 
      fecha_salida: nuevaFechaSalida 
    };
  
    await fetch(`http://localhost:4000/iphone/put/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      },
      body: JSON.stringify(updatedIphone),
    });
  
    setIphones(iphones.map((iphone) => (iphone.id_iphone === id ? updatedIphone : iphone)));
  };

  useEffect(() => {
    loadIphones('notsold');
    loadModelos();
  }, []);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <h1>Lista de iPhones</h1>
        <Box display="flex" gap={1}>
          <Button variant="contained" color="success" onClick={() => navigate('/iphone/new')}>
            Agregar iPhone
          </Button>
          <Button variant="contained" color="warning" onClick={() => navigate('/iphoneused')}>
            Ver IPhone Usados
          </Button>
          <Button variant="contained" onClick={() => loadIphones('sold')}>
            Vendidos
          </Button>
          <Button variant="contained" onClick={() => loadIphones('notsold')}>
            No vendidos
          </Button>
          <Button variant="contained" onClick={() => loadIphones('get')}>
            Todos los equipos
          </Button>
        </Box>
      </Box>
      {iphones.map((iphone) => {
        const modeloEncontrado = modelos.find(
          (modelo) => modelo.id_modelo === iphone.id_modelo
        );
      
        const nombreModelo = modeloEncontrado
          ? modeloEncontrado.nombre_modelo
          : "Desconocido";
      
        const imageName = `${nombreModelo.replace(/\s+/g, '_').toUpperCase()}${iphone.color.toLowerCase()}.png`;
        const imageSrc = images[imageName]; 

        return (
          <IPhoneListCard 
            key={iphone.id_iphone} 
            iphone={iphone} 
            modelos={modelos}
            imageSrc={imageSrc}
            onEdit={() => navigate(`/iphone/${iphone.id_iphone}/edit`)} 
            onDelete={() => handleDelete(iphone.id_iphone)} 
            onToggleVendido={() => handleToggleVendido(iphone.id_iphone)} 
          />
        );
      })}
    </>
  );
}

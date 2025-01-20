import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IPhoneUsedListCard from "../cards/IPhoneUsedListCard";

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
  return images;
};

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

export default function IPhoneUsedList() {
  const [iphonesUsados, setIphonesUsados] = useState([]);
  const [modelos, setModelos] = useState([]);
  const navigate = useNavigate();

  // Función para obtener el token del localStorage
  const getToken = () => localStorage.getItem("token");

  const loadIphonesUsados = async (filter) => {
    const response = await fetch(`http://localhost:4000/iphoneused/${filter}`, {
      headers: {
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      }
    });
    if (response.ok) {
      const data = await response.json();
      setIphonesUsados(data);
    } else {
      console.error("Error al cargar iPhones usados:", response.statusText);
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
    await fetch(`http://localhost:4000/iphoneused/delete/${id}`, { 
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      }
    });
    setIphonesUsados(iphonesUsados.filter((iphone) => iphone.id_iphone_usado !== id));
  };

  const handleToggleVendido = async (id) => {
    const iphoneToToggle = iphonesUsados.find((iphone) => iphone.id_iphone_usado === id);
    const nuevaFechaSalida = !iphoneToToggle.vendido ? new Date().toISOString() : null;
    const updatedIphone = { 
      ...iphoneToToggle, 
      vendido: !iphoneToToggle.vendido, 
      fecha_salida: nuevaFechaSalida 
    };
  
    await fetch(`http://localhost:4000/iphoneused/put/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      },
      body: JSON.stringify(updatedIphone),
    });
  
    setIphonesUsados(iphonesUsados.map((iphone) => (iphone.id_iphone_usado === id ? updatedIphone : iphone)));
  };

  useEffect(() => {
    loadIphonesUsados('notsold');
    loadModelos();
  }, []);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <h1>Lista de iPhones Usados</h1>
        <Box display="flex" gap={1}>
          <Button variant="contained" color="success" onClick={() => navigate('/iphoneused/new')}>
            Agregar iPhone
          </Button>
          <Button variant="contained" color="warning" onClick={() => navigate('/iphone')}>
            Regresar
          </Button>
          <Button variant="contained" onClick={() => loadIphonesUsados('sold')}>
            Vendidos
          </Button>
          <Button variant="contained" onClick={() => loadIphonesUsados('notsold')}>
            No vendidos
          </Button>
          <Button variant="contained" onClick={() => loadIphonesUsados('get')}>
            Todos los equipos
          </Button>
        </Box>
      </Box>
      {iphonesUsados.map((iphone) => {
        const modeloEncontrado = modelos.find(
          (modelo) => modelo.id_modelo === iphone.id_modelo
        );
      
        const nombreModelo = modeloEncontrado
          ? modeloEncontrado.nombre_modelo
          : "Desconocido";
      
        const imageName = `${nombreModelo.replace(/\s+/g, '_').toUpperCase()}${iphone.color.toLowerCase()}.png`;
        const imageSrc = images[imageName]; 

        return (
          <IPhoneUsedListCard 
            key={iphone.id_iphone_usado} 
            iphone={iphone} 
            modelos={modelos}
            imageSrc={imageSrc}
            onEdit={() => navigate(`/iphoneused/${iphone.id_iphone_usado}/edit`)} 
            onDelete={() => handleDelete(iphone.id_iphone_usado)} 
            onToggleVendido={() => handleToggleVendido(iphone.id_iphone_usado)} 
          />
        );
      })}
    </>
  );
}

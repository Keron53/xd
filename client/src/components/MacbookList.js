import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MacBookListCard from "../cards/MacbookListCard";

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

export default function MacbookList() {
  const [macbooks, setMacBooks] = useState([]);
  const [modelos, setModelos] = useState([]);
  const navigate = useNavigate();

  // Función para obtener el token del localStorage
  const getToken = () => localStorage.getItem("token");

  const loadMacBooks = async (filter) => {
    const response = await fetch(`http://localhost:4000/macbook/${filter}`, {
      headers: {
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      }
    });
    if (response.ok) {
      const data = await response.json();
      setMacBooks(data);
    } else {
      console.error("Error al cargar MacBooks:", response.statusText);
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
    await fetch(`http://localhost:4000/macbook/delete/${id}`, { 
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      }
    });
    setMacBooks(macbooks.filter((macbook) => macbook.id_macbook !== id));
  };

  const handleToggleVendido = async (id) => {
    const macbookToToggle = macbooks.find((macbook) => macbook.id_macbook === id);
    const nuevaFechaSalida = !macbookToToggle.vendido ? new Date().toISOString() : null;
    const updatedMacBook = { 
      ...macbookToToggle, 
      vendido: !macbookToToggle.vendido, 
      fecha_salida: nuevaFechaSalida 
    };

    await fetch(`http://localhost:4000/macbook/put/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      },
      body: JSON.stringify(updatedMacBook),
    });

    setMacBooks(macbooks.map((macbook) => (macbook.id_macbook === id ? updatedMacBook : macbook)));
  };

  useEffect(() => {
    loadMacBooks('notsold');
    loadModelos();
  }, []);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <h1>Lista de MacBooks</h1>
        <Box display="flex" gap={1}>
          <Button variant="contained" color="success" onClick={() => navigate('/macbook/new')}>
            Agregar MacBook
          </Button>
          <Button variant="contained" onClick={() => loadMacBooks('sold')}>
            Vendidos
          </Button>
          <Button variant="contained" onClick={() => loadMacBooks('notsold')}>
            No vendidos
          </Button>
          <Button variant="contained" onClick={() => loadMacBooks('get')}>
            Todos los equipos
          </Button>
        </Box>
      </Box>
      {macbooks.map((macbook) => {
        const modeloEncontrado = modelos.find(
          (modelo) => modelo.id_modelo === macbook.id_modelo
        );

        const nombreModelo = modeloEncontrado
          ? modeloEncontrado.nombre_modelo
          : "Desconocido";

        const imageName = `${nombreModelo.replace(/\s+/g, '_').toUpperCase()}${macbook.color.toLowerCase()}.png`;
        const imageSrc = images[imageName];

        return (
          <MacBookListCard 
            key={macbook.id_macbook} 
            macbook={macbook} 
            modelos={modelos}
            imageSrc={imageSrc}
            onEdit={() => navigate(`/macbook/${macbook.id_macbook}/edit`)} 
            onDelete={() => handleDelete(macbook.id_macbook)} 
            onToggleVendido={() => handleToggleVendido(macbook.id_macbook)} 
          />
        );
      })}
    </>
  );
}

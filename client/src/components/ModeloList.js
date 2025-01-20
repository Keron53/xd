import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import iphoneImage from '../images/defaults/iphone.png';
import applewatchImage from '../images/defaults/applewatch.png';
import ipadImage from '../images/defaults/ipad.png';
import macbookImage from '../images/defaults/macbook.png'

export default function ModeloList() {
  const [modelo, setModelo] = useState([]);
  const navigate = useNavigate();

  // Función para obtener el token del localStorage
  const getToken = () => localStorage.getItem("token");

  const loadModelo = async () => {
    const response = await fetch("http://localhost:4000/modelo/get", {
      headers: {
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      }
    });
    if (response.ok) {
      const data = await response.json();
      setModelo(data);
    } else {
      console.error("Error al cargar modelos:", response.statusText);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/modelo/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getToken()}` // Agregar el token aquí
      }
    });

    setModelo(modelo.filter((modelos) => modelos.id_modelo !== id));
  };

  useEffect(() => {
    loadModelo();
  }, []);

  const getIconPath = (nombre_modelo) => {
    if (nombre_modelo.startsWith("IPHONE")) {
      return iphoneImage;
    } else if (nombre_modelo.startsWith("APPLEWATCH")) {
      return applewatchImage;
    } else if (nombre_modelo.startsWith("IPAD")) {
      return ipadImage;
    } else if (nombre_modelo.startsWith("MACBOOK")) {
      return macbookImage;
    }
    return null;
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <h1>Lista de Modelos</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/modelo/new')}
        >
          Agregar Modelo
        </Button>
      </Box>
      {modelo.map((modelos) => (
        <Card key={modelos.id_modelo} style={{ marginBottom: ".7rem" }}>
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {getIconPath(modelos.nombre_modelo) && (
                <img 
                  src={getIconPath(modelos.nombre_modelo)} 
                  alt={modelos.nombre_modelo} 
                  style={{ width: '24px', height: '24px', marginRight: '8px' }} 
                />
              )}
              <Typography>{modelos.nombre_modelo}</Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/modelo/${modelos.id_modelo}/edit`)}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(modelos.id_modelo)}
              >
                Eliminar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

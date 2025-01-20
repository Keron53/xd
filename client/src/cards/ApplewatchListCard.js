import { Card, CardContent, Typography, Button } from "@mui/material";

export default function ApplewatchListCard({
  appleWatch,
  modelos,
  imageSrc,
  onEdit,
  onDelete,
  onToggleVendido,
}) {
  const modeloEncontrado = modelos.find(
    (modelo) => modelo.id_modelo === appleWatch.id_modelo
  );

  const nombreModelo = modeloEncontrado
    ? modeloEncontrado.nombre_modelo
    : "Desconocido";

  return (
    <Card style={{ marginBottom: ".7rem" }}>
      <CardContent style={{ display: "flex", alignItems: "center" }}>
        {/* Mostrar imagen */}
        <img 
          src={imageSrc} 
          alt={`${nombreModelo} ${appleWatch.color}`} 
          style={{ width: '100px', height: 'auto', marginRight: '1rem' }} 
        />
        <div style={{ flexGrow: 1 }}>
          <Typography style={{ color: "blue" }}>Serial: {appleWatch.serial_num}</Typography>
          <Typography>
            <strong>Modelo:</strong> {nombreModelo}
          </Typography>
          <Typography>Color: {appleWatch.color}</Typography>
          <Typography>Tipo: {appleWatch.tipo}</Typography>
          <Typography>LTE/GPS: {appleWatch.lte_gps}</Typography>
          <Typography style={{ color: appleWatch.vendido ? "red" : "green" }}>
            <strong>Vendido:</strong> {appleWatch.vendido ? "Sí" : "No"}
          </Typography>
          <Typography>
            Fecha de llegada:{" "}
            {new Date(appleWatch.fecha_llegada).toLocaleDateString()}
          </Typography>
          <Typography>
            Fecha de salida:{" "}
            {appleWatch.fecha_salida
              ? new Date(appleWatch.fecha_salida).toLocaleDateString()
              : "N/A"}
          </Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Button variant="contained" color="primary" onClick={onEdit}>
            Editar
          </Button>
          <Button variant="contained" color="error" onClick={onDelete}>
            Eliminar
          </Button>
          <Button
            variant="contained"
            color={appleWatch.vendido ? "default" : "warning"}
            onClick={onToggleVendido}
          >
            {appleWatch.vendido ? "Marcar no vendido" : "Marcar vendido"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

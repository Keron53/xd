import { Card, CardContent, Typography, Button } from "@mui/material";

export default function IPhoneUsedListCard({
  iphone,
  modelos,
  imageSrc,
  onEdit,
  onDelete,
  onToggleVendido,
}) {
  const modeloEncontrado = modelos.find(
    (modelo) => modelo.id_modelo === iphone.id_modelo
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
          alt={`${nombreModelo} ${iphone.color}`} 
          style={{ width: '100px', height: 'auto', marginRight: '1rem' }} 
        />
        <div style={{ flexGrow: 1 }}>
          <Typography style={{ color: "blue" }}>IMEI: {iphone.imei}</Typography>
          <Typography>
            <strong>Modelo:</strong> {nombreModelo}
          </Typography>
          <Typography>Capacidad: {iphone.capacidad} GB</Typography>
          <Typography>Color: {iphone.color}</Typography>
          <Typography>Batería: {iphone.bateria} %</Typography>
          <Typography>Estado físico: {iphone.estado_fisico} / 10</Typography>
          <Typography>Detalles: {iphone.detalles}</Typography>
          <Typography style={{ color: iphone.vendido ? "red" : "green" }}>
            <strong>Vendido:</strong> {iphone.vendido ? "Sí" : "No"}
          </Typography>
          <Typography>
            Fecha de llegada:{" "}
            {new Date(iphone.fecha_llegada).toLocaleDateString()}
          </Typography>
          <Typography>
            Fecha de salida:{" "}
            {iphone.fecha_salida
              ? new Date(iphone.fecha_salida).toLocaleDateString()
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
            color={iphone.vendido ? "default" : "warning"}
            onClick={onToggleVendido}
          >
            {iphone.vendido ? "Marcar no vendido" : "Marcar vendido"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

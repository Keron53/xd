import { Card, CardContent, Typography, Button } from "@mui/material";

export default function MacbookListCard({
  macbook,
  modelos,
  imageSrc,
  onEdit,
  onDelete,
  onToggleVendido,
}) {
  const modeloEncontrado = modelos.find(
    (modelo) => modelo.id_modelo === macbook.id_modelo
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
          alt={`${nombreModelo} ${macbook.color}`} 
          style={{ width: '100px', height: 'auto', marginRight: '1rem' }} 
        />
        <div style={{ flexGrow: 1 }}>
          <Typography style={{ color: "blue" }}>Serial: {macbook.serial_num}</Typography>
          <Typography>
            <strong>Modelo:</strong> {nombreModelo}
          </Typography>
          <Typography>Capacidad: {macbook.capacidad} GB</Typography>
          <Typography>Color: {macbook.color}</Typography>
          <Typography>
            <strong>Tipo:</strong> {macbook.tipo}
          </Typography>
          <Typography>Características: {macbook.caracteristicas}</Typography>
          <Typography style={{ color: macbook.vendido ? "red" : "green" }}>
            <strong>Vendido:</strong> {macbook.vendido ? "Sí" : "No"}
          </Typography>
          <Typography>
            Fecha de llegada:{" "}
            {new Date(macbook.fecha_llegada).toLocaleDateString()}
          </Typography>
          <Typography>
            Fecha de salida:{" "}
            {macbook.fecha_salida
              ? new Date(macbook.fecha_salida).toLocaleDateString()
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
            color={macbook.vendido ? "default" : "warning"}
            onClick={onToggleVendido}
          >
            {macbook.vendido ? "Marcar no vendido" : "Marcar vendido"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

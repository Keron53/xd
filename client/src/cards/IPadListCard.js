import { Card, CardContent, Typography, Button } from "@mui/material";

export default function IPadListCard({
  ipad,
  modelos,
  imageSrc,
  onEdit,
  onDelete,
  onToggleVendido,
}) {
  const modeloEncontrado = modelos.find(
    (modelo) => modelo.id_modelo === ipad.id_modelo
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
          alt={`${nombreModelo} ${ipad.color}`}
          style={{ width: "100px", height: "auto", marginRight: "1rem" }}
        />
        <div style={{ flexGrow: 1 }}>
          <Typography style={{ color: "blue" }}>IMEI: {ipad.imei}</Typography>
          <Typography>
            <strong>Modelo:</strong> {nombreModelo}
          </Typography>
          <Typography>Capacidad: {ipad.capacidad} GB</Typography>
          <Typography>Color: {ipad.color}</Typography>
          <Typography>
            <strong>Tipo:</strong> {ipad.tipo}
          </Typography>
          <Typography style={{ color: ipad.vendido ? "red" : "green" }}>
            <strong>Vendido:</strong> {ipad.vendido ? "Sí" : "No"}
          </Typography>
          <Typography>
            Fecha de llegada:{" "}
            {new Date(ipad.fecha_llegada).toLocaleDateString()}
          </Typography>
          <Typography>
            Fecha de salida:{" "}
            {ipad.fecha_salida
              ? new Date(ipad.fecha_salida).toLocaleDateString()
              : "N/A"}
          </Typography>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Button variant="contained" color="primary" onClick={onEdit}>
            Editar
          </Button>
          <Button variant="contained" color="error" onClick={onDelete}>
            Eliminar
          </Button>
          <Button
            variant="contained"
            color={ipad.vendido ? "default" : "warning"}
            onClick={onToggleVendido}
          >
            {ipad.vendido ? "Marcar no vendido" : "Marcar vendido"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

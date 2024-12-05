const pool = require('../db');

const createServicioTecnico = async (req, res, next) => {
    try {
        const { id_servicio_tecnico, id_modelo, nombre_cliente, apellido_cliente, cedula_cliente, telefono_cliente, imei_cliente, fecha_llegada, pin_cliente, estado_fisico, tipo_reparacion, costo, completado, fecha_finalizado } = req.body;

        const newServicioTecnico = await pool.query(
            "INSERT INTO Servicio_Tecnico (id_servicio_tecnico, id_modelo, nombre_cliente, apellido_cliente, cedula_cliente, telefono_cliente, imei_cliente, fecha_llegada, pin_cliente, estado_fisico, tipo_reparacion, costo, completado, fecha_finalizado) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
            [id_servicio_tecnico, id_modelo, nombre_cliente, apellido_cliente, cedula_cliente, telefono_cliente, imei_cliente, fecha_llegada, pin_cliente, estado_fisico, tipo_reparacion, costo, completado, fecha_finalizado]
        );

        res.json(newServicioTecnico.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getAllServiciosTecnicos = async (req, res, next) => {
    try {
        const allServiciosTecnicos = await pool.query("SELECT * FROM Servicio_Tecnico");
        res.json(allServiciosTecnicos.rows);
    } catch (error) {
        next(error);
    }
}

const getServicioTecnico = async (req, res, next) => {
    try {
        const { id_servicio_tecnico } = req.params;
        const result = await pool.query("SELECT * FROM Servicio_Tecnico WHERE id_servicio_tecnico = $1", [id_servicio_tecnico]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Servicio Técnico not found" });

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const updateServicioTecnico = async (req, res, next) => {
    try {
        const { id_servicio_tecnico } = req.params;
        const { id_modelo, nombre_cliente, apellido_cliente, cedula_cliente, telefono_cliente, imei_cliente, fecha_llegada, pin_cliente, estado_fisico, tipo_reparacion, costo, completado, fecha_finalizado } = req.body;

        const result = await pool.query(
            "UPDATE Servicio_Tecnico SET id_modelo = $1, nombre_cliente = $2, apellido_cliente = $3, cedula_cliente = $4, telefono_cliente = $5 , imei_cliente = $6 , fecha_llegada = $7 , pin_cliente = $8 , estado_fisico = $9 , tipo_reparacion = $10 , costo = $11 , completado = $12 , fecha_finalizado = $13 WHERE id_servicio_tecnico = $14 RETURNING *",
            [id_modelo,nombre_cliente ,apellido_cliente ,cedula_cliente ,telefono_cliente ,imei_cliente ,fecha_llegada ,pin_cliente ,estado_fisico ,tipo_reparacion ,costo ,completado ,fecha_finalizado,id_servicio_tecnico]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Servicio Técnico not found" });

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deleteServicioTecnico = async (req, res, next) => {
    try {
        const { id_servicio_tecnico } = req.params;
        const result = await pool.query("DELETE FROM Servicio_Tecnico WHERE id_servicio_tecnico = $1", [id_servicio_tecnico]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "Servicio Técnico not found" });
        
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createServicioTecnico,
    getAllServiciosTecnicos,
    getServicioTecnico,
    updateServicioTecnico,
    deleteServicioTecnico
}
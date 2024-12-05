const pool = require('../db');

const createPlanAcumulativo = async (req, res, next) => {
    try {
        const { id_plan_acum, id_modelo, nombre_cliente, apellido_cliente, cedula_cliente, telefono_cliente, fecha_inicio, costo, color1, color2, color3, completado, fecha_fin, imei_equipo } = req.body;

        const newPlanAcumulativo = await pool.query(
            "INSERT INTO Plan_Acumulativo (id_plan_acum, id_modelo, nombre_cliente, apellido_cliente, cedula_cliente, telefono_cliente, fecha_inicio, costo, color1, color2, color3, completado, fecha_fin, imei_equipo) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
            [id_plan_acum, id_modelo, nombre_cliente, apellido_cliente, cedula_cliente, telefono_cliente, fecha_inicio, costo, color1, color2, color3, completado, fecha_fin, imei_equipo]
        );

        res.json(newPlanAcumulativo.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getAllPlanesAcumulativos = async (req, res, next) => {
    try {
        const allPlanesAcumulativos = await pool.query("SELECT * FROM Plan_Acumulativo");
        res.json(allPlanesAcumulativos.rows);
    } catch (error) {
        next(error);
    }
}

const getPlanAcumulativo = async (req, res, next) => {
    try {
        const { id_plan_acum } = req.params;
        const result = await pool.query("SELECT * FROM Plan_Acumulativo WHERE id_plan_acum = $1", [id_plan_acum]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Plan Acumulativo not found" });

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const updatePlanAcumulativo = async (req, res, next) => {
    try {
        const { id_plan_acum } = req.params;
        const { id_modelo, nombre_cliente, apellido_cliente, cedula_cliente, telefono_cliente, fecha_inicio, costo, color1, color2, color3, completado, fecha_fin, imei_equipo } = req.body;

        const result = await pool.query(
            "UPDATE Plan_Acumulativo SET id_modelo = $1 , nombre_cliente = $2 , apellido_cliente = $3 , cedula_cliente = $4 , telefono_cliente = $5 , fecha_inicio = $6 , costo = $7 , color1 = $8 , color2 = $9 , color3 = $10 , completado = $11 , fecha_fin = $12 , imei_equipo = $13 WHERE id_plan_acum = $14 RETURNING *",
            [id_modelo,nombre_cliente ,apellido_cliente ,cedula_cliente ,telefono_cliente ,fecha_inicio ,costo ,color1 ,color2 ,color3 ,completado ,fecha_fin ,imei_equipo,id_plan_acum]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Plan Acumulativo not found" });

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deletePlanAcumulativo = async (req, res, next) => {
    try {
        const { id_plan_acum } = req.params;
        const result = await pool.query("DELETE FROM Plan_Acumulativo WHERE id_plan_acum = $1", [id_plan_acum]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "Plan Acumulativo not found" });
        
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createPlanAcumulativo,
    getAllPlanesAcumulativos,
    getPlanAcumulativo,
    updatePlanAcumulativo,
    deletePlanAcumulativo
}
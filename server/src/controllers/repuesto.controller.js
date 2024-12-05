const pool = require('../db');

const createRepuesto = async (req, res, next) => {
    try {
        const { id_modelo, tipo_repuesto, fecha_llegada, fecha_utilizado } = req.body;

        const newRepuesto = await pool.query(
            "INSERT INTO Repuesto (id_modelo, tipo_repuesto, fecha_llegada, fecha_utilizado) VALUES($1, $2, $3, $4) RETURNING *",
            [id_modelo, tipo_repuesto, fecha_llegada, fecha_utilizado]
        );

        res.json(newRepuesto.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getAllRepuestos = async (req, res, next) => {
    try {
        const allRepuestos = await pool.query("SELECT * FROM Repuesto");
        res.json(allRepuestos.rows);
    } catch (error) {
        next(error);
    }
}

const getRepuesto = async (req, res, next) => {
    try {
        const { id_repuesto } = req.params;
        const result = await pool.query("SELECT * FROM Repuesto WHERE id_repuesto = $1", [id_repuesto]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Repuesto not found" });

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const updateRepuesto = async (req, res, next) => {
    try {
        const { id_repuesto } = req.params;
        const { id_modelo, tipo_repuesto, fecha_llegada, fecha_utilizado } = req.body;

        const result = await pool.query(
            "UPDATE Repuesto SET id_modelo = $1, tipo_repuesto = $2, fecha_llegada = $3, fecha_utilizado = $4 WHERE id_repuesto = $5 RETURNING *",
            [id_modelo, tipo_repuesto, fecha_llegada, fecha_utilizado, id_repuesto]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Repuesto not found" });

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deleteRepuesto = async (req, res, next) => {
    try {
        const { id_repuesto } = req.params;
        const result = await pool.query("DELETE FROM Repuesto WHERE id_repuesto = $1", [id_repuesto]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "Repuesto not found" });
        
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createRepuesto,
    getAllRepuestos,
    getRepuesto,
    updateRepuesto,
    deleteRepuesto
}
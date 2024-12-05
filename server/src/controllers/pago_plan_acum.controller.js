const pool = require('../db');

const createPagoPlanAcum = async (req, res, next) => {
    try {
        const { id_plan_acum, cantidad, tipo_pago, fecha_pago } = req.body;

        const newPagoPlanAcum = await pool.query(
            "INSERT INTO Pago_Plan_Acum (id_plan_acum, cantidad, tipo_pago, fecha_pago) VALUES($1, $2, $3, $4) RETURNING *",
            [id_plan_acum, cantidad, tipo_pago, fecha_pago]
        );

        res.json(newPagoPlanAcum.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getAllPagosPlanAcum = async (req, res, next) => {
    try {
        const allPagosPlanAcum = await pool.query("SELECT * FROM Pago_Plan_Acum");
        res.json(allPagosPlanAcum.rows);
    } catch (error) {
        next(error);
    }
}

const getPagoPlanAcum = async (req, res, next) => {
    try {
        const { id_pago } = req.params;
        const result = await pool.query("SELECT * FROM Pago_Plan_Acum WHERE id_pago = $1", [id_pago]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Pago not found" });

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const updatePagoPlanAcum = async (req, res, next) => {
    try {
        const { id_pago } = req.params;
        const { id_plan_acum, cantidad, tipo_pago, fecha_pago } = req.body;

        const result = await pool.query(
            "UPDATE Pago_Plan_Acum SET id_plan_acum = $1, cantidad = $2, tipo_pago = $3, fecha_pago = $4 WHERE id_pago = $5 RETURNING *",
            [id_plan_acum, cantidad, tipo_pago, fecha_pago, id_pago]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Pago not found" });

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deletePagoPlanAcum = async (req, res, next) => {
    try {
        const { id_pago } = req.params;
        const result = await pool.query("DELETE FROM Pago_Plan_Acum WHERE id_pago = $1", [id_pago]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "Pago not found" });
        
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createPagoPlanAcum,
    getAllPagosPlanAcum,
    getPagoPlanAcum,
    updatePagoPlanAcum,
    deletePagoPlanAcum
}
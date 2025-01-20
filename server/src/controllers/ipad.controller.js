const pool = require('../db');

const createIPad = async (req, res, next) => {
    try {
        const { id_modelo, num_modelo, capacidad, color, tipo, vendido, fecha_llegada } = req.body;

        const newIPad = await pool.query(
            "INSERT INTO IPad (id_modelo, num_modelo, capacidad, color, tipo, vendido, fecha_llegada) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [id_modelo, num_modelo, capacidad, color, tipo, vendido, fecha_llegada]
        );

        res.json(newIPad.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getAllIPads = async (req, res, next) => {
    try {
        const allIPads = await pool.query("SELECT * FROM IPad ORDER BY id_ipad DESC");
        res.json(allIPads.rows);
    } catch (error) {
        next(error);
    }
}

const getIPad = async (req, res, next) => {
    try {
        const { id_ipad } = req.params;
        const result = await pool.query("SELECT * FROM IPad WHERE id_ipad = $1", [id_ipad]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "iPad not found" });

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}


const getIPadByModel = async (req, res, next) => {
    try {
        const { id_modelo } = req.params;
        const result = await pool.query("SELECT * FROM IPad WHERE id_modelo = $1 ORDER BY id_ipad DESC", [id_modelo]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "No iPads found with the specified model ID" });

        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getIPadByColor = async (req, res, next) => {
    try {
        const { color } = req.params;
        const result = await pool.query("SELECT * FROM IPad WHERE color ILIKE $1 ORDER BY id_ipad DESC", [`%${color}%`]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "No iPads found with the specified color" });

        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getIPadsNotSold = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM IPad WHERE vendido = false ORDER BY id_ipad DESC");

        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getIPadsSold = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM IPad WHERE vendido = true ORDER BY id_ipad DESC");
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const updateIPad = async (req, res, next) => {
    try {
        const { id_ipad } = req.params;
        const { id_modelo, num_modelo, capacidad, color, tipo, vendido, fecha_llegada, fecha_salida } = req.body;

        const result = await pool.query(
            "UPDATE IPad SET id_modelo = $1, num_modelo = $2, capacidad = $3, color = $4, tipo = $5, vendido = $6, fecha_llegada = $7, fecha_salida = $8 WHERE id_ipad = $9 RETURNING *",
            [id_modelo, num_modelo, capacidad, color, tipo, vendido, fecha_llegada, fecha_salida, id_ipad]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "iPad not found" });

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deleteIPad = async (req, res, next) => {
    try {
        const { id_ipad } = req.params;
        const result = await pool.query("DELETE FROM IPad WHERE id_ipad = $1", [id_ipad]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "iPad not found" });
        
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createIPad,
    getAllIPads,
    getIPad,
    getIPadsNotSold,
    getIPadsSold,
    getIPadByModel,
    getIPadByColor,
    updateIPad,
    deleteIPad
}

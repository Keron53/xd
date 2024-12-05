const pool = require('../db')

const createIPhone = async (req, res, next) => {
    try {
        const { imei, id_modelo, capacidad, color, bateria, vendido, sellado, fecha_llegada } = req.body;
    
        const newIPhone = await pool.query(
            "INSERT INTO IPhone (imei, id_modelo, capacidad, color, bateria, vendido, sellado, fecha_llegada) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",[
            imei, 
            id_modelo, 
            capacidad, 
            color, 
            bateria, 
            vendido, 
            sellado, 
            fecha_llegada]
          );
    
        res.json(newIPhone.rows[0]);
      } catch (error) {
        next(error);
      }
}

const getAllIPhone = async (req, res, next) => {
    try {
        const allIPhone = await pool.query("SELECT * FROM IPhone");
        res.json(allIPhone.rows);
      } catch (error) {
        next(error);
      }
}

const getIPhone = async (req, res, next) => {
    try {
        const { id_telf } = req.params;
        const result = await pool.query("SELECT * FROM IPhone WHERE id_telf = $1", [id_telf]);
    
        if (result.rows.length === 0)
          return res.status(404).json({ message: "IPhone not found" });
    
        res.json(result.rows[0]);
      } catch (error) {
        next(error);
      }
}

const updateIPhone = async (req, res, next) => {
    try {
        const { id_telf } = req.params;
        const { imei, id_modelo, capacidad, color, bateria, vendido, sellado, fecha_llegada, fecha_salida } = req.body;
    
        const result = await pool.query(
          "UPDATE IPhone SET imei = $1, id_modelo = $2, capacidad = $3, color = $4, bateria = $5, vendido = $6, sellado = $7, fecha_llegada = $8, fecha_salida = $9 WHERE id_telf = $10 RETURNING *",
          [imei, id_modelo, capacidad, color, bateria, vendido, sellado, fecha_llegada, fecha_salida, id_telf]
        );
    
        if (result.rows.length === 0)
          return res.status(404).json({ message: "IPhone not found" });
    
        return res.json(result.rows[0]);
      } catch (error) {
        next(error);
      }
}

const deleteIPhone = async (req, res, next) => {
    try {
        const { id_telf } = req.params;
        const result = await pool.query("DELETE FROM IPhone WHERE id_telf = $1", [id_telf]);
    
        if (result.rowCount === 0)
          return res.status(404).json({ message: "IPhone not found" });
        return res.sendStatus(204);
      } catch (error) {
        next(error);
      }
}

module.exports = {
    createIPhone,
    getAllIPhone,
    getIPhone,
    updateIPhone,
    deleteIPhone
}
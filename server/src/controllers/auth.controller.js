const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Verificar si el usuario existe
        const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (user.rows.length === 0) {
            return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
        }

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
        }

        // Generar el token JWT
        const token = jwt.sign(
            { id: user.rows[0].id, role: user.rows[0].role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({
            message: "Inicio de sesión exitoso",
            token,
            user: { id: user.rows[0].id, username: user.rows[0].username, role: user.rows[0].role }
        });
    } catch (error) {
        next(error);
    }
};

const registerUser = async (req, res, next) => {
    try {
        const { username, password, role } = req.body;

        // Validar el rol
        const validRoles = ["admin", "operador"];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ error: "Rol inválido. Solo admin u operador." });
        }

        // Verificar si el usuario ya existe
        const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "El usuario ya existe." });
        }

        // Hashear la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insertar el usuario en la base de datos
        const newUser = await pool.query(
            "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *",
            [username, hashedPassword, role]
        );

        res.status(201).json({
            message: "Usuario registrado exitosamente.",
            user: { id: newUser.rows[0].id, username: newUser.rows[0].username, role: newUser.rows[0].role }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser
};

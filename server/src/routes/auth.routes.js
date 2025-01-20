const { Router } = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");

const router = Router();

// Ruta para registrar usuarios
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

module.exports = router;

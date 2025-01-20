const checkRole = (roles) => (req, res, next) => {
    
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ error: "No tienes permiso para acceder a esta ruta." });
    }
    next();
};

module.exports = checkRole;

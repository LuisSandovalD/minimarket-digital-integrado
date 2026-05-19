module.exports = (...roles) => {

  return (req, res, next) => {

    try {

      // Verificar usuario autenticado

      if (!req.user) {

        return res.status(401).json({
          success: false,
          message: "No autenticado"
        });

      }

      // Verificar rol

      if (!roles.includes(req.user.role)) {

        return res.status(403).json({
          success: false,
          message: "No autorizado"
        });

      }

      next();

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }

  };

};
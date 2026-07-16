function validateUpdateSupplier(req, res, next) {
  try {
    const {
      email,
    } = req.body;

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateUpdateSupplier,
};

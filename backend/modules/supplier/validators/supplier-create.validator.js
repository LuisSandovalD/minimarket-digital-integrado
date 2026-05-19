function validateCreateSupplier(req, res, next) {
  try {
    const {
      name,
      email
    } = req.body

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      })
    }

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email'
      })
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  validateCreateSupplier
}
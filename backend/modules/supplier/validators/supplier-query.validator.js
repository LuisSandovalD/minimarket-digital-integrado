function validateSupplierQuery(req, res, next) {
  try {
    const { page, limit } = req.query

    if (page && isNaN(page)) {
      return res.status(400).json({
        success: false,
        message: 'Page must be numeric'
      })
    }

    if (limit && isNaN(limit)) {
      return res.status(400).json({
        success: false,
        message: 'Limit must be numeric'
      })
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  validateSupplierQuery
}
const supplierService = require('../services/supplier.service')

async function createSupplier(req, res, next) {
  try {
    const supplier = await supplierService.createSupplier({
      ...req.body,
      companyId: req.user.companyId
    })

    return res.status(201).json({
      success: true,
      message: 'Supplier created successfully',
      data: supplier
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createSupplier
}
const supplierService = require('../services/supplier.service')

async function updateSupplier(req, res, next) {
  try {
    const { id } = req.params

    const supplier = await supplierService.updateSupplier(
      id,
      req.user.companyId,
      req.body
    )

    return res.status(200).json({
      success: true,
      message: 'Supplier updated successfully',
      data: supplier
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  updateSupplier
}
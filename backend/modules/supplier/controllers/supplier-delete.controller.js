const supplierService = require('../services/supplier.service')

async function deleteSupplier(req, res, next) {
  try {
    const { id } = req.params

    const response = await supplierService.deleteSupplier(
      id,
      req.user.companyId
    )

    return res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

async function restoreSupplier(req, res, next) {
  try {
    const { id } = req.params

    const response = await supplierService.restoreSupplier(
      id,
      req.user.companyId
    )

    return res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  deleteSupplier,
  restoreSupplier
}
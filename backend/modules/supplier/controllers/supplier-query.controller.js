const supplierService = require('../services/supplier.service')

async function getSuppliers(req, res, next) {
  try {
    const suppliers = await supplierService.getSuppliers(
      req.user.companyId,
      req.query
    )

    return res.status(200).json({
      success: true,
      ...suppliers
    })
  } catch (error) {
    next(error)
  }
}

async function getSupplierById(req, res, next) {
  try {
    const { id } = req.params

    const supplier = await supplierService.getSupplierById(
      id,
      req.user.companyId
    )

    return res.status(200).json({
      success: true,
      data: supplier
    })
  } catch (error) {
    next(error)
  }
}

async function searchSuppliers(req, res, next) {
  try {
    const { q } = req.query

    const suppliers =
      await supplierService.searchSuppliers(
        req.user.companyId,
        q
      )

    return res.status(200).json({
      success: true,
      data: suppliers
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getSuppliers,
  getSupplierById,
  searchSuppliers
}
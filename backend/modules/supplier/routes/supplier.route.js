const express = require('express')

const router = express.Router()

const supplierController = require('../controllers/supplier.controller')
const reportSupplier = require('../controllers/report-supplier.controller')

// MIDDLEWARES
const auth = require('../../../middleware/auth')

// VALIDATORS
const {
  validateCreateSupplier,
} = require('../validators/supplier-create.validator')

const {
  validateUpdateSupplier
} = require('../validators/supplier-update.validator')

const {
  validateSupplierQuery
} = require('../validators/supplier-query.validator')

// ======================================================
// QUERY
// ======================================================

router.get(
  '/',
  auth,
  validateSupplierQuery,
  supplierController.getSuppliers
)

router.get(
  '/search',
  auth,
  supplierController.searchSuppliers
)

router.get(
  '/:id',
  auth,
  supplierController.getSupplierById
)

// ======================================================
// CREATE
// ======================================================

router.post(
  '/',
  auth,
  validateCreateSupplier,
  supplierController.createSupplier
)

// ======================================================
// UPDATE
// ======================================================

router.patch(
  '/:id',
  auth,
  validateUpdateSupplier,
  supplierController.updateSupplier
)

// ======================================================
// DELETE
// ======================================================

router.delete(
  '/:id',
  auth,
  supplierController.deleteSupplier
)

// ======================================================
// RESTORE
// ======================================================

router.patch(
  '/:id/restore',
  auth,
  supplierController.restoreSupplier
)

// REPORTS
router.get('/reports/suppliers/pdf', auth, reportSupplier.downloadSuppliersPDFController)
router.get('/reports/suppliers/excel', auth, reportSupplier.downloadSuppliersExcelController)

module.exports = router

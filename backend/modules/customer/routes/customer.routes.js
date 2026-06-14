const express =
  require("express");

const router =
  express.Router();

const auth =
  require("../../../middleware/auth");

const {

  getCustomers,

  getCustomer,

  createCustomer,

  updateCustomer,

  deleteCustomer,

} = require(
  "../controllers/customer.controller"
);

const reportCustomer = require("../controllers/report-customer.controller");

router.get(
  "/",
  auth,
  getCustomers
);

router.get(
  "/:id",
  auth,
  getCustomer
);

router.post(
  "/",
  auth,
  createCustomer
);

router.put(
  "/:id",
  auth,
  updateCustomer
);

router.delete(
  "/:id",
  auth,
  deleteCustomer
);

// REPORTS
router.get("/reports/customers/pdf", auth, reportCustomer.downloadCustomersPDFController);
router.get("/reports/customers/excel", auth, reportCustomer.downloadCustomersExcelController);

module.exports =
  router;
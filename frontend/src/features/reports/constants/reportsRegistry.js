// features/analytics/constants/reportsRegistry.js

import CustomersReportPage from "../pages/CustomersReportPage";
import DailyPurchasesReportPage from "../pages/DailyPurchasesReportPage";
import InventoryReportPage from "../pages/InventoryReportPage";
import PurchasesReportPage from "../pages/PurchasesReportPage";
import SalesReportPage from "../pages/SalesReportPage";
import TopProductsReportPage from "../pages/TopProductsReportPage";

import AuditReportPage from "../pages/AuditReportPage";
import PaymentsReportPage from "../pages/PaymentsReportPage";
import SuppliersReportPage from "../pages/SuppliersReportPage";

export const reportsRegistry = {
  sales: SalesReportPage,
  "top-products": TopProductsReportPage,

  purchases: PurchasesReportPage,
  "daily-purchases": DailyPurchasesReportPage,

  inventory: InventoryReportPage,
  customers: CustomersReportPage,

  suppliers: SuppliersReportPage,
  payments: PaymentsReportPage,
  audit: AuditReportPage,
};

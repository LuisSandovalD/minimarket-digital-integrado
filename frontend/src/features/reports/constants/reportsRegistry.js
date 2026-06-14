// reports/constants/reportsRegistry.js

import CustomersReportPage from "../pages/CustomersReportPage";
import InventoryReportPage from "../pages/InventoryReportPage";
import PurchasesReportPage from "../pages/PurchasesReportPage";
import SalesReportPage from "../pages/SalesReportPage";
import TopProductsReportPage from "../pages/TopProductsReportPage";

export const reportsRegistry = {
  sales: SalesReportPage,
  "top-products": TopProductsReportPage,
  purchases: PurchasesReportPage,
  inventory: InventoryReportPage,
  customers: CustomersReportPage,
};

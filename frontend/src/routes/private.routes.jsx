import SubscriptionGuard from "@/features/auth/guards/SubscriptionGuard";
import { lazy } from "react";
import RequireAuth from "../features/auth/guards/RequireAuth";
import AppLayout from "../layout/app-layout/AppLayout";
import { withSuspense } from "./withSuspense";

// Imports perezosos de tus componentes privados
const Dashboard = lazy(
  () => import("../features/dashboard/pages/DashboardPage"),
);
const ReportsPage = lazy(() => import("../features/reports/pages/ReportsPage"));
const StatisticsPage = lazy(
  () => import("../features/statistics/pages/StatisticsPage"),
);
const DataBasePage = lazy(
  () => import("../features/database/pages/DataBasePage"),
);
const AnalyticsPage = lazy(
  () => import("../features/analytics/pages/AnalyticsPage"),
);
const AIChatPage = lazy(
  () => import("../features/google_gemini/pages/AIChatPage"),
);
const BranchesPage = lazy(
  () => import("../features/branches/pages/BranchesPage"),
);
const MovementsPage = lazy(
  () => import("../features/movements/pages/MovementsPage"),
);
const CustomerPage = lazy(
  () => import("../features/customer/pages/CustomerPage"),
);
const UsersPage = lazy(() => import("../features/users/pages/UsersPage"));
const CategoriesPage = lazy(
  () => import("../features/categories/pages/CategoriesPage"),
);
const NotificationsPages = lazy(
  () => import("../features/notifications/pages/NotificationsPages"),
);
const CompaniesPage = lazy(
  () => import("../features/company/pages/CompaniesPage"),
);
const UnitPage = lazy(() => import("../features/units/pages/UnitPage"));
const ProductsPage = lazy(
  () => import("../features/product/pages/ProductsPage"),
);
const SalesPage = lazy(() => import("../features/sales/pages/SalesPage"));
const PurchasePage = lazy(
  () => import("../features/purchase/page/PurchasePage"),
);
const SupplierPage = lazy(
  () => import("../features/supplier/pages/SupplierPage"),
);
const BarcodePages = lazy(
  () => import("../features/barcode/pages/BarcodePages"),
);
const ConfigurationPage = lazy(
  () => import("../features/settings/pages/ConfigurationPage"),
);
const SupportPage = lazy(() => import("../features/support/pages/SupportPage"));
const InventoryPage = lazy(
  () => import("../features/inventory/pages/InventoryPage"),
);
const SaleDetailPage = lazy(
  () => import("../features/sale-detail/pages/SaleDetailsPage"),
);
const PaymentsPage = lazy(
  () => import("../features/payments/pages/PaymentsPage"),
);
const ReviewPage = lazy(() => import("../features/reviews/pages/ReviewPage"));

export const privateRoutes = {
  path: "/:companySlug",
  element: <RequireAuth />,
  children: [
    {
      element: <AppLayout />,
      children: [
        { path: "dashboard", element: withSuspense(Dashboard) },

        /* ----- PLAN: BASIC REQUERIDO ----- */
        {
          path: "reports",
          element: (
            <SubscriptionGuard requiredTier="BASIC">
              {withSuspense(ReportsPage)}
            </SubscriptionGuard>
          ),
        },
        {
          path: "statistics",
          element: (
            <SubscriptionGuard requiredTier="BASIC">
              {withSuspense(StatisticsPage)}
            </SubscriptionGuard>
          ),
        },

        /* ----- PLAN: PREMIUM REQUERIDO ----- */
        {
          path: "database",
          element: (
            <SubscriptionGuard requiredTier="PREMIUM">
              {withSuspense(DataBasePage)}
            </SubscriptionGuard>
          ),
        },
        {
          path: "analytics",
          element: (
            <SubscriptionGuard requiredTier="PREMIUM">
              {withSuspense(AnalyticsPage)}
            </SubscriptionGuard>
          ),
        },
        {
          path: "automation",
          element: (
            <SubscriptionGuard requiredTier="PREMIUM">
              {withSuspense(AIChatPage)}
            </SubscriptionGuard>
          ),
        },

        /* ----- PLAN: FREE / LIBRES ----- */
        { path: "branches", element: withSuspense(BranchesPage) },
        { path: "inventory-history", element: withSuspense(MovementsPage) },
        { path: "customers", element: withSuspense(CustomerPage) },
        { path: "users", element: withSuspense(UsersPage) },
        { path: "categories", element: withSuspense(CategoriesPage) },
        { path: "notifications", element: withSuspense(NotificationsPages) },
        { path: "companies", element: withSuspense(CompaniesPage) },
        { path: "units", element: withSuspense(UnitPage) },
        { path: "products", element: withSuspense(ProductsPage) },
        { path: "sales", element: withSuspense(SalesPage) },
        { path: "purchases", element: withSuspense(PurchasePage) },
        { path: "suppliers", element: withSuspense(SupplierPage) },
        { path: "barcode", element: withSuspense(BarcodePages) },
        { path: "settings", element: withSuspense(ConfigurationPage) },
        { path: "support", element: withSuspense(SupportPage) },
        { path: "inventory", element: withSuspense(InventoryPage) },
        { path: "sale-details", element: withSuspense(SaleDetailPage) },
        { path: "payments", element: withSuspense(PaymentsPage) },
        { path: "reviews", element: withSuspense(ReviewPage) },
      ],
    },
  ],
};

import AnalyticsPage from "../features/analytics/pages/AnalyticsPage";
import RequireAuth from "../features/auth/guards/RequireAuth";
import SubscriptionGuard from "../features/auth/guards/SubscriptionGuard";
import BarcodePages from "../features/barcode/pages/BarcodePages";
import BranchesPage from "../features/branches/pages/BranchesPage";
import CategoriesPage from "../features/categories/pages/CategoriesPage";
import CompaniesPage from "../features/company/pages/CompaniesPage";
import CustomerPage from "../features/customer/pages/CustomerPage";
import Dashboard from "../features/dashboard/pages/DashboardPage";
import DataBasePage from "../features/database/pages/DataBasePage";
import AIChatPage from "../features/google_gemini/pages/AIChatPage";
import InventoryPage from "../features/inventory/pages/InventoryPage";
import MovementsPage from "../features/movements/pages/MovementsPage";
import NotificationsPages from "../features/notifications/pages/NotificationsPages";
import PaymentsPage from "../features/payments/pages/PaymentsPage";
import ProductsPage from "../features/product/pages/ProductsPage";
import PurchasePage from "../features/purchase/page/PurchasePage";
import ReportsPage from "../features/reports/pages/ReportsPage";
import ReviewPage from "../features/reviews/pages/ReviewPage";
import SaleDetailPage from "../features/sale-detail/pages/SaleDetailsPage";
import SalesPage from "../features/sales/pages/SalesPage";
import ConfigurationPage from "../features/settings/pages/ConfigurationPage";
import StatisticsPage from "../features/statistics/pages/StatisticsPage";
import SupplierPage from "../features/supplier/pages/SupplierPage";
import SupportPage from "../features/support/pages/SupportPage";
import UnitPage from "../features/units/pages/UnitPage";
import UsersPage from "../features/users/pages/UsersPage";
import AppLayout from "../layout/app-layout/AppLayout";

export const privateRoutes = {
  path: "/:companySlug",
  element: <RequireAuth />,
  children: [
    {
      element: <AppLayout />,
      children: [
        // Dashboard
        {
          path: "dashboard",
          element: <Dashboard />,
        },

        // BASIC
        {
          path: "reports",
          element: (
            <SubscriptionGuard requiredTier="BASIC">
              <ReportsPage />
            </SubscriptionGuard>
          ),
        },
        {
          path: "statistics",
          element: (
            <SubscriptionGuard requiredTier="BASIC">
              <StatisticsPage />
            </SubscriptionGuard>
          ),
        },

        // PREMIUM
        {
          path: "database",
          element: (
            <SubscriptionGuard requiredTier="PREMIUM">
              <DataBasePage />
            </SubscriptionGuard>
          ),
        },
        {
          path: "analytics",
          element: (
            <SubscriptionGuard requiredTier="PREMIUM">
              <AnalyticsPage />
            </SubscriptionGuard>
          ),
        },
        {
          path: "automation",
          element: (
            <SubscriptionGuard requiredTier="PREMIUM">
              <AIChatPage />
            </SubscriptionGuard>
          ),
        },

        // FREE
        {
          path: "branches",
          element: <BranchesPage />,
        },
        {
          path: "inventory-history",
          element: <MovementsPage />,
        },
        {
          path: "customers",
          element: <CustomerPage />,
        },
        {
          path: "users",
          element: <UsersPage />,
        },
        {
          path: "categories",
          element: <CategoriesPage />,
        },
        {
          path: "notifications",
          element: <NotificationsPages />,
        },
        {
          path: "companies",
          element: <CompaniesPage />,
        },
        {
          path: "units",
          element: <UnitPage />,
        },
        {
          path: "products",
          element: <ProductsPage />,
        },
        {
          path: "sales",
          element: <SalesPage />,
        },
        {
          path: "purchases",
          element: <PurchasePage />,
        },
        {
          path: "suppliers",
          element: <SupplierPage />,
        },
        {
          path: "barcode",
          element: <BarcodePages />,
        },
        {
          path: "settings",
          element: <ConfigurationPage />,
        },
        {
          path: "support",
          element: <SupportPage />,
        },
        {
          path: "inventory",
          element: <InventoryPage />,
        },
        {
          path: "sale-details",
          element: <SaleDetailPage />,
        },
        {
          path: "payments",
          element: <PaymentsPage />,
        },
        {
          path: "reviews",
          element: <ReviewPage />,
        },
      ],
    },
  ],
};

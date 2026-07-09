import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

// Un spinner o mensaje simple para mostrar mientras se descarga el trozo de código de la página
const PageLoader = () => (
  <div
    style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}
  >
    Cargando sección...
  </div>
);

/* ================= COMPONENTES CRÍTICOS / GUARDS ================= */
// Dejamos los Layouts y Guards con importación estática para evitar parpadeos visuales molestos
import SubscriptionGuard from "@/features/auth/guards/SubscriptionGuard";
import RequireAuth from "../features/auth/guards/RequireAuth";
import AppLayout from "../layout/app-layout/AppLayout";
import PublicLayout from "../layout/public/PublicLayout";

/* ================= PUBLIC (LAZY) ================= */
const Contact = lazy(() => import("../features/public/contact/Contact"));
const Features = lazy(() => import("../features/public/features/Features"));
const Home = lazy(() => import("../features/public/home/Home"));
const Inventory = lazy(() => import("../features/public/inventory/Inventory"));
const Modules = lazy(() => import("../features/public/modules/Modules"));
const Pricing = lazy(() => import("../features/public/pricing/Pricing"));

/* ================= APP (LAZY) ================= */
const AnalyticsPage = lazy(
  () => import("../features/analytics/pages/AnalyticsPage"),
);
const BarcodePages = lazy(
  () => import("../features/barcode/pages/BarcodePages"),
);
const BranchesPage = lazy(
  () => import("../features/branches/pages/BranchesPage"),
);
const CategoriesPage = lazy(
  () => import("../features/categories/pages/CategoriesPage"),
);
const CompaniesPage = lazy(
  () => import("../features/company/pages/CompaniesPage"),
);
const CustomerPage = lazy(
  () => import("../features/customer/pages/CustomerPage"),
);
const Dashboard = lazy(
  () => import("../features/dashboard/pages/DashboardPage"),
);
const DataBasePage = lazy(
  () => import("../features/database/pages/DataBasePage"),
);
const AIChatPage = lazy(
  () => import("../features/google_gemini/pages/AIChatPage"),
);
const InventoryPage = lazy(
  () => import("../features/inventory/pages/InventoryPage"),
);
const MovementsPage = lazy(
  () => import("../features/movements/pages/MovementsPage"),
);
const NotificationsPages = lazy(
  () => import("../features/notifications/pages/NotificationsPages"),
);
const PaymentsPage = lazy(
  () => import("../features/payments/pages/PaymentsPage"),
);
const ProductsPage = lazy(
  () => import("../features/product/pages/ProductsPage"),
);
const PurchasePage = lazy(
  () => import("../features/purchase/page/PurchasePage"),
);
const ReportsPage = lazy(() => import("../features/reports/pages/ReportsPage"));
const ReviewPage = lazy(() => import("../features/reviews/pages/ReviewPage"));
const SaleDetailPage = lazy(
  () => import("../features/sale-detail/pages/SaleDetailsPage"),
);
const SalesPage = lazy(() => import("../features/sales/pages/SalesPage"));
const ConfigurationPage = lazy(
  () => import("../features/settings/pages/ConfigurationPage"),
);
const StatisticsPage = lazy(
  () => import("../features/statistics/pages/StatisticsPage"),
);
const SupplierPage = lazy(
  () => import("../features/supplier/pages/SupplierPage"),
);
const SupportPage = lazy(() => import("../features/support/pages/SupportPage"));
const UnitPage = lazy(() => import("../features/units/pages/UnitPage"));
const UsersPage = lazy(() => import("../features/users/pages/UsersPage"));

export const routes = [
  /* ========================================
   * PUBLIC
   * ====================================== */
  {
    element: (
      <Suspense fallback={<PageLoader />}>
        <PublicLayout />
      </Suspense>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/features", element: <Features /> },
      { path: "/inventory", element: <Inventory /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/modules", element: <Modules /> },
      { path: "/contact", element: <Contact /> },
    ],
  },

  /* ========================================
   * PRIVATE APP
   * ====================================== */
  {
    path: "/:companySlug",
    element: <RequireAuth />,
    children: [
      {
        element: (
          <Suspense fallback={<PageLoader />}>
            <AppLayout />
          </Suspense>
        ),
        children: [
          { path: "dashboard", element: <Dashboard /> },

          /* ----- PLAN: BASIC REQUERIDO ----- */
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

          /* ----- PLAN: PREMIUM REQUERIDO ----- */
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

          /* ----- PLAN: FREE / LIBRES ----- */
          { path: "branches", element: <BranchesPage /> },
          { path: "inventory-history", element: <MovementsPage /> },
          { path: "customers", element: <CustomerPage /> },
          { path: "users", element: <UsersPage /> },
          { path: "categories", element: <CategoriesPage /> },
          { path: "notifications", element: <NotificationsPages /> },
          { path: "companies", element: <CompaniesPage /> },
          { path: "units", element: <UnitPage /> },
          { path: "products", element: <ProductsPage /> },
          { path: "sales", element: <SalesPage /> },
          { path: "purchases", element: <PurchasePage /> },
          { path: "suppliers", element: <SupplierPage /> },
          { path: "barcode", element: <BarcodePages /> },
          { path: "settings", element: <ConfigurationPage /> },
          { path: "support", element: <SupportPage /> },
          { path: "inventory", element: <InventoryPage /> },
          { path: "sale-details", element: <SaleDetailPage /> },
          { path: "payments", element: <PaymentsPage /> },
          { path: "reviews", element: <ReviewPage /> },
        ],
      },
    ],
  },

  /* ========================================
   * FALLBACK
   * ====================================== */
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

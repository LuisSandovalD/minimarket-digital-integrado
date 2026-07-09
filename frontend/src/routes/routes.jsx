import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

/* ================= COMPONENTE DE CARGA (SPINNER/LOADER) ================= */
// Puedes cambiar este diseño por un spinner de Tailwind, una barra superior, etc.
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center p-6 text-gray-500">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
      <p className="text-sm">Cargando módulo...</p>
    </div>
  </div>
);

// Helper para envolver de forma limpia cada componente dinámico con su Suspense
const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

/* ================= LAYOUTS Y GUARDS (Estáticos, se necesitan desde el inicio) ================= */
import SubscriptionGuard from "@/features/auth/guards/SubscriptionGuard";
import RequireAuth from "../features/auth/guards/RequireAuth";
import AppLayout from "../layout/app-layout/AppLayout";
import PublicLayout from "../layout/public/PublicLayout";

/* ================= PUBLIC (Lazy Imports) ================= */
const Home = lazy(() => import("../features/public/home/Home"));
const Features = lazy(() => import("../features/public/features/Features"));
const Inventory = lazy(() => import("../features/public/inventory/Inventory"));
const Pricing = lazy(() => import("../features/public/pricing/Pricing"));
const Modules = lazy(() => import("../features/public/modules/Modules"));
const Contact = lazy(() => import("../features/public/contact/Contact"));

/* ================= PRIVATE APP (Lazy Imports) ================= */
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

export const routes = [
  /* ========================================
   * PUBLIC
   * ====================================== */
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: withSuspense(Home),
      },
      {
        path: "/features",
        element: withSuspense(Features),
      },
      {
        path: "/inventory",
        element: withSuspense(Inventory),
      },
      {
        path: "/pricing",
        element: withSuspense(Pricing),
      },
      {
        path: "/modules",
        element: withSuspense(Modules),
      },
      {
        path: "/contact",
        element: withSuspense(Contact),
      },
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
        element: <AppLayout />,
        children: [
          {
            path: "dashboard",
            element: withSuspense(Dashboard),
          },

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
          {
            path: "branches",
            element: withSuspense(BranchesPage),
          },
          {
            path: "inventory-history",
            element: withSuspense(MovementsPage),
          },
          {
            path: "customers",
            element: withSuspense(CustomerPage),
          },
          {
            path: "users",
            element: withSuspense(UsersPage),
          },
          {
            path: "categories",
            element: withSuspense(CategoriesPage),
          },
          {
            path: "notifications",
            element: withSuspense(NotificationsPages),
          },
          {
            path: "companies",
            element: withSuspense(CompaniesPage),
          },
          {
            path: "units",
            element: withSuspense(UnitPage),
          },
          {
            path: "products",
            element: withSuspense(ProductsPage),
          },
          {
            path: "sales",
            element: withSuspense(SalesPage),
          },
          {
            path: "purchases",
            element: withSuspense(PurchasePage),
          },
          {
            path: "suppliers",
            element: withSuspense(SupplierPage),
          },
          {
            path: "barcode",
            element: withSuspense(BarcodePages),
          },
          {
            path: "settings",
            element: withSuspense(ConfigurationPage),
          },
          {
            path: "support",
            element: withSuspense(SupportPage),
          },
          {
            path: "inventory",
            element: withSuspense(InventoryPage),
          },
          {
            path: "sale-details",
            element: withSuspense(SaleDetailPage),
          },
          {
            path: "payments",
            element: withSuspense(PaymentsPage),
          },
          {
            path: "reviews",
            element: withSuspense(ReviewPage),
          },
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

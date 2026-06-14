import { Navigate } from "react-router-dom";

/* ================= PUBLIC LAYOUT ================= */

import PublicLayout from "../layout/public/PublicLayout";

/* ================= PUBLIC ================= */

import Home from "../features/public/home/Home";

import Features from "../features/public/features/Features";

import Modules from "../features/public/modules/Modules";

import Contact from "../features/public/contact/Contact";

import Inventory from "../features/public/inventory/Inventory";

/* ================= APP ================= */

import AppLayout from "../layout/app-layout/AppLayout";

import Dashboard from "../features/dashboard/pages/DashboardPage";

import BranchesPage from "../features/branches/pages/BranchesPage";

import CompaniesPage from "../features/company/pages/CompaniesPage";

import RequireAuth from "../features/auth/guards/RequireAuth";

import UsersPage from "../features/users/pages/UsersPage";

import CategoriesPage from "../features/categories/pages/CategoriesPage";

import UnitPage from "../features/units";

import ProductsPage from "../features/product/pages/ProductsPage";

import SalesPage from "../features/sales/pages/SalesPage";

import BarcodePages from "../features/barcode/pages/BarcodePages";
import CustomerPage from "../features/customer/pages/CustomerPage";
import DataBasePage from "../features/database/pages/DataBasePage";
import EmployeesPage from "../features/employee/pages/EmployeesPage";
import InventoryPage from "../features/inventory/pages/InventoryPage";
import MovementsPage from "../features/movements/pages/MovementsPage";
import PaymentsPage from "../features/payments/pages/PaymentsPage";
import PurchasePage from "../features/purchase/page/PurchasePage";
import ReportsPage from "../features/reports/pages/ReportsPage";
import SaleDetailPage from "../features/sale-detail/pages/SaleDetailsPage";
import ConfigurationPage from "../features/settings/pages/Settings";
import SupplierPage from "../features/supplier/pages/SupplierPage";
import SupportPage from "../features/support/pages/SupportPage";

export const routes = [
  /* ========================================
   * PUBLIC
   * ====================================== */

  {
    element: <PublicLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/features",
        element: <Features />,
      },

      {
        path: "/inventory",
        element: <Inventory />,
      },

      {
        path: "/modules",
        element: <Modules />,
      },

      {
        path: "/contact",
        element: <Contact />,
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
            element: <Dashboard />,
          },

          {
            path: "reports",
            element: <ReportsPage />,
          },

          {
            path: "branches",
            element: <BranchesPage />,
          },

          {
            path: "inventory-history",
            element: <MovementsPage />,
          },

          {
            path: "employees",
            element: <EmployeesPage />,
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
            path: "database",
            element: <DataBasePage />,
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

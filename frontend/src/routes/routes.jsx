import { Navigate }
from "react-router-dom";

/* ================= PUBLIC LAYOUT ================= */

import PublicLayout
from "../layout/public/PublicLayout";

/* ================= PUBLIC ================= */

import Home
from "../pages/public/home/Home";

import Features
from "../pages/public/features/Features";

import Modules
from "../pages/public/modules/Modules";

import Contact
from "../pages/public/contact/Contact";

import Inventory
from "../pages/public/inventory/Inventory";

/* ================= APP ================= */

import AppLayout
from "../layout/app-layout/AppLayout";

import Dashboard
from "../pages/dashboard/DashboardPage";

import BranchesPage
from "../pages/branch/BranchesPage";

import CompaniesPage
from "../pages/company/CompaniesPage";

import RequireAuth
from "../features/auth/guards/RequireAuth";

import UsersPage
from "../pages/users/UsersPage";

import CategoriesPage
from "../pages/categories/CategoriesPage";

import UnitPage
from "../features/units";


import ProductsPage
from "../features/product/pages/ProductsPage";

import { SalesPage } from "../features/sales/pages/SalesPage";

import SupplierPage from "../features/supplier/pages/SupplierPage";
import PurchasePage from "../features/purchase/page/PurchasePage";
import InventoryPage from "../features/inventory/pages/InventoryPage";
import BarcodePages from "../features/barcode/pages/BarcodePages";
import MovementsPage from "../features/movements/pages/MovementsPage";
import EmployeesPage from "../features/employee/pages/EmployeesPage";
import CustomerPage from "../features/customer/pages/CustomerPage";



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
            path: "branches",
            element: <BranchesPage />
          },


          {
            path: "inventory-history",
            element: <MovementsPage/>
          },

           {
            path: "employees",
            element: <EmployeesPage/>
          },

            {
            path: "customers",
            element: <CustomerPage/>
          },




          {
            path: "users",
            element: <UsersPage />
          },

          {
            path: "categories",
            element: <CategoriesPage />
          },

          {
            path: "companies",
            element: <CompaniesPage />
          },

          {
            path: "units",
            element: <UnitPage />
          },

          {
            path: "products",
            element: <ProductsPage />
          },

          {
            path: "sales",
            element : <SalesPage />
          },

          {
            path: "purchases",
            element : <          PurchasePage />
          },
          {
            path: "suppliers",
            element : <SupplierPage />
          },

          {
            path:"barcode",
            element : <BarcodePages />
          },

           {
            path: "inventory",
            element : <InventoryPage />
          }

        ],
      },
    ],
  },

  /* ========================================
   * FALLBACK
   * ====================================== */

  {
    path: "*",

    element:
      <Navigate
        to="/"
        replace
      />,
  },

];
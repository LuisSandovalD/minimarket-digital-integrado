// ========================================
// features/supplier/components/SupplierTable.jsx
// ========================================

import { Building2, Globe, Mail, Phone, Settings2, User2 } from "lucide-react";

import { Table, THead } from "@/components/data-display/";

import SupplierActions from "./SupplierActions";

export default function SupplierTable({
  suppliers = [],
  loading = false,

  handleEdit,
  handleDelete,
}) {
  // ========================================
  // COLUMNS
  // ========================================

  const columns = [
    {
      key: "supplier",

      label: (
        <div className="flex items-center gap-2">
          <Building2 size={14} />
          Proveedor
        </div>
      ),
    },

    {
      key: "email",

      label: (
        <div className="flex items-center gap-2">
          <Mail size={14} />
          Email
        </div>
      ),
    },

    {
      key: "phone",

      label: (
        <div className="flex items-center gap-2">
          <Phone size={14} />
          Teléfono
        </div>
      ),
    },

    {
      key: "contact",

      label: (
        <div className="flex items-center gap-2">
          <User2 size={14} />
          Contacto
        </div>
      ),
    },

    {
      key: "website",

      label: (
        <div className="flex items-center gap-2">
          <Globe size={14} />
          Sitio Web
        </div>
      ),
    },

    {
      key: "actions",

      label: (
        <div className="flex items-center gap-2">
          <Settings2 size={14} />
          Acciones
        </div>
      ),
    },
  ];

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return <div className="py-10 text-center">Loading suppliers...</div>;
  }

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="space-y-5">
      {/* HEADER */}

      <div>
        <h2
          className="
            text-xl
            font-semibold
            tracking-tight
            text-slate-900
            dark:text-white
          "
        >
          Suppliers
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          Gestiona proveedores del sistema.
        </p>
      </div>

      {/* TABLE */}

      <Table>
        <THead columns={columns} />

        <tbody>
          {suppliers.length > 0 ? (
            suppliers.map((supplier) => (
              <tr
                key={supplier.id}
                className="
                  border-b
                  border-slate-200/50
                  dark:border-slate-800
                  hover:bg-slate-50
                  dark:hover:bg-slate-900/40
                "
              >
                {/* SUPPLIER */}

                <td className="px-6 py-5">
                  <div>
                    <h3
                      className="
                        text-sm
                        font-semibold
                        text-slate-800
                        dark:text-white
                      "
                    >
                      {supplier.name}
                    </h3>

                    <p
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      {supplier.ruc || "Sin RUC"}
                    </p>
                  </div>
                </td>

                {/* EMAIL */}

                <td
                  className="
                    px-6 py-5
                    text-sm
                    text-slate-600
                    dark:text-slate-300
                  "
                >
                  {supplier.email || "-"}
                </td>

                {/* PHONE */}

                <td
                  className="
                    px-6 py-5
                    text-sm
                    text-slate-600
                    dark:text-slate-300
                  "
                >
                  {supplier.phone || "-"}
                </td>

                {/* CONTACT */}

                <td
                  className="
                    px-6 py-5
                    text-sm
                    text-slate-600
                    dark:text-slate-300
                  "
                >
                  {supplier.contactPerson || "-"}
                </td>

                {/* WEBSITE */}

                <td
                  className="
                    px-6 py-5
                    text-sm
                    text-blue-500
                  "
                >
                  {supplier.website || "-"}
                </td>

                {/* ACTIONS */}

                <td className="px-6 py-5">
                  <SupplierActions
                    supplier={supplier}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="
                  px-6
                  py-16
                  text-center
                "
              >
                No suppliers found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

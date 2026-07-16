import { Activity, CreditCard, FileText, Phone, Settings2, User, Users, Wallet } from "lucide-react";

import { Table, TFooter, THead } from "@/components/data-display";
import { getUser } from "@/features/auth/services/session.service";
import CustomerActions from "./CustomerActions";

function formatMoney(value = 0) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(Number(value || 0));
}

export default function CustomersTable({
  customers = [],
  onEdit,
  onDelete,
  readOnly = false,
  page = 1,
  totalPages = 1,
  onPrevPage,
  onNextPage,
}) {
  const user = getUser();
  const currentRole = user?.role?.toUpperCase();

  const isAdmin = currentRole === "ADMIN";
  const canViewActions = isAdmin && !readOnly;

  const rawColumns = [
    {
      key: "customer",
      label: (
        <div className="flex items-center gap-2">
          <User size={14} />
          Cliente
        </div>
      ),
    },
    {
      key: "document",
      label: (
        <div className="flex items-center gap-2">
          <FileText size={14} />
          Documento
        </div>
      ),
    },
    {
      key: "contact",
      label: (
        <div className="flex items-center gap-2">
          <Phone size={14} />
          Contacto
        </div>
      ),
    },
    {
      key: "credit",
      label: (
        <div className="flex items-center gap-2">
          <CreditCard size={14} />
          Crédito
        </div>
      ),
    },
    {
      key: "debt",
      label: (
        <div className="flex items-center gap-2">
          <Wallet size={14} />
          Deuda
        </div>
      ),
    },
    {
      key: "status",
      label: (
        <div className="flex items-center gap-2">
          <Activity size={14} />
          Estado
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

  const columns = canViewActions ? rawColumns : rawColumns.filter((col) => col.key !== "actions");

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Clientes</h2>
        <p className="mt-1 text-sm text-slate-500">Gestiona clientes, líneas de crédito y cuentas por cobrar.</p>
      </div>

      <Table>
        <THead columns={columns} />

        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => {
              const creditLimit = Number(customer.creditLimit || 0);
              const currentDebt = Number(customer.currentDebt || 0);

              return (
                <tr
                  key={customer.id}
                  className="border-b border-slate-200/50 dark:border-slate-800 transition-all hover:bg-slate-50 dark:hover:bg-slate-900/40"
                >
                  <td className="px-6 py-5">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800 dark:text-white">{customer.name}</h3>
                      <p className="mt-1 text-xs text-slate-500">{customer.email || "Sin correo"}</p>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div>
                      <span className="inline-flex items-center rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs font-medium">
                        {customer.documentType || "DOC"}
                      </span>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        {customer.documentNumber || "-"}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div>
                      <p className="text-sm text-slate-700 dark:text-slate-300">{customer.phone || "-"}</p>
                      <p className="mt-1 text-xs text-slate-500">{customer.city || "Sin ciudad"}</p>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div>
                      <p className="text-sm font-bold text-blue-600">{formatMoney(creditLimit)}</p>
                      <p className="mt-1 text-xs text-slate-500">Límite</p>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div>
                      <p className={`text-sm font-bold ${currentDebt > 0 ? "text-red-500" : "text-emerald-600"}`}>
                        {formatMoney(currentDebt)}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{currentDebt > 0 ? "Pendiente" : "Al día"}</p>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center rounded-xl px-3 py-1 text-xs font-medium ${
                        customer.isActive
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                      }`}
                    >
                      {customer.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </td>

                  {canViewActions && (
                    <td className="px-6 py-5">
                      <CustomerActions
                        customer={customer}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        currentRole={currentRole}
                      />
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                    <Users className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">No hay clientes</h3>
                  <p className="mt-1 text-sm text-slate-500">Empieza registrando tu primer cliente.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>

        {customers.length > 0 && (
          <TFooter page={page} totalPages={totalPages} onPrev={onPrevPage} onNext={onNextPage} />
        )}
      </Table>
    </div>
  );
}

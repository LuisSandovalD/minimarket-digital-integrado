// ========================================
// features/sales/modal/steps/CustomerStep.jsx
// ========================================

import { InputList } from "@/components/forms";
import { User } from "lucide-react";

export default function CustomerStep({ customers = [], form, setForm }) {
  const handleSelectCustomer = (customer) => {
    setForm((prev) => ({ ...prev, customerId: customer.id, customer }));
  };

  const c = form?.customer;

  const initials = c?.name
    ? c.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : null;

  const fields = [
    { label: "Documento", value: c?.documentNumber },
    { label: "Correo", value: c?.email },
    { label: "Teléfono", value: c?.phone },
    { label: "Dirección", value: c?.address },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6 p-5">
        {/* HEADER */}
        <div>
          <h2 className="text-[17px] font-medium tracking-tight text-slate-900 dark:text-slate-100">
            Seleccionar cliente
          </h2>
          <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
            Busca y selecciona el cliente para esta venta.
          </p>
        </div>

        {/* SEARCH */}
        <InputList
          icon={User}
          placeholder="Nombre o número de documento…"
          data={customers}
          getLabel={(c) =>
            `${c.name || ""} ${c.documentNumber ? `· ${c.documentNumber}` : ""}`
          }
          onSelect={handleSelectCustomer}
        />

        {/* CUSTOMER */}
        {c ? (
          <div>
            {/* AVATAR + NAME */}
            <div className="flex items-center gap-3.5 mb-5">
              <div
                className="
                w-11 h-11 rounded-full shrink-0 flex items-center justify-center
                text-[13px] font-semibold tracking-wide
                bg-blue-50 text-blue-600
                dark:bg-blue-500/10 dark:text-blue-400
              "
              >
                {initials ?? <User size={17} />}
              </div>
              <div>
                <p className="text-[14px] font-medium text-slate-900 dark:text-slate-100">
                  {c.name}
                </p>
                <span
                  className="
                  inline-flex items-center gap-1 mt-1
                  text-[11px] font-medium px-2 py-0.5 rounded-full
                  bg-emerald-50 text-emerald-600
                  dark:bg-emerald-500/10 dark:text-emerald-400
                "
                >
                  <span className="text-[9px]">✓</span> Seleccionado
                </span>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="border-t border-black/[0.05] dark:border-white/[0.05] mb-1" />

            {/* FIELD ROWS */}
            <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
              {fields.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between py-2.5"
                >
                  <span className="text-[12px] text-slate-400 dark:text-slate-500">
                    {label}
                  </span>
                  <span
                    className={`
                    text-[13px] text-right max-w-[65%] break-words
                    ${
                      value
                        ? "font-medium text-slate-800 dark:text-slate-200"
                        : "italic text-slate-300 dark:text-slate-700"
                    }
                  `}
                  >
                    {value || "No registrado"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="flex flex-col items-center gap-1.5 py-14 text-center">
            <User
              size={26}
              className="text-slate-200 dark:text-slate-800 mb-2"
            />
            <p className="text-[14px] font-medium text-slate-400 dark:text-slate-600">
              Ningún cliente seleccionado
            </p>
            <p className="text-[13px] text-slate-300 dark:text-slate-700">
              Busca un cliente para continuar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

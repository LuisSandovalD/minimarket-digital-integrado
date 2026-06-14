// ========================================
// features/purchase/components/steps/SupplierStep.jsx
// ========================================

import { Building2 } from "lucide-react";

import { InputList } from "@/components/forms";

export default function SupplierStep({ suppliers = [], form, setForm }) {
  const handleSelectSupplier = (supplier) => {
    setForm((prev) => ({
      ...prev,

      supplierId: supplier.id,

      supplier,
    }));
  };

  const s = form?.supplier;

  const initials = s?.name
    ? s.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : null;

  const fields = [
    {
      label: "RUC",
      value: s?.ruc,
    },
    {
      label: "Correo",
      value: s?.email,
    },
    {
      label: "Teléfono",
      value: s?.phone,
    },
    {
      label: "Dirección",
      value: s?.address,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6 p-5">
        {/* HEADER */}

        <div>
          <h2
            className="
              text-[17px]
              font-medium
              tracking-tight
              text-slate-900
              dark:text-slate-100
            "
          >
            Seleccionar proveedor
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-400
              dark:text-slate-500
            "
          >
            Busca y selecciona el proveedor para esta compra.
          </p>
        </div>

        {/* SEARCH */}

        <InputList
          icon={Building2}
          placeholder="Nombre, RUC o correo..."
          data={suppliers}
          getLabel={(supplier) =>
            `${supplier.name || ""}${supplier.ruc ? ` · ${supplier.ruc}` : ""}`
          }
          onSelect={handleSelectSupplier}
        />

        {/* SUPPLIER */}

        {s ? (
          <div>
            {/* AVATAR */}

            <div
              className="
                flex
                items-center
                gap-3.5
                mb-5
              "
            >
              <div
                className="
                  w-11
                  h-11
                  rounded-full
                  shrink-0

                  flex
                  items-center
                  justify-center

                  text-[13px]
                  font-semibold
                  tracking-wide

                  bg-blue-50
                  text-blue-600

                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                {initials ?? <Building2 size={17} />}
              </div>

              <div>
                <p
                  className="
                    text-[14px]
                    font-medium
                    text-slate-900
                    dark:text-slate-100
                  "
                >
                  {s.name}
                </p>

                <span
                  className="
                    inline-flex
                    items-center
                    gap-1
                    mt-1

                    text-[11px]
                    font-medium

                    px-2
                    py-0.5
                    rounded-full

                    bg-emerald-50
                    text-emerald-600

                    dark:bg-emerald-500/10
                    dark:text-emerald-400
                  "
                >
                  <span className="text-[9px]">✓</span>
                  Seleccionado
                </span>
              </div>
            </div>

            {/* DIVIDER */}

            <div
              className="
                border-t
                border-black/[0.05]
                dark:border-white/[0.05]
                mb-1
              "
            />

            {/* INFO */}

            <div
              className="
                divide-y
                divide-black/[0.04]
                dark:divide-white/[0.04]
              "
            >
              {fields.map(({ label, value }) => (
                <div
                  key={label}
                  className="
                      flex
                      items-baseline
                      justify-between
                      py-2.5
                    "
                >
                  <span
                    className="
                        text-[12px]
                        text-slate-400
                        dark:text-slate-500
                      "
                  >
                    {label}
                  </span>

                  <span
                    className={`
                        text-[13px]
                        text-right
                        max-w-[65%]
                        break-words

                        ${
                          value
                            ? `
                              font-medium
                              text-slate-800
                              dark:text-slate-200
                            `
                            : `
                              italic
                              text-slate-300
                              dark:text-slate-700
                            `
                        }
                      `}
                  >
                    {value || "No registrado"}
                  </span>
                </div>
              ))}
            </div>

            {/* NOTES */}

            <div className="mt-6">
              <label
                className="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Observaciones
              </label>

              <textarea
                rows={4}
                value={form.notes || ""}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
                placeholder="Observaciones de la compra (opcional)..."
                className="
                  w-full
                  rounded-xl
                  border

                  border-slate-200
                  dark:border-slate-800

                  bg-white
                  dark:bg-slate-950

                  px-4
                  py-3

                  text-sm

                  resize-none

                  outline-none

                  focus:ring-2
                  focus:ring-blue-500/20
                "
              />
            </div>
          </div>
        ) : (
          <div
            className="
              flex
              flex-col
              items-center
              gap-1.5

              py-14

              text-center
            "
          >
            <Building2
              size={26}
              className="
                text-slate-200
                dark:text-slate-800
                mb-2
              "
            />

            <p
              className="
                text-[14px]
                font-medium

                text-slate-400
                dark:text-slate-600
              "
            >
              Ningún proveedor seleccionado
            </p>

            <p
              className="
                text-[13px]

                text-slate-300
                dark:text-slate-700
              "
            >
              Busca un proveedor para continuar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

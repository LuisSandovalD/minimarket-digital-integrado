import { Building2, Globe, MapPin, ReceiptText } from "lucide-react";

import { Input } from "@/components/inputs";

import { plans } from "../../constants/plans";

export default function CompanyStep({ form, handleChange }) {
  return (
    <div className="space-y-5">
      {/* ======================================
          COMPANY
      ====================================== */}

      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="Empresa"
          name="companyName"
          placeholder="Mi Empresa SAC"
          value={form.companyName || ""}
          onChange={handleChange}
          icon={Building2}
          required
        />

        <Input
          label="RUC"
          name="companyRuc"
          placeholder="12345678901"
          value={form.companyRuc || ""}
          onChange={handleChange}
          icon={ReceiptText}
        />
      </div>

      {/* ======================================
          ADDRESS
      ====================================== */}

      <Input
        label="Dirección"
        name="companyAddress"
        placeholder="Av. Principal 123"
        value={form.companyAddress || ""}
        onChange={handleChange}
        icon={MapPin}
      />

      {/* ======================================
          WEBSITE
      ====================================== */}

      <Input
        label="Sitio Web"
        name="companyWebsite"
        placeholder="https://empresa.com"
        value={form.companyWebsite || ""}
        onChange={handleChange}
        icon={Globe}
      />

      {/* ======================================
          PLANS
      ====================================== */}

      <div className="space-y-3">
        <label
          className="
            text-sm
            font-semibold
            text-[#274c77]
            dark:text-[#a3cef1]
          "
        >
          Plan de Suscripción
        </label>

        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <button
              key={plan.value}
              type="button"
              onClick={() =>
                handleChange({
                  target: {
                    name: "plan",
                    value: plan.value,
                  },
                })
              }
              className={`
                rounded-3xl
                border
                p-5
                text-left
                transition-all
                duration-300

                ${
                  form.plan === plan.value
                    ? `
                      border-[#274c77]
                      bg-[#274c77]
                      text-white
                      shadow-xl
                    `
                    : `
                      border-[#d7e0e7]
                      bg-white/70
                      hover:border-[#6096ba]
                    `
                }
              `}
            >
              <h3 className="font-bold">{plan.label}</h3>

              <p className="mt-1 text-sm opacity-80">{plan.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

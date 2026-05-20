import { Building, MapPin, Phone } from "lucide-react";

import { Input } from "@/components/forms/";

export default function BranchStep({ form, handleChange }) {
  return (
    <div className="space-y-5">
      {/* ======================================
          BRANCH INFO
      ====================================== */}

      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="Sucursal"
          name="branchName"
          placeholder="Sucursal Central"
          value={form.branchName || ""}
          onChange={handleChange}
          icon={Building}
        />

        <Input
          label="Código"
          name="branchCode"
          placeholder="SUC-01"
          value={form.branchCode || ""}
          onChange={handleChange}
        />
      </div>

      {/* ======================================
          ADDRESS
      ====================================== */}

      <Input
        label="Dirección"
        name="branchAddress"
        placeholder="Calle Principal 123"
        value={form.branchAddress || ""}
        onChange={handleChange}
        icon={MapPin}
      />

      {/* ======================================
          PHONE
      ====================================== */}

      <Input
        label="Teléfono"
        name="branchPhone"
        placeholder="999 999 999"
        value={form.branchPhone || ""}
        onChange={handleChange}
        icon={Phone}
      />

      {/* ======================================
          LOCATION
      ====================================== */}

      <div className="grid gap-5 md:grid-cols-3">
        <Input
          label="Ciudad"
          name="branchCity"
          placeholder="Lima"
          value={form.branchCity || ""}
          onChange={handleChange}
        />

        <Input
          label="Departamento"
          name="branchState"
          placeholder="Lima"
          value={form.branchState || ""}
          onChange={handleChange}
        />

        <Input
          label="País"
          name="branchCountry"
          placeholder="Perú"
          value={form.branchCountry || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

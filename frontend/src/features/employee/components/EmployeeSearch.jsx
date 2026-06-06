// ========================================
// features/employees/components/EmployeeSearch.jsx
// ========================================

import { Search } from "lucide-react";

export default function EmployeeSearch({ value, onChange }) {
  return (
    <div className="relative">
      <Search
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          h-4
          w-4
          text-slate-400
        "
      />

      <input
        type="text"
        placeholder="Buscar empleado..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full

          rounded-xl
          border
          border-slate-200
          dark:border-slate-800

          bg-white
          dark:bg-slate-900

          py-3
          pl-10
          pr-4

          text-sm

          outline-none

          transition-all

          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-500/10
        "
      />
    </div>
  );
}

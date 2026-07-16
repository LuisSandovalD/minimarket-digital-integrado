import { ChevronDown } from "lucide-react";

export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Seleccione",
  icon: Icon,
  required = false,
  disabled = false,
  error,
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 block">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative group">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
            <Icon className="h-5 w-5" />
          </div>
        )}

        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`
            w-full appearance-none rounded-lg
            border-2 transition-all duration-200
            bg-white dark:bg-slate-900
            py-2.5 px-4 text-sm font-medium
            outline-none cursor-pointer
            
            ${Icon ? "pl-10" : ""}
            
            disabled:opacity-50 disabled:cursor-not-allowed
            disabled:bg-slate-50 dark:disabled:bg-slate-950
            
            ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-300 dark:hover:border-slate-600"
            }
          `}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          className={`
            absolute right-3.5 top-1/2 -translate-y-1/2
            h-5 w-5 pointer-events-none
            transition-transform duration-200
            ${error ? "text-red-400" : "text-slate-400 dark:text-slate-500"}
          `}
        />
      </div>

      {error && <p className="text-xs font-medium text-red-500 mt-1">{error}</p>}
    </div>
  );
}

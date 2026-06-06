// ========================================
// components/forms/TextArea.jsx
// ========================================

export default function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
  disabled = false,
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={name}
          className="
            text-sm
            font-medium
            text-slate-700
            dark:text-slate-300
          "
        >
          {label}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          dark:border-slate-700
          bg-white
          dark:bg-slate-900
          px-4
          py-3
          text-sm
          text-slate-900
          dark:text-white
          placeholder:text-slate-400
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          transition-all
          resize-none
          disabled:opacity-60
          disabled:cursor-not-allowed
        "
      />
    </div>
  );
}

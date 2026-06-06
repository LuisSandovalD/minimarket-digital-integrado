import { useMemo, useRef, useState } from "react";

const InputList = ({
  label,
  error,
  helperText,

  icon: Icon,

  data = [],
  getLabel = (item) => item.label,

  onSelect,

  placeholder = "Buscar...",

  className = "",
  inputClassName = "",

  disabled = false,
  fullWidth = true,
}) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const inputRef = useRef(null);

  const filteredItems = useMemo(() => {
    return data
      .filter((item) =>
        getLabel(item).toLowerCase().includes(query.toLowerCase()),
      )
      .slice(0, 10);
  }, [data, query, getLabel]);

  const handleSelect = (item) => {
    setQuery(getLabel(item));
    setOpen(false);

    onSelect?.(item);
  };

  return (
    <div
      className={`
        flex
        flex-col
        gap-1.5

        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {/* LABEL */}
      {label && (
        <label
          className="
            flex
            items-center
            gap-1.5

            px-1

            text-sm
            font-medium

            text-slate-700
            dark:text-slate-300
          "
        >
          {label}
        </label>
      )}

      {/* INPUT */}
      <div className="relative group">
        {Icon && (
          <div
            className="
              absolute
              left-4
              top-1/2
              z-20
              -translate-y-1/2

              text-slate-400
              dark:text-slate-500

              transition-colors
              duration-200

              group-focus-within:text-slate-600
              dark:group-focus-within:text-slate-300
            "
          >
            <Icon size={18} />
          </div>
        )}

        <input
          ref={inputRef}
          value={query}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          className={`
            w-full
            h-12

            rounded-2xl
            border

            bg-white/70
            dark:bg-slate-900/70

            backdrop-blur-xl

            text-sm
            text-slate-700
            dark:text-slate-200

            placeholder:text-slate-400
            dark:placeholder:text-slate-500

            outline-none

            transition-all
            duration-200

            ${Icon ? "pl-11 pr-4" : "px-4"}

            ${
              error
                ? `
                  border-rose-300
                  dark:border-rose-800

                  focus:border-rose-400
                  dark:focus:border-rose-700

                  focus:ring-4
                  focus:ring-rose-500/10
                `
                : `
                  border-slate-200/80
                  dark:border-slate-800/80

                  hover:border-slate-300
                  dark:hover:border-slate-700

                  focus:border-slate-300
                  dark:focus:border-slate-700

                  focus:ring-4
                  focus:ring-slate-500/5
                `
            }

            ${inputClassName}
          `}
        />

        {/* DROPDOWN */}
        {open && filteredItems.length > 0 && (
          <div
            className="
              absolute
              top-full
              left-0
              right-0
              z-50

              mt-2

              overflow-hidden

              rounded-2xl

              border
              border-slate-200/80
              dark:border-slate-800/80

              bg-white/90
              dark:bg-slate-900/90

              backdrop-blur-xl

              shadow-xl
            "
          >
            <ul className="max-h-80 overflow-y-auto py-2">
              {filteredItems.map((item, index) => (
                <li
                  key={index}
                  onMouseDown={() => handleSelect(item)}
                  className="
                    cursor-pointer

                    px-4
                    py-3

                    text-sm

                    text-slate-700
                    dark:text-slate-200

                    transition-colors

                    hover:bg-slate-100
                    dark:hover:bg-slate-800
                  "
                >
                  {getLabel(item)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* FOOTER */}
      {(error || helperText) && (
        <div className="px-1">
          {error ? (
            <span
              className="
                text-xs
                font-medium
                text-rose-500
              "
            >
              {error}
            </span>
          ) : (
            <span
              className="
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              {helperText}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default InputList;
